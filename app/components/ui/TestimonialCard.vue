<script setup lang="ts">
import type { Testimonial } from '~/types'

defineProps<{
  testimonial: Testimonial
}>()
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <p class="text-base leading-8 text-slate-700 dark:text-slate-200">"{{ testimonial.quote }}"</p>
    <div class="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
      <p class="font-bold text-slate-950 dark:text-white">{{ testimonial.name }}</p>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ testimonial.location }}</p>
      <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ testimonial.result }}</p>
    </div>
  </article>
</template>
