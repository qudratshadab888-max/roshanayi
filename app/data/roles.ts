export type AcademyUserRole = 'super-admin' | 'manager' | 'teacher' | 'parent' | 'student'

export interface RoleDefinition {
  role: AcademyUserRole
  label: string
  shortLabel: string
  description: string
  dashboardPath: string
  permissions: string[]
  restrictedPermissions?: string[]
}

export interface RoleSessionUser {
  id: string
  name: string
  email: string
  role: AcademyUserRole
  profileId?: string
}

export const roleDefinitions: RoleDefinition[] = [
  {
    role: 'super-admin',
    label: 'Super Admin',
    shortLabel: 'Admin',
    description: 'Full academy ownership across users, learning operations, payments, reports, and settings.',
    dashboardPath: '/dashboard/admin',
    permissions: [
      'Manage managers',
      'Manage teachers',
      'Manage parents',
      'Manage students',
      'Manage courses',
      'Manage schedules',
      'Manage payments',
      'View all reports',
      'Academy settings',
      'System configuration'
    ]
  },
  {
    role: 'manager',
    label: 'Manager',
    shortLabel: 'Manager',
    description: 'Daily operations for teachers, families, classes, schedules, attendance, and payment follow-up.',
    dashboardPath: '/dashboard/manager',
    permissions: [
      'Manage teachers',
      'Manage parents',
      'Manage students',
      'Create classes',
      'Organize schedules',
      'Assign teachers to classes',
      'View reports',
      'Manage attendance issues',
      'Manage payment issues'
    ],
    restrictedPermissions: ['Super Admin settings', 'System configuration']
  },
  {
    role: 'teacher',
    label: 'Teacher',
    shortLabel: 'Teacher',
    description: 'Classroom tools limited to assigned classes and enrolled students.',
    dashboardPath: '/dashboard/teacher',
    permissions: [
      'View own classes',
      'Mark attendance',
      'Upload homework',
      'Review homework',
      'Give marks',
      'Create monthly reports',
      'Contact parents of own students'
    ]
  },
  {
    role: 'parent',
    label: 'Parent',
    shortLabel: 'Parent',
    description: 'One family account for children, progress, reports, payments, notifications, and teacher contact.',
    dashboardPath: '/dashboard/parent',
    permissions: [
      'View children list',
      'View attendance',
      'View homework',
      'View marks',
      'View monthly reports',
      'View payment status',
      'View notifications',
      'Contact teacher'
    ]
  },
  {
    role: 'student',
    label: 'Student',
    shortLabel: 'Student',
    description: 'Personal learning dashboard for courses, schedule, homework, materials, attendance, and marks.',
    dashboardPath: '/dashboard/student',
    permissions: [
      'View my courses',
      'View schedule',
      'View homework',
      'View learning materials',
      'View attendance',
      'View marks',
      'View notifications'
    ]
  }
]

export const roleOrder = roleDefinitions.map((definition) => definition.role)

export const roleDashboardPaths = Object.fromEntries(
  roleDefinitions.map((definition) => [definition.role, definition.dashboardPath])
) as Record<AcademyUserRole, string>

export const demoRoleUsers: RoleSessionUser[] = [
  {
    id: 'user-super-admin',
    name: 'Ayesha Rahimi',
    email: 'superadmin@roshanayi.academy',
    role: 'super-admin'
  },
  {
    id: 'user-manager',
    name: 'Nadia Operations',
    email: 'manager@roshanayi.academy',
    role: 'manager'
  },
  {
    id: 'user-teacher',
    name: 'Qari Idrees',
    email: 'teacher@roshanayi.academy',
    role: 'teacher',
    profileId: 'teacher-idrees'
  },
  {
    id: 'user-parent',
    name: 'Farzana Amini',
    email: 'parent@roshanayi.academy',
    role: 'parent',
    profileId: 'parent-farzana'
  },
  {
    id: 'user-student',
    name: 'Amina Amini',
    email: 'student@roshanayi.academy',
    role: 'student',
    profileId: 'student-amina'
  }
]

export const isAcademyUserRole = (value: unknown): value is AcademyUserRole =>
  typeof value === 'string' && roleOrder.includes(value as AcademyUserRole)

export const isRoleSessionUser = (value: unknown): value is RoleSessionUser => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const user = value as Partial<RoleSessionUser>

  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string' &&
    isAcademyUserRole(user.role)
  )
}

export const getRoleDefinition = (role: AcademyUserRole) =>
  roleDefinitions.find((definition) => definition.role === role) ?? roleDefinitions[4]!

export const getDashboardPathForRole = (role: AcademyUserRole) =>
  roleDashboardPaths[role]

export const getDemoUserByRole = (role: AcademyUserRole) =>
  demoRoleUsers.find((user) => user.role === role) ?? demoRoleUsers[4]!

export const getRoleFromDashboardPath = (path: string): AcademyUserRole | null =>
  roleDefinitions.find((definition) => path.startsWith(definition.dashboardPath))?.role ?? null

export const canRoleAccessDashboardPath = (role: AcademyUserRole, path: string) => {
  if (!path.startsWith('/dashboard')) {
    return true
  }

  if (path === '/dashboard') {
    return true
  }

  if (role === 'super-admin') {
    return true
  }

  return path.startsWith(getDashboardPathForRole(role))
}
