<script setup lang="ts">
import type { PaymentReceipt } from '~/types'

defineProps<{ receipts: PaymentReceipt[] }>()
defineEmits<{ download: [receipt: PaymentReceipt] }>()
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <article v-for="receipt in receipts" :key="receipt.id" class="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div><p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">Receipt</p><h3 class="mt-2 font-black text-slate-950 dark:text-white">{{ receipt.id }}</h3></div>
        <PaymentStatusBadge status="Paid" />
      </div>
      <dl class="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div><dt class="text-slate-500">Invoice</dt><dd class="mt-1 font-semibold">{{ receipt.invoiceId }}</dd></div>
        <div><dt class="text-slate-500">Parent</dt><dd class="mt-1 font-semibold">{{ receipt.parentName }}</dd></div>
        <div><dt class="text-slate-500">Student</dt><dd class="mt-1 font-semibold">{{ receipt.studentName }}</dd></div>
        <div><dt class="text-slate-500">Amount</dt><dd class="mt-1 font-black">${{ receipt.amountPaid }} {{ receipt.currency }}</dd></div>
        <div class="col-span-2"><dt class="text-slate-500">Course</dt><dd class="mt-1 font-semibold">{{ receipt.courseName }}</dd></div>
        <div><dt class="text-slate-500">Date</dt><dd class="mt-1 font-semibold">{{ receipt.paymentDate }}</dd></div>
        <div><dt class="text-slate-500">Method</dt><dd class="mt-1 font-semibold">{{ receipt.paymentMethod }}</dd></div>
        <div class="col-span-2"><dt class="text-slate-500">Transaction ID</dt><dd class="mt-1 font-semibold">{{ receipt.transactionId || 'Not provided' }}</dd></div>
        <div class="col-span-2"><dt class="text-slate-500">Received by</dt><dd class="mt-1 font-semibold">{{ receipt.receivedBy }}</dd></div>
      </dl>
      <button type="button" class="focus-ring mt-5 w-full rounded-md border border-brand-purple px-4 py-3 text-sm font-bold text-brand-purple dark:border-brand-gold dark:text-brand-gold" @click="$emit('download', receipt)">Download Receipt PDF</button>
    </article>
    <p v-if="!receipts.length" class="rounded-md bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">No receipts are available yet.</p>
  </div>
</template>
