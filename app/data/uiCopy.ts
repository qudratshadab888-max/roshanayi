import { defaultLocale, type LocaleCode } from '~/i18n/messages'

type UiCopy = {
  common: {
    copied: string
    congratulations: string
    copyCode: string
    shareMessage: string
    openClassroom: string
    joinLiveClass: string
    schedulePending: string
    enabled: string
    disabled: string
  }
  classrooms: {
    seoTitle: string
    seoDescription: string
    heroEyebrow: string
    title: string
    description: string
    accessRuleTitle: string
    accessRuleText: string
    stats: {
      classrooms: string
      virtualClassGroups: string
      activeOrTrial: string
      readyForLiveSessions: string
      enrolledStudents: string
      mockLearnerRecords: string
      videoPhase: string
      links: string
      videoPhaseDetail: string
    }
    classGroupsEyebrow: string
    classGroupsTitle: string
    classGroupsDescription: string
    adminOverview: string
    registerStudent: string
    labels: {
      teacher: string
      schedule: string
      level: string
      students: string
      enrolled: string
    }
  }
  classroomDetail: {
    seoTitle: string
    seoDescription: string
    tabs: {
      overview: string
      liveClass: string
      assignments: string
      homework: string
      attendance: string
      resources: string
      progress: string
      announcements: string
    }
    actions: {
      backToClassrooms: string
      refreshPreview: string
      addAssignment: string
      submitHomework: string
      saveAttendance: string
      postAnnouncement: string
      viewClassrooms: string
    }
    labels: {
      virtualClassroom: string
      teacher: string
      schedule: string
      classLevel: string
      overview: string
      classroomDetails: string
      course: string
      timezone: string
      capacity: string
      meetingLink: string
      enrolledStudents: string
      rolePermissions: string
      teacherRestrictions: string
      accessPreview: string
      joinClassRuleCheck: string
      viewAsStudent: string
      paymentStatusParent: string
      liveClass: string
      meetingUrl: string
      futureVideo: string
      teacherTool: string
      studentTool: string
      createAssignment: string
      title: string
      instructions: string
      dueDate: string
      status: string
      fileAttachmentPlaceholder: string
      assignments: string
      due: string
      file: string
      class: string
      submitHomework: string
      student: string
      assignment: string
      textAnswer: string
      fileUploadPlaceholder: string
      teacherReviewQueue: string
      submitted: string
      score: string
      feedback: string
      markAttendance: string
      attendanceHistory: string
      date: string
      trial: string
      addResourcePlaceholder: string
      type: string
      fileOrLinkPlaceholder: string
      classResources: string
      progress: string
      homeworkCompletion: string
      quizAverage: string
      learningProgress: string
      announcements: string
      classUpdates: string
      notFoundEyebrow: string
      notFoundTitle: string
    }
    descriptions: {
      liveClass: string
      createAssignment: string
      teacherReviewQueue: string
      attendanceHistory: string
      addResource: string
      notFound: string
    }
    placeholders: {
      lessonFile: string
      homeworkPhoto: string
      resourceFile: string
    }
    fallbacks: {
      selectStudentAccess: string
      unknownCourse: string
      unassignedTeacher: string
      unknownAssignment: string
      pending: string
      notSet: string
      noPaymentRecord: string
      meetingLinkPending: string
      awaitingReview: string
      teacherInstructions: string
      noAttachment: string
      studentAnswer: string
      noFileUploaded: string
      yes: string
      no: string
    }
    notices: {
      addAssignmentTitle: string
      assignmentAdded: string
      selectStudentAndAssignment: string
      homeworkSubmitted: string
      attendanceSaved: string
    }
    rolePermissions: Array<{ role: string; text: string }>
    teacherRestrictions: string[]
  }
  management: {
    seoTitle: string
    seoDescription: string
    heroEyebrow: string
    heroTitle: string
    heroDescription: string
    stats: {
      students: string
      mockRegistrations: string
      active: string
      canAttendPaidClasses: string
      paymentRequired: string
      needsAdminFollowUp: string
      courses: string
      availablePrograms: string
      classrooms: string
      virtualClassGroups: string
    }
    admin: {
      eyebrow: string
      title: string
      description: string
      studentsSmall: string
      studentListTitle: string
      studentListDescription: string
      coursesListTitle: string
      teachersListTitle: string
      classScheduleTitle: string
      classroomManagementTitle: string
      classroomManagementDescription: string
      attendanceTableTitle: string
      paymentTrackingTitle: string
      paymentTrackingDescription: string
      referralManagementTitle: string
      referralManagementDescription: string
    }
    labels: {
      student: string
      parent: string
      age: string
      country: string
      course: string
      preferredTime: string
      trials: string
      referralCode: string
      status: string
      teacher: string
      day: string
      time: string
      timezone: string
      capacity: string
      classroom: string
      schedule: string
      provider: string
      students: string
      page: string
      date: string
      month: string
      amount: string
      confirmed: string
      referrer: string
      totalRegistrations: string
      verifiedPaid: string
      rewardStatus: string
      adminReview: string
      level: string
      access: string
      payment: string
      attendance: string
      nextClass: string
      referralCard: string
      assignedClassroom: string
    }
    actions: {
      viewAllClassrooms: string
      open: string
      approveReward: string
      reject: string
    }
    parent: {
      eyebrow: string
      title: string
      viewingAs: string
      referralCodeTitle: string
      notScheduled: string
      openClassroomPrefix: string
    }
    teacher: {
      eyebrow: string
      title: string
      viewingAs: string
      classes: string
      students: string
    }
  }
  register: {
    referralCode: string
    referralPlaceholder: string
    referralHelp: string
    generatedPrefix: string
    generatedSuffix: string
  }
  dashboard: {
    classroomAccess: string
    myLiveClasses: string
    studentProfile: string
    referralCode: string
    referralDescription: string
    referralShareMessage: string
    verifiedReferrals: string
  }
  statusLabels: Record<string, string>
  accessMessages: Record<string, string>
  referralNotes: Record<string, string>
  resourceTypeLabels: Record<string, string>
  videoFeatureLabels: Record<string, string>
}

const uiCopy: Record<LocaleCode, UiCopy> = {
  en: {
    common: {
      copied: 'Copied',
      congratulations: 'Congratulations! You earned one month free tuition.',
      copyCode: 'Copy code',
      shareMessage: 'Share message',
      openClassroom: 'Open classroom',
      joinLiveClass: 'Join Live Class',
      schedulePending: 'Schedule pending',
      enabled: 'enabled',
      disabled: 'disabled'
    },
    classrooms: {
      seoTitle: 'Classrooms',
      seoDescription:
        'Roshanayi Academy classroom system with live class links, assignments, attendance, resources, progress, and announcements.',
      heroEyebrow: 'Roshanayi Classrooms',
      title: 'Virtual classroom pages for every class group.',
      description:
        'Phase 1 uses secure meeting links for Zoom, Google Meet, or Jitsi while keeping the structure ready for built-in video, chat, recordings, screen sharing, whiteboard, and raise hand.',
      accessRuleTitle: 'Access rule',
      accessRuleText:
        'Students can join only when they are enrolled and their status is Trial or Active. Trial students are locked after the trial period until payment is confirmed by admin.',
      stats: {
        classrooms: 'Classrooms',
        virtualClassGroups: 'Virtual class groups',
        activeOrTrial: 'Active or Trial',
        readyForLiveSessions: 'Ready for live sessions',
        enrolledStudents: 'Enrolled Students',
        mockLearnerRecords: 'Mock learner records',
        videoPhase: 'Video Phase',
        links: 'Links',
        videoPhaseDetail: 'Zoom, Meet, or Jitsi for now'
      },
      classGroupsEyebrow: 'Class Groups',
      classGroupsTitle: 'Classroom list',
      classGroupsDescription:
        'Each group has its own dashboard for live class access, assignments, homework, attendance, resources, progress, and announcements.',
      adminOverview: 'Admin overview',
      registerStudent: 'Register a student',
      labels: {
        teacher: 'Teacher',
        schedule: 'Schedule',
        level: 'Level',
        students: 'Students',
        enrolled: 'Enrolled'
      }
    },
    classroomDetail: {
      seoTitle: 'Classroom',
      seoDescription:
        'Roshanayi Academy classroom page with live class access, assignments, homework submissions, attendance, resources, progress, and announcements.',
      tabs: {
        overview: 'Overview',
        liveClass: 'Live Class',
        assignments: 'Assignments',
        homework: 'Homework Submissions',
        attendance: 'Attendance',
        resources: 'Resources',
        progress: 'Progress',
        announcements: 'Announcements'
      },
      actions: {
        backToClassrooms: 'Back to classrooms',
        refreshPreview: 'Refresh preview',
        addAssignment: 'Add assignment',
        submitHomework: 'Submit homework',
        saveAttendance: 'Save attendance',
        postAnnouncement: 'Post announcement',
        viewClassrooms: 'View classrooms'
      },
      labels: {
        virtualClassroom: 'Virtual Classroom',
        teacher: 'Teacher',
        schedule: 'Schedule',
        classLevel: 'Class Level',
        overview: 'Overview',
        classroomDetails: 'Classroom details',
        course: 'Course',
        timezone: 'Timezone',
        capacity: 'Capacity',
        meetingLink: 'Meeting Link',
        enrolledStudents: 'Enrolled students',
        rolePermissions: 'Role permissions',
        teacherRestrictions: 'Teacher restrictions',
        accessPreview: 'Access Preview',
        joinClassRuleCheck: 'Join class rule check',
        viewAsStudent: 'View as student',
        paymentStatusParent: 'Payment status for parent view',
        liveClass: 'Live Class',
        meetingUrl: 'Meeting URL',
        futureVideo: 'Future built-in video structure',
        teacherTool: 'Teacher Tool',
        studentTool: 'Student Tool',
        createAssignment: 'Create assignment',
        title: 'Title',
        instructions: 'Instructions',
        dueDate: 'Due date',
        status: 'Status',
        fileAttachmentPlaceholder: 'File attachment placeholder',
        assignments: 'Assignments',
        due: 'Due',
        file: 'File',
        class: 'Class',
        submitHomework: 'Submit homework',
        student: 'Student',
        assignment: 'Assignment',
        textAnswer: 'Text answer',
        fileUploadPlaceholder: 'File upload placeholder',
        teacherReviewQueue: 'Teacher review queue',
        submitted: 'Submitted',
        score: 'Score',
        feedback: 'Feedback',
        markAttendance: 'Mark attendance',
        attendanceHistory: 'Attendance history',
        date: 'Date',
        trial: 'Trial',
        addResourcePlaceholder: 'Add resource placeholder',
        type: 'Type',
        fileOrLinkPlaceholder: 'File or link placeholder',
        classResources: 'Class resources',
        progress: 'Progress',
        homeworkCompletion: 'Homework completion',
        quizAverage: 'Quiz average',
        learningProgress: 'Learning progress',
        announcements: 'Announcements',
        classUpdates: 'Class updates',
        notFoundEyebrow: 'Classroom not found',
        notFoundTitle: 'This classroom does not exist.'
      },
      descriptions: {
        liveClass:
          'Phase 1 opens an external meeting link. Built-in video calling can be added later without changing the classroom model.',
        createAssignment: 'Mock only. Later this can save to a backend and attach real files.',
        teacherReviewQueue: 'Teachers can review homework, add scores, feedback, and mark reviewed.',
        attendanceHistory:
          'Parents can view summaries. Admin can review history across all classrooms.',
        addResource:
          'This is a mock upload structure for PDFs, audio, video links, Quran materials, vocabulary sheets, and class notes.',
        notFound: 'Please return to the classroom list and choose an active class group.'
      },
      placeholders: {
        lessonFile: 'lesson.pdf',
        homeworkPhoto: 'homework-photo.jpg',
        resourceFile: 'lesson.pdf or video link'
      },
      fallbacks: {
        selectStudentAccess: 'Select an enrolled student to preview live class access.',
        unknownCourse: 'Unknown course',
        unassignedTeacher: 'Unassigned teacher',
        unknownAssignment: 'Unknown assignment',
        pending: 'Pending',
        notSet: 'Not set',
        noPaymentRecord: 'No payment record yet',
        meetingLinkPending: 'Meeting link pending',
        awaitingReview: 'Awaiting review',
        teacherInstructions: 'Teacher instructions will be added.',
        noAttachment: 'No attachment yet',
        studentAnswer: 'Student text answer placeholder.',
        noFileUploaded: 'No file uploaded yet',
        yes: 'Yes',
        no: 'No'
      },
      notices: {
        addAssignmentTitle: 'Add an assignment title first.',
        assignmentAdded: 'Mock assignment added for this page preview.',
        selectStudentAndAssignment: 'Select a student and assignment first.',
        homeworkSubmitted: 'Mock homework submitted for review.',
        attendanceSaved: 'Mock attendance saved for this preview.'
      },
      rolePermissions: [
        {
          role: 'Teacher',
          text:
            'manage own classrooms, add assignments, mark attendance, add resources, review homework, and write progress notes.'
        },
        {
          role: 'Student',
          text:
            'join assigned classroom, view assignments, submit homework, view resources, and see own progress.'
        },
        {
          role: 'Parent',
          text:
            'view child classroom, attendance, homework status, teacher notes, payment status, and request progress report.'
        },
        {
          role: 'Admin',
          text:
            'create classrooms, assign teachers/students, manage schedules, meeting links, attendance, progress, and announcements.'
        }
      ],
      teacherRestrictions: [
        'Teachers do not see parent payment details.',
        'Teachers cannot collect fees directly.',
        'Teachers see only their assigned classrooms and students.',
        'Teachers cannot export student contact lists.'
      ]
    },
    management: {
      seoTitle: 'Management System Phase 1',
      seoDescription:
        'Phase 1 mock student management dashboard for Roshanayi Academy with students, courses, teachers, schedules, attendance, payments, and role views.',
      heroEyebrow: 'Roshanayi Academy',
      heroTitle: 'Management System Phase 1',
      heroDescription:
        'A clean mock-data foundation for admin, parent, and teacher workflows. No backend, no payment gateway, and no complex features yet.',
      stats: {
        students: 'Students',
        mockRegistrations: 'Mock registrations',
        active: 'Active',
        canAttendPaidClasses: 'Can attend paid classes',
        paymentRequired: 'Payment required',
        needsAdminFollowUp: 'Needs admin follow-up',
        courses: 'Courses',
        availablePrograms: 'Available programs',
        classrooms: 'Classrooms',
        virtualClassGroups: 'Virtual class groups'
      },
      admin: {
        eyebrow: 'Admin Dashboard',
        title: 'Overview for Phase 1 operations',
        description:
          'Admin can review student registrations, class status, schedules, attendance, and payments from one simple page.',
        studentsSmall: 'students',
        studentListTitle: 'Student Registration List',
        studentListDescription:
          'Mock records only. Statuses are Trial, Payment Required, Active, and Inactive.',
        coursesListTitle: 'Courses List',
        teachersListTitle: 'Teachers List',
        classScheduleTitle: 'Class Schedule List',
        classroomManagementTitle: 'Classroom Management',
        classroomManagementDescription:
          'Admin can review class groups, meeting providers, enrolled students, schedules, and classroom pages.',
        attendanceTableTitle: 'Attendance Table',
        paymentTrackingTitle: 'Payment Tracking Table',
        paymentTrackingDescription: 'Tracking only. No payment gateway is connected.',
        referralManagementTitle: 'Referral Management',
        referralManagementDescription:
          'Referrals count only after completed registration, two attended trial classes, paid first invoice, admin payment confirmation, and family approval. Same-family referrals stay in review until admin approves them.'
      },
      labels: {
        student: 'Student',
        parent: 'Parent',
        age: 'Age',
        country: 'Country',
        course: 'Course',
        preferredTime: 'Preferred Time',
        trials: 'Trials',
        referralCode: 'Referral Code',
        status: 'Status',
        teacher: 'Teacher',
        day: 'Day',
        time: 'Time',
        timezone: 'Timezone',
        capacity: 'Capacity',
        classroom: 'Classroom',
        schedule: 'Schedule',
        provider: 'Provider',
        students: 'Students',
        page: 'Page',
        date: 'Date',
        month: 'Month',
        amount: 'Amount',
        confirmed: 'Confirmed',
        referrer: 'Referrer',
        totalRegistrations: 'Total Registrations',
        verifiedPaid: 'Verified Paid',
        rewardStatus: 'Reward Status',
        adminReview: 'Admin Review',
        level: 'Level',
        access: 'Access',
        payment: 'Payment',
        attendance: 'Attendance',
        nextClass: 'Next Class',
        referralCard: 'Referral Card',
        assignedClassroom: 'Assigned Classroom'
      },
      actions: {
        viewAllClassrooms: 'View all classrooms',
        open: 'Open',
        approveReward: 'Approve reward',
        reject: 'Reject'
      },
      parent: {
        eyebrow: 'Parent Dashboard',
        title: 'Basic parent view',
        viewingAs: 'Viewing as {name}.',
        referralCodeTitle: '{name} referral code',
        notScheduled: 'Not scheduled',
        openClassroomPrefix: 'Open'
      },
      teacher: {
        eyebrow: 'Teacher Dashboard',
        title: 'Basic teacher view',
        viewingAs:
          'Viewing as {name}. Parent phone numbers and payment details are not shown. Export is {status}.',
        classes: 'classes',
        students: 'students'
      }
    },
    register: {
      referralCode: 'Referral Code',
      referralPlaceholder: 'Enter referral code if someone invited you',
      referralHelp:
        'Referral rewards count only after trial classes, first payment, and admin confirmation.',
      generatedPrefix: 'New student referral code:',
      generatedSuffix:
        'Share it after enrollment so verified referrals can count toward one month free tuition.'
    },
    dashboard: {
      classroomAccess: 'Classroom Access',
      myLiveClasses: 'My live classes',
      studentProfile: 'Student Profile',
      referralCode: 'Referral Code',
      referralDescription:
        'Share this code with another family. The reward counts only after their trial classes and first admin-confirmed payment.',
      referralShareMessage:
        'Join Roshanayi Academy with my referral code {code}. New students can start with two trial classes before payment.',
      verifiedReferrals: 'verified referrals'
    },
    statusLabels: {
      Trial: 'Trial',
      'Payment Required': 'Payment Required',
      Active: 'Active',
      Inactive: 'Inactive',
      paid: 'paid',
      pending: 'pending',
      unpaid: 'unpaid',
      overdue: 'overdue',
      tracking: 'tracking',
      eligible: 'eligible',
      available: 'available',
      approved: 'approved',
      rejected: 'rejected',
      needs_review: 'needs review',
      Full: 'Full',
      Paused: 'Paused',
      'Trial Only': 'Trial Only',
      draft: 'draft',
      published: 'published',
      closed: 'closed',
      submitted: 'submitted',
      late: 'late',
      reviewed: 'reviewed',
      present: 'present',
      absent: 'absent',
      excused: 'excused',
      Unknown: 'Unknown',
      'Not Enrolled': 'Not Enrolled',
      Visible: 'Visible',
      Locked: 'Locked'
    },
    accessMessages: {
      'Select an enrolled student to preview live class access.':
        'Select an enrolled student to preview live class access.',
      'Classroom access could not be verified.': 'Classroom access could not be verified.',
      'This student is not enrolled in this classroom.':
        'This student is not enrolled in this classroom.',
      'Your trial period has ended. Please complete payment to continue classes.':
        'Your trial period has ended. Please complete payment to continue classes.',
      'Class access is locked because this student is not currently active or in trial.':
        'Class access is locked because this student is not currently active or in trial.',
      'Live class access is available for this enrolled student.':
        'Live class access is available for this enrolled student.'
    },
    referralNotes: {
      'Three verified referrals. One same-family registration requires admin review before it can count.':
        'Three verified referrals. One same-family registration requires admin review before it can count.',
      'Congratulations! You earned one month free tuition.':
        'Congratulations! You earned one month free tuition.',
      'Referral is registered but not yet verified because trial/payment confirmation is incomplete.':
        'Referral is registered but not yet verified because trial/payment confirmation is incomplete.',
      'Reward becomes available after 5 verified paid referrals.':
        'Reward becomes available after 5 verified paid referrals.'
    },
    resourceTypeLabels: {
      'PDF Lesson': 'PDF Lesson',
      'Audio File': 'Audio File',
      'Video Link': 'Video Link',
      'Quran Practice': 'Quran Practice',
      'Vocabulary Sheet': 'Vocabulary Sheet',
      'Class Notes': 'Class Notes'
    },
    videoFeatureLabels: {
      'audio/video': 'audio/video',
      'screen sharing': 'screen sharing',
      chat: 'chat',
      recording: 'recording',
      whiteboard: 'whiteboard',
      'raise hand': 'raise hand'
    }
  },
  fa: {
    common: {
      copied: 'کاپی شد',
      congratulations: 'تبریک! شما یک ماه شهریه رایگان به دست آوردید.',
      copyCode: 'کاپی کود',
      shareMessage: 'شریک‌سازی پیام',
      openClassroom: 'باز کردن صنف',
      joinLiveClass: 'پیوستن به صنف زنده',
      schedulePending: 'برنامه در انتظار است',
      enabled: 'فعال',
      disabled: 'غیرفعال'
    },
    classrooms: {
      seoTitle: 'صنف‌ها',
      seoDescription:
        'سیستم صنف‌های آکادمی روشنایی با لینک صنف زنده، وظایف، حاضری، منابع، پیشرفت و اعلان‌ها.',
      heroEyebrow: 'صنف‌های روشنایی',
      title: 'صفحه صنف مجازی برای هر گروه درسی.',
      description:
        'مرحله اول از لینک‌های امن Zoom، Google Meet یا Jitsi استفاده می‌کند و ساختار برای ویدیو داخلی، چت، ضبط، شریک‌سازی صفحه، تخته سفید و بلند کردن دست آماده می‌ماند.',
      accessRuleTitle: 'قانون دسترسی',
      accessRuleText:
        'شاگردان فقط زمانی می‌توانند وارد شوند که ثبت‌نام شده باشند و وضعیت‌شان آزمایشی یا فعال باشد. شاگردان آزمایشی پس از پایان دوره آزمایشی تا تایید پرداخت توسط مدیریت قفل می‌شوند.',
      stats: {
        classrooms: 'صنف‌ها',
        virtualClassGroups: 'گروه‌های صنف مجازی',
        activeOrTrial: 'فعال یا آزمایشی',
        readyForLiveSessions: 'آماده برای جلسه زنده',
        enrolledStudents: 'شاگردان ثبت‌نام‌شده',
        mockLearnerRecords: 'رکوردهای نمونه شاگردان',
        videoPhase: 'مرحله ویدیو',
        links: 'لینک‌ها',
        videoPhaseDetail: 'فعلاً Zoom، Meet یا Jitsi'
      },
      classGroupsEyebrow: 'گروه‌های صنف',
      classGroupsTitle: 'فهرست صنف‌ها',
      classGroupsDescription:
        'هر گروه داشبورد خود را برای دسترسی صنف زنده، وظایف، کارخانگی، حاضری، منابع، پیشرفت و اعلان‌ها دارد.',
      adminOverview: 'نمای مدیریت',
      registerStudent: 'ثبت‌نام شاگرد',
      labels: {
        teacher: 'استاد',
        schedule: 'برنامه',
        level: 'سطح',
        students: 'شاگردان',
        enrolled: 'ثبت‌نام‌شده'
      }
    },
    classroomDetail: {
      seoTitle: 'صنف',
      seoDescription:
        'صفحه صنف آکادمی روشنایی با دسترسی صنف زنده، وظایف، سپردن کارخانگی، حاضری، منابع، پیشرفت و اعلان‌ها.',
      tabs: {
        overview: 'نمای کلی',
        liveClass: 'صنف زنده',
        assignments: 'وظایف',
        homework: 'کارخانگی‌های سپرده‌شده',
        attendance: 'حاضری',
        resources: 'منابع',
        progress: 'پیشرفت',
        announcements: 'اعلان‌ها'
      },
      actions: {
        backToClassrooms: 'بازگشت به صنف‌ها',
        refreshPreview: 'تازه‌سازی پیش‌نمایش',
        addAssignment: 'افزودن وظیفه',
        submitHomework: 'سپردن کارخانگی',
        saveAttendance: 'ذخیره حاضری',
        postAnnouncement: 'نشر اعلان',
        viewClassrooms: 'دیدن صنف‌ها'
      },
      labels: {
        virtualClassroom: 'صنف مجازی',
        teacher: 'استاد',
        schedule: 'برنامه',
        classLevel: 'سطح صنف',
        overview: 'نمای کلی',
        classroomDetails: 'جزئیات صنف',
        course: 'دوره',
        timezone: 'منطقه زمانی',
        capacity: 'ظرفیت',
        meetingLink: 'لینک جلسه',
        enrolledStudents: 'شاگردان ثبت‌نام‌شده',
        rolePermissions: 'صلاحیت‌های نقش‌ها',
        teacherRestrictions: 'محدودیت‌های استاد',
        accessPreview: 'پیش‌نمایش دسترسی',
        joinClassRuleCheck: 'بررسی قانون ورود به صنف',
        viewAsStudent: 'دیدن به حیث شاگرد',
        paymentStatusParent: 'وضعیت پرداخت برای دید والد',
        liveClass: 'صنف زنده',
        meetingUrl: 'آدرس جلسه',
        futureVideo: 'ساختار آینده ویدیوی داخلی',
        teacherTool: 'ابزار استاد',
        studentTool: 'ابزار شاگرد',
        createAssignment: 'ساخت وظیفه',
        title: 'عنوان',
        instructions: 'رهنمودها',
        dueDate: 'تاریخ تحویل',
        status: 'وضعیت',
        fileAttachmentPlaceholder: 'نمونه پیوست فایل',
        assignments: 'وظایف',
        due: 'تحویل',
        file: 'فایل',
        class: 'صنف',
        submitHomework: 'سپردن کارخانگی',
        student: 'شاگرد',
        assignment: 'وظیفه',
        textAnswer: 'پاسخ متنی',
        fileUploadPlaceholder: 'نمونه آپلود فایل',
        teacherReviewQueue: 'صف بررسی استاد',
        submitted: 'سپرده شده',
        score: 'نمره',
        feedback: 'بازخورد',
        markAttendance: 'ثبت حاضری',
        attendanceHistory: 'تاریخچه حاضری',
        date: 'تاریخ',
        trial: 'آزمایشی',
        addResourcePlaceholder: 'افزودن نمونه منبع',
        type: 'نوع',
        fileOrLinkPlaceholder: 'نمونه فایل یا لینک',
        classResources: 'منابع صنف',
        progress: 'پیشرفت',
        homeworkCompletion: 'تکمیل کارخانگی',
        quizAverage: 'میانگین آزمون',
        learningProgress: 'پیشرفت یادگیری',
        announcements: 'اعلان‌ها',
        classUpdates: 'تازه‌سازی‌های صنف',
        notFoundEyebrow: 'صنف پیدا نشد',
        notFoundTitle: 'این صنف وجود ندارد.'
      },
      descriptions: {
        liveClass:
          'مرحله اول لینک جلسه بیرونی را باز می‌کند. تماس ویدیویی داخلی بعداً بدون تغییر مدل صنف اضافه شده می‌تواند.',
        createAssignment: 'فعلاً نمونه است. بعداً می‌تواند در backend ذخیره شود و فایل واقعی پیوست کند.',
        teacherReviewQueue: 'استادان می‌توانند کارخانگی را بررسی کنند، نمره و بازخورد بدهند و آن را بررسی‌شده بسازند.',
        attendanceHistory:
          'والدین می‌توانند خلاصه‌ها را ببینند. مدیریت می‌تواند تاریخچه را در همه صنف‌ها بررسی کند.',
        addResource:
          'این ساختار نمونه برای آپلود PDF، صدا، لینک ویدیو، مواد قرآن، ورق واژگان و یادداشت‌های صنف است.',
        notFound: 'لطفاً به فهرست صنف‌ها برگردید و یک گروه فعال را انتخاب کنید.'
      },
      placeholders: {
        lessonFile: 'lesson.pdf',
        homeworkPhoto: 'homework-photo.jpg',
        resourceFile: 'lesson.pdf یا لینک ویدیو'
      },
      fallbacks: {
        selectStudentAccess: 'یک شاگرد ثبت‌نام‌شده را برای دیدن دسترسی صنف زنده انتخاب کنید.',
        unknownCourse: 'دوره نامعلوم',
        unassignedTeacher: 'استاد تعیین نشده',
        unknownAssignment: 'وظیفه نامعلوم',
        pending: 'در انتظار',
        notSet: 'تنظیم نشده',
        noPaymentRecord: 'هنوز رکورد پرداخت نیست',
        meetingLinkPending: 'لینک جلسه در انتظار است',
        awaitingReview: 'در انتظار بررسی',
        teacherInstructions: 'رهنمود استاد اضافه خواهد شد.',
        noAttachment: 'هنوز پیوستی نیست',
        studentAnswer: 'نمونه پاسخ متنی شاگرد.',
        noFileUploaded: 'هنوز فایلی آپلود نشده',
        yes: 'بلی',
        no: 'نخیر'
      },
      notices: {
        addAssignmentTitle: 'اول عنوان وظیفه را اضافه کنید.',
        assignmentAdded: 'وظیفه نمونه برای پیش‌نمایش این صفحه اضافه شد.',
        selectStudentAndAssignment: 'اول شاگرد و وظیفه را انتخاب کنید.',
        homeworkSubmitted: 'کارخانگی نمونه برای بررسی فرستاده شد.',
        attendanceSaved: 'حاضری نمونه برای این پیش‌نمایش ذخیره شد.'
      },
      rolePermissions: [
        {
          role: 'استاد',
          text:
            'صنف‌های خود را مدیریت می‌کند، وظیفه می‌افزاید، حاضری می‌گیرد، منبع اضافه می‌کند، کارخانگی را بررسی می‌کند و یادداشت پیشرفت می‌نویسد.'
        },
        {
          role: 'شاگرد',
          text:
            'به صنف تعیین‌شده می‌پیوندد، وظایف و منابع را می‌بیند، کارخانگی می‌فرستد و پیشرفت خود را می‌بیند.'
        },
        {
          role: 'والد',
          text:
            'صنف کودک، حاضری، وضعیت کارخانگی، یادداشت استاد، وضعیت پرداخت و گزارش پیشرفت را می‌بیند.'
        },
        {
          role: 'مدیریت',
          text:
            'صنف می‌سازد، استادان و شاگردان را تعیین می‌کند، برنامه، لینک جلسه، حاضری، پیشرفت و اعلان‌ها را مدیریت می‌کند.'
        }
      ],
      teacherRestrictions: [
        'استادان جزئیات پرداخت والدین را نمی‌بینند.',
        'استادان نمی‌توانند مستقیماً فیس بگیرند.',
        'استادان فقط صنف‌ها و شاگردان تعیین‌شده خود را می‌بینند.',
        'استادان نمی‌توانند فهرست تماس شاگردان را صادر کنند.'
      ]
    },
    management: {
      seoTitle: 'سیستم مدیریت مرحله اول',
      seoDescription:
        'داشبورد نمونه مدیریت شاگردان برای آکادمی روشنایی با شاگردان، دوره‌ها، استادان، برنامه‌ها، حاضری، پرداخت‌ها و دید نقش‌ها.',
      heroEyebrow: 'آکادمی روشنایی',
      heroTitle: 'سیستم مدیریت مرحله اول',
      heroDescription:
        'یک بنیاد پاک با داده‌های نمونه برای روندهای مدیریت، والد و استاد. فعلاً backend، درگاه پرداخت و ویژگی‌های پیچیده وصل نیست.',
      stats: {
        students: 'شاگردان',
        mockRegistrations: 'ثبت‌نام‌های نمونه',
        active: 'فعال',
        canAttendPaidClasses: 'می‌تواند در صنف‌های پرداخت‌شده شرکت کند',
        paymentRequired: 'پرداخت لازم است',
        needsAdminFollowUp: 'نیاز به پیگیری مدیریت',
        courses: 'دوره‌ها',
        availablePrograms: 'برنامه‌های موجود',
        classrooms: 'صنف‌ها',
        virtualClassGroups: 'گروه‌های صنف مجازی'
      },
      admin: {
        eyebrow: 'داشبورد مدیریت',
        title: 'نمای کلی عملیات مرحله اول',
        description:
          'مدیریت می‌تواند ثبت‌نام شاگردان، وضعیت صنف، برنامه‌ها، حاضری و پرداخت‌ها را از یک صفحه ساده بررسی کند.',
        studentsSmall: 'شاگرد',
        studentListTitle: 'فهرست ثبت‌نام شاگردان',
        studentListDescription:
          'فقط رکوردهای نمونه. وضعیت‌ها شامل آزمایشی، پرداخت لازم، فعال و غیرفعال است.',
        coursesListTitle: 'فهرست دوره‌ها',
        teachersListTitle: 'فهرست استادان',
        classScheduleTitle: 'فهرست برنامه صنف‌ها',
        classroomManagementTitle: 'مدیریت صنف‌ها',
        classroomManagementDescription:
          'مدیریت می‌تواند گروه‌های صنف، فراهم‌کنندگان جلسه، شاگردان ثبت‌نام‌شده، برنامه‌ها و صفحه‌های صنف را بررسی کند.',
        attendanceTableTitle: 'جدول حاضری',
        paymentTrackingTitle: 'جدول پیگیری پرداخت',
        paymentTrackingDescription: 'فقط برای پیگیری است. هیچ درگاه پرداخت وصل نیست.',
        referralManagementTitle: 'مدیریت معرفی‌ها',
        referralManagementDescription:
          'معرفی‌ها فقط پس از تکمیل ثبت‌نام، دو صنف آزمایشی حاضر، پرداخت نخستین فاکتور، تایید پرداخت توسط مدیریت و تایید خانواده حساب می‌شود. معرفی‌های از همان خانواده تا تایید مدیریت در بررسی می‌ماند.'
      },
      labels: {
        student: 'شاگرد',
        parent: 'والد',
        age: 'سن',
        country: 'کشور',
        course: 'دوره',
        preferredTime: 'وقت ترجیحی',
        trials: 'آزمایشی‌ها',
        referralCode: 'کود معرفی',
        status: 'وضعیت',
        teacher: 'استاد',
        day: 'روز',
        time: 'وقت',
        timezone: 'منطقه زمانی',
        capacity: 'ظرفیت',
        classroom: 'صنف',
        schedule: 'برنامه',
        provider: 'فراهم‌کننده',
        students: 'شاگردان',
        page: 'صفحه',
        date: 'تاریخ',
        month: 'ماه',
        amount: 'مقدار',
        confirmed: 'تایید',
        referrer: 'معرفی‌کننده',
        totalRegistrations: 'مجموع ثبت‌نام‌ها',
        verifiedPaid: 'پرداخت تاییدشده',
        rewardStatus: 'وضعیت جایزه',
        adminReview: 'بررسی مدیریت',
        level: 'سطح',
        access: 'دسترسی',
        payment: 'پرداخت',
        attendance: 'حاضری',
        nextClass: 'صنف بعدی',
        referralCard: 'کارت معرفی',
        assignedClassroom: 'صنف تعیین‌شده'
      },
      actions: {
        viewAllClassrooms: 'دیدن همه صنف‌ها',
        open: 'باز کردن',
        approveReward: 'تایید جایزه',
        reject: 'رد کردن'
      },
      parent: {
        eyebrow: 'داشبورد والد',
        title: 'نمای ساده والد',
        viewingAs: 'در حال دیدن به حیث {name}.',
        referralCodeTitle: 'کود معرفی {name}',
        notScheduled: 'برنامه نشده',
        openClassroomPrefix: 'باز کردن'
      },
      teacher: {
        eyebrow: 'داشبورد استاد',
        title: 'نمای ساده استاد',
        viewingAs:
          'در حال دیدن به حیث {name}. شماره‌های والدین و جزئیات پرداخت نشان داده نمی‌شود. صدور فهرست {status} است.',
        classes: 'صنف',
        students: 'شاگرد'
      }
    },
    register: {
      referralCode: 'کود معرفی',
      referralPlaceholder: 'اگر کسی شما را دعوت کرده، کود معرفی را وارد کنید',
      referralHelp:
        'جایزه معرفی فقط پس از صنف‌های آزمایشی، نخستین پرداخت و تایید مدیریت حساب می‌شود.',
      generatedPrefix: 'کود معرفی شاگرد تازه:',
      generatedSuffix:
        'پس از ثبت‌نام آن را شریک بسازید تا معرفی‌های تاییدشده برای یک ماه شهریه رایگان حساب شود.'
    },
    dashboard: {
      classroomAccess: 'دسترسی به صنف',
      myLiveClasses: 'صنف‌های زنده من',
      studentProfile: 'پروفایل شاگرد',
      referralCode: 'کود معرفی',
      referralDescription:
        'این کود را با یک خانواده دیگر شریک بسازید. جایزه فقط پس از صنف‌های آزمایشی و نخستین پرداخت تاییدشده توسط مدیریت حساب می‌شود.',
      referralShareMessage:
        'با کود معرفی {code} به آکادمی روشنایی بپیوندید. شاگردان تازه می‌توانند با دو صنف آزمایشی پیش از پرداخت آغاز کنند.',
      verifiedReferrals: 'معرفی تاییدشده'
    },
    statusLabels: {
      Trial: 'آزمایشی',
      'Payment Required': 'پرداخت لازم است',
      Active: 'فعال',
      Inactive: 'غیرفعال',
      paid: 'پرداخت شده',
      pending: 'در انتظار',
      unpaid: 'پرداخت نشده',
      overdue: 'دیرشده',
      tracking: 'در حال پیگیری',
      eligible: 'واجد شرایط',
      available: 'در دسترس',
      approved: 'تایید شده',
      rejected: 'رد شده',
      needs_review: 'نیاز به بررسی',
      Full: 'پر',
      Paused: 'متوقف',
      'Trial Only': 'فقط آزمایشی',
      draft: 'پیش‌نویس',
      published: 'نشر شده',
      closed: 'بسته',
      submitted: 'فرستاده شده',
      late: 'دیر',
      reviewed: 'بررسی شده',
      present: 'حاضر',
      absent: 'غایب',
      excused: 'معذور',
      Unknown: 'نامعلوم',
      'Not Enrolled': 'ثبت‌نام نشده',
      Visible: 'قابل دید',
      Locked: 'قفل'
    },
    accessMessages: {
      'Select an enrolled student to preview live class access.':
        'یک شاگرد ثبت‌نام‌شده را برای دیدن دسترسی صنف زنده انتخاب کنید.',
      'Classroom access could not be verified.': 'دسترسی به صنف تایید نشد.',
      'This student is not enrolled in this classroom.':
        'این شاگرد در این صنف ثبت‌نام نشده است.',
      'Your trial period has ended. Please complete payment to continue classes.':
        'دوره آزمایشی شما پایان یافته است. برای ادامه صنف‌ها لطفاً پرداخت را تکمیل کنید.',
      'Class access is locked because this student is not currently active or in trial.':
        'دسترسی صنف قفل است چون این شاگرد فعلاً فعال یا در دوره آزمایشی نیست.',
      'Live class access is available for this enrolled student.':
        'دسترسی صنف زنده برای این شاگرد ثبت‌نام‌شده در دسترس است.'
    },
    referralNotes: {
      'Three verified referrals. One same-family registration requires admin review before it can count.':
        'سه معرفی تایید شده است. یک ثبت‌نام از همان خانواده پیش از حساب‌شدن نیاز به بررسی مدیریت دارد.',
      'Congratulations! You earned one month free tuition.':
        'تبریک! شما یک ماه شهریه رایگان به دست آوردید.',
      'Referral is registered but not yet verified because trial/payment confirmation is incomplete.':
        'معرفی ثبت شده اما هنوز تایید نشده، چون تایید صنف آزمایشی یا پرداخت کامل نیست.',
      'Reward becomes available after 5 verified paid referrals.':
        'جایزه پس از ۵ معرفی پرداخت‌شده و تاییدشده در دسترس می‌شود.'
    },
    resourceTypeLabels: {
      'PDF Lesson': 'درس PDF',
      'Audio File': 'فایل صوتی',
      'Video Link': 'لینک ویدیو',
      'Quran Practice': 'تمرین قرآن',
      'Vocabulary Sheet': 'ورق واژگان',
      'Class Notes': 'یادداشت‌های صنف'
    },
    videoFeatureLabels: {
      'audio/video': 'صدا/ویدیو',
      'screen sharing': 'شریک‌سازی صفحه',
      chat: 'چت',
      recording: 'ضبط',
      whiteboard: 'تخته سفید',
      'raise hand': 'بلند کردن دست'
    }
  },
  ps: {
    common: {
      copied: 'کاپي شو',
      congratulations: 'مبارک! تاسو د یوې میاشتې وړیا فیس ترلاسه کړ.',
      copyCode: 'کوډ کاپي کړئ',
      shareMessage: 'پیغام شریک کړئ',
      openClassroom: 'صنف پرانیزئ',
      joinLiveClass: 'ژوندي صنف ته ننوتل',
      schedulePending: 'مهالویش پاتې دی',
      enabled: 'فعال',
      disabled: 'غیرفعال'
    },
    classrooms: {
      seoTitle: 'صنفونه',
      seoDescription:
        'د روښنايي اکاډمي د صنف سیستم له ژوندي صنف لینکونو، دندو، حاضري، سرچینو، پرمختګ او اعلانونو سره.',
      heroEyebrow: 'د روښنايي صنفونه',
      title: 'د هر صنفي ګروپ لپاره مجازي صنف پاڼې.',
      description:
        'لومړی پړاو د Zoom، Google Meet یا Jitsi خوندي لینکونه کاروي او جوړښت د داخلي ویدیو، چټ، ثبت، د پردې شریکولو، سپینې تختې او لاس پورته کولو لپاره چمتو ساتي.',
      accessRuleTitle: 'د لاسرسي قانون',
      accessRuleText:
        'زده کوونکي یوازې هغه وخت ننوتلی شي چې نوملیکنه ولري او حالت یې آزمایښتي یا فعال وي. آزمایښتي زده کوونکي د آزمایښتي مودې وروسته تر هغه قفل کېږي چې تادیه د مدیریت له خوا تایید شي.',
      stats: {
        classrooms: 'صنفونه',
        virtualClassGroups: 'مجازي صنفي ګروپونه',
        activeOrTrial: 'فعال یا آزمایښتي',
        readyForLiveSessions: 'ژوندیو غونډو ته چمتو',
        enrolledStudents: 'نوملیکل شوي زده کوونکي',
        mockLearnerRecords: 'د زده کوونکو نمونه ریکارډونه',
        videoPhase: 'د ویدیو پړاو',
        links: 'لینکونه',
        videoPhaseDetail: 'اوس لپاره Zoom، Meet یا Jitsi'
      },
      classGroupsEyebrow: 'صنفي ګروپونه',
      classGroupsTitle: 'د صنفونو لست',
      classGroupsDescription:
        'هر ګروپ خپل ډشبورډ لري د ژوندي صنف لاسرسي، دندو، کورنۍ دندې، حاضري، سرچینو، پرمختګ او اعلانونو لپاره.',
      adminOverview: 'د مدیریت لنډیز',
      registerStudent: 'زده کوونکی ثبت کړئ',
      labels: {
        teacher: 'استاد',
        schedule: 'مهالویش',
        level: 'کچه',
        students: 'زده کوونکي',
        enrolled: 'نوملیکل شوي'
      }
    },
    classroomDetail: {
      seoTitle: 'صنف',
      seoDescription:
        'د روښنايي اکاډمي صنف پاڼه له ژوندي صنف لاسرسي، دندو، کورنۍ دندې سپارلو، حاضري، سرچینو، پرمختګ او اعلانونو سره.',
      tabs: {
        overview: 'لنډیز',
        liveClass: 'ژوندی صنف',
        assignments: 'دندې',
        homework: 'سپارل شوې کورنۍ دندې',
        attendance: 'حاضري',
        resources: 'سرچینې',
        progress: 'پرمختګ',
        announcements: 'اعلانونه'
      },
      actions: {
        backToClassrooms: 'صنفونو ته ستنېدل',
        refreshPreview: 'مخکتنه تازه کړئ',
        addAssignment: 'دنده زیاته کړئ',
        submitHomework: 'کورنۍ دنده وسپارئ',
        saveAttendance: 'حاضري خوندي کړئ',
        postAnnouncement: 'اعلان خپور کړئ',
        viewClassrooms: 'صنفونه وګورئ'
      },
      labels: {
        virtualClassroom: 'مجازي صنف',
        teacher: 'استاد',
        schedule: 'مهالویش',
        classLevel: 'د صنف کچه',
        overview: 'لنډیز',
        classroomDetails: 'د صنف جزئیات',
        course: 'کورس',
        timezone: 'وخت زون',
        capacity: 'ظرفیت',
        meetingLink: 'د غونډې لینک',
        enrolledStudents: 'نوملیکل شوي زده کوونکي',
        rolePermissions: 'د رولونو اجازه',
        teacherRestrictions: 'د استاد محدودیتونه',
        accessPreview: 'د لاسرسي مخکتنه',
        joinClassRuleCheck: 'صنف ته د ننوتلو قانون کتل',
        viewAsStudent: 'د زده کوونکي په توګه وګورئ',
        paymentStatusParent: 'د والد لید لپاره د تادیې حالت',
        liveClass: 'ژوندی صنف',
        meetingUrl: 'د غونډې پته',
        futureVideo: 'د راتلونکي داخلي ویدیو جوړښت',
        teacherTool: 'د استاد وسیله',
        studentTool: 'د زده کوونکي وسیله',
        createAssignment: 'دنده جوړه کړئ',
        title: 'عنوان',
        instructions: 'لارښوونې',
        dueDate: 'د سپارلو نېټه',
        status: 'حالت',
        fileAttachmentPlaceholder: 'د فایل ضمیمې نمونه',
        assignments: 'دندې',
        due: 'سپارل',
        file: 'فایل',
        class: 'صنف',
        submitHomework: 'کورنۍ دنده وسپارئ',
        student: 'زده کوونکی',
        assignment: 'دنده',
        textAnswer: 'متني ځواب',
        fileUploadPlaceholder: 'د فایل پورته کولو نمونه',
        teacherReviewQueue: 'د استاد د بیاکتنې کتار',
        submitted: 'سپارل شوی',
        score: 'نمره',
        feedback: 'نظر',
        markAttendance: 'حاضري نښه کړئ',
        attendanceHistory: 'د حاضري تاریخچه',
        date: 'نېټه',
        trial: 'آزمایښتي',
        addResourcePlaceholder: 'د سرچینې نمونه زیاته کړئ',
        type: 'ډول',
        fileOrLinkPlaceholder: 'د فایل یا لینک نمونه',
        classResources: 'د صنف سرچینې',
        progress: 'پرمختګ',
        homeworkCompletion: 'د کورنۍ دندې بشپړول',
        quizAverage: 'د ازموینې منځنۍ نمره',
        learningProgress: 'د زده کړې پرمختګ',
        announcements: 'اعلانونه',
        classUpdates: 'د صنف تازه معلومات',
        notFoundEyebrow: 'صنف ونه موندل شو',
        notFoundTitle: 'دا صنف نشته.'
      },
      descriptions: {
        liveClass:
          'لومړی پړاو بهرنی غونډې لینک پرانیزي. داخلي ویدیو اړیکه وروسته د صنف د ماډل له بدلولو پرته زیاتېدای شي.',
        createAssignment: 'اوس یوازې نمونه ده. وروسته backend ته خوندي کېدای شي او ریښتیني فایلونه ورسره تړل کېدای شي.',
        teacherReviewQueue: 'استادان کورنۍ دنده کتلی شي، نمره او نظر ورکولی شي او بیاکتل شوی یې نښه کولی شي.',
        attendanceHistory:
          'والدین لنډیزونه لیدلی شي. مدیریت د ټولو صنفونو تاریخچه کتلی شي.',
        addResource:
          'دا د PDF، غږ، ویدیو لینک، قرآن موادو، لغت پاڼو او صنفي یادښتونو لپاره د پورته کولو نمونه جوړښت دی.',
        notFound: 'مهرباني وکړئ د صنفونو لست ته ستانه شئ او یو فعال صنفي ګروپ وټاکئ.'
      },
      placeholders: {
        lessonFile: 'lesson.pdf',
        homeworkPhoto: 'homework-photo.jpg',
        resourceFile: 'lesson.pdf یا video link'
      },
      fallbacks: {
        selectStudentAccess: 'د ژوندي صنف د لاسرسي کتلو لپاره یو نوملیکل شوی زده کوونکی وټاکئ.',
        unknownCourse: 'نامعلوم کورس',
        unassignedTeacher: 'استاد نه دی ټاکل شوی',
        unknownAssignment: 'نامعلومه دنده',
        pending: 'په تمه',
        notSet: 'نه دی ټاکل شوی',
        noPaymentRecord: 'لا د تادیې ریکارډ نشته',
        meetingLinkPending: 'د غونډې لینک پاتې دی',
        awaitingReview: 'بیاکتنې ته په تمه',
        teacherInstructions: 'د استاد لارښوونې به زیاتې شي.',
        noAttachment: 'لا ضمیمه نشته',
        studentAnswer: 'د زده کوونکي د متني ځواب نمونه.',
        noFileUploaded: 'لا فایل نه دی پورته شوی',
        yes: 'هو',
        no: 'نه'
      },
      notices: {
        addAssignmentTitle: 'لومړی د دندې عنوان زیات کړئ.',
        assignmentAdded: 'د دې پاڼې مخکتنې لپاره نمونه دنده زیاته شوه.',
        selectStudentAndAssignment: 'لومړی زده کوونکی او دنده وټاکئ.',
        homeworkSubmitted: 'نمونه کورنۍ دنده د بیاکتنې لپاره وسپارل شوه.',
        attendanceSaved: 'د دې مخکتنې نمونه حاضري خوندي شوه.'
      },
      rolePermissions: [
        {
          role: 'استاد',
          text:
            'خپل صنفونه مدیریت کوي، دندې زیاتوي، حاضري نښه کوي، سرچینې زیاتوي، کورنۍ دنده ګوري او د پرمختګ یادښتونه لیکي.'
        },
        {
          role: 'زده کوونکی',
          text:
            'ټاکل شوي صنف ته ننوځي، دندې او سرچینې ګوري، کورنۍ دنده سپاري او خپل پرمختګ ویني.'
        },
        {
          role: 'والد',
          text:
            'د ماشوم صنف، حاضري، د کورنۍ دندې حالت، د استاد یادښتونه، د تادیې حالت او د پرمختګ راپور ګوري.'
        },
        {
          role: 'مدیریت',
          text:
            'صنفونه جوړوي، استادان او زده کوونکي ټاکي، مهالویشونه، د غونډې لینکونه، حاضري، پرمختګ او اعلانونه مدیریت کوي.'
        }
      ],
      teacherRestrictions: [
        'استادان د والدینو د تادیې جزئیات نه ویني.',
        'استادان مستقیم فیس نه شي اخیستلی.',
        'استادان یوازې خپل ټاکل شوي صنفونه او زده کوونکي ویني.',
        'استادان د زده کوونکو د اړیکې لست نه شي صادرولی.'
      ]
    },
    management: {
      seoTitle: 'د مدیریت سیستم لومړی پړاو',
      seoDescription:
        'د روښنايي اکاډمي د زده کوونکو د مدیریت نمونه ډشبورډ له زده کوونکو، کورسونو، استادانو، مهالویشونو، حاضري، تادیاتو او رول لیدونو سره.',
      heroEyebrow: 'روښنايي اکاډمي',
      heroTitle: 'د مدیریت سیستم لومړی پړاو',
      heroDescription:
        'د مدیریت، والد او استاد کار بهیرونو لپاره پاکه نمونه بنسټ. اوس backend، د تادیې دروازه او پېچلې ځانګړنې نه لري.',
      stats: {
        students: 'زده کوونکي',
        mockRegistrations: 'نمونه نوملیکنې',
        active: 'فعال',
        canAttendPaidClasses: 'تادیه شوو صنفونو ته تللی شي',
        paymentRequired: 'تادیه اړینه ده',
        needsAdminFollowUp: 'د مدیریت تعقیب غواړي',
        courses: 'کورسونه',
        availablePrograms: 'شته پروګرامونه',
        classrooms: 'صنفونه',
        virtualClassGroups: 'مجازي صنفي ګروپونه'
      },
      admin: {
        eyebrow: 'د مدیریت ډشبورډ',
        title: 'د لومړي پړاو عملیاتو لنډیز',
        description:
          'مدیریت کولی شي د زده کوونکو نوملیکنې، د صنف حالت، مهالویشونه، حاضري او تادیات له یوې ساده پاڼې وګوري.',
        studentsSmall: 'زده کوونکي',
        studentListTitle: 'د زده کوونکو د نوملیکنې لست',
        studentListDescription:
          'یوازې نمونه ریکارډونه. حالتونه آزمایښتي، تادیه اړینه، فعال او غیرفعال دي.',
        coursesListTitle: 'د کورسونو لست',
        teachersListTitle: 'د استادانو لست',
        classScheduleTitle: 'د صنف مهالویش لست',
        classroomManagementTitle: 'د صنفونو مدیریت',
        classroomManagementDescription:
          'مدیریت کولی شي صنفي ګروپونه، د غونډې برابرونکي، نوملیکل شوي زده کوونکي، مهالویشونه او صنفي پاڼې وګوري.',
        attendanceTableTitle: 'د حاضري جدول',
        paymentTrackingTitle: 'د تادیې تعقیب جدول',
        paymentTrackingDescription: 'یوازې د تعقیب لپاره دی. د تادیې دروازه نه ده تړل شوې.',
        referralManagementTitle: 'د معرفي مدیریت',
        referralManagementDescription:
          'معرفۍ یوازې د بشپړې نوملیکنې، دوو حاضرو آزمایښتي صنفونو، لومړۍ فاکتور تادیې، د مدیریت د تادیې تایید او د کورنۍ تایید وروسته حسابېږي. د همدې کورنۍ معرفۍ تر اداري تایید پورې په بیاکتنه کې پاتې کېږي.'
      },
      labels: {
        student: 'زده کوونکی',
        parent: 'والد',
        age: 'عمر',
        country: 'هېواد',
        course: 'کورس',
        preferredTime: 'غوره وخت',
        trials: 'آزمایښتي',
        referralCode: 'د معرفي کوډ',
        status: 'حالت',
        teacher: 'استاد',
        day: 'ورځ',
        time: 'وخت',
        timezone: 'وخت زون',
        capacity: 'ظرفیت',
        classroom: 'صنف',
        schedule: 'مهالویش',
        provider: 'برابرونکی',
        students: 'زده کوونکي',
        page: 'پاڼه',
        date: 'نېټه',
        month: 'میاشت',
        amount: 'مقدار',
        confirmed: 'تایید',
        referrer: 'معرفي کوونکی',
        totalRegistrations: 'ټولې نوملیکنې',
        verifiedPaid: 'تایید شوې تادیه',
        rewardStatus: 'د جایزې حالت',
        adminReview: 'د مدیریت بیاکتنه',
        level: 'کچه',
        access: 'لاسرسی',
        payment: 'تادیه',
        attendance: 'حاضري',
        nextClass: 'راتلونکی صنف',
        referralCard: 'د معرفي کارت',
        assignedClassroom: 'ټاکل شوی صنف'
      },
      actions: {
        viewAllClassrooms: 'ټول صنفونه وګورئ',
        open: 'پرانیزئ',
        approveReward: 'جایزه تایید کړئ',
        reject: 'رد کړئ'
      },
      parent: {
        eyebrow: 'د والد ډشبورډ',
        title: 'د والد ساده لید',
        viewingAs: 'د {name} په توګه لیدل کېږي.',
        referralCodeTitle: 'د {name} د معرفي کوډ',
        notScheduled: 'مهالویش نه لري',
        openClassroomPrefix: 'پرانیزئ'
      },
      teacher: {
        eyebrow: 'د استاد ډشبورډ',
        title: 'د استاد ساده لید',
        viewingAs:
          'د {name} په توګه لیدل کېږي. د والدینو شمېرې او د تادیې جزئیات نه ښودل کېږي. صادرول {status} دي.',
        classes: 'صنفونه',
        students: 'زده کوونکي'
      }
    },
    register: {
      referralCode: 'د معرفي کوډ',
      referralPlaceholder: 'که چا بللي یاست، د معرفي کوډ ولیکئ',
      referralHelp:
        'د معرفي جایزه یوازې د آزمایښتي صنفونو، لومړۍ تادیې او د مدیریت له تایید وروسته حسابېږي.',
      generatedPrefix: 'د نوي زده کوونکي د معرفي کوډ:',
      generatedSuffix:
        'له نوملیکنې وروسته یې شریک کړئ، څو تایید شوې معرفۍ د یوې میاشتې وړیا فیس لپاره حساب شي.'
    },
    dashboard: {
      classroomAccess: 'صنف ته لاسرسی',
      myLiveClasses: 'زما ژوندي صنفونه',
      studentProfile: 'د زده کوونکي پروفایل',
      referralCode: 'د معرفي کوډ',
      referralDescription:
        'دا کوډ له بلې کورنۍ سره شریک کړئ. جایزه یوازې د هغوی له آزمایښتي صنفونو او د مدیریت له تایید شوې لومړۍ تادیې وروسته حسابېږي.',
      referralShareMessage:
        'زما د معرفي کوډ {code} سره روښنايي اکاډمي ته راشئ. نوي زده کوونکي له تادیې مخکې له دوو آزمایښتي صنفونو پیل کولی شي.',
      verifiedReferrals: 'تایید شوې معرفۍ'
    },
    statusLabels: {
      Trial: 'آزمایښتي',
      'Payment Required': 'تادیه اړینه ده',
      Active: 'فعال',
      Inactive: 'غیرفعال',
      paid: 'تادیه شوی',
      pending: 'په تمه',
      unpaid: 'نه دی تادیه شوی',
      overdue: 'ناوخته',
      tracking: 'تعقیبېږي',
      eligible: 'وړ',
      available: 'شته',
      approved: 'تایید شوی',
      rejected: 'رد شوی',
      needs_review: 'بیاکتنې ته اړتیا',
      Full: 'ډک',
      Paused: 'ځنډول شوی',
      'Trial Only': 'یوازې آزمایښتي',
      draft: 'مسوده',
      published: 'خپور شوی',
      closed: 'تړل شوی',
      submitted: 'سپارل شوی',
      late: 'ناوخته',
      reviewed: 'کتل شوی',
      present: 'حاضر',
      absent: 'غایب',
      excused: 'معذور',
      Unknown: 'نامعلوم',
      'Not Enrolled': 'نوملیکنه نه لري',
      Visible: 'ښکاره',
      Locked: 'قفل'
    },
    accessMessages: {
      'Select an enrolled student to preview live class access.':
        'د ژوندي صنف د لاسرسي کتلو لپاره یو نوملیکل شوی زده کوونکی وټاکئ.',
      'Classroom access could not be verified.': 'صنف ته لاسرسی تایید نه شو.',
      'This student is not enrolled in this classroom.':
        'دا زده کوونکی په دې صنف کې نوملیکنه نه لري.',
      'Your trial period has ended. Please complete payment to continue classes.':
        'ستاسو آزمایښتي موده پای ته رسېدلې ده. د صنفونو د دوام لپاره تادیه بشپړه کړئ.',
      'Class access is locked because this student is not currently active or in trial.':
        'صنف ته لاسرسی قفل دی ځکه دا زده کوونکی اوس فعال یا آزمایښتي نه دی.',
      'Live class access is available for this enrolled student.':
        'د دې نوملیکل شوي زده کوونکي لپاره ژوندي صنف ته لاسرسی شته.'
    },
    referralNotes: {
      'Three verified referrals. One same-family registration requires admin review before it can count.':
        'درې معرفۍ تایید شوې دي. د همدې کورنۍ یوه نوملیکنه د حسابېدو مخکې د مدیریت بیاکتنې ته اړتیا لري.',
      'Congratulations! You earned one month free tuition.':
        'مبارک! تاسو د یوې میاشتې وړیا فیس ترلاسه کړ.',
      'Referral is registered but not yet verified because trial/payment confirmation is incomplete.':
        'معرفي ثبت شوې خو لا تایید نه ده، ځکه د آزمایښتي صنف یا تادیې تایید بشپړ نه دی.',
      'Reward becomes available after 5 verified paid referrals.':
        'جایزه له ۵ تایید شوو او تادیه شوو معرفیو وروسته شته کېږي.'
    },
    resourceTypeLabels: {
      'PDF Lesson': 'PDF درس',
      'Audio File': 'غږیز فایل',
      'Video Link': 'ویدیو لینک',
      'Quran Practice': 'د قرآن تمرین',
      'Vocabulary Sheet': 'د لغتونو پاڼه',
      'Class Notes': 'د صنف یادښتونه'
    },
    videoFeatureLabels: {
      'audio/video': 'غږ/ویدیو',
      'screen sharing': 'د پردې شریکول',
      chat: 'چټ',
      recording: 'ثبت',
      whiteboard: 'سپینه تخته',
      'raise hand': 'لاس پورته کول'
    }
  }
}

const localizedValues: Record<LocaleCode, Record<string, string>> = {
  en: {},
  fa: {
    'Dari for Afghan Kids': 'دری برای کودکان افغان',
    'Pashto for Afghan Kids': 'پشتو برای کودکان افغان',
    'English for All Levels': 'انگلیسی برای همه سطح‌ها',
    'Farsi/Dari for English Speakers': 'فارسی/دری برای انگلیسی‌زبانان',
    'Quran Reading': 'خواندن قرآن',
    'Fluency Reading': 'روان‌خوانی',
    Tajweed: 'تجوید',
    'Islamic Basics': 'مبانی اسلامی',
    'Afghan Culture & Heritage': 'فرهنگ و میراث افغانستان',
    'Dari Foundations for Afghan Kids': 'بنیادهای دری برای کودکان افغان',
    'Pashto Conversation for Kids': 'مکالمه پشتو برای کودکان',
    'English Confidence Lab': 'لابراتوار اعتماد به نفس انگلیسی',
    'Dari for English-Speaking Families': 'دری برای خانواده‌های انگلیسی‌زبان',
    'Quran Reading for Beginners': 'خواندن قرآن برای مبتدیان',
    'Dari Reading Fluency Circle': 'حلقه روان‌خوانی دری',
    'Tajweed Essentials': 'اساس‌های تجوید',
    'Islamic Basics for Children': 'مبانی اسلامی برای کودکان',
    'Afghan Culture & Heritage Projects': 'پروژه‌های فرهنگ و میراث افغانستان',
    'Beginner to Intermediate': 'از مبتدی تا متوسط',
    Beginner: 'مبتدی',
    Intermediate: 'متوسط',
    'All Levels': 'همه سطح‌ها',
    'Ages 6-13': 'سنین ۶ تا ۱۳',
    'Ages 5-12': 'سنین ۵ تا ۱۲',
    'Ages 7-16': 'سنین ۷ تا ۱۶',
    'Ages 8-16': 'سنین ۸ تا ۱۶',
    'Ages 5-14': 'سنین ۵ تا ۱۴',
    'Ages 8-14': 'سنین ۸ تا ۱۴',
    'Ages 6-12': 'سنین ۶ تا ۱۲',
    'Ages 7-15': 'سنین ۷ تا ۱۵',
    'Live Dari reading, speaking, and writing for Afghan children abroad.':
      'خواندن، گفتار و نوشتار زنده دری برای کودکان افغان خارج از کشور.',
    'Gentle Pashto speaking, listening, alphabet, and family vocabulary practice.':
      'تمرین آرام گفتار، شنیدار، الفبا و واژگان خانوادگی پشتو.',
    'Practical English speaking, reading, and writing support for global learners.':
      'پشتیبانی عملی در گفتار، خواندن و نوشتار انگلیسی برای شاگردان سراسر جهان.',
    'A bridge course for children who mainly speak English at home.':
      'یک دوره پل‌ساز برای کودکانی که در خانه بیشتر انگلیسی صحبت می‌کنند.',
    'Arabic letters, vowels, joining rules, and guided Quran reading practice.':
      'حروف عربی، حرکات، قواعد وصل و تمرین راهنمایی‌شده خواندن قرآن.',
    'Short readings, pronunciation, pacing, and confidence for heritage readers.':
      'خواندن‌های کوتاه، تلفظ، آهنگ خواندن و اعتماد به نفس برای میراث‌خوانان.',
    'Makharij, madd, stopping signs, and practical correction while reciting.':
      'مخارج، مد، علامت‌های وقف و اصلاح عملی هنگام تلاوت.',
    'Age-appropriate Islamic manners, duas, stories, and daily practice.':
      'آداب اسلامی، دعاها، قصه‌ها و تمرین روزانه متناسب با سن.',
    'Geography, poetry, family stories, celebrations, values, and heritage presentations.':
      'جغرافیه، شعر، قصه‌های خانوادگی، جشن‌ها، ارزش‌ها و ارائه‌های میراثی.',
    'United States': 'ایالات متحده',
    Canada: 'کانادا',
    Australia: 'آسترالیا',
    Germany: 'آلمان',
    'Letters and vowels': 'حروف و حرکات',
    'Reads short surahs': 'سوره‌های کوتاه را می‌خواند',
    'New beginner': 'مبتدی تازه',
    'Weekdays after 5 PM PST': 'روزهای هفته بعد از ۵ عصر PST',
    'Thursday evenings': 'عصرهای پنجشنبه',
    'Weekend mornings AEST': 'صبح‌های آخر هفته AEST',
    'Weekdays after school': 'روزهای هفته بعد از مکتب',
    'Saturday morning': 'صبح شنبه',
    'Understands Dari but answers in English.':
      'دری را می‌فهمد اما به انگلیسی پاسخ می‌دهد.',
    'Completed both trial classes. Payment is now required.':
      'هر دو صنف آزمایشی را تکمیل کرده است. اکنون پرداخت لازم است.',
    'Trial student. One attended trial class remains.':
      'شاگرد آزمایشی است. یک صنف آزمایشی حاضرشده باقی مانده است.',
    'Trial class scheduled this week.': 'صنف آزمایشی این هفته برنامه‌ریزی شده است.',
    'Paused by parent for summer travel.':
      'به دلیل سفر تابستانی از سوی والد موقتاً متوقف شده است.',
    'Tuesday and Thursday': 'سه‌شنبه و پنجشنبه',
    'Thursday and Sunday': 'پنجشنبه و یکشنبه',
    Saturday: 'شنبه',
    'Monday and Wednesday': 'دوشنبه و چهارشنبه',
    'Dari Foundations Group A': 'گروه الف بنیادهای دری',
    'Quran Reading Beginners': 'خواندن قرآن برای مبتدیان',
    'Tajweed Essentials Circle': 'حلقه اساس‌های تجوید',
    'Pashto Conversation Group': 'گروه مکالمه پشتو',
    'A small live classroom for Afghan children building Dari reading and speaking confidence.':
      'یک صنف زنده کوچک برای کودکان افغان که اعتماد به نفس در خواندن و گفتار دری می‌سازند.',
    'Guided Quran reading practice with trial access until payment is required.':
      'تمرین راهنمایی‌شده خواندن قرآن با دسترسی آزمایشی تا زمانی که پرداخت لازم شود.',
    'A focused tajweed group for pronunciation, makharij, and recitation correction.':
      'یک گروه متمرکز تجوید برای تلفظ، مخارج و اصلاح تلاوت.',
    'A parent-friendly Pashto class for alphabet, greetings, and family conversation.':
      'یک صنف پشتو مناسب والدین برای الفبا، سلام‌واحوالپرسی و مکالمه خانوادگی.',
    'A paused English support group that keeps its classroom record ready for reactivation.':
      'یک گروه پشتیبانی انگلیسی متوقف‌شده که رکورد صنف آن برای فعال‌سازی دوباره آماده می‌ماند.',
    'Read five Dari family words aloud': 'پنج واژه خانوادگی دری را با صدای بلند بخوانید',
    'Practice the vocabulary sheet with a parent and write one sentence for each word.':
      'ورق واژگان را با والد تمرین کنید و برای هر واژه یک جمله بنویسید.',
    'Short vowels practice recording': 'ضبط تمرین حرکات کوتاه',
    'Record yourself reading the short vowel practice line and submit it before class.':
      'خواندن خط تمرین حرکات کوتاه را ضبط کنید و پیش از صنف بفرستید.',
    'Makharij review': 'مرور مخارج',
    'Review the makharij notes and mark three letters you want to practice in class.':
      'یادداشت‌های مخارج را مرور کنید و سه حرفی را که می‌خواهید در صنف تمرین کنید نشانی کنید.',
    'Pashto greetings at home': 'سلام‌واحوالپرسی پشتو در خانه',
    'Use three Pashto greetings with family members and write who you spoke with.':
      'سه سلام‌واحوالپرسی پشتو را با اعضای خانواده استفاده کنید و بنویسید با چه کسی صحبت کردید.',
    'I read the family words with my mother and wrote five sentences.':
      'واژه‌های خانوادگی را با مادرم خواندم و پنج جمله نوشتم.',
    'Strong work. Keep practicing pronunciation for longer vowels.':
      'کار عالی. تلفظ واکه‌های بلند را همچنان تمرین کنید.',
    'I want to practice qaf, ayn, and ha.':
      'می‌خواهم قاف، عین و ها را تمرین کنم.',
    'I used staray mashay with my father.':
      'با پدرم «ستړی مه شې» را استفاده کردم.',
    'Family vocabulary sheet': 'ورق واژگان خانواده',
    'A printable Dari vocabulary page for parent-child practice.':
      'یک صفحه چاپی واژگان دری برای تمرین والد و کودک.',
    'Noorani Qaida vowel practice': 'تمرین حرکات نورانی قاعده',
    'Short vowel reading lines for daily five-minute practice.':
      'خط‌های خواندن حرکات کوتاه برای تمرین پنج دقیقه‌ای روزانه.',
    'Makharij audio example': 'نمونه صوتی مخارج',
    'Teacher-recorded pronunciation practice for difficult letters.':
      'تمرین تلفظ ضبط‌شده توسط استاد برای حروف دشوار.',
    'Pashto greetings class notes': 'یادداشت‌های صنف سلام‌واحوالپرسی پشتو',
    'Simple greetings, responses, and family practice prompts.':
      'سلام‌ها، پاسخ‌ها و تمرین‌های ساده خانوادگی.',
    'Amina is speaking more confidently and should keep reading aloud at home.':
      'آمینه با اعتماد بیشتر صحبت می‌کند و باید خواندن بلند در خانه را ادامه دهد.',
    'Trial classes are complete. Access should continue after first payment confirmation.':
      'صنف‌های آزمایشی تکمیل شده‌اند. دسترسی پس از تایید نخستین پرداخت ادامه می‌یابد.',
    'Laila has careful recitation and needs more practice with makharij.':
      'لیلا تلاوت دقیق دارد و به تمرین بیشتر مخارج نیاز دارد.',
    'Omar participates well when prompts are short and repeated.':
      'عمر وقتی رهنمودها کوتاه و تکراری باشند خوب سهم می‌گیرد.',
    'Student is currently inactive while the family pauses classes.':
      'شاگرد فعلاً غیرفعال است، چون خانواده صنف‌ها را موقتاً متوقف کرده است.',
    Teacher: 'استاد',
    Admin: 'مدیریت',
    'Homework reminder': 'یادآوری کارخانگی',
    'Trial classes complete': 'صنف‌های آزمایشی تکمیل شد',
    'Schedule stays the same': 'برنامه همان می‌ماند',
    'Practice greetings': 'سلام‌واحوالپرسی را تمرین کنید',
    'homework reminder': 'یادآوری کارخانگی',
    'parent meeting': 'جلسه والدین',
    'schedule change': 'تغییر برنامه',
    'class cancellation': 'لغو صنف',
    'Please upload the family vocabulary practice before Thursday class.':
      'لطفاً تمرین واژگان خانواده را پیش از صنف پنجشنبه آپلود کنید.',
    'The academy team will contact the parent to confirm enrollment and first payment.':
      'تیم آکادمی برای تایید ثبت‌نام و نخستین پرداخت با والد تماس می‌گیرد.',
    'Saturday class remains at 7:00 PM GMT this week.':
      'صنف شنبه این هفته ساعت ۷:۰۰ عصر GMT باقی می‌ماند.',
    'Students should practice three Pashto greetings with family before the next class.':
      'شاگردان باید پیش از صنف بعدی سه سلام‌واحوالپرسی پشتو را با خانواده تمرین کنند.',
    'June 2026': 'جون ۲۰۲۶',
    'May 2026': 'می ۲۰۲۶',
    'July 2026': 'جولای ۲۰۲۶',
    Unassigned: 'تعیین نشده',
    'Unknown parent': 'والد نامعلوم',
    'Unknown student': 'شاگرد نامعلوم',
    'Unknown course': 'دوره نامعلوم',
    'Schedule pending': 'برنامه در انتظار است'
  },
  ps: {
    'Dari for Afghan Kids': 'د افغان ماشومانو لپاره دري',
    'Pashto for Afghan Kids': 'د افغان ماشومانو لپاره پښتو',
    'English for All Levels': 'د ټولو کچو لپاره انګلیسي',
    'Farsi/Dari for English Speakers': 'د انګلیسي ویونکو لپاره فارسي/دري',
    'Quran Reading': 'د قرآن لوستل',
    'Fluency Reading': 'روان لوستل',
    Tajweed: 'تجوید',
    'Islamic Basics': 'اسلامي بنسټونه',
    'Afghan Culture & Heritage': 'افغان کلتور او میراث',
    'Dari Foundations for Afghan Kids': 'د افغان ماشومانو لپاره دري بنسټونه',
    'Pashto Conversation for Kids': 'د ماشومانو لپاره پښتو خبرې',
    'English Confidence Lab': 'د انګلیسي باور لابراتوار',
    'Dari for English-Speaking Families': 'د انګلیسي ویونکو کورنیو لپاره دري',
    'Quran Reading for Beginners': 'د پیل کوونکو لپاره د قرآن لوستل',
    'Dari Reading Fluency Circle': 'د دري روان لوستلو کړۍ',
    'Tajweed Essentials': 'د تجوید بنسټونه',
    'Islamic Basics for Children': 'د ماشومانو لپاره اسلامي بنسټونه',
    'Afghan Culture & Heritage Projects': 'د افغان کلتور او میراث پروژې',
    'Beginner to Intermediate': 'له پیل څخه تر منځنۍ کچې',
    Beginner: 'پیل کوونکی',
    Intermediate: 'منځنۍ کچه',
    'All Levels': 'ټولې کچې',
    'Ages 6-13': 'عمرونه ۶ تر ۱۳',
    'Ages 5-12': 'عمرونه ۵ تر ۱۲',
    'Ages 7-16': 'عمرونه ۷ تر ۱۶',
    'Ages 8-16': 'عمرونه ۸ تر ۱۶',
    'Ages 5-14': 'عمرونه ۵ تر ۱۴',
    'Ages 8-14': 'عمرونه ۸ تر ۱۴',
    'Ages 6-12': 'عمرونه ۶ تر ۱۲',
    'Ages 7-15': 'عمرونه ۷ تر ۱۵',
    'Live Dari reading, speaking, and writing for Afghan children abroad.':
      'د بهر مېشتو افغان ماشومانو لپاره د دري ژوندي لوستل، خبرې او لیکل.',
    'Gentle Pashto speaking, listening, alphabet, and family vocabulary practice.':
      'د پښتو خبرو، اورېدلو، الفبا او کورنۍ لغتونو نرم تمرین.',
    'Practical English speaking, reading, and writing support for global learners.':
      'د نړیوالو زده کوونکو لپاره د انګلیسي خبرو، لوستلو او لیکلو عملي ملاتړ.',
    'A bridge course for children who mainly speak English at home.':
      'د هغو ماشومانو لپاره نښلوونکی کورس چې په کور کې زیاتره انګلیسي وايي.',
    'Arabic letters, vowels, joining rules, and guided Quran reading practice.':
      'عربي توري، حرکات، د نښلولو قواعد او د قرآن لارښود شوی لوستل.',
    'Short readings, pronunciation, pacing, and confidence for heritage readers.':
      'لنډ لوستل، تلفظ، د لوستلو رواني او د میراثي لوستونکو باور.',
    'Makharij, madd, stopping signs, and practical correction while reciting.':
      'مخارج، مد، د وقف نښې او د تلاوت پر مهال عملي اصلاح.',
    'Age-appropriate Islamic manners, duas, stories, and daily practice.':
      'د عمر سره مناسب اسلامي آداب، دعاوې، کیسې او ورځنی تمرین.',
    'Geography, poetry, family stories, celebrations, values, and heritage presentations.':
      'جغرافیه، شعر، کورنۍ کیسې، جشنونه، ارزښتونه او د میراث وړاندې کول.',
    'United States': 'متحده ایالات',
    Canada: 'کاناډا',
    Australia: 'آسترالیا',
    Germany: 'جرمني',
    'Letters and vowels': 'توري او حرکات',
    'Reads short surahs': 'لنډ سورتونه لولي',
    'New beginner': 'نوی پیل کوونکی',
    'Weekdays after 5 PM PST': 'د اونۍ په ورځو کې له ۵ بجو وروسته PST',
    'Thursday evenings': 'د پنجشنبې ماښامونه',
    'Weekend mornings AEST': 'د اونۍ پای سهارونه AEST',
    'Weekdays after school': 'د مکتب وروسته د اونۍ ورځې',
    'Saturday morning': 'د شنبې سهار',
    'Understands Dari but answers in English.':
      'دري پوهېږي خو په انګلیسي ځواب ورکوي.',
    'Completed both trial classes. Payment is now required.':
      'دواړه آزمایښتي صنفونه بشپړ شوي. اوس تادیه اړینه ده.',
    'Trial student. One attended trial class remains.':
      'آزمایښتي زده کوونکی دی. یوه حاضره شوې آزمایښتي صنف پاتې دی.',
    'Trial class scheduled this week.': 'آزمایښتي صنف د دې اونۍ لپاره ټاکل شوی.',
    'Paused by parent for summer travel.':
      'د اوړي سفر لپاره د والد له خوا موقتاً درول شوی.',
    'Tuesday and Thursday': 'سه‌شنبه او پنجشنبه',
    'Thursday and Sunday': 'پنجشنبه او یکشنبه',
    Saturday: 'شنبه',
    'Monday and Wednesday': 'دوشنبه او چهارشنبه',
    'Dari Foundations Group A': 'د دري بنسټونو الف ګروپ',
    'Quran Reading Beginners': 'د قرآن لوستلو پیل کوونکي',
    'Tajweed Essentials Circle': 'د تجوید بنسټونو کړۍ',
    'Pashto Conversation Group': 'د پښتو خبرو ګروپ',
    'A small live classroom for Afghan children building Dari reading and speaking confidence.':
      'د افغان ماشومانو لپاره کوچنی ژوندی صنف چې د دري لوستلو او خبرو باور جوړوي.',
    'Guided Quran reading practice with trial access until payment is required.':
      'د قرآن لارښود شوی تمرین له آزمایښتي لاسرسي سره تر هغې چې تادیه اړینه شي.',
    'A focused tajweed group for pronunciation, makharij, and recitation correction.':
      'د تلفظ، مخارجو او د تلاوت اصلاح لپاره متمرکز تجوید ګروپ.',
    'A parent-friendly Pashto class for alphabet, greetings, and family conversation.':
      'د الفبا، سلامونو او کورنۍ خبرو لپاره د والدینو لپاره مناسب پښتو صنف.',
    'A paused English support group that keeps its classroom record ready for reactivation.':
      'درول شوی د انګلیسي ملاتړ ګروپ چې د بیا فعالېدو لپاره د صنف ریکارډ چمتو ساتي.',
    'Read five Dari family words aloud': 'پنځه دري کورني لغتونه په لوړ غږ ولولئ',
    'Practice the vocabulary sheet with a parent and write one sentence for each word.':
      'د لغتونو پاڼه له والد سره تمرین کړئ او د هر لغت لپاره یوه جمله ولیکئ.',
    'Short vowels practice recording': 'د لنډو حرکاتو د تمرین ثبت',
    'Record yourself reading the short vowel practice line and submit it before class.':
      'د لنډو حرکاتو د تمرین کرښه ولولئ، ځان ثبت کړئ او له صنف مخکې یې وسپارئ.',
    'Makharij review': 'د مخارجو بیاکتنه',
    'Review the makharij notes and mark three letters you want to practice in class.':
      'د مخارجو یادښتونه وګورئ او درې هغه توري نښه کړئ چې په صنف کې یې تمرین غواړئ.',
    'Pashto greetings at home': 'په کور کې پښتو سلامونه',
    'Use three Pashto greetings with family members and write who you spoke with.':
      'درې پښتو سلامونه له کورنۍ سره وکاروئ او ولیکئ له چا سره مو خبرې وکړې.',
    'I read the family words with my mother and wrote five sentences.':
      'ما کورني لغتونه له مور سره ولوستل او پنځه جملې مې ولیکلې.',
    'Strong work. Keep practicing pronunciation for longer vowels.':
      'ښه کار. د اوږدو غږونو تلفظ لا تمرین کړئ.',
    'I want to practice qaf, ayn, and ha.':
      'زه غواړم قاف، عین او ها تمرین کړم.',
    'I used staray mashay with my father.':
      'ما له پلار سره «ستړی مه شې» وکاراوه.',
    'Family vocabulary sheet': 'د کورنۍ لغتونو پاڼه',
    'A printable Dari vocabulary page for parent-child practice.':
      'د والد او ماشوم د تمرین لپاره د چاپ وړ دري لغت پاڼه.',
    'Noorani Qaida vowel practice': 'د نوراني قاعدې د حرکاتو تمرین',
    'Short vowel reading lines for daily five-minute practice.':
      'د ورځني پنځه دقیقې تمرین لپاره د لنډو حرکاتو د لوستلو کرښې.',
    'Makharij audio example': 'د مخارجو غږیز مثال',
    'Teacher-recorded pronunciation practice for difficult letters.':
      'د سختو تورو لپاره د استاد له خوا ثبت شوی د تلفظ تمرین.',
    'Pashto greetings class notes': 'د پښتو سلامونو د صنف یادښتونه',
    'Simple greetings, responses, and family practice prompts.':
      'ساده سلامونه، ځوابونه او د کورنۍ تمرین پوښتنې.',
    'Amina is speaking more confidently and should keep reading aloud at home.':
      'آمینه په ډېر باور خبرې کوي او باید په کور کې لوړ لوستل دوام ورکړي.',
    'Trial classes are complete. Access should continue after first payment confirmation.':
      'آزمایښتي صنفونه بشپړ شوي. لاسرسی باید د لومړۍ تادیې له تایید وروسته دوام وکړي.',
    'Laila has careful recitation and needs more practice with makharij.':
      'لیلا دقیق تلاوت لري او د مخارجو ډېر تمرین ته اړتیا لري.',
    'Omar participates well when prompts are short and repeated.':
      'عمر هغه وخت ښه ګډون کوي چې لارښوونې لنډې او تکراري وي.',
    'Student is currently inactive while the family pauses classes.':
      'زده کوونکی اوس غیرفعال دی ځکه کورنۍ صنفونه موقتاً درولي دي.',
    Teacher: 'استاد',
    Admin: 'مدیریت',
    'Homework reminder': 'د کورني کار یادونه',
    'Trial classes complete': 'آزمایښتي صنفونه بشپړ شول',
    'Schedule stays the same': 'مهال‌وېش هماغسې پاتې دی',
    'Practice greetings': 'سلامونه تمرین کړئ',
    'homework reminder': 'د کورني کار یادونه',
    'parent meeting': 'د والدینو ناسته',
    'schedule change': 'د مهال‌وېش بدلون',
    'class cancellation': 'د صنف لغوه کېدل',
    'Please upload the family vocabulary practice before Thursday class.':
      'مهرباني وکړئ د پنجشنبې له صنف مخکې د کورنۍ لغتونو تمرین پورته کړئ.',
    'The academy team will contact the parent to confirm enrollment and first payment.':
      'د اکاډمۍ ټیم به د نوملیکنې او لومړۍ تادیې د تایید لپاره له والد سره اړیکه ونیسي.',
    'Saturday class remains at 7:00 PM GMT this week.':
      'د دې اونۍ د شنبې صنف د GMT په ۷:۰۰ ماښام پاتې کېږي.',
    'Students should practice three Pashto greetings with family before the next class.':
      'زده کوونکي باید له راتلونکي صنف مخکې درې پښتو سلامونه له کورنۍ سره تمرین کړي.',
    'June 2026': 'جون ۲۰۲۶',
    'May 2026': 'می ۲۰۲۶',
    'July 2026': 'جولای ۲۰۲۶',
    Unassigned: 'نه دی ټاکل شوی',
    'Unknown parent': 'نامعلوم والد',
    'Unknown student': 'نامعلوم زده کوونکی',
    'Unknown course': 'نامعلوم کورس',
    'Schedule pending': 'مهال‌وېش په تمه دی'
  }
}

export const getUiCopy = (locale: LocaleCode = defaultLocale) =>
  uiCopy[locale] ?? uiCopy[defaultLocale]

export const getLocalizedValue = (locale: LocaleCode, value: string) =>
  localizedValues[locale]?.[value] ?? localizedValues[defaultLocale]?.[value] ?? value

export const getLocalizedScheduleLabel = (
  locale: LocaleCode,
  day: string,
  time?: string,
  timezone?: string
) => {
  const dayLabel = getLocalizedValue(locale, day)
  const timeLabel = [time, timezone].filter(Boolean).join(' ')

  return [dayLabel, timeLabel].filter(Boolean).join(locale === 'en' ? ', ' : '، ')
}

export const getStatusLabel = (locale: LocaleCode, status: string) =>
  getUiCopy(locale).statusLabels[status] ?? status

export const getAccessMessageLabel = (locale: LocaleCode, message: string) =>
  getUiCopy(locale).accessMessages[message] ?? message

export const getReferralNoteLabel = (locale: LocaleCode, note: string) =>
  getUiCopy(locale).referralNotes[note] ?? note

export const getResourceTypeLabel = (locale: LocaleCode, type: string) =>
  getUiCopy(locale).resourceTypeLabels[type] ?? type

export const getVideoFeatureLabel = (locale: LocaleCode, feature: string) =>
  getUiCopy(locale).videoFeatureLabels[feature] ?? feature
