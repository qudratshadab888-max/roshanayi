<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()

const route = useRoute()
const { currentUser } = useRoleAuth()
const { verifiedRole } = useManagementAccess()
const paymentsPath = computed(() =>
  verifiedRole.value === 'super_admin' ? '/dashboard/admin/payments' : '/dashboard/manager/payments'
)
const navigation = computed(() => [
  { label: 'Overview', to: '/management' },
  { label: 'Students', to: '/management/students' },
  { label: 'Parents', to: '/management/students?focus=parents' },
  { label: 'Teachers', to: '/management?section=teachers' },
  { label: 'Classes', to: '/classrooms' },
  { label: 'Schedule', to: '/management?section=schedule' },
  { label: 'Attendance', to: '/management/students?attendance=low' },
  { label: 'Reports', to: '/management?section=reports' },
  { label: 'Payments', to: paymentsPath.value },
  { label: 'Follow-ups', to: '/management/students?quick=follow-up' },
  { label: 'Notifications', to: '/management?section=notifications' }
])
const isActive = (to: string) => {
  const path = to.split('?')[0]
  if (path === '/management') return route.path === path
  return route.path.startsWith(path ?? to)
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-950">
    <div class="container-wide py-6 lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-6">
      <aside class="hidden self-start border-r border-slate-200 pr-5 dark:border-slate-800 lg:sticky lg:top-24 lg:block">
        <div class="border-b border-slate-200 pb-5 dark:border-slate-800">
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">Academy operations</p>
          <p class="mt-2 font-bold text-slate-950 dark:text-white">{{ currentUser?.name ?? 'Management' }}</p>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ verifiedRole === 'super_admin' ? 'Super Admin' : 'Manager' }}</p>
        </div>
        <nav class="mt-5 grid gap-1" aria-label="Management navigation">
          <NuxtLink
            v-for="item in navigation"
            :key="item.label"
            :to="item.to"
            :class="[
              'focus-ring rounded-md px-3 py-2.5 text-sm font-semibold transition',
              isActive(item.to)
                ? 'bg-brand-purple text-white dark:bg-brand-gold dark:text-slate-950'
                : 'text-slate-600 hover:bg-white hover:text-brand-purple dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-brand-gold'
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </aside>

      <main class="min-w-0">
        <nav class="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Management navigation">
          <NuxtLink
            v-for="item in navigation"
            :key="item.label"
            :to="item.to"
            :class="[
              'focus-ring shrink-0 rounded-md border px-3 py-2 text-xs font-bold',
              isActive(item.to)
                ? 'border-brand-purple bg-brand-purple text-white dark:border-brand-gold dark:bg-brand-gold dark:text-slate-950'
                : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <header class="border-b border-slate-200 pb-5 dark:border-slate-800">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">Roshanayi Management</p>
              <h1 class="mt-2 text-3xl font-black text-slate-950 dark:text-white">{{ title }}</h1>
              <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{{ description }}</p>
            </div>
            <slot name="actions" />
          </div>
        </header>

        <div class="mt-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
