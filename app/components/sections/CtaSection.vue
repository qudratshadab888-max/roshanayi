<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="bg-brand-purple py-16 text-white dark:bg-brand-purpleDark">
    <div class="container-wide flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ t('cta.eyebrow') }}</p>
        <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          {{ t('cta.title') }}
        </h2>
        <p class="mt-4 text-base leading-7 text-purple-100">
          {{ t('cta.description') }}
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <BaseButton to="/register" variant="secondary" size="lg">{{ t('common.actions.registerChild') }}</BaseButton>
        <BaseButton to="/contact" variant="light" size="lg">{{ t('common.actions.talkToUs') }}</BaseButton>
      </div>
    </div>
  </section>
</template>
