<script setup lang="ts">
import type { FaqItem } from '~/types'

defineProps<{
  items: FaqItem[]
}>()

const openIndex = ref(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <div class="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
    <div v-for="(item, index) in items" :key="item.question">
      <button
        type="button"
        class="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-start"
        :aria-expanded="openIndex === index"
        @click="toggle(index)"
      >
        <span class="font-semibold text-slate-950 dark:text-white">{{ item.question }}</span>
        <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-brand-purple dark:bg-slate-800 dark:text-brand-gold">
          {{ openIndex === index ? '-' : '+' }}
        </span>
      </button>
      <div v-if="openIndex === index" class="px-5 pb-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>
