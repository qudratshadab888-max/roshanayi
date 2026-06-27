export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/management')) return
  if (import.meta.server) return

  try {
    const result = await useManagementAccess().verify()
    if (!result.allowed) {
      return navigateTo({
        path: result.destination,
        query: result.destination === '/login' ? { redirect: to.fullPath } : undefined
      })
    }

    await useRoleAuth().syncUser(true)
  } catch {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
