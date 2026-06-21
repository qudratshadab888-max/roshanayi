<script setup lang="ts">
import type { ClassroomLiveSession, ClassSchedule } from '~/types'
import {
  HOLIDAY_DAYS,
  getScheduleDaysLabel,
  getScheduleDurationLabel,
  getTodayClassTime
} from '~/utils/classSchedule'

const props = withDefaults(defineProps<{
  schedule?: ClassSchedule
  liveSession?: ClassroomLiveSession
  teacherName?: string
  canJoin?: boolean
  accessMessage?: string
}>(), {
  teacherName: 'Teacher assignment pending',
  canJoin: false,
  accessMessage: 'Class access is not currently available.'
})

const meetingLink = computed(() => props.liveSession?.meetingLink || props.schedule?.meetingLink || '')
const meetingPlatform = computed(() => props.liveSession?.meetingPlatform || props.schedule?.meetingPlatform || 'Not set')
const meetingId = computed(() => props.liveSession?.meetingId || props.schedule?.meetingId || 'Not set')
const meetingPassword = computed(() => props.liveSession?.meetingPassword || props.schedule?.meetingPassword || 'Not required')
</script>

<template>
  <div class="rounded-md bg-purple-50 p-5 dark:bg-purple-950/40">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">Today’s class time</p>
        <p class="mt-2 text-2xl font-black text-slate-950 dark:text-white">{{ getTodayClassTime(schedule) }}</p>
      </div>
      <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-purple dark:bg-slate-900 dark:text-brand-gold">{{ meetingPlatform }}</span>
    </div>

    <dl class="mt-5 grid gap-3 sm:grid-cols-2">
      <div class="rounded-md bg-white p-3 dark:bg-slate-900">
        <dt class="text-xs font-bold uppercase text-slate-500">Weekly schedule</dt>
        <dd class="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{{ getScheduleDaysLabel(schedule) }}</dd>
      </div>
      <div class="rounded-md bg-white p-3 dark:bg-slate-900">
        <dt class="text-xs font-bold uppercase text-slate-500">Class duration</dt>
        <dd class="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{{ getScheduleDurationLabel(schedule?.durationMinutes) }}</dd>
      </div>
      <div class="rounded-md bg-white p-3 dark:bg-slate-900">
        <dt class="text-xs font-bold uppercase text-slate-500">Teacher</dt>
        <dd class="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{{ teacherName }}</dd>
      </div>
      <div class="rounded-md bg-white p-3 dark:bg-slate-900">
        <dt class="text-xs font-bold uppercase text-slate-500">Holiday days</dt>
        <dd class="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{{ schedule?.classType === 'Group' ? HOLIDAY_DAYS.join(', ') : 'Flexible' }}</dd>
      </div>
      <div class="rounded-md bg-white p-3 dark:bg-slate-900">
        <dt class="text-xs font-bold uppercase text-slate-500">Meeting ID</dt>
        <dd class="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{{ meetingId }}</dd>
      </div>
      <div class="rounded-md bg-white p-3 dark:bg-slate-900">
        <dt class="text-xs font-bold uppercase text-slate-500">Meeting password</dt>
        <dd class="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{{ meetingPassword }}</dd>
      </div>
    </dl>

    <a
      v-if="canJoin && meetingLink"
      :href="meetingLink"
      target="_blank"
      rel="noreferrer"
      class="focus-ring mt-5 inline-flex rounded-md bg-brand-purple px-4 py-3 text-sm font-bold text-white dark:bg-brand-gold dark:text-slate-950"
    >
      Join Class
    </a>
    <p v-else-if="accessMessage" class="mt-5 rounded-md bg-white p-3 text-sm font-semibold text-amber-800 dark:bg-slate-900 dark:text-amber-200">
      {{ accessMessage }}
    </p>
  </div>
</template>
