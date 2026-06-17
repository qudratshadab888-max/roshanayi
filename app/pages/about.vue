<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

const { t, tm } = useI18n()

useSeoMeta({
  title: () => t('seo.about.title'),
  description: () => t('seo.about.description')
})

const values = computed(() => tm<Array<{ title: string; text: string }>>('about.values'))
const principles = computed(() => tm<string[]>('about.principles'))
const heritagePoints = computed(() => tm<Array<{ title: string; text: string }>>('about.heritage.points'))
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.about"
      :eyebrow="t('about.eyebrow')"
      :title="t('about.title')"
      :description="t('about.description')"
      height="tall"
    />

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-6 lg:grid-cols-3">
        <article v-for="item in values" :key="item.title" class="rounded-lg border border-slate-200 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ item.title }}</h2>
          <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionHeading
            :eyebrow="t('about.teach.eyebrow')"
            :title="t('about.teach.title')"
            :description="t('about.teach.description')"
          />
          <ul class="mt-8 grid gap-4">
            <li v-for="principle in principles" :key="principle" class="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span class="mt-1 h-3 w-3 shrink-0 rounded-full bg-brand-gold" />
              <span class="text-slate-700 dark:text-slate-200">{{ principle }}</span>
            </li>
          </ul>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ t('about.promise.eyebrow') }}</p>
          <blockquote class="mt-4 text-2xl font-bold leading-10 text-slate-950 dark:text-white">
            {{ t('about.promise.quote') }}
          </blockquote>
          <p class="mt-6 leading-7 text-slate-600 dark:text-slate-300">
            {{ t('about.promise.text') }}
          </p>
        </div>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide">
        <SectionHeading
          align="center"
          :eyebrow="t('about.heritage.eyebrow')"
          :title="t('about.heritage.title')"
          :description="t('about.heritage.description')"
        />
        <div class="mt-10 grid gap-6 lg:grid-cols-3">
          <article v-for="point in heritagePoints" :key="point.title" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ point.title }}</h2>
            <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{{ point.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
