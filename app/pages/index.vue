<script setup lang="ts">
import { getHomeLandingCopy } from '~/data/homeLanding'

const { isRtl, locale } = useI18n()

const home = computed(() => getHomeLandingCopy(locale.value))
const whatsappUrl = computed(
  () => `https://wa.me/10000000000?text=${encodeURIComponent(home.value.whatsappMessage)}`
)
const heroStyle = computed(() => ({
  backgroundImage: `${
    isRtl.value
      ? 'linear-gradient(270deg, rgba(15, 23, 42, 0.96) 0%, rgba(76, 29, 149, 0.86) 46%, rgba(15, 23, 42, 0.24) 100%)'
      : 'linear-gradient(90deg, rgba(15, 23, 42, 0.96) 0%, rgba(76, 29, 149, 0.86) 46%, rgba(15, 23, 42, 0.24) 100%)'
  }, url('/images/hero-roshanayi-academy.png')`
}))

useSeoMeta({
  title: () => home.value.seo.title,
  ogTitle: () => home.value.seo.ogTitle,
  description: () => home.value.seo.description,
  ogDescription: () => home.value.seo.ogDescription
})
</script>

<template>
  <div>
    <section
      :class="[
        'relative isolate overflow-hidden bg-slate-950 bg-cover text-white',
        isRtl ? 'bg-[center_left_30%]' : 'bg-[center_right_35%]'
      ]"
      :style="heroStyle"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/60" aria-hidden="true" />
      <div
        :class="[
          'container-wide relative grid min-h-[700px] items-center gap-10 py-16 sm:py-20',
          isRtl
            ? 'lg:grid-cols-[minmax(280px,0.42fr)_minmax(0,1fr)]'
            : 'lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)]'
        ]"
        dir="ltr"
      >
        <div
          :class="[
            'max-w-4xl',
            isRtl ? 'lg:col-start-2 lg:row-start-1 lg:justify-self-end' : 'lg:col-start-1'
          ]"
          :dir="isRtl ? 'rtl' : 'ltr'"
        >
          <p class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-gold backdrop-blur">
            {{ home.hero.eyebrow }}
          </p>
          <h1 class="mt-6 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {{ home.hero.title }}
          </h1>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
            {{ home.hero.description }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton to="/register" variant="secondary" size="lg">{{ home.hero.primaryAction }}</BaseButton>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="focus-ring inline-flex items-center justify-center rounded-md bg-white px-6 py-4 text-base font-semibold text-brand-purple transition hover:bg-brand-gold hover:text-slate-950"
            >
              {{ home.hero.secondaryAction }}
            </a>
          </div>

          <div class="mt-10 flex max-w-4xl flex-wrap gap-3">
            <span
              v-for="badge in home.hero.badges"
              :key="badge"
              class="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur"
            >
              {{ badge }}
            </span>
          </div>
        </div>

        <aside
          :class="[
            'hidden rounded-lg border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md lg:block',
            isRtl ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'
          ]"
          :dir="isRtl ? 'rtl' : 'ltr'"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ home.dashboard.eyebrow }}</p>
          <h2 class="mt-3 text-2xl font-black">{{ home.dashboard.profileName }}</h2>
          <div class="mt-5 grid gap-3">
            <div
              v-for="card in home.dashboard.cards.slice(0, 3)"
              :key="card.title"
              class="rounded-md bg-white/10 p-4"
            >
              <p class="text-xs font-bold uppercase tracking-[0.12em] text-slate-300">{{ card.title }}</p>
              <p class="mt-2 font-bold text-brand-gold">{{ card.value }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-200">{{ card.text }}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section id="home-trust" class="section-padding scroll-mt-28 bg-white dark:bg-slate-950">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="home.trust.eyebrow"
          :title="home.trust.title"
          :description="home.trust.description"
          align="center"
        />

        <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="(item, index) in home.trust.reasons"
            :key="item.title"
            class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-purple text-lg font-black text-white dark:bg-brand-gold dark:text-slate-950">
              {{ index + 1 }}
            </div>
            <h3 class="mt-5 text-xl font-bold text-slate-950 dark:text-white">{{ item.title }}</h3>
            <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="home-registration" class="section-padding scroll-mt-28 bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionHeading
          :eyebrow="home.registration.eyebrow"
          :title="home.registration.title"
          :description="home.registration.description"
        />

        <ol class="grid gap-4">
          <li
            v-for="(step, index) in home.registration.steps"
            :key="step"
            class="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[auto_1fr] sm:items-center"
          >
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple text-lg font-black text-white dark:bg-brand-gold dark:text-slate-950">
              {{ index + 1 }}
            </span>
            <span class="text-lg font-bold text-slate-950 dark:text-white">{{ step }}</span>
          </li>
        </ol>
      </div>
    </section>

    <section id="home-safety" class="section-padding scroll-mt-28 bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p class="eyebrow">{{ home.safety.eyebrow }}</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {{ home.safety.title }}
          </h2>
          <p class="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {{ home.safety.description }}
          </p>
          <div class="mt-8 grid gap-3">
            <div
              v-for="rule in home.safety.rules"
              :key="rule"
              class="flex items-start gap-3 rounded-lg bg-purple-50 p-4 text-brand-purple dark:bg-purple-950/40 dark:text-purple-100"
            >
              <span class="mt-0.5 font-black text-brand-gold">-</span>
              <span class="font-semibold">{{ rule }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-soft dark:border-slate-800">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ home.safety.cardEyebrow }}</p>
          <h3 class="mt-4 text-2xl font-bold">{{ home.safety.cardTitle }}</h3>
          <p class="mt-4 leading-7 text-slate-200">
            {{ home.safety.cardDescription }}
          </p>
          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <div v-for="metric in home.safety.metrics" :key="metric.label" class="rounded-md bg-white/10 p-4">
              <p class="text-2xl font-black text-brand-gold">{{ metric.value }}</p>
              <p class="mt-1 text-sm text-slate-200">{{ metric.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="home-programs" class="section-padding scroll-mt-28 bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="home.programs.eyebrow"
          :title="home.programs.title"
          :description="home.programs.description"
          align="center"
        />

        <div class="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="program in home.programs.items"
            :key="program.title"
            class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ home.programs.itemEyebrow }}</p>
            <h3 class="mt-3 text-lg font-bold text-slate-950 dark:text-white">{{ program.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ program.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="home-dashboard" class="section-padding scroll-mt-28 bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          :eyebrow="home.dashboard.eyebrow"
          :title="home.dashboard.title"
          :description="home.dashboard.description"
        />

        <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div class="flex flex-col gap-3 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ home.dashboard.profileLabel }}</p>
              <h3 class="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{{ home.dashboard.profileName }}</h3>
            </div>
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">{{ home.dashboard.activeLabel }}</span>
          </div>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <article
              v-for="card in home.dashboard.cards"
              :key="card.title"
              class="rounded-lg bg-slate-50 p-4 dark:bg-slate-800"
            >
              <p class="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{{ card.title }}</p>
              <p class="mt-2 font-bold text-brand-purple dark:text-brand-gold">{{ card.value }}</p>
              <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ card.text }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="home-testimonials" class="section-padding scroll-mt-28 bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="home.testimonials.eyebrow"
          :title="home.testimonials.title"
          :description="home.testimonials.description"
          align="center"
        />

        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <TestimonialCard
            v-for="testimonial in home.testimonials.items"
            :key="testimonial.name"
            :testimonial="testimonial"
          />
        </div>
      </div>
    </section>

    <section id="home-faq" class="section-padding scroll-mt-28 bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          :eyebrow="home.faq.eyebrow"
          :title="home.faq.title"
          :description="home.faq.description"
        />
        <FaqAccordion :items="home.faq.items" />
      </div>
    </section>

    <section id="home-cta" class="scroll-mt-28 bg-slate-950 py-16 text-white">
      <div class="container-wide grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ home.cta.eyebrow }}</p>
          <h2 class="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{{ home.cta.title }}</h2>
          <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
            {{ home.cta.description }}
          </p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <BaseButton to="/register" variant="secondary" size="lg">{{ home.cta.primaryAction }}</BaseButton>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="focus-ring inline-flex items-center justify-center rounded-md bg-white px-6 py-4 text-base font-semibold text-brand-purple transition hover:bg-brand-gold hover:text-slate-950"
          >
            {{ home.cta.secondaryAction }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
