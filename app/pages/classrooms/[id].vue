<script setup lang="ts">
import { pageBackgrounds } from '~/data/pageBackgrounds'
import {
  assignmentStatuses,
  attendanceStatuses,
  getClassroomAnnouncements,
  getClassroomAssignments,
  getClassroomAttendance,
  getClassroomById,
  getClassroomHomeworkSubmissions,
  getClassroomProgress,
  getClassroomResources,
  getClassroomSchedule,
  getClassroomStudents,
  getCourseTitle,
  getPaymentForStudent,
  getStatusTone,
  getStudentClassroomAccess,
  getStudentName,
  getTeacherName,
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
  ClassroomAssignment,
  HomeworkSubmission,
  ResourceType,
  StudentClassroomAccess
} from '~/types'

const route = useRoute()
const { locale } = useI18n()
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
  'liveClass',
  'assignments',
  'homework',
  'attendance',
  'resources',
  'progress',
  'announcements'
] as const

type ClassroomTab = (typeof tabs)[number]

const classroomId = computed(() => String(route.params.id ?? ''))
const classroom = computed(() => getClassroomById(classroomId.value))
const schedule = computed(() => getClassroomSchedule(classroomId.value))
const enrolledStudents = computed(() => getClassroomStudents(classroomId.value))
const selectedTab = ref<ClassroomTab>('overview')
const selectedStudentId = ref('')
const assignmentNotice = ref('')
const homeworkNotice = ref('')
const attendanceSaved = ref(false)
const teacherDraftAssignments = ref<ClassroomAssignment[]>([])
const studentDraftSubmissions = ref<HomeworkSubmission[]>([])
const attendanceDraft = reactive<Record<string, AttendanceStatus>>({})

const assignmentDraft = reactive({
  title: '',
  instructions: '',
  dueDate: '',
  fileAttachmentLabel: '',
  status: 'published' as AssignmentStatus
})

const homeworkDraft = reactive({
  assignmentId: '',
  textAnswer: '',
  fileUploadLabel: ''
})

const resourceDraft = reactive({
  title: '',
  type: 'PDF Lesson' as ResourceType,
  fileLabel: ''
})

const fallbackAccess = computed<StudentClassroomAccess>(() => ({
  canJoin: false,
  isEnrolled: false,
  requiresPayment: false,
  studentStatus: 'Unknown',
  message: ui.value.classroomDetail.fallbacks.selectStudentAccess
}))

watchEffect(() => {
  const studentIds = enrolledStudents.value.map((student) => student.id)

  if (!studentIds.includes(selectedStudentId.value)) {
    selectedStudentId.value = studentIds[0] ?? ''
  }

  enrolledStudents.value.forEach((student) => {
    attendanceDraft[student.id] = attendanceDraft[student.id] ?? 'present'
  })
})

const courseTitle = computed(() =>
  classroom.value
    ? localText(getCourseTitle(classroom.value.courseId))
    : ui.value.classroomDetail.fallbacks.unknownCourse
)

const teacherName = computed(() =>
  classroom.value ? getTeacherName(classroom.value.teacherId) : ui.value.classroomDetail.fallbacks.unassignedTeacher
)

const selectedStudent = computed(() =>
  enrolledStudents.value.find((student) => student.id === selectedStudentId.value)
)

const selectedStudentPayment = computed(() =>
  selectedStudent.value ? getPaymentForStudent(selectedStudent.value.id) : undefined
)

const studentAccess = computed(() =>
  selectedStudentId.value
    ? getStudentClassroomAccess(classroomId.value, selectedStudentId.value)
    : fallbackAccess.value
)

const assignments = computed(() => [
  ...getClassroomAssignments(classroomId.value),
  ...teacherDraftAssignments.value.filter((assignment) => assignment.classroomId === classroomId.value)
])

const homeworkSubmissions = computed(() =>
  [
    ...getClassroomHomeworkSubmissions(classroomId.value),
    ...studentDraftSubmissions.value.filter((submission) => submission.classroomId === classroomId.value)
  ].map((submission) => ({
    ...submission,
    assignmentTitle:
      localText(assignments.value.find((assignment) => assignment.id === submission.assignmentId)?.title ?? '') ||
      ui.value.classroomDetail.fallbacks.unknownAssignment,
    studentName: getStudentName(submission.studentId)
  }))
)

const attendanceRows = computed(() =>
  getClassroomAttendance(classroomId.value).map((record) => ({
    ...record,
    studentName: getStudentName(record.studentId)
  }))
)

const resources = computed(() => getClassroomResources(classroomId.value))
const progressRows = computed(() =>
  getClassroomProgress(classroomId.value).map((progress) => ({
    ...progress,
    studentName: getStudentName(progress.studentId)
  }))
)
const announcements = computed(() => getClassroomAnnouncements(classroomId.value))

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

  teacherDraftAssignments.value.push({
    id: `assignment-mock-${teacherDraftAssignments.value.length + 1}`,
    classroomId: classroom.value.id,
    title: assignmentDraft.title.trim(),
    instructions: assignmentDraft.instructions.trim() || ui.value.classroomDetail.fallbacks.teacherInstructions,
    dueDate: assignmentDraft.dueDate || '2026-06-30',
    fileAttachmentLabel: assignmentDraft.fileAttachmentLabel.trim() || ui.value.classroomDetail.fallbacks.noAttachment,
    status: assignmentDraft.status
  })

  assignmentDraft.title = ''
  assignmentDraft.instructions = ''
  assignmentDraft.dueDate = ''
  assignmentDraft.fileAttachmentLabel = ''
  assignmentDraft.status = 'published'
  assignmentNotice.value = ui.value.classroomDetail.notices.assignmentAdded
}

const submitHomework = () => {
  if (!classroom.value || !selectedStudent.value || !homeworkDraft.assignmentId) {
    homeworkNotice.value = ui.value.classroomDetail.notices.selectStudentAndAssignment
    return
  }

  studentDraftSubmissions.value.push({
    id: `submission-mock-${studentDraftSubmissions.value.length + 1}`,
    classroomId: classroom.value.id,
    assignmentId: homeworkDraft.assignmentId,
    studentId: selectedStudent.value.id,
    textAnswer: homeworkDraft.textAnswer.trim() || ui.value.classroomDetail.fallbacks.studentAnswer,
    fileUploadLabel: homeworkDraft.fileUploadLabel.trim() || ui.value.classroomDetail.fallbacks.noFileUploaded,
    submittedAt: '2026-06-13',
    status: 'submitted',
    score: null,
    feedback: ''
  })

  homeworkDraft.textAnswer = ''
  homeworkDraft.fileUploadLabel = ''
  homeworkNotice.value = ui.value.classroomDetail.notices.homeworkSubmitted
}

const saveAttendance = () => {
  attendanceSaved.value = true
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
            <span class="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-slate-950">{{ classroom.meetingProvider }}</span>
          </div>
          <dl class="mt-5 grid gap-3 text-sm text-slate-200">
            <div>
              <dt class="font-bold text-white">{{ ui.classroomDetail.labels.teacher }}</dt>
              <dd class="mt-1">{{ teacherName }}</dd>
            </div>
            <div>
              <dt class="font-bold text-white">{{ ui.classroomDetail.labels.schedule }}</dt>
              <dd class="mt-1">
                {{ schedule ? scheduleLabel(schedule.day, schedule.time, schedule.timezone) : ui.common.schedulePending }}
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
        <div v-if="selectedTab === 'overview'" class="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
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
                  {{ schedule ? scheduleLabel(schedule.day, schedule.time) : ui.classroomDetail.fallbacks.pending }}
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
            </div>

            <div class="mt-6">
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

          <aside class="grid gap-5">
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

        <div v-else-if="selectedTab === 'liveClass'" class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
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
              <option v-for="student in enrolledStudents" :key="student.id" :value="student.id">
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
              <p class="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{{ accessMessage(studentAccess.message) }}</p>
            </div>
          </aside>

          <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="eyebrow">{{ ui.classroomDetail.labels.liveClass }}</p>
                <h2 class="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{{ classroom.meetingProvider }} {{ ui.classroomDetail.labels.meetingLink }}</h2>
                <p class="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {{ ui.classroomDetail.descriptions.liveClass }}
                </p>
              </div>
              <span class="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-slate-950">{{ classroom.meetingProvider }}</span>
            </div>

            <div class="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ ui.classroomDetail.labels.meetingUrl }}</p>
              <p class="mt-2 break-all text-lg font-bold text-brand-purple dark:text-brand-gold">{{ schedule?.meetingLink ?? ui.classroomDetail.fallbacks.meetingLinkPending }}</p>
              <div class="mt-5">
                <a
                  v-if="studentAccess.canJoin && schedule"
                  :href="schedule.meetingLink"
                  target="_blank"
                  rel="noreferrer"
                  class="focus-ring inline-flex rounded-md bg-brand-purple px-5 py-3 text-sm font-bold text-white shadow-lift hover:bg-brand-purpleDark dark:bg-brand-gold dark:text-slate-950 dark:hover:bg-amber-300"
                >
                  {{ ui.common.joinLiveClass }}
                </a>
                <div v-else class="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100">
                  {{ accessMessage(studentAccess.message) }}
                </div>
              </div>
            </div>

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

        <div v-else-if="selectedTab === 'assignments'" class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="createAssignment">
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
                <input id="assignment-file" v-model="assignmentDraft.fileAttachmentLabel" type="text" :placeholder="ui.classroomDetail.placeholders.lessonFile" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
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
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800"><strong>{{ ui.classroomDetail.labels.file }}:</strong> {{ assignment.fileAttachmentLabel }}</p>
                  <p class="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-800"><strong>{{ ui.classroomDetail.labels.class }}:</strong> {{ localText(classroom.className) }}</p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'homework'" class="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="submitHomework">
            <p class="eyebrow">{{ ui.classroomDetail.labels.studentTool }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.submitHomework }}</h2>
            <div class="mt-5 grid gap-4">
              <div>
                <label for="homework-student" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.student }}</label>
                <select id="homework-student" v-model="selectedStudentId" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option v-for="student in enrolledStudents" :key="student.id" :value="student.id">{{ student.name }}</option>
                </select>
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
                <label for="homework-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.fileUploadPlaceholder }}</label>
                <input id="homework-file" v-model="homeworkDraft.fileUploadLabel" type="text" :placeholder="ui.classroomDetail.placeholders.homeworkPhoto" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
            </div>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              <BaseButton type="submit">{{ ui.classroomDetail.actions.submitHomework }}</BaseButton>
              <p v-if="homeworkNotice" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ homeworkNotice }}</p>
            </div>
          </form>

          <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 p-5 dark:border-slate-800">
              <h2 class="text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.teacherReviewQueue }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ ui.classroomDetail.descriptions.teacherReviewQueue }}</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[840px] text-sm">
                <thead class="bg-slate-50 text-left text-slate-500 dark:bg-slate-800/60 dark:text-slate-300">
                  <tr>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.student }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.assignment }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.submitted }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.status }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.score }}</th>
                    <th class="px-5 py-3 font-semibold">{{ ui.classroomDetail.labels.feedback }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr v-for="submission in homeworkSubmissions" :key="submission.id">
                    <td class="px-5 py-4 font-semibold text-slate-950 dark:text-white">{{ submission.studentName }}</td>
                    <td class="px-5 py-4">{{ submission.assignmentTitle }}</td>
                    <td class="px-5 py-4">{{ submission.submittedAt }}</td>
                    <td class="px-5 py-4">
                      <span :class="['rounded-full px-3 py-1 text-xs font-bold uppercase', getStatusTone(submission.status)]">{{ statusLabel(submission.status) }}</span>
                    </td>
                    <td class="px-5 py-4">{{ submission.score ?? ui.classroomDetail.fallbacks.pending }}</td>
                    <td class="px-5 py-4">{{ submission.feedback ? localText(submission.feedback) : ui.classroomDetail.fallbacks.awaitingReview }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'attendance'" class="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" @submit.prevent="saveAttendance">
            <p class="eyebrow">{{ ui.classroomDetail.labels.teacherTool }}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.markAttendance }}</h2>
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
                  <option v-for="status in attendanceStatuses" :key="status" :value="status">{{ statusLabel(status) }}</option>
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
                  <tr v-for="record in attendanceRows" :key="record.id">
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

        <div v-else-if="selectedTab === 'resources'" class="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <form class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
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
                <label for="resource-file" class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ ui.classroomDetail.labels.fileOrLinkPlaceholder }}</label>
                <input id="resource-file" v-model="resourceDraft.fileLabel" type="text" :placeholder="ui.classroomDetail.placeholders.resourceFile" class="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
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
                <p class="mt-3 text-sm font-semibold text-brand-purple dark:text-brand-gold">{{ resource.fileLabel }}</p>
              </article>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'progress'" class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="progress in progressRows"
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
              <p class="rounded-md bg-purple-50 p-4 text-sm leading-6 text-slate-700 dark:bg-purple-950/30 dark:text-slate-200">
                {{ localText(progress.teacherNotes) }}
              </p>
            </div>
          </article>
        </div>

        <div v-else class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="eyebrow">{{ ui.classroomDetail.labels.announcements }}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{{ ui.classroomDetail.labels.classUpdates }}</h2>
            </div>
            <BaseButton variant="outline">{{ ui.classroomDetail.actions.postAnnouncement }}</BaseButton>
          </div>
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
