<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { getRoleDefinition } from '~/data/roles'
import {
  classroomAttendanceStatuses,
  getCourseTitle,
  getParentName,
  getStatusTone,
  getStudentName,
  managementStudents,
  managementParents,
  managementTeachers
} from '~/data/management'
import type { AttendanceStatus } from '~/types'

useSeoMeta({
  title: 'Teacher Dashboard',
  description: 'Teacher dashboard for assigned Roshanayi Academy classes.'
})

const { currentUser, syncUser } = useRoleAuth()
const role = getRoleDefinition('teacher')
const { approvedManagementTeachers } = useTeacherApplications()
const availableTeachers = computed(() => [...managementTeachers, ...approvedManagementTeachers.value])
const {
  classroomRecords,
  schedules,
  liveSessions,
  assignments,
  submissions,
  progress,
  reports,
  addAssignment,
  saveAttendance: persistAttendance,
  saveMonthlyReport
} = useClassroomSystem()
const selectedClassroomId = ref('')
const attendanceSaved = ref(false)
const homeworkNotice = ref('')
const reportNotice = ref('')
const attendanceDraft = reactive<Record<string, AttendanceStatus>>({})
const attendanceDate = ref(new Date().toISOString().slice(0, 10))

const homeworkDraft = reactive({
  title: '',
  dueDate: '',
  fileLabel: ''
})

const reportDraft = reactive({
  studentId: '',
  focus: 'Monthly progress',
  mark: 85,
  note: ''
})

const teacherId = computed(() =>
  currentUser.value?.role === 'teacher' && currentUser.value.profileId
    ? currentUser.value.profileId
    : 'teacher-idrees'
)
const teacher = computed(() =>
  availableTeachers.value.find((item) => item.id === teacherId.value) ?? availableTeachers.value[0]
)
const assignedClassrooms = computed(() => classroomRecords.value.filter((classroom) => classroom.teacherId === teacherId.value))
const selectedClassroom = computed(() =>
  assignedClassrooms.value.find((classroom) => classroom.id === selectedClassroomId.value)
)
const selectedSchedule = computed(() =>
  selectedClassroom.value ? schedules.value.find((schedule) => schedule.id === selectedClassroom.value?.scheduleId) : undefined
)
const selectedLiveSession = computed(() =>
  selectedClassroom.value ? liveSessions.value.find((session) => session.classroomId === selectedClassroom.value?.id) : undefined
)
const selectedStudents = computed(() =>
  managementStudents.filter((student) => selectedSchedule.value?.enrolledStudentIds.includes(student.id))
)
const assignedStudentIds = computed(
  () => new Set(assignedClassrooms.value.flatMap((classroom) => schedules.value.find((schedule) => schedule.id === classroom.scheduleId)?.enrolledStudentIds ?? []))
)
const teacherAssignments = computed(() =>
  assignments.value.filter((assignment) => assignedClassrooms.value.some((classroom) => classroom.id === assignment.classroomId))
)
const reviewQueue = computed(() =>
  assignedClassrooms.value.flatMap((classroom) =>
    submissions.value.filter((submission) => submission.classroomId === classroom.id).map((submission) => ({
      ...submission,
      classroomName: classroom.className,
      studentName: getStudentName(submission.studentId)
    }))
  )
)
const marksRows = computed(() =>
  assignedClassrooms.value.flatMap((classroom) =>
    progress.value.filter((record) => record.classroomId === classroom.id).map((record) => ({
      ...record,
      classroomName: classroom.className,
      studentName: getStudentName(record.studentId)
    }))
  )
)
const parentContacts = computed(() =>
  selectedStudents.value.map((student) => {
    const parent = managementParents.find((item) => item.id === student.parentId)

    return {
      studentName: student.name,
      parentName: getParentName(student.parentId),
      email: parent?.email ?? '',
      whatsapp: parent?.whatsapp ?? ''
    }
  })
)
const scheduleForClassroom = (classroomId: string) =>
  schedules.value.find((schedule) => schedule.id === classroomRecords.value.find((classroom) => classroom.id === classroomId)?.scheduleId)

const stats = computed(() => [
  { label: 'Assigned classes', value: assignedClassrooms.value.length, detail: 'Visible to this teacher', tone: 'purple' as const },
  { label: 'Own students', value: assignedStudentIds.value.size, detail: 'Across assigned classes', tone: 'sky' as const },
  { label: 'Homework queue', value: reviewQueue.value.length, detail: 'Submissions to review', tone: 'amber' as const },
  { label: 'Monthly reports', value: reports.value.filter((report) => report.teacherId === teacherId.value).length, detail: 'Completed and draft reports', tone: 'emerald' as const }
])

watchEffect(() => {
  if (!assignedClassrooms.value.some((classroom) => classroom.id === selectedClassroomId.value)) {
    selectedClassroomId.value = assignedClassrooms.value[0]?.id ?? ''
  }

  selectedStudents.value.forEach((student) => {
    attendanceDraft[student.id] = attendanceDraft[student.id] ?? 'present'
  })

  if (!selectedStudents.value.some((student) => student.id === reportDraft.studentId)) {
    reportDraft.studentId = selectedStudents.value[0]?.id ?? ''
  }
})

onMounted(() => {
  syncUser()
})

const saveAttendance = () => {
  if (selectedClassroom.value) {
    persistAttendance(selectedClassroom.value.id, attendanceDate.value, teacherId.value, attendanceDraft)
  }
  attendanceSaved.value = true
}

const uploadHomework = () => {
  if (!selectedClassroom.value || !homeworkDraft.title.trim()) {
    homeworkNotice.value = 'Add a homework title before publishing.'
    return
  }

  addAssignment({
    classroomId: selectedClassroom.value.id,
    title: homeworkDraft.title,
    instructions: 'Complete the attached practice and submit your work before the deadline.',
    dueDate: homeworkDraft.dueDate || '2026-06-30',
    fileAttachmentLabel: homeworkDraft.fileLabel || 'No attachment',
    status: 'published'
  })
  homeworkDraft.title = ''
  homeworkDraft.dueDate = ''
  homeworkDraft.fileLabel = ''
  homeworkNotice.value = 'Homework uploaded for this class.'
}

const createMonthlyReport = () => {
  if (!reportDraft.studentId || !reportDraft.note.trim()) {
    reportNotice.value = 'Select a student and add a report note.'
    return
  }

  if (!selectedClassroom.value) return
  const studentProgress = progress.value.find((record) => record.studentId === reportDraft.studentId && record.classroomId === selectedClassroom.value?.id)
  saveMonthlyReport({
    classroomId: selectedClassroom.value.id,
    studentId: reportDraft.studentId,
    teacherId: teacherId.value,
    month: 'June 2026',
    attendanceSummary: `${studentProgress?.attendancePercentage ?? 0}% attendance this month.`,
    academicProgress: reportDraft.note,
    strengths: reportDraft.focus,
    areasForImprovement: `Continue targeted practice toward the next ${Math.max(100 - reportDraft.mark, 0)}% of the learning goal.`,
    teacherNotes: reportDraft.note,
    status: 'completed'
  })
  reportDraft.note = ''
  reportNotice.value = 'Monthly report created.'
}
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.classroomDetail"
      eyebrow="Teacher"
      title="Assigned class workspace"
      description="View own classes, mark attendance, upload and review homework, give marks, create monthly reports, and contact parents of assigned students."
      height="compact"
    >
      <template #aside>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p class="text-sm font-semibold text-brand-gold">Teacher profile</p>
          <h2 class="mt-2 text-2xl font-bold">{{ teacher?.name ?? currentUser?.name ?? 'Teacher' }}</h2>
          <p class="mt-2 text-sm leading-6 text-slate-200">{{ role.description }}</p>
        </div>
      </template>
    </PageHero>

    <section class="bg-white py-8 dark:bg-slate-950">
      <div class="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard v-for="stat in stats" :key="stat.label" v-bind="stat" />
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-8">
        <PermissionPanel title="Teacher permissions" :permissions="role.permissions" />

        <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">View own classes</h2>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Only classes assigned to this teacher are shown here.</p>
            </div>
            <select v-model="selectedClassroomId" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="classroom in assignedClassrooms" :key="classroom.id" :value="classroom.id">{{ classroom.className }}</option>
            </select>
          </div>
          <div class="mt-5 grid gap-4 lg:grid-cols-3">
            <article v-for="classroom in assignedClassrooms" :key="classroom.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
              <h3 class="font-bold text-slate-950 dark:text-white">{{ classroom.className }}</h3>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ getCourseTitle(classroom.courseId) }}</p>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {{ scheduleForClassroom(classroom.id)?.day }}, {{ scheduleForClassroom(classroom.id)?.startTime }} {{ scheduleForClassroom(classroom.id)?.timezone }}
              </p>
              <BaseButton :to="`/classrooms/${classroom.id}`" size="sm" class="mt-4">Open class</BaseButton>
            </article>
          </div>
        </div>

        <article v-if="selectedClassroom" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Selected class schedule</h2>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Open the classroom to update its Google Meet or Zoom link.</p>
            </div>
            <BaseButton :to="`/classrooms/${selectedClassroom.id}`" size="sm">Update meeting link</BaseButton>
          </div>
          <ClassroomClassScheduleSummary
            class="mt-5"
            :schedule="selectedSchedule"
            :live-session="selectedLiveSession"
            :teacher-name="teacher?.name"
            :can-join="true"
            access-message=""
          />
        </article>

        <div class="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveAttendance">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Mark attendance</h2>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {{ selectedClassroom?.className }} | {{ selectedSchedule?.day }}, {{ selectedSchedule?.startTime }}-{{ selectedSchedule?.endTime }}
            </p>
            <div class="mt-5">
              <label for="teacher-attendance-date" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Class date</label>
              <input id="teacher-attendance-date" v-model="attendanceDate" type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
            </div>
            <div class="mt-5 grid gap-3">
              <label
                v-for="student in selectedStudents"
                :key="student.id"
                class="grid gap-3 rounded-md border border-slate-200 p-4 dark:border-slate-800 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <span>
                  <span class="block font-semibold text-slate-950 dark:text-white">{{ student.name }}</span>
                  <span class="text-sm text-slate-500 dark:text-slate-400">{{ student.currentLevel }}</span>
                </span>
                <select v-model="attendanceDraft[student.id]" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="status in classroomAttendanceStatuses" :key="status" :value="status">{{ status }}</option>
                </select>
              </label>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">Save attendance</BaseButton>
              <p v-if="attendanceSaved" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Attendance saved.</p>
            </div>
          </form>

          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="uploadHomework">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Upload homework</h2>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="homework-title">Homework title</label>
                <input id="homework-title" v-model="homeworkDraft.title" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="homework-due">Due date</label>
                <input id="homework-due" v-model="homeworkDraft.dueDate" type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div class="sm:col-span-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="homework-file">File or instructions</label>
                <input id="homework-file" v-model="homeworkDraft.fileLabel" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">Upload homework</BaseButton>
              <p v-if="homeworkNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ homeworkNotice }}</p>
            </div>
          </form>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Review homework</h2>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <div v-for="submission in reviewQueue" :key="submission.id" class="p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ submission.studentName }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ submission.fileUploadLabel }}</p>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ submission.textAnswer }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(submission.status)]">{{ submission.status }}</span>
                </div>
              </div>
            </div>
          </article>

          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Give marks</h2>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <div v-for="row in marksRows" :key="row.id" class="p-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ row.studentName }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ row.classroomName }}</p>
                  </div>
                  <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ row.quizAverage }}%</p>
                </div>
                <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ row.teacherNotes }}</p>
              </div>
            </div>
          </article>
        </div>

        <div class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createMonthlyReport">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Create monthly report</h2>
            <div class="mt-5 grid gap-4">
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="report-student">Student</label>
                <select id="report-student" v-model="reportDraft.studentId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="student in selectedStudents" :key="student.id" :value="student.id">{{ student.name }}</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="report-mark">Mark</label>
                <input id="report-mark" v-model.number="reportDraft.mark" min="0" max="100" type="number" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="report-note">Teacher note</label>
                <textarea id="report-note" v-model="reportDraft.note" rows="4" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">Create report</BaseButton>
              <p v-if="reportNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ reportNotice }}</p>
            </div>
          </form>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Contact parents</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="contact in parentContacts" :key="contact.studentName" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <p class="font-bold text-slate-950 dark:text-white">{{ contact.parentName }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Parent of {{ contact.studentName }}</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <a :href="`mailto:${contact.email}`" class="focus-ring rounded-md bg-purple-50 px-3 py-2 text-sm font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold">Email</a>
                  <a :href="`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">WhatsApp</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
