<script setup lang="ts">
const props = defineProps<{
  image: string
}>()

const { isRtl } = useI18n()

const backdropStyle = computed(() => ({
  backgroundImage: `${
    isRtl.value
      ? 'linear-gradient(225deg, rgba(15, 23, 42, 0.96) 0%, rgba(76, 29, 149, 0.84) 48%, rgba(15, 23, 42, 0.56) 100%)'
      : 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(76, 29, 149, 0.84) 48%, rgba(15, 23, 42, 0.56) 100%)'
  }, url('${props.image}')`
}))
</script>

<template>
  <section
    :class="[
      'relative isolate overflow-hidden bg-slate-950 bg-cover text-white',
      isRtl ? 'bg-[center_left_30%]' : 'bg-[center_right_35%]'
    ]"
    :style="backdropStyle"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/70" aria-hidden="true" />
    <div class="relative">
      <slot />
    </div>
  </section>
</template>
