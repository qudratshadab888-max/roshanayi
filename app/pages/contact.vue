<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

const { t } = useI18n()
const { courseCategories } = useAcademyData()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description')
})

const submitted = ref(false)
const isSubmitting = ref(false)
const courseOptions = computed(() => [
  ...courseCategories.value.slice(1),
  t('common.categories.notSure')
])

const submitForm = () => {
  isSubmitting.value = true
  submitted.value = false

  window.setTimeout(() => {
    isSubmitting.value = false
    submitted.value = true
  }, 700)
}
</script>

<template>
  <div>
    <PageHero
      :image="pageBackgrounds.contact"
      :eyebrow="t('contact.eyebrow')"
      :title="t('contact.title')"
      :description="t('contact.description')"
    />

    <section class="section-padding bg-white dark:bg-slate-950">
      <div class="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <aside class="space-y-6">
          <div class="rounded-lg border border-slate-200 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('contact.support.title') }}</h2>
            <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {{ t('contact.support.text') }}
            </p>
            <a href="https://wa.me/10000000000" class="focus-ring mt-5 inline-flex rounded-md bg-brand-purple px-5 py-3 text-sm font-semibold text-white hover:bg-brand-purpleDark dark:bg-brand-gold dark:text-slate-950">
              {{ t('contact.support.button') }}
            </a>
          </div>

          <div class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('contact.emailCard.title') }}</h2>
            <ul class="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
              <li><span class="font-semibold text-slate-950 dark:text-white">{{ t('common.labels.email') }}:</span> hello@roshanayi.academy</li>
              <li><span class="font-semibold text-slate-950 dark:text-white">{{ t('common.labels.support') }}:</span> support@roshanayi.academy</li>
            </ul>
          </div>
          <div class="rounded-lg border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('contact.timeZone.title') }}</h2>
            <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {{ t('contact.timeZone.text') }}
            </p>
          </div>
        </aside>

        <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" :aria-label="t('contact.formAria')" @submit.prevent="submitForm">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="name">{{ t('common.labels.fullName') }}</label>
              <input id="name" required type="text" autocomplete="name" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="email">{{ t('common.labels.email') }}</label>
              <input id="email" required type="email" autocomplete="email" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="country">{{ t('common.labels.country') }}</label>
              <input id="country" type="text" autocomplete="country-name" :placeholder="t('contact.placeholders.country')" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="whatsapp">{{ t('common.labels.whatsappNumber') }}</label>
              <input id="whatsapp" type="tel" autocomplete="tel" :placeholder="t('contact.placeholders.whatsapp')" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="interest">{{ t('common.labels.courseInterest') }}</label>
              <select id="interest" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                <option v-for="option in courseOptions" :key="option">{{ option }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="timezone">{{ t('common.labels.preferredTimeZone') }}</label>
              <input id="timezone" type="text" :placeholder="t('contact.placeholders.timezone')" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
            </div>
            <div class="sm:col-span-2">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="message">{{ t('common.labels.message') }}</label>
              <textarea id="message" rows="5" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" :placeholder="t('contact.placeholders.message')"></textarea>
            </div>
          </div>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BaseButton type="submit" :loading="isSubmitting">
              {{ isSubmitting ? t('contact.submitLoading') : t('contact.submitIdle') }}
            </BaseButton>
            <p v-if="submitted" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300" role="status" aria-live="polite">
              {{ t('contact.success') }}
            </p>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
