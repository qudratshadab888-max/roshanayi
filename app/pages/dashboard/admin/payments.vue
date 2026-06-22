<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

useSeoMeta({ title: 'Payment Administration', description: 'Full invoice, receipt, income, manual payment, and student payment-access management.' })
const { syncUser } = useRoleAuth()
onMounted(syncUser)
</script>

<template>
  <div>
    <PageHero :image="pageBackgrounds.management" eyebrow="Super Admin Payments" title="Academy payment control center" description="Full payment management with monthly income, every invoice and receipt, manual controls, and access oversight." height="compact" />
    <section class="section-padding bg-slate-50 dark:bg-slate-900/50"><div class="container-wide grid gap-8"><BaseButton to="/dashboard/admin" variant="outline" class="justify-self-start">Back to Super Admin Dashboard</BaseButton><PaymentOperationsDashboard full-control /></div></section>
  </div>
</template>
