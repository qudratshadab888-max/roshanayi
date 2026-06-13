<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'

const { localeMeta } = useI18n()

useHead(() => ({
  htmlAttrs: {
    lang: localeMeta.value.htmlLang,
    dir: localeMeta.value.dir
  }
}))
</script>

<template>
  <div class="min-h-screen bg-white text-brand-ink dark:bg-slate-950 dark:text-slate-100">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
