<script setup lang="ts">
import type { ManagementStudentDetail } from '~/composables/useManagementOperations'

definePageMeta({ middleware: 'management' })
useSeoMeta({ title: 'Student Record', description: 'Secure Management student detail and operational actions.' })

const route = useRoute()
const studentId = computed(() => String(route.params.id ?? ''))
const { authorized, verifiedRole } = useManagementAccess()
const operations = useManagementOperations()
const { classes, teachers, loadOptions, loadStudentDetail } = operations
const detail = ref<ManagementStudentDetail | null>(null)
const loading = ref(false)
const actionLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showDeleteConfirmation = ref(false)

const studentDraft = reactive({ first_name: '', last_name: '', gender: '', date_of_birth: '', native_language: '', current_level: '', status: '' })
const parentDraft = reactive({ full_name: '', email: '', whatsapp_number: '', relationship_to_student: '', country: '', city: '', timezone: '' })
const academicDraft = reactive({ classId: '', teacherId: '', classType: '' })
const trialDays = ref(2)
const accessDays = ref(7)
const invoiceDraft = reactive({ amount: 30, dueDate: '', notes: '' })
const paymentDraft = reactive({ amount: 30, method: 'bank_transfer', transactionId: '' })
const followUpDraft = reactive({ reason: '', status: 'not_contacted', note: '', nextDate: '', dueDate: '' })
const notificationDraft = reactive({ recipient: 'parent' as 'parent' | 'student', title: '', message: '' })

const statusClass = (status: string | null) => {
  const value = status?.toLowerCase() ?? ''
  if (value.includes('overdue') || value.includes('suspend') || value === 'absent') return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200'
  if (value.includes('paid') || value === 'active' || value === 'present' || value === 'resolved') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200'
  if (value.includes('trial')) return 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200'
  if (value.includes('pending') || value.includes('due') || value === 'late') return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200'
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
}
const formatDate = (value: string | null) => value ? new Date(value).toLocaleDateString('en-GB') : 'Not set'
const weekdayName = (weekday: number | null) => weekday === null ? 'Not scheduled' : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday]

const syncDrafts = () => {
  if (!detail.value) return
  const student = detail.value.student
  Object.assign(studentDraft, {
    first_name: student.first_name,
    last_name: student.last_name,
    gender: student.gender ?? '',
    date_of_birth: student.date_of_birth ?? '',
    native_language: student.native_language ?? '',
    current_level: student.current_level ?? '',
    status: student.student_record_status
  })
  Object.assign(parentDraft, {
    full_name: student.parent_name,
    email: student.parent_email,
    whatsapp_number: student.parent_whatsapp ?? '',
    relationship_to_student: student.parent_relationship ?? '',
    country: student.country ?? '',
    city: student.city ?? '',
    timezone: student.timezone ?? ''
  })
  Object.assign(academicDraft, {
    classId: student.class_id ?? '',
    teacherId: student.teacher_id ?? '',
    classType: student.class_type ?? ''
  })
  paymentDraft.amount = detail.value.invoices[0]?.amount ?? 30
  const currentFollowUp = detail.value.followUps.find((item) => item.id === student.follow_up_id) ?? detail.value.followUps[0]
  Object.assign(followUpDraft, {
    reason: currentFollowUp?.reason ?? '',
    status: currentFollowUp?.status ?? 'not_contacted',
    note: currentFollowUp?.manager_notes ?? '',
    nextDate: currentFollowUp?.next_follow_up_date ?? '',
    dueDate: currentFollowUp?.due_date ?? ''
  })
}

const load = async () => {
  if (!authorized.value || !studentId.value) return
  loading.value = true
  errorMessage.value = ''
  try {
    await loadOptions()
    detail.value = await loadStudentDetail(studentId.value)
    syncDrafts()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Student details could not be loaded.'
  } finally {
    loading.value = false
  }
}

const runAction = async (success: string, action: () => Promise<void>) => {
  actionLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await action()
    successMessage.value = success
    await load()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'The Management action could not be completed.'
  } finally {
    actionLoading.value = false
  }
}

const saveStudent = () => runAction('Student information updated.', () => operations.updateStudent(studentId.value, studentDraft))
const saveParent = () => detail.value
  ? runAction('Parent contact information updated.', () => operations.updateParent(detail.value!.student.parent_id, parentDraft))
  : Promise.resolve()
const saveAcademic = () => runAction('Class assignment updated.', async () => {
  if (!academicDraft.classId) throw new Error('Choose a class before saving.')
  await operations.assignClass(studentId.value, academicDraft.classId, detail.value?.student.enrollment_status ?? 'active')
  if (academicDraft.teacherId) await operations.changeTeacher(academicDraft.classId, academicDraft.teacherId)
  if (academicDraft.classType) await operations.changeClassType(academicDraft.classId, academicDraft.classType)
})
const extendTrial = () => detail.value?.student.enrollment_id
  ? runAction('Trial period extended.', () => operations.extendTrial(detail.value!.student.enrollment_id!, trialDays.value))
  : Promise.resolve()
const activate = () => detail.value?.student.enrollment_id
  ? runAction('Enrollment activated for 30 days.', () => operations.activateEnrollment(detail.value!.student.enrollment_id!))
  : Promise.resolve()
const extendAccess = () => detail.value?.student.enrollment_id
  ? runAction('Temporary access extended.', () => operations.extendAccess(detail.value!.student.enrollment_id!, accessDays.value))
  : Promise.resolve()
const suspend = (value: boolean) => detail.value
  ? runAction(value ? 'Student access suspended.' : 'Student access reactivated.', () => operations.setSuspended(studentId.value, detail.value!.student.enrollment_id, value))
  : Promise.resolve()
const removeClass = () => detail.value?.student.enrollment_id
  ? runAction('Student removed from the class without deleting their academy record.', () => operations.removeFromClass(detail.value!.student.enrollment_id!))
  : Promise.resolve()
const createInvoice = () => detail.value
  ? runAction('Manual invoice created.', () => operations.createInvoice(detail.value!.student, invoiceDraft.amount, invoiceDraft.dueDate, invoiceDraft.notes))
  : Promise.resolve()
const receivePayment = () => detail.value
  ? runAction('Payment marked as received and enrollment activated.', () => operations.markPaymentReceived(detail.value!.student, paymentDraft.amount, paymentDraft.method, paymentDraft.transactionId))
  : Promise.resolve()
const saveFollowUp = () => runAction('Follow-up history updated.', async () => {
  const followUpId = detail.value?.student.follow_up_id
  if (followUpId) await operations.updateFollowUp(followUpId, followUpDraft.status, followUpDraft.note, followUpDraft.nextDate)
  else {
    if (!followUpDraft.reason.trim()) throw new Error('Enter a follow-up reason.')
    await operations.addFollowUp(studentId.value, followUpDraft.reason, followUpDraft.note, followUpDraft.dueDate, followUpDraft.status)
  }
})
const sendNotification = () => detail.value
  ? runAction('Notification sent.', () => operations.sendNotification(detail.value!.student, notificationDraft.title, notificationDraft.message, notificationDraft.recipient))
  : Promise.resolve()
const permanentlyDelete = async () => {
  actionLoading.value = true
  errorMessage.value = ''
  try {
    await operations.deleteStudentPermanently(studentId.value)
    showDeleteConfirmation.value = false
    await navigateTo('/management/students')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'The student could not be permanently deleted.'
  } finally {
    actionLoading.value = false
  }
}

watch(authorized, (value) => { if (value) void load() }, { immediate: true })
</script>

<template>
  <section v-if="!authorized" class="section-padding bg-slate-100 dark:bg-slate-950"><div class="container-wide"><LoadingPanel label="Verifying Management access..." /></div></section>
  <ManagementShell v-else :title="detail?.student.student_name ?? 'Student record'" description="Review the complete family, academic, attendance, payment, notification, and follow-up history.">
    <template #actions><BaseButton to="/management/students" variant="outline">Back to students</BaseButton></template>

    <LoadingPanel v-if="loading" label="Loading live student information..." />
    <div v-else-if="errorMessage && !detail" class="rounded-md border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">{{ errorMessage }} <button class="ml-2 underline" @click="load">Retry</button></div>
    <div v-else-if="detail" class="grid gap-6">
      <div v-if="errorMessage" class="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200" role="alert">{{ errorMessage }}</div>
      <div v-if="successMessage" class="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200" role="status">{{ successMessage }}</div>

      <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Account</p><p class="mt-2 font-bold text-slate-950 dark:text-white">{{ detail.student.account_type }}</p><span :class="['mt-3 inline-flex rounded-md px-2 py-1 text-xs font-bold', statusClass(detail.student.student_status)]">{{ detail.student.student_status }}</span></article>
        <article class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Class / Teacher</p><p class="mt-2 font-bold text-slate-950 dark:text-white">{{ detail.student.class_name || 'Not assigned' }}</p><p class="mt-1 text-sm text-slate-500">{{ detail.student.teacher_name || 'No teacher' }}</p></article>
        <article class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Payment</p><p class="mt-2 font-bold text-slate-950 dark:text-white">{{ detail.student.payment_status || 'No invoice' }}</p><p class="mt-1 text-sm text-slate-500">Due {{ formatDate(detail.student.next_payment_due_date) }} / {{ detail.student.days_overdue }} days overdue</p></article>
        <article class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Attendance</p><p class="mt-2 text-2xl font-black text-brand-purple dark:text-brand-gold">{{ detail.student.attendance_rate }}%</p><p class="mt-1 text-sm text-slate-500">{{ detail.student.attendance_records }} records</p></article>
      </section>

      <div class="grid gap-6 xl:grid-cols-2">
        <form class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveStudent"><h2 class="text-lg font-bold text-slate-950 dark:text-white">Student information</h2><div class="mt-4 grid gap-3 sm:grid-cols-2"><input v-model="studentDraft.first_name" aria-label="First name" placeholder="First name" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="studentDraft.last_name" aria-label="Last name" placeholder="Last name" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="studentDraft.date_of_birth" aria-label="Date of birth" type="date" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="studentDraft.gender" aria-label="Gender" placeholder="Gender" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="studentDraft.native_language" aria-label="Native language" placeholder="Native language" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="studentDraft.current_level" aria-label="Current level" placeholder="Current level" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><select v-model="studentDraft.status" aria-label="Account status" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="active">Active</option><option value="inactive">Inactive</option><option value="suspended">Suspended</option></select></div><BaseButton type="submit" size="sm" :loading="actionLoading" class="mt-4">Save student</BaseButton></form>
        <form class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveParent"><h2 class="text-lg font-bold text-slate-950 dark:text-white">Parent information</h2><div class="mt-4 grid gap-3 sm:grid-cols-2"><input v-model="parentDraft.full_name" aria-label="Parent full name" placeholder="Full name" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="parentDraft.relationship_to_student" aria-label="Relationship" placeholder="Relationship" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="parentDraft.email" aria-label="Parent email" type="email" placeholder="Email" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="parentDraft.whatsapp_number" aria-label="WhatsApp" placeholder="WhatsApp" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="parentDraft.country" aria-label="Country" placeholder="Country" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="parentDraft.city" aria-label="City" placeholder="City" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="parentDraft.timezone" aria-label="Timezone" placeholder="Timezone" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"></div><BaseButton type="submit" size="sm" :loading="actionLoading" class="mt-4">Save parent</BaseButton></form>
      </div>

      <section class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 class="text-lg font-bold text-slate-950 dark:text-white">Academic assignment and access</h2><div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><select v-model="academicDraft.classId" aria-label="Assigned class" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">Choose class</option><option v-for="item in classes" :key="item.id" :value="item.id">{{ item.label }}</option></select><select v-model="academicDraft.teacherId" aria-label="Assigned teacher" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="">Choose teacher</option><option v-for="item in teachers" :key="item.id" :value="item.id">{{ item.label }}</option></select><select v-model="academicDraft.classType" aria-label="Class type" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="group">Group</option><option value="special">Special</option><option value="premium">Premium</option></select><BaseButton size="sm" :loading="actionLoading" @click="saveAcademic">Save assignment</BaseButton></div><dl class="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4"><div><dt class="text-xs font-bold uppercase text-slate-500">Course</dt><dd class="mt-1 font-semibold">{{ detail.student.course_name || 'Not assigned' }}</dd></div><div><dt class="text-xs font-bold uppercase text-slate-500">Schedule</dt><dd class="mt-1 font-semibold">{{ weekdayName(detail.student.weekday) }} {{ detail.student.start_time || '' }} - {{ detail.student.end_time || '' }} {{ detail.student.schedule_timezone || '' }}</dd></div><div><dt class="text-xs font-bold uppercase text-slate-500">Enrollment</dt><dd class="mt-1 font-semibold">{{ formatDate(detail.student.enrollment_start_date) }} to {{ formatDate(detail.student.enrollment_end_date) }}</dd></div><div><dt class="text-xs font-bold uppercase text-slate-500">Meeting</dt><dd class="mt-1 break-all font-semibold">{{ detail.student.meeting_url || 'Missing meeting link' }}</dd></div></dl><div class="mt-5 flex flex-wrap items-end gap-3"><label class="text-xs font-bold text-slate-500">Trial days<input v-model.number="trialDays" min="1" max="30" type="number" class="focus-ring mt-1 block w-24 rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"></label><BaseButton size="sm" variant="outline" :disabled="!detail.student.enrollment_id" @click="extendTrial">Extend trial</BaseButton><BaseButton size="sm" :disabled="!detail.student.enrollment_id" @click="activate">Activate 30 days</BaseButton><label class="text-xs font-bold text-slate-500">Access days<input v-model.number="accessDays" min="1" max="60" type="number" class="focus-ring mt-1 block w-24 rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"></label><BaseButton size="sm" variant="outline" :disabled="!detail.student.enrollment_id" @click="extendAccess">Extend access</BaseButton><BaseButton size="sm" variant="outline" @click="suspend(true)">Suspend</BaseButton><BaseButton size="sm" variant="outline" @click="suspend(false)">Reactivate</BaseButton><BaseButton size="sm" variant="outline" :disabled="!detail.student.enrollment_id" @click="removeClass">Remove from class</BaseButton></div></section>

      <div class="grid gap-6 xl:grid-cols-2"><form class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createInvoice"><h2 class="text-lg font-bold text-slate-950 dark:text-white">Create manual invoice</h2><div class="mt-4 grid gap-3 sm:grid-cols-2"><input v-model.number="invoiceDraft.amount" min="0" step="0.01" type="number" aria-label="Invoice amount" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="invoiceDraft.dueDate" required type="date" aria-label="Invoice due date" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><textarea v-model="invoiceDraft.notes" aria-label="Invoice notes" placeholder="Invoice notes" class="focus-ring sm:col-span-2 rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea></div><BaseButton type="submit" size="sm" :loading="actionLoading" class="mt-4">Create invoice</BaseButton></form><form class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" @submit.prevent="receivePayment"><h2 class="text-lg font-bold text-slate-950 dark:text-white">Mark payment received</h2><div class="mt-4 grid gap-3 sm:grid-cols-2"><input v-model.number="paymentDraft.amount" min="0" step="0.01" type="number" aria-label="Payment amount" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><select v-model="paymentDraft.method" aria-label="Payment method" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="bank_transfer">Bank transfer</option><option value="wise">Wise</option><option value="paypal">PayPal</option><option value="stripe">Stripe</option><option value="western_union">Western Union</option><option value="other">Other</option></select><input v-model="paymentDraft.transactionId" aria-label="Transaction ID" placeholder="Transaction ID (optional)" class="focus-ring sm:col-span-2 rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"></div><BaseButton type="submit" size="sm" :loading="actionLoading" class="mt-4">Receive payment</BaseButton></form></div>

      <div class="grid gap-6 xl:grid-cols-2"><form class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveFollowUp"><h2 class="text-lg font-bold text-slate-950 dark:text-white">Follow-up workflow</h2><div class="mt-4 grid gap-3 sm:grid-cols-2"><input v-model="followUpDraft.reason" :disabled="Boolean(detail.student.follow_up_id)" aria-label="Follow-up reason" placeholder="Reason" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><select v-model="followUpDraft.status" aria-label="Follow-up status" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="not_contacted">Not Contacted</option><option value="contact_attempted">Contact Attempted</option><option value="parent_responded">Parent Responded</option><option value="payment_promised">Payment Promised</option><option value="extended">Extended</option><option value="suspended">Suspended</option><option value="resolved">Resolved</option></select><input v-if="!detail.student.follow_up_id" v-model="followUpDraft.dueDate" type="date" aria-label="Follow-up due date" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><input v-model="followUpDraft.nextDate" type="date" aria-label="Next follow-up date" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><textarea v-model="followUpDraft.note" aria-label="Manager follow-up note" placeholder="Internal note" class="focus-ring sm:col-span-2 rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea></div><BaseButton type="submit" size="sm" :loading="actionLoading" class="mt-4">Save follow-up</BaseButton></form><form class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" @submit.prevent="sendNotification"><h2 class="text-lg font-bold text-slate-950 dark:text-white">Send notification</h2><div class="mt-4 grid gap-3"><select v-model="notificationDraft.recipient" aria-label="Notification recipient" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="parent">Parent</option><option value="student">Student</option></select><input v-model="notificationDraft.title" required aria-label="Notification title" placeholder="Title" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"><textarea v-model="notificationDraft.message" required aria-label="Notification message" placeholder="Message" class="focus-ring rounded-md border border-slate-300 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea></div><BaseButton type="submit" size="sm" :loading="actionLoading" class="mt-4">Send notification</BaseButton></form></div>

      <section class="grid gap-6 xl:grid-cols-2"><article class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><h2 class="border-b border-slate-200 p-5 text-lg font-bold dark:border-slate-800">Attendance history</h2><div v-if="detail.attendance.length" class="max-h-80 divide-y divide-slate-200 overflow-y-auto dark:divide-slate-800"><div v-for="record in detail.attendance" :key="record.id" class="flex items-center justify-between p-4 text-sm"><span>{{ formatDate(record.attendance_date) }}<span v-if="record.notes" class="ml-2 text-xs text-slate-500">{{ record.notes }}</span></span><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(record.status)]">{{ record.status }}</span></div></div><EmptyState v-else title="No attendance" description="No attendance records exist for this student." /></article><article class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><h2 class="border-b border-slate-200 p-5 text-lg font-bold dark:border-slate-800">Monthly reports and homework</h2><div v-if="detail.reports.length || detail.homework.length" class="max-h-80 divide-y divide-slate-200 overflow-y-auto dark:divide-slate-800"><div v-for="report in detail.reports" :key="report.id" class="p-4 text-sm"><p class="font-bold">{{ formatDate(report.report_month) }}</p><p class="mt-2 text-slate-600 dark:text-slate-300">{{ report.summary || report.progress_notes || 'No summary' }}</p></div><div v-for="submission in detail.homework" :key="submission.id" class="p-4 text-sm"><p class="font-bold">Homework {{ submission.status }} / {{ submission.grade || 'Not graded' }}</p><p class="mt-2 text-slate-600 dark:text-slate-300">{{ submission.teacher_feedback || 'No teacher feedback' }}</p></div></div><EmptyState v-else title="No progress records" description="Monthly reports and homework feedback will appear here." /></article></section>

      <section class="grid gap-6 xl:grid-cols-3"><article class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><h2 class="border-b border-slate-200 p-5 text-lg font-bold dark:border-slate-800">Invoice history</h2><div v-if="detail.invoices.length" class="divide-y divide-slate-200 dark:divide-slate-800"><div v-for="invoice in detail.invoices" :key="invoice.id" class="p-4 text-sm"><div class="flex justify-between gap-3"><span class="font-bold">{{ invoice.invoice_number }}</span><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(invoice.status)]">{{ invoice.status }}</span></div><p class="mt-2">{{ invoice.currency }} {{ invoice.amount }} / due {{ formatDate(invoice.due_date) }}</p></div></div><EmptyState v-else title="No invoices" description="No invoice has been created for this student." /></article><article class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><h2 class="border-b border-slate-200 p-5 text-lg font-bold dark:border-slate-800">Payment history</h2><div v-if="detail.payments.length" class="divide-y divide-slate-200 dark:divide-slate-800"><div v-for="payment in detail.payments" :key="payment.id" class="p-4 text-sm"><div class="flex justify-between gap-3"><span class="font-bold">{{ payment.currency }} {{ payment.amount }}</span><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(payment.status)]">{{ payment.status }}</span></div><p class="mt-2">{{ payment.payment_method }} / {{ formatDate(payment.payment_date) }}</p></div></div><EmptyState v-else title="No payments" description="No payment records exist for this student." /></article><article class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><h2 class="border-b border-slate-200 p-5 text-lg font-bold dark:border-slate-800">Notifications</h2><div v-if="detail.notifications.length" class="max-h-80 divide-y divide-slate-200 overflow-y-auto dark:divide-slate-800"><div v-for="notification in detail.notifications" :key="notification.id" class="p-4 text-sm"><p class="font-bold">{{ notification.title }}</p><p class="mt-2 text-slate-600 dark:text-slate-300">{{ notification.message }}</p><p class="mt-2 text-xs text-slate-500">{{ formatDate(notification.created_at) }}</p></div></div><EmptyState v-else title="No notifications" description="No notifications have been recorded for this student." /></article></section>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><h2 class="border-b border-slate-200 p-5 text-lg font-bold dark:border-slate-800">Follow-up history</h2><div v-if="detail.followUps.length || detail.followUpHistory.length" class="grid gap-4 p-5 lg:grid-cols-2"><div v-for="item in detail.followUps" :key="item.id" class="rounded-md border border-slate-200 p-4 text-sm dark:border-slate-800"><div class="flex justify-between gap-3"><p class="font-bold">{{ item.reason }}</p><span :class="['rounded-md px-2 py-1 text-xs font-bold', statusClass(item.status)]">{{ item.status.replaceAll('_', ' ') }}</span></div><p class="mt-2 text-slate-600 dark:text-slate-300">{{ item.manager_notes || 'No note' }}</p><p class="mt-2 text-xs text-slate-500">Last contact: {{ formatDate(item.last_contact_date) }} / Next: {{ formatDate(item.next_follow_up_date) }}</p></div><div v-for="history in detail.followUpHistory" :key="history.id" class="rounded-md bg-slate-50 p-4 text-sm dark:bg-slate-800"><p class="font-bold">{{ history.action }} / {{ history.status?.replaceAll('_', ' ') }}</p><p class="mt-2 text-slate-600 dark:text-slate-300">{{ history.note || 'No note' }}</p><p class="mt-2 text-xs text-slate-500">{{ formatDate(history.created_at) }}</p></div></div><EmptyState v-else title="No follow-up history" description="Create a follow-up to begin a permanent manager contact history." /></section>

      <section v-if="verifiedRole === 'super_admin'" class="rounded-lg border border-rose-200 bg-rose-50 p-5 dark:border-rose-900 dark:bg-rose-950/30"><h2 class="text-lg font-bold text-rose-800 dark:text-rose-200">Super Admin danger zone</h2><p class="mt-2 text-sm leading-6 text-rose-700 dark:text-rose-300">Permanent deletion can remove related enrollments, attendance, homework submissions, reports, follow-ups, and other cascading records. Suspension or class removal should be used first.</p><BaseButton variant="outline" size="sm" class="mt-4" @click="showDeleteConfirmation = true">Permanently delete student</BaseButton></section>

      <div v-if="showDeleteConfirmation" class="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-student-title"><div class="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900"><h2 id="delete-student-title" class="text-xl font-bold text-slate-950 dark:text-white">Permanently delete {{ detail.student.student_name }}?</h2><p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">This cannot be undone and may delete linked enrollment, attendance, homework, report, notification, and follow-up records. The Supabase Auth account is not deleted by this frontend action.</p><div class="mt-6 flex justify-end gap-3"><BaseButton variant="outline" @click="showDeleteConfirmation = false">Cancel</BaseButton><BaseButton :loading="actionLoading" @click="permanentlyDelete">Delete permanently</BaseButton></div></div></div>
    </div>
  </ManagementShell>
</template>
