<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.login.title'),
  description: () => t('seo.login.description')
})

const isSubmitting = ref(false)
const submitted = ref(false)

const login = () => {
  isSubmitting.value = true
  submitted.value = false

  window.setTimeout(() => {
    isSubmitting.value = false
    submitted.value = true
  }, 600)
}
</script>

<template>
  <section class="section-padding bg-slate-50 dark:bg-slate-950">
    <div class="container-wide flex justify-center">
      <div class="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <p class="eyebrow">{{ t('login.eyebrow') }}</p>
        <h1 class="mt-3 text-3xl font-black text-slate-950 dark:text-white">{{ t('login.title') }}</h1>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {{ t('login.description') }}
        </p>

        <form class="mt-8 grid gap-5" :aria-label="t('login.formAria')" @submit.prevent="login">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="login-email">{{ t('common.labels.email') }}</label>
            <input id="login-email" required type="email" autocomplete="email" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="login-password">{{ t('common.labels.password') }}</label>
            <input id="login-password" required type="password" autocomplete="current-password" class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-brand-purple">
              {{ t('common.labels.rememberMe') }}
            </label>
            <a href="#" class="font-semibold text-brand-purple hover:text-brand-purpleDark dark:text-brand-gold">{{ t('login.forgotPassword') }}</a>
          </div>
          <BaseButton type="submit" block :loading="isSubmitting">
            {{ isSubmitting ? t('login.submitLoading') : t('login.submitIdle') }}
          </BaseButton>
          <p v-if="submitted" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300" role="status" aria-live="polite">
            {{ t('login.success') }}
          </p>
        </form>

        <p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          {{ t('login.newUser') }}
          <NuxtLink class="font-semibold text-brand-purple hover:text-brand-purpleDark dark:text-brand-gold" to="/register">{{ t('common.actions.createAccount') }}</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>
