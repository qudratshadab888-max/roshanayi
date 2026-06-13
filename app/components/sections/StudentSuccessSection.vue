<script setup lang="ts">
const { t, tm } = useI18n()
const milestones = computed(() => tm<string[]>('studentSuccess.milestones'))
</script>

<template>
  <section class="section-padding bg-white dark:bg-slate-950">
    <div class="container-wide grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <SectionHeading
          :eyebrow="t('studentSuccess.eyebrow')"
          :title="t('studentSuccess.title')"
          :description="t('studentSuccess.description')"
        />
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton to="/dashboard" variant="outline">{{ t('studentSuccess.dashboardButton') }}</BaseButton>
          <BaseButton to="/courses">{{ t('common.actions.findCourse') }}</BaseButton>
        </div>
      </div>

      <article class="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ t('studentSuccess.sampleLearner') }}</p>
            <h3 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ t('studentSuccess.learnerName') }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ t('studentSuccess.learnerDescription') }}</p>
          </div>
          <div class="rounded-lg bg-white p-4 text-center shadow-soft dark:bg-slate-950">
            <p class="text-3xl font-black text-brand-purple dark:text-brand-gold">72%</p>
            <p class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{{ t('studentSuccess.progressLabel') }}</p>
          </div>
        </div>

        <div class="mt-6 grid gap-3">
          <div v-for="milestone in milestones" :key="milestone" class="flex gap-3 rounded-md bg-white p-4 dark:bg-slate-950">
            <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold text-[10px] font-black text-slate-950">{{ t('studentSuccess.ok') }}</span>
            <span class="text-sm leading-6 text-slate-700 dark:text-slate-200">{{ milestone }}</span>
          </div>
        </div>

        <div class="mt-6 rounded-md bg-brand-purple p-5 text-white dark:bg-brand-purpleDark">
          <p class="text-sm font-semibold text-brand-gold">{{ t('studentSuccess.teacherNote') }}</p>
          <p class="mt-2 text-sm leading-7 text-purple-50">
            {{ t('studentSuccess.note') }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
