<script setup lang="ts">
const props = defineProps<{ status: string }>()

const tone = computed(() => ({
  Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  Draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  Overdue: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
  Suspended: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
  Cancelled: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  Trial: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
  'Temporary Access': 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
  'Payment Required': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  'Needs Follow-up': 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200'
}[props.status] ?? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'))
</script>

<template>
  <span :class="['inline-flex rounded-full px-3 py-1 text-xs font-bold', tone]">{{ status }}</span>
</template>
