<script setup lang="ts">
const { t, tm } = useI18n()
const stats = computed(
  () => tm<Array<{ value: string; label: string; text: string }>>('academyStats.items')
)
</script>

<template>
  <section class="bg-slate-950 py-16 text-white">
    <div class="container-wide">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ t('academyStats.eyebrow') }}</p>
        <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{{ t('academyStats.title') }}</h2>
      </div>
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="stat in stats" :key="stat.label" class="rounded-lg border border-white/10 bg-white/5 p-6">
          <p class="text-4xl font-black text-brand-gold">{{ stat.value }}</p>
          <h3 class="mt-3 text-lg font-bold">{{ stat.label }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-300">{{ stat.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
