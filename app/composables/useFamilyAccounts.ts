import type { ManagementParent, ManagementStudent } from '~/types'

const familyStorageKey = 'roshanayi-family-profile-cache-v2'
const legacyCredentialStorageKey = 'roshanayi-family-accounts-v1'

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
  hasSeparateLogin: boolean
  loginIdentifier?: string
  registeredAt: string
}

interface FamilyProfileStore {
  version: 2
  parents: RegisteredParent[]
  students: RegisteredStudent[]
}

const emptyStore = (): FamilyProfileStore => ({
  version: 2,
  parents: [],
  students: []
})

const isStore = (value: unknown): value is FamilyProfileStore => {
  if (!value || typeof value !== 'object') return false
  const store = value as Partial<FamilyProfileStore>
  return store.version === 2 && Array.isArray(store.parents) && Array.isArray(store.students)
}

const upsertById = <T extends { id: string }>(items: T[], incoming: T[]) => {
  const next = new Map(items.map((item) => [item.id, item]))
  for (const item of incoming) {
    next.set(item.id, item)
  }
  return Array.from(next.values())
}

export const useFamilyAccounts = () => {
  const store = useState<FamilyProfileStore>('roshanayi-family-profile-store', emptyStore)
  const loaded = useState('roshanayi-family-profile-store-loaded', () => false)

  const load = () => {
    if (!import.meta.client || loaded.value) return

    try {
      localStorage.removeItem(legacyCredentialStorageKey)
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

  const cacheRegisteredFamily = (parent: RegisteredParent | null, students: RegisteredStudent[]) => {
    load()
    store.value = {
      version: 2,
      parents: parent ? upsertById(store.value.parents, [parent]) : store.value.parents,
      students: upsertById(store.value.students, students)
    }
    save()
  }

  const registeredParents = computed(() => {
    load()
    return store.value.parents
  })

  const registeredStudents = computed(() => {
    load()
    return store.value.students
  })

  const getRegisteredParent = (id: string) =>
    registeredParents.value.find((parent) => parent.id === id)

  const getRegisteredStudent = (id: string) =>
    registeredStudents.value.find((student) => student.id === id)

  const getRegisteredStudentsForParent = (parentId: string) =>
    registeredStudents.value.filter((student) => student.parentId === parentId)

  return {
    cacheRegisteredFamily,
    registeredParents,
    registeredStudents,
    getRegisteredParent,
    getRegisteredStudent,
    getRegisteredStudentsForParent
  }
}
