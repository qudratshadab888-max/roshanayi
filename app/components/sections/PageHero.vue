<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    image: string
    eyebrow?: string
    title: string
    description?: string
    align?: 'start' | 'center'
    height?: 'compact' | 'normal' | 'tall'
    contentClass?: string
  }>(),
  {
    align: 'start',
    height: 'normal',
    contentClass: ''
  }
)

const { isRtl } = useI18n()

const heightClass = computed(
  () =>
    ({
      compact: 'min-h-[380px]',
      normal: 'min-h-[460px]',
      tall: 'min-h-[560px]'
    })[props.height]
)

const heroStyle = computed(() => ({
  backgroundImage: `${
    isRtl.value
      ? 'linear-gradient(270deg, rgba(15, 23, 42, 0.96) 0%, rgba(76, 29, 149, 0.86) 46%, rgba(15, 23, 42, 0.28) 100%)'
      : 'linear-gradient(90deg, rgba(15, 23, 42, 0.96) 0%, rgba(76, 29, 149, 0.86) 46%, rgba(15, 23, 42, 0.28) 100%)'
  }, url('${props.image}')`
}))
</script>

<template>
  <section
    :class="[
      'relative isolate overflow-hidden bg-slate-950 bg-cover text-white',
      isRtl ? 'bg-[center_left_30%]' : 'bg-[center_right_35%]'
    ]"
    :style="heroStyle"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/70" aria-hidden="true" />
    <div :class="['container-wide relative flex items-center py-14 sm:py-16 lg:py-20', heightClass]">
      <div class="w-full">
        <slot name="before" />
        <div
          :class="[
            $slots.aside ? 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end' : '',
            align === 'center' ? 'mx-auto max-w-4xl text-center' : ''
          ]"
        >
          <div :class="[align === 'center' ? '' : 'max-w-4xl', contentClass]" :dir="isRtl ? 'rtl' : 'ltr'">
            <p
              v-if="eyebrow"
              class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-gold backdrop-blur"
            >
              {{ eyebrow }}
            </p>
            <h1 class="mt-6 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {{ title }}
            </h1>
            <p v-if="description" class="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              {{ description }}
            </p>
            <slot />
          </div>

          <div v-if="$slots.aside" :dir="isRtl ? 'rtl' : 'ltr'">
            <slot name="aside" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
