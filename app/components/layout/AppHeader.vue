<script setup lang="ts">
import { getRoleDefinition } from '~/data/roles'

const route = useRoute()
const isOpen = ref(false)
const { isDark, initTheme, toggleTheme } = useDarkMode()
const { locale, locales, setLocale, t } = useI18n()
const { currentUser, dashboardPath, logout, syncUser } = useRoleAuth()

const libraryLabel = computed(
  () =>
    ({
      en: 'Library',
      fa: 'کتابخانه',
      ps: 'کتابتون'
    })[locale.value] ?? 'Library'
)

const navItems = computed(() => [
  { label: t('common.nav.home'), to: '/' },
  { label: t('common.nav.about'), to: '/about' },
  { label: t('common.nav.courses'), to: '/courses' },
  { label: t('common.nav.classrooms'), to: '/classrooms' },
  { label: t('common.nav.teachers'), to: '/teachers' },
  { label: libraryLabel.value, to: '/pricing' },
  { label: t('common.nav.contact'), to: '/contact' },
  { label: t('common.nav.management'), to: '/management' }
])

const selectedLocale = computed({
  get: () => locale.value,
  set: (value: string) => setLocale(value)
})

const currentRoleLabel = computed(() =>
  currentUser.value ? getRoleDefinition(currentUser.value.role).shortLabel : ''
)

const isActive = (path: string) => route.path === path || (path !== '/' && route.path.startsWith(path))

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  }
)

onMounted(() => {
  initTheme()
  syncUser()
})

const logoutAndReturn = async () => {
  logout()
  isOpen.value = false
  await navigateTo('/login')
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
    <nav class="container-wide grid min-h-20 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]" :aria-label="t('common.menu.mainNavigation')">
      <NuxtLink to="/" class="focus-ring flex items-center gap-3 rounded-md">
        <img
          src="/images/logo%20roshnayi.png"
          :alt="t('common.brand.name')"
          class="h-11 w-11 rounded-lg object-cover shadow-lift"
        >
        <span>
          <span class="block text-base font-black tracking-tight text-slate-950 dark:text-white">{{ t('common.brand.shortName') }}</span>
          <span class="mt-0.5 block text-xs font-semibold tracking-[0.2em] text-brand-purple dark:text-brand-gold">{{ t('common.brand.academy') }}</span>
        </span>
      </NuxtLink>

      <div class="hidden justify-center lg:flex">
        <div class="flex items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-900">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'focus-ring rounded-full px-4 py-2 text-sm font-semibold transition',
              isActive(item.to)
                ? 'bg-white text-brand-purple shadow-sm dark:bg-slate-800 dark:text-brand-gold'
                : 'text-slate-600 hover:text-brand-purple dark:text-slate-300 dark:hover:text-brand-gold'
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>

      <div class="hidden items-center justify-end gap-2 lg:flex">
        <button
          type="button"
          class="focus-ring flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:border-brand-purple hover:text-brand-purple dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-gold dark:hover:text-brand-gold"
          :aria-label="isDark ? t('common.theme.switchToLight') : t('common.theme.switchToDark')"
          @click="toggleTheme"
        >
          <span :class="['block h-4 w-4 rounded-full border-2', isDark ? 'border-brand-gold bg-brand-gold' : 'border-brand-purple bg-white']" />
        </button>
        <label class="sr-only" for="desktop-locale">{{ t('common.labels.switchLanguage') }}</label>
        <select
          id="desktop-locale"
          v-model="selectedLocale"
          class="focus-ring h-11 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <option v-for="item in locales" :key="item.code" :value="item.code">
            {{ item.label }}
          </option>
        </select>
        <template v-if="currentUser">
          <BaseButton :to="dashboardPath" variant="ghost" size="sm">{{ currentRoleLabel }} Dashboard</BaseButton>
          <button
            type="button"
            class="focus-ring rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-brand-purple hover:text-brand-purple dark:border-slate-800 dark:text-slate-200 dark:hover:border-brand-gold dark:hover:text-brand-gold"
            @click="logoutAndReturn"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <BaseButton to="/login" variant="ghost" size="sm">{{ t('common.actions.login') }}</BaseButton>
          <BaseButton to="/register" size="sm">{{ t('common.actions.register') }}</BaseButton>
        </template>
      </div>

      <button
        type="button"
        class="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white lg:hidden"
        :aria-label="t('common.menu.toggle')"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="space-y-1.5">
          <span class="block h-0.5 w-5 bg-current" />
          <span class="block h-0.5 w-5 bg-current" />
          <span class="block h-0.5 w-5 bg-current" />
        </span>
      </button>
    </nav>

    <div v-if="isOpen" class="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden">
      <div class="container-wide py-4">
        <div class="grid gap-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'focus-ring rounded-md px-4 py-3 text-sm font-semibold',
              isActive(item.to)
                ? 'bg-brand-purple text-white'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
        <div v-if="currentUser" class="mt-4 grid grid-cols-2 gap-3">
          <BaseButton :to="dashboardPath" variant="outline" block>{{ currentRoleLabel }} Dashboard</BaseButton>
          <button
            type="button"
            class="focus-ring rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200"
            @click="logoutAndReturn"
          >
            Logout
          </button>
        </div>
        <div v-else class="mt-4 grid grid-cols-2 gap-3">
          <BaseButton to="/login" variant="outline" block>{{ t('common.actions.login') }}</BaseButton>
          <BaseButton to="/register" block>{{ t('common.actions.register') }}</BaseButton>
        </div>
        <label class="mt-3 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="mobile-locale">
          {{ t('common.labels.language') }}
        </label>
        <select
          id="mobile-locale"
          v-model="selectedLocale"
          class="focus-ring mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <option v-for="item in locales" :key="item.code" :value="item.code">
            {{ item.label }}
          </option>
        </select>
        <button
          type="button"
          class="focus-ring mt-3 w-full rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200"
          @click="toggleTheme"
        >
          {{ isDark ? t('common.theme.light') : t('common.theme.dark') }}
        </button>
      </div>
    </div>
  </header>
</template>
