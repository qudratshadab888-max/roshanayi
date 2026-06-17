<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

const { t } = useI18n()
const { courseCategories, courses } = useAcademyData()

useSeoMeta({
  title: () => t('seo.courses.title'),
  description: () => t('seo.courses.description')
})

const search = ref('')
const selectedCategory = ref('')
const isLoading = ref(false)

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
      [course.title, course.summary, course.category, course.level, course.description, ...course.benefits]
        .join(' ')
        .toLowerCase()
        .includes(query)

    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.courses"
      :eyebrow="t('coursesPage.eyebrow')"
      :title="t('coursesPage.title')"
      :description="t('coursesPage.description')"
    />

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide">
        <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
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

        <LoadingPanel v-if="isLoading" class="mt-8" :label="t('loading.courses')" />
        <div v-else-if="filteredCourses.length" class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CourseCard v-for="course in filteredCourses" :key="course.slug" :course="course" />
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
  </div>
</template>
