import type {
  ManagementTeacher,
  Teacher,
  TeacherAccessAccount,
  TeacherApplication,
  TeacherApplicationStatus
} from '~/types'
import type { RoleSessionUser } from '~/data/roles'

export type TeacherApplicationSubmission = Omit<
  TeacherApplication,
  | 'id'
  | 'submittedAt'
  | 'updatedAt'
  | 'status'
  | 'internalNotes'
  | 'publicProfileApproved'
  | 'reviewedBy'
  | 'reviewedAt'
  | 'approvedTeacherId'
>

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
const today = () => new Date().toISOString()
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const initials = (value: string) => value.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('')

export const useTeacherApplications = () => {
  const applications = useState<TeacherApplication[]>('teacher-applications', () => [])
  const teacherProfiles = useState<Teacher[]>('approved-application-teacher-profiles', () => [])
  const teacherAccounts = useState<TeacherAccessAccount[]>('teacher-application-access-accounts', () => [])

  const submitApplication = (submission: TeacherApplicationSubmission) => {
    const submittedAt = today()
    const application: TeacherApplication = {
      ...submission,
      id: createId('teacher-application'),
      submittedAt,
      updatedAt: submittedAt,
      status: 'New',
      internalNotes: '',
      publicProfileApproved: false,
      reviewedBy: '',
      reviewedAt: '',
      approvedTeacherId: ''
    }
    applications.value.unshift(application)
    return application
  }

  const createApprovedTeacher = (application: TeacherApplication) => {
    const teacherId = application.approvedTeacherId || createId('teacher')
    const slug = `${slugify(application.displayName || application.fullName)}-${teacherId.slice(-6)}`
    const teacher: Teacher = {
      slug,
      name: application.displayName || application.fullName,
      role: `${application.profileSubjects[0] || application.subjects[0] || 'Online'} Teacher`,
      specialty: application.profileSubjects[0] || application.subjects[0] || 'Online Learning',
      location: [application.city, application.country].filter(Boolean).join(', '),
      experience: `${application.yearsExperience} ${application.yearsExperience === 1 ? 'year' : 'years'}`,
      credentials: application.educationLevel,
      bio: application.websiteBio,
      languages: [...application.profileLanguages],
      initials: initials(application.displayName || application.fullName),
      avatarClass: 'bg-purple-100 text-brand-purple dark:bg-purple-900 dark:text-purple-100',
      approach: application.professionalBio,
      photoUrl: application.profilePhoto?.url,
      subjects: [...application.profileSubjects]
    }

    const profileIndex = teacherProfiles.value.findIndex((item) => item.slug === slug || item.name === teacher.name)
    if (profileIndex >= 0) teacherProfiles.value[profileIndex] = teacher
    else teacherProfiles.value.push(teacher)

    const account: TeacherAccessAccount = {
      id: `user-${teacherId}`,
      teacherId,
      displayName: teacher.name,
      email: application.email.toLowerCase(),
      active: true,
      createdAt: today()
    }
    const accountIndex = teacherAccounts.value.findIndex((item) => item.email === account.email)
    if (accountIndex >= 0) teacherAccounts.value[accountIndex] = account
    else teacherAccounts.value.push(account)

    application.approvedTeacherId = teacherId
  }

  const reviewApplication = (
    applicationId: string,
    changes: { status: TeacherApplicationStatus; internalNotes: string; publicProfileApproved: boolean },
    reviewer: string
  ) => {
    const application = applications.value.find((item) => item.id === applicationId)
    if (!application) return

    Object.assign(application, changes, {
      reviewedBy: reviewer,
      reviewedAt: today(),
      updatedAt: today()
    })

    if (application.status === 'Approved') createApprovedTeacher(application)
    else {
      const account = teacherAccounts.value.find((item) => item.teacherId === application.approvedTeacherId)
      if (account) account.active = false
    }
  }

  const publicTeacherProfiles = computed(() => {
    const visibleNames = new Set(
      applications.value
        .filter((application) => application.status === 'Approved' && application.publicProfileApproved)
        .map((application) => application.displayName || application.fullName)
    )
    return teacherProfiles.value.filter((teacher) => visibleNames.has(teacher.name))
  })

  const approvedManagementTeachers = computed<ManagementTeacher[]>(() =>
    applications.value
      .filter((application) => application.status === 'Approved' && application.approvedTeacherId)
      .map((application) => ({
        id: application.approvedTeacherId,
        name: application.displayName || application.fullName,
        specialties: [...application.subjects],
        timezone: application.timezone,
        activeClasses: 0
      }))
  )

  const findApprovedTeacherUser = (email: string): RoleSessionUser | undefined => {
    const account = teacherAccounts.value.find((item) => item.active && item.email === email.trim().toLowerCase())
    return account
      ? { id: account.id, name: account.displayName, email: account.email, role: 'teacher', profileId: account.teacherId }
      : undefined
  }

  const getApplicationTeacherName = (teacherId: string) =>
    approvedManagementTeachers.value.find((teacher) => teacher.id === teacherId)?.name

  return {
    applications,
    teacherProfiles,
    teacherAccounts,
    publicTeacherProfiles,
    approvedManagementTeachers,
    submitApplication,
    reviewApplication,
    findApprovedTeacherUser,
    getApplicationTeacherName
  }
}
