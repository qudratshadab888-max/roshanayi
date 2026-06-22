import {
  classSchedules,
  getCourseTitle,
  getParentName,
  getPaymentForStudent,
  managementStudents
} from '~/data/management'

export const academyToday = '2026-06-22'

export const trialEndedMessage =
  'Your 2-day trial has ended. Please complete registration and payment to continue your classes.'

export const monthlyEnrollmentEndedMessage =
  'Your monthly enrollment period has ended. Please renew your payment to continue classes.'

export type TrialLifecycleStatus =
  | 'Active Trial'
  | 'Trial Ended'
  | 'Payment Required'
  | 'Paid'
  | 'Unpaid'
  | 'Suspended'

export type EnrollmentLifecycleStatus =
  | 'Active'
  | 'Paid'
  | 'Unpaid'
  | 'Payment Due'
  | 'Payment Overdue'
  | 'Suspended'

export type AcademyNotificationType =
  | 'Trial Ending'
  | 'Trial Ended'
  | 'Payment Due'
  | 'Payment Overdue'
  | 'Follow-Up Required'
  | 'Student Suspended'
  | 'Student Reactivated'

export type NotificationAudience = 'parent' | 'student' | 'manager'

export interface TrialLifecycleRecord {
  studentId: string
  trialStartDate: string
  trialEndDate: string
  trialStatus: TrialLifecycleStatus
}

export interface MonthlyEnrollmentRecord {
  studentId: string
  paymentDate: string
  enrollmentStartDate: string
  enrollmentEndDate: string
  nextDueDate: string
  status: EnrollmentLifecycleStatus
}

export interface AcademyNotification {
  id: string
  type: AcademyNotificationType
  audience: NotificationAudience
  studentId: string
  parentId: string
  title: string
  message: string
  createdAt: string
  priority: 'low' | 'normal' | 'high'
  read: boolean
}

export interface StudentLifecycleSummary {
  studentId: string
  studentName: string
  parentId: string
  parentName: string
  courseId: string
  courseTitle: string
  trialStartDate: string
  trialEndDate: string
  trialStatus: TrialLifecycleStatus
  paymentDate: string
  enrollmentStartDate: string
  enrollmentEndDate: string
  nextDueDate: string
  paymentStatus: EnrollmentLifecycleStatus
  daysOverdue: number
  accessStatus: 'Active' | 'Trial' | 'Payment Required' | 'Suspended'
  canAccessClass: boolean
  actionRequired: string
}

export interface ManagerOverduePaymentRow extends StudentLifecycleSummary {
  dueDate: string
}

export const trialLifecycleRecords: TrialLifecycleRecord[] = [
  {
    studentId: 'student-amina',
    trialStartDate: '2026-05-01',
    trialEndDate: '2026-05-03',
    trialStatus: 'Paid'
  },
  {
    studentId: 'student-hamza',
    trialStartDate: '2026-06-03',
    trialEndDate: '2026-06-05',
    trialStatus: 'Payment Required'
  },
  {
    studentId: 'student-laila',
    trialStartDate: '2026-06-20',
    trialEndDate: '2026-06-22',
    trialStatus: 'Active Trial'
  },
  {
    studentId: 'student-omar',
    trialStartDate: '2026-06-10',
    trialEndDate: '2026-06-12',
    trialStatus: 'Trial Ended'
  },
  {
    studentId: 'student-samira',
    trialStartDate: '2026-04-28',
    trialEndDate: '2026-04-30',
    trialStatus: 'Suspended'
  }
]

export const monthlyEnrollmentRecords: MonthlyEnrollmentRecord[] = [
  {
    studentId: 'student-amina',
    paymentDate: '2026-06-01',
    enrollmentStartDate: '2026-06-01',
    enrollmentEndDate: '2026-06-30',
    nextDueDate: '2026-07-01',
    status: 'Paid'
  },
  {
    studentId: 'student-hamza',
    paymentDate: '',
    enrollmentStartDate: '',
    enrollmentEndDate: '',
    nextDueDate: '2026-06-07',
    status: 'Payment Overdue'
  },
  {
    studentId: 'student-laila',
    paymentDate: '',
    enrollmentStartDate: '',
    enrollmentEndDate: '',
    nextDueDate: '2026-06-23',
    status: 'Unpaid'
  },
  {
    studentId: 'student-omar',
    paymentDate: '',
    enrollmentStartDate: '',
    enrollmentEndDate: '',
    nextDueDate: '2026-06-14',
    status: 'Payment Overdue'
  },
  {
    studentId: 'student-samira',
    paymentDate: '2026-05-01',
    enrollmentStartDate: '2026-05-01',
    enrollmentEndDate: '2026-05-30',
    nextDueDate: '2026-05-31',
    status: 'Suspended'
  }
]

const oneDayMs = 24 * 60 * 60 * 1000

const parseDate = (date: string) => {
  const [year = '0', month = '1', day = '1'] = date.split('-')

  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
}

export const getDaysBetween = (fromDate: string, toDate = academyToday) => {
  if (!fromDate) {
    return 0
  }

  return Math.floor((parseDate(toDate).getTime() - parseDate(fromDate).getTime()) / oneDayMs)
}

export const getTrialLifecycleRecord = (studentId: string) =>
  trialLifecycleRecords.find((record) => record.studentId === studentId)

export const getMonthlyEnrollmentRecord = (studentId: string) =>
  monthlyEnrollmentRecords.find((record) => record.studentId === studentId)

export const getAccessStatus = (
  trialStatus: TrialLifecycleStatus,
  paymentStatus: EnrollmentLifecycleStatus
): StudentLifecycleSummary['accessStatus'] => {
  if (trialStatus === 'Suspended' || paymentStatus === 'Suspended') {
    return 'Suspended'
  }

  if (paymentStatus === 'Payment Overdue') {
    return 'Suspended'
  }

  if (paymentStatus === 'Paid' || paymentStatus === 'Active') {
    return 'Active'
  }

  if (trialStatus === 'Active Trial') {
    return 'Trial'
  }

  return 'Payment Required'
}

export const getStudentLifecycleSummary = (studentId: string): StudentLifecycleSummary => {
  const student = managementStudents.find((item) => item.id === studentId) ?? managementStudents[0]!
  const trial = getTrialLifecycleRecord(student.id)
  const enrollment = getMonthlyEnrollmentRecord(student.id)
  const fallbackPayment = getPaymentForStudent(student.id)
  const paymentStatus = enrollment?.status ?? (fallbackPayment?.status === 'paid' ? 'Paid' : 'Unpaid')
  const trialStatus = trial?.trialStatus ?? (student.status === 'Trial' ? 'Active Trial' : 'Unpaid')
  const daysOverdue =
    paymentStatus === 'Payment Overdue' || paymentStatus === 'Suspended'
      ? Math.max(getDaysBetween(enrollment?.nextDueDate ?? '', academyToday), 0)
      : 0
  const accessStatus = getAccessStatus(trialStatus, paymentStatus)

  return {
    studentId: student.id,
    studentName: student.name,
    parentId: student.parentId,
    parentName: getParentName(student.parentId),
    courseId: student.selectedCourseId,
    courseTitle: getCourseTitle(student.selectedCourseId),
    trialStartDate: trial?.trialStartDate ?? '',
    trialEndDate: trial?.trialEndDate ?? '',
    trialStatus,
    paymentDate: enrollment?.paymentDate ?? fallbackPayment?.month ?? '',
    enrollmentStartDate: enrollment?.enrollmentStartDate ?? '',
    enrollmentEndDate: enrollment?.enrollmentEndDate ?? '',
    nextDueDate: enrollment?.nextDueDate ?? '',
    paymentStatus,
    daysOverdue,
    accessStatus,
    canAccessClass: accessStatus === 'Active' || accessStatus === 'Trial',
    actionRequired:
      accessStatus === 'Suspended'
        ? 'Class access is paused until payment is completed. The student record and class history remain intact.'
        : accessStatus === 'Payment Required'
          ? 'Complete payment to activate the next 30 days of enrollment.'
          : accessStatus === 'Trial'
            ? `The two-day trial remains active through ${trial?.trialEndDate ?? 'the scheduled end date'}.`
            : `Enrollment is active through ${enrollment?.enrollmentEndDate ?? 'the current billing period'}.`
  }
}

export const getAllStudentLifecycleSummaries = () =>
  managementStudents.map((student) => getStudentLifecycleSummary(student.id))

export const getParentLifecycleSummaries = (parentId: string) =>
  getAllStudentLifecycleSummaries().filter((summary) => summary.parentId === parentId)

export const getManagerOverduePaymentRows = (): ManagerOverduePaymentRow[] =>
  getAllStudentLifecycleSummaries()
    .filter((summary) => summary.paymentStatus === 'Payment Overdue' || summary.paymentStatus === 'Suspended')
    .map((summary) => ({
      ...summary,
      dueDate: summary.nextDueDate
    }))

export const getLifecycleReportCounts = () => {
  const summaries = getAllStudentLifecycleSummaries()

  return {
    activeStudents: summaries.filter((summary) => summary.accessStatus === 'Active').length,
    trialStudents: summaries.filter((summary) => summary.trialStatus === 'Active Trial').length,
    unpaidStudents: summaries.filter(
      (summary) => summary.paymentStatus === 'Unpaid' || summary.trialStatus === 'Payment Required'
    ).length,
    overdueStudents: summaries.filter((summary) => summary.paymentStatus === 'Payment Overdue').length,
    suspendedStudents: summaries.filter((summary) => summary.accessStatus === 'Suspended').length
  }
}

const makeNotification = (
  type: AcademyNotificationType,
  audience: NotificationAudience,
  summary: StudentLifecycleSummary,
  title: string,
  message: string,
  createdAt: string,
  priority: AcademyNotification['priority'] = 'normal'
): AcademyNotification => ({
  id: `${type.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${audience}-${summary.studentId}`,
  type,
  audience,
  studentId: summary.studentId,
  parentId: summary.parentId,
  title,
  message,
  createdAt,
  priority,
  read: false
})

export const getAcademyNotifications = () => {
  const notifications: AcademyNotification[] = []

  getAllStudentLifecycleSummaries().forEach((summary) => {
    if (summary.trialStatus === 'Active Trial') {
      notifications.push(
        makeNotification(
          'Trial Ending',
          'parent',
          summary,
          `Trial ending for ${summary.studentName}`,
          `${summary.studentName}'s 2-day trial ends on ${summary.trialEndDate}.`,
          academyToday
        ),
        makeNotification(
          'Trial Ending',
          'student',
          summary,
          'Your trial is ending soon',
          `Your 2-day trial ends on ${summary.trialEndDate}.`,
          academyToday
        )
      )
    }

    if (summary.trialStatus === 'Trial Ended' || summary.trialStatus === 'Payment Required') {
      notifications.push(
        makeNotification('Trial Ended', 'parent', summary, `Trial ended for ${summary.studentName}`, trialEndedMessage, summary.trialEndDate, 'high'),
        makeNotification('Trial Ended', 'student', summary, 'Trial ended', trialEndedMessage, summary.trialEndDate, 'high')
      )
    }

    if (summary.paymentStatus === 'Unpaid' || summary.paymentStatus === 'Payment Due') {
      notifications.push(
        makeNotification(
          'Payment Due',
          'parent',
          summary,
          `Payment due for ${summary.studentName}`,
          `Payment is due on ${summary.nextDueDate} to continue classes.`,
          academyToday
        ),
        makeNotification(
          'Payment Due',
          'student',
          summary,
          'Payment due',
          `Your next payment is due on ${summary.nextDueDate}.`,
          academyToday
        )
      )
    }

    if (summary.paymentStatus === 'Payment Overdue') {
      notifications.push(
        makeNotification(
          'Payment Overdue',
          'manager',
          summary,
          `${summary.studentName} payment overdue`,
          `${summary.studentName}'s payment is ${summary.daysOverdue} days overdue.`,
          academyToday,
          'high'
        ),
        makeNotification(
          'Follow-Up Required',
          'manager',
          summary,
          `Follow up with ${summary.parentName}`,
          `Contact ${summary.parentName} about ${summary.studentName}'s overdue payment.`,
          academyToday,
          'high'
        )
      )
    }

    if (summary.paymentStatus === 'Suspended') {
      notifications.push(
        makeNotification('Student Suspended', 'parent', summary, `${summary.studentName} access suspended`, monthlyEnrollmentEndedMessage, academyToday, 'high'),
        makeNotification('Student Suspended', 'student', summary, 'Class access suspended', monthlyEnrollmentEndedMessage, academyToday, 'high'),
        makeNotification(
          'Student Suspended',
          'manager',
          summary,
          `${summary.studentName} suspended`,
          `${summary.studentName} remains in the system, but class access is suspended until payment is completed.`,
          academyToday,
          'high'
        )
      )
    }

    if (summary.paymentStatus === 'Paid' && summary.trialStatus === 'Paid') {
      notifications.push(
        makeNotification(
          'Student Reactivated',
          'parent',
          summary,
          `${summary.studentName} enrollment active`,
          `${summary.studentName}'s payment is confirmed and enrollment is active through ${summary.enrollmentEndDate}.`,
          summary.paymentDate
        ),
        makeNotification(
          'Student Reactivated',
          'student',
          summary,
          'Enrollment active',
          `Your payment is confirmed and class access is active through ${summary.enrollmentEndDate}.`,
          summary.paymentDate
        )
      )
    }

    if (summary.enrollmentEndDate && getDaysBetween(summary.enrollmentEndDate, academyToday) > 0) {
      notifications.push(
        makeNotification('Payment Due', 'parent', summary, `Monthly enrollment ended for ${summary.studentName}`, monthlyEnrollmentEndedMessage, summary.enrollmentEndDate, 'high'),
        makeNotification('Payment Due', 'student', summary, 'Monthly enrollment ended', monthlyEnrollmentEndedMessage, summary.enrollmentEndDate, 'high')
      )
    }
  })

  return notifications
}

export const getParentNotifications = (parentId: string) =>
  getAcademyNotifications().filter(
    (notification) => notification.audience === 'parent' && notification.parentId === parentId
  )

export const getStudentNotifications = (studentId: string) =>
  getAcademyNotifications().filter(
    (notification) => notification.audience === 'student' && notification.studentId === studentId
  )

export const getManagerNotifications = () =>
  getAcademyNotifications().filter((notification) => notification.audience === 'manager')

export const getStudentScheduleMembership = (studentId: string) =>
  classSchedules.find((schedule) => schedule.enrolledStudentIds.includes(studentId))

export const getLifecycleTone = (status: string) => {
  const tones: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    'Active Trial': 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
    'Trial Ended': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    'Payment Required': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    Unpaid: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    'Payment Due': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    'Payment Overdue': 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    Suspended: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    Trial: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200'
  }

  return tones[status] ?? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
}
