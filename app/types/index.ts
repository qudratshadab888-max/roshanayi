export type CourseCategory = string

export interface Course {
  slug: string
  title: string
  category: CourseCategory
  summary: string
  description: string
  level: string
  ageGroup: string
  duration: string
  lessons: number
  format: string
  price: string
  rating: string
  students: string
  featured: boolean
  accentClass: string
  teacherSlug: string
  benefits: string[]
  outcomes: string[]
  syllabus: string[]
  parentNote: string
}

export interface Teacher {
  slug: string
  name: string
  role: string
  specialty: CourseCategory | 'Early Learning'
  location: string
  experience: string
  credentials: string
  bio: string
  languages: string[]
  initials: string
  avatarClass: string
  approach: string
}

export interface Testimonial {
  name: string
  location: string
  quote: string
  result: string
}

export interface FaqItem {
  question: string
  answer: string
}

export type AcademyRole = 'Admin' | 'Teacher' | 'Parent' | 'Student'

export type StudentStatus = 'Trial' | 'Payment Required' | 'Active' | 'Inactive'

export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'overdue'

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused'

export type ClassroomStatus = 'Active' | 'Trial Only' | 'Paused' | 'Full'

export type MeetingProvider = 'Zoom' | 'Google Meet' | 'Jitsi'

export type AssignmentStatus = 'draft' | 'published' | 'closed'

export type HomeworkStatus = 'submitted' | 'late' | 'reviewed'

export type ResourceType =
  | 'PDF Lesson'
  | 'Audio File'
  | 'Video Link'
  | 'Quran Practice'
  | 'Vocabulary Sheet'
  | 'Class Notes'

export type AnnouncementType =
  | 'class cancellation'
  | 'homework reminder'
  | 'schedule change'
  | 'parent meeting'

export type ReferralRewardStatus =
  | 'tracking'
  | 'eligible'
  | 'available'
  | 'approved'
  | 'rejected'

export type ReferralFamilyApprovalStatus = 'approved' | 'needs_review' | 'rejected'

export interface ManagementParent {
  id: string
  name: string
  country: string
  timezone: string
  whatsapp: string
  email: string
  referralCode: string
}

export interface ManagementTeacher {
  id: string
  name: string
  specialties: string[]
  timezone: string
  activeClasses: number
}

export interface ManagementStudent {
  id: string
  parentId: string
  name: string
  age: number
  country: string
  timezone: string
  selectedCourseId: string
  currentLevel: string
  preferredClassTime: string
  notes: string
  status: StudentStatus
  trialClassesAllowed: number
  referralCode: string
}

export interface ManagementCourse {
  id: string
  category: string
  title: string
  level: string
  ageGroup: string
  teacherId: string
  schedule: string
  capacity: number
  price: number
  description: string
}

export interface ClassSchedule {
  id: string
  courseId: string
  teacherId: string
  day: string
  time: string
  timezone: string
  meetingLink: string
  capacity: number
  enrolledStudentIds: string[]
}

export interface Classroom {
  id: string
  className: string
  courseId: string
  teacherId: string
  scheduleId: string
  level: string
  status: ClassroomStatus
  meetingProvider: MeetingProvider
  description: string
  futureVideoFeatures: string[]
}

export interface ClassroomAssignment {
  id: string
  classroomId: string
  title: string
  instructions: string
  dueDate: string
  fileAttachmentLabel: string
  status: AssignmentStatus
}

export interface HomeworkSubmission {
  id: string
  classroomId: string
  assignmentId: string
  studentId: string
  textAnswer: string
  fileUploadLabel: string
  submittedAt: string
  status: HomeworkStatus
  score: number | null
  feedback: string
}

export interface ClassroomResource {
  id: string
  classroomId: string
  title: string
  type: ResourceType
  description: string
  fileLabel: string
  addedByTeacherId: string
  addedAt: string
  url: string
}

export interface ClassroomProgress {
  id: string
  classroomId: string
  studentId: string
  attendancePercentage: number
  homeworkCompletion: number
  quizAverage: number
  teacherNotes: string
  learningProgress: number
}

export interface ClassroomAnnouncement {
  id: string
  classroomId: string
  authorRole: 'Teacher' | 'Admin'
  title: string
  type: AnnouncementType
  message: string
  postedAt: string
}

export interface StudentClassroomAccess {
  canJoin: boolean
  isEnrolled: boolean
  requiresPayment: boolean
  studentStatus: StudentStatus | 'Not Enrolled' | 'Unknown'
  message: string
}

export interface PaymentRecord {
  id: string
  studentId: string
  parentId: string
  courseId: string
  amount: number
  month: string
  status: PaymentStatus
  receiptNumber: string
  adminConfirmation: boolean
}

export interface AttendanceRecord {
  id: string
  scheduleId: string
  courseId: string
  teacherId: string
  studentId: string
  date: string
  status: AttendanceStatus
  isTrialClass: boolean
}

export interface ReferralRecord {
  id: string
  referralCode: string
  referrerParentId: string
  referrerStudentId: string
  referredStudentName: string
  referredParentName: string
  referredFamilyKey: string
  dateRegistered: string
  registrationComplete: boolean
  trialClassesAttended: number
  paymentStatus: PaymentStatus
  adminPaymentConfirmed: boolean
  familyApprovalStatus: ReferralFamilyApprovalStatus
}

export interface ReferralReward {
  id: string
  referralCode: string
  referrerParentId: string
  referrerStudentId: string
  status: ReferralRewardStatus
  discountPercent: number
  discountMonth: string
  adminReviewed: boolean
  note: string
}
