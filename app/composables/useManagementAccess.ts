import { getDashboardPathForRole, type AcademyUserRole } from '~/data/roles'

type ManagementRole = 'manager' | 'super_admin'

const toAppRole = (role: string): AcademyUserRole | null => {
  if (role === 'super_admin') return 'super-admin'
  if (role === 'manager' || role === 'teacher' || role === 'parent' || role === 'student') return role
  return null
}

export const useManagementAccess = () => {
  const authorized = useState('management-access-authorized', () => false)
  const verifiedRole = useState<ManagementRole | null>('management-access-role', () => null)
  const accessError = useState('management-access-error', () => '')

  const verify = async () => {
    authorized.value = false
    verifiedRole.value = null
    accessError.value = ''

    const supabase = useSupabase()
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError || !authData.user) {
      return { allowed: false as const, destination: '/login' }
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .maybeSingle()

    if (profileError) {
      accessError.value = profileError.message
      return { allowed: false as const, destination: '/login' }
    }

    const role = typeof profile?.role === 'string' ? profile.role : ''
    if (role === 'manager' || role === 'super_admin') {
      verifiedRole.value = role
      authorized.value = true
      return { allowed: true as const, role }
    }

    const appRole = toAppRole(role)
    return {
      allowed: false as const,
      destination: appRole ? getDashboardPathForRole(appRole) : '/login'
    }
  }

  return { authorized, verifiedRole, accessError, verify }
}
