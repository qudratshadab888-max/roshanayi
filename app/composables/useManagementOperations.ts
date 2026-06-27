import type { PostgrestFilterBuilder } from '@supabase/supabase-js'

export type ManagementQuickFilter =
  | ''
  | 'new'
  | 'trial-today'
  | 'trial-ended'
  | 'payment-due'
  | 'overdue'
  | 'follow-up'
  | 'absences'
  | 'no-class'
  | 'suspended'

export interface ManagementStudentFilters {
  search: string
  courseId: string
  classId: string
  teacherId: string
  classType: string
  trialStatus: string
  enrollmentStatus: string
  paymentStatus: string
  accountType: string
  ageGroup: string
  attendanceCondition: string
  studentStatus: string
  country: string
  registrationFrom: string
  registrationTo: string
  quick: ManagementQuickFilter
  sortBy: 'student_name' | 'registration_date' | 'next_payment_due_date' | 'attendance_rate' | 'last_activity'
  sortDirection: 'asc' | 'desc'
  page: number
  pageSize: number
}

export interface ManagementStudentRow {
  id: string
  student_name: string
  first_name: string
  last_name: string
  gender: string | null
  date_of_birth: string | null
  age: number | null
  native_language: string | null
  current_level: string | null
  student_record_status: string
  student_profile_id: string | null
  registration_date: string
  last_activity: string
  account_type: string
  parent_id: string
  parent_profile_id: string
  parent_name: string
  parent_email: string
  parent_whatsapp: string | null
  parent_relationship: string | null
  country: string | null
  city: string | null
  timezone: string | null
  enrollment_id: string | null
  enrollment_status: string | null
  enrollment_start_date: string | null
  enrollment_end_date: string | null
  class_id: string | null
  class_name: string | null
  class_type: string | null
  teacher_id: string | null
  teacher_name: string | null
  course_id: string | null
  course_name: string | null
  weekday: number | null
  start_time: string | null
  end_time: string | null
  schedule_timezone: string | null
  meeting_url: string | null
  invoice_id: string | null
  payment_status: string | null
  next_payment_due_date: string | null
  days_overdue: number
  attendance_records: number
  attended_records: number
  attendance_rate: number
  consecutive_absences: number
  late_records: number
  follow_up_id: string | null
  follow_up_reason: string | null
  follow_up_status: string | null
  follow_up_due_date: string | null
  last_contact_date: string | null
  next_follow_up_date: string | null
  student_status: string
  trial_status: string | null
  urgent_reasons: string[]
}

export interface ManagementOption {
  id: string
  label: string
  secondary?: string
}

export interface ManagementOverview {
  activeStudents: number
  trialStudents: number
  activePaidStudents: number
  paymentDueStudents: number
  overdueStudents: number
  suspendedStudents: number
  activeClasses: number
  teachers: number
  todayClasses: number
  needsFollowUp: number
}

export interface ManagementStudentDetail {
  student: ManagementStudentRow
  attendance: Array<{ id: string; attendance_date: string; status: string; notes: string | null; class_id: string }>
  reports: Array<{ id: string; report_month: string; summary: string | null; progress_notes: string | null; attendance_notes: string | null; homework_notes: string | null }>
  invoices: Array<{ id: string; invoice_number: string; amount: number; currency: string; invoice_date: string; due_date: string; status: string; notes: string | null }>
  payments: Array<{ id: string; invoice_id: string; amount: number; currency: string; payment_method: string; status: string; payment_date: string | null; transaction_id: string | null; notes: string | null }>
  notifications: Array<{ id: string; type: string; title: string; message: string; is_read: boolean; created_at: string }>
  followUps: Array<{ id: string; reason: string; due_date: string | null; status: string; manager_notes: string | null; last_contact_date: string | null; next_follow_up_date: string | null; created_at: string }>
  followUpHistory: Array<{ id: string; follow_up_id: string; action: string; note: string | null; status: string | null; created_at: string }>
  homework: Array<{ id: string; submitted_at: string | null; status: string; teacher_feedback: string | null; grade: string | null }>
}

const emptyFilters = (): ManagementStudentFilters => ({
  search: '',
  courseId: '',
  classId: '',
  teacherId: '',
  classType: '',
  trialStatus: '',
  enrollmentStatus: '',
  paymentStatus: '',
  accountType: '',
  ageGroup: '',
  attendanceCondition: '',
  studentStatus: '',
  country: '',
  registrationFrom: '',
  registrationTo: '',
  quick: '',
  sortBy: 'last_activity',
  sortDirection: 'desc',
  page: 1,
  pageSize: 20
})

const safeSearch = (value: string) => value.trim().replace(/[%(),]/g, ' ')
const isoDate = (date: Date) => date.toISOString().slice(0, 10)
const addDays = (date: Date, days: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return isoDate(next)
}

export const managementAttendanceConfig = {
  consecutiveAbsences: 2,
  lowAttendancePercent: 70,
  repeatedLateCount: 3
} as const

export const useManagementOperations = () => {
  const filters = reactive<ManagementStudentFilters>(emptyFilters())
  const students = ref<ManagementStudentRow[]>([])
  const totalStudents = ref(0)
  const overview = ref<ManagementOverview>({
    activeStudents: 0,
    trialStudents: 0,
    activePaidStudents: 0,
    paymentDueStudents: 0,
    overdueStudents: 0,
    suspendedStudents: 0,
    activeClasses: 0,
    teachers: 0,
    todayClasses: 0,
    needsFollowUp: 0
  })
  const urgentStudents = ref<ManagementStudentRow[]>([])
  const courses = ref<ManagementOption[]>([])
  const classes = ref<ManagementOption[]>([])
  const teachers = ref<ManagementOption[]>([])
  const countries = ref<string[]>([])
  const loading = ref(false)
  const errorMessage = ref('')

  type StudentFilterBuilder = PostgrestFilterBuilder<any, any, any, any, any, any, any, any>

  const applyStudentFilters = <Query extends StudentFilterBuilder>(initialQuery: Query): Query => {
    let query: StudentFilterBuilder = initialQuery
    const search = safeSearch(filters.search)
    if (search) {
      query = query.or(`student_name.ilike.%${search}%,parent_name.ilike.%${search}%,parent_email.ilike.%${search}%,parent_whatsapp.ilike.%${search}%,course_name.ilike.%${search}%,class_name.ilike.%${search}%,teacher_name.ilike.%${search}%`)
    }
    if (filters.courseId) query = query.eq('course_id', filters.courseId)
    if (filters.classId) query = query.eq('class_id', filters.classId)
    if (filters.teacherId) query = query.eq('teacher_id', filters.teacherId)
    if (filters.classType) query = query.eq('class_type', filters.classType)
    if (filters.trialStatus) query = query.eq('trial_status', filters.trialStatus)
    if (filters.enrollmentStatus) query = query.eq('enrollment_status', filters.enrollmentStatus)
    if (filters.paymentStatus) query = query.eq('payment_status', filters.paymentStatus)
    if (filters.accountType) query = query.eq('account_type', filters.accountType)
    if (filters.studentStatus) query = query.eq('student_status', filters.studentStatus)
    if (filters.country) query = query.eq('country', filters.country)
    if (filters.registrationFrom) query = query.gte('registration_date', `${filters.registrationFrom}T00:00:00`)
    if (filters.registrationTo) query = query.lte('registration_date', `${filters.registrationTo}T23:59:59`)

    if (filters.ageGroup === 'under-13') query = query.lt('age', 13)
    if (filters.ageGroup === '13-17') query = query.gte('age', 13).lte('age', 17)
    if (filters.ageGroup === 'adult') query = query.gte('age', 18)
    if (filters.attendanceCondition === 'low') query = query.lt('attendance_rate', managementAttendanceConfig.lowAttendancePercent)
    if (filters.attendanceCondition === 'absences') query = query.gte('consecutive_absences', managementAttendanceConfig.consecutiveAbsences)
    if (filters.attendanceCondition === 'late') query = query.gte('late_records', managementAttendanceConfig.repeatedLateCount)
    if (filters.attendanceCondition === 'none') query = query.eq('attendance_records', 0)

    const sevenDaysAgo = addDays(new Date(), -7)
    if (filters.quick === 'new') query = query.gte('registration_date', `${sevenDaysAgo}T00:00:00`)
    if (filters.quick === 'trial-today') query = query.eq('trial_status', 'Trial Ends Today')
    if (filters.quick === 'trial-ended') query = query.eq('trial_status', 'Trial Ended')
    if (filters.quick === 'payment-due') query = query.eq('student_status', 'Pending Payment')
    if (filters.quick === 'overdue') query = query.eq('student_status', 'Payment Overdue')
    if (filters.quick === 'follow-up') query = query.not('follow_up_id', 'is', null)
    if (filters.quick === 'absences') query = query.gte('consecutive_absences', managementAttendanceConfig.consecutiveAbsences)
    if (filters.quick === 'no-class') query = query.is('class_id', null)
    if (filters.quick === 'suspended') query = query.eq('student_status', 'Suspended')

    return query as Query
  }

  const loadStudents = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
      const supabase = useSupabase()
      const from = (filters.page - 1) * filters.pageSize
      const to = from + filters.pageSize - 1
      let query = supabase.from('management_student_directory').select('*', { count: 'exact' })
      query = applyStudentFilters(query)
      const { data, count, error } = await query
        .order(filters.sortBy, { ascending: filters.sortDirection === 'asc', nullsFirst: false })
        .range(from, to)
      if (error) throw new Error(error.message)
      students.value = (data ?? []) as ManagementStudentRow[]
      totalStudents.value = count ?? 0
    } catch (error) {
      students.value = []
      totalStudents.value = 0
      errorMessage.value = error instanceof Error ? error.message : 'Student records could not be loaded.'
    } finally {
      loading.value = false
    }
  }

  const loadOptions = async () => {
    const supabase = useSupabase()
    const [courseResult, classResult, teacherResult, countryResult] = await Promise.all([
      supabase.from('courses').select('id,title,status').order('title'),
      supabase.from('classes').select('id,name,status').order('name'),
      supabase.from('teachers').select('id,display_name,status').order('display_name'),
      supabase.from('parents').select('country').not('country', 'is', null)
    ])
    const firstError = courseResult.error ?? classResult.error ?? teacherResult.error ?? countryResult.error
    if (firstError) throw new Error(firstError.message)
    courses.value = (courseResult.data ?? []).map((row) => ({ id: row.id, label: row.title, secondary: row.status }))
    classes.value = (classResult.data ?? []).map((row) => ({ id: row.id, label: row.name, secondary: row.status }))
    teachers.value = (teacherResult.data ?? []).map((row) => ({ id: row.id, label: row.display_name || 'Unnamed teacher', secondary: row.status }))
    countries.value = Array.from(new Set((countryResult.data ?? []).map((row) => row.country).filter((value): value is string => Boolean(value)))).sort()
  }

  const loadOverview = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
      const supabase = useSupabase()
      const weekday = new Date().getDay()
      const baseCount = () => supabase.from('management_student_directory').select('id', { count: 'exact', head: true })
      const results = await Promise.all([
        baseCount().eq('student_status', 'Active'),
        baseCount().eq('enrollment_status', 'trial'),
        baseCount().eq('enrollment_status', 'active').eq('payment_status', 'paid'),
        baseCount().eq('student_status', 'Pending Payment'),
        baseCount().eq('student_status', 'Payment Overdue'),
        baseCount().eq('student_status', 'Suspended'),
        supabase.from('classes').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('class_schedules').select('id', { count: 'exact', head: true }).eq('weekday', weekday),
        supabase.from('student_follow_ups').select('id', { count: 'exact', head: true }).neq('status', 'resolved'),
        supabase.from('management_student_directory').select('*').limit(50)
      ])
      const firstError = results.find((result) => result.error)?.error
      if (firstError) throw new Error(firstError.message)
      overview.value = {
        activeStudents: results[0].count ?? 0,
        trialStudents: results[1].count ?? 0,
        activePaidStudents: results[2].count ?? 0,
        paymentDueStudents: results[3].count ?? 0,
        overdueStudents: results[4].count ?? 0,
        suspendedStudents: results[5].count ?? 0,
        activeClasses: results[6].count ?? 0,
        teachers: results[7].count ?? 0,
        todayClasses: results[8].count ?? 0,
        needsFollowUp: results[9].count ?? 0
      }
      urgentStudents.value = ((results[10].data ?? []) as ManagementStudentRow[])
        .filter((row) => row.urgent_reasons?.length)
        .slice(0, 12)
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Management overview could not be loaded.'
      urgentStudents.value = []
    } finally {
      loading.value = false
    }
  }

  const loadStudentDetail = async (studentId: string): Promise<ManagementStudentDetail> => {
    const supabase = useSupabase()
    const { data: directoryRow, error: directoryError } = await supabase
      .from('management_student_directory')
      .select('*')
      .eq('id', studentId)
      .maybeSingle()
    if (directoryError) throw new Error(directoryError.message)
    if (!directoryRow) throw new Error('Student record was not found or is not available to this account.')

    const [attendanceResult, reportsResult, invoicesResult, paymentsResult, notificationsResult, followUpsResult, homeworkResult] = await Promise.all([
      supabase.from('attendance').select('id,attendance_date,status,notes,class_id').eq('student_id', studentId).order('attendance_date', { ascending: false }).limit(100),
      supabase.from('monthly_reports').select('id,report_month,summary,progress_notes,attendance_notes,homework_notes').eq('student_id', studentId).order('report_month', { ascending: false }),
      supabase.from('invoices').select('id,invoice_number,amount,currency,invoice_date,due_date,status,notes').eq('student_id', studentId).order('due_date', { ascending: false }),
      supabase.from('payments').select('id,invoice_id,amount,currency,payment_method,status,payment_date,transaction_id,notes').eq('student_id', studentId).order('created_at', { ascending: false }),
      supabase.from('notifications').select('id,type,title,message,is_read,created_at').eq('student_id', studentId).order('created_at', { ascending: false }).limit(100),
      supabase.from('student_follow_ups').select('id,reason,due_date,status,manager_notes,last_contact_date,next_follow_up_date,created_at').eq('student_id', studentId).order('created_at', { ascending: false }),
      supabase.from('homework_submissions').select('id,submitted_at,status,teacher_feedback,grade').eq('student_id', studentId).order('created_at', { ascending: false }).limit(100)
    ])
    const firstError = [attendanceResult, reportsResult, invoicesResult, paymentsResult, notificationsResult, followUpsResult, homeworkResult].find((result) => result.error)?.error
    if (firstError) throw new Error(firstError.message)
    const followUpIds = (followUpsResult.data ?? []).map((row) => row.id)
    const historyResult = followUpIds.length
      ? await supabase.from('student_follow_up_history').select('id,follow_up_id,action,note,status,created_at').in('follow_up_id', followUpIds).order('created_at', { ascending: false })
      : { data: [], error: null }
    if (historyResult.error) throw new Error(historyResult.error.message)

    return {
      student: directoryRow as ManagementStudentRow,
      attendance: attendanceResult.data ?? [],
      reports: reportsResult.data ?? [],
      invoices: (invoicesResult.data ?? []).map((row) => ({ ...row, amount: Number(row.amount) })),
      payments: (paymentsResult.data ?? []).map((row) => ({ ...row, amount: Number(row.amount) })),
      notifications: notificationsResult.data ?? [],
      followUps: followUpsResult.data ?? [],
      followUpHistory: historyResult.data ?? [],
      homework: homeworkResult.data ?? []
    }
  }

  const updateStudent = async (studentId: string, values: Record<string, string | null>) => {
    const { error } = await useSupabase().from('students').update(values).eq('id', studentId)
    if (error) throw new Error(error.message)
  }

  const updateParent = async (parentId: string, values: Record<string, string | null>) => {
    const { error } = await useSupabase().from('parents').update(values).eq('id', parentId)
    if (error) throw new Error(error.message)
  }

  const assignClass = async (studentId: string, classId: string, status = 'active') => {
    const today = new Date()
    const supabase = useSupabase()
    const { error: previousEnrollmentError } = await supabase
      .from('enrollments')
      .update({ status: 'cancelled' })
      .eq('student_id', studentId)
      .neq('class_id', classId)
      .in('status', ['trial', 'active', 'pending_payment', 'suspended'])

    if (previousEnrollmentError) throw new Error(previousEnrollmentError.message)

    const { error } = await supabase.from('enrollments').upsert({
      student_id: studentId,
      class_id: classId,
      status,
      start_date: isoDate(today),
      end_date: addDays(today, status === 'trial' ? 2 : 30)
    }, { onConflict: 'student_id,class_id' })
    if (error) throw new Error(error.message)
  }

  const changeTeacher = async (classId: string, teacherId: string) => {
    const { error } = await useSupabase().from('classes').update({ teacher_id: teacherId }).eq('id', classId)
    if (error) throw new Error(error.message)
  }

  const changeClassType = async (classId: string, classType: string) => {
    const { error } = await useSupabase().from('classes').update({ class_type: classType }).eq('id', classId)
    if (error) throw new Error(error.message)
  }

  const updateEnrollment = async (enrollmentId: string, values: Record<string, string | null>) => {
    const { error } = await useSupabase().from('enrollments').update(values).eq('id', enrollmentId)
    if (error) throw new Error(error.message)
  }

  const extendTrial = (enrollmentId: string, days: number) =>
    updateEnrollment(enrollmentId, { status: 'trial', end_date: addDays(new Date(), days) })

  const activateEnrollment = (enrollmentId: string) => {
    const today = new Date()
    return updateEnrollment(enrollmentId, { status: 'active', start_date: isoDate(today), end_date: addDays(today, 30) })
  }

  const extendAccess = (enrollmentId: string, days: number) =>
    updateEnrollment(enrollmentId, { status: 'active', end_date: addDays(new Date(), days) })

  const setSuspended = async (studentId: string, enrollmentId: string | null, suspended: boolean) => {
    const supabase = useSupabase()
    const studentResult = await supabase.from('students').update({ status: suspended ? 'suspended' : 'active' }).eq('id', studentId)
    if (studentResult.error) throw new Error(studentResult.error.message)
    if (enrollmentId) {
      const enrollmentResult = await supabase.from('enrollments').update({ status: suspended ? 'suspended' : 'active' }).eq('id', enrollmentId)
      if (enrollmentResult.error) throw new Error(enrollmentResult.error.message)
    }
  }

  const removeFromClass = (enrollmentId: string) => updateEnrollment(enrollmentId, { status: 'cancelled' })

  const createInvoice = async (student: ManagementStudentRow, amount: number, dueDate: string, notes: string) => {
    if (!student.enrollment_id) throw new Error('Assign the student to a class before creating an invoice.')
    const invoiceNumber = `ROS-${Date.now()}-${student.id.slice(0, 6).toUpperCase()}`
    const { error } = await useSupabase().from('invoices').insert({
      invoice_number: invoiceNumber,
      parent_id: student.parent_id,
      student_id: student.id,
      enrollment_id: student.enrollment_id,
      amount,
      currency: 'USD',
      due_date: dueDate,
      status: 'pending',
      notes
    })
    if (error) throw new Error(error.message)
  }

  const markPaymentReceived = async (student: ManagementStudentRow, amount: number, method: string, transactionId: string) => {
    if (!student.invoice_id || !student.enrollment_id) throw new Error('This student does not have an invoice and enrollment to receive payment against.')
    const supabase = useSupabase()
    const { data: authData } = await supabase.auth.getUser()
    const paymentResult = await supabase.from('payments').insert({
      invoice_id: student.invoice_id,
      parent_id: student.parent_id,
      student_id: student.id,
      enrollment_id: student.enrollment_id,
      amount,
      currency: 'USD',
      payment_method: method,
      status: 'received',
      payment_date: new Date().toISOString(),
      transaction_id: transactionId || null,
      received_by_profile_id: authData.user?.id ?? null
    })
    if (paymentResult.error) throw new Error(paymentResult.error.message)
    const invoiceResult = await supabase.from('invoices').update({ status: 'paid' }).eq('id', student.invoice_id)
    if (invoiceResult.error) throw new Error(invoiceResult.error.message)
    await activateEnrollment(student.enrollment_id)
  }

  const addFollowUp = async (studentId: string, reason: string, note: string, dueDate: string, status = 'not_contacted') => {
    const supabase = useSupabase()
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) throw new Error('Your authenticated manager session is required.')
    const { data, error } = await supabase.from('student_follow_ups').insert({
      student_id: studentId,
      reason,
      manager_notes: note || null,
      due_date: dueDate || null,
      status,
      created_by_profile_id: authData.user.id,
      last_contact_date: status === 'contact_attempted' ? new Date().toISOString() : null
    }).select('id').single()
    if (error) throw new Error(error.message)
    const historyError = await supabase.from('student_follow_up_history').insert({
      follow_up_id: data.id,
      action: 'Follow-up created',
      note: note || null,
      status,
      created_by_profile_id: authData.user.id
    })
    if (historyError.error) throw new Error(historyError.error.message)
  }

  const updateFollowUp = async (followUpId: string, status: string, note: string, nextDate: string) => {
    const supabase = useSupabase()
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) throw new Error('Your authenticated manager session is required.')
    const values = {
      status,
      manager_notes: note || null,
      next_follow_up_date: nextDate || null,
      last_contact_date: ['contact_attempted', 'parent_responded', 'payment_promised'].includes(status) ? new Date().toISOString() : null,
      resolved_at: status === 'resolved' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    }
    const result = await supabase.from('student_follow_ups').update(values).eq('id', followUpId)
    if (result.error) throw new Error(result.error.message)
    const history = await supabase.from('student_follow_up_history').insert({
      follow_up_id: followUpId,
      action: 'Status updated',
      note: note || null,
      status,
      created_by_profile_id: authData.user.id
    })
    if (history.error) throw new Error(history.error.message)
  }

  const sendNotification = async (student: ManagementStudentRow, title: string, message: string, recipient: 'parent' | 'student') => {
    const recipientProfileId = recipient === 'student' ? student.student_profile_id : student.parent_profile_id
    if (!recipientProfileId) throw new Error(`The ${recipient} does not have a linked profile for notifications.`)
    const { error } = await useSupabase().from('notifications').insert({
      recipient_profile_id: recipientProfileId,
      parent_id: student.parent_id,
      student_id: student.id,
      type: 'manager_message',
      title,
      message
    })
    if (error) throw new Error(error.message)
  }

  const deleteStudentPermanently = async (studentId: string) => {
    if (useManagementAccess().verifiedRole.value !== 'super_admin') throw new Error('Only a Super Admin can permanently delete a student.')
    const { error } = await useSupabase().rpc('delete_student_permanently', { target_student_id: studentId })
    if (error) throw new Error(error.message)
  }

  const resetFilters = () => Object.assign(filters, emptyFilters())

  return {
    filters,
    students,
    totalStudents,
    overview,
    urgentStudents,
    courses,
    classes,
    teachers,
    countries,
    loading,
    errorMessage,
    loadStudents,
    loadOptions,
    loadOverview,
    loadStudentDetail,
    updateStudent,
    updateParent,
    assignClass,
    changeTeacher,
    changeClassType,
    extendTrial,
    activateEnrollment,
    extendAccess,
    setSuspended,
    removeFromClass,
    createInvoice,
    markPaymentReceived,
    addFollowUp,
    updateFollowUp,
    sendNotification,
    deleteStudentPermanently,
    resetFilters
  }
}
