<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'

useSeoMeta({ title: 'Manager Payments', description: 'Manage academy invoices, manual payments, receipts, overdue follow-up, and student payment access.' })
const { syncUser } = useRoleAuth()
onMounted(syncUser)
</script>

<template>
  <div>
    <PageHero :image="pageBackgrounds.management" eyebrow="Manager Payments" title="Payment operations" description="Confirm payments, add manual records, follow up overdue invoices, and control temporary or suspended class access without deleting students." height="compact" />
    <section class="section-padding bg-slate-50 dark:bg-slate-900/50"><div class="container-wide grid gap-8"><BaseButton to="/dashboard/manager" variant="outline" class="justify-self-start">Back to Manager Dashboard</BaseButton><PaymentOperationsDashboard /></div></section>
  </div>
</template>
