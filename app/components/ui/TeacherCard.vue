<script setup lang="ts">
import type { Teacher } from '~/types'

defineProps<{
  teacher: Teacher
}>()

const { t } = useI18n()
</script>

<template>
  <article class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand-purple/30 dark:border-slate-800 dark:bg-slate-900">
    <div class="bg-slate-50 p-6 dark:bg-slate-900/70">
      <div class="flex items-start gap-4">
        <div :class="['flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-lg text-lg font-bold ring-1 ring-white/70', teacher.avatarClass]">
          <span>{{ teacher.initials }}</span>
          <span class="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">{{ t('common.labels.photo') }}</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-slate-950 dark:text-white">{{ teacher.name }}</h3>
          <p class="mt-1 font-medium text-brand-purple dark:text-brand-gold">{{ teacher.role }}</p>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {{ teacher.location }} | {{ teacher.experience }}
          </p>
        </div>
      </div>
    </div>

    <div class="p-6">
      <dl class="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt class="font-semibold text-slate-950 dark:text-white">{{ t('common.labels.specialization') }}</dt>
          <dd class="mt-1 text-slate-600 dark:text-slate-300">{{ teacher.specialty }}</dd>
        </div>
        <div>
          <dt class="font-semibold text-slate-950 dark:text-white">{{ t('common.labels.credentials') }}</dt>
          <dd class="mt-1 text-slate-600 dark:text-slate-300">{{ teacher.credentials }}</dd>
        </div>
      </dl>
      <p class="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ teacher.bio }}</p>
      <div class="mt-5 rounded-md bg-slate-50 p-4 dark:bg-slate-800/70">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ t('common.labels.teachingApproach') }}</p>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ teacher.approach }}</p>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="language in teacher.languages"
          :key="language"
          class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {{ language }}
        </span>
      </div>
    </div>
  </article>
</template>
