<script setup lang="ts">
const { locale, t, tm } = useI18n()

const libraryLabel = computed(
  () =>
    ({
      en: 'Library',
      fa: 'کتابخانه',
      ps: 'کتابتون'
    })[locale.value] ?? 'Library'
)

const quickLinks = computed(() => [
  { label: t('common.nav.about'), to: '/about' },
  { label: t('common.nav.courses'), to: '/courses' },
  { label: t('common.nav.teachers'), to: '/teachers' },
  { label: 'Apply as a Teacher', to: '/apply-teacher' },
  { label: libraryLabel.value, to: '/pricing' }
])

const contactItems = computed(() => tm<string[]>('layout.footer.contactItems'))
const copyright = computed(() =>
  t('layout.footer.copyright', { year: new Date().getFullYear() })
)
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-950 text-white dark:border-slate-800">
    <div class="container-wide py-14">
      <div class="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_1fr]">
        <div>
          <NuxtLink to="/" class="focus-ring inline-flex items-center gap-3 rounded-md">
            <span class="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gold text-lg font-black text-slate-950">
              {{ t('common.brand.initials') }}
            </span>
            <span>
              <span class="block text-lg font-black">{{ t('common.brand.name') }}</span>
              <span class="block text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">{{ t('common.brand.tagline') }}</span>
            </span>
          </NuxtLink>
          <p class="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            {{ t('layout.footer.description') }}
          </p>
          <div class="mt-6 flex gap-3">
            <a class="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold" href="https://facebook.com/roshanayiacademy" :aria-label="t('layout.footer.social.facebook')">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 8.5h2V5.3A10 10 0 0 0 13.1 5c-2.9 0-4.9 1.8-4.9 5v2.8H5v3.6h3.2V24h3.9v-7.6h3.1l.5-3.6h-3.6v-2.4c0-1 .3-1.9 1.9-1.9Z" />
              </svg>
            </a>
            <a class="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold" href="https://instagram.com/roshanayiacademy" :aria-label="t('layout.footer.social.instagram')">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <path d="M17.5 6.5h.01" />
              </svg>
            </a>
            <a class="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold" href="https://youtube.com/@roshanayiacademy" :aria-label="t('layout.footer.social.youtube')">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5a3 3 0 0 0-2.1 2.1A31.4 31.4 0 0 0 2 12a31.4 31.4 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 22 12a31.4 31.4 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h2 class="text-sm font-bold uppercase tracking-[0.16em] text-brand-gold">{{ t('layout.footer.quickLinks') }}</h2>
          <ul class="mt-5 space-y-3 text-sm text-slate-300">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink class="hover:text-brand-gold" :to="link.to">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-sm font-bold uppercase tracking-[0.16em] text-brand-gold">{{ t('layout.footer.contact') }}</h2>
          <ul class="mt-5 space-y-3 text-sm text-slate-300">
            <li v-for="item in contactItems" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{{ copyright }}</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-brand-gold">{{ t('layout.footer.privacy') }}</a>
          <a href="#" class="hover:text-brand-gold">{{ t('layout.footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
