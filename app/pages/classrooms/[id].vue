<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import { getStudentLifecycleSummary } from '~/data/enrollmentLifecycle'
import {
  assignmentStatuses,
  classroomAttendanceStatuses,
  getCourseTitle,
  getPaymentForStudent,
  getStatusTone,
  getStudentClassroomAccess,
  getStudentName,
  getTeacherName,
  managementCourses,
  managementStudents,
  managementTeachers,
  resourceTypes
} from '~/data/management'
import {
  getAccessMessageLabel,
  getLocalizedScheduleLabel,
  getLocalizedValue,
  getResourceTypeLabel,
  getStatusLabel,
  getUiCopy,
  getVideoFeatureLabel
} from '~/data/uiCopy'
import type {
  AssignmentStatus,
  AttendanceStatus,
  AnnouncementType,
  ClassType,
  MeetingProvider,
  ResourceType,
  StudentClassroomAccess,
  Weekday
} from '~/types'
import {
  ALL_WEEK_DAYS,
  CLASS_TYPES,
  HOLIDAY_DAYS,
  MEETING_PLATFORMS,
  WEEKDAYS,
  addMinutesToTime,
  getScheduleDaysLabel,
  getScheduleDurationLabel,
  getTodayClassTime
} from '~/utils/classSchedule'

const route = useRoute()
const { locale } = useI18n()
const { currentUser, syncUser } = useRoleAuth()
const { initialize: initializePayments, getStudentPaymentAccess } = usePaymentSystem()
const { approvedManagementTeachers, getApplicationTeacherName } = useTeacherApplications()
const availableTeachers = computed(() => [...managementTeachers, ...approvedManagementTeachers.value])
const {
  classroomRecords,
  schedules,
  liveSessions,
  assignments: classroomAssignmentRecords,
  submissions,
  materials,
  attendance,
  progress,
  reports,
  announcements: classroomAnnouncementRecords,
  saveSchedule: persistSchedule,
  saveLiveSession,
  addAssignment,
  submitHomework: persistHomework,
  reviewHomework,
  saveAttendance: persistAttendance,
  addMaterial,
  saveMonthlyReport,
  postAnnouncement
} = useClassroomSystem()
const ui = computed(() => getUiCopy(locale.value))
const localText = (value: string) => getLocalizedValue(locale.value, value)
const scheduleLabel = (day: string, time?: string, timezone?: string) =>
  getLocalizedScheduleLabel(locale.value, day, time, timezone)

useSeoMeta({
  title: () => ui.value.classroomDetail.seoTitle,
  description: () => ui.value.classroomDetail.seoDescription
})

const tabs = [
  'overview',
  'schedule',
  'liveClass',
  'homework',
  'materials',
  'attendance',
  'progress',
  'announcements'
] as const

type ClassroomTab = (typeof tabs)[number]

const classroomId = computed(() => String(route.params.id ?? ''))
const classroom = computed(() => classroomRecords.value.find((item) => item.id === classroomId.value))
const schedule = computed(() =>
  classroom.value ? schedules.value.find((item) => item.id === classroom.value?.scheduleId) : undefined
)
const liveSession = computed(() => liveSessions.value.find((item) => item.classroomId === classroomId.value))
const enrolledStudents = computed(() =>
  managementStudents.filter((student) => schedule.value?.enrolledStudentIds.includes(student.id))
)
const accessibleStudents = computed(() => {
  if (currentUser.value?.role === 'student') {
    return enrolledStudents.value.filter((student) => student.id === currentUser.value?.profileId)
  }
  if (currentUser.value?.role === 'parent') {
    return enrolledStudents.value.filter((student) => student.parentId === currentUser.value?.profileId)
  }
  return enrolledStudents.value
})
const selectedTab = ref<ClassroomTab>('overview')
const selectedStudentId = ref('')
const assignmentNotice = ref('')
const homeworkNotice = ref('')
const scheduleNotice = ref('')
const liveClassNotice = ref('')
const materialNotice = ref('')
const reviewNotice = ref('')
const reportNotice = ref('')
const announcementNotice = ref('')
const attendanceSaved = ref(false)
const attendanceDate = ref(new Date().toISOString().slice(0, 10))
const attendanceDraft = reactive<Record<string, AttendanceStatus>>({})

const canManageSchedule = computed(() =>
  currentUser.value?.role === 'super-admin' || currentUser.value?.role === 'manager'
)
const canTeach = computed(() =>
  currentUser.value?.role === 'super-admin' ||
  currentUser.value?.role === 'manager' ||
  (currentUser.value?.role === 'teacher' && currentUser.value.profileId === classroom.value?.teacherId)
)
const canSubmitHomework = computed(() => currentUser.value?.role === 'student')
const canPostAnnouncements = computed(() => canTeach.value)

const scheduleDraft = reactive({
  id: '',
  courseId: '',
  teacherId: '',
  day: '',
  daysOfWeek: [...WEEKDAYS] as Weekday[],
  startTime: '',
  endTime: '',
  durationMinutes: 60,
  timezone: '',
  classType: 'Group' as ClassType,
  meetingPlatform: 'Google Meet' as MeetingProvider,
  meetingLink: '',
  meetingId: '',
  meetingPassword: '',
  capacity: 10,
  enrolledStudentIds: [] as string[]
})

const liveClassDraft = reactive({
  meetingPlatform: 'Google Meet' as MeetingProvider,
  meetingLink: '',
  meetingId: '',
  meetingPassword: '',
  classDate: '',
  classNotes: ''
})

const assignmentDraft = reactive({
  title: '',
  instructions: '',
  dueDate: '',
  fileAttachmentLabel: '',
  attachmentUrl: '',
  status: 'published' as AssignmentStatus
})

const homeworkDraft = reactive({
  assignmentId: '',
  textAnswer: '',
  studentComment: '',
  fileUploadLabel: '',
  fileUploadUrl: ''
})

const resourceDraft = reactive({
  title: '',
  type: 'PDF Lesson' as ResourceType,
  description: '',
  fileLabel: '',
  url: ''
})

const reviewDraft = reactive<Record<string, { score: number; feedback: string }>>({})

const reportDraft = reactive({
  studentId: '',
  month: 'June 2026',
  attendanceSummary: '',
  academicProgress: '',
  strengths: '',
  areasForImprovement: '',
  teacherNotes: '',
  status: 'completed' as 'draft' | 'completed'
})

const announcementDraft = reactive({
  title: '',
  type: 'homework reminder' as AnnouncementType,
  message: ''
})

const announcementTypes: AnnouncementType[] = [
  'holiday notice',
  'class cancellation',
  'homework reminder',
  'exam announcement',
  'schedule change',
  'parent meeting'
]

const selectedFile = (event: Event) => (event.target as HTMLInputElement).files?.[0]

const selectAssignmentFile = (event: Event) => {
  if (!import.meta.client) return
  const file = selectedFile(event)
  if (!file) return
  assignmentDraft.fileAttachmentLabel = file.name
  assignmentDraft.attachmentUrl = URL.createObjectURL(file)
}

const selectHomeworkFile = (event: Event) => {
  if (!import.meta.client) return
  const file = selectedFile(event)
  if (!file) return
  homeworkDraft.fileUploadLabel = file.name
  homeworkDraft.fileUploadUrl = URL.createObjectURL(file)
}

const selectMaterialFile = (event: Event) => {
  if (!import.meta.client) return
  const file = selectedFile(event)
  if (!file) return
  resourceDraft.fileLabel = file.name
  resourceDraft.url = URL.createObjectURL(file)
}

const fallbackAccess = computed<StudentClassroomAccess>(() => ({
  canJoin: false,
  isEnrolled: false,
  requiresPayment: false,
  studentStatus: 'Unknown',
  message: ui.value.classroomDetail.fallbacks.selectStudentAccess
}))

watchEffect(() => {
  const studentIds = accessibleStudents.value.map((student) => student.id)
  const roleStudentId = currentUser.value?.role === 'student' ? currentUser.value.profileId : ''
  const parentStudentId = currentUser.value?.role === 'parent'
    ? accessibleStudents.value.find((student) => student.parentId === currentUser.value?.profileId)?.id
    : ''
  const preferredStudentId = roleStudentId || parentStudentId || studentIds[0] || ''

  if (!studentIds.includes(selectedStudentId.value)) {
    selectedStudentId.value = preferredStudentId
  }

  if (!studentIds.includes(reportDraft.studentId)) reportDraft.studentId = preferredStudentId

  enrolledStudents.value.forEach((student) => {
    attendanceDraft[student.id] = attendanceDraft[student.id] ?? 'present'
  })
})

watch(
  () => schedule.value,
  (value) => {
    if (!value || !classroom.value) return
    Object.assign(scheduleDraft, {
      id: value.id,
      courseId: value.courseId,
      teacherId: value.teacherId,
      day: value.day,
      daysOfWeek: [...value.daysOfWeek],
      startTime: value.startTime,
      endTime: value.endTime,
      durationMinutes: value.durationMinutes,
      timezone: value.timezone,
      classType: value.classType,
      meetingPlatform: value.meetingPlatform,
      meetingLink: value.meetingLink,
      meetingId: value.meetingId,
      meetingPassword: value.meetingPassword,
      capacity: value.capacity,
      enrolledStudentIds: [...value.enrolledStudentIds]
    })
  },
  { immediate: true }
)

watch(
  () => liveSession.value,
  (value) => {
    Object.assign(liveClassDraft, {
      meetingPlatform: value?.meetingPlatform ?? schedule.value?.meetingPlatform ?? 'Google Meet',
      meetingLink: value?.meetingLink ?? schedule.value?.meetingLink ?? '',
      meetingId: value?.meetingId ?? schedule.value?.meetingId ?? '',
      meetingPassword: value?.meetingPassword ?? schedule.value?.meetingPassword ?? '',
      classDate: value?.classDate ?? '',
      classNotes: value?.classNotes ?? ''
    })
  },
  { immediate: true }
)

onMounted(() => {
  syncUser()
  initializePayments()
})

const courseTitle = computed(() =>
  classroom.value
    ? localText(getCourseTitle(classroom.value.courseId))
    : ui.value.classroomDetail.fallbacks.unknownCourse
)

const teacherName = computed(() =>
  classroom.value
    ? getApplicationTeacherName(classroom.value.teacherId) ?? getTeacherName(classroom.value.teacherId)
    : ui.value.classroomDetail.fallbacks.unassignedTeacher
)

const selectedStudent = computed(() =>
  accessibleStudents.value.find((student) => student.id === selectedStudentId.value)
)

const selectedStudentPayment = computed(() =>
  selectedStudent.value ? getPaymentForStudent(selectedStudent.value.id) : undefined
)

const studentAccess = computed(() =>
  selectedStudentId.value
    ? getStudentClassroomAccess(classroomId.value, selectedStudentId.value)
    : fallbackAccess.value
)
const selectedStudentLifecycle = computed(() =>
  selectedStudentId.value ? getStudentLifecycleSummary(selectedStudentId.value) : undefined
)
const selectedStudentPaymentAccess = computed(() =>
  selectedStudentId.value ? getStudentPaymentAccess(selectedStudentId.value) : undefined
)
const canJoinLiveClass = computed(() =>
  canTeach.value ||
  ((currentUser.value?.role === 'student' || currentUser.value?.role === 'parent') &&
    studentAccess.value.isEnrolled && Boolean(selectedStudentPaymentAccess.value?.canAccess))
)

watch(
  [() => scheduleDraft.classType, () => scheduleDraft.startTime, () => scheduleDraft.durationMinutes],
  ([classType, startTime, durationMinutes]) => {
    if (classType === 'Group') {
      scheduleDraft.daysOfWeek = [...WEEKDAYS]
      scheduleDraft.durationMinutes = 60
    }
    scheduleDraft.endTime = addMinutesToTime(startTime, durationMinutes) || scheduleDraft.endTime
  }
)
const liveAccessMessage = computed(() =>
  selectedStudentPaymentAccess.value && !selectedStudentPaymentAccess.value.canAccess
    ? selectedStudentPaymentAccess.value.message
    : accessMessage(studentAccess.value.message)
)

const assignments = computed(() =>
  classroomAssignmentRecords.value.filter((assignment) => assignment.classroomId === classroomId.value)
)

const homeworkSubmissions = computed(() =>
  submissions.value
    .filter((submission) => submission.classroomId === classroomId.value)
    .map((submission) => ({
      ...submission,
      assignmentTitle:
        localText(assignments.value.find((assignment) => assignment.id === submission.assignmentId)?.title ?? '') ||
        ui.value.classroomDetail.fallbacks.unknownAssignment,
      studentName: getStudentName(submission.studentId)
    }))
)
const visibleHomeworkSubmissions = computed(() => {
  if (currentUser.value?.role === 'student') {
    return homeworkSubmissions.value.filter((submission) => submission.studentId === currentUser.value?.profileId)
  }

  if (currentUser.value?.role === 'parent') {
    const childIds = new Set(
      managementStudents.filter((student) => student.parentId === currentUser.value?.profileId).map((student) => student.id)
    )
    return homeworkSubmissions.value.filter((submission) => childIds.has(submission.studentId))
  }

  return homeworkSubmissions.value
})

const attendanceRows = computed(() =>
  attendance.value
    .filter((record) => record.scheduleId === schedule.value?.id)
    .map((record) => ({ ...record, studentName: getStudentName(record.studentId) }))
)
const visibleAttendanceRows = computed(() => {
  if (currentUser.value?.role === 'student') {
    return attendanceRows.value.filter((record) => record.studentId === currentUser.value?.profileId)
  }
  if (currentUser.value?.role === 'parent') {
    const childIds = new Set(
      managementStudents.filter((student) => student.parentId === currentUser.value?.profileId).map((student) => student.id)
    )
    return attendanceRows.value.filter((record) => childIds.has(record.studentId))
  }
  return attendanceRows.value
})

const resources = computed(() => materials.value.filter((resource) => resource.classroomId === classroomId.value))
const progressRows = computed(() =>
  progress.value
    .filter((record) => record.classroomId === classroomId.value)
    .map((record) => ({ ...record, studentName: getStudentName(record.studentId) }))
)
const visibleProgressRows = computed(() => {
  if (currentUser.value?.role === 'student') {
    return progressRows.value.filter((record) => record.studentId === currentUser.value?.profileId)
  }
  if (currentUser.value?.role === 'parent') {
    const childIds = new Set(
      managementStudents.filter((student) => student.parentId === currentUser.value?.profileId).map((student) => student.id)
    )
    return progressRows.value.filter((record) => childIds.has(record.studentId))
  }
  return progressRows.value
})
const announcements = computed(() =>
  classroomAnnouncementRecords.value.filter((announcement) => announcement.classroomId === classroomId.value)
)
const visibleReports = computed(() => {
  const classroomReports = reports.value.filter((report) => report.classroomId === classroomId.value)

  if (currentUser.value?.role === 'student') {
    return classroomReports.filter((report) => report.studentId === currentUser.value?.profileId)
  }

  if (currentUser.value?.role === 'parent') {
    const childIds = new Set(
      managementStudents.filter((student) => student.parentId === currentUser.value?.profileId).map((student) => student.id)
    )
    return classroomReports.filter((report) => childIds.has(report.studentId))
  }

  return classroomReports
})

watchEffect(() => {
  homeworkSubmissions.value.forEach((submission) => {
    reviewDraft[submission.id] = reviewDraft[submission.id] ?? {
      score: submission.score ?? 0,
      feedback: submission.feedback
    }
  })
})

watchEffect(() => {
  if (!assignments.value.some((assignment) => assignment.id === homeworkDraft.assignmentId)) {
    homeworkDraft.assignmentId = assignments.value[0]?.id ?? ''
  }
})

const createAssignment = () => {
  if (!classroom.value || !assignmentDraft.title.trim()) {
    assignmentNotice.value = ui.value.classroomDetail.notices.addAssignmentTitle
    return
  }

  addAssignment({
    classroomId: classroom.value.id,
    title: assignmentDraft.title.trim(),
    instructions: assignmentDraft.instructions.trim() || ui.value.classroomDetail.fallbacks.teacherInstructions,
    dueDate: assignmentDraft.dueDate || '2026-06-30',
    fileAttachmentLabel: assignmentDraft.fileAttachmentLabel.trim() || ui.value.classroomDetail.fallbacks.noAttachment,
    attachmentUrl: assignmentDraft.attachmentUrl || undefined,
    status: assignmentDraft.status
  })

  assignmentDraft.title = ''
  assignmentDraft.instructions = ''
  assignmentDraft.dueDate = ''
  assignmentDraft.fileAttachmentLabel = ''
  assignmentDraft.attachmentUrl = ''
  assignmentDraft.status = 'published'
  assignmentNotice.value = ui.value.classroomDetail.notices.assignmentAdded
}

const submitHomework = () => {
  if (!classroom.value || !selectedStudent.value || !homeworkDraft.assignmentId) {
    homeworkNotice.value = ui.value.classroomDetail.notices.selectStudentAndAssignment
    return
  }

  persistHomework({
    classroomId: classroom.value.id,
    assignmentId: homeworkDraft.assignmentId,
    studentId: selectedStudent.value.id,
    textAnswer: homeworkDraft.textAnswer.trim() || ui.value.classroomDetail.fallbacks.studentAnswer,
    studentComment: homeworkDraft.studentComment.trim(),
    fileUploadLabel: homeworkDraft.fileUploadLabel.trim() || ui.value.classroomDetail.fallbacks.noFileUploaded,
    fileUploadUrl: homeworkDraft.fileUploadUrl || undefined
  })

  homeworkDraft.textAnswer = ''
  homeworkDraft.studentComment = ''
  homeworkDraft.fileUploadLabel = ''
  homeworkDraft.fileUploadUrl = ''
  homeworkNotice.value = ui.value.classroomDetail.notices.homeworkSubmitted
}

const saveAttendance = () => {
  if (!classroom.value) return
  persistAttendance(
    classroom.value.id,
    attendanceDate.value,
    currentUser.value?.profileId ?? classroom.value.teacherId,
    attendanceDraft
  )
  attendanceSaved.value = true
}

const saveSchedule = () => {
  if (!classroom.value || !scheduleDraft.id) return

  persistSchedule(
    {
      id: scheduleDraft.id,
      courseId: scheduleDraft.courseId,
      teacherId: scheduleDraft.teacherId,
      day: scheduleDraft.daysOfWeek.join(', '),
      daysOfWeek: [...scheduleDraft.daysOfWeek],
      time: scheduleDraft.startTime,
      startTime: scheduleDraft.startTime,
      endTime: scheduleDraft.endTime,
      durationMinutes: scheduleDraft.durationMinutes,
      timezone: scheduleDraft.timezone,
      classType: scheduleDraft.classType,
      meetingPlatform: scheduleDraft.meetingPlatform,
      meetingLink: scheduleDraft.meetingLink,
      meetingId: scheduleDraft.meetingId,
      meetingPassword: scheduleDraft.meetingPassword,
      capacity: scheduleDraft.capacity,
      enrolledStudentIds: [...scheduleDraft.enrolledStudentIds]
    },
    classroom.value.id
  )
  scheduleNotice.value = ui.value.classroomDetail.notices.scheduleSaved
}

const updateLiveClass = () => {
  if (!classroom.value) return
  saveLiveSession({
    classroomId: classroom.value.id,
    meetingPlatform: liveClassDraft.meetingPlatform,
    meetingLink: liveClassDraft.meetingLink,
    meetingId: liveClassDraft.meetingId,
    meetingPassword: liveClassDraft.meetingPassword,
    classDate: liveClassDraft.classDate,
    classNotes: liveClassDraft.classNotes,
    updatedBy: currentUser.value?.profileId ?? classroom.value.teacherId
  })
  liveClassNotice.value = ui.value.classroomDetail.notices.liveClassSaved
}

const createMaterial = () => {
  if (!classroom.value || !resourceDraft.title.trim() || !resourceDraft.fileLabel.trim()) return
  addMaterial({
    classroomId: classroom.value.id,
    title: resourceDraft.title.trim(),
    type: resourceDraft.type,
    description: resourceDraft.description.trim(),
    fileLabel: resourceDraft.fileLabel.trim(),
    addedByTeacherId: currentUser.value?.profileId ?? classroom.value.teacherId,
    url: resourceDraft.url.trim() || '#'
  })
  Object.assign(resourceDraft, { title: '', type: 'PDF Lesson', description: '', fileLabel: '', url: '' })
  materialNotice.value = ui.value.classroomDetail.notices.materialAdded
}

const saveHomeworkReview = (submissionId: string) => {
  const review = reviewDraft[submissionId]
  if (!review) return
  reviewHomework(submissionId, Math.min(Math.max(review.score, 0), 100), review.feedback.trim())
  reviewNotice.value = ui.value.classroomDetail.notices.reviewSaved
}

const createMonthlyReport = () => {
  if (!classroom.value || !reportDraft.studentId) return
  saveMonthlyReport({
    classroomId: classroom.value.id,
    studentId: reportDraft.studentId,
    teacherId: currentUser.value?.profileId ?? classroom.value.teacherId,
    month: reportDraft.month,
    attendanceSummary: reportDraft.attendanceSummary,
    academicProgress: reportDraft.academicProgress,
    strengths: reportDraft.strengths,
    areasForImprovement: reportDraft.areasForImprovement,
    teacherNotes: reportDraft.teacherNotes,
    status: reportDraft.status
  })
  reportNotice.value = ui.value.classroomDetail.notices.reportSaved
}

const createAnnouncement = () => {
  if (!classroom.value || !announcementDraft.title.trim() || !announcementDraft.message.trim()) return
  const authorRole = currentUser.value?.role === 'manager'
    ? 'Manager'
    : currentUser.value?.role === 'super-admin'
      ? 'Admin'
      : 'Teacher'
  postAnnouncement({
    classroomId: classroom.value.id,
    authorRole,
    title: announcementDraft.title.trim(),
    type: announcementDraft.type,
    message: announcementDraft.message.trim()
  })
  Object.assign(announcementDraft, { title: '', type: 'homework reminder', message: '' })
  announcementNotice.value = ui.value.classroomDetail.notices.announcementPosted
}

const accessMessage = (message: string) => getAccessMessageLabel(locale.value, message)
const resourceTypeLabel = (type: string) => getResourceTypeLabel(locale.value, type)
const statusLabel = (status: string) => getStatusLabel(locale.value, status)
const tabLabel = (tab: ClassroomTab) => ui.value.classroomDetail.tabs[tab]
const videoFeatureLabel = (feature: string) => getVideoFeatureLabel(locale.value, feature)
</script>

<template>
  <div v-if="classroom">
    <PageHero
      :image="pageBackgrounds.classroomDetail"
      :eyebrow="ui.classroomDetail.labels.virtualClassroom"
      :title="localText(classroom.className)"
      height="compact"
    >
      <template #before>
        <NuxtLink to="/classrooms" class="focus-ring inline-flex rounded-md text-sm font-semibold text-brand-gold">
          {{ ui.classroomDetail.actions.backToClassrooms }}
        </NuxtLink>
      </template>

      <p class="mt-4 text-lg font-semibold text-slate-200">{{ courseTitle }}</p>
      <p class="mt-4 max-w-3xl leading-8 text-slate-300">{{ localText(classroom.description) }}</p>

      <template #aside>
        <div class="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
          <div class="flex flex-wrap gap-2">
            <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(classroom.status)]">{{ statusLabel(classroom.status) }}</span>
            <span class="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-slate-950">{{ schedule?.meetingPlatform ?? classroom.meetingProvider }}</span>
          </div>
          <dl class="mt-5 grid gap-3 text-sm text-slate-200">
            <div>
              <dt class="font-bold text-white">{{ ui.classroomDetail.labels.teacher }}</dt>
              <dd class="mt-1">{{ teacherName }}</dd>
            </div>
            <div>
              <dt class="font-bold text-white">{{ ui.classroomDetail.labels.schedule }}</dt>
              <dd class="mt-1">
                {{ schedule ? `${getScheduleDaysLabel(schedule)} · ${schedule.startTime}–${schedule.endTime} ${schedule.timezone}` : ui.common.schedulePending }}
              </dd>
            </div>
            <div>
              <dt class="font-bold text-white">{{ ui.classroomDetail.labels.classLevel }}</dt>
              <dd class="mt-1">{{ localText(classroom.level) }}</dd>
            </div>
          </dl>
        </div>
      </template>
    </PageHero>

    <section class="bg-white py-5 dark:bg-slate-950">
      <div class="container-wide">
        <div class="flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            :class="[
              'focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition',
              selectedTab === tab
                ? 'bg-brand-purple text-white dark:bg-brand-gold dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:text-brand-purple dark:bg-slate-900 dark:text-slate-200 dark:hover:text-brand-gold'
            ]"
            @click="selectedTab = tab"
          >
            {{ tabLabel(tab) }}
          </button>
        </div>
      </div>
    </section>

    <section class="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div class="container-wide">
        <div v-if="selectedTab === 'overview'" :class="['grid gap-8', canTeach ? 'xl:grid-cols-[1fr_0.9fr]' : '']">
          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="eyebrow">{{ ui.classroomDetail.labels.overview }}</p>
                <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.classroomDetails }}</h2>
              </div>
              <BaseButton v-if="schedule" :to="`/classrooms/${classroom.id}`" variant="outline">{{ ui.classroomDetail.actions.refreshPreview }}</BaseButton>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.course }}</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ courseTitle }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.teacher }}</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ teacherName }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.schedule }}</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">
                  {{ getTodayClassTime(schedule) }}
                </p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.timezone }}</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.timezone ?? ui.classroomDetail.fallbacks.pending }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.capacity }}</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">
                  {{ enrolledStudents.length }} / {{ schedule?.capacity ?? 0 }}
                </p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.meetingLink }}</p>
                <p class="mt-1 break-all font-semibold text-brand-purple dark:text-brand-gold">{{ schedule?.meetingLink ?? ui.classroomDetail.fallbacks.notSet }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Weekly schedule</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ getScheduleDaysLabel(schedule) }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Duration</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ getScheduleDurationLabel(schedule?.durationMinutes) }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Holiday days</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.classType === 'Group' ? HOLIDAY_DAYS.join(', ') : 'None fixed — flexible schedule' }}</p>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Meeting platform</p>
                <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ liveSession?.meetingPlatform ?? schedule?.meetingPlatform ?? classroom.meetingProvider }}</p>
              </div>
            </div>

            <div v-if="canTeach" class="mt-6">
              <h3 class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.enrolledStudents }}</h3>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <article
                  v-for="student in enrolledStudents"
                  :key="student.id"
                  class="rounded-md border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-bold text-slate-950 dark:text-white">{{ student.name }}</p>
                      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ localText(student.currentLevel) }}</p>
                    </div>
                    <span :class="['rounded-full px-3 py-1 text-xs font-bold', getStatusTone(student.status)]">{{ statusLabel(student.status) }}</span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <aside v-if="canTeach" class="grid gap-5">
            <article class="rounded-lg border border-purple-100 bg-purple-50 p-5 dark:border-purple-900/50 dark:bg-purple-950/30">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.rolePermissions }}</h2>
              <div class="mt-4 grid gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                <p v-for="permission in ui.classroomDetail.rolePermissions" :key="permission.role">
                  <strong>{{ permission.role }}:</strong> {{ permission.text }}
                </p>
              </div>
            </article>

            <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <h2 class="text-xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.teacherRestrictions }}</h2>
              <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                <li v-for="restriction in ui.classroomDetail.teacherRestrictions" :key="restriction">
                  {{ restriction }}
                </li>
              </ul>
            </article>
          </aside>
        </div>

        <div v-else-if="selectedTab === 'schedule'" class="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p class="eyebrow">{{ ui.classroomDetail.tabs.schedule }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ localText(classroom.className) }}</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.schedule }}</p>
            <dl class="mt-6 grid gap-4 sm:grid-cols-2">
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.teacher }}</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ teacherName }}</dd>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.schedule }}</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ getScheduleDaysLabel(schedule) }}</dd>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.startTime }}</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.startTime ?? ui.classroomDetail.fallbacks.pending }}</dd>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.endTime }}</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.endTime ?? ui.classroomDetail.fallbacks.pending }}</dd>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.timezone }}</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.timezone ?? ui.classroomDetail.fallbacks.pending }}</dd>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.classType }}</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.classType ?? ui.classroomDetail.fallbacks.pending }}</dd>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Duration</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ getScheduleDurationLabel(schedule?.durationMinutes) }}</dd>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <dt class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Holiday days</dt>
                <dd class="mt-1 font-semibold text-slate-950 dark:text-white">{{ schedule?.classType === 'Group' ? HOLIDAY_DAYS.join(', ') : 'Flexible' }}</dd>
              </div>
            </dl>
          </article>

          <form v-if="canManageSchedule" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveSchedule">
            <p class="eyebrow">{{ ui.classroomDetail.labels.teacherTool }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.actions.saveSchedule }}</h2>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label for="schedule-course" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.course }}</label>
                <select id="schedule-course" v-model="scheduleDraft.courseId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="course in managementCourses" :key="course.id" :value="course.id">{{ localText(course.title) }}</option>
                </select>
              </div>
              <div>
                <label for="schedule-teacher" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.teacher }}</label>
                <select id="schedule-teacher" v-model="scheduleDraft.teacherId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="teacher in availableTeachers" :key="teacher.id" :value="teacher.id">{{ teacher.name }}</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Days of week</span>
                <div class="mt-2 grid gap-2 sm:grid-cols-4">
                  <label v-for="day in ALL_WEEK_DAYS" :key="day" class="flex items-center gap-2 rounded-md border border-slate-200 p-3 text-sm dark:border-slate-700">
                    <input v-model="scheduleDraft.daysOfWeek" type="checkbox" :value="day" :disabled="scheduleDraft.classType === 'Group'">
                    <span>{{ day }}<span v-if="HOLIDAY_DAYS.includes(day)" class="block text-xs text-rose-500">Holiday</span></span>
                  </label>
                </div>
                <p class="mt-2 text-xs text-slate-500">Group classes run Monday–Friday at the same time. Special and Premium days are flexible.</p>
              </div>
              <div>
                <label for="schedule-timezone" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.timezone }}</label>
                <input id="schedule-timezone" v-model="scheduleDraft.timezone" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="schedule-start" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.startTime }}</label>
                <input id="schedule-start" v-model="scheduleDraft.startTime" type="text" placeholder="7:00 PM" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="schedule-end" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.endTime }}</label>
                <input id="schedule-end" v-model="scheduleDraft.endTime" type="text" readonly class="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
              </div>
              <div>
                <label for="schedule-type" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.classType }}</label>
                <select id="schedule-type" v-model="scheduleDraft.classType" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="classType in CLASS_TYPES" :key="classType" :value="classType">{{ classType }}</option>
                </select>
              </div>
              <div>
                <label for="schedule-duration" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Duration (minutes)</label>
                <input id="schedule-duration" v-model.number="scheduleDraft.durationMinutes" type="number" min="15" step="15" :readonly="scheduleDraft.classType === 'Group'" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm read-only:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:read-only:bg-slate-800">
              </div>
              <div>
                <label for="schedule-capacity" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.capacity }}</label>
                <input id="schedule-capacity" v-model.number="scheduleDraft.capacity" min="1" :max="scheduleDraft.classType === 'Special' ? 2 : undefined" type="number" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="schedule-platform" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Meeting platform</label>
                <select id="schedule-platform" v-model="scheduleDraft.meetingPlatform" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="platform in MEETING_PLATFORMS" :key="platform" :value="platform">{{ platform }}</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label for="schedule-link" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Meeting link</label>
                <input id="schedule-link" v-model="scheduleDraft.meetingLink" type="url" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="schedule-meeting-id" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Meeting ID</label>
                <input id="schedule-meeting-id" v-model="scheduleDraft.meetingId" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="schedule-password" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Meeting password</label>
                <input id="schedule-password" v-model="scheduleDraft.meetingPassword" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.saveSchedule }}</BaseButton>
              <p v-if="scheduleNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ scheduleNotice }}</p>
            </div>
          </form>
        </div>

        <div v-else-if="selectedTab === 'liveClass'" :class="['grid gap-8', currentUser?.role !== 'student' ? 'lg:grid-cols-[0.85fr_1.15fr]' : '']">
          <aside v-if="currentUser?.role !== 'student'" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p class="eyebrow">{{ ui.classroomDetail.labels.accessPreview }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.joinClassRuleCheck }}</h2>
            <label class="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="student-access">
              {{ ui.classroomDetail.labels.viewAsStudent }}
            </label>
            <select
              id="student-access"
              v-model="selectedStudentId"
              class="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
            >
              <option v-for="student in accessibleStudents" :key="student.id" :value="student.id">
                {{ student.name }} - {{ statusLabel(student.status) }}
              </option>
            </select>

            <div class="mt-5 rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.paymentStatusParent }}</p>
              <p class="mt-1 font-semibold text-slate-950 dark:text-white">
                {{ selectedStudentPayment ? statusLabel(selectedStudentPayment.status) : ui.classroomDetail.fallbacks.noPaymentRecord }}
              </p>
            </div>

            <div class="mt-5 rounded-md bg-purple-50 p-4 dark:bg-purple-950/40">
              <p :class="['inline-flex rounded-full px-3 py-1 text-xs font-bold', getStatusTone(studentAccess.studentStatus)]">
                {{ statusLabel(studentAccess.studentStatus) }}
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{{ liveAccessMessage }}</p>
            </div>
          </aside>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="eyebrow">{{ ui.classroomDetail.labels.liveClass }}</p>
                <h2 class="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{{ liveSession?.meetingPlatform ?? schedule?.meetingPlatform }} {{ ui.classroomDetail.labels.meetingLink }}</h2>
                <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {{ ui.classroomDetail.descriptions.liveClass }}
                </p>
              </div>
              <span class="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-slate-950">{{ liveSession?.meetingPlatform ?? schedule?.meetingPlatform }}</span>
            </div>

            <div class="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.meetingUrl }}</p>
              <p class="mt-2 break-all text-lg font-bold text-brand-purple dark:text-brand-gold">{{ liveSession?.meetingLink || schedule?.meetingLink || ui.classroomDetail.fallbacks.meetingLinkPending }}</p>
              <div class="mt-4 grid gap-3 sm:grid-cols-3">
                <div class="rounded-md bg-white p-3 dark:bg-slate-900">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Meeting ID</p>
                  <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ liveSession?.meetingId || schedule?.meetingId || ui.classroomDetail.fallbacks.notSet }}</p>
                </div>
                <div class="rounded-md bg-white p-3 dark:bg-slate-900">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.classDate }}</p>
                  <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ liveSession?.classDate || ui.classroomDetail.fallbacks.pending }}</p>
                </div>
                <div class="rounded-md bg-white p-3 dark:bg-slate-900">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.meetingPassword }}</p>
                  <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ liveSession?.meetingPassword || ui.classroomDetail.fallbacks.notSet }}</p>
                </div>
              </div>
              <p v-if="liveSession?.classNotes" class="mt-4 rounded-md bg-white p-4 text-sm leading-6 text-slate-700 dark:bg-slate-900 dark:text-slate-200">{{ localText(liveSession.classNotes) }}</p>
              <div class="mt-5">
                <a
                  v-if="canJoinLiveClass && (liveSession?.meetingLink || schedule?.meetingLink)"
                  :href="liveSession?.meetingLink || schedule?.meetingLink"
                  target="_blank"
                  rel="noreferrer"
                  class="focus-ring inline-flex rounded-md bg-brand-purple px-5 py-3 text-sm font-bold text-white shadow-lift hover:bg-brand-purpleDark dark:bg-brand-gold dark:text-slate-950 dark:hover:bg-amber-300"
                >
                  {{ ui.common.joinLiveClass }}
                </a>
                <div v-else class="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100">
                  {{ liveAccessMessage }}
                </div>
              </div>
            </div>

            <form v-if="canTeach" class="mt-6 rounded-lg border border-slate-200 p-5 dark:border-slate-800" @submit.prevent="updateLiveClass">
              <h3 class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.actions.saveLiveClass }}</h3>
              <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="live-platform" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Meeting platform</label>
                  <select id="live-platform" v-model="liveClassDraft.meetingPlatform" :disabled="!canManageSchedule" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:disabled:bg-slate-800">
                    <option v-for="platform in MEETING_PLATFORMS" :key="platform" :value="platform">{{ platform }}</option>
                  </select>
                </div>
                <div>
                  <label for="live-id" class="text-sm font-semibold text-slate-700 dark:text-slate-200">Meeting ID</label>
                  <input id="live-id" v-model="liveClassDraft.meetingId" type="text" :readonly="!canManageSchedule" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm read-only:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:read-only:bg-slate-800">
                </div>
                <div class="sm:col-span-2">
                  <label for="live-link" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.meetingUrl }}</label>
                  <input id="live-link" v-model="liveClassDraft.meetingLink" type="url" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                </div>
                <div>
                  <label for="live-password" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.meetingPassword }}</label>
                  <input id="live-password" v-model="liveClassDraft.meetingPassword" type="text" :readonly="!canManageSchedule" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm read-only:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:read-only:bg-slate-800">
                </div>
                <div>
                  <label for="live-date" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.classDate }}</label>
                  <input id="live-date" v-model="liveClassDraft.classDate" type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                </div>
                <div class="sm:col-span-2">
                  <label for="live-notes" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.classNotes }}</label>
                  <textarea id="live-notes" v-model="liveClassDraft.classNotes" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <BaseButton type="submit">{{ ui.classroomDetail.actions.saveLiveClass }}</BaseButton>
                <p v-if="liveClassNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ liveClassNotice }}</p>
              </div>
            </form>

            <div class="mt-6">
              <h3 class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.futureVideo }}</h3>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="feature in classroom.futureVideoFeatures"
                  :key="feature"
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {{ videoFeatureLabel(feature) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'homework'" :class="['grid gap-8', canTeach ? 'xl:grid-cols-[0.9fr_1.1fr]' : '']">
          <form v-if="canTeach" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createAssignment">
            <p class="eyebrow">{{ ui.classroomDetail.labels.teacherTool }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.createAssignment }}</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.createAssignment }}</p>

            <div class="mt-5 grid gap-4">
              <div>
                <label for="assignment-title" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.title }}</label>
                <input id="assignment-title" v-model="assignmentDraft.title" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="assignment-instructions" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.instructions }}</label>
                <textarea id="assignment-instructions" v-model="assignmentDraft.instructions" rows="4" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="assignment-due" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.dueDate }}</label>
                  <input id="assignment-due" v-model="assignmentDraft.dueDate" type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                </div>
                <div>
                  <label for="assignment-status" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.status }}</label>
                  <select id="assignment-status" v-model="assignmentDraft.status" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                    <option v-for="status in assignmentStatuses" :key="status" :value="status">{{ statusLabel(status) }}</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="assignment-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.fileAttachmentPlaceholder }}</label>
                <input id="assignment-file" type="file" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:font-semibold file:text-brand-purple dark:border-slate-700 dark:bg-slate-950 dark:file:bg-slate-800 dark:file:text-brand-gold" @change="selectAssignmentFile">
                <p v-if="assignmentDraft.fileAttachmentLabel" class="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ assignmentDraft.fileAttachmentLabel }}</p>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.addAssignment }}</BaseButton>
              <p v-if="assignmentNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ assignmentNotice }}</p>
            </div>
          </form>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.assignments }}</h2>
            <div class="mt-5 grid gap-4">
              <article v-for="assignment in assignments" :key="assignment.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 class="font-bold text-slate-950 dark:text-white">{{ localText(assignment.title) }}</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ localText(assignment.instructions) }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(assignment.status)]">{{ statusLabel(assignment.status) }}</span>
                </div>
                <div class="mt-4 grid gap-3 sm:grid-cols-3">
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800"><strong>{{ ui.classroomDetail.labels.due }}:</strong> {{ assignment.dueDate }}</p>
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800">
                    <strong>{{ ui.classroomDetail.labels.file }}:</strong>
                    <a v-if="assignment.attachmentUrl" :href="assignment.attachmentUrl" target="_blank" rel="noreferrer" class="font-semibold text-brand-purple hover:underline dark:text-brand-gold">{{ assignment.fileAttachmentLabel }}</a>
                    <span v-else>{{ assignment.fileAttachmentLabel }}</span>
                  </p>
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800"><strong>{{ ui.classroomDetail.labels.class }}:</strong> {{ localText(classroom.className) }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div v-if="selectedTab === 'homework'" :class="['mt-8 grid gap-8', canSubmitHomework && canTeach ? 'xl:grid-cols-[0.9fr_1.1fr]' : '']">
          <form v-if="canSubmitHomework" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="submitHomework">
            <p class="eyebrow">{{ ui.classroomDetail.labels.studentTool }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.submitHomework }}</h2>
            <div class="mt-5 grid gap-4">
              <div>
                <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.student }}</p>
                <p class="mt-2 rounded-md bg-slate-50 px-4 py-3 text-sm font-bold text-slate-950 dark:bg-slate-800 dark:text-white">{{ selectedStudent?.name }}</p>
              </div>
              <div>
                <label for="homework-assignment" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.assignment }}</label>
                <select id="homework-assignment" v-model="homeworkDraft.assignmentId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="assignment in assignments" :key="assignment.id" :value="assignment.id">{{ localText(assignment.title) }}</option>
                </select>
              </div>
              <div>
                <label for="homework-answer" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.textAnswer }}</label>
                <textarea id="homework-answer" v-model="homeworkDraft.textAnswer" rows="4" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div>
                <label for="homework-comment" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.studentComment }}</label>
                <textarea id="homework-comment" v-model="homeworkDraft.studentComment" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div>
                <label for="homework-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.fileUploadPlaceholder }}</label>
                <input id="homework-file" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.txt" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:font-semibold file:text-brand-purple dark:border-slate-700 dark:bg-slate-950 dark:file:bg-slate-800 dark:file:text-brand-gold" @change="selectHomeworkFile">
                <p v-if="homeworkDraft.fileUploadLabel" class="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ homeworkDraft.fileUploadLabel }}</p>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.submitHomework }}</BaseButton>
              <p v-if="homeworkNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ homeworkNotice }}</p>
            </div>
          </form>

          <div v-if="visibleHomeworkSubmissions.length" class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.teacherReviewQueue }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.teacherReviewQueue }}</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[940px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.student }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.assignment }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.submitted }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.file }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.status }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.score }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.feedback }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="submission in visibleHomeworkSubmissions" :key="submission.id">
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ submission.studentName }}</td>
                    <td class="px-5 py-4">{{ submission.assignmentTitle }}</td>
                    <td class="px-5 py-4">{{ submission.submittedAt }}</td>
                    <td class="px-5 py-4">
                      <a v-if="submission.fileUploadUrl" :href="submission.fileUploadUrl" target="_blank" rel="noreferrer" class="font-semibold text-brand-purple hover:underline dark:text-brand-gold">{{ submission.fileUploadLabel }}</a>
                      <span v-else>{{ submission.fileUploadLabel }}</span>
                    </td>
                    <td class="px-5 py-4">
                      <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(submission.status)]">{{ statusLabel(submission.status) }}</span>
                    </td>
                    <td class="px-5 py-4">
                      <input v-if="canTeach" v-model.number="reviewDraft[submission.id]!.score" min="0" max="100" type="number" class="focus-ring w-20 rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                      <span v-else>{{ submission.score ?? ui.classroomDetail.fallbacks.pending }}</span>
                    </td>
                    <td class="px-5 py-4">
                      <div v-if="canTeach" class="min-w-64">
                        <textarea v-model="reviewDraft[submission.id]!.feedback" rows="2" class="focus-ring w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
                        <button type="button" class="focus-ring mt-2 rounded-md bg-brand-purple px-3 py-2 text-xs font-bold text-white dark:bg-brand-gold dark:text-slate-950" @click="saveHomeworkReview(submission.id)">{{ ui.classroomDetail.actions.saveReview }}</button>
                      </div>
                      <span v-else>{{ submission.feedback ? localText(submission.feedback) : ui.classroomDetail.fallbacks.awaitingReview }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-if="reviewNotice" class="border-t border-slate-200 p-4 text-sm font-semibold text-emerald-600 dark:border-slate-800 dark:text-emerald-300">{{ reviewNotice }}</p>
          </div>
        </div>

        <div v-else-if="selectedTab === 'attendance'" :class="['grid gap-8', canTeach ? 'xl:grid-cols-[0.85fr_1.15fr]' : '']">
          <form v-if="canTeach" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveAttendance">
            <p class="eyebrow">{{ ui.classroomDetail.labels.teacherTool }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.markAttendance }}</h2>
            <div class="mt-5">
              <label for="attendance-date" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.date }}</label>
              <input id="attendance-date" v-model="attendanceDate" type="date" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
            </div>
            <div class="mt-5 grid gap-3">
              <label
                v-for="student in enrolledStudents"
                :key="student.id"
                class="grid gap-3 rounded-md border border-slate-200 p-4 dark:border-slate-800 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <span>
                  <span class="block font-semibold text-slate-950 dark:text-white">{{ student.name }}</span>
                  <span class="text-sm text-slate-500 dark:text-slate-400">{{ localText(student.currentLevel) }}</span>
                </span>
                <select v-model="attendanceDraft[student.id]" class="focus-ring rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="status in classroomAttendanceStatuses" :key="status" :value="status">{{ statusLabel(status) }}</option>
                </select>
              </label>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.saveAttendance }}</BaseButton>
              <p v-if="attendanceSaved" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ ui.classroomDetail.notices.attendanceSaved }}</p>
            </div>
          </form>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.attendanceHistory }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.attendanceHistory }}</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[720px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.date }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.student }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.status }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.trial }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="record in visibleAttendanceRows" :key="record.id">
                    <td class="px-5 py-4">{{ record.date }}</td>
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ record.studentName }}</td>
                    <td class="px-5 py-4">
                      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">{{ statusLabel(record.status) }}</span>
                    </td>
                    <td class="px-5 py-4">{{ record.isTrialClass ? ui.classroomDetail.fallbacks.yes : ui.classroomDetail.fallbacks.no }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'materials'" :class="['grid gap-8', canTeach ? 'xl:grid-cols-[0.85fr_1.15fr]' : '']">
          <form v-if="canTeach" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createMaterial">
            <p class="eyebrow">{{ ui.classroomDetail.labels.teacherTool }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.addResourcePlaceholder }}</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.addResource }}</p>
            <div class="mt-5 grid gap-4">
              <div>
                <label for="resource-title" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.title }}</label>
                <input id="resource-title" v-model="resourceDraft.title" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="resource-type" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.type }}</label>
                <select id="resource-type" v-model="resourceDraft.type" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="type in resourceTypes" :key="type" :value="type">{{ resourceTypeLabel(type) }}</option>
                </select>
              </div>
              <div>
                <label for="resource-description" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.instructions }}</label>
                <textarea id="resource-description" v-model="resourceDraft.description" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div>
                <label for="resource-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.fileOrLinkPlaceholder }}</label>
                <input id="resource-file" type="file" accept=".pdf,.doc,.docx,.odt,.txt,.rtf,.xls,.xlsx,.mp3,.wav,.m4a" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:font-semibold file:text-brand-purple dark:border-slate-700 dark:bg-slate-950 dark:file:bg-slate-800 dark:file:text-brand-gold" @change="selectMaterialFile">
                <p v-if="resourceDraft.fileLabel" class="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{{ resourceDraft.fileLabel }}</p>
              </div>
              <div>
                <label for="resource-url" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.meetingUrl }}</label>
                <input id="resource-url" v-model="resourceDraft.url" type="url" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.addMaterial }}</BaseButton>
              <p v-if="materialNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ materialNotice }}</p>
            </div>
          </form>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.classResources }}</h2>
            <div class="mt-5 grid gap-4">
              <article v-for="resource in resources" :key="resource.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 class="font-bold text-slate-950 dark:text-white">{{ localText(resource.title) }}</h3>
                    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ localText(resource.description) }}</p>
                  </div>
                  <span class="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-brand-purple dark:bg-purple-950/40 dark:text-purple-100">{{ resourceTypeLabel(resource.type) }}</span>
                </div>
                <a v-if="resource.url && resource.url !== '#'" :href="resource.url" target="_blank" rel="noreferrer" class="focus-ring mt-3 inline-flex text-sm font-semibold text-brand-purple hover:underline dark:text-brand-gold">{{ resource.fileLabel }}</a>
                <span v-else class="mt-3 inline-flex text-sm font-semibold text-slate-500 dark:text-slate-400">{{ resource.fileLabel }}</span>
              </article>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'progress'" class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="progress in visibleProgressRows"
            :key="progress.id"
            class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="eyebrow">{{ ui.classroomDetail.labels.progress }}</p>
                <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ progress.studentName }}</h2>
              </div>
              <p class="text-2xl font-black text-brand-purple dark:text-brand-gold">{{ progress.learningProgress }}%</p>
            </div>
            <div class="mt-5 space-y-4">
              <div>
                <div class="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>{{ ui.classroomDetail.labels.attendanceHistory }}</span>
                  <span>{{ progress.attendancePercentage }}%</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${progress.attendancePercentage}%` }" />
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>{{ ui.classroomDetail.labels.homeworkCompletion }}</span>
                  <span>{{ progress.homeworkCompletion }}%</span>
                </div>
                <div class="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div class="h-2 rounded-full bg-brand-purple dark:bg-brand-gold" :style="{ width: `${progress.homeworkCompletion}%` }" />
                </div>
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.quizAverage }}</p>
                  <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ progress.quizAverage }}%</p>
                </div>
                <div class="rounded-md bg-slate-50 p-3 dark:bg-slate-800">
                  <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.learningProgress }}</p>
                  <p class="mt-1 font-semibold text-slate-950 dark:text-white">{{ progress.learningProgress }}%</p>
                </div>
              </div>
              <div class="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
                <p class="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.teacherNotes }}</p>
                <p class="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{{ localText(progress.teacherEvaluation) }}</p>
              </div>
              <p class="rounded-md bg-purple-50 p-4 text-sm leading-6 text-slate-700 dark:bg-purple-950/30 dark:text-slate-200">
                {{ localText(progress.teacherNotes) }}
              </p>
            </div>
          </article>
        </div>

        <div v-if="selectedTab === 'progress'" class="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <form v-if="canTeach" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createMonthlyReport">
            <p class="eyebrow">{{ ui.classroomDetail.labels.monthlyReports }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.actions.saveReport }}</h2>
            <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.monthlyReports }}</p>
            <div class="mt-5 grid gap-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="report-student" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.student }}</label>
                  <select id="report-student" v-model="reportDraft.studentId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                    <option v-for="student in enrolledStudents" :key="student.id" :value="student.id">{{ student.name }}</option>
                  </select>
                </div>
                <div>
                  <label for="report-month" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.reportMonth }}</label>
                  <input id="report-month" v-model="reportDraft.month" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                </div>
              </div>
              <div>
                <label for="report-attendance" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.attendanceSummary }}</label>
                <textarea id="report-attendance" v-model="reportDraft.attendanceSummary" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div>
                <label for="report-progress" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.academicProgress }}</label>
                <textarea id="report-progress" v-model="reportDraft.academicProgress" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="report-strengths" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.strengths }}</label>
                  <textarea id="report-strengths" v-model="reportDraft.strengths" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
                </div>
                <div>
                  <label for="report-improvement" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.areasForImprovement }}</label>
                  <textarea id="report-improvement" v-model="reportDraft.areasForImprovement" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
                </div>
              </div>
              <div>
                <label for="report-notes" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.teacherNotes }}</label>
                <textarea id="report-notes" v-model="reportDraft.teacherNotes" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.saveReport }}</BaseButton>
              <p v-if="reportNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ reportNotice }}</p>
            </div>
          </form>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.monthlyReports }}</h2>
            <div class="mt-5 grid gap-4">
              <article v-for="report in visibleReports" :key="report.id" class="rounded-md border border-slate-200 p-5 dark:border-slate-800">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 class="font-bold text-slate-950 dark:text-white">{{ getStudentName(report.studentId) }}</h3>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ report.month }}</p>
                  </div>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(report.status)]">{{ statusLabel(report.status) }}</span>
                </div>
                <dl class="mt-4 grid gap-4 text-sm">
                  <div><dt class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.attendanceSummary }}</dt><dd class="mt-1 leading-6 text-slate-600 dark:text-slate-300">{{ report.attendanceSummary }}</dd></div>
                  <div><dt class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.academicProgress }}</dt><dd class="mt-1 leading-6 text-slate-600 dark:text-slate-300">{{ report.academicProgress }}</dd></div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div><dt class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.strengths }}</dt><dd class="mt-1 leading-6 text-slate-600 dark:text-slate-300">{{ report.strengths }}</dd></div>
                    <div><dt class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.areasForImprovement }}</dt><dd class="mt-1 leading-6 text-slate-600 dark:text-slate-300">{{ report.areasForImprovement }}</dd></div>
                  </div>
                  <div><dt class="font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.teacherNotes }}</dt><dd class="mt-1 leading-6 text-slate-600 dark:text-slate-300">{{ report.teacherNotes }}</dd></div>
                </dl>
              </article>
              <p v-if="!visibleReports.length" class="rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">{{ ui.classroomDetail.fallbacks.pending }}</p>
            </div>
          </div>
        </div>

        <div v-if="selectedTab === 'announcements'" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="eyebrow">{{ ui.classroomDetail.labels.announcements }}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.classUpdates }}</h2>
            </div>
          </div>
          <form v-if="canPostAnnouncements" class="mt-6 grid gap-4 rounded-lg bg-slate-50 p-5 dark:bg-slate-800/60" @submit.prevent="createAnnouncement">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="announcement-title" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.title }}</label>
                <input id="announcement-title" v-model="announcementDraft.title" type="text" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label for="announcement-type" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.announcementType }}</label>
                <select id="announcement-type" v-model="announcementDraft.type" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="type in announcementTypes" :key="type" :value="type">{{ localText(type) }}</option>
                </select>
              </div>
            </div>
            <div>
              <label for="announcement-message" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.message }}</label>
              <textarea id="announcement-message" v-model="announcementDraft.message" rows="3" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"></textarea>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.postAnnouncement }}</BaseButton>
              <p v-if="announcementNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ announcementNotice }}</p>
            </div>
          </form>
          <div class="mt-6 grid gap-4">
            <article v-for="announcement in announcements" :key="announcement.id" class="rounded-md border border-slate-200 p-4 dark:border-slate-800">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple dark:text-brand-gold">{{ localText(announcement.type) }}</p>
                  <h3 class="mt-2 font-bold text-slate-950 dark:text-white">{{ localText(announcement.title) }}</h3>
                  <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ localText(announcement.message) }}</p>
                </div>
                <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <p>{{ localText(announcement.authorRole) }}</p>
                  <p>{{ announcement.postedAt }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>

  <PageBackdrop v-else :image="pageBackgrounds.classrooms" class="section-padding">
    <div class="container-wide">
      <div class="rounded-lg border border-slate-200 bg-white/95 p-8 text-brand-ink shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
        <p class="eyebrow">{{ ui.classroomDetail.labels.notFoundEyebrow }}</p>
        <h1 class="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.notFoundTitle }}</h1>
        <p class="mt-4 text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.notFound }}</p>
        <BaseButton to="/classrooms" class="mt-6">{{ ui.classroomDetail.actions.viewClassrooms }}</BaseButton>
      </div>
    </div>
  </PageBackdrop>
</template>
