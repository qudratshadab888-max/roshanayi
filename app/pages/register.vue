<script setup lang="ts">
import { generateReferralCode } from '~/data/management'

const { t, tm } = useI18n()
const { courseCategories } = useAcademyData()

useSeoMeta({
  title: () => t('seo.register.title'),
  description: () => t('seo.register.description')
})

const submitted = ref(false)
const isSubmitting = ref(false)
const generatedReferralCode = ref('')
const registration = reactive({
  parentName: '',
  studentName: '',
  invitedReferralCode: ''
})
const courseOptions = computed(() => [
  ...courseCategories.value.slice(1),
  t('common.categories.notSure')
])
const registrationSteps = computed(() => tm<string[]>('register.steps'))

const submitRegistration = () => {
  isSubmitting.value = true
  submitted.value = false

  window.setTimeout(() => {
    generatedReferralCode.value = generateReferralCode(registration.studentName)
    isSubmitting.value = false
    submitted.value = true
  }, 800)
}
</script>

<template>
  <section class="section-padding bg-slate-50 dark:bg-slate-950">
    <div class="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <p class="eyebrow">{{ t('register.eyebrow') }}</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">{{ t('register.title') }}</h1>
        <p class="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          {{ t('register.description') }}
        </p>
        <div class="mt-8 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ t('register.nextTitle') }}</h2>
          <ol class="mt-5 space-y-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li v-for="(step, index) in registrationSteps" :key="step">
              <span class="font-bold text-brand-purple dark:text-brand-gold">{{ index + 1 }}.</span> {{ step }}
            </li>
          </ol>
        </div>
      </div>

      <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" :aria-label="t('register.formAria')" @submit.prevent="submitRegistration">
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="parent-name">{{ t('common.labels.parentName') }}</label>
            <input id="parent-name" v-model="registration.parentName" required type="text" autocomplete="name" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="register-email">{{ t('common.labels.email') }}</label>
            <input id="register-email" required type="email" autocomplete="email" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-name">{{ t('common.labels.studentName') }}</label>
            <input id="student-name" v-model="registration.studentName" required type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-age">{{ t('common.labels.studentAge') }}</label>
            <input id="student-age" required min="4" max="18" type="number" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="country">{{ t('common.labels.country') }}</label>
            <input id="country" required type="text" autocomplete="country-name" :placeholder="t('register.placeholders.country')" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="register-whatsapp">{{ t('common.labels.whatsappNumber') }}</label>
            <input id="register-whatsapp" required type="tel" autocomplete="tel" :placeholder="t('register.placeholders.whatsapp')" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="course">{{ t('common.labels.courseInterest') }}</label>
            <select id="course" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              <option v-for="option in courseOptions" :key="option">{{ option }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="preferred-time">{{ t('common.labels.preferredClassTime') }}</label>
            <input id="preferred-time" type="text" :placeholder="t('register.placeholders.preferredTime')" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div class="sm:col-span-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="referral-code">Referral Code</label>
            <input
              id="referral-code"
              v-model="registration.invitedReferralCode"
              type="text"
              placeholder="Enter referral code if someone invited you"
              class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm uppercase dark:border-slate-700 dark:bg-slate-950"
            >
            <p class="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Referral rewards count only after trial classes, first payment, and admin confirmation.
            </p>
          </div>
          <div class="sm:col-span-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="notes">{{ t('common.labels.learningGoals') }}</label>
            <textarea id="notes" rows="5" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950" :placeholder="t('register.placeholders.notes')"></textarea>
          </div>
        </div>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <BaseButton type="submit" :loading="isSubmitting">
            {{ isSubmitting ? t('register.submitLoading') : t('register.submitIdle') }}
          </BaseButton>
          <p v-if="submitted" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300" role="status" aria-live="polite">
            {{ t('register.success') }}
          </p>
        </div>
        <div v-if="submitted && generatedReferralCode" class="mt-5 rounded-lg bg-purple-50 p-4 text-sm text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">
          New student referral code: <strong>{{ generatedReferralCode }}</strong>. Share it after enrollment so verified referrals can count toward one month free tuition.
        </div>
      </form>
    </div>
  </section>
</template>
