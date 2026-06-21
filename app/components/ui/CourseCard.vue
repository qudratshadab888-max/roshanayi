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
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span :class="['rounded-full px-3 py-1 text-xs font-semibold ring-1', course.accentClass]">
          {{ course.category }}
        </span>
        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {{ course.ageGroup }}
        </span>
      </div>
      <p
        v-if="course.badge"
        class="mt-4 inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold dark:bg-brand-gold dark:text-slate-950"
      >
        {{ course.badge }}
      </p>
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
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.category') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.category }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.ageGroup') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.ageGroup }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.level') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.level }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">{{ t('common.labels.format') }}</dt>
          <dd class="mt-1 font-semibold text-slate-900 dark:text-white">{{ course.format }}</dd>
        </div>
      </dl>

      <div v-if="course.specialOnly" class="mt-5 rounded-md border border-slate-900 bg-slate-950 p-5 text-white dark:border-brand-gold dark:bg-slate-900">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">{{ course.specialClass.name }}</p>
        <p class="mt-3 text-4xl font-black text-white">
          {{ course.specialClass.price }}
        </p>
        <p class="mt-1 text-xs font-semibold text-slate-300">{{ t('common.labels.perMonth') }}</p>
        <p class="mt-3 text-sm leading-6 text-slate-200">{{ course.specialClass.size }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="item in course.specialClass.highlights.slice(0, 2)"
            :key="item"
            class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <div v-else class="mt-5 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
        <div class="grid divide-y divide-slate-200 dark:divide-slate-800 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div class="p-4">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">
              {{ course.groupClass.name }}
            </p>
            <p class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ course.groupClass.price }}</p>
            <p class="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('common.labels.perMonth') }}</p>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ course.groupClass.size }}</p>
          </div>
          <div class="p-4">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">
              {{ course.specialClass.name }}
            </p>
            <p class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ course.specialClass.price }}</p>
            <p class="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('common.labels.perMonth') }}</p>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ course.specialClass.size }}</p>
          </div>
        </div>
      </div>

      <div class="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row">
        <BaseButton :to="`/courses/${course.slug}`" variant="outline" size="sm" block>{{ t('common.actions.viewCourse') }}</BaseButton>
        <BaseButton to="/register" size="sm" block>{{ t('common.actions.startRegistration') }}</BaseButton>
      </div>
    </div>
  </article>
</template>
