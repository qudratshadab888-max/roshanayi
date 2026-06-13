<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { courses, teachers } = useAcademyData()
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

const teacher = computed(() => teachers.value.find((item) => item.slug === course.value.teacherSlug))
const relatedCourses = computed(() =>
  courses.value
    .filter((item) => item.slug !== course.value.slug)
    .slice(0, 2)
)

useSeoMeta({
  title: () => course.value.title,
  description: () => course.value.description,
  ogTitle: () => `${course.value.title} | ${t('common.brand.name')}`,
  ogDescription: () => course.value.summary
})
</script>

<template>
  <div>
    <section class="bg-slate-950 py-20 text-white">
      <div class="container-wide grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ course.category }}</p>
          <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{{ course.title }}</h1>
          <p class="mt-6 text-lg leading-8 text-slate-200">{{ course.description }}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton to="/register" variant="secondary" size="lg">{{ t('courseDetails.register') }}</BaseButton>
            <BaseButton to="/contact" variant="light" size="lg">{{ t('courseDetails.askPlacement') }}</BaseButton>
          </div>
        </div>

        <aside class="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur">
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
              <dt class="text-slate-300">{{ t('common.labels.duration') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.duration }}</dd>
            </div>
            <div>
              <dt class="text-slate-300">{{ t('common.labels.lessons') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.lessons }}</dd>
            </div>
            <div>
              <dt class="text-slate-300">{{ t('common.labels.format') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.format }}</dd>
            </div>
            <div>
              <dt class="text-slate-300">{{ t('common.labels.tuition') }}</dt>
              <dd class="mt-1 font-bold text-white">{{ course.price }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <SectionHeading
            :eyebrow="t('courseDetails.eyebrow')"
            :title="t('courseDetails.learnTitle')"
            :description="course.summary"
          />
          <div class="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ t('courseDetails.parentGuidance') }}</p>
            <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ course.parentNote }}</p>
          </div>
          <div v-if="teacher" class="mt-8">
            <TeacherCard :teacher="teacher" />
          </div>
          <EmptyState
            v-else
            class="mt-8"
            :title="t('courseDetails.teacherPendingTitle')"
            :description="t('courseDetails.teacherPendingDescription')"
          />
        </div>

        <div class="grid gap-6">
          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.familyBenefits') }}</h2>
            <ul class="mt-5 grid gap-3">
              <li v-for="benefit in course.benefits" :key="benefit" class="flex gap-3 text-slate-700 dark:text-slate-200">
                <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </article>

          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.outcomes') }}</h2>
            <ul class="mt-5 grid gap-3">
              <li v-for="outcome in course.outcomes" :key="outcome" class="flex gap-3 text-slate-700 dark:text-slate-200">
                <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
                <span>{{ outcome }}</span>
              </li>
            </ul>
          </article>

          <article class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('courseDetails.syllabus') }}</h2>
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
        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <CourseCard v-for="item in relatedCourses" :key="item.slug" :course="item" />
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
