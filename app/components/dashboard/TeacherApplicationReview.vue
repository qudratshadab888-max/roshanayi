<script setup lang="ts">
import type { TeacherApplicationStatus } from '~/types'

const props = defineProps<{ reviewerName: string }>()
const { applications, reviewApplication } = useTeacherApplications()
const selectedId = ref('')
const statusDraft = ref<TeacherApplicationStatus>('New')
const notesDraft = ref('')
const publicProfileApproved = ref(false)
const notice = ref('')
const statuses: TeacherApplicationStatus[] = ['New', 'Under Review', 'Approved', 'Rejected', 'Needs More Information']

const selected = computed(() => applications.value.find((application) => application.id === selectedId.value))
const counts = computed(() => Object.fromEntries(statuses.map((status) => [status, applications.value.filter((item) => item.status === status).length])))

watchEffect(() => {
  if (!applications.value.some((item) => item.id === selectedId.value)) selectedId.value = applications.value[0]?.id ?? ''
})

watch(selected, (application) => {
  if (!application) return
  statusDraft.value = application.status
  notesDraft.value = application.internalNotes
  publicProfileApproved.value = application.publicProfileApproved
  notice.value = ''
}, { immediate: true })

const statusClass = (status: TeacherApplicationStatus) => ({
  'New': 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
  'Under Review': 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200',
  'Approved': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  'Rejected': 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
  'Needs More Information': 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-200'
})[status]

const save = (status = statusDraft.value) => {
  if (!selected.value) return
  statusDraft.value = status
  reviewApplication(selected.value.id, {
    status,
    internalNotes: notesDraft.value.trim(),
    publicProfileApproved: status === 'Approved' && publicProfileApproved.value
  }, props.reviewerName)
  notice.value = status === 'Approved'
    ? 'Teacher approved. Profile and dashboard access are now active.'
    : `Application updated to ${status}.`
}

const formatSize = (size: number) => size < 1024 * 1024 ? `${Math.max(Math.round(size / 1024), 1)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`
</script>

<template>
  <section class="rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <div class="border-b border-slate-200 p-6 dark:border-slate-800">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p class="eyebrow">Recruitment</p>
          <h2 class="mt-2 text-2xl font-black text-slate-950 dark:text-white">Teacher Applications</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Private review workspace for applications, documents, verification notes, and approval.</p>
        </div>
        <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-brand-gold">{{ applications.length }} total</span>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <span v-for="status in statuses" :key="status" :class="['rounded-full px-3 py-1 text-xs font-bold', statusClass(status)]">{{ status }}: {{ counts[status] }}</span>
      </div>
    </div>

    <div v-if="applications.length" class="grid xl:grid-cols-[0.34fr_0.66fr]">
      <aside class="border-b border-slate-200 p-4 dark:border-slate-800 xl:border-b-0 xl:border-r">
        <button v-for="application in applications" :key="application.id" type="button" :class="['mb-3 w-full rounded-md border p-4 text-left transition', selectedId === application.id ? 'border-brand-purple bg-purple-50 dark:border-brand-gold dark:bg-purple-950/40' : 'border-slate-200 hover:border-brand-purple dark:border-slate-700']" @click="selectedId = application.id">
          <div class="flex items-start justify-between gap-3">
            <div><p class="font-bold text-slate-950 dark:text-white">{{ application.fullName }}</p><p class="mt-1 text-xs text-slate-500">{{ application.country }} · {{ application.yearsExperience }} years</p></div>
            <span :class="['rounded-full px-2 py-1 text-[10px] font-bold', statusClass(application.status)]">{{ application.status }}</span>
          </div>
          <p class="mt-3 line-clamp-1 text-xs text-slate-500">{{ application.subjects.join(', ') }}</p>
        </button>
      </aside>

      <div v-if="selected" class="p-5 sm:p-6">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-4">
            <img v-if="selected.profilePhoto" :src="selected.profilePhoto.url" :alt="`${selected.displayName} profile`" class="h-20 w-20 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700">
            <div v-else class="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800">No photo</div>
            <div><h3 class="text-2xl font-black text-slate-950 dark:text-white">{{ selected.fullName }}</h3><p class="mt-1 text-sm text-slate-500">Submitted {{ new Date(selected.submittedAt).toLocaleString() }}</p><span :class="['mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold', statusClass(selected.status)]">{{ selected.status }}</span></div>
          </div>
          <p class="text-xs font-semibold text-slate-400">{{ selected.id }}</p>
        </div>

        <div class="mt-6 grid gap-4 lg:grid-cols-2">
          <article class="review-card"><h4>Private contact information</h4><dl><div><dt>Email</dt><dd>{{ selected.email }}</dd></div><div><dt>WhatsApp</dt><dd>{{ selected.whatsapp }}</dd></div><div><dt>Location</dt><dd>{{ selected.city }}, {{ selected.country }}</dd></div><div><dt>Timezone / Gender</dt><dd>{{ selected.timezone }} · {{ selected.gender }}</dd></div></dl></article>
          <article class="review-card"><h4>Teaching qualifications</h4><dl><div><dt>Subjects</dt><dd>{{ selected.subjects.join(', ') }}</dd></div><div><dt>Languages</dt><dd>{{ selected.teachingLanguages.join(', ') }}</dd></div><div><dt>Experience</dt><dd>{{ selected.yearsExperience }} years · {{ selected.educationLevel }}</dd></div></dl></article>
          <article class="review-card lg:col-span-2"><h4>Professional background</h4><p>{{ selected.previousExperience }}</p><p class="mt-3">{{ selected.professionalBio }}</p></article>
          <article class="review-card"><h4>Availability</h4><dl><div><dt>Days</dt><dd>{{ selected.availableDays.join(', ') }}</dd></div><div><dt>Time slots</dt><dd>{{ selected.availableTimeSlots.join(', ') }}</dd></div><div><dt>Class types</dt><dd>{{ selected.preferredClassTypes.join(', ') }}</dd></div></dl></article>
          <article class="review-card"><h4>Student groups</h4><dl><div><dt>Children</dt><dd>{{ selected.canTeachChildren ? 'Yes' : 'No' }}</dd></div><div><dt>Teenagers</dt><dd>{{ selected.canTeachTeenagers ? 'Yes' : 'No' }}</dd></div><div><dt>English-speaking students</dt><dd>{{ selected.canTeachEnglishSpeakers ? 'Yes' : 'No' }}</dd></div></dl></article>
          <article class="review-card lg:col-span-2"><h4>Proposed public profile</h4><dl><div><dt>Display name</dt><dd>{{ selected.displayName }}</dd></div><div><dt>Subjects</dt><dd>{{ selected.profileSubjects.join(', ') }}</dd></div><div><dt>Languages</dt><dd>{{ selected.profileLanguages.join(', ') }}</dd></div></dl><p class="mt-3">{{ selected.websiteBio }}</p></article>
          <article class="review-card lg:col-span-2"><h4>Private documents</h4><div class="mt-3 grid gap-3 sm:grid-cols-2">
            <a v-for="document in [selected.resume, selected.certificate, selected.idDocument].filter(Boolean)" :key="document!.name" :href="document!.url" target="_blank" rel="noreferrer" class="rounded-md border border-slate-200 p-3 text-sm font-semibold text-brand-purple hover:border-brand-purple dark:border-slate-700 dark:text-brand-gold"><span class="block">{{ document!.name }}</span><span class="mt-1 block text-xs text-slate-500">{{ formatSize(document!.size) }} · reviewer only</span></a>
            <a v-if="selected.introVideoUrl" :href="selected.introVideoUrl" target="_blank" rel="noreferrer" class="rounded-md border border-slate-200 p-3 text-sm font-semibold text-brand-purple dark:border-slate-700 dark:text-brand-gold">Open intro video</a>
          </div></article>
        </div>

        <div class="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
          <h4 class="font-bold text-slate-950 dark:text-white">Review decision</h4>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <label><span class="review-label">Application status</span><select v-model="statusDraft" class="review-input"><option v-for="status in statuses" :key="status">{{ status }}</option></select></label>
            <label class="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900"><input v-model="publicProfileApproved" type="checkbox" :disabled="statusDraft !== 'Approved'">Public Profile Approved</label>
            <label class="sm:col-span-2"><span class="review-label">Internal notes</span><textarea v-model="notesDraft" rows="4" class="review-input" placeholder="Verification notes, requested information, interview outcome, or rejection reason"></textarea></label>
          </div>
          <div class="mt-4 flex flex-wrap gap-3"><BaseButton type="button" @click="save()">Save Review</BaseButton><BaseButton type="button" variant="outline" @click="save('Approved')">Approve Teacher</BaseButton><button type="button" class="focus-ring rounded-md bg-rose-600 px-4 py-2 text-sm font-bold text-white" @click="save('Rejected')">Reject Teacher</button></div>
          <p v-if="notice" class="mt-4 text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ notice }}</p>
          <p v-if="selected.reviewedBy" class="mt-3 text-xs text-slate-500">Last reviewed by {{ selected.reviewedBy }} on {{ new Date(selected.reviewedAt).toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <div v-else class="p-8 text-center"><p class="text-lg font-bold text-slate-950 dark:text-white">No teacher applications yet</p><p class="mt-2 text-sm text-slate-500">New submissions from the public application page will appear here.</p></div>
  </section>
</template>

<style scoped>
.review-card { @apply rounded-md border border-slate-200 p-4 dark:border-slate-700; }
.review-card h4 { @apply font-bold text-slate-950 dark:text-white; }
.review-card p { @apply text-sm leading-6 text-slate-600 dark:text-slate-300; }
.review-card dl { @apply mt-3 grid gap-3; }
.review-card dl div { @apply grid gap-1 sm:grid-cols-[0.34fr_0.66fr]; }
.review-card dt { @apply text-xs font-bold uppercase text-slate-500; }
.review-card dd { @apply text-sm font-semibold text-slate-800 dark:text-slate-100; }
.review-label { @apply mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200; }
.review-input { @apply w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:focus-visible:ring-offset-slate-950; }
</style>
