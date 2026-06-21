<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import {
  canRoleAccessDashboardPath,
  getDashboardPathForRole,
  getDemoUserByRole,
  getRoleDefinition,
  roleDefinitions,
  type AcademyUserRole
} from '~/data/roles'

const route = useRoute()
const { t } = useI18n()
const { currentUser, dashboardPath, loginAsRole, logout, syncUser } = useRoleAuth()

useSeoMeta({
  title: () => t('seo.login.title'),
  description: () => t('seo.login.description')
})

const selectedRole = ref<AcademyUserRole>('parent')
const email = ref('')
const password = ref('demo123')
const rememberMe = ref(true)
const isSubmitting = ref(false)
const submitted = ref(false)

const selectedRoleDefinition = computed(() => getRoleDefinition(selectedRole.value))
const selectedDemoUser = computed(() => getDemoUserByRole(selectedRole.value))

watch(
  selectedRole,
  (role) => {
    email.value = getDemoUserByRole(role).email
  },
  { immediate: true }
)

onMounted(() => {
  syncUser()
})

const redirectTargetForRole = (role: AcademyUserRole) => {
  const requestedPath = typeof route.query.redirect === 'string' ? route.query.redirect : ''

  if (requestedPath && canRoleAccessDashboardPath(role, requestedPath)) {
    return requestedPath
  }

  return getDashboardPathForRole(role)
}

const login = async () => {
  isSubmitting.value = true
  submitted.value = false

  await new Promise((resolve) => globalThis.setTimeout(resolve, 450))

  const user = loginAsRole(selectedRole.value, email.value, rememberMe.value)

  isSubmitting.value = false
  submitted.value = true

  await navigateTo(redirectTargetForRole(user.role))
}

const continueToDashboard = async () => {
  await navigateTo(dashboardPath.value)
}

const switchAccount = () => {
  logout()
  submitted.value = false
}
</script>

<template>
  <PageBackdrop :image="pageBackgrounds.login" class="section-padding">
    <div class="container-wide grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div class="max-w-2xl">
        <p class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-gold backdrop-blur">
          {{ t('login.roleAccess') }}
        </p>
        <h1 class="mt-6 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
          {{ t('login.title') }}
        </h1>
        <p class="mt-5 text-lg leading-8 text-slate-200">
          {{ t('login.roleDescription') }}
        </p>

        <div class="mt-8 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">
                {{ selectedRoleDefinition.label }}
              </p>
              <h2 class="mt-2 text-2xl font-bold text-white">{{ selectedDemoUser.name }}</h2>
              <p class="mt-2 text-sm leading-6 text-slate-200">{{ selectedRoleDefinition.description }}</p>
            </div>
            <span class="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-slate-950">
              {{ selectedRoleDefinition.dashboardPath }}
            </span>
          </div>
          <div class="mt-5 grid gap-2 sm:grid-cols-2">
            <p
              v-for="permission in selectedRoleDefinition.permissions.slice(0, 6)"
              :key="permission"
              class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100"
            >
              {{ permission }}
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-slate-200 bg-white p-6 text-brand-ink shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
        <div v-if="currentUser" class="grid gap-5">
          <div>
            <p class="eyebrow">{{ t('login.signedIn') }}</p>
            <h2 class="mt-3 text-3xl font-black text-slate-950 dark:text-white">{{ currentUser.name }}</h2>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {{ t('login.account', { role: getRoleDefinition(currentUser.role).label }) }}
            </p>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <BaseButton type="button" block @click="continueToDashboard">{{ t('login.openDashboard') }}</BaseButton>
            <BaseButton type="button" variant="outline" block @click="switchAccount">{{ t('login.switchAccount') }}</BaseButton>
          </div>
        </div>

        <form v-else class="grid gap-5" :aria-label="t('login.formAria')" @submit.prevent="login">
          <div>
            <p class="eyebrow">{{ t('login.chooseRole') }}</p>
            <div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              <button
                v-for="definition in roleDefinitions"
                :key="definition.role"
                type="button"
                :class="[
                  'focus-ring min-h-12 rounded-md border px-3 py-2 text-sm font-bold transition',
                  selectedRole === definition.role
                    ? 'border-brand-purple bg-brand-purple text-white dark:border-brand-gold dark:bg-brand-gold dark:text-slate-950'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-purple hover:text-brand-purple dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-brand-gold dark:hover:text-brand-gold'
                ]"
                @click="selectedRole = definition.role"
              >
                {{ definition.shortLabel }}
              </button>
            </div>
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="login-email">{{ t('common.labels.email') }}</label>
            <input
              id="login-email"
              v-model="email"
              required
              type="email"
              autocomplete="email"
              class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            >
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="login-password">{{ t('common.labels.password') }}</label>
            <input
              id="login-password"
              v-model="password"
              required
              type="password"
              autocomplete="current-password"
              class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            >
          </div>

          <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input v-model="rememberMe" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-brand-purple">
            {{ t('login.rememberRole') }}
          </label>

          <BaseButton type="submit" block :loading="isSubmitting">
            {{ isSubmitting ? t('login.signingIn') : t('login.loginAs', { role: selectedRoleDefinition.label }) }}
          </BaseButton>

          <p v-if="submitted" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300" role="status" aria-live="polite">
            {{ t('login.redirecting') }}
          </p>
        </form>

        <p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          {{ t('login.newFamily') }}
          <NuxtLink class="font-semibold text-brand-purple hover:text-brand-purpleDark dark:text-brand-gold" to="/register">{{ t('login.registerChildren') }}</NuxtLink>
        </p>
      </div>
    </div>
  </PageBackdrop>
</template>
