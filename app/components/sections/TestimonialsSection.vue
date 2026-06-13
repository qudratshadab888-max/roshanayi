<script setup lang="ts">
const { t } = useI18n()
const { testimonials } = useAcademyData()
</script>

<template>
  <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
    <div class="container-wide">
      <SectionHeading
        align="center"
        :eyebrow="t('testimonials.eyebrow')"
        :title="t('testimonials.title')"
        :description="t('testimonials.description')"
      />
      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        <TestimonialCard v-for="testimonial in testimonials" :key="testimonial.name" :testimonial="testimonial" />
      </div>
    </div>
  </section>
</template>
