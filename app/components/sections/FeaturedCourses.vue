<script setup lang="ts">
const { t } = useI18n()
const { featuredCourses } = useAcademyData()
</script>

<template>
  <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
    <div class="container-wide">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          :eyebrow="t('featuredCourses.eyebrow')"
          :title="t('featuredCourses.title')"
          :description="t('featuredCourses.description')"
        />
        <BaseButton to="/courses" variant="outline">{{ t('common.actions.viewAllCourses') }}</BaseButton>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CourseCard v-for="course in featuredCourses" :key="course.slug" :course="course" />
      </div>
    </div>
  </section>
</template>
