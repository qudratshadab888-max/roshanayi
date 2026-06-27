<script setup lang="ts">
import type { ManagementQuickFilter, ManagementStudentRow } from '~/composables/useManagementOperations'

definePageMeta({ middleware: 'management' })
useSeoMeta({ title: 'Student Management', description: 'Secure student operations workspace for Roshanayi managers.' })

const route = useRoute()
const { authorized } = useManagementAccess()
const operations = useManagementOperations()
const {
  filters,
  students,
  totalStudents,
  courses,
  classes,
  teachers,
  countries,
  loading,
  errorMessage,
  loadStudents,
  loadOptions,
  assignClass,
  changeTeacher,
  setSuspended,
  addFollowUp,
  sendNotification,
  resetFilters
} = operations

const selectedIds = ref<string[]>([])
const bulkAction = ref('')
const bulkClassId = ref('')
const bulkTeacherId = ref('')
const bulkTitle = ref('Academy update')
const bulkMessage = ref('')
const actionNotice = ref('')
const actionError = ref('')
const actionLoading = ref(false)
const showBulkConfirmation = ref(false)

const quickFilters: Array<{ label: string; value: ManagementQuickFilter }> = [
  { label: 'New registrations', value: 'new' },
  { label: 'Trial ending today', value: 'trial-today' },
  { label: 'Trial ended', value: 'trial-ended' },
  { label: 'Payment due', value: 'payment-due' },
  { label: 'Payment overdue', value: 'overdue' },
  { label: 'Needs follow-up', value: 'follow-up' },
  { label: 'Repeated absences', value: 'absences' },
  { label: 'No assigned class', value: 'no-class' },
  { label: 'Suspended students', value: 'suspended' }
]

const totalPages = computed(() => Math.max(1, Math.ceil(totalStudents.value / filters.pageSize)))
const selectedStudents = computed(() => students.value.filter((student) => selectedIds.value.includes(student.id)))
const allPageSelected = computed(() => Boolean(students.value.length) && students.value.every((student) => selectedIds.value.includes(student.id)))
const statusClass = (status: string | null) => {
  const value = status?.toLowerCase() ?? ''
  if (value.includes('overdue') || value.includes('suspend')) return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200'
  if (value.includes('paid') || value === 'active') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200'
  if (value.includes('trial')) return 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200'
  if (value.includes('pending') || value.includes('due')) return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200'
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
}
const formatDate = (value: string | null) => value ? new Date(value).toLocaleDateString('en-GB') : 'Not set'
const togglePageSelection = () => {
  if (allPageSelected.value) {
    selectedIds.value = selectedIds.value.filter((id) => !students.value.some((student) => student.id === id))
  } else {
    selectedIds.value = Array.from(new Set([...selectedIds.value, ...students.value.map((student) => student.id)]))
  }
}

const csvCell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`
const downloadCsv = (filename: string, headers: string[], rows: unknown[][]) => {
  if (!import.meta.client) return
  const csv = [headers.map(csvCell).join(','), ...rows.map((row) => row.map(csvCell).join(','))].join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
const exportStudents = (rows = students.value) => downloadCsv(
  'roshanayi-students.csv',
  ['Student', 'Parent', 'Parent email', 'WhatsApp', 'Course', 'Class', 'Teacher', 'Status', 'Payment', 'Attendance', 'Due date', 'Account type'],
  rows.map((row) => [row.student_name, row.parent_name, row.parent_email, row.parent_whatsapp, row.course_name, row.class_name, row.teacher_name, row.student_status, row.payment_status, row.attendance_rate, row.next_payment_due_date, row.account_type])
)
const exportPayments = () => downloadCsv('roshanayi-payment-status.csv', ['Student', 'Parent', 'Payment status', 'Due date', 'Days overdue'], students.value.map((row) => [row.student_name, row.parent_name, row.payment_status, row.next_payment_due_date, row.days_overdue]))
const exportAttendance = () => downloadCsv('roshanayi-attendance.csv', ['Student', 'Class', 'Attendance rate', 'Records', 'Absences', 'Late'], students.value.map((row) => [row.student_name, row.class_name, row.attendance_rate, row.attendance_records, row.consecutive_absences, row.late_records]))
const exportOverdue = () => downloadCsv('roshanayi-overdue-students.csv', ['Student', 'Parent', 'WhatsApp', 'Due date', 'Days overdue'], students.value.filter((row) => row.student_status === 'Payment Overdue').map((row) => [row.student_name, row.parent_name, row.parent_whatsapp, row.next_payment_due_date, row.days_overdue]))

const performBulkAction = async () => {
  if (!selectedStudents.value.length || !bulkAction.value) return
  if (bulkAction.value === 'suspend' && !showBulkConfirmation.value) {
    showBulkConfirmation.value = true
    return
  }
  actionLoading.value = true
  actionError.value = ''
  actionNotice.value = ''
  try {
    if (bulkAction.value === 'assign-class') {
      if (!bulkClassId.value) throw new Error('Choose a class for the selected students.')
      await Promise.all(selectedStudents.value.map((student) => assignClass(student.id, bulkClassId.value)))
    } else if (bulkAction.value === 'assign-teacher') {
      if (!bulkTeacherId.value) throw new Error('Choose a teacher for the selected classes.')
      const classIds = Array.from(new Set(selectedStudents.value.map((student) => student.class_id).filter((id): id is string => Boolean(id))))
      if (!classIds.length) throw new Error('The selected students do not have assigned classes.')
      await Promise.all(classIds.map((classId) => changeTeacher(classId, bulkTeacherId.value)))
    } else if (bulkAction.value === 'notification') {
      if (!bulkMessage.value.trim()) throw new Error('Enter the notification message.')
      await Promise.all(selectedStudents.value.map((student) => sendNotification(student, bulkTitle.value, bulkMessage.value, 'parent')))
    } else if (bulkAction.value === 'follow-up') {
      await Promise.all(selectedStudents.value.map((student) => addFollowUp(student.id, 'Manager bulk follow-up', bulkMessage.value, '', 'not_contacted')))
    } else if (bulkAction.value === 'suspend') {
      await Promise.all(selectedStudents.value.map((student) => setSuspended(student.id, student.enrollment_id, true)))
    } else if (bulkAction.value === 'reactivate') {
      await Promise.all(selectedStudents.value.map((student) => setSuspended(student.id, student.enrollment_id, false)))
    } else if (bulkAction.value === 'export') {
      exportStudents(selectedStudents.value)
    }
    actionNotice.value = `Bulk action completed for ${selectedStudents.value.length} student records.`
    showBulkConfirmation.value = false
    selectedIds.value = []
    await loadStudents()
  } catch (error) {
    actionError.value = error instanceof Error ? error.message : 'The bulk action could not be completed.'
  } finally {
    actionLoading.value = false
  }
}

const applyRouteFilters = () => {
  if (typeof route.query.quick === 'string') filters.quick = route.query.quick as ManagementQuickFilter
  if (typeof route.query.status === 'string') filters.studentStatus = route.query.status
  if (typeof route.query.payment === 'string') filters.paymentStatus = route.query.payment
  if (typeof route.query.enrollment === 'string') filters.enrollmentStatus = route.query.enrollment
  if (typeof route.query.attendance === 'string') filters.attendanceCondition = route.query.attendance
}

const clearFilters = async () => {
  resetFilters()
  selectedIds.value = []
  await navigateTo('/management/students', { replace: true })
  await loadStudents()
}

let searchTimer: ReturnType<typeof setTimeout> | undefined
const scheduleLoad = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    filters.page = 1
    void loadStudents()
  }, 350)
}
onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer)
})

watch(() => filters.search, scheduleLoad)
watch(
  () => [filters.courseId, filters.classId, filters.teacherId, filters.classType, filters.trialStatus, filters.enrollmentStatus, filters.paymentStatus, filters.accountType, filters.ageGroup, filters.attendanceCondition, filters.studentStatus, filters.country, filters.registrationFrom, filters.registrationTo, filters.quick, filters.sortBy, filters.sortDirection, filters.pageSize],
  () => { filters.page = 1; void loadStudents() }
)
watch(() => filters.page, () => void loadStudents())
watch(() => route.query, () => { applyRouteFilters(); void loadStudents() })
watch(authorized, async (value) => {
  if (!value) return
  applyRouteFilters()
  try {
    await loadOptions()
  } catch (error) {
    actionError.value = error instanceof Error ? error.message : 'Filter options could not be loaded.'
  }
  await loadStudents()
}, { immediate: true })
</script>

<template>
  <section v-if="!authorized" class="section-padding bg-slate-100 dark:bg-slate-950">
    <div class="container-wide"><LoadingPanel label="Verifying Management access..." /></div>
  </section>
  <ManagementShell v-else title="Student management" description="Search, filter, review, update, and safely follow up every student record allowed by Supabase RLS.">
    <template #actions>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" @click="exportStudents()">Student CSV</button>
        <button type="button" class="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" @click="exportPayments">Payment CSV</button>
        <button type="button" class="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" @click="exportAttendance">Attendance CSV</button>
        <button type="button" class="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" @click="exportOverdue">Overdue CSV</button>
      </div>
    </template>

    <div class="grid gap-5">
      <div v-if="errorMessage || actionError" class="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200" role="alert">{{ actionError || errorMessage }}</div>
      <div v-if="actionNotice" class="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200" role="status">{{ actionNotice }}</div>

      <section class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" aria-label="Student filters">
        <div class="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_repeat(3,minmax(150px,0.45fr))]">
          <div>
            <label for="management-search" class="text-xs font-bold uppercase text-slate-500">Search</label>
            <input id="management-search" v-model="filters.search" type="search" placeholder="Student, parent, email, WhatsApp, course, class, teacher" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label for="filter-course" class="text-xs font-bold uppercase text-slate-500">Course</label>
            <select id="filter-course" v-model="filters.courseId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All courses</option><option v-for="item in courses" :key="item.id" :value="item.id">{{ item.label }}</option></select>
          </div>
          <div>
            <label for="filter-class" class="text-xs font-bold uppercase text-slate-500">Class</label>
            <select id="filter-class" v-model="filters.classId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All classes</option><option v-for="item in classes" :key="item.id" :value="item.id">{{ item.label }}</option></select>
          </div>
          <div>
            <label for="filter-teacher" class="text-xs font-bold uppercase text-slate-500">Teacher</label>
            <select id="filter-teacher" v-model="filters.teacherId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All teachers</option><option v-for="item in teachers" :key="item.id" :value="item.id">{{ item.label }}</option></select>
          </div>
        </div>

        <details class="mt-4 rounded-md border border-slate-200 p-4 dark:border-slate-800">
          <summary class="cursor-pointer text-sm font-bold text-slate-800 dark:text-slate-100">Advanced filters</summary>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select v-model="filters.classType" aria-label="Class type" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All class types</option><option value="group">Group</option><option value="special">Special</option><option value="premium">Premium</option></select>
            <select v-model="filters.trialStatus" aria-label="Trial status" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All trial statuses</option><option>Active Trial</option><option>Trial Ends Today</option><option>Trial Ended</option></select>
            <select v-model="filters.enrollmentStatus" aria-label="Enrollment status" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All enrollments</option><option value="trial">Trial</option><option value="active">Active</option><option value="pending_payment">Pending payment</option><option value="suspended">Suspended</option><option value="completed">Completed</option></select>
            <select v-model="filters.paymentStatus" aria-label="Payment status" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All payments</option><option value="draft">Draft</option><option value="pending">Pending</option><option value="paid">Paid</option><option value="overdue">Overdue</option></select>
            <select v-model="filters.accountType" aria-label="Account type" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All account types</option><option>Parent-managed</option><option>Separate student login</option></select>
            <select v-model="filters.ageGroup" aria-label="Age group" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All ages</option><option value="under-13">Under 13</option><option value="13-17">13-17</option><option value="adult">18+</option></select>
            <select v-model="filters.attendanceCondition" aria-label="Attendance condition" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All attendance</option><option value="low">Low attendance</option><option value="absences">Repeated absences</option><option value="late">Repeated late</option><option value="none">No attendance records</option></select>
            <select v-model="filters.studentStatus" aria-label="Student status" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All student statuses</option><option>Trial</option><option>Active</option><option>Pending Payment</option><option>Payment Overdue</option><option>Suspended</option><option>Inactive</option><option>Completed</option></select>
            <select v-model="filters.country" aria-label="Country" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">All countries</option><option v-for="country in countries" :key="country">{{ country }}</option></select>
            <label class="text-xs font-bold text-slate-500">Registered from<input v-model="filters.registrationFrom" type="date" class="focus-ring mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"></label>
            <label class="text-xs font-bold text-slate-500">Registered to<input v-model="filters.registrationTo" type="date" class="focus-ring mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"></label>
            <select v-model="filters.sortBy" aria-label="Sort students" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="student_name">Student name</option><option value="registration_date">Registration date</option><option value="next_payment_due_date">Payment due date</option><option value="attendance_rate">Attendance rate</option><option value="last_activity">Last activity</option></select>
            <select v-model="filters.sortDirection" aria-label="Sort direction" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="asc">Ascending</option><option value="desc">Descending</option></select>
          </div>
          <button type="button" class="focus-ring mt-4 rounded-md border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700" @click="clearFilters">Reset filters</button>
        </details>

        <div class="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button v-for="item in quickFilters" :key="item.value" type="button" :class="['focus-ring shrink-0 rounded-md px-3 py-2 text-xs font-bold', filters.quick === item.value ? 'bg-brand-purple text-white dark:bg-brand-gold dark:text-slate-950' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200']" @click="filters.quick = filters.quick === item.value ? '' : item.value">{{ item.label }}</button>
        </div>
      </section>

      <section v-if="selectedIds.length" class="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-950/30">
        <div class="flex flex-col gap-3 xl:flex-row xl:items-end">
          <p class="shrink-0 text-sm font-bold text-brand-purple dark:text-brand-gold">{{ selectedIds.length }} selected</p>
          <select v-model="bulkAction" aria-label="Bulk action" class="focus-ring rounded-md border border-purple-200 bg-white px-3 py-2 text-sm dark:border-purple-800 dark:bg-slate-900"><option value="">Choose action</option><option value="assign-class">Assign to class</option><option value="assign-teacher">Assign teacher</option><option value="notification">Send notification</option><option value="follow-up">Mark for follow-up</option><option value="export">Export selected</option><option value="suspend">Suspend access</option><option value="reactivate">Reactivate access</option></select>
          <select v-if="bulkAction === 'assign-class'" v-model="bulkClassId" aria-label="Class for bulk assignment" class="focus-ring rounded-md border border-purple-200 bg-white px-3 py-2 text-sm dark:border-purple-800 dark:bg-slate-900"><option value="">Choose class</option><option v-for="item in classes" :key="item.id" :value="item.id">{{ item.label }}</option></select>
          <select v-if="bulkAction === 'assign-teacher'" v-model="bulkTeacherId" aria-label="Teacher for bulk assignment" class="focus-ring rounded-md border border-purple-200 bg-white px-3 py-2 text-sm dark:border-purple-800 dark:bg-slate-900"><option value="">Choose teacher</option><option v-for="item in teachers" :key="item.id" :value="item.id">{{ item.label }}</option></select>
          <input v-if="bulkAction === 'notification'" v-model="bulkTitle" aria-label="Notification title" class="focus-ring rounded-md border border-purple-200 bg-white px-3 py-2 text-sm dark:border-purple-800 dark:bg-slate-900" placeholder="Notification title">
          <input v-if="bulkAction === 'notification' || bulkAction === 'follow-up'" v-model="bulkMessage" aria-label="Bulk note or message" class="focus-ring min-w-64 flex-1 rounded-md border border-purple-200 bg-white px-3 py-2 text-sm dark:border-purple-800 dark:bg-slate-900" placeholder="Message or internal note">
          <BaseButton size="sm" :loading="actionLoading" @click="performBulkAction">Apply</BaseButton>
        </div>
      </section>

      <div v-if="showBulkConfirmation" class="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby="bulk-confirm-title">
        <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900">
          <h2 id="bulk-confirm-title" class="text-xl font-bold text-slate-950 dark:text-white">Suspend selected students?</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Class access will be suspended for {{ selectedIds.length }} students. Their profiles and learning records will not be deleted.</p>
          <div class="mt-6 flex justify-end gap-3"><BaseButton variant="outline" @click="showBulkConfirmation = false">Cancel</BaseButton><BaseButton :loading="actionLoading" @click="performBulkAction">Confirm suspension</BaseButton></div>
        </div>
      </div>

      <div v-if="loading" class="grid gap-3"><div v-for="index in 6" :key="index" class="h-16 animate-pulse rounded-md bg-white dark:bg-slate-900" /></div>
      <template v-else-if="students.length">
        <div class="hidden overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
          <table class="w-full min-w-[2300px] text-sm">
            <thead class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800/60 dark:text-slate-300"><tr><th class="px-4 py-3"><input type="checkbox" :checked="allPageSelected" aria-label="Select page" @change="togglePageSelection"></th><th class="px-4 py-3">Student</th><th class="px-4 py-3">Age</th><th class="px-4 py-3">Parent / WhatsApp</th><th class="px-4 py-3">Course</th><th class="px-4 py-3">Class</th><th class="px-4 py-3">Type</th><th class="px-4 py-3">Teacher</th><th class="px-4 py-3">Trial</th><th class="px-4 py-3">Enrollment</th><th class="px-4 py-3">Payment</th><th class="px-4 py-3">Attendance</th><th class="px-4 py-3">Next due</th><th class="px-4 py-3">Account</th><th class="px-4 py-3">Last activity</th><th class="px-4 py-3">Actions</th></tr></thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr v-for="student in students" :key="student.id">
                <td class="px-4 py-3"><input v-model="selectedIds" type="checkbox" :value="student.id" :aria-label="`Select ${student.student_name}`"></td>
                <td class="px-4 py-3 font-bold text-slate-950 dark:text-white">{{ student.student_name }}</td><td class="px-4 py-3">{{ student.age ?? '-' }}</td><td class="px-4 py-3"><p>{{ student.parent_name }}</p><p class="text-xs text-slate-500">{{ student.parent_whatsapp || 'Not set' }}</p></td><td class="px-4 py-3">{{ student.course_name || 'Not assigned' }}</td><td class="px-4 py-3">{{ student.class_name || 'Not assigned' }}</td><td class="px-4 py-3">{{ student.class_type || '-' }}</td><td class="px-4 py-3">{{ student.teacher_name || 'Not assigned' }}</td><td class="px-4 py-3"><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(student.trial_status)]">{{ student.trial_status || '-' }}</span></td><td class="px-4 py-3"><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(student.student_status)]">{{ student.student_status }}</span></td><td class="px-4 py-3"><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(student.payment_status)]">{{ student.payment_status || 'No invoice' }}</span></td><td class="px-4 py-3">{{ student.attendance_rate }}%</td><td class="px-4 py-3">{{ formatDate(student.next_payment_due_date) }}</td><td class="px-4 py-3">{{ student.account_type }}</td><td class="px-4 py-3">{{ formatDate(student.last_activity) }}</td><td class="px-4 py-3"><BaseButton :to="`/management/students/${student.id}`" size="sm">Open</BaseButton></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="grid gap-4 lg:hidden">
          <article v-for="student in students" :key="student.id" class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div class="flex items-start justify-between gap-3"><label class="flex items-start gap-3"><input v-model="selectedIds" type="checkbox" :value="student.id" class="mt-1"><span><span class="block font-bold text-slate-950 dark:text-white">{{ student.student_name }}</span><span class="mt-1 block text-xs text-slate-500">{{ student.parent_name }} / {{ student.parent_whatsapp || 'No phone' }}</span></span></label><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(student.student_status)]">{{ student.student_status }}</span></div>
            <dl class="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt class="text-xs text-slate-500">Course</dt><dd class="font-semibold">{{ student.course_name || 'Not assigned' }}</dd></div><div><dt class="text-xs text-slate-500">Class</dt><dd class="font-semibold">{{ student.class_name || 'Not assigned' }}</dd></div><div><dt class="text-xs text-slate-500">Teacher</dt><dd class="font-semibold">{{ student.teacher_name || 'Not assigned' }}</dd></div><div><dt class="text-xs text-slate-500">Attendance</dt><dd class="font-semibold">{{ student.attendance_rate }}%</dd></div><div><dt class="text-xs text-slate-500">Payment</dt><dd class="font-semibold">{{ student.payment_status || 'No invoice' }}</dd></div><div><dt class="text-xs text-slate-500">Account</dt><dd class="font-semibold">{{ student.account_type }}</dd></div></dl>
            <BaseButton :to="`/management/students/${student.id}`" size="sm" class="mt-4">Open student</BaseButton>
          </article>
        </div>

        <div class="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"><p class="text-sm text-slate-600 dark:text-slate-300">{{ totalStudents }} records / page {{ filters.page }} of {{ totalPages }}</p><div class="flex gap-2"><BaseButton variant="outline" size="sm" :disabled="filters.page <= 1" @click="filters.page--">Previous</BaseButton><BaseButton variant="outline" size="sm" :disabled="filters.page >= totalPages" @click="filters.page++">Next</BaseButton></div></div>
      </template>
      <EmptyState v-else title="No students found" description="No live Supabase student records match the selected filters." action-label="Reset filters" @action="clearFilters" />
    </div>
  </ManagementShell>
</template>
