<script setup lang="ts">
useSeoMeta({
  title: 'Dashboard',
  description: 'Open the correct Roshanayi Academy dashboard for the signed-in role.'
})

const { currentUser, dashboardPath, syncUser } = useRoleAuth()

onMounted(async () => {
  syncUser()
  await navigateTo(currentUser.value ? dashboardPath.value : '/login')
})
</script>

<template>
  <section class="section-padding bg-slate-50 dark:bg-slate-950">
    <div class="container-wide">
      <LoadingPanel label="Opening your dashboard" />
    </div>
  </section>
</template>
