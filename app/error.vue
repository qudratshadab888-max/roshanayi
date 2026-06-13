<script setup lang="ts">
defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
const { t } = useI18n()
</script>

<template>
  <NuxtLayout>
    <section class="section-padding bg-slate-50 dark:bg-slate-950">
      <div class="container-wide flex justify-center">
        <div class="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <p class="eyebrow">{{ t('error.eyebrow') }}</p>
          <h1 class="mt-3 text-4xl font-black text-slate-950 dark:text-white">
            {{ error.statusCode || 500 }}
          </h1>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ error.statusMessage || error.message || t('error.fallback') }}
          </p>
          <BaseButton class="mt-8" @click="handleError">{{ t('common.actions.returnHome') }}</BaseButton>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
