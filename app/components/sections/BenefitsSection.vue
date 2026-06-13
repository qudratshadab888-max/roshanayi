<script setup lang="ts">
const { t, tm } = useI18n()
const benefits = computed(() => tm<Array<{ title: string; text: string }>>('benefits.items'))
</script>

<template>
  <section class="section-padding bg-white dark:bg-slate-950">
    <div class="container-wide">
      <SectionHeading
        align="center"
        :eyebrow="t('benefits.eyebrow')"
        :title="t('benefits.title')"
        :description="t('benefits.description')"
      />
      <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-md bg-brand-purple text-sm font-black text-white dark:bg-brand-gold dark:text-slate-950">
            {{ index + 1 }}
          </div>
          <h3 class="mt-5 text-lg font-bold text-slate-950 dark:text-white">{{ benefit.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ benefit.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
