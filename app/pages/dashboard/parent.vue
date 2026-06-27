<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { getRoleDefinition } from '~/data/roles'
import {
  getLifecycleTone,
  getParentLifecycleSummaries,
  getParentNotifications,
  getStudentLifecycleSummary
} from '~/data/enrollmentLifecycle'
import {
  getCourseTitle,
  getParentStudents,
  getPaymentForStudent,
  getStatusTone,
  getTeacherName,
  managementParents
} from '~/data/management'

useSeoMeta({
  title: 'Parent Dashboard',
  description: 'Parent dashboard for children, attendance, homework, marks, reports, payments, notifications, and teacher contact.'
})

const { currentUser, syncUser } = useRoleAuth()
const { getRegisteredParent, getRegisteredStudent, getRegisteredStudentsForParent } = useFamilyAccounts()
const { initialize: initializePayments, getStudentPaymentAccess, getNotificationsForParent } = usePaymentSystem()
const role = getRoleDefinition('parent')
const { getApplicationTeacherName } = useTeacherApplications()
const {
  classroomRecords,
  schedules,
  liveSessions,
  assignments,
  submissions,
  attendance,
  progress,
  reports,
  announcements
} = useClassroomSystem()
const selectedChildId = ref('')
const messageNotice = ref('')
const parentId = computed(() =>
  currentUser.value?.role === 'parent' && currentUser.value.profileId
    ? currentUser.value.profileId
    : 'parent-farzana'
)
const registeredParent = computed(() => getRegisteredParent(parentId.value))
const parent = computed(() =>
  registeredParent.value ?? managementParents.find((item) => item.id === parentId.value) ?? managementParents[0]
)
const children = computed(() =>
  registeredParent.value ? getRegisteredStudentsForParent(parentId.value) : getParentStudents(parentId.value)
)
const selectedChild = computed(() =>
  children.value.find((child) => child.id === selectedChildId.value) ?? children.value[0]
)
const selectedClassrooms = computed(() =>
  selectedChild.value
    ? classroomRecords.value.filter((classroom) =>
        schedules.value.find((schedule) => schedule.id === classroom.scheduleId)?.enrolledStudentIds.includes(selectedChild.value!.id)
      )
    : []
)
const selectedPayment = computed(() =>
  selectedChild.value ? getPaymentForStudent(selectedChild.value.id) : undefined
)
const selectedAttendance = computed(() =>
  selectedChild.value ? attendance.value.filter((record) => record.studentId === selectedChild.value?.id) : []
)
const selectedSchedule = computed(() =>
  selectedChild.value
    ? schedules.value.find((schedule) => schedule.enrolledStudentIds.includes(selectedChild.value!.id))
    : undefined
)
const selectedScheduleClassroom = computed(() =>
  selectedSchedule.value ? classroomRecords.value.find((classroom) => classroom.scheduleId === selectedSchedule.value?.id) : undefined
)
const selectedLiveSession = computed(() =>
  selectedScheduleClassroom.value
    ? liveSessions.value.find((session) => session.classroomId === selectedScheduleClassroom.value?.id)
    : undefined
)
const selectedAssignments = computed(() =>
  assignments.value.filter((assignment) => selectedClassrooms.value.some((classroom) => classroom.id === assignment.classroomId))
)
const selectedHomework = computed(() =>
  submissions.value.filter(
    (submission) => submission.studentId === selectedChild.value?.id && selectedClassrooms.value.some((classroom) => classroom.id === submission.classroomId)
  )
)
const selectedMarks = computed(() =>
  progress.value.filter(
    (record) => record.studentId === selectedChild.value?.id && selectedClassrooms.value.some((classroom) => classroom.id === record.classroomId)
  )
)
const selectedClassroomNotifications = computed(() =>
  selectedClassrooms.value.flatMap((classroom) =>
    announcements.value.filter((announcement) => announcement.classroomId === classroom.id).map((announcement) => ({
      ...announcement,
      classroomName: classroom.className
    }))
  )
)
const selectedMonthlyReports = computed(() =>
  reports.value.filter((report) => report.studentId === selectedChild.value?.id)
)
const lifecycleSummaries = computed(() => getParentLifecycleSummaries(parentId.value))
const selectedLifecycle = computed(() =>
  selectedChild.value && !getRegisteredStudent(selectedChild.value.id) ? getStudentLifecycleSummary(selectedChild.value.id) : undefined
)
const selectedPaymentAccess = computed(() => selectedChild.value ? getStudentPaymentAccess(selectedChild.value.id) : undefined)
const parentNotifications = computed(() => [
  ...getParentNotifications(parentId.value),
  ...getNotificationsForParent(parentId.value)
])
const selectedSystemNotifications = computed(() =>
  selectedChild.value
    ? parentNotifications.value.filter((notification) => notification.studentId === selectedChild.value?.id)
    : []
)
const teacherContacts = computed(() =>
  selectedClassrooms.value.map((classroom) => ({
    className: classroom.className,
    teacherName: getApplicationTeacherName(classroom.teacherId) ?? getTeacherName(classroom.teacherId),
    courseTitle: getCourseTitle(classroom.courseId)
  }))
)

const childRows = computed(() =>
  children.value.map((child) => {
    const childAttendance = attendance.value.filter((record) => record.studentId === child.id)
    const presentCount = childAttendance.filter((record) => record.status === 'present' || record.status === 'late').length
    const payment = getPaymentForStudent(child.id)
    const lifecycle = lifecycleSummaries.value.find((summary) => summary.studentId === child.id)

    return {
      child,
      courseTitle: 'courseName' in child ? child.courseName : getCourseTitle(child.selectedCourseId),
      attendancePercent: childAttendance.length ? Math.round((presentCount / childAttendance.length) * 100) : 0,
      paymentStatus: getStudentPaymentAccess(child.id).invoiceStatus ?? lifecycle?.paymentStatus ?? payment?.status ?? 'Unpaid',
      hasSeparateLogin: 'hasSeparateLogin' in child ? Boolean(child.hasSeparateLogin) : false,
      lifecycle
    }
  })
)

const stats = computed(() => [
  { label: 'Children', value: children.value.length, detail: 'Linked to this parent account', tone: 'purple' as const },
  { label: 'Attendance records', value: selectedAttendance.value.length, detail: selectedChild.value?.name ?? 'Selected child', tone: 'sky' as const },
  { label: 'Notifications', value: selectedSystemNotifications.value.length, detail: 'Trial and payment alerts', tone: 'amber' as const },
  { label: 'Payment status', value: selectedPaymentAccess.value?.invoiceStatus ?? selectedLifecycle.value?.paymentStatus ?? selectedPayment.value?.status ?? 'Unpaid', detail: selectedPaymentAccess.value?.nextDueDate ? `Next due ${selectedPaymentAccess.value.nextDueDate}` : 'No payment record', tone: selectedPaymentAccess.value?.canAccess ? 'emerald' as const : 'rose' as const }
])

watchEffect(() => {
  if (!children.value.some((child) => child.id === selectedChildId.value)) {
    selectedChildId.value = children.value[0]?.id ?? ''
  }
})

onMounted(() => {
  syncUser()
  initializePayments()
})

const sendTeacherMessage = (teacherName: string) => {
  messageNotice.value = `Your contact request for ${teacherName} has been noted.`
}
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.dashboard"
      eyebrow="Parent"
      title="Family dashboard"
      description="Manage multiple children from one account with attendance, homework, marks, monthly reports, payment status, notifications, and teacher contact."
      height="compact"
    >
      <template #aside>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p class="text-sm font-semibold text-brand-gold">Parent account</p>
          <h2 class="mt-2 text-2xl font-bold">{{ parent?.name ?? currentUser?.name ?? 'Parent' }}</h2>
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
        <PermissionPanel title="Parent dashboard access" :permissions="role.permissions" />
        <BaseButton to="/dashboard/parent/payments" class="justify-self-start">Open Family Payments</BaseButton>

        <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Children list</h2>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Select a child to review their learning and account details.</p>
            </div>
            <select v-model="selectedChildId" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="child in children" :key="child.id" :value="child.id">{{ child.name }}</option>
            </select>
          </div>
          <div class="mt-5 grid gap-4 lg:grid-cols-2">
            <button
              v-for="row in childRows"
              :key="row.child.id"
              type="button"
              :class="[
                'focus-ring rounded-lg border p-5 text-left transition',
                selectedChildId === row.child.id
                  ? 'border-brand-purple bg-purple-50 dark:border-brand-gold dark:bg-purple-950/40'
                  : 'border-slate-200 bg-white hover:border-brand-purple dark:border-slate-800 dark:bg-slate-900'
              ]"
              @click="selectedChildId = row.child.id"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-bold text-slate-950 dark:text-white">{{ row.child.name }}</h3>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ row.courseTitle }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(row.child.status)]">{{ row.child.status }}</span>
              </div>
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <p class="rounded-md bg-white p-3 text-sm dark:bg-slate-950">Attendance: <strong>{{ row.attendancePercent }}%</strong></p>
                <p class="rounded-md bg-white p-3 text-sm dark:bg-slate-950">Payment: <strong>{{ row.paymentStatus }}</strong></p>
              </div>
              <div class="mt-3 rounded-md bg-white p-3 text-sm dark:bg-slate-950">
                <p class="font-semibold text-slate-700 dark:text-slate-200">
                  Has separate login:
                  <span :class="row.hasSeparateLogin ? 'text-emerald-600 dark:text-emerald-300' : 'text-sky-600 dark:text-sky-300'">
                    {{ row.hasSeparateLogin ? 'Yes' : 'No' }}
                  </span>
                </p>
                <p class="mt-1 text-slate-500 dark:text-slate-400">
                  {{ row.hasSeparateLogin ? 'Student can log in separately' : 'Managed by parent account' }}
                </p>
              </div>
              <div v-if="row.lifecycle" class="mt-3 grid gap-2 sm:grid-cols-3">
                <span :class="['rounded-md px-3 py-2 text-xs font-bold', getLifecycleTone(row.lifecycle.trialStatus)]">{{ row.lifecycle.trialStatus }}</span>
                <span :class="['rounded-md px-3 py-2 text-xs font-bold', getLifecycleTone(row.lifecycle.paymentStatus)]">{{ row.lifecycle.paymentStatus }}</span>
                <span :class="['rounded-md px-3 py-2 text-xs font-bold', getLifecycleTone(row.lifecycle.accessStatus)]">{{ row.lifecycle.accessStatus }}</span>
              </div>
            </button>
          </div>
        </div>

        <section v-if="selectedChild" id="child-classes" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p class="eyebrow">Selected child</p>
              <h2 class="mt-2 text-xl font-bold text-slate-950 dark:text-white">{{ selectedChild.name }} learning record</h2>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Open this child's classrooms or move directly to a specific family record.</p>
            </div>
            <nav class="flex flex-wrap gap-2" aria-label="Child record sections">
              <a href="#child-attendance" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">Attendance</a>
              <a href="#child-homework" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">Homework</a>
              <a href="#child-reports" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">Reports</a>
              <a href="#child-notifications" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">Notifications</a>
              <a href="#child-payment" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200">Payment</a>
            </nav>
          </div>
          <div v-if="selectedClassrooms.length" class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="classroom in selectedClassrooms" :key="classroom.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
              <p class="font-bold text-slate-950 dark:text-white">{{ classroom.className }}</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ getCourseTitle(classroom.courseId) }}</p>
              <BaseButton :to="`/classrooms/${classroom.id}`" size="sm" class="mt-3">Open classroom</BaseButton>
            </div>
          </div>
          <p v-else class="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Class placement is still being confirmed for this child.</p>
        </section>

        <article v-if="selectedLifecycle" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ selectedLifecycle.studentName }} enrollment timeline</h2>
              <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ selectedPaymentAccess?.message ?? selectedLifecycle.actionRequired }}</p>
            </div>
            <PaymentStatusBadge :status="selectedPaymentAccess?.status ?? selectedLifecycle.accessStatus" />
          </div>
          <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Trial Start Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ selectedLifecycle.trialStartDate || 'Not set' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Trial End Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ selectedLifecycle.trialEndDate || 'Not set' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Trial Status</p>
              <span :class="['mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold', getLifecycleTone(selectedLifecycle.trialStatus)]">{{ selectedLifecycle.trialStatus }}</span>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Next Due Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ selectedPaymentAccess?.nextDueDate || selectedLifecycle.nextDueDate || 'Not scheduled' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Payment Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ selectedLifecycle.paymentDate || 'Not paid' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Enrollment Start Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ selectedLifecycle.enrollmentStartDate || 'Not started' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Enrollment End Date</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ selectedLifecycle.enrollmentEndDate || 'Not scheduled' }}</p>
            </div>
            <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Payment Status</p>
              <PaymentStatusBadge class="mt-2" :status="selectedPaymentAccess?.invoiceStatus ?? selectedLifecycle.paymentStatus" />
            </div>
          </div>
        </article>

        <div class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <article id="child-attendance" class="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Attendance</h2>
            <div class="mt-5 grid gap-3">
              <div v-for="record in selectedAttendance" :key="record.id" class="flex items-center justify-between rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div>
                  <p class="font-bold text-slate-950 dark:text-white">{{ record.date }}</p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ getCourseTitle(record.courseId) }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(record.status)]">{{ record.status }}</span>
              </div>
            </div>
          </article>

          <article id="child-homework" class="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Homework</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="assignment in selectedAssignments" :key="assignment.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ assignment.title }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Due {{ assignment.dueDate }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(assignment.status)]">{{ assignment.status }}</span>
                </div>
              </div>
              <div v-for="submission in selectedHomework" :key="submission.id" class="rounded-md bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
                Submitted: {{ submission.fileUploadLabel }} | {{ submission.status }}
              </div>
            </div>
          </article>
        </div>

        <div class="grid gap-8 xl:grid-cols-3">
          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Marks</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="mark in selectedMarks" :key="mark.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex items-start justify-between gap-4">
                  <p class="font-bold text-slate-950 dark:text-white">Quiz average</p>
                  <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ mark.quizAverage }}%</p>
                </div>
                <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">Learning progress: {{ mark.learningProgress }}%</p>
              </div>
            </div>
          </article>

          <article id="child-reports" class="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Monthly reports</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="report in selectedMonthlyReports" :key="report.id" class="rounded-md bg-purple-50 p-4 dark:bg-purple-950/40">
                <div class="flex items-start justify-between gap-3">
                  <p class="font-bold text-slate-950 dark:text-white">{{ report.month }}</p>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(report.status)]">{{ report.status }}</span>
                </div>
                <p class="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{{ report.academicProgress }}</p>
                <p class="mt-3 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Strengths</p>
                <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ report.strengths }}</p>
                <p class="mt-3 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Next focus</p>
                <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ report.areasForImprovement }}</p>
              </div>
              <p v-if="!selectedMonthlyReports.length" class="rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">No monthly report has been published for this child yet.</p>
            </div>
          </article>

          <article id="child-payment" class="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Payment status</h2>
            <div class="mt-5 rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getLifecycleTone(selectedLifecycle?.paymentStatus ?? selectedPayment?.status ?? 'Unpaid')]">{{ selectedLifecycle?.paymentStatus ?? selectedPayment?.status ?? 'Unpaid' }}</span>
              <p class="mt-4 text-2xl font-black text-slate-950 dark:text-white">${{ selectedPayment?.amount ?? 0 }}</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Next due: {{ selectedLifecycle?.nextDueDate || 'Not scheduled' }}</p>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Enrollment: {{ selectedLifecycle?.enrollmentStartDate || 'Not started' }} to {{ selectedLifecycle?.enrollmentEndDate || 'Not scheduled' }}
              </p>
            </div>
          </article>
        </div>

        <div class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <article id="child-notifications" class="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Notifications</h2>
            <div v-if="selectedSystemNotifications.length || selectedClassroomNotifications.length" class="mt-5 grid gap-4">
              <div v-for="notification in selectedSystemNotifications" :key="notification.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ notification.type }}</p>
                    <p class="mt-2 font-bold text-slate-950 dark:text-white">{{ notification.title }}</p>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ notification.message }}</p>
                    <p class="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ notification.createdAt }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', notification.priority === 'high' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200']">
                    {{ notification.priority }}
                  </span>
                </div>
              </div>
              <div v-for="notification in selectedClassroomNotifications" :key="notification.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ notification.type }}</p>
                <p class="mt-2 font-bold text-slate-950 dark:text-white">{{ notification.title }}</p>
                <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ notification.message }}</p>
                <p class="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ notification.classroomName }} | {{ notification.postedAt }}</p>
              </div>
            </div>
            <p v-else class="mt-5 rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">No active notifications for this child.</p>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Contact teacher</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="contact in teacherContacts" :key="contact.className" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <p class="font-bold text-slate-950 dark:text-white">{{ contact.teacherName }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ contact.courseTitle }} | {{ contact.className }}</p>
                <button type="button" class="focus-ring mt-3 rounded-md bg-brand-purple px-4 py-2 text-sm font-bold text-white dark:bg-brand-gold dark:text-slate-950" @click="sendTeacherMessage(contact.teacherName)">
                  Contact teacher
                </button>
              </div>
            </div>
            <p v-if="messageNotice" class="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ messageNotice }}</p>
          </article>
        </div>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-xl font-bold text-slate-950 dark:text-white">Schedule</h2>
          <ClassroomClassScheduleSummary
            class="mt-5"
            :schedule="selectedSchedule"
            :live-session="selectedLiveSession"
            :teacher-name="selectedScheduleClassroom ? (getApplicationTeacherName(selectedScheduleClassroom.teacherId) ?? getTeacherName(selectedScheduleClassroom.teacherId)) : 'Teacher assignment pending'"
            :can-join="Boolean(selectedPaymentAccess?.canAccess)"
            :access-message="selectedPaymentAccess?.message ?? selectedLifecycle?.actionRequired ?? 'Class access is being confirmed.'"
          />
        </article>
      </div>
    </section>
  </div>
</template>
