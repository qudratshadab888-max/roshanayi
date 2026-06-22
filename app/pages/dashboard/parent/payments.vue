<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { academyPaymentPlans, paymentMethods } from '~/data/paymentPlans'
import type { ManualPaymentMethod, PaymentInvoice } from '~/types'
import { downloadInvoicePdf, downloadReceiptPdf } from '~/utils/paymentPdf'

useSeoMeta({ title: 'Family Payments', description: 'View family invoices, receipts, payment status, and payment history.' })

const { currentUser, syncUser } = useRoleAuth()
const { gateways } = usePaymentGateways()
const {
  initialize, paymentProfiles, getInvoicesForParent, getReceiptsForParent, getStudentPaymentAccess, submitPayment
} = usePaymentSystem()
const parentId = computed(() => currentUser.value?.profileId ?? 'parent-farzana')
const invoices = computed(() => getInvoicesForParent(parentId.value).sort((a, b) => b.invoiceDate.localeCompare(a.invoiceDate)))
const receipts = computed(() => getReceiptsForParent(parentId.value).sort((a, b) => b.paymentDate.localeCompare(a.paymentDate)))
const children = computed(() => paymentProfiles.value.filter((profile) => profile.parentId === parentId.value))
const selectedInvoice = ref<PaymentInvoice | null>(null)
const payInvoice = ref<PaymentInvoice | null>(null)
const paymentMethod = ref<ManualPaymentMethod>('Bank Transfer')
const transactionId = ref('')
const notice = ref('')

const outstanding = computed(() => invoices.value.filter((invoice) => ['Pending', 'Overdue'].includes(invoice.status)))
const paidTotal = computed(() => receipts.value.reduce((total, receipt) => total + receipt.amountPaid, 0))
const stats = computed(() => [
  { label: 'Children', value: children.value.length, detail: 'Linked family profiles', tone: 'purple' as const },
  { label: 'Outstanding', value: outstanding.value.length, detail: 'Pending or overdue invoices', tone: outstanding.value.length ? 'amber' as const : 'emerald' as const },
  { label: 'Receipts', value: receipts.value.length, detail: 'Confirmed payments', tone: 'sky' as const },
  { label: 'Paid history', value: `$${paidTotal.value}`, detail: 'USD received', tone: 'emerald' as const }
])

onMounted(() => {
  syncUser()
  initialize()
})

const openPay = (invoice: PaymentInvoice) => {
  payInvoice.value = invoice
  paymentMethod.value = 'Bank Transfer'
  transactionId.value = ''
  notice.value = ''
}

const sendPaymentDetails = () => {
  if (!payInvoice.value) return
  submitPayment(payInvoice.value.id, paymentMethod.value, transactionId.value)
  notice.value = 'Payment details submitted. A Manager will confirm the payment and generate your receipt.'
  payInvoice.value = null
}
</script>

<template>
  <div>
    <PageHero :image="pageBackgrounds.dashboard" eyebrow="Parent Payments" title="Family billing and receipts" description="Review every child’s payment status, invoices, receipts, and 30-day enrollment dates from one family account." height="compact">
      <template #aside><div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur"><p class="text-sm font-semibold text-brand-gold">Monthly plans</p><p class="mt-2 text-2xl font-black">$30 · $100 · $150</p><p class="mt-2 text-sm text-slate-200">All payments are billed in USD.</p></div></template>
    </PageHero>

    <section class="bg-white py-8 dark:bg-slate-950"><div class="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><DashboardStatCard v-for="stat in stats" :key="stat.label" v-bind="stat" /></div></section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-8">
        <div class="flex flex-wrap gap-3"><BaseButton to="/dashboard/parent" variant="outline">Back to Parent Dashboard</BaseButton></div>
        <p v-if="notice" class="rounded-md bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200" role="status">{{ notice }}</p>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-xl font-black text-slate-950 dark:text-white">Children payment status</h2>
          <div class="mt-5 grid gap-4 lg:grid-cols-2">
            <div v-for="child in children" :key="child.studentId" class="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
              <div class="flex items-start justify-between gap-3"><div><h3 class="font-black text-slate-950 dark:text-white">{{ child.studentName }}</h3><p class="mt-1 text-sm text-slate-500">{{ child.courseName }} · {{ child.classType }}</p></div><PaymentStatusBadge :status="getStudentPaymentAccess(child.studentId).status" /></div>
              <div class="mt-4 grid grid-cols-2 gap-3 text-sm"><p class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">Monthly fee<br><strong>${{ child.amount }} USD</strong></p><p class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">Next due<br><strong>{{ getStudentPaymentAccess(child.studentId).nextDueDate || 'Not set' }}</strong></p></div>
              <p class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ getStudentPaymentAccess(child.studentId).message }}</p>
            </div>
          </div>
        </article>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div><h2 class="text-xl font-black text-slate-950 dark:text-white">Invoices</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Pay Now records your selected manual payment method for academy confirmation.</p></div>
          <PaymentInvoiceTable class="mt-5" :invoices="invoices" show-pay @view="selectedInvoice = $event" @download="downloadInvoicePdf" @pay="openPay" />
        </article>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><h2 class="text-xl font-black text-slate-950 dark:text-white">Receipts and payment history</h2><PaymentReceiptList class="mt-5" :receipts="receipts" @download="downloadReceiptPdf" /></article>

        <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"><h2 class="text-xl font-black text-slate-950 dark:text-white">Academy payment plans</h2><div class="mt-5 grid gap-4 lg:grid-cols-3"><div v-for="plan in academyPaymentPlans" :key="plan.classType" class="rounded-lg border border-slate-200 p-5 dark:border-slate-800"><h3 class="font-black">{{ plan.classType }}</h3><p class="mt-3 text-3xl font-black text-brand-purple dark:text-brand-gold">${{ plan.price }}<span class="text-sm text-slate-500"> USD/month</span></p><p class="mt-3 text-sm font-semibold">{{ plan.capacity }}</p><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ plan.description }}</p></div></div><div class="mt-6 grid gap-3 sm:grid-cols-2"><div v-for="gateway in gateways" :key="gateway.id" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800"><div class="flex items-center justify-between gap-3"><p class="font-bold">{{ gateway.label }} gateway</p><PaymentStatusBadge :status="gateway.checkoutEnabled ? 'Active' : 'Placeholder'" /></div><p class="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ gateway.message }}</p></div></div></article>
      </div>
    </section>

    <div v-if="selectedInvoice" class="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4" @click.self="selectedInvoice = null"><article class="max-h-[90vh] w-full max-w-xl overflow-auto rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900"><div class="flex items-start justify-between gap-4"><div><p class="eyebrow">Invoice</p><h2 class="mt-2 text-2xl font-black">{{ selectedInvoice.id }}</h2></div><button type="button" class="focus-ring rounded-md border px-3 py-2 text-sm font-bold" @click="selectedInvoice = null">Close</button></div><dl class="mt-6 grid gap-4 sm:grid-cols-2"><div><dt class="text-sm text-slate-500">Parent</dt><dd class="font-bold">{{ selectedInvoice.parentName }}</dd></div><div><dt class="text-sm text-slate-500">Student</dt><dd class="font-bold">{{ selectedInvoice.studentName }}</dd></div><div><dt class="text-sm text-slate-500">Course</dt><dd class="font-bold">{{ selectedInvoice.courseName }}</dd></div><div><dt class="text-sm text-slate-500">Class type</dt><dd class="font-bold">{{ selectedInvoice.classType }}</dd></div><div><dt class="text-sm text-slate-500">Invoice / Due</dt><dd class="font-bold">{{ selectedInvoice.invoiceDate }} / {{ selectedInvoice.dueDate }}</dd></div><div><dt class="text-sm text-slate-500">Amount</dt><dd class="font-black">${{ selectedInvoice.amount }} {{ selectedInvoice.currency }}</dd></div></dl><div class="mt-6 flex gap-3"><BaseButton type="button" @click="downloadInvoicePdf(selectedInvoice)">Download PDF</BaseButton><BaseButton v-if="['Pending', 'Overdue'].includes(selectedInvoice.status)" type="button" variant="outline" @click="openPay(selectedInvoice); selectedInvoice = null">Pay Now</BaseButton></div></article></div>

    <div v-if="payInvoice" class="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4" @click.self="payInvoice = null"><form class="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl dark:bg-slate-900" @submit.prevent="sendPaymentDetails"><h2 class="text-2xl font-black">Pay {{ payInvoice.id }}</h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Amount: <strong>${{ payInvoice.amount }} USD</strong>. Online Stripe and PayPal checkout will be connected later; for now, submit a manual payment reference.</p><label class="mt-5 block text-sm font-bold" for="parent-payment-method">Payment method</label><select id="parent-payment-method" v-model="paymentMethod" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950"><option v-for="method in paymentMethods" :key="method" :value="method">{{ method }}{{ method === 'Stripe' ? ' (placeholder)' : '' }}</option></select><label class="mt-4 block text-sm font-bold" for="parent-transaction">Transaction ID (optional)</label><input id="parent-transaction" v-model="transactionId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" type="text"><div class="mt-6 grid grid-cols-2 gap-3"><BaseButton type="submit" block>Submit Payment Details</BaseButton><BaseButton type="button" variant="outline" block @click="payInvoice = null">Cancel</BaseButton></div></form></div>
  </div>
</template>
