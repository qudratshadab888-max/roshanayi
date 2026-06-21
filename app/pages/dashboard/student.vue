<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { getRoleDefinition } from '~/data/roles'
import {
  getLifecycleTone,
  getStudentLifecycleSummary,
  getStudentNotifications
} from '~/data/enrollmentLifecycle'
import {
  getCourseTitle,
  getStatusTone,
  getStudentClassroomAccess,
  getTeacherName,
  managementStudents
} from '~/data/management'

useSeoMeta({
  title: 'Student Dashboard',
  description: 'Student dashboard for Roshanayi Academy courses, schedule, homework, materials, attendance, marks, and notifications.'
})

const { currentUser, syncUser } = useRoleAuth()
const role = getRoleDefinition('student')
const {
  classroomRecords,
  schedules,
  liveSessions,
  assignments: classroomAssignments,
  materials,
  attendance: attendanceRecords,
  progress,
  reports,
  announcements
} = useClassroomSystem()
const selectedClassroomId = ref('')
const studentId = computed(() =>
  currentUser.value?.role === 'student' && currentUser.value.profileId
    ? currentUser.value.profileId
    : 'student-amina'
)
const student = computed(() =>
  managementStudents.find((item) => item.id === studentId.value) ?? managementStudents[0]
)
const studentLifecycle = computed(() =>
  student.value ? getStudentLifecycleSummary(student.value.id) : undefined
)
const classrooms = computed(() =>
  student.value
    ? classroomRecords.value.filter((classroom) =>
        schedules.value.find((schedule) => schedule.id === classroom.scheduleId)?.enrolledStudentIds.includes(student.value!.id)
      )
    : []
)
const selectedClassroom = computed(() =>
  classrooms.value.find((classroom) => classroom.id === selectedClassroomId.value) ?? classrooms.value[0]
)
const selectedSchedule = computed(() =>
  selectedClassroom.value ? schedules.value.find((schedule) => schedule.id === selectedClassroom.value?.scheduleId) : undefined
)
const selectedLiveSession = computed(() =>
  selectedClassroom.value ? liveSessions.value.find((session) => session.classroomId === selectedClassroom.value?.id) : undefined
)
const attendance = computed(() =>
  student.value ? attendanceRecords.value.filter((record) => record.studentId === student.value?.id) : []
)
const assignments = computed(() =>
  selectedClassroom.value ? classroomAssignments.value.filter((assignment) => assignment.classroomId === selectedClassroom.value?.id) : []
)
const resources = computed(() =>
  selectedClassroom.value ? materials.value.filter((material) => material.classroomId === selectedClassroom.value?.id) : []
)
const marks = computed(() =>
  selectedClassroom.value && student.value
    ? progress.value.filter((record) => record.classroomId === selectedClassroom.value?.id && record.studentId === student.value?.id)
    : []
)
const classroomNotifications = computed(() =>
  selectedClassroom.value ? announcements.value.filter((announcement) => announcement.classroomId === selectedClassroom.value?.id) : []
)
const studentMonthlyReports = computed(() =>
  student.value ? reports.value.filter((report) => report.studentId === student.value?.id) : []
)
const studentSystemNotifications = computed(() =>
  student.value ? getStudentNotifications(student.value.id) : []
)
const notifications = computed(() => [
  ...studentSystemNotifications.value.map((notification) => ({
    id: notification.id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    postedAt: notification.createdAt,
    priority: notification.priority,
    source: 'Academy account'
  })),
  ...classroomNotifications.value.map((notification) => ({
    id: notification.id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    postedAt: notification.postedAt,
    priority: 'normal' as const,
    source: selectedClassroom.value?.className ?? 'Classroom'
  }))
])
const classroomAccess = computed(() =>
  selectedClassroom.value && student.value
    ? getStudentClassroomAccess(selectedClassroom.value.id, student.value.id)
    : undefined
)
const courseTitle = computed(() =>
  selectedClassroom.value ? getCourseTitle(selectedClassroom.value.courseId) : getCourseTitle(student.value?.selectedCourseId ?? '')
)
const teacherName = computed(() =>
  selectedClassroom.value ? getTeacherName(selectedClassroom.value.teacherId) : 'Teacher assignment in progress'
)
const canJoinSelectedClass = computed(() =>
  Boolean(classroomAccess.value?.canJoin && studentLifecycle.value?.canAccessClass && selectedSchedule.value)
)
const classAccessMessage = computed(() => {
  if (studentLifecycle.value && !studentLifecycle.value.canAccessClass) {
    return studentLifecycle.value.actionRequired
  }

  return classroomAccess.value?.message ?? 'We are confirming your class access.'
})

const attendancePercent = computed(() => {
  if (!attendance.value.length) {
    return 0
  }

  const presentCount = attendance.value.filter((record) => record.status === 'present' || record.status === 'late').length

  return Math.round((presentCount / attendance.value.length) * 100)
})

const stats = computed(() => [
  { label: 'My courses', value: classrooms.value.length, detail: courseTitle.value, tone: 'purple' as const },
  { label: 'Attendance', value: `${attendancePercent.value}%`, detail: `${attendance.value.length} records`, tone: 'sky' as const },
  { label: 'Homework', value: assignments.value.length, detail: 'Current class assignments', tone: 'amber' as const },
  {
    label: 'Payment status',
    value: studentLifecycle.value?.paymentStatus ?? 'Unpaid',
    detail: studentLifecycle.value?.nextDueDate ? `Next due ${studentLifecycle.value.nextDueDate}` : 'Payment timeline',
    tone: studentLifecycle.value?.accessStatus === 'Suspended'
      ? 'rose' as const
      : studentLifecycle.value?.accessStatus === 'Trial'
        ? 'sky' as const
        : studentLifecycle.value?.paymentStatus === 'Unpaid'
          ? 'amber' as const
          : 'emerald' as const
  },
  { label: 'Notifications', value: studentSystemNotifications.value.length, detail: 'Trial and payment alerts', tone: 'rose' as const }
])

watchEffect(() => {
  if (!classrooms.value.some((classroom) => classroom.id === selectedClassroomId.value)) {
    selectedClassroomId.value = classrooms.value[0]?.id ?? ''
  }
})

onMounted(() => {
  syncUser()
})
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.dashboard"
      eyebrow="Student"
      title="My learning dashboard"
      description="Open courses, schedule, homework, learning materials, attendance, marks, and notifications from one student workspace."
      height="compact"
    >
      <template #aside>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p class="text-sm font-semibold text-brand-gold">Student profile</p>
          <h2 class="mt-2 text-2xl font-bold">{{ student?.name ?? currentUser?.name ?? 'Student' }}</h2>
          <p class="mt-2 text-sm leading-6 text-slate-200">{{ role.description }}</p>
        </div>
      </template>
    </PageHero>

    <section class="bg-white py-8 dark:bg-slate-950">
      <div class="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardStatCard v-for="stat in stats" :key="stat.label" v-bind="stat" />
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-8">
        <PermissionPanel title="Student dashboard access" :permissions="role.permissions" />

        <article v-if="studentLifecycle" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Trial and payment status</h2>
              <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ studentLifecycle.actionRequired }}</p>
            </div>
            <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(studentLifecycle.accessStatus)]">{{ studentLifecycle.accessStatus }}</span>
          </div>
          <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Trial Start Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ studentLifecycle.trialStartDate || 'Not set' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Trial End Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ studentLifecycle.trialEndDate || 'Not set' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Trial Status</p>
              <span :class="['mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(studentLifecycle.trialStatus)]">{{ studentLifecycle.trialStatus }}</span>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Payment Status</p>
              <span :class="['mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(studentLifecycle.paymentStatus)]">{{ studentLifecycle.paymentStatus }}</span>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Payment Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ studentLifecycle.paymentDate || 'Not paid' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Enrollment Start Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ studentLifecycle.enrollmentStartDate || 'Not started' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Enrollment End Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ studentLifecycle.enrollmentEndDate || 'Not scheduled' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Next Due Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ studentLifecycle.nextDueDate || 'Not scheduled' }}</p>
            </div>
          </div>
        </article>

        <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">My courses</h2>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ student?.currentLevel }} | {{ student?.status }}</p>
            </div>
            <select v-model="selectedClassroomId" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">{{ classroom.className }}</option>
            </select>
          </div>
          <div class="mt-5 grid gap-4 lg:grid-cols-3">
            <article v-for="classroom in classrooms" :key="classroom.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="font-bold text-slate-950 dark:text-white">{{ classroom.className }}</h3>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ getCourseTitle(classroom.courseId) }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(classroom.status)]">{{ classroom.status }}</span>
              </div>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">{{ getTeacherName(classroom.teacherId) }}</p>
              <div v-if="studentLifecycle" class="mt-3 flex flex-wrap gap-2">
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(studentLifecycle.paymentStatus)]">{{ studentLifecycle.paymentStatus }}</span>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(studentLifecycle.accessStatus)]">{{ studentLifecycle.accessStatus }}</span>
              </div>
              <BaseButton :to="`/classrooms/${classroom.id}`" size="sm" class="mt-4">Open classroom</BaseButton>
            </article>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Schedule</h2>
            <ClassroomClassScheduleSummary
              class="mt-5"
              :schedule="selectedSchedule"
              :live-session="selectedLiveSession"
              :teacher-name="teacherName"
              :can-join="canJoinSelectedClass"
              :access-message="classAccessMessage"
            />
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Homework</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="assignment in assignments" :key="assignment.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ assignment.title }}</p>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ assignment.instructions }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(assignment.status)]">{{ assignment.status }}</span>
                </div>
                <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">Due {{ assignment.dueDate }} | {{ assignment.fileAttachmentLabel }}</p>
              </div>
            </div>
          </article>
        </div>

        <div class="grid gap-8 xl:grid-cols-3">
          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Learning materials</h2>
            <div class="mt-5 grid gap-4">
              <a
                v-for="resource in resources"
                :key="resource.id"
                :href="resource.url"
                class="focus-ring rounded-md border border-slate-200 p-4 dark:border-slate-800"
              >
                <p class="font-bold text-slate-950 dark:text-white">{{ resource.title }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ resource.type }} | {{ resource.fileLabel }}</p>
              </a>
            </div>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Attendance</h2>
            <div class="mt-5 grid gap-3">
              <div v-for="record in attendance" :key="record.id" class="flex items-center justify-between rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <span class="font-semibold text-slate-950 dark:text-white">{{ record.date }}</span>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(record.status)]">{{ record.status }}</span>
              </div>
            </div>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Marks</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="mark in marks" :key="mark.id" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <div class="flex items-start justify-between gap-4">
                  <p class="font-bold text-slate-950 dark:text-white">Quiz average</p>
                  <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ mark.quizAverage }}%</p>
                </div>
                <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">Homework completion: {{ mark.homeworkCompletion }}%</p>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Learning progress: {{ mark.learningProgress }}%</p>
              </div>
            </div>
          </article>
        </div>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-xl font-bold text-slate-950 dark:text-white">My monthly progress</h2>
          <div class="mt-5 grid gap-4 lg:grid-cols-2">
            <div v-for="report in studentMonthlyReports" :key="report.id" class="rounded-md border border-slate-200 p-5 dark:border-slate-800">
              <div class="flex items-start justify-between gap-3">
                <p class="font-bold text-slate-950 dark:text-white">{{ report.month }}</p>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(report.status)]">{{ report.status }}</span>
              </div>
              <p class="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{{ report.academicProgress }}</p>
              <p class="mt-3 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Teacher notes</p>
              <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ report.teacherNotes }}</p>
            </div>
            <p v-if="!studentMonthlyReports.length" class="rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Your monthly report will appear here after your teacher publishes it.</p>
          </div>
        </article>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-xl font-bold text-slate-950 dark:text-white">Notifications</h2>
          <div v-if="notifications.length" class="mt-5 grid gap-4 lg:grid-cols-2">
            <div v-for="notification in notifications" :key="notification.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ notification.type }}</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ notification.title }}</h3>
                  <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ notification.message }}</p>
                  <p class="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ notification.source }} | {{ notification.postedAt }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', notification.priority === 'high' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200']">
                  {{ notification.priority }}
                </span>
              </div>
            </div>
          </div>
          <p v-else class="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">No active notifications.</p>
        </article>
      </div>
    </section>
  </div>
</template>
