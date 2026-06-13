<script setup lang="ts">
const { t, tm } = useI18n()
const cards = computed(
  () => tm<Array<{ value: string; title: string; text: string }>>('academyIntro.cards')
)
</script>

<template>
  <section class="section-padding bg-white dark:bg-slate-950">
    <div class="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <SectionHeading
        :eyebrow="t('academyIntro.eyebrow')"
        :title="t('academyIntro.title')"
        :description="t('academyIntro.description')"
      />

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="(card, index) in cards"
          :key="card.title"
          :class="[
            'rounded-lg border border-slate-200 p-6 dark:border-slate-800',
            index === cards.length - 1 ? 'sm:col-span-2' : ''
          ]"
        >
          <p class="text-3xl font-black text-brand-purple dark:text-brand-gold">{{ card.value }}</p>
          <h3 class="mt-3 font-bold text-slate-950 dark:text-white">{{ card.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {{ card.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
