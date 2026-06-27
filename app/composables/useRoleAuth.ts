import type { SupabaseClient, User } from '@supabase/supabase-js'
import {
  canRoleAccessDashboardPath,
  getDashboardPathForRole,
  type AcademyUserRole,
  type RoleSessionUser
} from '~/data/roles'
import type { RegisteredParent, RegisteredStudent } from '~/composables/useFamilyAccounts'

type SupabaseProfileRole = 'super_admin' | 'manager' | 'teacher' | 'parent' | 'student'

interface ProfileRow {
  id: string
  role: SupabaseProfileRole | string
  full_name: string | null
  email: string | null
  username: string | null
}

interface ParentRow {
  id: string
  profile_id: string
  full_name: string
  email: string
  whatsapp_number: string | null
  country: string | null
  city: string | null
  timezone: string | null
  relationship_to_student: string | null
}

interface StudentRow {
  id: string
  parent_id: string
  profile_id: string | null
  first_name: string
  last_name: string
  gender: string | null
  date_of_birth: string | null
  native_language: string | null
  current_level: string | null
  status: string | null
}

interface TeacherRow {
  id: string
  profile_id: string
  display_name: string | null
}

const toAppRole = (role: string): AcademyUserRole | null => {
  if (role === 'super_admin') return 'super-admin'
  if (role === 'manager' || role === 'teacher' || role === 'parent' || role === 'student') return role
  return null
}

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const normalizeIdentifier = (value: string) => value.trim().toLowerCase()

const toFriendlyAuthError = (message: string) => {
  const normalized = message.toLowerCase()

  if (normalized.includes('invalid login credentials')) {
    return 'The email, username, or password is incorrect.'
  }

  if (normalized.includes('email not confirmed')) {
    return 'Please confirm your email address before logging in.'
  }

  if (normalized.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.'
  }

  if (normalized.includes('missing supabase configuration')) {
    return 'Supabase is not configured yet. Add NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your environment.'
  }

  if (normalized.includes('schema cache') || normalized.includes('could not find the table')) {
    return 'The Supabase database schema is not installed yet. Please run the Roshanayi SQL migration in your Supabase project, then reload the schema cache.'
  }

  return message || 'Authentication is temporarily unavailable. Please try again.'
}

const calculateAge = (dateOfBirth: string | null) => {
  if (!dateOfBirth) return 0

  const birthDate = new Date(dateOfBirth)
  if (Number.isNaN(birthDate.getTime())) return 0

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDelta = today.getMonth() - birthDate.getMonth()

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return Math.max(age, 0)
}

const localStudentStatus = (status: string | null): RegisteredStudent['status'] => {
  if (status === 'active') return 'Active'
  if (status === 'inactive' || status === 'suspended') return 'Inactive'
  return 'Trial'
}

const referralCode = (prefix: string, id: string) =>
  `${prefix}-${id.slice(0, 8).toUpperCase()}`

const toRegisteredParent = (parent: ParentRow): RegisteredParent => ({
  id: parent.id,
  name: parent.full_name,
  email: parent.email,
  whatsapp: parent.whatsapp_number ?? '',
  country: parent.country ?? '',
  city: parent.city ?? '',
  timezone: parent.timezone ?? 'Flexible',
  relationship: parent.relationship_to_student ?? 'Guardian',
  referralCode: referralCode('FAMILY', parent.id)
})

const toRegisteredStudent = (student: StudentRow, parent: RegisteredParent | ParentRow | null): RegisteredStudent => {
  const fullName = `${student.first_name} ${student.last_name}`.trim()
  const country = parent && 'country' in parent ? parent.country ?? '' : ''
  const timezone = parent && 'timezone' in parent ? parent.timezone ?? 'Flexible' : 'Flexible'

  return {
    id: student.id,
    parentId: student.parent_id,
    name: fullName,
    firstName: student.first_name,
    lastName: student.last_name,
    gender: student.gender ?? '',
    dateOfBirth: student.date_of_birth ?? '',
    age: calculateAge(student.date_of_birth),
    nativeLanguage: student.native_language ?? '',
    country,
    timezone,
    selectedCourseId: 'course-dari-kids',
    courseCategory: 'Course assignment pending',
    courseName: 'Course assignment pending',
    classType: 'Group Class',
    currentLevel: student.current_level ?? 'New beginner',
    preferredClassTime: 'Schedule pending',
    notes: '',
    status: localStudentStatus(student.status),
    trialClassesAllowed: 2,
    referralCode: referralCode('STUDENT', student.id),
    registeredAt: new Date().toISOString().slice(0, 10),
    hasSeparateLogin: Boolean(student.profile_id)
  }
}

const maybeSingle = async <T>(query: PromiseLike<{ data: T | null; error: { message: string } | null }>) => {
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}

export const useRoleAuth = () => {
  const currentUser = useState<RoleSessionUser | null>('roshanayi-role-auth-user', () => null)
  const sessionLoaded = useState('roshanayi-role-auth-loaded', () => false)

  const cacheFamilyForParent = async (supabase: SupabaseClient, parent: ParentRow) => {
    const { cacheRegisteredFamily } = useFamilyAccounts()
    const registeredParent = toRegisteredParent(parent)
    const { data, error } = await supabase
      .from('students')
      .select('id,parent_id,profile_id,first_name,last_name,gender,date_of_birth,native_language,current_level,status')
      .eq('parent_id', parent.id)

    if (error) throw new Error(error.message)

    cacheRegisteredFamily(
      registeredParent,
      ((data ?? []) as StudentRow[]).map((student) => toRegisteredStudent(student, registeredParent))
    )
  }

  const buildSessionUser = async (supabase: SupabaseClient, authUser: User): Promise<RoleSessionUser> => {
    const profile = await maybeSingle<ProfileRow>(
      supabase
        .from('profiles')
        .select('id,role,full_name,email,username')
        .eq('id', authUser.id)
        .maybeSingle()
    )

    if (!profile) {
      throw new Error('No academy profile is connected to this account. Please contact Roshanayi support.')
    }

    const role = toAppRole(profile.role)
    if (!role) {
      throw new Error('This account has an unsupported role. Please contact Roshanayi support.')
    }

    if (role === 'parent') {
      const parent = await maybeSingle<ParentRow>(
        supabase
          .from('parents')
          .select('id,profile_id,full_name,email,whatsapp_number,country,city,timezone,relationship_to_student')
          .eq('profile_id', authUser.id)
          .maybeSingle()
      )

      if (!parent) {
        throw new Error('No parent record is connected to this account. Please contact Roshanayi support.')
      }

      await cacheFamilyForParent(supabase, parent)

      return {
        id: authUser.id,
        name: parent.full_name,
        email: parent.email,
        role,
        profileId: parent.id
      }
    }

    if (role === 'student') {
      const student = await maybeSingle<StudentRow>(
        supabase
          .from('students')
          .select('id,parent_id,profile_id,first_name,last_name,gender,date_of_birth,native_language,current_level,status')
          .eq('profile_id', authUser.id)
          .maybeSingle()
      )

      if (!student) {
        throw new Error('No student record is connected to this account. Please contact Roshanayi support.')
      }

      const parent = await maybeSingle<ParentRow>(
        supabase
          .from('parents')
          .select('id,profile_id,full_name,email,whatsapp_number,country,city,timezone,relationship_to_student')
          .eq('id', student.parent_id)
          .maybeSingle()
      )

      const registeredParent = parent ? toRegisteredParent(parent) : null
      useFamilyAccounts().cacheRegisteredFamily(
        registeredParent,
        [toRegisteredStudent(student, registeredParent)]
      )

      return {
        id: authUser.id,
        name: `${student.first_name} ${student.last_name}`.trim(),
        email: profile.username ?? profile.email ?? authUser.email ?? '',
        role,
        profileId: student.id
      }
    }

    if (role === 'teacher') {
      const teacher = await maybeSingle<TeacherRow>(
        supabase
          .from('teachers')
          .select('id,profile_id,display_name')
          .eq('profile_id', authUser.id)
          .maybeSingle()
      )

      return {
        id: authUser.id,
        name: teacher?.display_name ?? profile.full_name ?? authUser.email ?? 'Teacher',
        email: profile.email ?? authUser.email ?? '',
        role,
        profileId: teacher?.id
      }
    }

    return {
      id: authUser.id,
      name: profile.full_name ?? authUser.email ?? role,
      email: profile.email ?? authUser.email ?? '',
      role,
      profileId: profile.id
    }
  }

  const syncUser = async (force = false) => {
    if (!import.meta.client) {
      return currentUser.value
    }

    if (sessionLoaded.value && !force) {
      return currentUser.value
    }

    try {
      const supabase = useSupabase()
      const { data, error } = await supabase.auth.getSession()

      if (error) throw new Error(error.message)

      if (!data.session?.user) {
        currentUser.value = null
        return null
      }

      const user = await buildSessionUser(supabase, data.session.user)
      currentUser.value = user
      return user
    } catch {
      currentUser.value = null
      return null
    } finally {
      sessionLoaded.value = true
    }
  }

  const loginWithCredentials = async (identifier: string, password: string, _remember = true) => {
    const supabase = useSupabase()
    const normalizedIdentifier = normalizeIdentifier(identifier)

    try {
      let authEmail = normalizedIdentifier

      if (!validEmail(normalizedIdentifier)) {
        const usernameProfile = await maybeSingle<ProfileRow>(
          supabase
            .from('profiles')
            .select('id,role,full_name,email,username')
            .eq('username', normalizedIdentifier)
            .maybeSingle()
        )

        if (!usernameProfile?.email || usernameProfile.role !== 'student') {
          throw new Error('Invalid login credentials')
        }

        authEmail = usernameProfile.email
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password
      })

      if (error) throw new Error(error.message)
      if (!data.user) throw new Error('Login did not return a Supabase user.')

      const user = await buildSessionUser(supabase, data.user)
      currentUser.value = user
      sessionLoaded.value = true
      return user
    } catch (error) {
      throw new Error(toFriendlyAuthError(error instanceof Error ? error.message : 'Login failed.'))
    }
  }

  const logout = async () => {
    currentUser.value = null
    sessionLoaded.value = true

    if (!import.meta.client) return

    try {
      const supabase = useSupabase()
      await supabase.auth.signOut()
    } catch {
      // The local UI session is already cleared. A later login can refresh Supabase state.
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
    loginWithCredentials,
    logout,
    canAccessPath
  }
}
