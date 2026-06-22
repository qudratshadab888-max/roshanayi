<script setup lang="ts">
const { locale, t, tm } = useI18n()
const { courses } = useAcademyData()

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
      <div class="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_2.1fr_1fr]">
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
            <a class="focus-ring rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-brand-gold hover:text-brand-gold" href="https://facebook.com/roshanayiacademy" :aria-label="t('layout.footer.social.facebook')">FB</a>
            <a class="focus-ring rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-brand-gold hover:text-brand-gold" href="https://instagram.com/roshanayiacademy" :aria-label="t('layout.footer.social.instagram')">IG</a>
            <a class="focus-ring rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-brand-gold hover:text-brand-gold" href="https://youtube.com/@roshanayiacademy" :aria-label="t('layout.footer.social.youtube')">YT</a>
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
          <h2 class="text-sm font-bold uppercase tracking-[0.16em] text-brand-gold">{{ t('layout.footer.courses') }}</h2>
          <ul class="mt-5 grid gap-x-6 gap-y-3 text-sm text-slate-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <li v-for="course in courses" :key="course.slug">
              <NuxtLink class="hover:text-brand-gold" :to="`/courses/${course.slug}`">{{ course.category }}</NuxtLink>
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
