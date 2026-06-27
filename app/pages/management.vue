<script setup lang="ts">
definePageMeta({ middleware: 'management' })

useSeoMeta({
  title: 'Academy Management',
  description: 'Secure Roshanayi academy operations dashboard for managers and super administrators.'
})

const route = useRoute()
const { authorized } = useManagementAccess()
const {
  overview,
  urgentStudents,
  courses,
  classes,
  teachers,
  loading,
  errorMessage,
  loadOverview,
  loadOptions
} = useManagementOperations()

const overviewCards = computed(() => [
  { label: 'Total active students', value: overview.value.activeStudents, detail: 'Active student records', to: '/management/students?status=Active', tone: 'purple' },
  { label: 'Students in trial', value: overview.value.trialStudents, detail: 'Current 2-day trials', to: '/management/students?enrollment=trial', tone: 'sky' },
  { label: 'Active paid students', value: overview.value.activePaidStudents, detail: 'Paid active enrollments', to: '/management/students?payment=paid', tone: 'emerald' },
  { label: 'Payment due', value: overview.value.paymentDueStudents, detail: 'Payment action required', to: '/management/students?quick=payment-due', tone: 'amber' },
  { label: 'Overdue students', value: overview.value.overdueStudents, detail: 'More than 2 days overdue', to: '/management/students?quick=overdue', tone: 'rose' },
  { label: 'Suspended students', value: overview.value.suspendedStudents, detail: 'Access paused, records retained', to: '/management/students?quick=suspended', tone: 'rose' },
  { label: 'Active classes', value: overview.value.activeClasses, detail: 'Operational class groups', to: '/classrooms', tone: 'purple' },
  { label: 'Active teachers', value: overview.value.teachers, detail: 'Available teaching team', to: '/management?section=teachers', tone: 'emerald' },
  { label: "Today's classes", value: overview.value.todayClasses, detail: 'Scheduled for today', to: '/management?section=schedule', tone: 'sky' },
  { label: 'Students needing follow-up', value: overview.value.needsFollowUp, detail: 'Open manager workflows', to: '/management/students?quick=follow-up', tone: 'amber' }
])

const toneClasses: Record<string, string> = {
  purple: 'border-purple-200 text-brand-purple dark:border-purple-900 dark:text-purple-200',
  sky: 'border-sky-200 text-sky-700 dark:border-sky-900 dark:text-sky-200',
  emerald: 'border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-200',
  amber: 'border-amber-200 text-amber-700 dark:border-amber-900 dark:text-amber-200',
  rose: 'border-rose-200 text-rose-700 dark:border-rose-900 dark:text-rose-200'
}

const load = async () => {
  if (!authorized.value) return
  await Promise.all([loadOverview(), loadOptions()])
  if (import.meta.client && typeof route.query.section === 'string') {
    requestAnimationFrame(() => document.getElementById(route.query.section as string)?.scrollIntoView({ behavior: 'smooth' }))
  }
}

watch(authorized, (value) => {
  if (value) void load()
}, { immediate: true })
</script>

<template>
  <section v-if="!authorized" class="section-padding bg-slate-100 dark:bg-slate-950">
    <div class="container-wide"><LoadingPanel label="Verifying Management access..." /></div>
  </section>

  <ManagementShell
    v-else
    title="Academy operations overview"
    description="Monitor enrollment, classes, attendance, payments, reports, and follow-up work using live Supabase records."
  >
    <template #actions>
      <BaseButton to="/management/students">Open student workspace</BaseButton>
    </template>

    <div class="grid gap-6">
      <div v-if="errorMessage" class="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200" role="alert">
        {{ errorMessage }}
        <button type="button" class="focus-ring ml-3 rounded-md underline" @click="load">Retry</button>
      </div>

      <div v-if="loading && !urgentStudents.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div v-for="index in 10" :key="index" class="h-28 animate-pulse rounded-lg bg-white dark:bg-slate-900" />
      </div>
      <section v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Management summary">
        <NuxtLink
          v-for="card in overviewCards"
          :key="card.label"
          :to="card.to"
          :class="['focus-ring rounded-lg border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-slate-900', toneClasses[card.tone]]"
        >
          <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ card.label }}</p>
          <p class="mt-2 text-3xl font-black">{{ card.value }}</p>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ card.detail }}</p>
        </NuxtLink>
      </section>

      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex flex-col gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-rose-600 dark:text-rose-300">Urgent actions</p>
            <h2 class="mt-2 text-xl font-bold text-slate-950 dark:text-white">Operational issues requiring attention</h2>
          </div>
          <BaseButton to="/management/students?quick=follow-up" variant="outline" size="sm">View follow-ups</BaseButton>
        </div>
        <div v-if="urgentStudents.length" class="overflow-x-auto">
          <table class="w-full min-w-[820px] text-sm">
            <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
              <tr>
                <th class="px-5 py-3 font-semibold">Student</th>
                <th class="px-5 py-3 font-semibold">Parent</th>
                <th class="px-5 py-3 font-semibold">Course / Class</th>
                <th class="px-5 py-3 font-semibold">Urgent reasons</th>
                <th class="px-5 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr v-for="student in urgentStudents" :key="student.id">
                <td class="px-5 py-4 font-bold text-slate-950 dark:text-white">{{ student.student_name }}</td>
                <td class="px-5 py-4">
                  <p>{{ student.parent_name }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ student.parent_whatsapp || 'No WhatsApp number' }}</p>
                </td>
                <td class="px-5 py-4">{{ student.course_name || 'Not assigned' }} / {{ student.class_name || 'No class' }}</td>
                <td class="px-5 py-4">
                  <div class="flex max-w-md flex-wrap gap-1.5">
                    <span v-for="reason in student.urgent_reasons" :key="reason" class="rounded-md bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">{{ reason }}</span>
                  </div>
                </td>
                <td class="px-5 py-4"><BaseButton :to="`/management/students/${student.id}`" size="sm">Review</BaseButton></td>
              </tr>
            </tbody>
          </table>
        </div>
        <EmptyState v-else title="No urgent actions" description="No live student records currently match the urgent operational rules." />
      </section>

      <section id="teachers" class="scroll-mt-24 grid gap-5 lg:grid-cols-3">
        <article class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Courses</p>
          <p class="mt-2 text-3xl font-black text-brand-purple dark:text-brand-gold">{{ courses.length }}</p>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Course records available through RLS.</p>
        </article>
        <article class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Classes</p>
          <p class="mt-2 text-3xl font-black text-brand-purple dark:text-brand-gold">{{ classes.length }}</p>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Class groups available for assignment.</p>
        </article>
        <article class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Teachers</p>
          <p class="mt-2 text-3xl font-black text-brand-purple dark:text-brand-gold">{{ teachers.length }}</p>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Teacher profiles visible to Management.</p>
        </article>
      </section>
    </div>
  </ManagementShell>
</template>
