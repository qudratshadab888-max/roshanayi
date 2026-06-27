<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

const { t, tm } = useI18n()
const { teachers } = useAcademyData()
const { publicTeacherProfiles } = useTeacherApplications()
const allTeachers = computed(() => [...teachers.value, ...publicTeacherProfiles.value])
const teacherApplicationPath = '/apply-teacher#teacher-application-form'

useSeoMeta({
  title: () => t('seo.teachers.title'),
  description: () => t('seo.teachers.description')
})

const standards = computed(() => tm<string[]>('teachersPage.standards.items'))
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.teachers"
      :eyebrow="t('teachersPage.eyebrow')"
      :title="t('teachersPage.title')"
      :description="t('teachersPage.description')"
    />

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-6 md:grid-cols-2">
        <TeacherCard v-for="teacher in allTeachers" :key="teacher.slug" :teacher="teacher" />
      </div>
      <div class="container-wide mt-10 rounded-lg border border-purple-200 bg-purple-50 p-6 text-center dark:border-purple-900 dark:bg-purple-950/40">
        <h2 class="text-2xl font-black text-slate-950 dark:text-white">Interested in teaching with Roshanayi?</h2>
        <p class="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">Submit your experience, availability, public profile details, and qualifications for academy review.</p>
        <NuxtLink
          :to="teacherApplicationPath"
          custom
          v-slot="{ href, navigate }"
        >
          <a
            :href="href ?? teacherApplicationPath"
            class="focus-ring mt-5 inline-flex items-center justify-center rounded-md bg-brand-purple px-5 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-brand-purpleDark dark:bg-brand-gold dark:text-slate-950 dark:hover:bg-amber-300"
            @click="navigate"
          >
            Apply as a Teacher
          </a>
        </NuxtLink>
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
