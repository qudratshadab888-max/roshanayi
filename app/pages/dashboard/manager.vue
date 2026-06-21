<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { getRoleDefinition } from '~/data/roles'
import {
  academyToday,
  getAllStudentLifecycleSummaries,
  getLifecycleReportCounts,
  getLifecycleTone,
  getManagerNotifications,
  getManagerOverduePaymentRows
} from '~/data/enrollmentLifecycle'
import {
  getCourseTitle,
  getParentName,
  getStatusTone,
  getStudentName,
  getTeacherName,
  managementCourses,
  managementParents,
  managementStudents,
  managementTeachers
} from '~/data/management'
import type { ClassType, MeetingProvider, Weekday } from '~/types'
import {
  ALL_WEEK_DAYS,
  CLASS_TYPES,
  HOLIDAY_DAYS,
  MEETING_PLATFORMS,
  WEEKDAYS,
  addMinutesToTime,
  getScheduleDaysLabel
} from '~/utils/classSchedule'

useSeoMeta({
  title: 'Manager Dashboard',
  description: 'Manager dashboard for Roshanayi Academy daily operations.'
})

const { currentUser, syncUser } = useRoleAuth()
const role = getRoleDefinition('manager')
const { classroomRecords, schedules, attendance, reports, saveSchedule: persistSchedule } = useClassroomSystem()
const classNotice = ref('')
const paymentActionNotice = ref('')
const paymentActionState = reactive<Record<string, string>>({})
const teacherAssignments = reactive<Record<string, string>>(
  Object.fromEntries(classroomRecords.value.map((classroom) => [classroom.id, classroom.teacherId]))
)

const classDraft = reactive({
  className: '',
  courseId: managementCourses[0]?.id ?? '',
  teacherId: managementTeachers[0]?.id ?? '',
  daysOfWeek: [...WEEKDAYS] as Weekday[],
  startTime: '',
  endTime: '',
  durationMinutes: 60,
  timezone: 'GMT',
  classType: 'Group' as ClassType,
  meetingPlatform: 'Google Meet' as MeetingProvider,
  meetingLink: '',
  meetingId: '',
  meetingPassword: '',
  capacity: 10
})

const createdClasses = ref<Array<typeof classDraft & { id: string }>>([])

watch(
  [() => classDraft.classType, () => classDraft.startTime, () => classDraft.durationMinutes],
  ([classType, startTime, durationMinutes]) => {
    if (classType === 'Group') {
      classDraft.daysOfWeek = [...WEEKDAYS]
      classDraft.durationMinutes = 60
    }
    if (classType === 'Special' && classDraft.capacity > 2) classDraft.capacity = 2
    classDraft.endTime = addMinutesToTime(startTime, durationMinutes) || classDraft.endTime
  }
)

onMounted(() => {
  syncUser()
})

const attendanceIssues = computed(() =>
  attendance.value
    .filter((record) => record.status !== 'present')
    .map((record) => ({
      ...record,
      studentName: getStudentName(record.studentId),
      teacherName: getTeacherName(record.teacherId),
      courseTitle: getCourseTitle(record.courseId)
    }))
)

const lifecycleRows = computed(() => getAllStudentLifecycleSummaries())
const reportCounts = computed(() => getLifecycleReportCounts())
const managerNotifications = computed(() => getManagerNotifications())
const paymentIssues = computed(() => getManagerOverduePaymentRows())

const studentRows = computed(() =>
  managementStudents.map((student) => {
    const lifecycle = lifecycleRows.value.find((row) => row.studentId === student.id)

    return {
      ...student,
      parentName: getParentName(student.parentId),
      courseTitle: getCourseTitle(student.selectedCourseId),
      lifecycle
    }
  })
)

const scheduleRows = computed(() =>
  schedules.value.map((schedule) => ({
    ...schedule,
    courseTitle: getCourseTitle(schedule.courseId),
    teacherName: getTeacherName(schedule.teacherId),
    classroomId: classroomRecords.value.find((classroom) => classroom.scheduleId === schedule.id)?.id
  }))
)

const classroomRows = computed(() =>
  classroomRecords.value.map((classroom) => ({
    ...classroom,
    courseTitle: getCourseTitle(classroom.courseId),
    teacherName: getTeacherName(teacherAssignments[classroom.id] ?? classroom.teacherId),
    schedule: schedules.value.find((schedule) => schedule.id === classroom.scheduleId)
  }))
)

const stats = computed(() => [
  { label: 'Teachers', value: managementTeachers.length, detail: 'Available for assignments', tone: 'emerald' as const },
  { label: 'Parents', value: managementParents.length, detail: 'Families needing service', tone: 'sky' as const },
  { label: 'Students', value: managementStudents.length, detail: 'Enrollment records', tone: 'purple' as const },
  { label: 'Classes', value: classroomRecords.value.length, detail: 'Live class groups', tone: 'amber' as const },
  { label: 'Attendance issues', value: attendanceIssues.value.length, detail: 'Late, absent, or excused', tone: 'rose' as const },
  { label: 'Payment issues', value: paymentIssues.value.length, detail: 'Needs follow-up', tone: 'rose' as const }
])

const reportCards = computed(() => [
  { label: 'Active Students', value: reportCounts.value.activeStudents, detail: 'Paid or currently active enrollment', tone: 'emerald' as const },
  { label: 'Trial Students', value: reportCounts.value.trialStudents, detail: 'Inside the 2-day trial window', tone: 'sky' as const },
  { label: 'Unpaid Students', value: reportCounts.value.unpaidStudents, detail: 'Payment not yet completed', tone: 'amber' as const },
  { label: 'Overdue Students', value: reportCounts.value.overdueStudents, detail: 'More than 2 days past due', tone: 'rose' as const },
  { label: 'Suspended Students', value: reportCounts.value.suspendedStudents, detail: 'Access paused, not deleted', tone: 'rose' as const },
  { label: 'Monthly Reports', value: reports.value.filter((report) => report.status === 'completed').length, detail: `${reports.value.filter((report) => report.status === 'draft').length} drafts awaiting completion`, tone: 'purple' as const }
])

const createClass = () => {
  if (!classDraft.className.trim() || !classDraft.startTime.trim() || !classDraft.endTime.trim() || !classDraft.daysOfWeek.length) {
    classNotice.value = 'Add a class name, start time, and end time before creating the class.'
    return
  }

  const classroomId = `manager-class-${Date.now()}`
  const scheduleId = `manager-schedule-${Date.now()}`
  classroomRecords.value.push({
    id: classroomId,
    className: classDraft.className.trim(),
    courseId: classDraft.courseId,
    teacherId: classDraft.teacherId,
    scheduleId,
    level: managementCourses.find((course) => course.id === classDraft.courseId)?.level ?? 'All Levels',
    status: 'Active',
    meetingProvider: classDraft.meetingPlatform,
    description: 'A newly organized Roshanayi classroom ready for enrollment, scheduling, and live learning.',
    futureVideoFeatures: ['audio/video', 'screen sharing', 'chat', 'recording', 'whiteboard', 'raise hand']
  })
  persistSchedule(
    {
      id: scheduleId,
      courseId: classDraft.courseId,
      teacherId: classDraft.teacherId,
      day: classDraft.daysOfWeek.join(', '),
      daysOfWeek: [...classDraft.daysOfWeek],
      time: classDraft.startTime,
      startTime: classDraft.startTime,
      endTime: classDraft.endTime,
      durationMinutes: classDraft.durationMinutes,
      timezone: classDraft.timezone,
      classType: classDraft.classType,
      meetingPlatform: classDraft.meetingPlatform,
      meetingLink: classDraft.meetingLink,
      meetingId: classDraft.meetingId,
      meetingPassword: classDraft.meetingPassword,
      capacity: classDraft.capacity,
      enrolledStudentIds: []
    },
    classroomId
  )
  createdClasses.value.push({
    ...classDraft,
    id: classroomId
  })
  classDraft.className = ''
  classDraft.startTime = ''
  classDraft.endTime = ''
  teacherAssignments[classroomId] = classDraft.teacherId
  classNotice.value = 'The classroom and its schedule have been created.'
}

const assignTeacher = (classroomId: string) => {
  const classroom = classroomRecords.value.find((item) => item.id === classroomId)
  const schedule = schedules.value.find((item) => item.id === classroom?.scheduleId)
  const teacherId = teacherAssignments[classroomId]
  if (!classroom || !schedule || !teacherId) return

  classroom.teacherId = teacherId
  persistSchedule({ ...schedule, teacherId }, classroom.id)
}

const setPaymentAction = (studentId: string, action: string) => {
  paymentActionState[studentId] = action
  paymentActionNotice.value = action
}

const contactParent = (studentName: string, parentName: string, studentId: string) => {
  setPaymentAction(studentId, `Follow-up with ${parentName} about ${studentName} is ready to record.`)
}

const markContacted = (studentName: string, studentId: string) => {
  setPaymentAction(studentId, `${studentName} marked as contacted.`)
}

const extendAccess = (studentName: string, studentId: string) => {
  setPaymentAction(studentId, `${studentName} access extended for manager review. Payment is still required.`)
}

const suspendStudent = (studentName: string, studentId: string) => {
  setPaymentAction(studentId, `${studentName} access suspended until payment is completed.`)
}

const removeStudentFromClass = (studentName: string, studentId: string) => {
  setPaymentAction(studentId, `${studentName} has been marked for removal from this class. Their academy record remains intact.`)
}
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.management"
      eyebrow="Manager"
      title="Daily academy operations"
      description="Manage teachers, parents, students, class creation, schedules, assignments, reports, attendance issues, and payment issues."
      height="compact"
    >
      <template #aside>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p class="text-sm font-semibold text-brand-gold">Signed in as</p>
          <h2 class="mt-2 text-2xl font-bold">{{ currentUser?.name ?? 'Manager' }}</h2>
          <p class="mt-2 text-sm leading-6 text-slate-200">{{ role.description }}</p>
        </div>
      </template>
    </PageHero>

    <section class="bg-white py-8 dark:bg-slate-950">
      <div class="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <DashboardStatCard v-for="stat in stats" :key="stat.label" v-bind="stat" />
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-8">
        <PermissionPanel
          title="Manager permissions"
          :permissions="role.permissions"
          :restricted-permissions="role.restrictedPermissions"
        />

        <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <DashboardStatCard v-for="card in reportCards" :key="card.label" v-bind="card" />
        </section>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Notification center</h2>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Trial, payment, follow-up, suspension, and reactivation alerts for {{ academyToday }}.</p>
            </div>
            <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold">
              {{ managerNotifications.length }} manager alerts
            </span>
          </div>
          <div class="mt-5 grid gap-4 lg:grid-cols-2">
            <article v-for="notification in managerNotifications" :key="notification.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ notification.type }}</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ notification.title }}</h3>
                  <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ notification.message }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', notification.priority === 'high' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200']">
                  {{ notification.priority }}
                </span>
              </div>
            </article>
          </div>
        </article>

        <div class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createClass">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Create class</h2>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-class-name">Class name</label>
                <input id="manager-class-name" v-model="classDraft.className" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-course">Course</label>
                <select id="manager-course" v-model="classDraft.courseId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="course in managementCourses" :key="course.id" :value="course.id">{{ course.title }}</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-teacher">Teacher</label>
                <select id="manager-teacher" v-model="classDraft.teacherId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="teacher in managementTeachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-class-type">Class type</label>
                <select id="manager-class-type" v-model="classDraft.classType" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="classType in CLASS_TYPES" :key="classType" :value="classType">{{ classType }}</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Days of week</span>
                <div class="mt-2 grid gap-2 sm:grid-cols-4">
                  <label v-for="day in ALL_WEEK_DAYS" :key="day" class="flex items-center gap-2 rounded-md border border-slate-200 p-3 text-sm dark:border-slate-700">
                    <input v-model="classDraft.daysOfWeek" type="checkbox" :value="day" :disabled="classDraft.classType === 'Group'">
                    <span>{{ day }}<span v-if="HOLIDAY_DAYS.includes(day)" class="block text-xs text-rose-500">Holiday</span></span>
                  </label>
                </div>
                <p class="mt-2 text-xs text-slate-500">Group classes are fixed Monday–Friday. Special and Premium classes can use custom days.</p>
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-time">Start time</label>
                <input id="manager-time" v-model="classDraft.startTime" type="text" placeholder="5:00 PM" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-end-time">End time</label>
                <input id="manager-end-time" v-model="classDraft.endTime" type="text" readonly class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-timezone">Timezone</label>
                <input id="manager-timezone" v-model="classDraft.timezone" type="text" placeholder="GMT" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-duration">Duration (minutes)</label>
                <input id="manager-duration" v-model.number="classDraft.durationMinutes" type="number" min="15" step="15" :readonly="classDraft.classType === 'Group'" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm read-only:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:read-only:bg-slate-800">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-capacity">Capacity</label>
                <input id="manager-capacity" v-model.number="classDraft.capacity" min="1" :max="classDraft.classType === 'Special' ? 2 : undefined" type="number" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-platform">Meeting platform</label>
                <select id="manager-platform" v-model="classDraft.meetingPlatform" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="platform in MEETING_PLATFORMS" :key="platform" :value="platform">{{ platform }}</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-link">Meeting link</label>
                <input id="manager-link" v-model="classDraft.meetingLink" type="url" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-meeting-id">Meeting ID</label>
                <input id="manager-meeting-id" v-model="classDraft.meetingId" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="manager-password">Meeting password</label>
                <input id="manager-password" v-model="classDraft.meetingPassword" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">Create class</BaseButton>
              <p v-if="classNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ classNotice }}</p>
            </div>
          </form>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Created classes</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="item in createdClasses" :key="item.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <p class="font-bold text-slate-950 dark:text-white">{{ item.className }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ getCourseTitle(item.courseId) }}</p>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ getTeacherName(item.teacherId) }} | {{ item.daysOfWeek.join(', ') }} | {{ item.startTime }}-{{ item.endTime }} {{ item.timezone }}</p>
                <BaseButton :to="`/classrooms/${item.id}`" size="sm" variant="outline" class="mt-3">Open classroom</BaseButton>
              </div>
              <p v-if="!createdClasses.length" class="rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">No new classes have been created in this session.</p>
            </div>
          </article>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Assign teachers to classes</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[840px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Class</th>
                  <th class="px-5 py-3 font-semibold">Course</th>
                  <th class="px-5 py-3 font-semibold">Current teacher</th>
                  <th class="px-5 py-3 font-semibold">Schedule</th>
                  <th class="px-5 py-3 font-semibold">Assign teacher</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="classroom in classroomRows" :key="classroom.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ classroom.className }}</td>
                  <td class="px-5 py-4">{{ classroom.courseTitle }}</td>
                  <td class="px-5 py-4">{{ classroom.teacherName }}</td>
                  <td class="px-5 py-4">{{ getScheduleDaysLabel(classroom.schedule) }}, {{ classroom.schedule?.time }}</td>
                  <td class="px-5 py-4">
                    <select v-model="teacherAssignments[classroom.id]" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" @change="assignTeacher(classroom.id)">
                      <option v-for="teacher in managementTeachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage teachers</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="teacher in managementTeachers" :key="teacher.id" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="font-bold text-slate-950 dark:text-white">{{ teacher.name }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ teacher.timezone }} | {{ teacher.activeClasses }} active classes</p>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ teacher.specialties.join(', ') }}</p>
              </div>
            </div>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage parents</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="parent in managementParents" :key="parent.id" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="font-bold text-slate-950 dark:text-white">{{ parent.name }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ parent.email }}</p>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ parent.country }} | {{ parent.whatsapp }}</p>
              </div>
            </div>
          </article>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage students</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1080px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Student</th>
                  <th class="px-5 py-3 font-semibold">Parent</th>
                  <th class="px-5 py-3 font-semibold">Course</th>
                  <th class="px-5 py-3 font-semibold">Preferred time</th>
                  <th class="px-5 py-3 font-semibold">Trial Status</th>
                  <th class="px-5 py-3 font-semibold">Payment Status</th>
                  <th class="px-5 py-3 font-semibold">Access</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="student in studentRows" :key="student.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ student.name }}</td>
                  <td class="px-5 py-4">{{ student.parentName }}</td>
                  <td class="px-5 py-4">{{ student.courseTitle }}</td>
                  <td class="px-5 py-4">{{ student.preferredClassTime }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(student.lifecycle?.trialStatus ?? student.status)]">{{ student.lifecycle?.trialStatus ?? student.status }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(student.lifecycle?.paymentStatus ?? 'Unpaid')]">{{ student.lifecycle?.paymentStatus ?? 'Unpaid' }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(student.lifecycle?.accessStatus ?? 'Payment Required')]">{{ student.lifecycle?.accessStatus ?? 'Payment Required' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Organize schedules</h2>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <div v-for="schedule in scheduleRows" :key="schedule.id" class="p-5">
                <p class="font-bold text-slate-950 dark:text-white">{{ schedule.courseTitle }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ getScheduleDaysLabel(schedule) }}, {{ schedule.startTime }}-{{ schedule.endTime }} {{ schedule.timezone }}</p>
                <p class="mt-1 text-xs font-semibold text-brand-purple dark:text-brand-gold">{{ schedule.classType }} · {{ schedule.durationMinutes }} minutes · {{ schedule.meetingPlatform }}</p>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ schedule.teacherName }} | {{ schedule.enrolledStudentIds.length }} / {{ schedule.capacity }}</p>
                <BaseButton v-if="schedule.classroomId" :to="`/classrooms/${schedule.classroomId}`" size="sm" variant="outline" class="mt-3">Edit schedule & meeting</BaseButton>
              </div>
            </div>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">View reports</h2>
            <div class="mt-5 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div class="rounded-md bg-purple-50 p-4 dark:bg-purple-950/40">
                <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ managementStudents.length }}</p>
                <p class="mt-1 font-bold text-slate-950 dark:text-white">Students</p>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Enrollment report</p>
              </div>
              <div class="rounded-md bg-rose-50 p-4 dark:bg-rose-950/40">
                <p class="text-2xl font-black text-rose-700 dark:text-rose-300">{{ attendanceIssues.length }}</p>
                <p class="mt-1 font-bold text-slate-950 dark:text-white">Attendance</p>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Issue report</p>
              </div>
              <div class="rounded-md bg-amber-50 p-4 dark:bg-amber-950/40">
                <p class="text-2xl font-black text-amber-700 dark:text-amber-300">{{ paymentIssues.length }}</p>
                <p class="mt-1 font-bold text-slate-950 dark:text-white">Payments</p>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Issue report</p>
              </div>
            </div>
          </article>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage attendance issues</h2>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <div v-for="issue in attendanceIssues" :key="issue.id" class="p-5">
                <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ issue.studentName }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ issue.courseTitle }} | {{ issue.teacherName }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(issue.status)]">{{ issue.status }}</span>
                </div>
              </div>
            </div>
          </article>

          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage overdue payments</h2>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Students are never deleted automatically. Access is suspended until payment is completed.</p>
                </div>
                <span class="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-200">
                  2-day grace rule
                </span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[920px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">Student Name</th>
                    <th class="px-5 py-3 font-semibold">Parent Name</th>
                    <th class="px-5 py-3 font-semibold">Course</th>
                    <th class="px-5 py-3 font-semibold">Due Date</th>
                    <th class="px-5 py-3 font-semibold">Days Overdue</th>
                    <th class="px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="issue in paymentIssues" :key="issue.studentId">
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ issue.studentName }}</td>
                    <td class="px-5 py-4">{{ issue.parentName }}</td>
                    <td class="px-5 py-4">{{ issue.courseTitle }}</td>
                    <td class="px-5 py-4">{{ issue.dueDate }}</td>
                    <td class="px-5 py-4">
                      <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(issue.paymentStatus)]">{{ issue.daysOverdue }} days</span>
                    </td>
                    <td class="px-5 py-4">
                      <div class="flex flex-wrap gap-2">
                        <button type="button" class="focus-ring rounded-md bg-brand-purple px-3 py-2 text-xs font-bold text-white dark:bg-brand-gold dark:text-slate-950" @click="contactParent(issue.studentName, issue.parentName, issue.studentId)">Contact Parent</button>
                        <button type="button" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200" @click="markContacted(issue.studentName, issue.studentId)">Mark as Contacted</button>
                        <button type="button" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200" @click="extendAccess(issue.studentName, issue.studentId)">Extend Access</button>
                        <button type="button" class="focus-ring rounded-md border border-rose-300 px-3 py-2 text-xs font-bold text-rose-700 dark:border-rose-800 dark:text-rose-200" @click="suspendStudent(issue.studentName, issue.studentId)">Suspend Student</button>
                        <button type="button" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200" @click="removeStudentFromClass(issue.studentName, issue.studentId)">Remove Student from Class</button>
                      </div>
                      <p v-if="paymentActionState[issue.studentId]" class="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300">{{ paymentActionState[issue.studentId] }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="paymentActionNotice" class="border-t border-slate-200 p-5 dark:border-slate-800">
              <p class="rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">{{ paymentActionNotice }}</p>
            </div>
          </article>
        </div>

        <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Monthly report completion</h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Monitor completed reports and drafts that still need teacher attention.</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[760px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Student</th>
                  <th class="px-5 py-3 font-semibold">Teacher</th>
                  <th class="px-5 py-3 font-semibold">Classroom</th>
                  <th class="px-5 py-3 font-semibold">Month</th>
                  <th class="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="report in reports" :key="report.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ getStudentName(report.studentId) }}</td>
                  <td class="px-5 py-4">{{ getTeacherName(report.teacherId) }}</td>
                  <td class="px-5 py-4">{{ classroomRecords.find((item) => item.id === report.classroomId)?.className }}</td>
                  <td class="px-5 py-4">{{ report.month }}</td>
                  <td class="px-5 py-4"><span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(report.status)]">{{ report.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Trial and enrollment tracker</h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Trial start/end, 30-day enrollment windows, next due dates, and access status for every student.</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1100px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Student</th>
                  <th class="px-5 py-3 font-semibold">Trial Start</th>
                  <th class="px-5 py-3 font-semibold">Trial End</th>
                  <th class="px-5 py-3 font-semibold">Trial Status</th>
                  <th class="px-5 py-3 font-semibold">Payment Date</th>
                  <th class="px-5 py-3 font-semibold">Enrollment Start</th>
                  <th class="px-5 py-3 font-semibold">Enrollment End</th>
                  <th class="px-5 py-3 font-semibold">Next Due</th>
                  <th class="px-5 py-3 font-semibold">Access</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="row in lifecycleRows" :key="row.studentId">
                  <td class="px-5 py-4">
                    <p class="font-semibold text-slate-950 dark:text-white">{{ row.studentName }}</p>
                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ row.parentName }}</p>
                  </td>
                  <td class="px-5 py-4">{{ row.trialStartDate || 'Not set' }}</td>
                  <td class="px-5 py-4">{{ row.trialEndDate || 'Not set' }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(row.trialStatus)]">{{ row.trialStatus }}</span>
                  </td>
                  <td class="px-5 py-4">{{ row.paymentDate || 'Not paid' }}</td>
                  <td class="px-5 py-4">{{ row.enrollmentStartDate || 'Pending' }}</td>
                  <td class="px-5 py-4">{{ row.enrollmentEndDate || 'Pending' }}</td>
                  <td class="px-5 py-4">{{ row.nextDueDate || 'Pending' }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(row.accessStatus)]">{{ row.accessStatus }}</span>
                    <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">{{ row.actionRequired }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
