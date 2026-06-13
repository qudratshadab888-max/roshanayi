<script setup lang="ts">
import {
  attendanceRecords,
  classrooms,
  classSchedules,
  getClassroomCardRows,
  getCourseTitle,
  getParentName,
  getParentStudents,
  getPaymentForStudent,
  getParentReferralSummaries,
  getReferralManagementRows,
  getReferralShareMessage,
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
import type { ReferralRewardStatus } from '~/types'

useSeoMeta({
  title: 'Management System Phase 1',
  description:
    'Phase 1 mock student management dashboard for Roshanayi Academy with students, courses, teachers, schedules, attendance, payments, and role views.'
})

const selectedParentId = ref(managementParents[0]?.id ?? '')
const selectedTeacherId = ref(managementTeachers[0]?.id ?? '')
const copiedReferralCode = ref('')
const referralRewardOverrides = reactive<Record<string, ReferralRewardStatus>>({})

const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US')}`

const overviewStats = computed(() => [
  { label: 'Students', value: managementStudents.length.toString(), detail: 'Mock registrations' },
  { label: 'Active', value: managementStudents.filter((student) => student.status === 'Active').length.toString(), detail: 'Can attend paid classes' },
  { label: 'Payment required', value: managementStudents.filter((student) => student.status === 'Payment Required').length.toString(), detail: 'Needs admin follow-up' },
  { label: 'Courses', value: managementCourses.length.toString(), detail: 'Available programs' },
  { label: 'Classrooms', value: classrooms.length.toString(), detail: 'Virtual class groups' }
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
    courseTitle: getCourseTitle(student.selectedCourseId),
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
    courseTitle: getCourseTitle(schedule.courseId),
    teacherName: getTeacherName(schedule.teacherId),
    enrolled: schedule.enrolledStudentIds.length
  }))
)

const classroomRows = computed(() => getClassroomCardRows())

const attendanceWithDetails = computed(() =>
  attendanceRecords.map((record) => ({
    ...record,
    studentName: getStudentName(record.studentId),
    courseTitle: getCourseTitle(record.courseId),
    teacherName: getTeacherName(record.teacherId)
  }))
)

const paymentsWithDetails = computed(() =>
  paymentRecords.map((payment) => ({
    ...payment,
    studentName: getStudentName(payment.studentId),
    parentName: getParentName(payment.parentId),
    courseTitle: getCourseTitle(payment.courseId)
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
    courseTitle: getCourseTitle(student.selectedCourseId),
    payment: getPaymentForStudent(student.id),
    attendance: getStudentAttendance(student.id),
    schedule: getStudentNextSchedule(student),
    classrooms: getStudentClassrooms(student.id),
    referral: getStudentReferralSummary(student.id)
  }))
)

const teacherSchedules = computed(() => getTeacherSchedules(selectedTeacherId.value))
const teacherClassrooms = computed(() => getTeacherClassrooms(selectedTeacherId.value))
const teacherRoster = computed(() => getTeacherSafeRoster(selectedTeacherId.value))
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
  const message = getReferralShareMessage(referralCode)
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
</script>

<template>
  <div>
    <section class="bg-slate-950 py-14 text-white">
      <div class="container-wide">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">Roshanayi Academy</p>
        <h1 class="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">Management System Phase 1</h1>
        <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
          A clean mock-data foundation for admin, parent, and teacher workflows. No backend, no payment gateway, and no complex features yet.
        </p>
      </div>
    </section>

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
            <p class="eyebrow">Admin Dashboard</p>
            <h2 class="mt-3 text-3xl font-bold text-slate-950 dark:text-white">Overview for Phase 1 operations</h2>
            <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              Admin can review student registrations, class status, schedules, attendance, and payments from one simple page.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="item in statusCounts" :key="item.status" class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(item.status)]">{{ item.status }}</span>
              <p class="mt-3 text-2xl font-black text-slate-950 dark:text-white">{{ item.count }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">students</p>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h3 class="text-xl font-bold text-slate-950 dark:text-white">Student Registration List</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Mock records only. Statuses are Trial, Payment Required, Active, and Inactive.</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1080px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Student</th>
                  <th class="px-5 py-3 font-semibold">Parent</th>
                  <th class="px-5 py-3 font-semibold">Age</th>
                  <th class="px-5 py-3 font-semibold">Country</th>
                  <th class="px-5 py-3 font-semibold">Course</th>
                  <th class="px-5 py-3 font-semibold">Preferred Time</th>
                  <th class="px-5 py-3 font-semibold">Trials</th>
                  <th class="px-5 py-3 font-semibold">Referral Code</th>
                  <th class="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="student in studentsWithDetails" :key="student.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ student.name }}</td>
                  <td class="px-5 py-4">{{ student.parentName }}</td>
                  <td class="px-5 py-4">{{ student.age }}</td>
                  <td class="px-5 py-4">{{ student.country }}</td>
                  <td class="px-5 py-4">{{ student.courseTitle }}</td>
                  <td class="px-5 py-4">{{ student.preferredClassTime }}</td>
                  <td class="px-5 py-4">{{ student.trialCount }} / {{ student.trialClassesAllowed }}</td>
                  <td class="px-5 py-4 font-semibold text-brand-purple dark:text-brand-gold">{{ student.referralCode }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(student.status)]">{{ student.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">Courses List</h3>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <article v-for="course in coursesWithDetails" :key="course.id" class="p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ course.title }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ course.level }} | {{ course.ageGroup }}</p>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ course.description }}</p>
                  </div>
                  <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <p>{{ formatCurrency(course.price) }}</p>
                    <p>{{ course.enrolled }} / {{ course.capacity }} seats</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">Teachers List</h3>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <article v-for="teacher in managementTeachers" :key="teacher.id" class="p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ teacher.name }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ teacher.timezone }} timezone</p>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ teacher.specialties.join(', ') }}</p>
                  </div>
                  <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">
                    {{ teacher.activeClasses }} classes
                  </span>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h3 class="text-xl font-bold text-slate-950 dark:text-white">Class Schedule List</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[820px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Course</th>
                  <th class="px-5 py-3 font-semibold">Teacher</th>
                  <th class="px-5 py-3 font-semibold">Day</th>
                  <th class="px-5 py-3 font-semibold">Time</th>
                  <th class="px-5 py-3 font-semibold">Timezone</th>
                  <th class="px-5 py-3 font-semibold">Capacity</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="schedule in schedulesWithDetails" :key="schedule.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ schedule.courseTitle }}</td>
                  <td class="px-5 py-4">{{ schedule.teacherName }}</td>
                  <td class="px-5 py-4">{{ schedule.day }}</td>
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
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">Classroom Management</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Admin can review class groups, meeting providers, enrolled students, schedules, and classroom pages.
              </p>
            </div>
            <BaseButton to="/classrooms" variant="outline" size="sm">View all classrooms</BaseButton>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[980px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Classroom</th>
                  <th class="px-5 py-3 font-semibold">Course</th>
                  <th class="px-5 py-3 font-semibold">Teacher</th>
                  <th class="px-5 py-3 font-semibold">Schedule</th>
                  <th class="px-5 py-3 font-semibold">Provider</th>
                  <th class="px-5 py-3 font-semibold">Students</th>
                  <th class="px-5 py-3 font-semibold">Status</th>
                  <th class="px-5 py-3 font-semibold">Page</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="row in classroomRows" :key="row.classroom.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ row.classroom.className }}</td>
                  <td class="px-5 py-4">{{ row.courseTitle }}</td>
                  <td class="px-5 py-4">{{ row.teacherName }}</td>
                  <td class="px-5 py-4">{{ row.scheduleLabel }}</td>
                  <td class="px-5 py-4">{{ row.classroom.meetingProvider }}</td>
                  <td class="px-5 py-4">{{ row.enrolledCount }} / {{ row.capacity }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(row.classroom.status)]">{{ row.classroom.status }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <NuxtLink :to="`/classrooms/${row.classroom.id}`" class="focus-ring rounded-md font-bold text-brand-purple dark:text-brand-gold">
                      Open
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
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">Attendance Table</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[760px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">Date</th>
                    <th class="px-5 py-3 font-semibold">Student</th>
                    <th class="px-5 py-3 font-semibold">Course</th>
                    <th class="px-5 py-3 font-semibold">Teacher</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="record in attendanceWithDetails" :key="record.id">
                    <td class="px-5 py-4">{{ record.date }}</td>
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ record.studentName }}</td>
                    <td class="px-5 py-4">{{ record.courseTitle }}</td>
                    <td class="px-5 py-4">{{ record.teacherName }}</td>
                    <td class="px-5 py-4">
                      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ record.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-950 dark:text-white">Payment Tracking Table</h3>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Tracking only. No payment gateway is connected.</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[820px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">Student</th>
                    <th class="px-5 py-3 font-semibold">Parent</th>
                    <th class="px-5 py-3 font-semibold">Course</th>
                    <th class="px-5 py-3 font-semibold">Month</th>
                    <th class="px-5 py-3 font-semibold">Amount</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 font-semibold">Confirmed</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="payment in paymentsWithDetails" :key="payment.id">
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ payment.studentName }}</td>
                    <td class="px-5 py-4">{{ payment.parentName }}</td>
                    <td class="px-5 py-4">{{ payment.courseTitle }}</td>
                    <td class="px-5 py-4">{{ payment.month }}</td>
                    <td class="px-5 py-4">{{ formatCurrency(payment.amount) }}</td>
                    <td class="px-5 py-4">
                      <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(payment.status)]">{{ payment.status }}</span>
                    </td>
                    <td class="px-5 py-4">{{ payment.adminConfirmation ? 'Yes' : 'No' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h3 class="text-xl font-bold text-slate-950 dark:text-white">Referral Management</h3>
            <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Referrals count only after completed registration, two attended trial classes, paid first invoice, admin payment confirmation, and family approval. Same-family referrals stay in review until admin approves them.
            </p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[980px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Referral Code</th>
                  <th class="px-5 py-3 font-semibold">Referrer</th>
                  <th class="px-5 py-3 font-semibold">Total Registrations</th>
                  <th class="px-5 py-3 font-semibold">Verified Paid</th>
                  <th class="px-5 py-3 font-semibold">Reward Status</th>
                  <th class="px-5 py-3 font-semibold">Admin Review</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="row in referralManagementRows" :key="row.referralCode">
                  <td class="px-5 py-4 font-semibold text-brand-purple dark:text-brand-gold">{{ row.referralCode }}</td>
                  <td class="px-5 py-4">{{ row.referrerName }}</td>
                  <td class="px-5 py-4">{{ row.totalRegistrations }}</td>
                  <td class="px-5 py-4">{{ row.verifiedPaidReferrals }} / {{ referralGoalCount }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(row.rewardStatus)]">{{ row.rewardStatus }}</span>
                    <p v-if="row.rewardStatus === 'available' || row.rewardStatus === 'eligible' || row.rewardStatus === 'approved'" class="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                      Congratulations! You earned one month free tuition.
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
                        Approve reward
                      </button>
                      <button
                        type="button"
                        class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
                        :disabled="row.totalRegistrations === 0"
                        @click="setReferralRewardStatus(row.referralCode, 'rejected')"
                      >
                        Reject
                      </button>
                    </div>
                    <p class="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ row.rewardNote }}</p>
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
              <p class="eyebrow">Parent Dashboard</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Basic parent view</h2>
            </div>
            <select v-model="selectedParentId" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="parent in managementParents" :key="parent.id" :value="parent.id">{{ parent.name }}</option>
            </select>
          </div>

          <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">Viewing as {{ selectedParent?.name }}.</p>
          <div class="mt-5 grid gap-4">
            <article v-for="card in parentReferralCards" :key="card.student.id" class="rounded-lg border border-purple-100 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-950/30">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">Referral Card</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ card.student.name }} referral code</h3>
                  <p class="mt-2 text-2xl font-black text-brand-purple dark:text-brand-gold">{{ card.summary.referralCode }}</p>
                </div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(card.summary.rewardStatus)]">{{ card.summary.rewardStatus }}</span>
              </div>
              <div class="mt-4">
                <div class="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>{{ card.summary.progressLabel }}</span>
                  <span>{{ card.summary.verifiedCount }} / {{ referralGoalCount }}</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-white dark:bg-slate-800">
                  <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${Math.min(card.summary.verifiedCount, referralGoalCount) / referralGoalCount * 100}%` }" />
                </div>
              </div>
              <p v-if="card.summary.rewardStatus === 'available' || card.summary.rewardStatus === 'eligible' || card.summary.rewardStatus === 'approved'" class="mt-4 rounded-md bg-white p-3 text-sm font-semibold text-emerald-600 dark:bg-slate-900 dark:text-emerald-300">
                Congratulations! You earned one month free tuition.
              </p>
              <p v-else class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ card.summary.rewardNote }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <button type="button" class="focus-ring rounded-md bg-brand-purple px-4 py-2 text-sm font-semibold text-white dark:bg-brand-gold dark:text-slate-950" @click="copyReferralCode(card.summary.referralCode)">
                  Copy code
                </button>
                <button type="button" class="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" @click="shareReferralCode(card.summary.referralCode)">
                  Share message
                </button>
                <span v-if="copiedReferralCode === card.summary.referralCode" class="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-300">Copied</span>
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
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(row.student.status)]">{{ row.student.status }}</span>
              </div>
              <div class="mt-4 grid gap-3 sm:grid-cols-3">
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Payment</p>
                  <p class="mt-1 font-semibold">{{ row.payment?.status ?? 'unpaid' }}</p>
                </div>
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Attendance</p>
                  <p class="mt-1 font-semibold">{{ row.attendance.length }} records</p>
                </div>
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Next Class</p>
                  <p class="mt-1 font-semibold">{{ row.schedule ? `${row.schedule.day}, ${row.schedule.time}` : 'Not scheduled' }}</p>
                </div>
              </div>
              <div v-if="row.classrooms.length" class="mt-4 flex flex-wrap gap-2">
                <NuxtLink
                  v-for="classroom in row.classrooms"
                  :key="classroom.id"
                  :to="`/classrooms/${classroom.id}`"
                  class="focus-ring rounded-md bg-purple-50 px-3 py-2 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold"
                >
                  Open {{ classroom.className }}
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="eyebrow">Teacher Dashboard</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Basic teacher view</h2>
            </div>
            <select v-model="selectedTeacherId" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="teacher in managementTeachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
            </select>
          </div>

          <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Viewing as {{ selectedTeacher?.name }}. Parent phone numbers and payment details are not shown. Export is {{ teacherCanExportStudentLists ? 'enabled' : 'disabled' }}.
          </p>

          <div class="mt-5 grid gap-4">
            <article v-for="classroom in teacherClassrooms" :key="classroom.id" class="rounded-lg border border-purple-100 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-950/30">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">Assigned Classroom</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ classroom.className }}</h3>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ getCourseTitle(classroom.courseId) }}</p>
                </div>
                <NuxtLink :to="`/classrooms/${classroom.id}`" class="focus-ring rounded-md bg-brand-purple px-3 py-2 text-xs font-bold text-white dark:bg-brand-gold dark:text-slate-950">
                  Open classroom
                </NuxtLink>
              </div>
            </article>
          </div>

          <div class="mt-5 grid gap-4">
            <article v-for="schedule in teacherSchedules" :key="schedule.id" class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p class="font-bold text-slate-950 dark:text-white">{{ getCourseTitle(schedule.courseId) }}</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ schedule.day }} | {{ schedule.time }} {{ schedule.timezone }}</p>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ schedule.enrolledStudentIds.length }} / {{ schedule.capacity }} students</p>
            </article>
          </div>

          <div class="mt-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table class="w-full min-w-[640px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-4 py-3 font-semibold">Student</th>
                  <th class="px-4 py-3 font-semibold">Course</th>
                  <th class="px-4 py-3 font-semibold">Level</th>
                  <th class="px-4 py-3 font-semibold">Status</th>
                  <th class="px-4 py-3 font-semibold">Access</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="student in teacherRoster" :key="student.id">
                  <td class="px-4 py-3 font-semibold text-slate-950 dark:text-white">{{ student.name }}</td>
                  <td class="px-4 py-3">{{ student.course }}</td>
                  <td class="px-4 py-3">{{ student.currentLevel }}</td>
                  <td class="px-4 py-3">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(student.status)]">{{ student.status }}</span>
                  </td>
                  <td class="px-4 py-3">{{ student.classAccess }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
