<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

const { t, tm } = useI18n()
const { courseCategories, courseCategorySections, courses } = useAcademyData()

useSeoMeta({
  title: () => t('seo.courses.title'),
  description: () => t('seo.courses.description')
})

const search = ref('')
const selectedCategory = ref('')

const allCategory = computed(() => courseCategories.value[0] ?? 'All')

watch(allCategory, (value) => {
  selectedCategory.value = value
}, { immediate: true })

const filteredCourses = computed(() => {
  const query = search.value.trim().toLowerCase()

  return courses.value.filter((course) => {
    const matchesCategory = selectedCategory.value === allCategory.value || course.category === selectedCategory.value
    const matchesSearch =
      !query ||
      [
        course.title,
        course.summary,
        course.category,
        course.level,
        course.ageGroup,
        course.description,
        course.teachingMethod,
        course.languageOfInstruction,
        course.targetStudents,
        course.badge,
        ...course.benefits,
        ...course.learningObjectives,
        ...course.whatStudentsWillLearn,
        ...(course.premiumHighlights ?? [])
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)

    return matchesCategory && matchesSearch
  })
})

const visibleCategorySections = computed(() =>
  courseCategorySections.value
    .map((section) => ({
      ...section,
      courses: filteredCourses.value.filter((course) => course.categoryKey === section.key)
    }))
    .filter((section) => section.courses.length > 0)
)

const enrollmentCopy = computed(() => tm<Record<string, string>>('coursesPage.enrollment'))
const enrollmentHighlights = computed(() => [
  { value: '$30', label: enrollmentCopy.value.groupLabel, detail: enrollmentCopy.value.groupDetail },
  { value: '$100', label: enrollmentCopy.value.specialLabel, detail: enrollmentCopy.value.specialDetail },
  { value: '$150', label: enrollmentCopy.value.premiumLabel, detail: enrollmentCopy.value.premiumDetail },
  { value: '2', label: enrollmentCopy.value.trialLabel, detail: enrollmentCopy.value.trialDetail }
])
const premiumProgramHighlights = computed(() => tm<string[]>('coursesPage.premiumHighlights'))
const parentTrustItems = computed(() => tm<Array<{ title: string; text: string }>>('coursesPage.trustItems'))
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.courses"
      :eyebrow="t('coursesPage.eyebrow')"
      :title="t('coursesPage.title')"
      :description="t('coursesPage.description')"
      height="tall"
    >
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <BaseButton to="/register" variant="secondary" size="lg">{{ t('coursesPage.registerNow') }}</BaseButton>
        <BaseButton to="#course-catalog" variant="light" size="lg">{{ t('coursesPage.viewCourses') }}</BaseButton>
      </div>

      <template #aside>
        <aside class="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p class="text-sm font-semibold uppercase text-brand-gold">{{ t('coursesPage.enrollmentOptions') }}</p>
          <div class="mt-5 grid gap-4">
            <div v-for="item in enrollmentHighlights" :key="item.label" class="border-b border-white/10 pb-4 last:border-0 last:pb-0">
              <p class="text-3xl font-black text-white">{{ item.value }}</p>
              <p class="mt-1 text-sm font-bold text-brand-gold">{{ item.label }}</p>
              <p class="mt-1 text-sm leading-6 text-slate-200">{{ item.detail }}</p>
            </div>
          </div>
        </aside>
      </template>
    </PageHero>

    <section id="course-catalog" class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide">
        <div class="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <SectionHeading
            :eyebrow="t('coursesPage.catalogEyebrow')"
            :title="t('coursesPage.catalogTitle')"
            :description="t('coursesPage.catalogDescription')"
          />
          <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div v-for="item in enrollmentHighlights" :key="item.label" class="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ item.value }}</p>
              <p class="mt-1 text-sm font-bold text-slate-950 dark:text-white">{{ item.label }}</p>
              <p class="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{{ item.detail }}</p>
            </div>
          </div>
        </div>

        <div class="mt-10 rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label class="sr-only" for="course-search">{{ t('coursesPage.searchLabel') }}</label>
            <input
              id="course-search"
              v-model="search"
              type="search"
              :placeholder="t('coursesPage.searchPlaceholder')"
              class="focus-ring min-h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in courseCategories"
                :key="category"
                type="button"
                :class="[
                  'focus-ring rounded-full px-4 py-2 text-sm font-semibold transition',
                  selectedCategory === category
                    ? 'bg-brand-purple text-white dark:bg-brand-gold dark:text-slate-950'
                    : 'bg-slate-100 text-slate-700 hover:text-brand-purple dark:bg-slate-800 dark:text-slate-200 dark:hover:text-brand-gold'
                ]"
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 flex items-center justify-between gap-4">
          <p class="text-sm font-semibold text-slate-600 dark:text-slate-300">
            {{ t('coursesPage.showing', { shown: filteredCourses.length, total: courses.length }) }}
          </p>
          <NuxtLink to="/register" class="focus-ring rounded-md text-sm font-semibold text-brand-purple hover:text-brand-purpleDark dark:text-brand-gold">
            {{ t('coursesPage.placementHelp') }}
          </NuxtLink>
        </div>

        <div v-if="visibleCategorySections.length" class="mt-10 grid gap-14">
          <section v-for="section in visibleCategorySections" :id="section.key" :key="section.key">
            <div class="flex flex-col gap-5 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
              <div class="max-w-3xl">
                <span :class="['inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ring-1', section.accentClass]">
                  {{ section.title }}
                </span>
                <h2 class="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {{ section.title }}
                </h2>
                <p class="mt-3 text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {{ section.description }}
                </p>
              </div>
              <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {{ t('coursesPage.courseCount', { count: section.courses.length }) }}
              </p>
            </div>
            <div
              v-if="section.key === 'premium'"
              class="mt-8 rounded-lg border border-slate-900 bg-slate-950 p-6 text-white shadow-lift dark:border-brand-gold dark:bg-slate-900"
            >
              <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p class="inline-flex rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-950">
                    {{ t('coursesPage.premiumEyebrow') }}
                  </p>
                  <h3 class="mt-4 text-2xl font-black text-white">$150</h3>
                  <p class="mt-1 text-xs font-semibold text-slate-300">{{ t('common.labels.perMonth') }}</p>
                  <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
                    {{ t('coursesPage.premiumDescription') }}
                  </p>
                </div>
                <BaseButton to="/register" variant="secondary">{{ t('coursesPage.registerNow') }}</BaseButton>
              </div>
              <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <span
                  v-for="item in premiumProgramHighlights"
                  :key="item"
                  class="rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100"
                >
                  {{ item }}
                </span>
              </div>
            </div>
            <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <CourseCard v-for="course in section.courses" :key="course.slug" :course="course" />
            </div>
          </section>
        </div>
        <EmptyState
          v-else
          class="mt-8"
          :title="t('coursesPage.emptyTitle')"
          :description="t('coursesPage.emptyDescription')"
          :action-label="t('common.actions.getPlacementHelp')"
          action-to="/register"
        />
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <SectionHeading
            :eyebrow="t('coursesPage.parentTrustEyebrow')"
            :title="t('coursesPage.parentTrustTitle')"
            :description="t('coursesPage.parentTrustDescription')"
          />
          <div class="mt-8 rounded-lg bg-slate-950 p-6 text-white dark:bg-slate-900">
            <p class="text-sm font-semibold uppercase text-brand-gold">{{ t('coursesPage.trialPolicy') }}</p>
            <p class="mt-4 text-lg font-bold">{{ t('coursesPage.trialTitle') }}</p>
            <p class="mt-3 leading-7 text-slate-200">
              {{ t('coursesPage.trialText') }}
            </p>
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="item in parentTrustItems"
            :key="item.title"
            class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 class="text-lg font-bold text-slate-950 dark:text-white">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
