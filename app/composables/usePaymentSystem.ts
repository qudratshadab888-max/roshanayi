import { academyToday, getMonthlyEnrollmentRecord, getTrialLifecycleRecord } from '~/data/enrollmentLifecycle'
import {
  classSchedules,
  getCourseTitle,
  getParentName,
  managementCourses,
  managementParents,
  managementStudents
} from '~/data/management'
import { getPaymentPlan } from '~/data/paymentPlans'
import type {
  InvoiceStatus,
  ManualPaymentMethod,
  PaymentClassType,
  PaymentInvoice,
  PaymentNotification,
  PaymentReceipt,
  PaymentSubmission,
  StudentPaymentAccess
} from '~/types'

const storageKey = 'roshanayi-payment-system-v1'
const oneDayMs = 86_400_000

interface PaymentProfile {
  studentId: string
  studentName: string
  parentId: string
  parentName: string
  parentEmail: string
  courseId: string
  courseName: string
  classType: PaymentClassType
  amount: number
  trialEndDate: string
}

interface PaymentSystemState {
  version: 1
  invoices: PaymentInvoice[]
  receipts: PaymentReceipt[]
  submissions: PaymentSubmission[]
  access: StudentPaymentAccess[]
  notifications: PaymentNotification[]
}

export interface ManualPaymentInput {
  studentId: string
  paymentMethod: ManualPaymentMethod
  transactionId?: string
  paymentDate?: string
  receivedBy: string
}

const parseDate = (date: string) => {
  const [year = '0', month = '1', day = '1'] = date.split('-')
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
}

const toDate = (date: Date) => date.toISOString().slice(0, 10)
const addDays = (date: string, days: number) => toDate(new Date(parseDate(date).getTime() + days * oneDayMs))
const daysAfter = (date: string, comparedWith: string) =>
  Math.floor((parseDate(comparedWith).getTime() - parseDate(date).getTime()) / oneDayMs)
const currentDate = () => import.meta.client ? new Date().toISOString().slice(0, 10) : academyToday
const monthLabel = (date: string) => parseDate(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const uid = (prefix: string) => `${prefix}-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`

const seedInvoices: PaymentInvoice[] = [
  {
    id: 'INV-2026-0601', parentId: 'parent-farzana', parentName: 'Farzana Amini', studentId: 'student-amina', studentName: 'Amina Amini',
    courseId: 'course-dari-kids', courseName: 'Dari Foundations for Afghan Kids', classType: 'Group Class', amount: 30, currency: 'USD',
    invoiceDate: '2026-06-01', dueDate: '2026-06-01', status: 'Paid', billingPeriod: 'June 2026', createdAutomatically: true
  },
  {
    id: 'INV-2026-0605', parentId: 'parent-hamid', parentName: 'Hamid Karimi', studentId: 'student-hamza', studentName: 'Hamza Karimi',
    courseId: 'course-quran-reading', courseName: 'Quran Reading for Beginners', classType: 'Group Class', amount: 30, currency: 'USD',
    invoiceDate: '2026-06-05', dueDate: '2026-06-07', status: 'Overdue', billingPeriod: 'June 2026', createdAutomatically: true
  },
  {
    id: 'INV-2026-0622', parentId: 'parent-zahra', parentName: 'Zahra Noori', studentId: 'student-laila', studentName: 'Laila Noori',
    courseId: 'course-tajweed', courseName: 'Tajweed Essentials', classType: 'Special Class', amount: 100, currency: 'USD',
    invoiceDate: '2026-06-22', dueDate: '2026-06-23', status: 'Pending', billingPeriod: 'June 2026', createdAutomatically: true
  },
  {
    id: 'INV-2026-0612', parentId: 'parent-latif', parentName: 'Latif Safi', studentId: 'student-omar', studentName: 'Omar Safi',
    courseId: 'course-pashto-kids', courseName: 'Pashto Conversation for Kids', classType: 'Group Class', amount: 30, currency: 'USD',
    invoiceDate: '2026-06-12', dueDate: '2026-06-14', status: 'Overdue', billingPeriod: 'June 2026', createdAutomatically: true
  },
  {
    id: 'INV-2026-0501', parentId: 'parent-farzana', parentName: 'Farzana Amini', studentId: 'student-samira', studentName: 'Samira Amini',
    courseId: 'course-english-all', courseName: 'English Confidence Lab', classType: 'Group Class', amount: 30, currency: 'USD',
    invoiceDate: '2026-05-01', dueDate: '2026-05-31', status: 'Overdue', billingPeriod: 'May 2026', createdAutomatically: true
  }
]

const seedReceipts: PaymentReceipt[] = [
  {
    id: 'RCT-2026-0601', invoiceId: 'INV-2026-0601', parentId: 'parent-farzana', parentName: 'Farzana Amini',
    studentId: 'student-amina', studentName: 'Amina Amini', courseName: 'Dari Foundations for Afghan Kids', amountPaid: 30,
    currency: 'USD', paymentDate: '2026-06-01', paymentMethod: 'Bank Transfer', transactionId: 'BT-0601-AMINA', receivedBy: 'Ayesha Rahimi'
  }
]

const seedAccess: StudentPaymentAccess[] = [
  { studentId: 'student-amina', suspended: false, temporaryAccessAllowed: false, activeThrough: '2026-06-30', nextDueDate: '2026-07-01', updatedAt: '2026-06-01', updatedBy: 'Ayesha Rahimi' },
  { studentId: 'student-hamza', suspended: false, temporaryAccessAllowed: false, activeThrough: '', nextDueDate: '2026-06-07', updatedAt: '2026-06-07', updatedBy: 'System' },
  { studentId: 'student-laila', suspended: false, temporaryAccessAllowed: false, activeThrough: '', nextDueDate: '2026-06-23', updatedAt: '2026-06-22', updatedBy: 'System' },
  { studentId: 'student-omar', suspended: false, temporaryAccessAllowed: false, activeThrough: '', nextDueDate: '2026-06-14', updatedAt: '2026-06-16', updatedBy: 'System' },
  { studentId: 'student-samira', suspended: true, temporaryAccessAllowed: false, activeThrough: '2026-05-30', nextDueDate: '2026-05-31', updatedAt: '2026-06-02', updatedBy: 'Nadia Operations' }
]

const createSeedState = (): PaymentSystemState => ({
  version: 1,
  invoices: seedInvoices.map((invoice) => ({ ...invoice })),
  receipts: seedReceipts.map((receipt) => ({ ...receipt })),
  submissions: [],
  access: seedAccess.map((access) => ({ ...access })),
  notifications: []
})

const isPaymentState = (value: unknown): value is PaymentSystemState => {
  if (!value || typeof value !== 'object') return false
  const state = value as Partial<PaymentSystemState>
  return state.version === 1 && Array.isArray(state.invoices) && Array.isArray(state.receipts) &&
    Array.isArray(state.submissions) && Array.isArray(state.access) && Array.isArray(state.notifications)
}

export const usePaymentSystem = () => {
  const state = useState<PaymentSystemState>('roshanayi-payment-system', createSeedState)
  const loaded = useState('roshanayi-payment-system-loaded', () => false)
  const { registeredParents, registeredStudents } = useFamilyAccounts()

  const save = () => {
    if (import.meta.client) localStorage.setItem(storageKey, JSON.stringify(state.value))
  }

  const load = () => {
    if (!import.meta.client || loaded.value) return
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed: unknown = JSON.parse(stored)
        if (isPaymentState(parsed)) state.value = parsed
      }
    } catch {
      localStorage.removeItem(storageKey)
    } finally {
      loaded.value = true
    }
  }

  const paymentProfiles = computed<PaymentProfile[]>(() => {
    const staticProfiles = managementStudents.map((student) => {
      const schedule = classSchedules.find((item) => item.enrolledStudentIds.includes(student.id))
      const course = managementCourses.find((item) => item.id === student.selectedCourseId)
      const premium = Boolean(course?.category.includes('English Speakers'))
      const classType: PaymentClassType = premium
        ? 'Premium Language Program'
        : schedule?.classType === 'Special' || schedule?.classType === 'Premium'
          ? 'Special Class'
          : 'Group Class'
      return {
        studentId: student.id,
        studentName: student.name,
        parentId: student.parentId,
        parentName: getParentName(student.parentId),
        parentEmail: managementParents.find((parent) => parent.id === student.parentId)?.email ?? '',
        courseId: student.selectedCourseId,
        courseName: getCourseTitle(student.selectedCourseId),
        classType,
        amount: getPaymentPlan(classType).price,
        trialEndDate: getTrialLifecycleRecord(student.id)?.trialEndDate ?? ''
      }
    })

    const familyProfiles = registeredStudents.value.map((student) => {
      const parent = registeredParents.value.find((item) => item.id === student.parentId)
      const classType: PaymentClassType = student.classType.includes('Premium')
        ? 'Premium Language Program'
        : student.classType.includes('Special')
          ? 'Special Class'
          : 'Group Class'
      return {
        studentId: student.id,
        studentName: student.name,
        parentId: student.parentId,
        parentName: parent?.name ?? 'Parent',
        parentEmail: parent?.email ?? '',
        courseId: student.selectedCourseId,
        courseName: student.courseName,
        classType,
        amount: getPaymentPlan(classType).price,
        trialEndDate: addDays(student.registeredAt || currentDate(), 2)
      }
    })

    return [...staticProfiles, ...familyProfiles]
  })

  const addNotification = (notification: Omit<PaymentNotification, 'id' | 'read'> & { id?: string }) => {
    const id = notification.id ?? uid('notice')
    if (state.value.notifications.some((item) => item.id === id)) return
    state.value.notifications.push({ ...notification, id, read: false })
  }

  const invoiceFor = (profile: PaymentProfile, invoiceDate: string, dueDate = invoiceDate, automatic = true): PaymentInvoice => ({
    id: `INV-${invoiceDate.replaceAll('-', '')}-${profile.studentId.slice(-6).toUpperCase()}-${state.value.invoices.length + 1}`,
    parentId: profile.parentId,
    parentName: profile.parentName,
    studentId: profile.studentId,
    studentName: profile.studentName,
    courseId: profile.courseId,
    courseName: profile.courseName,
    classType: profile.classType,
    amount: profile.amount,
    currency: 'USD',
    invoiceDate,
    dueDate,
    status: 'Pending',
    billingPeriod: monthLabel(invoiceDate),
    createdAutomatically: automatic
  })

  const ensureAccess = (studentId: string) => {
    let access = state.value.access.find((item) => item.studentId === studentId)
    if (!access) {
      access = { studentId, suspended: false, temporaryAccessAllowed: false, activeThrough: '', nextDueDate: '', updatedAt: currentDate(), updatedBy: 'System' }
      state.value.access.push(access)
    }
    return access
  }

  const runWorkflow = () => {
    load()
    const today = currentDate()
    state.value.invoices.filter((invoice) => invoice.status !== 'Draft' && invoice.status !== 'Cancelled').forEach((invoice) => {
      ;(['parent', 'student'] as const).forEach((audience) => addNotification({
        id: `invoice-created-${audience}-${invoice.id}`,
        type: 'Invoice Created', audience, parentId: invoice.parentId, studentId: invoice.studentId,
        title: `Invoice ${invoice.id} created`, message: `A ${invoice.classType} invoice for $${invoice.amount} USD is available.`,
        createdAt: invoice.invoiceDate, priority: 'normal'
      }))
    })
    state.value.receipts.forEach((receipt) => {
      ;(['parent', 'student'] as const).forEach((audience) => {
        addNotification({
          id: `payment-received-${audience}-${receipt.id}`,
          type: 'Payment Received', audience, parentId: receipt.parentId, studentId: receipt.studentId,
          title: `Payment received for ${receipt.studentName}`, message: `Payment of $${receipt.amountPaid} USD was confirmed.`,
          createdAt: receipt.paymentDate, priority: 'normal'
        })
        addNotification({
          id: `receipt-generated-${audience}-${receipt.id}`,
          type: 'Receipt Generated', audience, parentId: receipt.parentId, studentId: receipt.studentId,
          title: `Receipt ${receipt.id} generated`, message: 'The payment receipt is ready to download.',
          createdAt: receipt.paymentDate, priority: 'normal'
        })
      })
    })
    paymentProfiles.value.forEach((profile) => {
      const studentInvoices = state.value.invoices.filter((invoice) => invoice.studentId === profile.studentId && invoice.status !== 'Cancelled')
      if (profile.trialEndDate && profile.trialEndDate < today && !studentInvoices.length) {
        const invoice = invoiceFor(profile, profile.trialEndDate)
        state.value.invoices.push(invoice)
        const access = ensureAccess(profile.studentId)
        access.nextDueDate = invoice.dueDate
        ;(['parent', 'student'] as const).forEach((audience) => {
          addNotification({
            id: `trial-ended-${audience}-${profile.studentId}`,
            type: 'Trial Ended: Payment Required', audience, parentId: profile.parentId, studentId: profile.studentId,
            title: audience === 'parent' ? `Trial ended for ${profile.studentName}` : 'Trial ended: payment required',
            message: `Invoice ${invoice.id} is ready. Payment of $${invoice.amount} USD is required to continue classes.`,
            createdAt: profile.trialEndDate, priority: 'high'
          })
          addNotification({
            id: `invoice-created-${audience}-${invoice.id}`,
            type: 'Invoice Created', audience, parentId: profile.parentId, studentId: profile.studentId,
            title: `Invoice ${invoice.id} created`, message: `A ${invoice.classType} invoice for $${invoice.amount} USD is now available.`,
            createdAt: invoice.invoiceDate, priority: 'normal'
          })
        })
      }

      state.value.invoices.filter((invoice) => invoice.studentId === profile.studentId && invoice.status === 'Pending').forEach((invoice) => {
        if (daysAfter(invoice.dueDate, today) > 2) invoice.status = 'Overdue'
        if (invoice.status === 'Pending') {
          ;(['parent', 'student'] as const).forEach((audience) => addNotification({
            id: `payment-due-${audience}-${invoice.id}`, type: 'Payment Due', audience, parentId: invoice.parentId, studentId: invoice.studentId,
            title: `Payment due for ${invoice.studentName}`, message: `Invoice ${invoice.id} is due on ${invoice.dueDate}.`,
            createdAt: invoice.dueDate, priority: 'normal'
          }))
        }
      })

      state.value.invoices.filter((invoice) => invoice.studentId === profile.studentId && invoice.status === 'Overdue').forEach((invoice) => {
        ;(['parent', 'student', 'manager'] as const).forEach((audience) => addNotification({
          id: `payment-overdue-${audience}-${invoice.id}`, type: 'Payment Overdue', audience, parentId: invoice.parentId, studentId: invoice.studentId,
          title: audience === 'manager' ? `${invoice.studentName} needs payment follow-up` : `Payment overdue for ${invoice.studentName}`,
          message: `Invoice ${invoice.id} is overdue. The student remains in the academy and may be suspended by a Manager.`,
          createdAt: addDays(invoice.dueDate, 3), priority: 'high'
        }))
      })

      const access = ensureAccess(profile.studentId)
      if (access.activeThrough && access.nextDueDate && access.nextDueDate <= today) {
        const renewalExists = state.value.invoices.some((invoice) =>
          invoice.studentId === profile.studentId && invoice.dueDate >= access.nextDueDate && invoice.status !== 'Cancelled'
        )
        if (!renewalExists) {
          const renewal = invoiceFor(profile, access.nextDueDate)
          state.value.invoices.push(renewal)
          ;(['parent', 'student'] as const).forEach((audience) => addNotification({
            id: `renewal-${audience}-${renewal.id}`, type: 'Invoice Created', audience, parentId: renewal.parentId, studentId: renewal.studentId,
            title: 'Monthly renewal invoice created', message: `Invoice ${renewal.id} is ready for the next 30-day enrollment period.`,
            createdAt: renewal.invoiceDate, priority: 'normal'
          }))
        }
      }
    })
    save()
  }

  const initialize = () => runWorkflow()

  const submitPayment = (invoiceId: string, paymentMethod: ManualPaymentMethod, transactionId = '') => {
    const invoice = state.value.invoices.find((item) => item.id === invoiceId)
    if (!invoice || invoice.status === 'Paid' || invoice.status === 'Cancelled') return false
    const existing = state.value.submissions.find((item) => item.invoiceId === invoiceId && item.status === 'Awaiting confirmation')
    if (existing) return true
    state.value.submissions.push({
      id: uid('submission'), invoiceId, studentId: invoice.studentId, paymentMethod,
      ...(transactionId.trim() ? { transactionId: transactionId.trim() } : {}),
      submittedAt: currentDate(), status: 'Awaiting confirmation'
    })
    addNotification({
      type: 'Payment Due', audience: 'manager', parentId: invoice.parentId, studentId: invoice.studentId,
      title: `Payment confirmation needed for ${invoice.studentName}`,
      message: `${invoice.parentName} submitted ${paymentMethod} details for invoice ${invoice.id}.`,
      createdAt: currentDate(), priority: 'high'
    })
    save()
    return true
  }

  const markPaymentReceived = (invoiceId: string, paymentMethod: ManualPaymentMethod, transactionId: string, receivedBy: string, paymentDate = currentDate()) => {
    const invoice = state.value.invoices.find((item) => item.id === invoiceId)
    if (!invoice || invoice.status === 'Cancelled') return null
    invoice.status = 'Paid'
    const existingReceipt = state.value.receipts.find((receipt) => receipt.invoiceId === invoiceId)
    const receipt: PaymentReceipt = existingReceipt ?? {
      id: `RCT-${paymentDate.replaceAll('-', '')}-${state.value.receipts.length + 1}`,
      invoiceId: invoice.id, parentId: invoice.parentId, parentName: invoice.parentName, studentId: invoice.studentId,
      studentName: invoice.studentName, courseName: invoice.courseName, amountPaid: invoice.amount, currency: 'USD', paymentDate,
      paymentMethod, ...(transactionId.trim() ? { transactionId: transactionId.trim() } : {}), receivedBy
    }
    if (!existingReceipt) state.value.receipts.push(receipt)
    state.value.submissions.filter((submission) => submission.invoiceId === invoiceId).forEach((submission) => { submission.status = 'Confirmed' })
    const access = ensureAccess(invoice.studentId)
    access.suspended = false
    access.temporaryAccessAllowed = false
    access.activeThrough = addDays(paymentDate, 29)
    access.nextDueDate = addDays(paymentDate, 30)
    access.updatedAt = paymentDate
    access.updatedBy = receivedBy
    ;(['parent', 'student'] as const).forEach((audience) => {
      addNotification({
        type: 'Payment Received', audience, parentId: invoice.parentId, studentId: invoice.studentId,
        title: `Payment received for ${invoice.studentName}`, message: `Invoice ${invoice.id} is paid. Access is active through ${access.activeThrough}.`,
        createdAt: paymentDate, priority: 'normal'
      })
      addNotification({
        type: 'Receipt Generated', audience, parentId: invoice.parentId, studentId: invoice.studentId,
        title: `Receipt ${receipt.id} generated`, message: 'Your payment receipt is ready to view and download.',
        createdAt: paymentDate, priority: 'normal'
      })
      addNotification({
        type: 'Access Reactivated', audience, parentId: invoice.parentId, studentId: invoice.studentId,
        title: `${invoice.studentName} access active`, message: `Class access is active through ${access.activeThrough}.`,
        createdAt: paymentDate, priority: 'normal'
      })
    })
    save()
    return receipt
  }

  const addManualPayment = (input: ManualPaymentInput) => {
    const profile = paymentProfiles.value.find((item) => item.studentId === input.studentId)
    if (!profile) return null
    let invoice = state.value.invoices.find((item) => item.studentId === input.studentId && ['Pending', 'Overdue', 'Draft'].includes(item.status))
    if (!invoice) {
      invoice = invoiceFor(profile, input.paymentDate ?? currentDate(), input.paymentDate ?? currentDate(), false)
      state.value.invoices.push(invoice)
    }
    return markPaymentReceived(invoice.id, input.paymentMethod, input.transactionId ?? '', input.receivedBy, input.paymentDate)
  }

  const setInvoiceStatus = (invoiceId: string, status: InvoiceStatus) => {
    const invoice = state.value.invoices.find((item) => item.id === invoiceId)
    if (!invoice || invoice.status === 'Paid') return false
    invoice.status = status
    save()
    return true
  }

  const suspendStudent = (studentId: string, updatedBy: string) => {
    const profile = paymentProfiles.value.find((item) => item.studentId === studentId)
    if (!profile) return false
    const access = ensureAccess(studentId)
    access.suspended = true
    access.temporaryAccessAllowed = false
    access.updatedAt = currentDate()
    access.updatedBy = updatedBy
    ;(['parent', 'student', 'manager'] as const).forEach((audience) => addNotification({
      type: 'Access Suspended', audience, parentId: profile.parentId, studentId,
      title: `${profile.studentName} access suspended`, message: 'Live class access is paused. The student account and learning records remain available.',
      createdAt: currentDate(), priority: 'high'
    }))
    save()
    return true
  }

  const reactivateStudent = (studentId: string, updatedBy: string, temporary = true) => {
    const profile = paymentProfiles.value.find((item) => item.studentId === studentId)
    if (!profile) return false
    const access = ensureAccess(studentId)
    access.suspended = false
    access.temporaryAccessAllowed = temporary
    access.updatedAt = currentDate()
    access.updatedBy = updatedBy
    ;(['parent', 'student', 'manager'] as const).forEach((audience) => addNotification({
      type: 'Access Reactivated', audience, parentId: profile.parentId, studentId,
      title: `${profile.studentName} access reactivated`, message: temporary ? 'A Manager allowed temporary class access while payment is reviewed.' : 'Class access has been reactivated.',
      createdAt: currentDate(), priority: 'normal'
    }))
    save()
    return true
  }

  const getStudentPaymentAccess = (studentId: string) => {
    const profile = paymentProfiles.value.find((item) => item.studentId === studentId)
    const access = ensureAccess(studentId)
    const latestInvoice = [...state.value.invoices]
      .filter((invoice) => invoice.studentId === studentId && invoice.status !== 'Cancelled')
      .sort((a, b) => b.invoiceDate.localeCompare(a.invoiceDate))[0]
    const today = currentDate()
    if (access.suspended) return { status: 'Suspended', canAccess: false, nextDueDate: access.nextDueDate, invoiceStatus: latestInvoice?.status ?? 'Pending', message: 'Live class access is suspended. You can still view this payment page and your learning records.' }
    if (access.activeThrough && access.activeThrough >= today) return { status: 'Active', canAccess: true, nextDueDate: access.nextDueDate, invoiceStatus: latestInvoice?.status ?? 'Paid', message: `Payment is confirmed. Access is active through ${access.activeThrough}.` }
    if (profile?.trialEndDate && profile.trialEndDate >= today) return { status: 'Trial', canAccess: true, nextDueDate: profile.trialEndDate, invoiceStatus: latestInvoice?.status ?? 'Draft', message: `The two-day trial is active through ${profile.trialEndDate}.` }
    if (latestInvoice?.status === 'Overdue') return { status: 'Needs Follow-up', canAccess: true, nextDueDate: latestInvoice.dueDate, invoiceStatus: latestInvoice.status, message: 'Payment is overdue. Access remains available until a Manager suspends it.' }
    if (access.temporaryAccessAllowed) return { status: 'Temporary Access', canAccess: true, nextDueDate: latestInvoice?.dueDate ?? access.nextDueDate, invoiceStatus: latestInvoice?.status ?? 'Pending', message: 'A Manager has temporarily allowed class access while payment is reviewed.' }
    return { status: 'Payment Required', canAccess: false, nextDueDate: latestInvoice?.dueDate ?? access.nextDueDate, invoiceStatus: latestInvoice?.status ?? 'Pending', message: 'Payment is required before live class access can continue.' }
  }

  const invoices = computed(() => { load(); return state.value.invoices })
  const receipts = computed(() => { load(); return state.value.receipts })
  const submissions = computed(() => { load(); return state.value.submissions })
  const notifications = computed(() => { load(); return state.value.notifications })
  const getInvoicesForParent = (parentId: string) => invoices.value.filter((invoice) => invoice.parentId === parentId)
  const getInvoicesForStudent = (studentId: string) => invoices.value.filter((invoice) => invoice.studentId === studentId)
  const getReceiptsForParent = (parentId: string) => receipts.value.filter((receipt) => receipt.parentId === parentId)
  const getReceiptsForStudent = (studentId: string) => receipts.value.filter((receipt) => receipt.studentId === studentId)
  const getNotificationsForParent = (parentId: string) => notifications.value.filter((item) => item.audience === 'parent' && item.parentId === parentId)
  const getNotificationsForStudent = (studentId: string) => notifications.value.filter((item) => item.audience === 'student' && item.studentId === studentId)
  const getManagerPaymentNotifications = () => notifications.value.filter((item) => item.audience === 'manager')

  return {
    initialize,
    invoices,
    receipts,
    submissions,
    paymentProfiles,
    submitPayment,
    markPaymentReceived,
    addManualPayment,
    setInvoiceStatus,
    suspendStudent,
    reactivateStudent,
    getStudentPaymentAccess,
    getInvoicesForParent,
    getInvoicesForStudent,
    getReceiptsForParent,
    getReceiptsForStudent,
    getNotificationsForParent,
    getNotificationsForStudent,
    getManagerPaymentNotifications
  }
}
