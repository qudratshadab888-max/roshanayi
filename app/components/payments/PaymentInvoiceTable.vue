<script setup lang="ts">
import type { PaymentInvoice } from '~/types'

withDefaults(defineProps<{
  invoices: PaymentInvoice[]
  showPay?: boolean
  showManage?: boolean
}>(), {
  showPay: false,
  showManage: false
})

defineEmits<{
  view: [invoice: PaymentInvoice]
  download: [invoice: PaymentInvoice]
  pay: [invoice: PaymentInvoice]
  manage: [invoice: PaymentInvoice]
}>()

const canPay = (invoice: PaymentInvoice) => ['Pending', 'Overdue'].includes(invoice.status)
</script>

<template>
  <div>
    <div class="hidden overflow-x-auto md:block">
      <table class="w-full min-w-[900px] text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            <th class="px-4 py-3 font-bold">Invoice</th>
            <th class="px-4 py-3 font-bold">Student</th>
            <th class="px-4 py-3 font-bold">Course / Class</th>
            <th class="px-4 py-3 font-bold">Amount</th>
            <th class="px-4 py-3 font-bold">Due Date</th>
            <th class="px-4 py-3 font-bold">Status</th>
            <th class="px-4 py-3 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td class="px-4 py-4 font-bold text-slate-950 dark:text-white">{{ invoice.id }}</td>
            <td class="px-4 py-4">{{ invoice.studentName }}</td>
            <td class="px-4 py-4"><span class="block font-semibold">{{ invoice.courseName }}</span><span class="text-xs text-slate-500">{{ invoice.classType }}</span></td>
            <td class="px-4 py-4 font-black">${{ invoice.amount }} {{ invoice.currency }}</td>
            <td class="px-4 py-4">{{ invoice.dueDate }}</td>
            <td class="px-4 py-4"><PaymentStatusBadge :status="invoice.status" /></td>
            <td class="px-4 py-4">
              <div class="flex flex-wrap gap-2">
                <button type="button" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700" @click="$emit('view', invoice)">View Invoice</button>
                <button type="button" class="focus-ring rounded-md border border-brand-purple px-3 py-2 text-xs font-bold text-brand-purple dark:border-brand-gold dark:text-brand-gold" @click="$emit('download', invoice)">Download PDF</button>
                <button v-if="showPay && canPay(invoice)" type="button" class="focus-ring rounded-md bg-brand-purple px-3 py-2 text-xs font-bold text-white" @click="$emit('pay', invoice)">Pay Now</button>
                <button v-if="showManage && invoice.status !== 'Paid' && invoice.status !== 'Cancelled'" type="button" class="focus-ring rounded-md bg-slate-900 px-3 py-2 text-xs font-bold text-white dark:bg-brand-gold dark:text-slate-950" @click="$emit('manage', invoice)">Manage</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="grid gap-4 md:hidden">
      <article v-for="invoice in invoices" :key="invoice.id" class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
        <div class="flex items-start justify-between gap-3">
          <div><p class="font-black text-slate-950 dark:text-white">{{ invoice.id }}</p><p class="mt-1 text-sm text-slate-500">{{ invoice.studentName }}</p></div>
          <PaymentStatusBadge :status="invoice.status" />
        </div>
        <p class="mt-4 font-semibold">{{ invoice.courseName }}</p>
        <p class="mt-1 text-sm text-slate-500">{{ invoice.classType }} · Due {{ invoice.dueDate }}</p>
        <p class="mt-4 text-2xl font-black text-brand-purple dark:text-brand-gold">${{ invoice.amount }} {{ invoice.currency }}</p>
        <div class="mt-4 grid grid-cols-2 gap-2">
          <button type="button" class="focus-ring rounded-md border border-slate-300 px-3 py-2 text-xs font-bold dark:border-slate-700" @click="$emit('view', invoice)">View Invoice</button>
          <button type="button" class="focus-ring rounded-md border border-brand-purple px-3 py-2 text-xs font-bold text-brand-purple dark:border-brand-gold dark:text-brand-gold" @click="$emit('download', invoice)">Download PDF</button>
          <button v-if="showPay && canPay(invoice)" type="button" class="focus-ring col-span-2 rounded-md bg-brand-purple px-3 py-2 text-xs font-bold text-white" @click="$emit('pay', invoice)">Pay Now</button>
          <button v-if="showManage && invoice.status !== 'Paid' && invoice.status !== 'Cancelled'" type="button" class="focus-ring col-span-2 rounded-md bg-slate-900 px-3 py-2 text-xs font-bold text-white dark:bg-brand-gold dark:text-slate-950" @click="$emit('manage', invoice)">Manage</button>
        </div>
      </article>
    </div>
    <p v-if="!invoices.length" class="rounded-md bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">No invoices found.</p>
  </div>
</template>
