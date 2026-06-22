import { demoRoleUsers, type RoleSessionUser } from '~/data/roles'
import type { ManagementParent, ManagementStudent, TeacherAccessAccount } from '~/types'

const familyStorageKey = 'roshanayi-family-accounts-v1'
const demoPasswordSalt = 'roshanayi-demo-v1'
const demoPasswordHash = '71d924c000edd8724df67324902018ae74b92c9fb7e39c2863eb58e63eb640be'
const passwordIterations = 210_000

export interface RegisteredParent extends ManagementParent {
  city: string
  relationship: string
}

export interface RegisteredStudent extends ManagementStudent {
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  nativeLanguage: string
  courseCategory: string
  courseName: string
  classType: string
  loginIdentifier?: string
  registeredAt: string
}

interface StoredCredential {
  id: string
  identifiers: string[]
  passwordSalt: string
  passwordHash: string
  user: RoleSessionUser
}

interface FamilyAccountStore {
  version: 1
  credentials: StoredCredential[]
  parents: RegisteredParent[]
  students: RegisteredStudent[]
}

export interface StudentRegistrationInput {
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  age: number
  nativeLanguage: string
  currentLanguageLevel: string
  courseCategory: string
  courseName: string
  classType: string
  schedulePreference: string
  studentIdentifier?: string
  studentPassword?: string
}

export interface FamilyRegistrationInput {
  parent: {
    fullName: string
    email: string
    whatsappNumber: string
    password: string
    country: string
    city: string
    timezone: string
    relationship: string
  }
  children: StudentRegistrationInput[]
}

const emptyStore = (): FamilyAccountStore => ({
  version: 1,
  credentials: [],
  parents: [],
  students: []
})

const normalizeIdentifier = (value: string) => value.trim().toLowerCase()

const createId = (prefix: string) => {
  const randomId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  return `${prefix}-${randomId}`
}

const createSalt = () => {
  const bytes = new Uint8Array(16)
  globalThis.crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

const hashPassword = async (password: string, salt: string) => {
  const encoder = new TextEncoder()
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const bits = await globalThis.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: encoder.encode(salt),
      iterations: passwordIterations
    },
    key,
    256
  )
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

const isStore = (value: unknown): value is FamilyAccountStore => {
  if (!value || typeof value !== 'object') return false
  const store = value as Partial<FamilyAccountStore>
  return store.version === 1 && Array.isArray(store.credentials) && Array.isArray(store.parents) && Array.isArray(store.students)
}

export const useFamilyAccounts = () => {
  const store = useState<FamilyAccountStore>('roshanayi-family-account-store', emptyStore)
  const loaded = useState('roshanayi-family-account-store-loaded', () => false)

  const load = () => {
    if (!import.meta.client || loaded.value) return

    try {
      const stored = localStorage.getItem(familyStorageKey)
      if (stored) {
        const parsed: unknown = JSON.parse(stored)
        if (isStore(parsed)) store.value = parsed
      }
    } catch {
      localStorage.removeItem(familyStorageKey)
    } finally {
      loaded.value = true
    }
  }

  const save = () => {
    if (import.meta.client) localStorage.setItem(familyStorageKey, JSON.stringify(store.value))
  }

  const identifierExists = (identifier: string) => {
    const normalized = normalizeIdentifier(identifier)
    const teacherAccounts = useState<TeacherAccessAccount[]>('teacher-application-access-accounts', () => [])
    return store.value.credentials.some((credential) => credential.identifiers.includes(normalized)) ||
      demoRoleUsers.some((user) => user.email.toLowerCase() === normalized) ||
      teacherAccounts.value.some((account) => account.email.toLowerCase() === normalized)
  }

  const registerFamily = async (input: FamilyRegistrationInput) => {
    load()
    const parentEmail = normalizeIdentifier(input.parent.email)

    if (identifierExists(parentEmail)) throw new Error('An account already exists with this parent email.')

    const studentIdentifiers = input.children
      .map((child) => normalizeIdentifier(child.studentIdentifier ?? ''))
      .filter(Boolean)
    if (new Set(studentIdentifiers).size !== studentIdentifiers.length) {
      throw new Error('Each student email or username must be unique.')
    }
    if (studentIdentifiers.includes(parentEmail)) {
      throw new Error('A student login cannot use the parent email address.')
    }
    if (studentIdentifiers.some(identifierExists)) {
      throw new Error('A student email or username is already in use.')
    }

    const parentId = createId('parent')
    const parentSalt = createSalt()
    const parentUser: RoleSessionUser = {
      id: createId('account'),
      name: input.parent.fullName.trim(),
      email: parentEmail,
      role: 'parent',
      profileId: parentId
    }
    const parentProfile: RegisteredParent = {
      id: parentId,
      name: input.parent.fullName.trim(),
      email: parentEmail,
      whatsapp: input.parent.whatsappNumber.trim(),
      country: input.parent.country.trim(),
      city: input.parent.city.trim(),
      timezone: input.parent.timezone,
      relationship: input.parent.relationship,
      referralCode: `FAMILY-${parentId.slice(-6).toUpperCase()}`
    }
    const parentCredential: StoredCredential = {
      id: parentUser.id,
      identifiers: [parentEmail],
      passwordSalt: parentSalt,
      passwordHash: await hashPassword(input.parent.password, parentSalt),
      user: parentUser
    }

    const students: RegisteredStudent[] = []
    const studentCredentials: StoredCredential[] = []
    for (const child of input.children) {
      const studentId = createId('student')
      const fullName = `${child.firstName.trim()} ${child.lastName.trim()}`.trim()
      const studentIdentifier = normalizeIdentifier(child.studentIdentifier ?? '')
      students.push({
        id: studentId,
        parentId,
        name: fullName,
        firstName: child.firstName.trim(),
        lastName: child.lastName.trim(),
        gender: child.gender,
        dateOfBirth: child.dateOfBirth,
        age: child.age,
        nativeLanguage: child.nativeLanguage,
        country: parentProfile.country,
        timezone: parentProfile.timezone,
        selectedCourseId: child.courseName,
        courseCategory: child.courseCategory,
        courseName: child.courseName,
        classType: child.classType,
        currentLevel: child.currentLanguageLevel,
        preferredClassTime: child.schedulePreference,
        notes: '',
        status: 'Trial',
        trialClassesAllowed: 2,
        referralCode: `STUDENT-${studentId.slice(-6).toUpperCase()}`,
        registeredAt: new Date().toISOString().slice(0, 10),
        ...(studentIdentifier ? { loginIdentifier: studentIdentifier } : {})
      })

      if (studentIdentifier && child.studentPassword) {
        const salt = createSalt()
        const email = studentIdentifier.includes('@') ? studentIdentifier : ''
        const user: RoleSessionUser = {
          id: createId('account'),
          name: fullName,
          email,
          role: 'student',
          profileId: studentId
        }
        studentCredentials.push({
          id: user.id,
          identifiers: [studentIdentifier],
          passwordSalt: salt,
          passwordHash: await hashPassword(child.studentPassword, salt),
          user
        })
      }
    }

    store.value = {
      version: 1,
      credentials: [...store.value.credentials, parentCredential, ...studentCredentials],
      parents: [...store.value.parents, parentProfile],
      students: [...store.value.students, ...students]
    }
    save()
    return parentUser
  }

  const authenticate = async (identifier: string, password: string) => {
    load()
    const normalized = normalizeIdentifier(identifier)
    const credential = store.value.credentials.find((item) => item.identifiers.includes(normalized))
    if (credential) {
      const passwordHash = await hashPassword(password, credential.passwordSalt)
      return passwordHash === credential.passwordHash ? credential.user : null
    }

    const demoUser = demoRoleUsers.find((user) => user.email.toLowerCase() === normalized)
    const passwordHash = await hashPassword(password, demoPasswordSalt)
    if (demoUser) return passwordHash === demoPasswordHash ? demoUser : null

    const teacherAccounts = useState<TeacherAccessAccount[]>('teacher-application-access-accounts', () => [])
    const teacher = teacherAccounts.value.find((account) => account.active && account.email.toLowerCase() === normalized)
    if (!teacher || passwordHash !== demoPasswordHash) return null
    return {
      id: teacher.id,
      name: teacher.displayName,
      email: teacher.email,
      role: 'teacher' as const,
      profileId: teacher.teacherId
    }
  }

  const registeredParents = computed(() => {
    load()
    return store.value.parents
  })
  const registeredStudents = computed(() => {
    load()
    return store.value.students
  })
  const getRegisteredParent = (id: string) => registeredParents.value.find((parent) => parent.id === id)
  const getRegisteredStudent = (id: string) => registeredStudents.value.find((student) => student.id === id)
  const getRegisteredStudentsForParent = (parentId: string) => registeredStudents.value.filter((student) => student.parentId === parentId)

  return {
    authenticate,
    registerFamily,
    registeredParents,
    registeredStudents,
    getRegisteredParent,
    getRegisteredStudent,
    getRegisteredStudentsForParent
  }
}
