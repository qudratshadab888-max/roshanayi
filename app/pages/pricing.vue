<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

useSeoMeta({
  title: 'Library & Resource Center',
  description:
    'Explore Roshanayi Academy audio books, PDF books, parent resources, and learning marketplace resources for families and students.'
})

const libraryStats = [
  { value: '24+', label: 'Audio lessons', detail: 'Stories, recitation practice, and language listening' },
  { value: '40+', label: 'PDF books', detail: 'Printable readers, worksheets, and parent guides' },
  { value: '3', label: 'Resource tracks', detail: 'Library, parent center, and learning marketplace' }
]

const audioBooks = [
  {
    title: 'Dari Story Circle',
    category: 'Audio Book',
    level: 'Ages 6-12',
    duration: '32 min',
    description:
      'Short family stories with slow narration for children building Dari listening confidence.',
    accent: 'bg-purple-50 text-brand-purple dark:bg-purple-950/40 dark:text-purple-100'
  },
  {
    title: 'Pashto Listening Warmups',
    category: 'Audio Book',
    level: 'Beginner',
    duration: '26 min',
    description:
      'Everyday greetings, family phrases, and pronunciation patterns for repeat practice.',
    accent: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-100'
  },
  {
    title: 'Quran Reading Practice',
    category: 'Audio Guide',
    level: 'Foundations',
    duration: '41 min',
    description:
      'Gentle listening drills that help students review sounds before live teacher correction.',
    accent: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100'
  }
]

const pdfBooks = [
  {
    title: 'Dari Alphabet Workbook',
    type: 'PDF Book',
    pages: '48 pages',
    description: 'Tracing, reading, and simple sentence practice for early Dari learners.'
  },
  {
    title: 'Parent Practice Planner',
    type: 'PDF Guide',
    pages: '22 pages',
    description: 'A weekly home routine for busy families supporting language and Quran practice.'
  },
  {
    title: 'Afghan Heritage Project Kit',
    type: 'PDF Book',
    pages: '36 pages',
    description: 'Creative prompts for family history, culture, poetry, geography, and presentation work.'
  }
]

const parentResources = [
  {
    title: 'Placement Checklist',
    label: 'Before enrollment',
    text: 'Questions that help parents choose the right course, level, schedule, and teacher support.'
  },
  {
    title: 'Home Practice Routines',
    label: 'Weekly support',
    text: 'Simple routines for reading, listening, vocabulary review, Quran fluency, and parent feedback.'
  },
  {
    title: 'Progress Conversation Guide',
    label: 'Monthly review',
    text: 'A clear structure for discussing confidence, homework, attendance, and next learning goals.'
  },
  {
    title: 'Safety & Access Notes',
    label: 'Family account help',
    text: 'Parent-friendly guidance for live class links, student dashboards, and payment access rules.'
  }
]

const marketplaceSteps = [
  'Add useful courses, books, and learning items that support students beyond live classes.',
  'Share approved resource links with families through a clear academy partner workflow.',
  'Review monthly resource activity when families choose recommended learning items.'
]

const partnerCards = [
  { value: '10%', label: 'Starter referral reward', detail: 'For approved community partners' },
  { value: '15%', label: 'Growth partner tier', detail: 'For consistent verified referrals' },
  { value: 'Monthly', label: 'Partner report', detail: 'Registrations, status, and payout notes' }
]
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.pricing"
      eyebrow="Library"
      title="Digital Library & Resource Center"
      description="A professional learning hub for audio books, PDF books, parent support, and marketplace resources connected to Roshanayi Academy."
      height="tall"
    >
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <BaseButton to="#library" variant="secondary" size="lg">Explore library</BaseButton>
        <BaseButton to="#learning-marketplace" variant="light" size="lg">Learning Marketplace</BaseButton>
      </div>

      <template #aside>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">Resource Tracks</p>
          <div class="mt-5 grid gap-3">
            <a
              v-for="item in ['Library', 'Parent Resource Center', 'Learning Marketplace']"
              :key="item"
              :href="`#${item.toLowerCase().replaceAll(' ', '-')}`"
              class="focus-ring rounded-md bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              {{ item }}
            </a>
          </div>
          <div class="mt-5 grid gap-3 border-t border-white/10 pt-5">
            <div v-for="stat in libraryStats" :key="stat.label">
              <p class="text-2xl font-black text-brand-gold">{{ stat.value }}</p>
              <p class="text-sm font-semibold text-slate-100">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section id="library" class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Library"
          title="Audio books and PDF books in one organized learning shelf."
          description="Students can listen, review, and print practice material that supports live classes without overwhelming families."
          align="center"
        />

        <div class="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div class="grid gap-5">
            <article
              v-for="book in audioBooks"
              :key="book.title"
              class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', book.accent]">{{ book.category }}</span>
                  <h3 class="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{{ book.title }}</h3>
                  <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">{{ book.description }}</p>
                </div>
                <div class="shrink-0 rounded-lg bg-slate-950 p-4 text-white dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">{{ book.duration }}</p>
                  <div class="mt-4 flex h-12 items-end gap-1" aria-hidden="true">
                    <span
                      v-for="height in [28, 42, 20, 48, 34, 44, 24, 38, 18, 32]"
                      :key="height"
                      class="w-1.5 rounded-full bg-brand-gold"
                      :style="{ height: `${height}px` }"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-5 flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ book.level }}</span>
                <BaseButton variant="outline" size="sm">Listen preview</BaseButton>
              </div>
            </article>
          </div>

          <div class="grid gap-5">
            <article
              v-for="book in pdfBooks"
              :key="book.title"
              class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
                <div class="flex h-28 w-24 items-center justify-center rounded-md bg-brand-purple text-3xl font-black text-brand-gold shadow-lift dark:bg-brand-gold dark:text-slate-950">
                  PDF
                </div>
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ book.type }}</p>
                  <h3 class="mt-3 text-xl font-bold text-slate-950 dark:text-white">{{ book.title }}</h3>
                  <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ book.description }}</p>
                  <div class="mt-4 flex flex-wrap items-center gap-3">
                    <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ book.pages }}</span>
                    <BaseButton variant="outline" size="sm">Download PDF</BaseButton>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="parent-resource-center" class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionHeading
          eyebrow="Parent Resource Center"
          title="Clear support for parents between live classes."
          description="Practical guides help families understand placement, practice routines, progress, and safe access to the learning dashboard."
        />

        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="resource in parentResources"
            :key="resource.title"
            class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ resource.label }}</p>
            <h3 class="mt-3 text-xl font-bold text-slate-950 dark:text-white">{{ resource.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ resource.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="learning-marketplace" class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Learning Marketplace"
              title="Recommended courses, books, and student resources."
              description="Academy partners can share useful learning items with families while Roshanayi keeps the recommendations organized and student-focused."
            />
            <ol class="mt-8 grid gap-4">
              <li
                v-for="(step, index) in marketplaceSteps"
                :key="step"
                class="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[auto_1fr] sm:items-center"
              >
                <span class="flex h-11 w-11 items-center justify-center rounded-md bg-brand-purple text-lg font-black text-white dark:bg-brand-gold dark:text-slate-950">
                  {{ index + 1 }}
                </span>
                <span class="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">{{ step }}</span>
              </li>
            </ol>
          </div>

          <div class="grid gap-5">
            <article
              v-for="card in partnerCards"
              :key="card.label"
              class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <p class="text-3xl font-black text-brand-purple dark:text-brand-gold">{{ card.value }}</p>
              <h3 class="mt-2 text-xl font-bold text-slate-950 dark:text-white">{{ card.label }}</h3>
              <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ card.detail }}</p>
            </article>
            <div class="rounded-lg bg-slate-950 p-6 text-white">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">Partner Code Preview</p>
              <p class="mt-4 rounded-md bg-white/10 p-4 text-2xl font-black tracking-[0.18em] text-brand-gold">ROSHANAYI-PARTNER</p>
              <p class="mt-4 text-sm leading-6 text-slate-200">
                Marketplace resources can include approved messages, resource links, campaign notes, and monthly reporting.
              </p>
              <div class="mt-5 flex flex-col gap-3 sm:flex-row">
                <BaseButton to="/contact" variant="secondary">Apply as partner</BaseButton>
                <BaseButton to="/register" variant="light">Refer a family</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
