<script setup lang="ts">
import {
  getClassroomSchedule,
  getCourseTitle,
  getReferralShareMessage,
  getStudentClassroomAccess,
  getStudentClassrooms,
  getStudentReferralSummary,
  getTeacherName,
  managementStudents,
  referralGoalCount
} from '~/data/management'

const { t, tm } = useI18n()

useSeoMeta({
  title: () => t('seo.dashboard.title'),
  description: () => t('seo.dashboard.description')
})

const isDashboardLoading = ref(false)
const copiedReferralCode = ref(false)
const sampleStudent = managementStudents[0]!
const referralSummary = computed(() => getStudentReferralSummary(sampleStudent.id))
const sampleClassrooms = computed(() =>
  getStudentClassrooms(sampleStudent.id).map((classroom) => {
    const schedule = getClassroomSchedule(classroom.id)
    const access = getStudentClassroomAccess(classroom.id, sampleStudent.id)

    return {
      classroom,
      schedule,
      access,
      courseTitle: getCourseTitle(classroom.courseId),
      teacherName: getTeacherName(classroom.teacherId)
    }
  })
)

const coursesProgress = computed(
  () =>
    tm<
      Array<{
        title: string
        subject: string
        percent: number
        next: string
        teacher: string
      }>
    >('dashboard.progressItems')
)

const upcoming = computed(
  () =>
    tm<Array<{ course: string; time: string; teacher: string; format: string }>>(
      'dashboard.upcoming'
    )
)

const recentLessons = computed(
  () =>
    tm<Array<{ title: string; course: string; completed: string }>>(
      'dashboard.recentLessons'
    )
)

const assignments = computed(
  () =>
    tm<Array<{ title: string; due: string; status: string }>>('dashboard.assignments')
)

const certificates: Array<{ title: string; status: string }> = []

const copyReferralCode = async () => {
  copiedReferralCode.value = true

  if (import.meta.client && navigator.clipboard) {
    await navigator.clipboard.writeText(referralSummary.value.referralCode)
  }
}

const shareReferralCode = async () => {
  const message = getReferralShareMessage(referralSummary.value.referralCode)
  copiedReferralCode.value = true

  if (import.meta.client && 'share' in navigator) {
    await navigator.share({ text: message })
    return
  }

  if (import.meta.client && navigator.clipboard) {
    await navigator.clipboard.writeText(message)
  }
}
</script>

<template>
  <div>
    <section class="bg-slate-950 py-16 text-white">
      <div class="container-wide flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">{{ t('dashboard.eyebrow') }}</p>
          <h1 class="mt-4 text-4xl font-black tracking-tight">{{ t('dashboard.title') }}</h1>
          <p class="mt-4 max-w-2xl text-slate-200">
            {{ t('dashboard.description') }}
          </p>
        </div>
        <BaseButton to="/courses" variant="secondary">{{ t('common.actions.browseCourses') }}</BaseButton>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-950">
      <div class="container-wide">
        <LoadingPanel v-if="isDashboardLoading" :label="t('loading.dashboard')" />

        <div v-else class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="space-y-6">
            <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p class="eyebrow">{{ t('dashboard.progressEyebrow') }}</p>
                  <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ t('dashboard.currentProgress') }}</h2>
                </div>
                <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.term') }}</p>
              </div>

              <div class="mt-6 grid gap-5">
                <div v-for="item in coursesProgress" :key="item.title" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ item.subject }}</p>
                      <h3 class="mt-1 font-bold text-slate-950 dark:text-white">{{ item.title }}</h3>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('common.labels.next') }}: {{ item.next }}</p>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ t('common.labels.teacher') }}: {{ item.teacher }}</p>
                    </div>
                    <p class="text-sm font-bold text-brand-purple dark:text-brand-gold">{{ item.percent }}%</p>
                  </div>
                  <div
                    class="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800"
                    role="progressbar"
                    :aria-valuenow="item.percent"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :aria-label="`${item.title} ${t('common.labels.progress')}`"
                  >
                    <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${item.percent}%` }" />
                  </div>
                </div>
              </div>
            </article>

            <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ t('dashboard.assignmentsTitle') }}</h2>
              <div v-if="assignments.length" class="mt-6 grid gap-3">
                <label
                  v-for="assignment in assignments"
                  :key="assignment.title"
                  class="flex items-start gap-3 rounded-md border border-slate-200 p-4 dark:border-slate-800"
                >
                  <input type="checkbox" class="mt-1 h-4 w-4 rounded border-slate-300 text-brand-purple">
                  <span>
                    <span class="block text-sm font-semibold text-slate-900 dark:text-white">{{ assignment.title }}</span>
                    <span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">{{ assignment.due }} | {{ assignment.status }}</span>
                  </span>
                </label>
              </div>
              <EmptyState
                v-else
                class="mt-6"
                :title="t('dashboard.noAssignmentsTitle')"
                :description="t('dashboard.noAssignmentsDescription')"
              />
            </article>

            <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ t('dashboard.recentLessonsTitle') }}</h2>
              <div class="mt-6 grid gap-3">
                <div v-for="lesson in recentLessons" :key="lesson.title" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                  <h3 class="font-semibold text-slate-950 dark:text-white">{{ lesson.title }}</h3>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ lesson.course }}</p>
                  <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ lesson.completed }}</p>
                </div>
              </div>
            </article>
          </div>

          <aside class="space-y-6">
            <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <p class="eyebrow">Classroom Access</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">My live classes</h2>
              <div class="mt-5 grid gap-4">
                <div v-for="item in sampleClassrooms" :key="item.classroom.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                  <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p class="font-bold text-slate-950 dark:text-white">{{ item.classroom.className }}</p>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ item.courseTitle }}</p>
                      <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ item.teacherName }}</p>
                    </div>
                    <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">
                      {{ item.classroom.meetingProvider }}
                    </span>
                  </div>
                  <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {{ item.schedule ? `${item.schedule.day}, ${item.schedule.time} ${item.schedule.timezone}` : 'Schedule pending' }}
                  </p>
                  <div class="mt-4 flex flex-col gap-2 sm:flex-row">
                    <BaseButton :to="`/classrooms/${item.classroom.id}`" size="sm">Open classroom</BaseButton>
                    <a
                      v-if="item.access.canJoin && item.schedule"
                      :href="item.schedule.meetingLink"
                      target="_blank"
                      rel="noreferrer"
                      class="focus-ring inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:border-brand-purple hover:text-brand-purple dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-brand-gold dark:hover:text-brand-gold"
                    >
                      Join Live Class
                    </a>
                  </div>
                  <p v-if="!item.access.canJoin" class="mt-3 rounded-md bg-amber-50 p-3 text-sm font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                    {{ item.access.message }}
                  </p>
                </div>
              </div>
            </article>

            <article class="rounded-lg border border-purple-100 bg-purple-50 p-6 shadow-soft dark:border-purple-900/50 dark:bg-purple-950/30">
              <p class="eyebrow">Student Profile</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Referral Code</h2>
              <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Share this code with another family. The reward counts only after their trial classes and first admin-confirmed payment.
              </p>
              <p class="mt-5 rounded-md bg-white p-4 text-2xl font-black text-brand-purple dark:bg-slate-900 dark:text-brand-gold">
                {{ referralSummary.referralCode }}
              </p>
              <div class="mt-4">
                <div class="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>{{ referralSummary.progressLabel }}</span>
                  <span>{{ referralSummary.verifiedCount }} / {{ referralGoalCount }}</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-white dark:bg-slate-800">
                  <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${Math.min(referralSummary.verifiedCount, referralGoalCount) / referralGoalCount * 100}%` }" />
                </div>
              </div>
              <p v-if="referralSummary.rewardStatus === 'available' || referralSummary.rewardStatus === 'eligible' || referralSummary.rewardStatus === 'approved'" class="mt-4 rounded-md bg-white p-3 text-sm font-semibold text-emerald-600 dark:bg-slate-900 dark:text-emerald-300">
                Congratulations! You earned one month free tuition.
              </p>
              <p v-else class="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ referralSummary.rewardNote }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <button type="button" class="focus-ring rounded-md bg-brand-purple px-4 py-2 text-sm font-semibold text-white dark:bg-brand-gold dark:text-slate-950" @click="copyReferralCode">
                  Copy code
                </button>
                <button type="button" class="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" @click="shareReferralCode">
                  Share message
                </button>
                <span v-if="copiedReferralCode" class="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-300">Copied</span>
              </div>
            </article>

            <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ t('dashboard.upcomingTitle') }}</h2>
              <div v-if="upcoming.length" class="mt-6 space-y-4">
                <div v-for="item in upcoming" :key="item.course" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                  <p class="font-bold text-slate-950 dark:text-white">{{ item.course }}</p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ item.time }}</p>
                  <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ item.teacher }}</p>
                  <p class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{{ item.format }}</p>
                </div>
              </div>
              <EmptyState
                v-else
                class="mt-6"
                :title="t('dashboard.noUpcomingTitle')"
                :description="t('dashboard.noUpcomingDescription')"
              />
            </article>

            <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ t('dashboard.certificatesTitle') }}</h2>
              <div v-if="certificates.length" class="mt-6 grid gap-3">
                <div v-for="certificate in certificates" :key="certificate.title" class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                  <p class="font-semibold text-slate-950 dark:text-white">{{ certificate.title }}</p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ certificate.status }}</p>
                </div>
              </div>
              <EmptyState
                v-else
                class="mt-6"
                :title="t('dashboard.noCertificatesTitle')"
                :description="t('dashboard.noCertificatesDescription')"
              />
            </article>

            <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ t('dashboard.teacherNoteTitle') }}</h2>
              <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                {{ t('dashboard.teacherNote') }}
              </p>
            </article>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
