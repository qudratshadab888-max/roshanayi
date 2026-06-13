<script setup lang="ts">
import {
  getClassroomCardRows,
  getClassroomStudents,
  getStatusTone,
  managementStudents
} from '~/data/management'

useSeoMeta({
  title: 'Classrooms',
  description:
    'Roshanayi Academy classroom system with live class links, assignments, attendance, resources, progress, and announcements.'
})

const classroomRows = computed(() => getClassroomCardRows())

const classroomStats = computed(() => [
  { label: 'Classrooms', value: classroomRows.value.length.toString(), detail: 'Virtual class groups' },
  {
    label: 'Active or Trial',
    value: classroomRows.value
      .filter((row) => row.classroom.status === 'Active' || row.classroom.status === 'Trial Only')
      .length.toString(),
    detail: 'Ready for live sessions'
  },
  {
    label: 'Enrolled Students',
    value: managementStudents.length.toString(),
    detail: 'Mock learner records'
  },
  { label: 'Video Phase', value: 'Links', detail: 'Zoom, Meet, or Jitsi for now' }
])
</script>

<template>
  <div>
    <section class="bg-slate-950 py-16 text-white">
      <div class="container-wide grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold">Roshanayi Classrooms</p>
          <h1 class="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Virtual classroom pages for every class group.
          </h1>
          <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            Phase 1 uses secure meeting links for Zoom, Google Meet, or Jitsi while keeping the structure ready for built-in video, chat, recordings, screen sharing, whiteboard, and raise hand.
          </p>
        </div>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5">
          <h2 class="text-xl font-bold">Access rule</h2>
          <p class="mt-3 text-sm leading-6 text-slate-200">
            Students can join only when they are enrolled and their status is Trial or Active. Trial students are locked after the trial period until payment is confirmed by admin.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-white py-8 dark:bg-slate-950">
      <div class="container-wide grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="stat in classroomStats"
          :key="stat.label"
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
          <p class="mt-2 text-3xl font-black text-brand-purple dark:text-brand-gold">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ stat.detail }}</p>
        </article>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="eyebrow">Class Groups</p>
            <h2 class="mt-3 text-3xl font-bold text-slate-950 dark:text-white">Classroom list</h2>
            <p class="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
              Each group has its own dashboard for live class access, assignments, homework, attendance, resources, progress, and announcements.
            </p>
          </div>
          <BaseButton to="/management" variant="outline">Admin overview</BaseButton>
        </div>

        <div class="mt-8 grid gap-5 lg:grid-cols-2">
          <article
            v-for="row in classroomRows"
            :key="row.classroom.id"
            class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(row.classroom.status)]">
                  {{ row.classroom.status }}
                </span>
                <h3 class="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{{ row.classroom.className }}</h3>
                <p class="mt-2 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ row.courseTitle }}</p>
              </div>
              <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">
                {{ row.classroom.meetingProvider }}
              </span>
            </div>

            <p class="mt-4 leading-7 text-slate-600 dark:text-slate-300">{{ row.classroom.description }}</p>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Teacher</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ row.teacherName }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Schedule</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ row.scheduleLabel }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Level</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ row.classroom.level }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Students</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ row.enrolledCount }} / {{ row.capacity }}</p>
              </div>
            </div>

            <div class="mt-5">
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Enrolled</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="student in getClassroomStudents(row.classroom.id)"
                  :key="student.id"
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {{ student.name }}
                </span>
              </div>
            </div>

            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <BaseButton :to="`/classrooms/${row.classroom.id}`">Open classroom</BaseButton>
              <BaseButton to="/register" variant="outline">Register a student</BaseButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
