<script setup lang="ts">
import {
  assignmentStatuses,
  attendanceStatuses,
  getClassroomAnnouncements,
  getClassroomAssignments,
  getClassroomAttendance,
  getClassroomById,
  getClassroomHomeworkSubmissions,
  getClassroomProgress,
  getClassroomResources,
  getClassroomSchedule,
  getClassroomStudents,
  getCourseTitle,
  getPaymentForStudent,
  getStatusTone,
  getStudentClassroomAccess,
  getStudentName,
  getTeacherName,
  resourceTypes
} from '~/data/management'
import type {
  AssignmentStatus,
  AttendanceStatus,
  ClassroomAssignment,
  HomeworkSubmission,
  ResourceType,
  StudentClassroomAccess
} from '~/types'

const route = useRoute()

useSeoMeta({
  title: 'Classroom',
  description:
    'Roshanayi Academy classroom page with live class access, assignments, homework submissions, attendance, resources, progress, and announcements.'
})

const tabs = [
  'Overview',
  'Live Class',
  'Assignments',
  'Homework Submissions',
  'Attendance',
  'Resources',
  'Progress',
  'Announcements'
] as const

type ClassroomTab = (typeof tabs)[number]

const classroomId = computed(() => String(route.params.id ?? ''))
const classroom = computed(() => getClassroomById(classroomId.value))
const schedule = computed(() => getClassroomSchedule(classroomId.value))
const enrolledStudents = computed(() => getClassroomStudents(classroomId.value))
const selectedTab = ref<ClassroomTab>('Overview')
const selectedStudentId = ref('')
const assignmentNotice = ref('')
const homeworkNotice = ref('')
const attendanceSaved = ref(false)
const teacherDraftAssignments = ref<ClassroomAssignment[]>([])
const studentDraftSubmissions = ref<HomeworkSubmission[]>([])
const attendanceDraft = reactive<Record<string, AttendanceStatus>>({})

const assignmentDraft = reactive({
  title: '',
  instructions: '',
  dueDate: '',
  fileAttachmentLabel: '',
  status: 'published' as AssignmentStatus
})

const homeworkDraft = reactive({
  assignmentId: '',
  textAnswer: '',
  fileUploadLabel: ''
})

const resourceDraft = reactive({
  title: '',
  type: 'PDF Lesson' as ResourceType,
  fileLabel: ''
})

const fallbackAccess: StudentClassroomAccess = {
  canJoin: false,
  isEnrolled: false,
  requiresPayment: false,
  studentStatus: 'Unknown',
  message: 'Select an enrolled student to preview live class access.'
}

watchEffect(() => {
  const studentIds = enrolledStudents.value.map((student) => student.id)

  if (!studentIds.includes(selectedStudentId.value)) {
    selectedStudentId.value = studentIds[0] ?? ''
  }

  enrolledStudents.value.forEach((student) => {
    attendanceDraft[student.id] = attendanceDraft[student.id] ?? 'present'
  })
})

const courseTitle = computed(() =>
  classroom.value ? getCourseTitle(classroom.value.courseId) : 'Unknown course'
)

const teacherName = computed(() =>
  classroom.value ? getTeacherName(classroom.value.teacherId) : 'Unassigned teacher'
)

const selectedStudent = computed(() =>
  enrolledStudents.value.find((student) => student.id === selectedStudentId.value)
)

const selectedStudentPayment = computed(() =>
  selectedStudent.value ? getPaymentForStudent(selectedStudent.value.id) : undefined
)

const studentAccess = computed(() =>
  selectedStudentId.value
    ? getStudentClassroomAccess(classroomId.value, selectedStudentId.value)
    : fallbackAccess
)

const assignments = computed(() => [
  ...getClassroomAssignments(classroomId.value),
  ...teacherDraftAssignments.value.filter((assignment) => assignment.classroomId === classroomId.value)
])

const homeworkSubmissions = computed(() =>
  [
    ...getClassroomHomeworkSubmissions(classroomId.value),
    ...studentDraftSubmissions.value.filter((submission) => submission.classroomId === classroomId.value)
  ].map((submission) => ({
    ...submission,
    assignmentTitle:
      assignments.value.find((assignment) => assignment.id === submission.assignmentId)?.title ??
      'Unknown assignment',
    studentName: getStudentName(submission.studentId)
  }))
)

const attendanceRows = computed(() =>
  getClassroomAttendance(classroomId.value).map((record) => ({
    ...record,
    studentName: getStudentName(record.studentId)
  }))
)

const resources = computed(() => getClassroomResources(classroomId.value))
const progressRows = computed(() =>
  getClassroomProgress(classroomId.value).map((progress) => ({
    ...progress,
    studentName: getStudentName(progress.studentId)
  }))
)
const announcements = computed(() => getClassroomAnnouncements(classroomId.value))

watchEffect(() => {
  if (!assignments.value.some((assignment) => assignment.id === homeworkDraft.assignmentId)) {
    homeworkDraft.assignmentId = assignments.value[0]?.id ?? ''
  }
})

const createAssignment = () => {
  if (!classroom.value || !assignmentDraft.title.trim()) {
    assignmentNotice.value = 'Add an assignment title first.'
    return
  }

  teacherDraftAssignments.value.push({
    id: `assignment-mock-${teacherDraftAssignments.value.length + 1}`,
    classroomId: classroom.value.id,
    title: assignmentDraft.title.trim(),
    instructions: assignmentDraft.instructions.trim() || 'Teacher instructions will be added.',
    dueDate: assignmentDraft.dueDate || '2026-06-30',
    fileAttachmentLabel: assignmentDraft.fileAttachmentLabel.trim() || 'No attachment yet',
    status: assignmentDraft.status
  })

  assignmentDraft.title = ''
  assignmentDraft.instructions = ''
  assignmentDraft.dueDate = ''
  assignmentDraft.fileAttachmentLabel = ''
  assignmentDraft.status = 'published'
  assignmentNotice.value = 'Mock assignment added for this page preview.'
}

const submitHomework = () => {
  if (!classroom.value || !selectedStudent.value || !homeworkDraft.assignmentId) {
    homeworkNotice.value = 'Select a student and assignment first.'
    return
  }

  studentDraftSubmissions.value.push({
    id: `submission-mock-${studentDraftSubmissions.value.length + 1}`,
    classroomId: classroom.value.id,
    assignmentId: homeworkDraft.assignmentId,
    studentId: selectedStudent.value.id,
    textAnswer: homeworkDraft.textAnswer.trim() || 'Student text answer placeholder.',
    fileUploadLabel: homeworkDraft.fileUploadLabel.trim() || 'No file uploaded yet',
    submittedAt: '2026-06-13',
    status: 'submitted',
    score: null,
    feedback: ''
  })

  homeworkDraft.textAnswer = ''
  homeworkDraft.fileUploadLabel = ''
  homeworkNotice.value = 'Mock homework submitted for review.'
}

const saveAttendance = () => {
  attendanceSaved.value = true
}
</script>

<template>
  <div v-if="classroom">
    <section class="bg-slate-950 py-14 text-white">
      <div class="container-wide">
        <NuxtLink to="/classrooms" class="focus-ring inline-flex rounded-md text-sm font-semibold text-brand-gold">
          Back to classrooms
        </NuxtLink>
        <div class="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">Virtual Classroom</p>
            <h1 class="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">{{ classroom.className }}</h1>
            <p class="mt-4 text-lg font-semibold text-slate-200">{{ courseTitle }}</p>
            <p class="mt-4 max-w-3xl leading-8 text-slate-300">{{ classroom.description }}</p>
          </div>
          <div class="rounded-lg border border-white/10 bg-white/10 p-5">
            <div class="flex flex-wrap gap-2">
              <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(classroom.status)]">{{ classroom.status }}</span>
              <span class="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-slate-950">{{ classroom.meetingProvider }}</span>
            </div>
            <dl class="mt-5 grid gap-3 text-sm text-slate-200">
              <div>
                <dt class="font-bold text-white">Teacher</dt>
                <dd class="mt-1">{{ teacherName }}</dd>
              </div>
              <div>
                <dt class="font-bold text-white">Schedule</dt>
                <dd class="mt-1">
                  {{ schedule ? `${schedule.day}, ${schedule.time} ${schedule.timezone}` : 'Schedule pending' }}
                </dd>
              </div>
              <div>
                <dt class="font-bold text-white">Class Level</dt>
                <dd class="mt-1">{{ classroom.level }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-5 dark:bg-slate-950">
      <div class="container-wide">
        <div class="flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            :class="[
              'focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition',
              selectedTab === tab
                ? 'bg-brand-purple text-white dark:bg-brand-gold dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:text-brand-purple dark:bg-slate-900 dark:text-slate-200 dark:hover:text-brand-gold'
            ]"
            @click="selectedTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <div v-if="selectedTab === 'Overview'" class="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="eyebrow">Overview</p>
                <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Classroom details</h2>
              </div>
              <BaseButton v-if="schedule" :to="`/classrooms/${classroom.id}`" variant="outline">Refresh preview</BaseButton>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Course</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ courseTitle }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Teacher</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ teacherName }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Schedule</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">
                  {{ schedule ? `${schedule.day}, ${schedule.time}` : 'Pending' }}
                </p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Timezone</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.timezone ?? 'Pending' }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Capacity</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">
                  {{ enrolledStudents.length }} / {{ schedule?.capacity ?? 0 }}
                </p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Meeting Link</p>
                <p class="mt-1 break-all font-semibold text-brand-purple dark:text-brand-gold">{{ schedule?.meetingLink ?? 'Not set' }}</p>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="font-bold text-slate-950 dark:text-white">Enrolled students</h3>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <article
                  v-for="student in enrolledStudents"
                  :key="student.id"
                  class="rounded-md border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-bold text-slate-950 dark:text-white">{{ student.name }}</p>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ student.currentLevel }}</p>
                    </div>
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(student.status)]">{{ student.status }}</span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <aside class="grid gap-5">
            <article class="rounded-lg border border-purple-100 bg-purple-50 p-5 dark:border-purple-900/50 dark:bg-purple-950/30">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Role permissions</h2>
              <div class="mt-4 grid gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                <p><strong>Teacher:</strong> manage own classrooms, add assignments, mark attendance, add resources, review homework, and write progress notes.</p>
                <p><strong>Student:</strong> join assigned classroom, view assignments, submit homework, view resources, and see own progress.</p>
                <p><strong>Parent:</strong> view child classroom, attendance, homework status, teacher notes, payment status, and request progress report.</p>
                <p><strong>Admin:</strong> create classrooms, assign teachers/students, manage schedules, meeting links, attendance, progress, and announcements.</p>
              </div>
            </article>

            <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Teacher restrictions</h2>
              <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                <li>Teachers do not see parent payment details.</li>
                <li>Teachers cannot collect fees directly.</li>
                <li>Teachers see only their assigned classrooms and students.</li>
                <li>Teachers cannot export student contact lists.</li>
              </ul>
            </article>
          </aside>
        </div>

        <div v-else-if="selectedTab === 'Live Class'" class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p class="eyebrow">Access Preview</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Join class rule check</h2>
            <label class="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-access">
              View as student
            </label>
            <select
              id="student-access"
              v-model="selectedStudentId"
              class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            >
              <option v-for="student in enrolledStudents" :key="student.id" :value="student.id">
                {{ student.name }} - {{ student.status }}
              </option>
            </select>

            <div class="mt-5 rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Payment status for parent view</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ selectedStudentPayment?.status ?? 'No payment record yet' }}</p>
            </div>

            <div class="mt-5 rounded-md bg-purple-50 p-4 dark:bg-purple-950/40">
              <p :class="['inline-flex rounded-full px-3 py-1 text-xs font-bold', getStatusTone(studentAccess.studentStatus)]">
                {{ studentAccess.studentStatus }}
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{{ studentAccess.message }}</p>
            </div>
          </aside>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="eyebrow">Live Class</p>
                <h2 class="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{{ classroom.meetingProvider }} meeting link</h2>
                <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  Phase 1 opens an external meeting link. Built-in video calling can be added later without changing the classroom model.
                </p>
              </div>
              <span class="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-slate-950">{{ classroom.meetingProvider }}</span>
            </div>

            <div class="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Meeting URL</p>
              <p class="mt-2 break-all text-lg font-bold text-brand-purple dark:text-brand-gold">{{ schedule?.meetingLink ?? 'Meeting link pending' }}</p>
              <div class="mt-5">
                <a
                  v-if="studentAccess.canJoin && schedule"
                  :href="schedule.meetingLink"
                  target="_blank"
                  rel="noreferrer"
                  class="focus-ring inline-flex rounded-md bg-brand-purple px-5 py-3 text-sm font-bold text-white shadow-lift hover:bg-brand-purpleDark dark:bg-brand-gold dark:text-slate-950 dark:hover:bg-amber-300"
                >
                  Join Live Class
                </a>
                <div v-else class="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100">
                  {{ studentAccess.message }}
                </div>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="font-bold text-slate-950 dark:text-white">Future built-in video structure</h3>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="feature in classroom.futureVideoFeatures"
                  :key="feature"
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'Assignments'" class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createAssignment">
            <p class="eyebrow">Teacher Tool</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Create assignment</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Mock only. Later this can save to a backend and attach real files.</p>

            <div class="mt-5 grid gap-4">
              <div>
                <label for="assignment-title" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Title</label>
                <input id="assignment-title" v-model="assignmentDraft.title" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="assignment-instructions" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Instructions</label>
                <textarea id="assignment-instructions" v-model="assignmentDraft.instructions" rows="4" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="assignment-due" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Due date</label>
                  <input id="assignment-due" v-model="assignmentDraft.dueDate" type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                </div>
                <div>
                  <label for="assignment-status" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Status</label>
                  <select id="assignment-status" v-model="assignmentDraft.status" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                    <option v-for="status in assignmentStatuses" :key="status" :value="status">{{ status }}</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="assignment-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">File attachment placeholder</label>
                <input id="assignment-file" v-model="assignmentDraft.fileAttachmentLabel" type="text" placeholder="lesson.pdf" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">Add assignment</BaseButton>
              <p v-if="assignmentNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ assignmentNotice }}</p>
            </div>
          </form>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-2xl font-bold text-slate-950 dark:text-white">Assignments</h2>
            <div class="mt-5 grid gap-4">
              <article v-for="assignment in assignments" :key="assignment.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 class="font-bold text-slate-950 dark:text-white">{{ assignment.title }}</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ assignment.instructions }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(assignment.status)]">{{ assignment.status }}</span>
                </div>
                <div class="mt-4 grid gap-3 sm:grid-cols-3">
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800"><strong>Due:</strong> {{ assignment.dueDate }}</p>
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800"><strong>File:</strong> {{ assignment.fileAttachmentLabel }}</p>
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800"><strong>Class:</strong> {{ classroom.className }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'Homework Submissions'" class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="submitHomework">
            <p class="eyebrow">Student Tool</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Submit homework</h2>
            <div class="mt-5 grid gap-4">
              <div>
                <label for="homework-student" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Student</label>
                <select id="homework-student" v-model="selectedStudentId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="student in enrolledStudents" :key="student.id" :value="student.id">{{ student.name }}</option>
                </select>
              </div>
              <div>
                <label for="homework-assignment" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Assignment</label>
                <select id="homework-assignment" v-model="homeworkDraft.assignmentId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="assignment in assignments" :key="assignment.id" :value="assignment.id">{{ assignment.title }}</option>
                </select>
              </div>
              <div>
                <label for="homework-answer" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Text answer</label>
                <textarea id="homework-answer" v-model="homeworkDraft.textAnswer" rows="4" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div>
                <label for="homework-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">File upload placeholder</label>
                <input id="homework-file" v-model="homeworkDraft.fileUploadLabel" type="text" placeholder="homework-photo.jpg" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">Submit homework</BaseButton>
              <p v-if="homeworkNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ homeworkNotice }}</p>
            </div>
          </form>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">Teacher review queue</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Teachers can review homework, add scores, feedback, and mark reviewed.</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[840px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">Student</th>
                    <th class="px-5 py-3 font-semibold">Assignment</th>
                    <th class="px-5 py-3 font-semibold">Submitted</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 font-semibold">Score</th>
                    <th class="px-5 py-3 font-semibold">Feedback</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="submission in homeworkSubmissions" :key="submission.id">
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ submission.studentName }}</td>
                    <td class="px-5 py-4">{{ submission.assignmentTitle }}</td>
                    <td class="px-5 py-4">{{ submission.submittedAt }}</td>
                    <td class="px-5 py-4">
                      <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(submission.status)]">{{ submission.status }}</span>
                    </td>
                    <td class="px-5 py-4">{{ submission.score ?? 'Pending' }}</td>
                    <td class="px-5 py-4">{{ submission.feedback || 'Awaiting review' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'Attendance'" class="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveAttendance">
            <p class="eyebrow">Teacher Tool</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Mark attendance</h2>
            <div class="mt-5 grid gap-3">
              <label
                v-for="student in enrolledStudents"
                :key="student.id"
                class="grid gap-3 rounded-md border border-slate-200 p-4 dark:border-slate-800 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <span>
                  <span class="block font-semibold text-slate-950 dark:text-white">{{ student.name }}</span>
                  <span class="text-sm text-slate-500 dark:text-slate-400">{{ student.currentLevel }}</span>
                </span>
                <select v-model="attendanceDraft[student.id]" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="status in attendanceStatuses" :key="status" :value="status">{{ status }}</option>
                </select>
              </label>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">Save attendance</BaseButton>
              <p v-if="attendanceSaved" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Mock attendance saved for this preview.</p>
            </div>
          </form>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">Attendance history</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Parents can view summaries. Admin can review history across all classrooms.</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[720px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">Date</th>
                    <th class="px-5 py-3 font-semibold">Student</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 font-semibold">Trial</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="record in attendanceRows" :key="record.id">
                    <td class="px-5 py-4">{{ record.date }}</td>
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ record.studentName }}</td>
                    <td class="px-5 py-4">
                      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ record.status }}</span>
                    </td>
                    <td class="px-5 py-4">{{ record.isTrialClass ? 'Yes' : 'No' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'Resources'" class="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p class="eyebrow">Teacher Tool</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Add resource placeholder</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">This is a mock upload structure for PDFs, audio, video links, Quran materials, vocabulary sheets, and class notes.</p>
            <div class="mt-5 grid gap-4">
              <div>
                <label for="resource-title" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Title</label>
                <input id="resource-title" v-model="resourceDraft.title" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="resource-type" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Type</label>
                <select id="resource-type" v-model="resourceDraft.type" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="type in resourceTypes" :key="type" :value="type">{{ type }}</option>
                </select>
              </div>
              <div>
                <label for="resource-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">File or link placeholder</label>
                <input id="resource-file" v-model="resourceDraft.fileLabel" type="text" placeholder="lesson.pdf or video link" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>
          </form>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-2xl font-bold text-slate-950 dark:text-white">Class resources</h2>
            <div class="mt-5 grid gap-4">
              <article v-for="resource in resources" :key="resource.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 class="font-bold text-slate-950 dark:text-white">{{ resource.title }}</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ resource.description }}</p>
                  </div>
                  <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">{{ resource.type }}</span>
                </div>
                <p class="mt-3 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ resource.fileLabel }}</p>
              </article>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'Progress'" class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="progress in progressRows"
            :key="progress.id"
            class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="eyebrow">Progress</p>
                <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ progress.studentName }}</h2>
              </div>
              <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ progress.learningProgress }}%</p>
            </div>
            <div class="mt-5 space-y-4">
              <div>
                <div class="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>Attendance</span>
                  <span>{{ progress.attendancePercentage }}%</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${progress.attendancePercentage}%` }" />
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>Homework completion</span>
                  <span>{{ progress.homeworkCompletion }}%</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${progress.homeworkCompletion}%` }" />
                </div>
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Quiz average</p>
                  <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ progress.quizAverage }}%</p>
                </div>
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Learning progress</p>
                  <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ progress.learningProgress }}%</p>
                </div>
              </div>
              <p class="rounded-md bg-purple-50 p-4 text-sm leading-6 text-slate-700 dark:bg-purple-950/30 dark:text-slate-200">
                {{ progress.teacherNotes }}
              </p>
            </div>
          </article>
        </div>

        <div v-else class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="eyebrow">Announcements</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Class updates</h2>
            </div>
            <BaseButton variant="outline">Post announcement</BaseButton>
          </div>
          <div class="mt-6 grid gap-4">
            <article v-for="announcement in announcements" :key="announcement.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ announcement.type }}</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ announcement.title }}</h3>
                  <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ announcement.message }}</p>
                </div>
                <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <p>{{ announcement.authorRole }}</p>
                  <p>{{ announcement.postedAt }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>

  <section v-else class="section-padding bg-slate-50 dark:bg-slate-950">
    <div class="container-wide">
      <div class="rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <p class="eyebrow">Classroom not found</p>
        <h1 class="mt-3 text-3xl font-bold text-slate-950 dark:text-white">This classroom does not exist.</h1>
        <p class="mt-4 text-slate-600 dark:text-slate-300">Please return to the classroom list and choose an active class group.</p>
        <BaseButton to="/classrooms" class="mt-6">View classrooms</BaseButton>
      </div>
    </div>
  </section>
</template>
