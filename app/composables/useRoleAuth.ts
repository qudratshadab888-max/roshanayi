import {
  canRoleAccessDashboardPath,
  getDashboardPathForRole,
  getDemoUserByRole,
  isRoleSessionUser,
  type AcademyUserRole,
  type RoleSessionUser
} from '~/data/roles'

const storageKey = 'roshanayi-role-session'

export const useRoleAuth = () => {
  const currentUser = useState<RoleSessionUser | null>('roshanayi-role-auth-user', () => null)
  const sessionLoaded = useState('roshanayi-role-auth-loaded', () => false)

  const syncUser = () => {
    if (!import.meta.client || sessionLoaded.value) {
      return
    }

    const storedUser = sessionStorage.getItem(storageKey) ?? localStorage.getItem(storageKey)

    if (!storedUser) {
      sessionLoaded.value = true
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)

      if (isRoleSessionUser(parsedUser)) {
        currentUser.value = parsedUser
      } else {
        localStorage.removeItem(storageKey)
      }
    } catch {
      localStorage.removeItem(storageKey)
    } finally {
      sessionLoaded.value = true
    }
  }

  const persistUser = (user: RoleSessionUser, remember = true) => {
    currentUser.value = user
    sessionLoaded.value = true

    if (import.meta.client) {
      const selectedStorage = remember ? localStorage : sessionStorage
      const otherStorage = remember ? sessionStorage : localStorage

      selectedStorage.setItem(storageKey, JSON.stringify(user))
      otherStorage.removeItem(storageKey)
    }
  }

  const loginAsRole = (role: AcademyUserRole, email?: string, remember = true) => {
    const demoUser = getDemoUserByRole(role)
    const user: RoleSessionUser = {
      ...demoUser,
      email: email?.trim() || demoUser.email
    }

    persistUser(user, remember)

    return user
  }

  const logout = () => {
    currentUser.value = null
    sessionLoaded.value = true

    if (import.meta.client) {
      localStorage.removeItem(storageKey)
      sessionStorage.removeItem(storageKey)
    }
  }

  const dashboardPath = computed(() =>
    currentUser.value ? getDashboardPathForRole(currentUser.value.role) : '/login'
  )

  const isAuthenticated = computed(() => Boolean(currentUser.value))

  const canAccessPath = (path: string) =>
    currentUser.value ? canRoleAccessDashboardPath(currentUser.value.role, path) : false

  return {
    currentUser,
    isAuthenticated,
    sessionLoaded,
    dashboardPath,
    syncUser,
    loginAsRole,
    logout,
    canAccessPath
  }
}
