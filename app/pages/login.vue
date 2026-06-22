<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { canRoleAccessDashboardPath, getDashboardPathForRole, getRoleDefinition } from '~/data/roles'

const route = useRoute()
const { t } = useI18n()
const { currentUser, dashboardPath, loginWithCredentials, logout, syncUser } = useRoleAuth()

useSeoMeta({
  title: () => t('seo.login.title'),
  description: () => t('seo.login.description')
})

const identifier = ref('')
const password = ref('')
const rememberMe = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')

onMounted(syncUser)

const login = async () => {
  errorMessage.value = ''
  if (!identifier.value.trim() || !password.value) {
    errorMessage.value = 'Enter your email or username and password.'
    return
  }

  isSubmitting.value = true
  let user = null
  try {
    user = await loginWithCredentials(identifier.value, password.value, rememberMe.value)
  } catch {
    errorMessage.value = 'Login is temporarily unavailable. Please try again.'
    return
  } finally {
    isSubmitting.value = false
  }

  if (!user) {
    errorMessage.value = 'The email/username or password is incorrect.'
    return
  }

  const requestedPath = typeof route.query.redirect === 'string' ? route.query.redirect : ''
  const destination = requestedPath && canRoleAccessDashboardPath(user.role, requestedPath)
    ? requestedPath
    : getDashboardPathForRole(user.role)
  await navigateTo(destination)
}

const switchAccount = () => {
  logout()
  identifier.value = ''
  password.value = ''
  errorMessage.value = ''
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
          Sign in once and we will open the dashboard assigned to your account.
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <article class="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p class="text-sm font-bold uppercase tracking-[0.16em] text-brand-gold">Families</p>
            <h2 class="mt-2 text-xl font-bold text-white">Parent and student access</h2>
            <p class="mt-2 text-sm leading-6 text-slate-200">Parents use their email. Students aged 13+ can use an optional email or username created during registration.</p>
          </article>
          <article class="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p class="text-sm font-bold uppercase tracking-[0.16em] text-brand-gold">Academy staff</p>
            <h2 class="mt-2 text-xl font-bold text-white">Provisioned accounts only</h2>
            <p class="mt-2 text-sm leading-6 text-slate-200">Teacher, Manager, and Super Admin access is created internally and is not available through public registration.</p>
          </article>
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
            <BaseButton :to="dashboardPath" block>{{ t('login.openDashboard') }}</BaseButton>
            <BaseButton type="button" variant="outline" block @click="switchAccount">{{ t('login.switchAccount') }}</BaseButton>
          </div>
        </div>

        <form v-else class="grid gap-5" :aria-label="t('login.formAria')" @submit.prevent="login">
          <div>
            <p class="eyebrow">Account login</p>
            <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Welcome back</h2>
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-200" for="login-identifier">Email or username</label>
            <input
              id="login-identifier"
              v-model="identifier"
              required
              type="text"
              autocomplete="username"
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

          <p v-if="errorMessage" class="rounded-md bg-rose-50 p-3 text-sm font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-200" role="alert">
            {{ errorMessage }}
          </p>

          <BaseButton type="submit" block :loading="isSubmitting">
            {{ isSubmitting ? t('login.signingIn') : t('login.submitIdle') }}
          </BaseButton>

          <div class="rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Demo: <strong>parent@roshanayi.academy</strong> / <strong>demo1234</strong>
          </div>
        </form>

        <p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          {{ t('login.newFamily') }}
          <NuxtLink class="font-semibold text-brand-purple hover:text-brand-purpleDark dark:text-brand-gold" to="/register">{{ t('login.registerChildren') }}</NuxtLink>
        </p>
      </div>
    </div>
  </PageBackdrop>
</template>
