<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import {
  attendanceRecords,
  classrooms,
  classSchedules,
  getClassroomCardRows,
  getClassroomSchedule,
  getCourseTitle,
  getParentName,
  getParentStudents,
  getPaymentForStudent,
  getParentReferralSummaries,
  getReferralManagementRows,
  getStudentReferralSummary,
  getStatusTone,
  getStudentAttendance,
  getStudentClassrooms,
  getStudentName,
  getStudentNextSchedule,
  getTeacherClassrooms,
  getTeacherName,
  getTeacherSafeRoster,
  getTeacherSchedules,
  getTrialAttendanceCount,
  managementCourses,
  managementParents,
  managementStudents,
  managementTeachers,
  paymentRecords,
  referralGoalCount,
  studentStatuses,
  teacherCanExportStudentLists
} from '~/data/management'
import {
  getLocalizedScheduleLabel,
  getLocalizedValue,
  getReferralNoteLabel,
  getStatusLabel,
  getUiCopy
} from '~/data/uiCopy'
import type { ReferralRewardStatus } from '~/types'

const { locale } = useI18n()
const ui = computed(() => getUiCopy(locale.value))
const localText = (value: string) => getLocalizedValue(locale.value, value)
const localList = (items: string[]) =>
  items.map((item) => localText(item)).join(locale.value === 'en' ? ', ' : '، ')
const scheduleLabel = (day: string, time?: string, timezone?: string) =>
  getLocalizedScheduleLabel(locale.value, day, time, timezone)
const courseTitleById = (courseId: string) => localText(getCourseTitle(courseId))
const classroomScheduleLabel = (classroomId: string) => {
  const schedule = getClassroomSchedule(classroomId)

  return schedule ? scheduleLabel(schedule.day, schedule.time, schedule.timezone) : ui.value.common.schedulePending
}

useSeoMeta({
  title: () => ui.value.management.seoTitle,
  description: () => ui.value.management.seoDescription
})

const selectedParentId = ref(managementParents[0]?.id ?? '')
const selectedTeacherId = ref(managementTeachers[0]?.id ?? '')
const copiedReferralCode = ref('')
const referralRewardOverrides = reactive<Record<string, ReferralRewardStatus>>({})

const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US')}`

const overviewStats = computed(() => [
  {
    label: ui.value.management.stats.students,
    value: managementStudents.length.toString(),
    detail: ui.value.management.stats.mockRegistrations
  },
  {
    label: ui.value.management.stats.active,
    value: managementStudents.filter((student) => student.status === 'Active').length.toString(),
    detail: ui.value.management.stats.canAttendPaidClasses
  },
  {
    label: ui.value.management.stats.paymentRequired,
    value: managementStudents.filter((student) => student.status === 'Payment Required').length.toString(),
    detail: ui.value.management.stats.needsAdminFollowUp
  },
  {
    label: ui.value.management.stats.courses,
    value: managementCourses.length.toString(),
    detail: ui.value.management.stats.availablePrograms
  },
  {
    label: ui.value.management.stats.classrooms,
    value: classrooms.length.toString(),
    detail: ui.value.management.stats.virtualClassGroups
  }
])

const statusCounts = computed(() =>
  studentStatuses.map((status) => ({
    status,
    count: managementStudents.filter((student) => student.status === status).length
  }))
)

const studentsWithDetails = computed(() =>
  managementStudents.map((student) => ({
    ...student,
    parentName: getParentName(student.parentId),
    courseTitle: courseTitleById(student.selectedCourseId),
    payment: getPaymentForStudent(student.id),
    trialCount: getTrialAttendanceCount(student.id),
    referral: getStudentReferralSummary(student.id)
  }))
)

const coursesWithDetails = computed(() =>
  managementCourses.map((course) => {
    const schedule = classSchedules.find((item) => item.courseId === course.id)

    return {
      ...course,
      teacherName: getTeacherName(course.teacherId),
      enrolled: schedule?.enrolledStudentIds.length ?? 0
    }
  })
)

const schedulesWithDetails = computed(() =>
  classSchedules.map((schedule) => ({
    ...schedule,
    courseTitle: courseTitleById(schedule.courseId),
    teacherName: getTeacherName(schedule.teacherId),
    enrolled: schedule.enrolledStudentIds.length
  }))
)

const classroomRows = computed(() => getClassroomCardRows())

const attendanceWithDetails = computed(() =>
  attendanceRecords.map((record) => ({
    ...record,
    studentName: getStudentName(record.studentId),
    courseTitle: courseTitleById(record.courseId),
    teacherName: getTeacherName(record.teacherId)
  }))
)

const paymentsWithDetails = computed(() =>
  paymentRecords.map((payment) => ({
    ...payment,
    studentName: getStudentName(payment.studentId),
    parentName: getParentName(payment.parentId),
    courseTitle: courseTitleById(payment.courseId)
  }))
)

const selectedParent = computed(() =>
  managementParents.find((parent) => parent.id === selectedParentId.value)
)

const selectedTeacher = computed(() =>
  managementTeachers.find((teacher) => teacher.id === selectedTeacherId.value)
)

const parentDashboardRows = computed(() =>
  getParentStudents(selectedParentId.value).map((student) => ({
    student,
    courseTitle: courseTitleById(student.selectedCourseId),
    payment: getPaymentForStudent(student.id),
    attendance: getStudentAttendance(student.id),
    schedule: getStudentNextSchedule(student),
    classrooms: getStudentClassrooms(student.id),
    referral: getStudentReferralSummary(student.id)
  }))
)

const teacherSchedules = computed(() => getTeacherSchedules(selectedTeacherId.value))
const teacherClassrooms = computed(() => getTeacherClassrooms(selectedTeacherId.value))
const teacherRoster = computed(() =>
  getTeacherSafeRoster(selectedTeacherId.value).map((student) => ({
    ...student,
    course: localText(student.course),
    currentLevel: localText(student.currentLevel)
  }))
)
const parentReferralCards = computed(() => getParentReferralSummaries(selectedParentId.value))
const referralManagementRows = computed(() =>
  getReferralManagementRows().map((row) => ({
    ...row,
    rewardStatus: referralRewardOverrides[row.referralCode] ?? row.rewardStatus
  }))
)

const copyReferralCode = async (referralCode: string) => {
  copiedReferralCode.value = referralCode

  if (import.meta.client && navigator.clipboard) {
    await navigator.clipboard.writeText(referralCode)
  }
}

const shareReferralCode = async (referralCode: string) => {
  const message = ui.value.dashboard.referralShareMessage.replace('{code}', referralCode)
  copiedReferralCode.value = referralCode

  if (import.meta.client && 'share' in navigator) {
    await navigator.share({ text: message })
    return
  }

  if (import.meta.client && navigator.clipboard) {
    await navigator.clipboard.writeText(message)
  }
}

const setReferralRewardStatus = (referralCode: string, status: 'approved' | 'rejected') => {
  referralRewardOverrides[referralCode] = status
}

const booleanLabel = (value: boolean) =>
  value ? ui.value.classroomDetail.fallbacks.yes : ui.value.classroomDetail.fallbacks.no
const parentViewingAs = (name = '') => ui.value.management.parent.viewingAs.replace('{name}', name)
const referralCodeTitle = (name: string) =>
  ui.value.management.parent.referralCodeTitle.replace('{name}', name)
const rewardNote = (note: string) => getReferralNoteLabel(locale.value, note)
const statusLabel = (status: string) => getStatusLabel(locale.value, status)
const teacherViewingAs = (name = '') =>
  ui.value.management.teacher.viewingAs
    .replace('{name}', name)
    .replace(
      '{status}',
      teacherCanExportStudentLists ? ui.value.common.enabled : ui.value.common.disabled
    )
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.management"
      :eyebrow="ui.management.heroEyebrow"
      :title="ui.management.heroTitle"
      :description="ui.management.heroDescription"
      height="compact"
    />

    <section class="bg-white py-8 dark:bg-slate-950">
      <div class="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article v-for="stat in overviewStats" :key="stat.label" class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
          <p class="mt-2 text-3xl font-black text-brand-purple dark:text-brand-gold">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ stat.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-8">
        <div class="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p class="eyebrow">{{ ui.management.admin.eyebrow }}</p>
            <h2 class="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.title }}</h2>
            <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              {{ ui.management.admin.description }}
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="item in statusCounts" :key="item.status" class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(item.status)]">{{ statusLabel(item.status) }}</span>
              <p class="mt-3 text-2xl font-black text-slate-950 dark:text-white">{{ item.count }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ ui.management.admin.studentsSmall }}</p>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.studentListTitle }}</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ ui.management.admin.studentListDescription }}</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1080px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.student }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.parent }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.age }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.country }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.course }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.preferredTime }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.trials }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.referralCode }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.status }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="student in studentsWithDetails" :key="student.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ student.name }}</td>
                  <td class="px-5 py-4">{{ student.parentName }}</td>
                  <td class="px-5 py-4">{{ student.age }}</td>
                  <td class="px-5 py-4">{{ localText(student.country) }}</td>
                  <td class="px-5 py-4">{{ student.courseTitle }}</td>
                  <td class="px-5 py-4">{{ localText(student.preferredClassTime) }}</td>
                  <td class="px-5 py-4">{{ student.trialCount }} / {{ student.trialClassesAllowed }}</td>
                  <td class="px-5 py-4 font-semibold text-brand-purple dark:text-brand-gold">{{ student.referralCode }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(student.status)]">{{ statusLabel(student.status) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.coursesListTitle }}</h3>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <article v-for="course in coursesWithDetails" :key="course.id" class="p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ localText(course.title) }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ localText(course.level) }} | {{ localText(course.ageGroup) }}</p>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ localText(course.description) }}</p>
                  </div>
                  <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <p>{{ formatCurrency(course.price) }}</p>
                    <p>{{ course.enrolled }} / {{ course.capacity }} {{ ui.management.labels.capacity }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.teachersListTitle }}</h3>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <article v-for="teacher in managementTeachers" :key="teacher.id" class="p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ teacher.name }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ teacher.timezone }} {{ ui.management.labels.timezone }}</p>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ localList(teacher.specialties) }}</p>
                  </div>
                  <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">
                    {{ teacher.activeClasses }} {{ ui.management.teacher.classes }}
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.classScheduleTitle }}</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[820px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.course }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.teacher }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.day }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.time }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.timezone }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.capacity }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="schedule in schedulesWithDetails" :key="schedule.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ schedule.courseTitle }}</td>
                  <td class="px-5 py-4">{{ schedule.teacherName }}</td>
                  <td class="px-5 py-4">{{ localText(schedule.day) }}</td>
                  <td class="px-5 py-4">{{ schedule.time }}</td>
                  <td class="px-5 py-4">{{ schedule.timezone }}</td>
                  <td class="px-5 py-4">{{ schedule.enrolled }} / {{ schedule.capacity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.classroomManagementTitle }}</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {{ ui.management.admin.classroomManagementDescription }}
              </p>
            </div>
            <BaseButton to="/classrooms" variant="outline" size="sm">{{ ui.management.actions.viewAllClassrooms }}</BaseButton>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[980px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.classroom }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.course }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.teacher }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.schedule }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.provider }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.students }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.status }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.page }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="row in classroomRows" :key="row.classroom.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ localText(row.classroom.className) }}</td>
                  <td class="px-5 py-4">{{ localText(row.courseTitle) }}</td>
                  <td class="px-5 py-4">{{ row.teacherName }}</td>
                  <td class="px-5 py-4">{{ classroomScheduleLabel(row.classroom.id) }}</td>
                  <td class="px-5 py-4">{{ row.classroom.meetingProvider }}</td>
                  <td class="px-5 py-4">{{ row.enrolledCount }} / {{ row.capacity }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(row.classroom.status)]">{{ statusLabel(row.classroom.status) }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <NuxtLink :to="`/classrooms/${row.classroom.id}`" class="focus-ring rounded-md font-bold text-brand-purple dark:text-brand-gold">
                      {{ ui.management.actions.open }}
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.attendanceTableTitle }}</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[760px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.date }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.student }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.course }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.teacher }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.status }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="record in attendanceWithDetails" :key="record.id">
                    <td class="px-5 py-4">{{ record.date }}</td>
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ record.studentName }}</td>
                    <td class="px-5 py-4">{{ record.courseTitle }}</td>
                    <td class="px-5 py-4">{{ record.teacherName }}</td>
                    <td class="px-5 py-4">
                      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ statusLabel(record.status) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.paymentTrackingTitle }}</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ ui.management.admin.paymentTrackingDescription }}</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[820px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.student }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.parent }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.course }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.month }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.amount }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.status }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.management.labels.confirmed }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="payment in paymentsWithDetails" :key="payment.id">
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ payment.studentName }}</td>
                    <td class="px-5 py-4">{{ payment.parentName }}</td>
                    <td class="px-5 py-4">{{ payment.courseTitle }}</td>
                    <td class="px-5 py-4">{{ localText(payment.month) }}</td>
                    <td class="px-5 py-4">{{ formatCurrency(payment.amount) }}</td>
                    <td class="px-5 py-4">
                      <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(payment.status)]">{{ statusLabel(payment.status) }}</span>
                    </td>
                    <td class="px-5 py-4">{{ booleanLabel(payment.adminConfirmation) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.management.admin.referralManagementTitle }}</h3>
            <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {{ ui.management.admin.referralManagementDescription }}
            </p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[980px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.referralCode }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.referrer }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.totalRegistrations }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.verifiedPaid }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.rewardStatus }}</th>
                  <th class="px-5 py-3 font-semibold">{{ ui.management.labels.adminReview }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="row in referralManagementRows" :key="row.referralCode">
                  <td class="px-5 py-4 font-semibold text-brand-purple dark:text-brand-gold">{{ row.referralCode }}</td>
                  <td class="px-5 py-4">{{ row.referrerName }}</td>
                  <td class="px-5 py-4">{{ row.totalRegistrations }}</td>
                  <td class="px-5 py-4">{{ row.verifiedPaidReferrals }} / {{ referralGoalCount }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(row.rewardStatus)]">{{ statusLabel(row.rewardStatus) }}</span>
                    <p v-if="row.rewardStatus === 'available' || row.rewardStatus === 'eligible' || row.rewardStatus === 'approved'" class="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                      {{ ui.common.congratulations }}
                    </p>
                  </td>
                  <td class="px-5 py-4">
                    <div class="flex flex-wrap gap-2">
                      <button
                        type="button"
                        class="focus-ring rounded-md bg-brand-purple px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-brand-gold dark:text-slate-950"
                        :disabled="row.verifiedPaidReferrals < referralGoalCount"
                        @click="setReferralRewardStatus(row.referralCode, 'approved')"
                      >
                        {{ ui.management.actions.approveReward }}
                      </button>
                      <button
                        type="button"
                        class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
                        :disabled="row.totalRegistrations === 0"
                        @click="setReferralRewardStatus(row.referralCode, 'rejected')"
                      >
                        {{ ui.management.actions.reject }}
                      </button>
                    </div>
                    <p class="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ rewardNote(row.rewardNote) }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-8 xl:grid-cols-2">
        <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="eyebrow">{{ ui.management.parent.eyebrow }}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.management.parent.title }}</h2>
            </div>
            <select v-model="selectedParentId" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="parent in managementParents" :key="parent.id" :value="parent.id">{{ parent.name }}</option>
            </select>
          </div>

          <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">{{ parentViewingAs(selectedParent?.name) }}</p>
          <div class="mt-5 grid gap-4">
            <article v-for="card in parentReferralCards" :key="card.student.id" class="rounded-lg border border-purple-100 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-950/30">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ ui.management.labels.referralCard }}</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ referralCodeTitle(card.student.name) }}</h3>
                  <p class="mt-2 text-2xl font-black text-brand-purple dark:text-brand-gold">{{ card.summary.referralCode }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(card.summary.rewardStatus)]">{{ statusLabel(card.summary.rewardStatus) }}</span>
              </div>
              <div class="mt-4">
                <div class="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>{{ card.summary.verifiedCount }}/{{ referralGoalCount }} {{ ui.dashboard.verifiedReferrals }}</span>
                  <span>{{ card.summary.verifiedCount }} / {{ referralGoalCount }}</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-white dark:bg-slate-800">
                  <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${Math.min(card.summary.verifiedCount, referralGoalCount) / referralGoalCount * 100}%` }" />
                </div>
              </div>
              <p v-if="card.summary.rewardStatus === 'available' || card.summary.rewardStatus === 'eligible' || card.summary.rewardStatus === 'approved'" class="mt-4 rounded-md bg-white p-3 text-sm font-semibold text-emerald-600 dark:bg-slate-900 dark:text-emerald-300">
                {{ ui.common.congratulations }}
              </p>
              <p v-else class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ rewardNote(card.summary.rewardNote) }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <button type="button" class="focus-ring rounded-md bg-brand-purple px-4 py-2 text-sm font-semibold text-white dark:bg-brand-gold dark:text-slate-950" @click="copyReferralCode(card.summary.referralCode)">
                  {{ ui.common.copyCode }}
                </button>
                <button type="button" class="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" @click="shareReferralCode(card.summary.referralCode)">
                  {{ ui.common.shareMessage }}
                </button>
                <span v-if="copiedReferralCode === card.summary.referralCode" class="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ ui.common.copied }}</span>
              </div>
            </article>
          </div>
          <div class="mt-5 grid gap-4">
            <article v-for="row in parentDashboardRows" :key="row.student.id" class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="font-bold text-slate-950 dark:text-white">{{ row.student.name }}</p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ row.courseTitle }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(row.student.status)]">{{ statusLabel(row.student.status) }}</span>
              </div>
              <div class="mt-4 grid gap-3 sm:grid-cols-3">
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.management.labels.payment }}</p>
                  <p class="mt-1 font-semibold">{{ statusLabel(row.payment?.status ?? 'unpaid') }}</p>
                </div>
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.management.labels.attendance }}</p>
                  <p class="mt-1 font-semibold">{{ row.attendance.length }} {{ ui.management.labels.attendance }}</p>
                </div>
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.management.labels.nextClass }}</p>
                  <p class="mt-1 font-semibold">{{ row.schedule ? scheduleLabel(row.schedule.day, row.schedule.time) : ui.management.parent.notScheduled }}</p>
                </div>
              </div>
              <div v-if="row.classrooms.length" class="mt-4 flex flex-wrap gap-2">
                <NuxtLink
                  v-for="classroom in row.classrooms"
                  :key="classroom.id"
                  :to="`/classrooms/${classroom.id}`"
                  class="focus-ring rounded-md bg-purple-50 px-3 py-2 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold"
                >
                  {{ ui.management.parent.openClassroomPrefix }} {{ localText(classroom.className) }}
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="eyebrow">{{ ui.management.teacher.eyebrow }}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.management.teacher.title }}</h2>
            </div>
            <select v-model="selectedTeacherId" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="teacher in managementTeachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
            </select>
          </div>

          <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">
            {{ teacherViewingAs(selectedTeacher?.name) }}
          </p>

          <div class="mt-5 grid gap-4">
            <article v-for="classroom in teacherClassrooms" :key="classroom.id" class="rounded-lg border border-purple-100 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-950/30">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ ui.management.labels.assignedClassroom }}</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ localText(classroom.className) }}</h3>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ courseTitleById(classroom.courseId) }}</p>
                </div>
                <NuxtLink :to="`/classrooms/${classroom.id}`" class="focus-ring rounded-md bg-brand-purple px-3 py-2 text-xs font-bold text-white dark:bg-brand-gold dark:text-slate-950">
                  {{ ui.common.openClassroom }}
                </NuxtLink>
              </div>
            </article>
          </div>

          <div class="mt-5 grid gap-4">
            <article v-for="schedule in teacherSchedules" :key="schedule.id" class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p class="font-bold text-slate-950 dark:text-white">{{ courseTitleById(schedule.courseId) }}</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ scheduleLabel(schedule.day, schedule.time, schedule.timezone) }}</p>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ schedule.enrolledStudentIds.length }} / {{ schedule.capacity }} {{ ui.management.teacher.students }}</p>
            </article>
          </div>

          <div class="mt-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table class="w-full min-w-[640px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-4 py-3 font-semibold">{{ ui.management.labels.student }}</th>
                  <th class="px-4 py-3 font-semibold">{{ ui.management.labels.course }}</th>
                  <th class="px-4 py-3 font-semibold">{{ ui.management.labels.level }}</th>
                  <th class="px-4 py-3 font-semibold">{{ ui.management.labels.status }}</th>
                  <th class="px-4 py-3 font-semibold">{{ ui.management.labels.access }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="student in teacherRoster" :key="student.id">
                  <td class="px-4 py-3 font-semibold text-slate-950 dark:text-white">{{ student.name }}</td>
                  <td class="px-4 py-3">{{ student.course }}</td>
                  <td class="px-4 py-3">{{ student.currentLevel }}</td>
                  <td class="px-4 py-3">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(student.status)]">{{ statusLabel(student.status) }}</span>
                  </td>
                  <td class="px-4 py-3">{{ statusLabel(student.classAccess) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
