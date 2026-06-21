<script setup lang="ts">
import { courseBackgrounds, pageBackgrounds } from '~/data/pageBackgrounds'

const route = useRoute()
const { t } = useI18n()
const { courses } = useAcademyData()
const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam
const selectedCourse = computed(() => courses.value.find((item) => item.slug === slug))

if (!selectedCourse.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('courseDetails.notFound')
  })
}

const course = computed(() => {
  if (!selectedCourse.value) {
    throw createError({
      statusCode: 404,
      statusMessage: t('courseDetails.notFound')
    })
  }

  return selectedCourse.value
})

const heroImage = computed(() => courseBackgrounds[course.value.slug] ?? pageBackgrounds.courses)
const relatedCourses = computed(() => {
  const sameCategory = courses.value.filter(
    (item) => item.slug !== course.value.slug && item.categoryKey === course.value.categoryKey
  )
  const otherCourses = courses.value.filter(
    (item) => item.slug !== course.value.slug && item.categoryKey !== course.value.categoryKey
  )

  return [...sameCategory, ...otherCourses].slice(0, 3)
})

const trustCards = computed(() => [
  {
    title: t('courseDetails.progressReport'),
    text: course.value.monthlyProgressReport
  },
  {
    title: t('courseDetails.completionCertificate'),
    text: course.value.certificate
  },
  {
    title: t('courseDetails.trialInformation'),
    text: course.value.trialClassInfo
  }
])

useSeoMeta({
  title: () => course.value.title,
  description: () => course.value.description,
  ogTitle: () => `${course.value.title} | ${t('common.brand.name')}`,
  ogDescription: () => course.value.summary
})
</script>

<template>
  <div>
    <PageHero
      :image="heroImage"
      :eyebrow="course.category"
      :title="course.title"
      :description="course.description"
      height="tall"
    >
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <BaseButton to="/register" variant="secondary" size="lg">{{ t('common.actions.startRegistration') }}</BaseButton>
        <BaseButton to="/contact" variant="light" size="lg">{{ t('courseDetails.askPlacement') }}</BaseButton>
      </div>

      <template #aside>
        <aside class="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p
            v-if="course.badge"
            class="mb-5 inline-flex rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-950"
          >
            {{ course.badge }}
          </p>
          <dl class="grid grid-cols-2 gap-5 text-sm">
            <div>
              <dt class="text-slate-300">{{ t('common.labels.level') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.level }}</dd>
            </div>
            <div>
              <dt class="text-slate-300">{{ t('common.labels.ageGroup') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.ageGroup }}</dd>
            </div>
            <div>
              <dt class="text-slate-300">{{ t('common.labels.format') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.format }}</dd>
            </div>
            <div>
              <dt class="text-slate-300">{{ t('common.labels.duration') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.duration }}</dd>
            </div>
            <div v-if="course.languageOfInstruction">
              <dt class="text-slate-300">{{ t('common.labels.instruction') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.languageOfInstruction }}</dd>
            </div>
          </dl>

          <div class="mt-6 grid gap-3 border-t border-white/10 pt-6">
            <div v-if="!course.specialOnly" class="rounded-md bg-white/10 p-4">
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">{{ course.groupClass.name }}</p>
              <p class="mt-2 text-3xl font-black text-white">{{ course.groupClass.price }}</p>
              <p class="mt-1 text-sm text-slate-200">{{ t('common.labels.perMonth') }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-200">{{ course.groupClass.size }}</p>
            </div>
            <div class="rounded-md bg-white/10 p-4">
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">{{ course.specialClass.name }}</p>
              <p class="mt-2 text-3xl font-black text-white">
                {{ course.specialClass.price }}
              </p>
              <p class="mt-1 text-sm text-slate-200">{{ t('common.labels.perMonth') }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-200">{{ course.specialClass.size }}</p>
            </div>
          </div>
        </aside>
      </template>
    </PageHero>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div class="lg:sticky lg:top-24">
          <SectionHeading :eyebrow="t('courseDetails.eyebrow')" :title="t('courseDetails.pathTitle')" :description="course.summary" />

          <article class="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.ageTitle') }}</h2>
            <p class="mt-3 text-2xl font-black text-brand-purple dark:text-brand-gold">{{ course.ageGroup }}</p>
            <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ course.parentNote }}</p>
          </article>

          <article
            v-if="course.languageOfInstruction || course.targetStudents"
            class="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.programFitTitle') }}</h2>
            <dl class="mt-5 grid gap-4 text-sm">
              <div v-if="course.languageOfInstruction">
                <dt class="font-semibold text-slate-500 dark:text-slate-400">{{ t('courseDetails.instruction') }}</dt>
                <dd class="mt-1 font-bold text-slate-950 dark:text-white">{{ course.languageOfInstruction }}</dd>
              </div>
              <div v-if="course.targetStudents">
                <dt class="font-semibold text-slate-500 dark:text-slate-400">{{ t('courseDetails.targetStudents') }}</dt>
                <dd class="mt-1 leading-6 text-slate-700 dark:text-slate-200">{{ course.targetStudents }}</dd>
              </div>
            </dl>
          </article>

          <article class="mt-6 rounded-lg bg-slate-950 p-6 text-white dark:bg-slate-900">
            <p class="text-sm font-semibold uppercase text-brand-gold">{{ t('courseDetails.trialPolicy') }}</p>
            <p class="mt-4 text-lg font-bold">2-day trial class before payment</p>
            <p class="mt-3 text-sm leading-7 text-slate-200">
              After the trial period, enrollment and payment are required to continue.
            </p>
          </article>
        </div>

        <div class="grid gap-6">
          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.overview') }}</h2>
            <p class="mt-4 leading-8 text-slate-600 dark:text-slate-300">{{ course.description }}</p>
          </article>

          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.objectives') }}</h2>
            <ul class="mt-5 grid gap-3">
              <li v-for="objective in course.learningObjectives" :key="objective" class="flex gap-3 text-slate-700 dark:text-slate-200">
                <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                <span>{{ objective }}</span>
              </li>
            </ul>
          </article>

          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.studentLearning') }}</h2>
            <ul class="mt-5 grid gap-3 sm:grid-cols-2">
              <li v-for="item in course.whatStudentsWillLearn" :key="item" class="flex gap-3 rounded-md bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>

          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.teachingMethod') }}</h2>
            <p class="mt-4 leading-8 text-slate-600 dark:text-slate-300">{{ course.teachingMethod }}</p>
          </article>

          <article
            v-if="course.premiumHighlights?.length"
            class="rounded-lg border border-slate-900 bg-slate-950 p-6 text-white dark:border-brand-gold dark:bg-slate-900"
          >
            <p class="inline-flex rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-950">
              {{ course.badge }}
            </p>
            <h2 class="mt-4 text-2xl font-black text-white">$150/month</h2>
            <p class="mt-3 leading-7 text-slate-200">
              {{ t('courseDetails.premiumDescription') }}
            </p>
            <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <span
                v-for="item in course.premiumHighlights"
                :key="item"
                class="rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100"
              >
                {{ item }}
              </span>
            </div>
          </article>

          <div v-if="course.specialOnly" class="grid gap-6">
            <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.specialOnlyTitle') }}</h2>
              <p class="mt-4 text-4xl font-black text-brand-purple dark:text-brand-gold">{{ course.specialClass.price }}</p>
              <p class="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{{ t('courseDetails.monthlyTuition') }}</p>
              <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">{{ course.specialClass.summary }}</p>
              <ul class="mt-5 grid gap-3">
                <li v-for="item in course.specialClass.highlights" :key="item" class="flex gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </article>
          </div>
          <div v-else class="grid gap-6 md:grid-cols-2">
            <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.groupClassTitle') }}</h2>
              <p class="mt-4 text-4xl font-black text-brand-purple dark:text-brand-gold">{{ course.groupClass.price }}</p>
              <p class="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{{ t('common.labels.perMonth') }}</p>
              <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">{{ course.groupClass.summary }}</p>
              <ul class="mt-5 grid gap-3">
                <li v-for="item in course.groupClass.highlights" :key="item" class="flex gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </article>

            <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.specialClassTitle') }}</h2>
              <p class="mt-4 text-4xl font-black text-brand-purple dark:text-brand-gold">{{ course.specialClass.price }}</p>
              <p class="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{{ t('common.labels.perMonth') }}</p>
              <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">{{ course.specialClass.summary }}</p>
              <ul class="mt-5 grid gap-3">
                <li v-for="item in course.specialClass.highlights" :key="item" class="flex gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </article>
          </div>

          <div class="grid gap-6 md:grid-cols-3">
            <article
              v-for="card in trustCards"
              :key="card.title"
              class="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 class="text-lg font-bold text-slate-950 dark:text-white">{{ card.title }}</h2>
              <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ card.text }}</p>
            </article>
          </div>

          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.learningPath') }}</h2>
            <ol class="mt-5 grid gap-3">
              <li v-for="(item, index) in course.syllabus" :key="item" class="flex gap-4">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-purple text-sm font-bold text-white dark:bg-brand-gold dark:text-slate-950">
                  {{ index + 1 }}
                </span>
                <span class="pt-1 text-slate-700 dark:text-slate-200">{{ item }}</span>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </section>

    <section v-if="relatedCourses.length" class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <SectionHeading :eyebrow="t('courseDetails.relatedEyebrow')" :title="t('courseDetails.relatedTitle')" />
        <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <CourseCard v-for="item in relatedCourses" :key="item.slug" :course="item" />
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
