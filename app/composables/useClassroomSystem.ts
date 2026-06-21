import {
  attendanceRecords,
  classroomAnnouncements,
  classroomAssignments,
  classroomLiveSessions,
  classroomProgressRecords,
  classroomResources,
  classrooms,
  classSchedules,
  homeworkSubmissions,
  monthlyStudentReports
} from '~/data/management'
import type {
  AttendanceRecord,
  AttendanceStatus,
  Classroom,
  ClassroomAnnouncement,
  ClassroomAssignment,
  ClassroomLiveSession,
  ClassroomProgress,
  ClassroomResource,
  ClassSchedule,
  HomeworkSubmission,
  MonthlyStudentReport
} from '~/types'
import { normalizeSchedule } from '~/utils/classSchedule'

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T
const today = () => new Date().toISOString().slice(0, 10)
const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export const useClassroomSystem = () => {
  const classroomRecords = useState<Classroom[]>('classroom-system-classrooms', () => clone(classrooms))
  const schedules = useState<ClassSchedule[]>('classroom-system-schedules', () => clone(classSchedules))
  const liveSessions = useState<ClassroomLiveSession[]>('classroom-system-live-sessions', () => clone(classroomLiveSessions))
  const assignments = useState<ClassroomAssignment[]>('classroom-system-assignments', () => clone(classroomAssignments))
  const submissions = useState<HomeworkSubmission[]>('classroom-system-submissions', () => clone(homeworkSubmissions))
  const materials = useState<ClassroomResource[]>('classroom-system-materials', () => clone(classroomResources))
  const attendance = useState<AttendanceRecord[]>('classroom-system-attendance', () => clone(attendanceRecords))
  const progress = useState<ClassroomProgress[]>('classroom-system-progress', () => clone(classroomProgressRecords))
  const reports = useState<MonthlyStudentReport[]>('classroom-system-reports', () => clone(monthlyStudentReports))
  const announcements = useState<ClassroomAnnouncement[]>('classroom-system-announcements', () => clone(classroomAnnouncements))

  const getClassroom = (classroomId: string) =>
    classroomRecords.value.find((classroom) => classroom.id === classroomId)

  const getSchedule = (classroomId: string) => {
    const classroom = getClassroom(classroomId)
    return classroom ? schedules.value.find((schedule) => schedule.id === classroom.scheduleId) : undefined
  }

  const getLiveSession = (classroomId: string) =>
    liveSessions.value.find((session) => session.classroomId === classroomId)

  const saveSchedule = (schedule: ClassSchedule, classroomId: string) => {
    const existingIndex = schedules.value.findIndex((item) => item.id === schedule.id)
    const normalizedSchedule = normalizeSchedule(schedule)

    if (existingIndex >= 0) {
      schedules.value[existingIndex] = normalizedSchedule
    } else {
      schedules.value.push(normalizedSchedule)
    }

    const classroomIndex = classroomRecords.value.findIndex((item) => item.id === classroomId)
    if (classroomIndex >= 0) {
      classroomRecords.value[classroomIndex] = {
        ...classroomRecords.value[classroomIndex]!,
        scheduleId: normalizedSchedule.id,
        teacherId: normalizedSchedule.teacherId,
        courseId: normalizedSchedule.courseId,
        meetingProvider: normalizedSchedule.meetingPlatform
      }
    }

    const liveSessionIndex = liveSessions.value.findIndex((item) => item.classroomId === classroomId)
    if (liveSessionIndex >= 0) {
      liveSessions.value[liveSessionIndex] = {
        ...liveSessions.value[liveSessionIndex]!,
        meetingPlatform: normalizedSchedule.meetingPlatform,
        meetingLink: normalizedSchedule.meetingLink,
        meetingId: normalizedSchedule.meetingId,
        meetingPassword: normalizedSchedule.meetingPassword,
        updatedAt: today()
      }
    }
  }

  const saveLiveSession = (session: Omit<ClassroomLiveSession, 'id' | 'updatedAt'>) => {
    const existingIndex = liveSessions.value.findIndex((item) => item.classroomId === session.classroomId)
    const record: ClassroomLiveSession = {
      ...session,
      id: existingIndex >= 0 ? liveSessions.value[existingIndex]!.id : createId('live-session'),
      updatedAt: today()
    }

    if (existingIndex >= 0) {
      liveSessions.value[existingIndex] = record
    } else {
      liveSessions.value.push(record)
    }

    const schedule = getSchedule(session.classroomId)
    if (schedule) {
      schedule.meetingLink = session.meetingLink
      schedule.meetingPlatform = session.meetingPlatform
      schedule.meetingId = session.meetingId
      schedule.meetingPassword = session.meetingPassword
    }

    const classroomIndex = classroomRecords.value.findIndex((item) => item.id === session.classroomId)
    if (classroomIndex >= 0) {
      classroomRecords.value[classroomIndex] = {
        ...classroomRecords.value[classroomIndex]!,
        meetingProvider: session.meetingPlatform
      }
    }
  }

  const addAssignment = (assignment: Omit<ClassroomAssignment, 'id'>) => {
    assignments.value.push({ ...assignment, id: createId('assignment') })
  }

  const submitHomework = (submission: Omit<HomeworkSubmission, 'id' | 'submittedAt' | 'status' | 'score' | 'feedback'>) => {
    submissions.value.push({
      ...submission,
      id: createId('submission'),
      submittedAt: today(),
      status: 'submitted',
      score: null,
      feedback: ''
    })
  }

  const reviewHomework = (submissionId: string, score: number, feedback: string) => {
    const index = submissions.value.findIndex((submission) => submission.id === submissionId)
    if (index < 0) return

    submissions.value[index] = {
      ...submissions.value[index]!,
      score,
      feedback,
      status: 'reviewed'
    }
  }

  const saveAttendance = (
    classroomId: string,
    date: string,
    teacherId: string,
    statuses: Record<string, AttendanceStatus>
  ) => {
    const schedule = getSchedule(classroomId)
    if (!schedule) return

    Object.entries(statuses).forEach(([studentId, status]) => {
      const index = attendance.value.findIndex(
        (record) => record.scheduleId === schedule.id && record.studentId === studentId && record.date === date
      )
      const record: AttendanceRecord = {
        id: index >= 0 ? attendance.value[index]!.id : createId('attendance'),
        scheduleId: schedule.id,
        courseId: schedule.courseId,
        teacherId,
        studentId,
        date,
        status,
        isTrialClass: false
      }

      if (index >= 0) attendance.value[index] = record
      else attendance.value.push(record)
    })
  }

  const addMaterial = (material: Omit<ClassroomResource, 'id' | 'addedAt'>) => {
    materials.value.push({ ...material, id: createId('material'), addedAt: today() })
  }

  const saveProgress = (record: ClassroomProgress) => {
    const index = progress.value.findIndex((item) => item.id === record.id)
    if (index >= 0) progress.value[index] = record
    else progress.value.push(record)
  }

  const saveMonthlyReport = (report: Omit<MonthlyStudentReport, 'id' | 'completedAt'>) => {
    const index = reports.value.findIndex(
      (item) => item.classroomId === report.classroomId && item.studentId === report.studentId && item.month === report.month
    )
    const record: MonthlyStudentReport = {
      ...report,
      id: index >= 0 ? reports.value[index]!.id : createId('monthly-report'),
      completedAt: report.status === 'completed' ? today() : ''
    }

    if (index >= 0) reports.value[index] = record
    else reports.value.push(record)
  }

  const postAnnouncement = (announcement: Omit<ClassroomAnnouncement, 'id' | 'postedAt'>) => {
    announcements.value.unshift({ ...announcement, id: createId('announcement'), postedAt: today() })
  }

  return {
    classroomRecords,
    schedules,
    liveSessions,
    assignments,
    submissions,
    materials,
    attendance,
    progress,
    reports,
    announcements,
    getClassroom,
    getSchedule,
    getLiveSession,
    saveSchedule,
    saveLiveSession,
    addAssignment,
    submitHomework,
    reviewHomework,
    saveAttendance,
    addMaterial,
    saveProgress,
    saveMonthlyReport,
    postAnnouncement
  }
}
