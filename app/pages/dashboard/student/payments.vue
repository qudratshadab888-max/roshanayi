<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { paymentMethods } from '~/data/paymentPlans'
import type { ManualPaymentMethod, PaymentInvoice } from '~/types'
import { downloadInvoicePdf, downloadReceiptPdf } from '~/utils/paymentPdf'

useSeoMeta({ title: 'Student Payments', description: 'Student payment, due date, receipt, and classroom access status.' })

const { currentUser, syncUser } = useRoleAuth()
const { initialize, paymentProfiles, getInvoicesForStudent, getReceiptsForStudent, getStudentPaymentAccess, submitPayment } = usePaymentSystem()
const studentId = computed(() => currentUser.value?.profileId ?? 'student-amina')
const profile = computed(() => paymentProfiles.value.find((item) => item.studentId === studentId.value))
const invoices = computed(() => getInvoicesForStudent(studentId.value).sort((a, b) => b.invoiceDate.localeCompare(a.invoiceDate)))
const receipts = computed(() => getReceiptsForStudent(studentId.value).sort((a, b) => b.paymentDate.localeCompare(a.paymentDate)))
const access = computed(() => getStudentPaymentAccess(studentId.value))
const selectedInvoice = ref<PaymentInvoice | null>(null)
const payInvoice = ref<PaymentInvoice | null>(null)
const paymentMethod = ref<ManualPaymentMethod>('Bank Transfer')
const transactionId = ref('')
const notice = ref('')

onMounted(() => { syncUser(); initialize() })

const sendPaymentDetails = () => {
  if (!payInvoice.value) return
  submitPayment(payInvoice.value.id, paymentMethod.value, transactionId.value)
  notice.value = 'Payment details sent for Manager confirmation. Your receipt will appear after confirmation.'
  payInvoice.value = null
}
</script>

<template>
  <div>
    <PageHero :image="pageBackgrounds.dashboard" eyebrow="Student Payments" title="Payment and access status" description="See your monthly fee, invoices, receipts, next due date, and live classroom access status." height="compact">
      <template #aside><div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur"><p class="text-sm font-semibold text-brand-gold">Current access</p><div class="mt-3"><PaymentStatusBadge :status="access.status" /></div><p class="mt-3 text-sm leading-6 text-slate-200">{{ access.message }}</p></div></template>
    </PageHero>

    <section class="bg-white py-8 dark:bg-slate-950"><div class="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><DashboardStatCard label="Payment status" :value="access.invoiceStatus" detail="Latest invoice" :tone="access.invoiceStatus === 'Paid' ? 'emerald' : access.invoiceStatus === 'Overdue' ? 'rose' : 'amber'" /><DashboardStatCard label="Next due date" :value="access.nextDueDate || 'Not set'" detail="30-day billing cycle" tone="sky" /><DashboardStatCard label="Access status" :value="access.status" detail="Live classroom access" :tone="access.canAccess ? 'emerald' : 'rose'" /><DashboardStatCard label="Monthly plan" :value="profile ? `$${profile.amount}` : '$0'" :detail="profile?.classType ?? 'Not assigned'" tone="purple" /></div></section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50"><div class="container-wide grid gap-8">
      <BaseButton to="/dashboard/student" variant="outline" class="justify-self-start">Back to Student Dashboard</BaseButton>
      <p v-if="notice" class="rounded-md bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">{{ notice }}</p>
      <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h2 class="text-xl font-black text-slate-950 dark:text-white">Enrollment access</h2><p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ access.message }}</p></div><PaymentStatusBadge :status="access.status" /></div><div class="mt-5 grid gap-4 sm:grid-cols-3"><div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800"><p class="text-xs font-bold uppercase text-slate-500">Course</p><p class="mt-2 font-bold">{{ profile?.courseName ?? 'Course assignment pending' }}</p></div><div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800"><p class="text-xs font-bold uppercase text-slate-500">Class type</p><p class="mt-2 font-bold">{{ profile?.classType ?? 'Not assigned' }}</p></div><div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800"><p class="text-xs font-bold uppercase text-slate-500">Next due</p><p class="mt-2 font-bold">{{ access.nextDueDate || 'Not set' }}</p></div></div></article>
      <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><h2 class="text-xl font-black text-slate-950 dark:text-white">My invoices</h2><PaymentInvoiceTable class="mt-5" :invoices="invoices" show-pay @view="selectedInvoice = $event" @download="downloadInvoicePdf" @pay="payInvoice = $event" /></article>
      <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><h2 class="text-xl font-black text-slate-950 dark:text-white">My receipts</h2><PaymentReceiptList class="mt-5" :receipts="receipts" @download="downloadReceiptPdf" /></article>
    </div></section>

    <div v-if="selectedInvoice" class="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4" @click.self="selectedInvoice = null"><article class="w-full max-w-xl rounded-lg bg-white p-6 dark:bg-slate-900"><div class="flex justify-between gap-4"><div><p class="eyebrow">Invoice</p><h2 class="mt-2 text-2xl font-black">{{ selectedInvoice.id }}</h2></div><button type="button" class="focus-ring rounded-md border px-3 py-2 text-sm font-bold" @click="selectedInvoice = null">Close</button></div><dl class="mt-6 grid gap-4 sm:grid-cols-2"><div><dt class="text-sm text-slate-500">Student</dt><dd class="font-bold">{{ selectedInvoice.studentName }}</dd></div><div><dt class="text-sm text-slate-500">Course</dt><dd class="font-bold">{{ selectedInvoice.courseName }}</dd></div><div><dt class="text-sm text-slate-500">Class</dt><dd class="font-bold">{{ selectedInvoice.classType }}</dd></div><div><dt class="text-sm text-slate-500">Amount</dt><dd class="font-black">${{ selectedInvoice.amount }} USD</dd></div><div><dt class="text-sm text-slate-500">Invoice date</dt><dd class="font-bold">{{ selectedInvoice.invoiceDate }}</dd></div><div><dt class="text-sm text-slate-500">Due date</dt><dd class="font-bold">{{ selectedInvoice.dueDate }}</dd></div></dl><BaseButton class="mt-6" type="button" @click="downloadInvoicePdf(selectedInvoice)">Download PDF</BaseButton></article></div>

    <div v-if="payInvoice" class="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4" @click.self="payInvoice = null"><form class="w-full max-w-lg rounded-lg bg-white p-6 dark:bg-slate-900" @submit.prevent="sendPaymentDetails"><h2 class="text-2xl font-black">Pay {{ payInvoice.id }}</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Submit manual payment details for <strong>${{ payInvoice.amount }} USD</strong>. Stripe and PayPal are placeholders until gateway keys are configured.</p><label class="mt-5 block text-sm font-bold" for="student-payment-method">Payment method</label><select id="student-payment-method" v-model="paymentMethod" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"><option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}{{ method === 'Stripe' ? ' (placeholder)' : '' }}</option></select><label class="mt-4 block text-sm font-bold" for="student-transaction">Transaction ID (optional)</label><input id="student-transaction" v-model="transactionId" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"><div class="mt-6 grid grid-cols-2 gap-3"><BaseButton type="submit" block>Submit Details</BaseButton><BaseButton type="button" variant="outline" block @click="payInvoice = null">Cancel</BaseButton></div></form></div>
  </div>
</template>
