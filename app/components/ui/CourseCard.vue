<script setup lang="ts">
import type { Course } from '~/types'

defineProps<{
  course: Course
}>()

const { t } = useI18n()
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand-purple/30 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="border-b border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/80">
      <div class="flex items-center justify-between gap-3">
        <span :class="['rounded-full px-3 py-1 text-xs font-semibold ring-1', course.accentClass]">
          {{ course.category }}
        </span>
        <span class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ course.rating }}</span>
      </div>
      <h3 class="mt-5 text-xl font-bold text-slate-950 group-hover:text-brand-purple dark:text-white dark:group-hover:text-brand-gold">
        {{ course.title }}
      </h3>
      <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {{ course.summary }}
      </p>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <dl class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.level') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.level }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.age') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.ageGroup }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.duration') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.duration }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.lessons') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.lessons }}</dd>
        </div>
      </dl>

      <div class="mt-5 rounded-md bg-slate-50 p-4 dark:bg-slate-800/70">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ t('common.labels.keyBenefits') }}</p>
        <ul class="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <li v-for="benefit in course.benefits.slice(0, 2)" :key="benefit" class="flex gap-2">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
        <div>
          <p class="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{{ t('common.labels.from') }}</p>
          <p class="text-lg font-bold text-slate-950 dark:text-white">{{ course.price }}</p>
        </div>
        <BaseButton :to="`/courses/${course.slug}`" variant="outline" size="sm">{{ t('common.actions.viewCourse') }}</BaseButton>
      </div>
    </div>
  </article>
</template>
