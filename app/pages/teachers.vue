<script setup lang="ts">
const { t, tm } = useI18n()
const { teachers } = useAcademyData()

useSeoMeta({
  title: () => t('seo.teachers.title'),
  description: () => t('seo.teachers.description')
})

const standards = computed(() => tm<string[]>('teachersPage.standards.items'))
</script>

<template>
  <div>
    <section class="bg-slate-950 py-20 text-white">
      <div class="container-wide max-w-4xl">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ t('teachersPage.eyebrow') }}</p>
        <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{{ t('teachersPage.title') }}</h1>
        <p class="mt-6 text-lg leading-8 text-slate-200">
          {{ t('teachersPage.description') }}
        </p>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-6 md:grid-cols-2">
        <TeacherCard v-for="teacher in teachers" :key="teacher.slug" :teacher="teacher" />
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          :eyebrow="t('teachersPage.standards.eyebrow')"
          :title="t('teachersPage.standards.title')"
          :description="t('teachersPage.standards.description')"
        />
        <div class="grid gap-4 sm:grid-cols-2">
          <div v-for="standard in standards" :key="standard" class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="block h-2 w-12 rounded-full bg-brand-gold" />
            <p class="mt-4 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-100">{{ standard }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
