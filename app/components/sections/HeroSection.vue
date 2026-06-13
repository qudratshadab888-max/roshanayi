<script setup lang="ts">
const heroStyle = {
  backgroundImage:
    "linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.82) 42%, rgba(15, 23, 42, 0.36) 100%), url('/images/hero-roshanayi-academy.png')"
}

const { t, tm } = useI18n()
const stats = computed(() => tm<Array<{ value: string; label: string }>>('hero.stats'))
</script>

<template>
  <section class="relative isolate min-h-[720px] bg-slate-950 bg-cover bg-center lg:bg-[center_right_35%]" :style="heroStyle">
    <div class="container-wide flex min-h-[720px] items-center py-20">
      <div class="max-w-4xl text-white">
        <p class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
          {{ t('hero.eyebrow') }}
        </p>
        <h1 class="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          {{ t('hero.title') }}
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          {{ t('hero.description') }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton to="/register" variant="secondary" size="lg">{{ t('common.actions.registerChild') }}</BaseButton>
          <BaseButton to="/contact" variant="light" size="lg">{{ t('common.actions.bookPlacement') }}</BaseButton>
        </div>
        <p class="mt-4 text-sm font-medium text-slate-300">
          {{ t('hero.note') }}
        </p>
        <dl class="mt-12 grid gap-4 sm:grid-cols-3">
          <div v-for="stat in stats" :key="stat.label" class="border-s-2 border-brand-gold ps-4">
            <dt class="text-2xl font-black">{{ stat.value }}</dt>
            <dd class="mt-1 text-sm text-slate-300">{{ stat.label }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
