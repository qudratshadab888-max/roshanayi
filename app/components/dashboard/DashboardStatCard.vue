<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  detail?: string
  tone?: 'purple' | 'emerald' | 'amber' | 'sky' | 'rose' | 'slate'
}>()

const toneClasses = {
  purple: 'text-brand-purple dark:text-brand-gold',
  emerald: 'text-emerald-700 dark:text-emerald-300',
  amber: 'text-amber-700 dark:text-amber-300',
  sky: 'text-sky-700 dark:text-sky-300',
  rose: 'text-rose-700 dark:text-rose-300',
  slate: 'text-slate-900 dark:text-white'
}
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ label }}</p>
    <p :class="['mt-2 text-3xl font-black', toneClasses[tone ?? 'purple']]">{{ value }}</p>
    <p v-if="detail" class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ detail }}</p>
  </article>
</template>
