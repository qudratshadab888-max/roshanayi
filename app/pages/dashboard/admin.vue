<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { demoRoleUsers, getRoleDefinition } from '~/data/roles'
import {
  attendanceRecords,
  classSchedules,
  getCourseTitle,
  getParentName,
  getStatusTone,
  getStudentName,
  getTeacherName,
  managementCourses,
  managementParents,
  managementStudents,
  managementTeachers,
  paymentRecords
} from '~/data/management'

useSeoMeta({
  title: 'Super Admin Dashboard',
  description: 'Super Admin dashboard for Roshanayi Academy role-based administration.'
})

const { currentUser, syncUser } = useRoleAuth()
const role = getRoleDefinition('super-admin')
const { approvedManagementTeachers, getApplicationTeacherName } = useTeacherApplications()
const availableTeachers = computed(() => [...managementTeachers, ...approvedManagementTeachers.value])

onMounted(() => {
  syncUser()
})

const managerAccounts = computed(() => demoRoleUsers.filter((user) => user.role === 'manager'))
const paidRevenue = computed(() =>
  paymentRecords
    .filter((payment) => payment.status === 'paid')
    .reduce((total, payment) => total + payment.amount, 0)
)
const openPaymentIssues = computed(() =>
  paymentRecords.filter((payment) => payment.status !== 'paid' || !payment.adminConfirmation)
)
const attendanceIssues = computed(() =>
  attendanceRecords.filter((record) => record.status !== 'present')
)

const stats = computed(() => [
  { label: 'Managers', value: managerAccounts.value.length, detail: 'Operational accounts', tone: 'purple' as const },
  { label: 'Teachers', value: availableTeachers.value.length, detail: 'Instructor profiles', tone: 'emerald' as const },
  { label: 'Parents', value: managementParents.length, detail: 'Family accounts', tone: 'sky' as const },
  { label: 'Students', value: managementStudents.length, detail: 'Registered learners', tone: 'amber' as const },
  { label: 'Courses', value: managementCourses.length, detail: 'Active catalog entries', tone: 'purple' as const },
  { label: 'Paid revenue', value: `$${paidRevenue.value}`, detail: 'Academy-confirmed payments', tone: 'emerald' as const }
])

const studentsWithDetails = computed(() =>
  managementStudents.map((student) => ({
    ...student,
    parentName: getParentName(student.parentId),
    courseTitle: getCourseTitle(student.selectedCourseId)
  }))
)

const courseRows = computed(() =>
  managementCourses.map((course) => ({
    ...course,
    teacherName: getApplicationTeacherName(course.teacherId) ?? getTeacherName(course.teacherId)
  }))
)

const scheduleRows = computed(() =>
  classSchedules.map((schedule) => ({
    ...schedule,
    courseTitle: getCourseTitle(schedule.courseId),
    teacherName: getApplicationTeacherName(schedule.teacherId) ?? getTeacherName(schedule.teacherId)
  }))
)

const paymentRows = computed(() =>
  paymentRecords.map((payment) => ({
    ...payment,
    studentName: getStudentName(payment.studentId),
    parentName: getParentName(payment.parentId),
    courseTitle: getCourseTitle(payment.courseId)
  }))
)

const reports = computed(() => [
  { label: 'All reports', value: `${managementStudents.length} student records`, detail: 'Attendance, payments, homework, and marks' },
  { label: 'Payment issues', value: openPaymentIssues.value.length.toString(), detail: 'Unpaid, pending, overdue, or unconfirmed' },
  { label: 'Attendance issues', value: attendanceIssues.value.length.toString(), detail: 'Late, absent, or excused records' }
])

const academySettings = [
  'Role permissions',
  'Trial class policy',
  'Payment confirmation rules',
  'Course catalog visibility',
  'System configuration'
]
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.management"
      eyebrow="Super Admin"
      title="Full academy control center"
      description="Manage managers, teachers, parents, students, courses, schedules, payments, reports, academy settings, and system configuration."
      height="compact"
    >
      <template #aside>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p class="text-sm font-semibold text-brand-gold">Signed in as</p>
          <h2 class="mt-2 text-2xl font-bold">{{ currentUser?.name ?? 'Super Admin' }}</h2>
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
        <PermissionPanel title="Super Admin permissions" :permissions="role.permissions" />
        <BaseButton to="/dashboard/admin/payments" class="justify-self-start">Open Full Payment Management</BaseButton>

        <TeacherApplicationReview :reviewer-name="currentUser?.name ?? 'Super Admin'" />

        <div class="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage managers</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="manager in managerAccounts" :key="manager.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <p class="font-bold text-slate-950 dark:text-white">{{ manager.name }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ manager.email }}</p>
                <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">Operations dashboard access</p>
              </div>
            </div>
            <BaseButton class="mt-5" variant="outline">Add manager</BaseButton>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Academy settings</h2>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <label
                v-for="setting in academySettings"
                :key="setting"
                class="flex items-center justify-between rounded-md border border-slate-200 p-4 dark:border-slate-800"
              >
                <span class="font-semibold text-slate-800 dark:text-slate-100">{{ setting }}</span>
                <input checked type="checkbox" class="h-4 w-4 rounded border-slate-300 text-brand-purple">
              </label>
            </div>
          </article>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage teachers</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="teacher in availableTeachers" :key="teacher.id" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ teacher.name }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ teacher.specialties.join(', ') }}</p>
                  </div>
                  <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">{{ teacher.activeClasses }} classes</span>
                </div>
              </div>
            </div>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage parents</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="parent in managementParents" :key="parent.id" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="font-bold text-slate-950 dark:text-white">{{ parent.name }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ parent.country }} | {{ parent.timezone }}</p>
                <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ parent.email }}</p>
              </div>
            </div>
          </article>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage students</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px] text-sm">
              <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                <tr>
                  <th class="px-5 py-3 font-semibold">Student</th>
                  <th class="px-5 py-3 font-semibold">Parent</th>
                  <th class="px-5 py-3 font-semibold">Course</th>
                  <th class="px-5 py-3 font-semibold">Level</th>
                  <th class="px-5 py-3 font-semibold">Status</th>
                  <th class="px-5 py-3 font-semibold">Timezone</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr v-for="student in studentsWithDetails" :key="student.id">
                  <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ student.name }}</td>
                  <td class="px-5 py-4">{{ student.parentName }}</td>
                  <td class="px-5 py-4">{{ student.courseTitle }}</td>
                  <td class="px-5 py-4">{{ student.currentLevel }}</td>
                  <td class="px-5 py-4">
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(student.status)]">{{ student.status }}</span>
                  </td>
                  <td class="px-5 py-4">{{ student.timezone }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid gap-8 xl:grid-cols-2">
          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage courses</h2>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <div v-for="course in courseRows" :key="course.id" class="p-5">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p class="font-bold text-slate-950 dark:text-white">{{ course.title }}</p>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ course.category }} | {{ course.level }}</p>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ course.teacherName }}</p>
                  </div>
                  <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold">${{ course.price }}</span>
                </div>
              </div>
            </div>
          </article>

          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage schedules</h2>
            </div>
            <div class="divide-y divide-slate-200 dark:divide-slate-800">
              <div v-for="schedule in scheduleRows" :key="schedule.id" class="p-5">
                <p class="font-bold text-slate-950 dark:text-white">{{ schedule.courseTitle }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ schedule.day }}, {{ schedule.time }} {{ schedule.timezone }}</p>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ schedule.teacherName }} | {{ schedule.enrolledStudentIds.length }} / {{ schedule.capacity }} students</p>
              </div>
            </div>
          </article>
        </div>

        <div class="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">Manage payments</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[820px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">Student</th>
                    <th class="px-5 py-3 font-semibold">Parent</th>
                    <th class="px-5 py-3 font-semibold">Course</th>
                    <th class="px-5 py-3 font-semibold">Amount</th>
                    <th class="px-5 py-3 font-semibold">Status</th>
                    <th class="px-5 py-3 font-semibold">Confirmed</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="payment in paymentRows" :key="payment.id">
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ payment.studentName }}</td>
                    <td class="px-5 py-4">{{ payment.parentName }}</td>
                    <td class="px-5 py-4">{{ payment.courseTitle }}</td>
                    <td class="px-5 py-4">${{ payment.amount }}</td>
                    <td class="px-5 py-4">
                      <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(payment.status)]">{{ payment.status }}</span>
                    </td>
                    <td class="px-5 py-4">{{ payment.adminConfirmation ? 'Yes' : 'No' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">View all reports</h2>
            <div class="mt-5 grid gap-4">
              <div v-for="report in reports" :key="report.label" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ report.value }}</p>
                <p class="mt-1 font-bold text-slate-950 dark:text-white">{{ report.label }}</p>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ report.detail }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
