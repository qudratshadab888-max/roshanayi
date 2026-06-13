<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()

const { t } = useI18n()
const displayLabel = computed(() => props.label || t('loading.academyContent'))
</script>

<template>
  <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" role="status" aria-live="polite">
    <div class="flex items-center gap-3">
      <span class="h-5 w-5 animate-spin rounded-full border-2 border-brand-purple border-t-transparent dark:border-brand-gold dark:border-t-transparent" aria-hidden="true" />
      <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ displayLabel }}</span>
    </div>
    <div class="mt-5 grid gap-3">
      <div class="h-3 rounded-full bg-slate-100 dark:bg-slate-800" />
      <div class="h-3 w-4/5 rounded-full bg-slate-100 dark:bg-slate-800" />
      <div class="h-3 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
    </div>
  </div>
</template>
