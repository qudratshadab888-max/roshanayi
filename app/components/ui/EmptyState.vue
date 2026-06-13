<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    actionLabel?: string
    actionTo?: string
  }>(),
  {
    actionLabel: '',
    actionTo: ''
  }
)
</script>

<template>
  <div class="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-purple/10 text-lg font-black text-brand-purple dark:bg-brand-gold/10 dark:text-brand-gold">
      RA
    </div>
    <h2 class="mt-4 text-xl font-bold text-slate-950 dark:text-white">{{ title }}</h2>
    <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">{{ description }}</p>
    <BaseButton v-if="actionTo && actionLabel" :to="actionTo" class="mt-6">{{ actionLabel }}</BaseButton>
  </div>
</template>
