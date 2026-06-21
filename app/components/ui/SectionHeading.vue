<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
  }>(),
  {
    align: 'left'
  }
)

const alignment = computed(() =>
  props.align === 'center' ? 'mx-auto text-center' : 'text-start'
)
</script>

<template>
  <div :class="['max-w-3xl', alignment]">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="mt-3 break-words text-3xl font-bold leading-tight tracking-normal text-slate-950 dark:text-white sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
      {{ description }}
    </p>
  </div>
</template>
