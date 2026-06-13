import type {
  AssignmentStatus,
  AttendanceRecord,
  AttendanceStatus,
  Classroom,
  ClassroomAnnouncement,
  ClassroomAssignment,
  ClassroomProgress,
  ClassroomResource,
  HomeworkSubmission,
  ClassSchedule,
  ManagementCourse,
  ManagementParent,
  ManagementStudent,
  ManagementTeacher,
  PaymentRecord,
  ReferralRecord,
  ReferralReward,
  ReferralRewardStatus,
  ResourceType,
  StudentClassroomAccess,
  StudentStatus
} from '~/types'

export const studentStatuses: StudentStatus[] = ['Trial', 'Payment Required', 'Active', 'Inactive']

export const attendanceStatuses: AttendanceStatus[] = ['present', 'absent', 'late', 'excused']

export const assignmentStatuses: AssignmentStatus[] = ['draft', 'published', 'closed']

export const resourceTypes: ResourceType[] = [
  'PDF Lesson',
  'Audio File',
  'Video Link',
  'Quran Practice',
  'Vocabulary Sheet',
  'Class Notes'
]

export const courseCategories = [
  'Dari for Afghan Kids',
  'Pashto for Afghan Kids',
  'English for All Levels',
  'Farsi/Dari for English Speakers',
  'Quran Reading',
  'Fluency Reading',
  'Tajweed',
  'Islamic Basics',
  'Afghan Culture & Heritage'
]

export const managementTeachers: ManagementTeacher[] = [
  {
    id: 'teacher-maryam',
    name: 'Maryam Farahi',
    specialties: ['Dari for Afghan Kids', 'Fluency Reading'],
    timezone: 'EST',
    activeClasses: 2
  },
  {
    id: 'teacher-ahmad',
    name: 'Ahmad Wali',
    specialties: ['Pashto for Afghan Kids', 'Afghan Culture & Heritage'],
    timezone: 'CET',
    activeClasses: 2
  },
  {
    id: 'teacher-idrees',
    name: 'Qari Idrees',
    specialties: ['Quran Reading', 'Tajweed', 'Islamic Basics'],
    timezone: 'AEST',
    activeClasses: 3
  },
  {
    id: 'teacher-sarah',
    name: 'Sarah Rahimi',
    specialties: ['English for All Levels', 'Farsi/Dari for English Speakers'],
    timezone: 'GMT',
    activeClasses: 2
  }
]

export const managementParents: ManagementParent[] = [
  {
    id: 'parent-farzana',
    name: 'Farzana Amini',
    country: 'United States',
    timezone: 'PST',
    whatsapp: '+1 555 021 1000',
    email: 'farzana@example.com',
    referralCode: 'ROS-FARZANA-1024'
  },
  {
    id: 'parent-hamid',
    name: 'Hamid Karimi',
    country: 'Canada',
    timezone: 'EST',
    whatsapp: '+1 555 021 2000',
    email: 'hamid@example.com',
    referralCode: 'ROS-HAMID-2048'
  },
  {
    id: 'parent-zahra',
    name: 'Zahra Noori',
    country: 'Australia',
    timezone: 'AEST',
    whatsapp: '+61 400 000 300',
    email: 'zahra@example.com',
    referralCode: 'ROS-ZAHRA-3096'
  },
  {
    id: 'parent-latif',
    name: 'Latif Safi',
    country: 'Germany',
    timezone: 'CET',
    whatsapp: '+49 160 000 400',
    email: 'latif@example.com',
    referralCode: 'ROS-LATIF-4128'
  }
]

export const managementCourses: ManagementCourse[] = [
  {
    id: 'course-dari-kids',
    category: 'Dari for Afghan Kids',
    title: 'Dari Foundations for Afghan Kids',
    level: 'Beginner to Intermediate',
    ageGroup: 'Ages 6-13',
    teacherId: 'teacher-maryam',
    schedule: 'Tue & Thu, 5:00 PM EST',
    capacity: 10,
    price: 79,
    description: 'Live Dari reading, speaking, and writing for Afghan children abroad.'
  },
  {
    id: 'course-pashto-kids',
    category: 'Pashto for Afghan Kids',
    title: 'Pashto Conversation for Kids',
    level: 'Beginner',
    ageGroup: 'Ages 5-12',
    teacherId: 'teacher-ahmad',
    schedule: 'Mon & Wed, 6:00 PM CET',
    capacity: 10,
    price: 79,
    description: 'Gentle Pashto speaking, listening, alphabet, and family vocabulary practice.'
  },
  {
    id: 'course-english-all',
    category: 'English for All Levels',
    title: 'English Confidence Lab',
    level: 'All Levels',
    ageGroup: 'Ages 7-16',
    teacherId: 'teacher-sarah',
    schedule: 'Sat, 11:00 AM GMT',
    capacity: 12,
    price: 69,
    description: 'Practical English speaking, reading, and writing support for global learners.'
  },
  {
    id: 'course-farsi-english',
    category: 'Farsi/Dari for English Speakers',
    title: 'Dari for English-Speaking Families',
    level: 'Beginner',
    ageGroup: 'Ages 8-16',
    teacherId: 'teacher-sarah',
    schedule: 'Sun, 4:00 PM GMT',
    capacity: 8,
    price: 89,
    description: 'A bridge course for children who mainly speak English at home.'
  },
  {
    id: 'course-quran-reading',
    category: 'Quran Reading',
    title: 'Quran Reading for Beginners',
    level: 'Beginner',
    ageGroup: 'Ages 5-14',
    teacherId: 'teacher-idrees',
    schedule: 'Thu & Sun, 6:30 PM GMT',
    capacity: 8,
    price: 89,
    description: 'Arabic letters, vowels, joining rules, and guided Quran reading practice.'
  },
  {
    id: 'course-fluency-reading',
    category: 'Fluency Reading',
    title: 'Dari Reading Fluency Circle',
    level: 'Intermediate',
    ageGroup: 'Ages 8-14',
    teacherId: 'teacher-maryam',
    schedule: 'Fri, 5:30 PM EST',
    capacity: 8,
    price: 59,
    description: 'Short readings, pronunciation, pacing, and confidence for heritage readers.'
  },
  {
    id: 'course-tajweed',
    category: 'Tajweed',
    title: 'Tajweed Essentials',
    level: 'Intermediate',
    ageGroup: 'Ages 8-16',
    teacherId: 'teacher-idrees',
    schedule: 'Sat, 7:00 PM GMT',
    capacity: 8,
    price: 99,
    description: 'Makharij, madd, stopping signs, and practical correction while reciting.'
  },
  {
    id: 'course-islamic-basics',
    category: 'Islamic Basics',
    title: 'Islamic Basics for Children',
    level: 'Beginner',
    ageGroup: 'Ages 6-12',
    teacherId: 'teacher-idrees',
    schedule: 'Sun, 10:00 AM GMT',
    capacity: 12,
    price: 49,
    description: 'Age-appropriate Islamic manners, duas, stories, and daily practice.'
  },
  {
    id: 'course-afghan-culture',
    category: 'Afghan Culture & Heritage',
    title: 'Afghan Culture & Heritage Projects',
    level: 'All Levels',
    ageGroup: 'Ages 7-15',
    teacherId: 'teacher-ahmad',
    schedule: 'Sat, 3:00 PM CET',
    capacity: 12,
    price: 69,
    description: 'Geography, poetry, family stories, celebrations, values, and heritage presentations.'
  }
]

export const managementStudents: ManagementStudent[] = [
  {
    id: 'student-amina',
    parentId: 'parent-farzana',
    name: 'Amina Amini',
    age: 9,
    country: 'United States',
    timezone: 'PST',
    selectedCourseId: 'course-dari-kids',
    currentLevel: 'Beginner',
    preferredClassTime: 'Weekdays after 5 PM PST',
    notes: 'Understands Dari but answers in English.',
    status: 'Active',
    trialClassesAllowed: 2,
    referralCode: 'ROS-AMINA-4821'
  },
  {
    id: 'student-hamza',
    parentId: 'parent-hamid',
    name: 'Hamza Karimi',
    age: 10,
    country: 'Canada',
    timezone: 'EST',
    selectedCourseId: 'course-quran-reading',
    currentLevel: 'Letters and vowels',
    preferredClassTime: 'Thursday evenings',
    notes: 'Completed both trial classes. Payment is now required.',
    status: 'Payment Required',
    trialClassesAllowed: 2,
    referralCode: 'ROS-HAMZA-7194'
  },
  {
    id: 'student-laila',
    parentId: 'parent-zahra',
    name: 'Laila Noori',
    age: 8,
    country: 'Australia',
    timezone: 'AEST',
    selectedCourseId: 'course-tajweed',
    currentLevel: 'Reads short surahs',
    preferredClassTime: 'Weekend mornings AEST',
    notes: 'Trial student. One attended trial class remains.',
    status: 'Trial',
    trialClassesAllowed: 2,
    referralCode: 'ROS-LAILA-3650'
  },
  {
    id: 'student-omar',
    parentId: 'parent-latif',
    name: 'Omar Safi',
    age: 11,
    country: 'Germany',
    timezone: 'CET',
    selectedCourseId: 'course-pashto-kids',
    currentLevel: 'New beginner',
    preferredClassTime: 'Weekdays after school',
    notes: 'Trial class scheduled this week.',
    status: 'Trial',
    trialClassesAllowed: 2,
    referralCode: 'ROS-OMAR-5582'
  },
  {
    id: 'student-samira',
    parentId: 'parent-farzana',
    name: 'Samira Amini',
    age: 13,
    country: 'United States',
    timezone: 'PST',
    selectedCourseId: 'course-english-all',
    currentLevel: 'Intermediate',
    preferredClassTime: 'Saturday morning',
    notes: 'Paused by parent for summer travel.',
    status: 'Inactive',
    trialClassesAllowed: 2,
    referralCode: 'ROS-SAMIRA-6317'
  }
]

export const classSchedules: ClassSchedule[] = [
  {
    id: 'schedule-dari-tue-thu',
    courseId: 'course-dari-kids',
    teacherId: 'teacher-maryam',
    day: 'Tuesday and Thursday',
    time: '5:00 PM',
    timezone: 'EST',
    meetingLink: 'https://zoom.us/j/8274561234?pwd=roshanayi-dari-demo',
    capacity: 10,
    enrolledStudentIds: ['student-amina']
  },
  {
    id: 'schedule-quran-thu-sun',
    courseId: 'course-quran-reading',
    teacherId: 'teacher-idrees',
    day: 'Thursday and Sunday',
    time: '6:30 PM',
    timezone: 'GMT',
    meetingLink: 'https://meet.google.com/ros-quran-demo',
    capacity: 8,
    enrolledStudentIds: ['student-hamza']
  },
  {
    id: 'schedule-tajweed-sat',
    courseId: 'course-tajweed',
    teacherId: 'teacher-idrees',
    day: 'Saturday',
    time: '7:00 PM',
    timezone: 'GMT',
    meetingLink: 'https://meet.jit.si/roshanayi-tajweed-demo',
    capacity: 8,
    enrolledStudentIds: ['student-laila']
  },
  {
    id: 'schedule-pashto-mon-wed',
    courseId: 'course-pashto-kids',
    teacherId: 'teacher-ahmad',
    day: 'Monday and Wednesday',
    time: '6:00 PM',
    timezone: 'CET',
    meetingLink: 'https://zoom.us/j/8274567890?pwd=roshanayi-pashto-demo',
    capacity: 10,
    enrolledStudentIds: ['student-omar']
  },
  {
    id: 'schedule-english-sat',
    courseId: 'course-english-all',
    teacherId: 'teacher-sarah',
    day: 'Saturday',
    time: '11:00 AM',
    timezone: 'GMT',
    meetingLink: 'https://meet.google.com/ros-engl-demo',
    capacity: 12,
    enrolledStudentIds: ['student-samira']
  }
]

export const classrooms: Classroom[] = [
  {
    id: 'classroom-dari-foundations',
    className: 'Dari Foundations Group A',
    courseId: 'course-dari-kids',
    teacherId: 'teacher-maryam',
    scheduleId: 'schedule-dari-tue-thu',
    level: 'Beginner',
    status: 'Active',
    meetingProvider: 'Zoom',
    description: 'A small live classroom for Afghan children building Dari reading and speaking confidence.',
    futureVideoFeatures: ['audio/video', 'screen sharing', 'chat', 'recording', 'whiteboard', 'raise hand']
  },
  {
    id: 'classroom-quran-beginners',
    className: 'Quran Reading Beginners',
    courseId: 'course-quran-reading',
    teacherId: 'teacher-idrees',
    scheduleId: 'schedule-quran-thu-sun',
    level: 'Letters and vowels',
    status: 'Trial Only',
    meetingProvider: 'Google Meet',
    description: 'Guided Quran reading practice with trial access until payment is required.',
    futureVideoFeatures: ['audio/video', 'screen sharing', 'chat', 'recording', 'whiteboard', 'raise hand']
  },
  {
    id: 'classroom-tajweed-essentials',
    className: 'Tajweed Essentials Circle',
    courseId: 'course-tajweed',
    teacherId: 'teacher-idrees',
    scheduleId: 'schedule-tajweed-sat',
    level: 'Intermediate',
    status: 'Active',
    meetingProvider: 'Jitsi',
    description: 'A focused tajweed group for pronunciation, makharij, and recitation correction.',
    futureVideoFeatures: ['audio/video', 'screen sharing', 'chat', 'recording', 'whiteboard', 'raise hand']
  },
  {
    id: 'classroom-pashto-kids',
    className: 'Pashto Conversation Group',
    courseId: 'course-pashto-kids',
    teacherId: 'teacher-ahmad',
    scheduleId: 'schedule-pashto-mon-wed',
    level: 'Beginner',
    status: 'Active',
    meetingProvider: 'Zoom',
    description: 'A parent-friendly Pashto class for alphabet, greetings, and family conversation.',
    futureVideoFeatures: ['audio/video', 'screen sharing', 'chat', 'recording', 'whiteboard', 'raise hand']
  },
  {
    id: 'classroom-english-confidence',
    className: 'English Confidence Lab',
    courseId: 'course-english-all',
    teacherId: 'teacher-sarah',
    scheduleId: 'schedule-english-sat',
    level: 'Intermediate',
    status: 'Paused',
    meetingProvider: 'Google Meet',
    description: 'A paused English support group that keeps its classroom record ready for reactivation.',
    futureVideoFeatures: ['audio/video', 'screen sharing', 'chat', 'recording', 'whiteboard', 'raise hand']
  }
]

export const classroomAssignments: ClassroomAssignment[] = [
  {
    id: 'assignment-dari-family-words',
    classroomId: 'classroom-dari-foundations',
    title: 'Read five Dari family words aloud',
    instructions: 'Practice the vocabulary sheet with a parent and write one sentence for each word.',
    dueDate: '2026-06-18',
    fileAttachmentLabel: 'family-vocabulary.pdf',
    status: 'published'
  },
  {
    id: 'assignment-quran-vowels',
    classroomId: 'classroom-quran-beginners',
    title: 'Short vowels practice recording',
    instructions: 'Record yourself reading the short vowel practice line and submit it before class.',
    dueDate: '2026-06-16',
    fileAttachmentLabel: 'vowels-practice-audio.mp3',
    status: 'published'
  },
  {
    id: 'assignment-tajweed-makharij',
    classroomId: 'classroom-tajweed-essentials',
    title: 'Makharij review',
    instructions: 'Review the makharij notes and mark three letters you want to practice in class.',
    dueDate: '2026-06-20',
    fileAttachmentLabel: 'makharij-notes.pdf',
    status: 'published'
  },
  {
    id: 'assignment-pashto-greetings',
    classroomId: 'classroom-pashto-kids',
    title: 'Pashto greetings at home',
    instructions: 'Use three Pashto greetings with family members and write who you spoke with.',
    dueDate: '2026-06-19',
    fileAttachmentLabel: 'pashto-greetings-sheet.pdf',
    status: 'published'
  }
]

export const homeworkSubmissions: HomeworkSubmission[] = [
  {
    id: 'submission-amina-family-words',
    classroomId: 'classroom-dari-foundations',
    assignmentId: 'assignment-dari-family-words',
    studentId: 'student-amina',
    textAnswer: 'I read the family words with my mother and wrote five sentences.',
    fileUploadLabel: 'amina-family-words.pdf',
    submittedAt: '2026-06-14',
    status: 'reviewed',
    score: 92,
    feedback: 'Strong work. Keep practicing pronunciation for longer vowels.'
  },
  {
    id: 'submission-laila-makharij',
    classroomId: 'classroom-tajweed-essentials',
    assignmentId: 'assignment-tajweed-makharij',
    studentId: 'student-laila',
    textAnswer: 'I want to practice qaf, ayn, and ha.',
    fileUploadLabel: 'laila-makharij-notes.jpg',
    submittedAt: '2026-06-17',
    status: 'submitted',
    score: null,
    feedback: ''
  },
  {
    id: 'submission-omar-greetings',
    classroomId: 'classroom-pashto-kids',
    assignmentId: 'assignment-pashto-greetings',
    studentId: 'student-omar',
    textAnswer: 'I used staray mashay with my father.',
    fileUploadLabel: 'omar-pashto-practice.txt',
    submittedAt: '2026-06-20',
    status: 'late',
    score: null,
    feedback: ''
  }
]

export const classroomResources: ClassroomResource[] = [
  {
    id: 'resource-dari-vocab',
    classroomId: 'classroom-dari-foundations',
    title: 'Family vocabulary sheet',
    type: 'Vocabulary Sheet',
    description: 'A printable Dari vocabulary page for parent-child practice.',
    fileLabel: 'family-vocabulary.pdf',
    addedByTeacherId: 'teacher-maryam',
    addedAt: '2026-06-11',
    url: '#'
  },
  {
    id: 'resource-quran-practice',
    classroomId: 'classroom-quran-beginners',
    title: 'Noorani Qaida vowel practice',
    type: 'Quran Practice',
    description: 'Short vowel reading lines for daily five-minute practice.',
    fileLabel: 'qaida-vowel-practice.pdf',
    addedByTeacherId: 'teacher-idrees',
    addedAt: '2026-06-10',
    url: '#'
  },
  {
    id: 'resource-tajweed-audio',
    classroomId: 'classroom-tajweed-essentials',
    title: 'Makharij audio example',
    type: 'Audio File',
    description: 'Teacher-recorded pronunciation practice for difficult letters.',
    fileLabel: 'makharij-example.mp3',
    addedByTeacherId: 'teacher-idrees',
    addedAt: '2026-06-12',
    url: '#'
  },
  {
    id: 'resource-pashto-notes',
    classroomId: 'classroom-pashto-kids',
    title: 'Pashto greetings class notes',
    type: 'Class Notes',
    description: 'Simple greetings, responses, and family practice prompts.',
    fileLabel: 'pashto-greetings-notes.pdf',
    addedByTeacherId: 'teacher-ahmad',
    addedAt: '2026-06-12',
    url: '#'
  }
]

export const classroomProgressRecords: ClassroomProgress[] = [
  {
    id: 'progress-amina-dari',
    classroomId: 'classroom-dari-foundations',
    studentId: 'student-amina',
    attendancePercentage: 96,
    homeworkCompletion: 88,
    quizAverage: 91,
    teacherNotes: 'Amina is speaking more confidently and should keep reading aloud at home.',
    learningProgress: 74
  },
  {
    id: 'progress-hamza-quran',
    classroomId: 'classroom-quran-beginners',
    studentId: 'student-hamza',
    attendancePercentage: 100,
    homeworkCompletion: 60,
    quizAverage: 72,
    teacherNotes: 'Trial classes are complete. Access should continue after first payment confirmation.',
    learningProgress: 45
  },
  {
    id: 'progress-laila-tajweed',
    classroomId: 'classroom-tajweed-essentials',
    studentId: 'student-laila',
    attendancePercentage: 90,
    homeworkCompletion: 75,
    quizAverage: 80,
    teacherNotes: 'Laila has careful recitation and needs more practice with makharij.',
    learningProgress: 58
  },
  {
    id: 'progress-omar-pashto',
    classroomId: 'classroom-pashto-kids',
    studentId: 'student-omar',
    attendancePercentage: 80,
    homeworkCompletion: 67,
    quizAverage: 70,
    teacherNotes: 'Omar participates well when prompts are short and repeated.',
    learningProgress: 39
  },
  {
    id: 'progress-samira-english',
    classroomId: 'classroom-english-confidence',
    studentId: 'student-samira',
    attendancePercentage: 42,
    homeworkCompletion: 30,
    quizAverage: 65,
    teacherNotes: 'Student is currently inactive while the family pauses classes.',
    learningProgress: 28
  }
]

export const classroomAnnouncements: ClassroomAnnouncement[] = [
  {
    id: 'announcement-dari-homework',
    classroomId: 'classroom-dari-foundations',
    authorRole: 'Teacher',
    title: 'Homework reminder',
    type: 'homework reminder',
    message: 'Please upload the family vocabulary practice before Thursday class.',
    postedAt: '2026-06-13'
  },
  {
    id: 'announcement-quran-payment',
    classroomId: 'classroom-quran-beginners',
    authorRole: 'Admin',
    title: 'Trial classes complete',
    type: 'parent meeting',
    message: 'The academy team will contact the parent to confirm enrollment and first payment.',
    postedAt: '2026-06-12'
  },
  {
    id: 'announcement-tajweed-schedule',
    classroomId: 'classroom-tajweed-essentials',
    authorRole: 'Teacher',
    title: 'Schedule stays the same',
    type: 'schedule change',
    message: 'Saturday class remains at 7:00 PM GMT this week.',
    postedAt: '2026-06-11'
  },
  {
    id: 'announcement-pashto-reminder',
    classroomId: 'classroom-pashto-kids',
    authorRole: 'Teacher',
    title: 'Practice greetings',
    type: 'homework reminder',
    message: 'Students should practice three Pashto greetings with family before the next class.',
    postedAt: '2026-06-13'
  }
]

export const paymentRecords: PaymentRecord[] = [
  {
    id: 'payment-amina-june',
    studentId: 'student-amina',
    parentId: 'parent-farzana',
    courseId: 'course-dari-kids',
    amount: 79,
    month: 'June 2026',
    status: 'paid',
    receiptNumber: 'RA-2026-0601',
    adminConfirmation: true
  },
  {
    id: 'payment-hamza-june',
    studentId: 'student-hamza',
    parentId: 'parent-hamid',
    courseId: 'course-quran-reading',
    amount: 89,
    month: 'June 2026',
    status: 'unpaid',
    receiptNumber: '',
    adminConfirmation: false
  },
  {
    id: 'payment-laila-june',
    studentId: 'student-laila',
    parentId: 'parent-zahra',
    courseId: 'course-tajweed',
    amount: 99,
    month: 'June 2026',
    status: 'pending',
    receiptNumber: 'RA-PENDING-144',
    adminConfirmation: false
  },
  {
    id: 'payment-samira-may',
    studentId: 'student-samira',
    parentId: 'parent-farzana',
    courseId: 'course-english-all',
    amount: 69,
    month: 'May 2026',
    status: 'overdue',
    receiptNumber: '',
    adminConfirmation: false
  }
]

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 'att-amina-1',
    scheduleId: 'schedule-dari-tue-thu',
    courseId: 'course-dari-kids',
    teacherId: 'teacher-maryam',
    studentId: 'student-amina',
    date: '2026-06-04',
    status: 'present',
    isTrialClass: false
  },
  {
    id: 'att-amina-2',
    scheduleId: 'schedule-dari-tue-thu',
    courseId: 'course-dari-kids',
    teacherId: 'teacher-maryam',
    studentId: 'student-amina',
    date: '2026-06-06',
    status: 'late',
    isTrialClass: false
  },
  {
    id: 'att-hamza-trial-1',
    scheduleId: 'schedule-quran-thu-sun',
    courseId: 'course-quran-reading',
    teacherId: 'teacher-idrees',
    studentId: 'student-hamza',
    date: '2026-06-01',
    status: 'present',
    isTrialClass: true
  },
  {
    id: 'att-hamza-trial-2',
    scheduleId: 'schedule-quran-thu-sun',
    courseId: 'course-quran-reading',
    teacherId: 'teacher-idrees',
    studentId: 'student-hamza',
    date: '2026-06-05',
    status: 'present',
    isTrialClass: true
  },
  {
    id: 'att-laila-trial-1',
    scheduleId: 'schedule-tajweed-sat',
    courseId: 'course-tajweed',
    teacherId: 'teacher-idrees',
    studentId: 'student-laila',
    date: '2026-06-08',
    status: 'present',
    isTrialClass: true
  },
  {
    id: 'att-omar-review',
    scheduleId: 'schedule-pashto-mon-wed',
    courseId: 'course-pashto-kids',
    teacherId: 'teacher-ahmad',
    studentId: 'student-omar',
    date: '2026-06-10',
    status: 'excused',
    isTrialClass: true
  }
]

export const referralGoalCount = 5

export const referralRecords: ReferralRecord[] = [
  {
    id: 'ref-amina-1',
    referralCode: 'ROS-AMINA-4821',
    referrerParentId: 'parent-farzana',
    referrerStudentId: 'student-amina',
    referredStudentName: 'Mina Wardak',
    referredParentName: 'Roya Wardak',
    referredFamilyKey: 'family-wardak',
    dateRegistered: '2026-06-02',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-amina-2',
    referralCode: 'ROS-AMINA-4821',
    referrerParentId: 'parent-farzana',
    referrerStudentId: 'student-amina',
    referredStudentName: 'Basir Popal',
    referredParentName: 'Nadia Popal',
    referredFamilyKey: 'family-popal',
    dateRegistered: '2026-06-04',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-amina-3',
    referralCode: 'ROS-AMINA-4821',
    referrerParentId: 'parent-farzana',
    referrerStudentId: 'student-amina',
    referredStudentName: 'Sahar Ahmadi',
    referredParentName: 'Marwa Ahmadi',
    referredFamilyKey: 'family-ahmadi',
    dateRegistered: '2026-06-08',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-amina-4',
    referralCode: 'ROS-AMINA-4821',
    referrerParentId: 'parent-farzana',
    referrerStudentId: 'student-amina',
    referredStudentName: 'Yousuf Ahmadi',
    referredParentName: 'Marwa Ahmadi',
    referredFamilyKey: 'family-ahmadi',
    dateRegistered: '2026-06-09',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'needs_review'
  },
  {
    id: 'ref-hamza-1',
    referralCode: 'ROS-HAMZA-7194',
    referrerParentId: 'parent-hamid',
    referrerStudentId: 'student-hamza',
    referredStudentName: 'Ilyas Niazi',
    referredParentName: 'Nasima Niazi',
    referredFamilyKey: 'family-niazi',
    dateRegistered: '2026-05-14',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-hamza-2',
    referralCode: 'ROS-HAMZA-7194',
    referrerParentId: 'parent-hamid',
    referrerStudentId: 'student-hamza',
    referredStudentName: 'Huda Nazari',
    referredParentName: 'Faisal Nazari',
    referredFamilyKey: 'family-nazari',
    dateRegistered: '2026-05-18',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-hamza-3',
    referralCode: 'ROS-HAMZA-7194',
    referrerParentId: 'parent-hamid',
    referrerStudentId: 'student-hamza',
    referredStudentName: 'Mariam Sadat',
    referredParentName: 'Wahid Sadat',
    referredFamilyKey: 'family-sadat',
    dateRegistered: '2026-05-21',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-hamza-4',
    referralCode: 'ROS-HAMZA-7194',
    referrerParentId: 'parent-hamid',
    referrerStudentId: 'student-hamza',
    referredStudentName: 'Ramin Noor',
    referredParentName: 'Khalid Noor',
    referredFamilyKey: 'family-noor',
    dateRegistered: '2026-05-25',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-hamza-5',
    referralCode: 'ROS-HAMZA-7194',
    referrerParentId: 'parent-hamid',
    referrerStudentId: 'student-hamza',
    referredStudentName: 'Ariana Qasimi',
    referredParentName: 'Shabnam Qasimi',
    referredFamilyKey: 'family-qasimi',
    dateRegistered: '2026-06-01',
    registrationComplete: true,
    trialClassesAttended: 2,
    paymentStatus: 'paid',
    adminPaymentConfirmed: true,
    familyApprovalStatus: 'approved'
  },
  {
    id: 'ref-laila-1',
    referralCode: 'ROS-LAILA-3650',
    referrerParentId: 'parent-zahra',
    referrerStudentId: 'student-laila',
    referredStudentName: 'Sara Mohammadi',
    referredParentName: 'Arif Mohammadi',
    referredFamilyKey: 'family-mohammadi',
    dateRegistered: '2026-06-11',
    registrationComplete: true,
    trialClassesAttended: 1,
    paymentStatus: 'pending',
    adminPaymentConfirmed: false,
    familyApprovalStatus: 'approved'
  }
]

export const referralRewards: ReferralReward[] = [
  {
    id: 'reward-amina',
    referralCode: 'ROS-AMINA-4821',
    referrerParentId: 'parent-farzana',
    referrerStudentId: 'student-amina',
    status: 'tracking',
    discountPercent: 100,
    discountMonth: '',
    adminReviewed: false,
    note: 'Three verified referrals. One same-family registration requires admin review before it can count.'
  },
  {
    id: 'reward-hamza',
    referralCode: 'ROS-HAMZA-7194',
    referrerParentId: 'parent-hamid',
    referrerStudentId: 'student-hamza',
    status: 'available',
    discountPercent: 100,
    discountMonth: 'July 2026',
    adminReviewed: false,
    note: 'Congratulations! You earned one month free tuition.'
  },
  {
    id: 'reward-laila',
    referralCode: 'ROS-LAILA-3650',
    referrerParentId: 'parent-zahra',
    referrerStudentId: 'student-laila',
    status: 'tracking',
    discountPercent: 100,
    discountMonth: '',
    adminReviewed: false,
    note: 'Referral is registered but not yet verified because trial/payment confirmation is incomplete.'
  }
]

const attendedTrialStatuses: AttendanceStatus[] = ['present', 'late']

export const getTeacherName = (teacherId: string) =>
  managementTeachers.find((teacher) => teacher.id === teacherId)?.name ?? 'Unassigned'

export const getParentName = (parentId: string) =>
  managementParents.find((parent) => parent.id === parentId)?.name ?? 'Unknown parent'

export const getStudentName = (studentId: string) =>
  managementStudents.find((student) => student.id === studentId)?.name ?? 'Unknown student'

export const getCourseTitle = (courseId: string) =>
  managementCourses.find((course) => course.id === courseId)?.title ?? 'Unknown course'

export const getPaymentForStudent = (studentId: string) =>
  paymentRecords.find((payment) => payment.studentId === studentId)

export const getTrialAttendanceCount = (studentId: string) =>
  attendanceRecords.filter(
    (record) =>
      record.studentId === studentId &&
      record.isTrialClass &&
      attendedTrialStatuses.includes(record.status)
  ).length

export const getRecommendedStatus = (student: ManagementStudent) => {
  const trialCount = getTrialAttendanceCount(student.id)
  const payment = getPaymentForStudent(student.id)

  if (student.status === 'Inactive') {
    return student.status
  }

  if (trialCount >= student.trialClassesAllowed && payment?.status !== 'paid') {
    return 'Payment Required' satisfies StudentStatus
  }

  if (payment?.status === 'paid' && payment.adminConfirmation) {
    return 'Active' satisfies StudentStatus
  }

  return student.status
}

export const canViewClassLink = (student: ManagementStudent) =>
  student.status === 'Active' || student.status === 'Trial'

export const isClassAccessLocked = (student: ManagementStudent) => !canViewClassLink(student)

export const getTeacherSchedules = (teacherId: string) =>
  classSchedules.filter((schedule) => schedule.teacherId === teacherId)

export const getTeacherSafeRoster = (teacherId: string) => {
  const schedules = getTeacherSchedules(teacherId)
  const studentIds = new Set(schedules.flatMap((schedule) => schedule.enrolledStudentIds))

  return managementStudents
    .filter((student) => studentIds.has(student.id))
    .map((student) => ({
      id: student.id,
      name: student.name,
      age: student.age,
      status: student.status,
      currentLevel: student.currentLevel,
      course: getCourseTitle(student.selectedCourseId),
      trialClassesAttended: getTrialAttendanceCount(student.id),
      classAccess: canViewClassLink(student) ? 'Visible' : 'Locked'
    }))
}

export const teacherCanExportStudentLists = false

export const getParentStudents = (parentId: string) =>
  managementStudents.filter((student) => student.parentId === parentId)

export const getStudentAttendance = (studentId: string) =>
  attendanceRecords.filter((record) => record.studentId === studentId)

export const getStudentNextSchedule = (student: ManagementStudent) =>
  classSchedules.find((schedule) => schedule.enrolledStudentIds.includes(student.id))

export const getClassroomById = (classroomId: string) =>
  classrooms.find((classroom) => classroom.id === classroomId)

export const getClassroomSchedule = (classroomId: string) => {
  const classroom = getClassroomById(classroomId)

  return classroom
    ? classSchedules.find((schedule) => schedule.id === classroom.scheduleId)
    : undefined
}

export const getClassroomStudents = (classroomId: string) => {
  const schedule = getClassroomSchedule(classroomId)

  if (!schedule) {
    return []
  }

  return managementStudents.filter((student) => schedule.enrolledStudentIds.includes(student.id))
}

export const getStudentClassrooms = (studentId: string) =>
  classrooms.filter((classroom) =>
    getClassroomSchedule(classroom.id)?.enrolledStudentIds.includes(studentId)
  )

export const getTeacherClassrooms = (teacherId: string) =>
  classrooms.filter((classroom) => classroom.teacherId === teacherId)

export const getClassroomAssignments = (classroomId: string) =>
  classroomAssignments.filter((assignment) => assignment.classroomId === classroomId)

export const getClassroomHomeworkSubmissions = (classroomId: string) =>
  homeworkSubmissions.filter((submission) => submission.classroomId === classroomId)

export const getClassroomResources = (classroomId: string) =>
  classroomResources.filter((resource) => resource.classroomId === classroomId)

export const getClassroomProgress = (classroomId: string) =>
  classroomProgressRecords.filter((progress) => progress.classroomId === classroomId)

export const getClassroomAnnouncements = (classroomId: string) =>
  classroomAnnouncements.filter((announcement) => announcement.classroomId === classroomId)

export const getClassroomAttendance = (classroomId: string) => {
  const schedule = getClassroomSchedule(classroomId)

  return schedule
    ? attendanceRecords.filter((record) => record.scheduleId === schedule.id)
    : []
}

export const getClassroomCardRows = () =>
  classrooms.map((classroom) => {
    const schedule = getClassroomSchedule(classroom.id)

    return {
      classroom,
      courseTitle: getCourseTitle(classroom.courseId),
      teacherName: getTeacherName(classroom.teacherId),
      scheduleLabel: schedule
        ? `${schedule.day}, ${schedule.time} ${schedule.timezone}`
        : 'Schedule pending',
      enrolledCount: schedule?.enrolledStudentIds.length ?? 0,
      capacity: schedule?.capacity ?? 0,
      meetingLink: schedule?.meetingLink ?? ''
    }
  })

export const getStudentClassroomAccess = (
  classroomId: string,
  studentId: string
): StudentClassroomAccess => {
  const classroom = getClassroomById(classroomId)
  const schedule = getClassroomSchedule(classroomId)
  const student = managementStudents.find((item) => item.id === studentId)

  if (!classroom || !schedule || !student) {
    return {
      canJoin: false,
      isEnrolled: false,
      requiresPayment: false,
      studentStatus: 'Unknown',
      message: 'Classroom access could not be verified.'
    }
  }

  const isEnrolled = schedule.enrolledStudentIds.includes(student.id)

  if (!isEnrolled) {
    return {
      canJoin: false,
      isEnrolled: false,
      requiresPayment: false,
      studentStatus: 'Not Enrolled',
      message: 'This student is not enrolled in this classroom.'
    }
  }

  const studentStatus = getRecommendedStatus(student)

  if (studentStatus === 'Payment Required') {
    return {
      canJoin: false,
      isEnrolled: true,
      requiresPayment: true,
      studentStatus,
      message: 'Your trial period has ended. Please complete payment to continue classes.'
    }
  }

  if (studentStatus !== 'Trial' && studentStatus !== 'Active') {
    return {
      canJoin: false,
      isEnrolled: true,
      requiresPayment: false,
      studentStatus,
      message: 'Class access is locked because this student is not currently active or in trial.'
    }
  }

  return {
    canJoin: true,
    isEnrolled: true,
    requiresPayment: false,
    studentStatus,
    message: 'Live class access is available for this enrolled student.'
  }
}

export const isReferralVerified = (record: ReferralRecord) =>
  record.registrationComplete &&
  record.trialClassesAttended >= 2 &&
  record.paymentStatus === 'paid' &&
  record.adminPaymentConfirmed &&
  record.familyApprovalStatus === 'approved'

export const getReferralRecordsByCode = (referralCode: string) =>
  referralRecords.filter((record) => record.referralCode === referralCode)

export const getReferralRewardByCode = (referralCode: string) =>
  referralRewards.find((reward) => reward.referralCode === referralCode)

export const getReferralSummaryByCode = (referralCode: string) => {
  const records = getReferralRecordsByCode(referralCode)
  const reward = getReferralRewardByCode(referralCode)
  const verifiedCount = records.filter(isReferralVerified).length
  const calculatedStatus: ReferralRewardStatus =
    verifiedCount >= referralGoalCount ? 'eligible' : 'tracking'

  return {
    referralCode,
    records,
    totalRegistrations: records.length,
    verifiedCount,
    progressLabel: `${verifiedCount}/${referralGoalCount} verified referrals`,
    rewardStatus: reward?.status ?? calculatedStatus,
    rewardNote:
      reward?.note ??
      (verifiedCount >= referralGoalCount
        ? 'Congratulations! You earned one month free tuition.'
        : 'Reward becomes available after 5 verified paid referrals.'),
    discountPercent: reward?.discountPercent ?? 100,
    discountMonth: reward?.discountMonth ?? ''
  }
}

export const getStudentReferralSummary = (studentId: string) => {
  const student = managementStudents.find((item) => item.id === studentId)

  if (!student) {
    return getReferralSummaryByCode('')
  }

  return getReferralSummaryByCode(student.referralCode)
}

export const getParentReferralSummaries = (parentId: string) =>
  getParentStudents(parentId).map((student) => ({
    student,
    summary: getStudentReferralSummary(student.id)
  }))

export const getReferralManagementRows = () =>
  managementStudents.map((student) => {
    const summary = getStudentReferralSummary(student.id)

    return {
      referralCode: student.referralCode,
      referrerName: `${student.name} / ${getParentName(student.parentId)}`,
      totalRegistrations: summary.totalRegistrations,
      verifiedPaidReferrals: summary.verifiedCount,
      rewardStatus: summary.rewardStatus,
      rewardNote: summary.rewardNote
    }
  })

export const getReferralShareMessage = (referralCode: string) =>
  `Join Roshanayi Academy with my referral code ${referralCode}. New students can start with two trial classes before payment.`

export const getAllReferralCodes = () =>
  Array.from(
    new Set([
      ...managementParents.map((parent) => parent.referralCode),
      ...managementStudents.map((student) => student.referralCode),
      ...referralRecords.map((record) => record.referralCode)
    ])
  )

export const generateReferralCode = (studentName: string, existingCodes = getAllReferralCodes()) => {
  const cleanedName = studentName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '')
    .slice(0, 12)

  const codeName = cleanedName || 'STUDENT'
  let code = ''

  do {
    const suffix = Math.floor(1000 + Math.random() * 9000)
    code = `ROS-${codeName}-${suffix}`
  } while (existingCodes.includes(code))

  return code
}

export const getStatusTone = (status: StudentStatus | string) => {
  const tones: Record<string, string> = {
    Trial: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
    'Payment Required': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    Inactive: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    pending: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
    unpaid: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    overdue: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    tracking: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    eligible: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    available: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    needs_review: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    Full: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200',
    Paused: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    'Trial Only': 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
    draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
    closed: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    submitted: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
    late: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
    reviewed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200'
  }

  return tones[status] ?? tones.Trial
}
