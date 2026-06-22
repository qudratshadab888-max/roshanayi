<script setup lang="ts">
import { paymentMethods } from '~/data/paymentPlans'
import type { ManualPaymentMethod, PaymentInvoice } from '~/types'
import { downloadInvoicePdf, downloadReceiptPdf } from '~/utils/paymentPdf'

const props = withDefaults(defineProps<{ fullControl?: boolean }>(), { fullControl: false })
const { currentUser } = useRoleAuth()
const {
  initialize, invoices, receipts, submissions, paymentProfiles, getStudentPaymentAccess,
  markPaymentReceived, addManualPayment, setInvoiceStatus, suspendStudent, reactivateStudent,
  getManagerPaymentNotifications
} = usePaymentSystem()

const filter = ref<'all' | 'paid' | 'unpaid' | 'overdue' | 'trial-ended'>('all')
const selectedInvoice = ref<PaymentInvoice | null>(null)
const manageInvoice = ref<PaymentInvoice | null>(null)
const paymentMethod = ref<ManualPaymentMethod>('Bank Transfer')
const transactionId = ref('')
const notice = ref('')
const manual = reactive({ studentId: '', paymentMethod: 'Bank Transfer' as ManualPaymentMethod, transactionId: '', paymentDate: new Date().toISOString().slice(0, 10) })
const filterItems = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'trial-ended', label: 'Trial ended' }
] as const

const sortedInvoices = computed(() => [...invoices.value].sort((a, b) => b.invoiceDate.localeCompare(a.invoiceDate)))
const paidInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'Paid'))
const unpaidInvoices = computed(() => invoices.value.filter((invoice) => ['Draft', 'Pending'].includes(invoice.status)))
const overdueInvoices = computed(() => invoices.value.filter((invoice) => invoice.status === 'Overdue'))
const trialEndedProfiles = computed(() => paymentProfiles.value.filter((profile) => getStudentPaymentAccess(profile.studentId).status === 'Payment Required'))
const needsFollowUp = computed(() => paymentProfiles.value.filter((profile) => getStudentPaymentAccess(profile.studentId).status === 'Needs Follow-up'))
const suspendedProfiles = computed(() => paymentProfiles.value.filter((profile) => getStudentPaymentAccess(profile.studentId).status === 'Suspended'))
const accessReviewProfiles = computed(() => [...needsFollowUp.value, ...suspendedProfiles.value])
const filteredInvoices = computed(() => {
  if (filter.value === 'paid') return sortedInvoices.value.filter((invoice) => invoice.status === 'Paid')
  if (filter.value === 'unpaid') return sortedInvoices.value.filter((invoice) => ['Draft', 'Pending'].includes(invoice.status))
  if (filter.value === 'overdue') return sortedInvoices.value.filter((invoice) => invoice.status === 'Overdue')
  if (filter.value === 'trial-ended') {
    const ids = new Set(trialEndedProfiles.value.map((profile) => profile.studentId))
    return sortedInvoices.value.filter((invoice) => ids.has(invoice.studentId))
  }
  return sortedInvoices.value
})
const managerNotifications = computed(() => getManagerPaymentNotifications().sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
const monthlyIncome = computed(() => {
  const totals = new Map<string, number>()
  receipts.value.forEach((receipt) => {
    const month = new Date(`${receipt.paymentDate}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    totals.set(month, (totals.get(month) ?? 0) + receipt.amountPaid)
  })
  return [...totals.entries()].map(([month, total]) => ({ month, total }))
})
const totalIncome = computed(() => receipts.value.reduce((total, receipt) => total + receipt.amountPaid, 0))
const awaitingSubmission = (invoiceId: string) => submissions.value.find((submission) => submission.invoiceId === invoiceId && submission.status === 'Awaiting confirmation')

onMounted(initialize)

const openManage = (invoice: PaymentInvoice) => {
  manageInvoice.value = invoice
  const submission = awaitingSubmission(invoice.id)
  paymentMethod.value = submission?.paymentMethod ?? 'Bank Transfer'
  transactionId.value = submission?.transactionId ?? ''
}

const confirmPayment = () => {
  if (!manageInvoice.value) return
  const receipt = markPaymentReceived(manageInvoice.value.id, paymentMethod.value, transactionId.value, currentUser.value?.name ?? (props.fullControl ? 'Super Admin' : 'Manager'))
  if (receipt) notice.value = `Payment confirmed. Receipt ${receipt.id} was generated and access activated for 30 days.`
  manageInvoice.value = null
}

const saveManualPayment = () => {
  if (!manual.studentId) {
    notice.value = 'Select a student before adding a manual payment.'
    return
  }
  const receipt = addManualPayment({
    studentId: manual.studentId, paymentMethod: manual.paymentMethod, transactionId: manual.transactionId,
    paymentDate: manual.paymentDate, receivedBy: currentUser.value?.name ?? (props.fullControl ? 'Super Admin' : 'Manager')
  })
  if (receipt) {
    notice.value = `Manual payment recorded and receipt ${receipt.id} generated.`
    manual.transactionId = ''
  }
}

const suspend = (studentId: string, studentName: string) => {
  suspendStudent(studentId, currentUser.value?.name ?? 'Manager')
  notice.value = `${studentName} was suspended from live class access. The student record was preserved.`
}
const reactivate = (studentId: string, studentName: string) => {
  reactivateStudent(studentId, currentUser.value?.name ?? 'Manager', true)
  notice.value = `${studentName} received temporary access while payment is reviewed.`
}
const cancelSelectedInvoice = () => {
  if (!manageInvoice.value || !props.fullControl) return
  setInvoiceStatus(manageInvoice.value.id, 'Cancelled')
  notice.value = `${manageInvoice.value.id} was cancelled.`
  manageInvoice.value = null
}
const updateSelectedInvoiceStatus = (status: 'Draft' | 'Pending' | 'Overdue') => {
  if (!manageInvoice.value || !props.fullControl) return
  setInvoiceStatus(manageInvoice.value.id, status)
  notice.value = `${manageInvoice.value.id} is now ${status}.`
  manageInvoice.value = null
}
</script>

<template>
  <div class="grid gap-8">
    <p v-if="notice" class="rounded-md bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200" role="status">{{ notice }}</p>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <DashboardStatCard label="Paid students" :value="paidInvoices.length" detail="Paid invoices" tone="emerald" />
      <DashboardStatCard label="Unpaid students" :value="unpaidInvoices.length" detail="Draft or pending" tone="amber" />
      <DashboardStatCard label="Overdue students" :value="overdueInvoices.length" detail="Needs follow-up" tone="rose" />
      <DashboardStatCard label="Trial ended" :value="trialEndedProfiles.length" detail="Payment required" tone="sky" />
      <DashboardStatCard :label="fullControl ? 'Total income' : 'Follow-up'" :value="fullControl ? `$${totalIncome}` : accessReviewProfiles.length" :detail="fullControl ? 'Confirmed receipts' : 'Overdue access review'" tone="purple" />
    </section>

    <article v-if="fullControl" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h2 class="text-xl font-black text-slate-950 dark:text-white">Monthly income overview</h2>
      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div v-for="item in monthlyIncome" :key="item.month" class="rounded-lg bg-purple-50 p-5 dark:bg-purple-950/30"><p class="text-sm font-semibold text-slate-600 dark:text-slate-300">{{ item.month }}</p><p class="mt-2 text-3xl font-black text-brand-purple dark:text-brand-gold">${{ item.total }} USD</p></div></div>
    </article>

    <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h2 class="text-xl font-black text-slate-950 dark:text-white">{{ fullControl ? 'All invoices' : 'Student invoices' }}</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Automatic trial and renewal invoices, manual payment confirmation, and status controls.</p></div><div class="flex flex-wrap gap-2"><button v-for="item in filterItems" :key="item.value" type="button" :class="['focus-ring rounded-full px-4 py-2 text-sm font-bold', filter === item.value ? 'bg-brand-purple text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200']" @click="filter = item.value">{{ item.label }}</button></div></div>
      <PaymentInvoiceTable class="mt-5" :invoices="filteredInvoices" show-manage @view="selectedInvoice = $event" @download="downloadInvoicePdf" @manage="openManage" />
    </article>

    <div class="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
      <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveManualPayment">
        <h2 class="text-xl font-black text-slate-950 dark:text-white">Add manual payment</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Creates or pays the open invoice, generates a receipt, and activates access for 30 days.</p>
        <label class="mt-5 block text-sm font-bold" for="manual-student">Student</label><select id="manual-student" v-model="manual.studentId" required class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"><option value="" disabled>Select student</option><option v-for="profile in paymentProfiles" :key="profile.studentId" :value="profile.studentId">{{ profile.studentName }} · ${{ profile.amount }}</option></select>
        <label class="mt-4 block text-sm font-bold" for="manual-method">Payment method</label><select id="manual-method" v-model="manual.paymentMethod" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"><option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}{{ method === 'Stripe' ? ' (placeholder)' : '' }}</option></select>
        <div class="mt-4 grid gap-4 sm:grid-cols-2"><div><label class="block text-sm font-bold" for="manual-date">Payment date</label><input id="manual-date" v-model="manual.paymentDate" required type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"></div><div><label class="block text-sm font-bold" for="manual-transaction">Transaction ID</label><input id="manual-transaction" v-model="manual.transactionId" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"></div></div>
        <BaseButton type="submit" class="mt-5" block>Record Payment</BaseButton>
      </form>

      <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><div class="flex items-end justify-between gap-3"><div><h2 class="text-xl font-black text-slate-950 dark:text-white">Needs follow-up</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Overdue and suspended students are never deleted automatically.</p></div><PaymentStatusBadge :status="`${accessReviewProfiles.length} students`" /></div><div class="mt-5 grid gap-4"><div v-for="profile in accessReviewProfiles" :key="profile.studentId" class="rounded-lg border border-rose-200 p-5 dark:border-rose-900"><div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h3 class="font-black">{{ profile.studentName }}</h3><p class="mt-1 text-sm text-slate-500">{{ profile.parentName }} · {{ profile.courseName }}</p><p class="mt-3 text-sm text-slate-600 dark:text-slate-300">{{ getStudentPaymentAccess(profile.studentId).message }}</p></div><PaymentStatusBadge :status="getStudentPaymentAccess(profile.studentId).status" /></div><div class="mt-4 flex flex-wrap gap-2"><button type="button" class="focus-ring rounded-md border border-sky-300 px-3 py-2 text-xs font-bold text-sky-700 dark:border-sky-800 dark:text-sky-200" @click="reactivate(profile.studentId, profile.studentName)">{{ getStudentPaymentAccess(profile.studentId).status === 'Suspended' ? 'Reactivate Student' : 'Allow Temporary Access' }}</button><button v-if="getStudentPaymentAccess(profile.studentId).status !== 'Suspended'" type="button" class="focus-ring rounded-md border border-rose-300 px-3 py-2 text-xs font-bold text-rose-700 dark:border-rose-800 dark:text-rose-200" @click="suspend(profile.studentId, profile.studentName)">Suspend Student</button><a :href="`mailto:${profile.parentEmail}`" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700">Contact Parent</a></div></div><p v-if="!accessReviewProfiles.length" class="rounded-md bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-800">No overdue students need follow-up.</p></div></article>
    </div>

    <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><h2 class="text-xl font-black text-slate-950 dark:text-white">{{ fullControl ? 'All receipts' : 'Receipts' }}</h2><PaymentReceiptList class="mt-5" :receipts="receipts" @download="downloadReceiptPdf" /></article>

    <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><div class="flex items-end justify-between gap-4"><div><h2 class="text-xl font-black text-slate-950 dark:text-white">Payment notifications</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Payment submissions, overdue notices, suspensions, and reactivations.</p></div><span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold">{{ managerNotifications.length }} alerts</span></div><div class="mt-5 grid gap-4 lg:grid-cols-2"><div v-for="notification in managerNotifications" :key="notification.id" class="rounded-lg border border-slate-200 p-4 dark:border-slate-800"><div class="flex items-start justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ notification.type }}</p><h3 class="mt-2 font-bold">{{ notification.title }}</h3></div><span class="text-xs text-slate-500">{{ notification.createdAt }}</span></div><p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ notification.message }}</p></div><p v-if="!managerNotifications.length" class="rounded-md bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-800">No payment alerts.</p></div></article>

    <div v-if="selectedInvoice" class="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4" @click.self="selectedInvoice = null"><article class="w-full max-w-xl rounded-lg bg-white p-6 dark:bg-slate-900"><div class="flex justify-between gap-4"><div><p class="eyebrow">Invoice</p><h2 class="mt-2 text-2xl font-black">{{ selectedInvoice.id }}</h2></div><button type="button" class="focus-ring rounded-md border px-3 py-2 text-sm font-bold" @click="selectedInvoice = null">Close</button></div><dl class="mt-6 grid gap-4 sm:grid-cols-2"><div><dt class="text-sm text-slate-500">Parent</dt><dd class="font-bold">{{ selectedInvoice.parentName }}</dd></div><div><dt class="text-sm text-slate-500">Student</dt><dd class="font-bold">{{ selectedInvoice.studentName }}</dd></div><div><dt class="text-sm text-slate-500">Course</dt><dd class="font-bold">{{ selectedInvoice.courseName }}</dd></div><div><dt class="text-sm text-slate-500">Class type</dt><dd class="font-bold">{{ selectedInvoice.classType }}</dd></div><div><dt class="text-sm text-slate-500">Amount</dt><dd class="font-black">${{ selectedInvoice.amount }} USD</dd></div><div><dt class="text-sm text-slate-500">Dates</dt><dd class="font-bold">{{ selectedInvoice.invoiceDate }} / {{ selectedInvoice.dueDate }}</dd></div></dl><BaseButton class="mt-6" type="button" @click="downloadInvoicePdf(selectedInvoice)">Download PDF</BaseButton></article></div>

    <div v-if="manageInvoice" class="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4" @click.self="manageInvoice = null"><form class="max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 dark:bg-slate-900" @submit.prevent="confirmPayment"><h2 class="text-2xl font-black">Manage {{ manageInvoice.id }}</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Confirm <strong>${{ manageInvoice.amount }} USD</strong> received and generate the receipt.</p><div v-if="awaitingSubmission(manageInvoice.id)" class="mt-4 rounded-md bg-sky-50 p-3 text-sm text-sky-800 dark:bg-sky-950/40 dark:text-sky-200">The family submitted payment details on {{ awaitingSubmission(manageInvoice.id)?.submittedAt }}.</div><label class="mt-5 block text-sm font-bold" for="confirm-method">Payment method</label><select id="confirm-method" v-model="paymentMethod" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"><option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}</option></select><label class="mt-4 block text-sm font-bold" for="confirm-transaction">Transaction ID (optional)</label><input id="confirm-transaction" v-model="transactionId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" type="text"><div class="mt-6 grid gap-3 sm:grid-cols-2"><BaseButton type="submit" block>Mark Payment Received</BaseButton><BaseButton type="button" variant="outline" block @click="manageInvoice = null">Close</BaseButton><template v-if="fullControl"><button type="button" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold dark:border-slate-700" @click="updateSelectedInvoiceStatus('Draft')">Set Draft</button><button type="button" class="focus-ring rounded-md border border-amber-300 px-3 py-2 text-sm font-bold text-amber-700 dark:border-amber-800 dark:text-amber-200" @click="updateSelectedInvoiceStatus('Pending')">Set Pending</button><button type="button" class="focus-ring rounded-md border border-rose-300 px-3 py-2 text-sm font-bold text-rose-700 dark:border-rose-800 dark:text-rose-200" @click="updateSelectedInvoiceStatus('Overdue')">Mark Overdue</button><button type="button" class="focus-ring rounded-md border border-rose-300 px-3 py-2 text-sm font-bold text-rose-700 dark:border-rose-800 dark:text-rose-200" @click="cancelSelectedInvoice">Cancel Invoice</button></template></div></form></div>
  </div>
</template>
