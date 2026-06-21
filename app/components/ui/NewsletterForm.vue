<script setup lang="ts">
const email = ref('')
const submitted = ref(false)
const isSubmitting = ref(false)
const { t } = useI18n()

const subscribe = () => {
  isSubmitting.value = true
  submitted.value = false

  globalThis.setTimeout(() => {
    submitted.value = true
    isSubmitting.value = false
    email.value = ''
  }, 600)
}
</script>

<template>
  <form class="flex flex-col gap-3" @submit.prevent="subscribe">
    <div class="flex flex-col gap-3 sm:flex-row">
      <label class="sr-only" for="newsletter-email">{{ t('newsletter.label') }}</label>
      <input
        id="newsletter-email"
        v-model="email"
        required
        type="email"
        autocomplete="email"
        :placeholder="t('newsletter.placeholder')"
        class="focus-ring min-h-12 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      >
      <BaseButton type="submit" variant="secondary" :loading="isSubmitting">
        {{ isSubmitting ? t('newsletter.loading') : t('newsletter.idle') }}
      </BaseButton>
    </div>
    <p v-if="submitted" class="text-sm font-medium text-emerald-600 dark:text-emerald-300" role="status" aria-live="polite">
      {{ t('newsletter.success') }}
    </p>
  </form>
</template>
