<script setup lang="ts">
defineProps<{
  title: string
  permissions: string[]
  restrictedPermissions?: string[]
}>()
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ title }}</h2>
    <div class="mt-5 grid gap-2 sm:grid-cols-2">
      <p
        v-for="permission in permissions"
        :key="permission"
        class="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
      >
        {{ permission }}
      </p>
    </div>
    <div v-if="restrictedPermissions?.length" class="mt-5">
      <p class="text-sm font-bold uppercase tracking-[0.16em] text-rose-600 dark:text-rose-300">No access</p>
      <div class="mt-3 grid gap-2 sm:grid-cols-2">
        <p
          v-for="permission in restrictedPermissions"
          :key="permission"
          class="rounded-md bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-200"
        >
          {{ permission }}
        </p>
      </div>
    </div>
  </article>
</template>
