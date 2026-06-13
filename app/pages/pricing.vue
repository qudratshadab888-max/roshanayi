<script setup lang="ts">
const { t, tm } = useI18n()
const { faqs } = useAcademyData()

useSeoMeta({
  title: () => t('seo.pricing.title'),
  description: () => t('seo.pricing.description')
})

const plans = computed(
  () =>
    tm<
      Array<{
        name: string
        price: string
        period: string
        description: string
        features: string[]
        highlighted: boolean
      }>
    >('pricing.plans')
)

const included = computed(() => tm<string[]>('pricing.included.items'))
</script>

<template>
  <div>
    <section class="bg-slate-950 py-20 text-white">
      <div class="container-wide max-w-4xl text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ t('pricing.eyebrow') }}</p>
        <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{{ t('pricing.title') }}</h1>
        <p class="mt-6 text-lg leading-8 text-slate-200">
          {{ t('pricing.description') }}
        </p>
      </div>
    </section>

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-6 lg:grid-cols-3">
        <article
          v-for="plan in plans"
          :key="plan.name"
          :class="[
            'rounded-lg border p-6 shadow-soft',
            plan.highlighted
              ? 'border-brand-purple bg-brand-purple text-white dark:border-brand-gold'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
          ]"
        >
          <p :class="['text-sm font-semibold uppercase tracking-[0.16em]', plan.highlighted ? 'text-brand-gold' : 'text-brand-purple dark:text-brand-gold']">
            {{ plan.name }}
          </p>
          <div class="mt-4 flex items-end gap-1">
            <span class="text-4xl font-black">{{ plan.price }}</span>
            <span :class="plan.highlighted ? 'text-purple-100' : 'text-slate-500 dark:text-slate-400'">{{ plan.period }}</span>
          </div>
          <p :class="['mt-4 leading-7', plan.highlighted ? 'text-purple-100' : 'text-slate-600 dark:text-slate-300']">
            {{ plan.description }}
          </p>
          <ul class="mt-6 space-y-3">
            <li v-for="feature in plan.features" :key="feature" class="flex gap-3 text-sm">
              <span :class="['mt-1.5 h-2 w-2 rounded-full', plan.highlighted ? 'bg-brand-gold' : 'bg-brand-purple dark:bg-brand-gold']" />
              <span>{{ feature }}</span>
            </li>
          </ul>
          <BaseButton
            to="/register"
            :variant="plan.highlighted ? 'secondary' : 'primary'"
            block
            class="mt-8"
          >
            {{ t('pricing.startWith', { plan: plan.name }) }}
          </BaseButton>
        </article>
      </div>
    </section>

    <section class="bg-slate-50 py-12 dark:bg-slate-900/50">
      <div class="container-wide grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p class="eyebrow">{{ t('pricing.included.eyebrow') }}</p>
          <h2 class="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{{ t('pricing.included.title') }}</h2>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div v-for="item in included" :key="item" class="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            {{ item }}
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          :eyebrow="t('pricing.faq.eyebrow')"
          :title="t('pricing.faq.title')"
          :description="t('pricing.faq.description')"
        />
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <CtaSection />
  </div>
</template>
