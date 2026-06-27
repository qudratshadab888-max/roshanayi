import type { RegisteredParent, RegisteredStudent } from '~/composables/useFamilyAccounts'

export type RegistrationSessionFlow = 'authenticated' | 'login_required' | 'email_confirmation_required'

export interface SupabaseStudentRegistrationInput {
  clientRequestId: string
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
  createSeparateLogin: boolean
  studentEmail?: string
  studentPassword?: string
}

export interface SupabaseFamilyRegistrationInput {
  requestKey: string
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
  children: SupabaseStudentRegistrationInput[]
}

export interface RegisterFamilyPayload {
  request_key: string
  parent: {
    full_name: string
    email: string
    whatsapp_number: string
    country: string
    city: string
    timezone: string
    relationship_to_student: string
  }
  parent_credentials: {
    email: string
    password: string
  }
  children: Array<{
    client_request_id: string
    first_name: string
    last_name: string
    gender: string
    date_of_birth: string
    age: number
    native_language: string
    current_level: string
    course_category: string
    course_name: string
    class_type: string
    schedule_preference: string
    create_separate_login: boolean
    student_credentials: {
      email: string
      password: string
    } | null
  }>
}

export interface FamilyRegistrationResult {
  requestKey: string
  parent: RegisteredParent
  students: RegisteredStudent[]
  sessionFlow: RegistrationSessionFlow
  message: string
}

interface BackendErrorDetails {
  code: string
  message: string
  field?: string
  retryable?: boolean
  status?: number
}

export class FamilyRegistrationError extends Error {
  code: string
  field?: string
  retryable: boolean
  status?: number

  constructor(details: BackendErrorDetails) {
    super(details.message)
    this.name = 'FamilyRegistrationError'
    this.code = details.code
    this.field = details.field
    this.retryable = Boolean(details.retryable)
    this.status = details.status
  }
}

const normalizeEmail = (value: string) => value.trim().toLowerCase()
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value))
const asRecord = (value: unknown): Record<string, unknown> | null =>
  value !== null && typeof value === 'object' ? value as Record<string, unknown> : null
const asString = (value: unknown) => typeof value === 'string' ? value : ''
const asBoolean = (value: unknown) => typeof value === 'boolean' ? value : undefined

const friendlyMessageForCode = (code: string, fallback: string) => {
  const messages: Record<string, string> = {
    INVALID_PAYLOAD: 'Please review the registration details and complete every required field.',
    VALIDATION_ERROR: 'Please review the highlighted registration information and try again.',
    PASSWORD_TOO_SHORT: 'Passwords must contain at least 8 characters.',
    PASSWORD_MISMATCH: 'The password and confirmation do not match.',
    PARENT_EMAIL_EXISTS: 'A parent account already exists with this email address. Please sign in instead.',
    STUDENT_EMAIL_EXISTS: 'A student account already exists with one of the supplied email addresses.',
    EMAIL_ALREADY_REGISTERED: 'An account already exists with this email address.',
    DUPLICATE_EMAIL: 'Each parent and student account must use a different email address.',
    RATE_LIMITED: 'Too many registration attempts were made. Please wait a moment and retry safely.',
    FUNCTION_NOT_FOUND: 'The register-family service is not deployed for this Supabase project.',
    INTERNAL_ERROR: 'Registration could not be completed right now. Your request can be retried safely.'
  }

  return messages[code] ?? fallback
}

const backendErrorDetails = (payload: unknown, fallback: string, status?: number): BackendErrorDetails => {
  const root = asRecord(payload)
  const nested = asRecord(root?.error)
  const source = nested ?? root
  const code = asString(source?.code) || (status === 404 ? 'FUNCTION_NOT_FOUND' : 'REGISTRATION_FAILED')
  const backendMessage = asString(source?.message) || asString(source?.error_description) || fallback

  return {
    code,
    message: friendlyMessageForCode(code, backendMessage || 'Registration could not be completed. Please try again.'),
    field: asString(source?.field) || undefined,
    retryable: asBoolean(source?.retryable) ?? Boolean(status && status >= 500),
    status
  }
}

const functionErrorDetails = async (error: unknown): Promise<BackendErrorDetails> => {
  const record = asRecord(error)
  const fallback = asString(record?.message) || 'Could not reach the registration service.'
  const context = record?.context

  if (typeof Response !== 'undefined' && context instanceof Response) {
    const status = context.status
    const payload = await context.clone().json().catch(() => null) as unknown
    return backendErrorDetails(payload, fallback, status)
  }

  const normalized = fallback.toLowerCase()
  if (normalized.includes('failed to send') || normalized.includes('fetch')) {
    return {
      code: 'NETWORK_ERROR',
      message: 'The registration service could not be reached. Check your connection and retry; the same request will be reused.',
      retryable: true
    }
  }

  return backendErrorDetails(record, fallback)
}

export const buildRegisterFamilyPayload = (input: SupabaseFamilyRegistrationInput): RegisterFamilyPayload => ({
  request_key: input.requestKey,
  parent: {
    full_name: input.parent.fullName.trim(),
    email: normalizeEmail(input.parent.email),
    whatsapp_number: input.parent.whatsappNumber.trim(),
    country: input.parent.country.trim(),
    city: input.parent.city.trim(),
    timezone: input.parent.timezone,
    relationship_to_student: input.parent.relationship
  },
  parent_credentials: {
    email: normalizeEmail(input.parent.email),
    password: input.parent.password
  },
  children: input.children.map((child) => ({
    client_request_id: child.clientRequestId,
    first_name: child.firstName.trim(),
    last_name: child.lastName.trim(),
    gender: child.gender,
    date_of_birth: child.dateOfBirth,
    age: child.age,
    native_language: child.nativeLanguage,
    current_level: child.currentLanguageLevel,
    course_category: child.courseCategory,
    course_name: child.courseName,
    class_type: child.classType,
    schedule_preference: child.schedulePreference,
    create_separate_login: child.createSeparateLogin,
    student_credentials: child.createSeparateLogin
      ? {
          email: normalizeEmail(child.studentEmail ?? ''),
          password: child.studentPassword ?? ''
        }
      : null
  }))
})

const referralCode = (prefix: string, id: string) => `${prefix}-${id.slice(0, 8).toUpperCase()}`

const responseBody = (data: unknown) => {
  const root = asRecord(data)
  if (!root) return null
  return asRecord(root.data) ?? asRecord(root.result) ?? root
}

const normalizeSessionFlow = (body: Record<string, unknown>, hasSession: boolean): RegistrationSessionFlow => {
  const raw = asString(body.session_flow ?? body.sessionFlow).toLowerCase()
  if (hasSession || ['authenticated', 'parent_dashboard', 'dashboard'].includes(raw)) return 'authenticated'
  if (['email_confirmation_required', 'confirm_email', 'confirmation_required'].includes(raw)) {
    return 'email_confirmation_required'
  }
  return 'login_required'
}

const registeredFamilyFromResponse = (
  body: Record<string, unknown>,
  input: SupabaseFamilyRegistrationInput
) => {
  const parentRow = asRecord(body.parent)
  const parentId = asString(parentRow?.id ?? body.parent_id) || input.requestKey
  const parent: RegisteredParent = {
    id: parentId,
    name: asString(parentRow?.full_name ?? parentRow?.name) || input.parent.fullName.trim(),
    email: asString(parentRow?.email) || normalizeEmail(input.parent.email),
    whatsapp: asString(parentRow?.whatsapp_number ?? parentRow?.whatsapp) || input.parent.whatsappNumber.trim(),
    country: asString(parentRow?.country) || input.parent.country.trim(),
    city: asString(parentRow?.city) || input.parent.city.trim(),
    timezone: asString(parentRow?.timezone) || input.parent.timezone,
    relationship: asString(parentRow?.relationship_to_student ?? parentRow?.relationship) || input.parent.relationship,
    referralCode: referralCode('FAMILY', parentId)
  }

  const returnedChildren = Array.isArray(body.children)
    ? body.children
    : Array.isArray(body.students)
      ? body.students
      : []

  const students = input.children.map((child, index) => {
    const row = returnedChildren
      .map(asRecord)
      .find((candidate) => asString(candidate?.client_request_id ?? candidate?.clientRequestId) === child.clientRequestId)
      ?? asRecord(returnedChildren[index])
    const studentId = asString(row?.id ?? row?.student_id) || child.clientRequestId
    const profileId = asString(row?.profile_id ?? row?.profileId)
    const hasSeparateLogin = asBoolean(row?.has_separate_login ?? row?.hasSeparateLogin)
      ?? Boolean(profileId || child.createSeparateLogin)

    const student: RegisteredStudent = {
      id: studentId,
      parentId,
      name: `${child.firstName.trim()} ${child.lastName.trim()}`.trim(),
      firstName: child.firstName.trim(),
      lastName: child.lastName.trim(),
      gender: child.gender,
      dateOfBirth: child.dateOfBirth,
      age: child.age,
      nativeLanguage: child.nativeLanguage,
      country: parent.country,
      timezone: parent.timezone,
      selectedCourseId: child.courseName,
      courseCategory: child.courseCategory,
      courseName: child.courseName,
      classType: child.classType,
      currentLevel: child.currentLanguageLevel,
      preferredClassTime: child.schedulePreference,
      notes: '',
      status: 'Trial',
      trialClassesAllowed: 2,
      referralCode: referralCode('STUDENT', studentId),
      registeredAt: new Date().toISOString().slice(0, 10),
      hasSeparateLogin,
      ...(child.studentEmail ? { loginIdentifier: normalizeEmail(child.studentEmail) } : {})
    }
    return student
  })

  return { parent, students }
}

export const useSupabaseRegistration = () => {
  const registerFamilyWithSupabase = async (input: SupabaseFamilyRegistrationInput): Promise<FamilyRegistrationResult> => {
    const parentEmail = normalizeEmail(input.parent.email)
    if (!validEmail(parentEmail)) throw new FamilyRegistrationError({ code: 'VALIDATION_ERROR', message: 'Enter a valid parent email address.' })
    if (input.parent.password.length < 8) throw new FamilyRegistrationError({ code: 'PASSWORD_TOO_SHORT', message: 'Parent password must contain at least 8 characters.' })

    const studentEmails = input.children
      .filter((child) => child.createSeparateLogin)
      .map((child) => normalizeEmail(child.studentEmail ?? ''))

    if (studentEmails.some((email) => !validEmail(email))) {
      throw new FamilyRegistrationError({ code: 'VALIDATION_ERROR', message: 'Every separate student account requires a valid email address.' })
    }
    if (new Set(studentEmails).size !== studentEmails.length || studentEmails.includes(parentEmail)) {
      throw new FamilyRegistrationError({ code: 'DUPLICATE_EMAIL', message: friendlyMessageForCode('DUPLICATE_EMAIL', '') })
    }
    if (input.children.some((child) => child.createSeparateLogin && (child.studentPassword?.length ?? 0) < 8)) {
      throw new FamilyRegistrationError({ code: 'PASSWORD_TOO_SHORT', message: 'Every student password must contain at least 8 characters.' })
    }

    const supabase = useSupabase()
    const payload = buildRegisterFamilyPayload(input)
    const { data, error } = await supabase.functions.invoke('register-family', { body: payload })

    if (error) throw new FamilyRegistrationError(await functionErrorDetails(error))

    const body = responseBody(data)
    if (!body) {
      throw new FamilyRegistrationError({
        code: 'INVALID_RESPONSE',
        message: 'Registration was received, but the service returned an unreadable response. Retry with the same request.',
        retryable: true
      })
    }
    if (body.success === false || body.error) {
      throw new FamilyRegistrationError(backendErrorDetails(body, 'Registration could not be completed.'))
    }

    const auth = asRecord(body.auth)
    const session = asRecord(body.session) ?? asRecord(auth?.session)
    const accessToken = asString(session?.access_token ?? body.access_token)
    const refreshToken = asString(session?.refresh_token ?? body.refresh_token)
    let hasSession = false
    let sessionMessage = ''
    if (accessToken && refreshToken) {
      const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
      if (sessionError) {
        sessionMessage = ' Registration succeeded, but the parent session could not be opened automatically. Please sign in.'
      } else {
        hasSession = true
      }
    }

    const family = registeredFamilyFromResponse(body, input)
    useFamilyAccounts().cacheRegisteredFamily(family.parent, family.students)

    return {
      requestKey: asString(body.request_key ?? body.requestKey) || input.requestKey,
      parent: family.parent,
      students: family.students,
      sessionFlow: sessionMessage ? 'login_required' : normalizeSessionFlow(body, hasSession),
      message: `${asString(body.message) || 'Your family registration has been completed successfully.'}${sessionMessage}`
    }
  }

  return { registerFamilyWithSupabase }
}
