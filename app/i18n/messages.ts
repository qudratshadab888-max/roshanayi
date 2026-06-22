export const defaultLocale = 'en'

export const localeOptions = [
  { code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en', dir: 'ltr' },
  { code: 'fa', label: 'دری', shortLabel: 'DR', htmlLang: 'fa-AF', dir: 'rtl' },
  { code: 'ps', label: 'پښتو', shortLabel: 'PS', htmlLang: 'ps-AF', dir: 'rtl' }
] as const

export type LocaleCode = (typeof localeOptions)[number]['code']

export const isLocaleCode = (value: string): value is LocaleCode =>
  localeOptions.some((locale) => locale.code === value)

export const messages = {
  en: {
    common: {
      brand: {
        name: 'Roshanayi Academy',
        shortName: 'Roshanayi',
        academy: 'Academy',
        initials: 'RA',
        tagline: 'Learn with light'
      },
      nav: {
        home: 'Home',
        about: 'About',
        courses: 'Courses',
        classrooms: 'Classrooms',
        teachers: 'Teachers',
        pricing: 'Pricing',
        contact: 'Contact',
        management: 'Management'
      },
      actions: {
        login: 'Login',
        register: 'Register',
        registerChild: 'Register your child',
        bookPlacement: 'Book placement support',
        talkToUs: 'Talk to us',
        viewAllCourses: 'View all courses',
        viewCourse: 'View course',
        findCourse: 'Find a course',
        browseCourses: 'Browse more courses',
        getPlacementHelp: 'Get placement help',
        createAccount: 'Create an account',
        startRegistration: 'Start registration',
        returnHome: 'Return home'
      },
      labels: {
        language: 'Language',
        switchLanguage: 'Switch language',
        level: 'Level',
        age: 'Age',
        ageGroup: 'Age group',
        duration: 'Duration',
        lessons: 'Lessons',
        format: 'Format',
        tuition: 'Tuition',
        keyBenefits: 'Key benefits',
        from: 'From',
        specialization: 'Specialization',
        credentials: 'Credentials',
        teachingApproach: 'Teaching approach',
        photo: 'Photo',
        teacher: 'Teacher',
        next: 'Next',
        email: 'Email',
        support: 'Support',
        password: 'Password',
        fullName: 'Full name',
        parentName: 'Parent name',
        studentName: 'Student name',
        studentAge: 'Student age',
        country: 'Country',
        whatsappNumber: 'WhatsApp number',
        courseInterest: 'Course interest',
        preferredTimeZone: 'Preferred time zone',
        preferredClassTime: 'Preferred class time',
        message: 'Message',
        learningGoals: 'Learning goals',
        rememberMe: 'Remember me',
        category: 'Program',
        instruction: 'Language of instruction',
        perMonth: 'USD per month',
        progress: 'progress'
      },
      categories: {
        all: 'All',
        dari: 'Dari Language',
        pashto: 'Pashto Language',
        english: 'English Language',
        islamic: 'Islamic Studies',
        quran: 'Quran Reading',
        tajweed: 'Tajweed',
        heritage: 'Afghan Culture & Heritage',
        premium: 'Premium Language Programs',
        notSure: 'Not sure yet'
      },
      theme: {
        light: 'Use light mode',
        dark: 'Use dark mode',
        switchToLight: 'Switch to light mode',
        switchToDark: 'Switch to dark mode'
      },
      menu: {
        mainNavigation: 'Main navigation',
        toggle: 'Toggle mobile menu'
      }
    },
    seo: {
      home: {
        title: 'Home',
        ogTitle: 'Roshanayi Academy | Online learning for Afghan children abroad',
        description:
          'Learn Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage through live online classes for Afghan families abroad.',
        ogDescription:
          'Premium online classes for Afghan children abroad in Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage.'
      },
      about: {
        title: 'About',
        description:
          'Learn about the mission, vision, and story behind Roshanayi Academy, a global online academy for Afghan children abroad.'
      },
      courses: {
        title: 'Courses',
        description:
          'Browse Roshanayi Academy courses in Dari, Pashto, English, Islamic Studies, Quran, Afghan Culture & Heritage, and premium Afghan language programs for English speakers.'
      },
      teachers: {
        title: 'Teachers',
        description:
          'Meet Roshanayi Academy teachers for Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage courses.'
      },
      pricing: {
        title: 'Pricing',
        description:
          'Explore Roshanayi Academy pricing plans for live online courses, sibling support, and family learning packages.'
      },
      contact: {
        title: 'Contact',
        description:
          'Contact Roshanayi Academy for placement help, course questions, and family learning support.'
      },
      register: {
        title: 'Register',
        description:
          'Register your child for Roshanayi Academy online classes in Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage.'
      },
      login: {
        title: 'Login',
        description: 'Login to your Roshanayi Academy student or parent account.'
      },
      dashboard: {
        title: 'Student Dashboard',
        description:
          'Roshanayi Academy student dashboard with progress tracking, upcoming classes, recent lessons, certificates, and assignments.'
      }
    },
    layout: {
      footer: {
        description:
          'Premium online classes for Afghan children abroad, built around Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage.',
        quickLinks: 'Quick Links',
        courses: 'Courses',
        contact: 'Contact',
        contactItems: [
          'hello@roshanayi.academy',
          'WhatsApp placement support',
          'Global online cohorts',
          'North America, Europe, UK, Australia'
        ],
        copyright: 'Copyright {year} Roshanayi Academy. All rights reserved.',
        privacy: 'Privacy',
        terms: 'Terms',
        social: {
          facebook: 'Roshanayi Academy on Facebook',
          instagram: 'Roshanayi Academy on Instagram',
          youtube: 'Roshanayi Academy on YouTube'
        }
      }
    },
    newsletter: {
      label: 'Email address',
      placeholder: 'Enter your email',
      idle: 'Subscribe',
      loading: 'Subscribing',
      success: 'Thank you for subscribing.'
    },
    loading: {
      academyContent: 'Loading academy content',
      courses: 'Loading courses',
      dashboard: 'Loading student dashboard'
    },
    home: {
      faq: {
        eyebrow: 'FAQ',
        title: 'Common questions from Afghan parents abroad.',
        description:
          'A quick guide to placement, live learning, time zones, sibling support, and how families can practice at home.'
      },
      newsletter: {
        eyebrow: 'Newsletter',
        title: 'Get parent resources for language, Quran, and heritage learning.'
      }
    },
    hero: {
      eyebrow: 'Trusted online learning for Afghan families abroad',
      title: 'Help your child stay connected to Afghan language, Quran, and heritage.',
      description:
        'Roshanayi Academy gives Afghan children in Europe, America, Canada, Australia, and beyond a structured path to learn Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage with caring teachers and parent-visible progress.',
      note:
        'Placement guidance available for beginners, siblings, and children with mixed language levels.',
      stats: [
        { value: '5', label: 'Heritage learning tracks' },
        { value: '3,500+', label: 'Lesson hours delivered' },
        { value: '24+', label: 'Time-zone friendly cohorts' }
      ]
    },
    academyIntro: {
      eyebrow: 'Why Roshanayi Exists',
      title: 'A serious academy for families who want heritage learning to be consistent.',
      description:
        'Many Afghan children abroad understand parts of the language, faith, and culture at home, but need patient teachers and a real curriculum to grow. Roshanayi Academy brings those pieces together in one premium online experience.',
      cards: [
        {
          value: 'Live',
          title: 'Small-group classes',
          text:
            'Students speak, read, recite, and ask questions in real time with teachers who understand Afghan diaspora families.'
        },
        {
          value: 'Clear',
          title: 'Measurable progress',
          text:
            'Every course includes outcomes, practice tasks, parent notes, and dashboard milestones.'
        },
        {
          value: 'Global',
          title: 'Built around international schedules',
          text:
            'Cohorts are planned for North America, Europe, the United Kingdom, Australia, and other regions where Afghan families are raising children abroad.'
        }
      ]
    },
    featuredCourses: {
      eyebrow: 'Featured Courses',
      title: 'Start with the learning track your child needs most.',
      description:
        'Every course offers Group Class and Special Class enrollment, clear monthly pricing, a 2-day trial, and visible outcomes for parents.'
    },
    benefits: {
      eyebrow: 'Why Families Choose Us',
      title: 'Premium learning with the warmth of Afghan family life.',
      description:
        'Roshanayi Academy helps children grow in skill and belonging, while giving parents the clarity they need to keep learning alive at home.',
      items: [
        {
          title: 'Heritage with academic structure',
          text:
            'Children learn language, Quran, Tajweed, and culture through planned lessons, not random tutoring.'
        },
        {
          title: 'Progress parents can follow',
          text:
            'Dashboards, class notes, assignments, and teacher feedback help families support learning between classes.'
        },
        {
          title: 'Teachers who understand diaspora children',
          text:
            'Our teachers know children may understand a language but feel shy speaking, reading, or reciting it.'
        },
        {
          title: 'Designed for international families',
          text:
            'Time-zone aware cohorts, sibling placement support, and mobile-friendly access make learning realistic.'
        }
      ]
    },
    academyStats: {
      eyebrow: 'Academy Statistics',
      title: 'Built for global Afghan families, not one local classroom.',
      items: [
        {
          value: '5',
          label: 'Core subjects',
          text: 'Dari, Pashto, English, Islamic Studies, and Afghan Culture & Heritage.'
        },
        {
          value: '18+',
          label: 'Countries reached',
          text: 'Families from North America, Europe, Australia, and beyond.'
        },
        {
          value: '92%',
          label: 'Parent visibility',
          text: 'Families receive regular notes, practice tasks, and progress updates.'
        },
        {
          value: '4',
          label: 'Placement paths',
          text: 'Beginner, continuing, sibling, and mixed-level family placement.'
        }
      ]
    },
    studentSuccess: {
      eyebrow: 'Student Success',
      title: 'A clear weekly rhythm for children and parents.',
      description:
        'Roshanayi Academy is built around small wins: a child reads one more line, speaks one more sentence, recites with more care, and feels one step closer to their roots.',
      dashboardButton: 'Explore the family dashboard',
      sampleLearner: 'Learner journey',
      learnerName: 'Amina, age 9',
      learnerDescription: 'Family based in Manchester, learning Dari and Quran Reading.',
      progressLabel: 'Term progress',
      ok: 'OK',
      teacherNote: 'Teacher note',
      note:
        'Amina is more willing to read aloud. Please continue five minutes of Dari reading after dinner and upload Quran practice before Thursday class.',
      milestones: [
        'Reads short Dari sentences without switching to English',
        'Completes Quran practice three times per week',
        'Presents a family heritage project with confidence'
      ]
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Afghan parents want progress they can feel at home.',
      description:
        'Families choose Roshanayi Academy because the teaching is organized, culturally respectful, and practical for children growing up abroad.'
    },
    cta: {
      eyebrow: 'Ready to begin?',
      title: 'Start with placement guidance, then join the right live cohort.',
      description:
        'Share your child\'s age, country, language level, and goals. Our team will recommend the best course, teacher, and time-zone friendly schedule.'
    },
    about: {
      eyebrow: 'About Roshanayi Academy',
      title: 'A modern academy created for Afghan children growing up abroad.',
      description:
        'We support Afghan families living in Europe, America, Canada, Australia, and other countries with structured online learning that keeps language, Quran, and heritage part of everyday family life.',
      values: [
        {
          title: 'Mission',
          text:
            'Teach Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage to Afghan children abroad through live classes, structured curriculum, and caring teacher support.'
        },
        {
          title: 'Vision',
          text:
            'A global generation of Afghan children who can speak with family, read and recite with confidence, and carry their Afghan heritage with pride wherever they live.'
        },
        {
          title: 'Why We Exist',
          text:
            'Roshanayi Academy exists because many Afghan families abroad want their children to stay connected, but need a consistent academy experience instead of occasional tutoring.'
        }
      ],
      teach: {
        eyebrow: 'How We Teach',
        title: 'Professional structure, family-centered care.',
        description:
          'Our approach combines measurable progress with the warmth children need when learning subjects connected to identity, faith, and family.'
      },
      principles: [
        'Respect for faith, family, language, and Afghan cultural roots.',
        'Age-appropriate classes with visible learning milestones and parent notes.',
        'Time-zone aware cohorts for families in Europe, North America, Australia, and beyond.',
        'Warm teachers who know how to encourage bilingual children without pressure.'
      ],
      promise: {
        eyebrow: 'Our Promise',
        quote:
          'Every child deserves a clear, encouraging path to the language, faith foundations, and cultural memory that connect them to family.',
        text:
          'Roshanayi means brightness. Our goal is to make heritage learning feel bright, organized, and possible for families wherever they live.'
      },
      heritage: {
        eyebrow: 'Heritage Preservation',
        title: 'We help families turn heritage into weekly practice.',
        description:
          'Preserving Afghan identity abroad is easier when children have a routine, a teacher, a cohort, and small moments of progress parents can support at home.',
        points: [
          {
            title: 'Language at home',
            text:
              'Children practice the words, sentences, greetings, and family conversations they need to speak with parents, grandparents, and relatives.'
          },
          {
            title: 'Faith foundations',
            text:
              'Quran Reading and Tajweed courses help students build careful habits with patient correction and respectful pacing.'
          },
          {
            title: 'Cultural memory',
            text:
              'Heritage lessons help children understand Afghan regions, poetry, values, family stories, celebrations, and identity.'
          }
        ]
      }
    },
    coursesPage: {
      eyebrow: 'Courses',
      title: 'Live online learning that keeps children close to language, faith, and heritage.',
      description:
        'Explore carefully structured courses in Dari, Pashto, English, Quran, Islamic Studies, and Afghan heritage. Choose a small group or personalized class, then begin with a two-day trial before committing.',
      registerNow: 'Start registration',
      viewCourses: 'Browse courses',
      enrollmentOptions: 'Enrollment options',
      catalogEyebrow: 'Course catalog',
      catalogTitle: 'Find the right learning path for your child.',
      catalogDescription:
        'Compare subjects, age groups, class formats, and tuition in one place. Our placement team can help when you are unsure where to begin.',
      courseCount: '{count} courses',
      premiumEyebrow: 'Personalized language program',
      premiumDescription:
        'Designed for English-speaking learners who need private or semi-private Dari and Pashto instruction with a flexible schedule.',
      parentTrustEyebrow: 'Built for families',
      parentTrustTitle: 'A thoughtful academy experience parents can follow.',
      parentTrustDescription:
        'Small classes, qualified teachers, clear progress updates, and a respectful online environment help children learn with confidence.',
      trialPolicy: 'Two-day trial policy',
      trialTitle: 'Every new student begins with a two-day trial.',
      trialText:
        'After the trial, the family can confirm the class format and complete payment to continue without losing the student record.',
      enrollment: {
        groupLabel: 'Small-group class',
        groupDetail: 'Up to 10 students with monthly enrollment',
        specialLabel: 'Private or semi-private class',
        specialDetail: 'One or two students with a personalized schedule',
        premiumLabel: 'Premium language program',
        premiumDetail: 'Personalized Dari or Pashto for English-speaking learners',
        trialLabel: 'Two-day trial',
        trialDetail: 'Experience the class before completing payment'
      },
      premiumHighlights: [
        'Native Dari and Pashto teachers',
        'Lessons shaped around the learner',
        'Flexible scheduling',
        'Focused teacher attention',
        'Monthly progress updates',
        'Cultural immersion',
        'Certificate of completion'
      ],
      trustItems: [
        {
          title: 'Progress updates parents can use',
          text: 'Monthly reports explain attendance, participation, practice, strengths, and the next learning priorities.'
        },
        {
          title: 'Small classes with room to participate',
          text: 'Group classes are limited to 10 students so every child has time to speak, ask, and receive feedback.'
        },
        {
          title: 'Teachers who understand heritage learners',
          text: 'Students learn with qualified teachers who understand multilingual Afghan families living abroad.'
        },
        {
          title: 'A respectful online classroom',
          text: 'Lessons are structured, supervised, age-aware, and designed for focused learning from home.'
        },
        {
          title: 'Language, faith, and identity together',
          text: 'The curriculum strengthens communication while preserving Afghan culture, manners, and Islamic foundations.'
        }
      ],
      searchLabel: 'Search courses',
      searchPlaceholder: 'Search by subject, age group, goal, or level',
      showing: 'Showing {shown} of {total} courses',
      placementHelp: 'Need placement help? Register for guidance',
      emptyTitle: 'No courses match your search',
      emptyDescription:
        'Try a different subject, age group, or learning goal. You can also register for placement support if you are unsure where your child should begin.'
    },
    courseDetails: {
      register: 'Register for this course',
      askPlacement: 'Ask about placement',
      eyebrow: 'Course Details',
      pathTitle: 'A clear path from the first lesson to lasting progress.',
      ageTitle: 'Designed for this age group',
      programFitTitle: 'Who this program serves',
      instruction: 'Language of instruction',
      targetStudents: 'Best suited for',
      trialPolicy: 'Two-day trial policy',
      overview: 'Course overview',
      objectives: 'Learning goals',
      studentLearning: 'What students will learn',
      teachingMethod: 'How lessons are taught',
      premiumDescription:
        'Personalized instruction for one student, or semi-private learning for two students who share similar goals and ability.',
      specialOnlyTitle: 'Personalized class',
      groupClassTitle: 'Small-group class',
      specialClassTitle: 'Private or semi-private class',
      monthlyTuition: 'Monthly tuition in USD',
      learningPath: 'Recommended learning sequence',
      progressReport: 'Monthly progress update for parents',
      completionCertificate: 'Certificate of completion',
      trialInformation: 'Trial class details',
      learnTitle: 'What your child will learn',
      parentGuidance: 'Parent guidance',
      teacherPendingTitle: 'Teacher assignment pending',
      teacherPendingDescription:
        'Our placement team will assign a qualified instructor after reviewing the student\'s level, time zone, and learning goals.',
      familyBenefits: 'Benefits for families',
      outcomes: 'Learning outcomes',
      syllabus: 'Syllabus',
      relatedEyebrow: 'Related',
      relatedTitle: 'Continue exploring Roshanayi courses.',
      notFound: 'Course not found'
    },
    teachersPage: {
      eyebrow: 'Teachers',
      title: 'Experienced teachers who understand Afghan children abroad.',
      description:
        'Our instructors combine subject expertise, patience, and cultural care so every child feels supported while learning language, Quran, Tajweed, and heritage.',
      standards: {
        eyebrow: 'Teacher Standards',
        title: 'Qualified, warm, and accountable to families.',
        description:
          'Roshanayi teachers are selected for both subject skill and their ability to encourage children who may feel shy, mixed-level, or disconnected from heritage learning.',
        items: [
          'Experience teaching children in multilingual families',
          'Clear communication with parents after class',
          'Respectful correction and age-appropriate pacing',
          'Subject expertise in language, Quran, Tajweed, or heritage'
        ]
      }
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Simple plans for consistent heritage learning.',
      description:
        'Choose a plan that fits your child\'s schedule, level, and learning goals. Families can begin with placement guidance before selecting a cohort.',
      startWith: 'Start with {plan}',
      included: {
        eyebrow: 'Included With Every Plan',
        title: 'Premium support without confusing add-ons.',
        items: [
          'Live online instruction with qualified teachers',
          'Age-aware cohorts for children and teens',
          'Practice tasks designed for busy families',
          'Parent updates, reminders, and placement support'
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions about plans and placement?',
        description:
          'Families can start with registration or a placement conversation before choosing the right course and schedule.'
      },
      plans: [
        {
          name: 'Basic Plan',
          price: '$69',
          period: '/month',
          description: 'Best for one child beginning one subject with a steady weekly routine.',
          features: [
            '1 live class per week',
            'Initial level placement',
            'Weekly practice materials',
            'Monthly parent progress note',
            'Access to class reminders'
          ],
          highlighted: false
        },
        {
          name: 'Premium Plan',
          price: '$119',
          period: '/month',
          description:
            'Best for families who want faster progress, stronger feedback, and dashboard visibility.',
          features: [
            '2 live classes per week',
            'Teacher feedback after key lessons',
            'Student dashboard and progress tracking',
            'Monthly parent review',
            'Priority placement in preferred time zones'
          ],
          highlighted: true
        },
        {
          name: 'Family Plan',
          price: '$179',
          period: '/month',
          description:
            'Built for siblings or families combining language, Quran, Tajweed, and heritage courses.',
          features: [
            'Sibling placement support',
            'Flexible course mix across subjects',
            'Family progress call each month',
            'Shared parent communication',
            'Discounted additional child enrollment'
          ],
          highlighted: false
        }
      ]
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Talk to our placement team.',
      description:
        'Ask about courses, time zones, sibling placement, Quran reading levels, or the best starting point for your child.',
      formAria: 'Contact Roshanayi Academy',
      support: {
        title: 'WhatsApp Support',
        text:
          'Message our placement team for course guidance, available cohorts, and quick questions from parents.',
        button: 'WhatsApp placement team'
      },
      emailCard: {
        title: 'Email'
      },
      timeZone: {
        title: 'Time Zone Information',
        text:
          'Cohorts are planned for families in North America, Europe, the United Kingdom, Australia, and other regions. Tell us your country and preferred class time in the form.'
      },
      placeholders: {
        country: 'Canada, Germany, Australia',
        whatsapp: '+1 555 000 0000',
        timezone: 'EST, GMT, CET, AEST',
        message: 'Tell us about your child\'s age, level, and schedule.'
      },
      submitIdle: 'Send message',
      submitLoading: 'Sending message',
      success: 'Thank you. Our team will contact you soon.'
    },
    register: {
      eyebrow: 'Student Registration',
      title: 'Start your child\'s Roshanayi learning journey.',
      description:
        'Share your child\'s age, country, WhatsApp contact, and learning goals. Our placement team will recommend the best course, level, and schedule.',
      familyEyebrow: 'Family registration',
      familyTitle: 'Register every child through one family account.',
      familyDescription:
        'Create the parent profile once, then add each child’s learning needs, preferred course, class format, and schedule.',
      formSteps: ['Parent Account', 'Parent Location', 'Student Information', 'Optional Student Login', 'Course Selection', 'Add Another Child', 'Agreement and Submit'],
      stepOf: 'Step {current} of {total}',
      childProfiles: '{count} child profiles',
      fields: {
        parentFullName: 'Parent or guardian full name', city: 'City', timezone: 'Time zone', relationship: 'Relationship to the student',
        firstName: 'First name', lastName: 'Last name', gender: 'Gender', dateOfBirth: 'Date of birth', age: 'Age',
        nativeLanguage: 'Home language', currentLevel: 'Current learning level', courseCategory: 'Course category',
        courseName: 'Course', classType: 'Class format', schedulePreference: 'Schedule preference'
      },
      selections: {
        timezone: 'Select a time zone', gender: 'Select gender', language: 'Select a language', level: 'Select a level',
        category: 'Select a category', course: 'Select a course'
      },
      review: {
        newChild: 'New child', agePending: 'Age not added', levelPending: 'Level not selected', coursePending: 'Course not selected',
        edit: 'Edit profile', addChild: 'Add another child'
      },
      agreements: {
        trialTitle: 'Two-day trial policy', trialText: 'Each new student receives a two-day trial before payment is required.',
        paymentTitle: 'Monthly payment policy',
        paymentText: 'Payment activates 30 days of enrollment. Renewal keeps class access active without interrupting the student record.',
        rulesTitle: 'Academy learning agreement',
        rulesText: 'Families agree to respectful attendance, communication, homework routines, and appropriate online classroom conduct.'
      },
      actions: { back: 'Back', continue: 'Continue', submitting: 'Submitting', referralCodes: 'Student referral codes' },
      validation: {
        parent: 'Please complete the parent or guardian information before continuing.',
        student: 'Please complete this student profile before continuing.',
        course: 'Please choose a course, class format, and schedule for this child.',
        children: 'Please complete every child profile before reviewing the policies.',
        policies: 'Please read and accept all three academy policies before submitting.'
      },
      optionLabels: {
        father: 'Father', mother: 'Mother', guardian: 'Guardian', female: 'Female', male: 'Male', undisclosed: 'Prefer not to say',
        dari: 'Dari', pashto: 'Pashto', english: 'English', urdu: 'Urdu', arabic: 'Arabic', other: 'Other',
        newBeginner: 'New learner', understands: 'Understands the language and needs speaking practice', beginner: 'Beginner',
        intermediate: 'Intermediate', advanced: 'Advanced', group: 'Group class ($30/month)',
        special: 'Private or semi-private class ($100/month)', premium: 'Premium language program ($150/month)',
        weekdays: 'Weekdays', weekends: 'Weekends', flexible: 'Flexible'
      },
      formAria: 'Register a student',
      nextTitle: 'What happens next?',
      steps: [
        'We review your child\'s age, level, and goals.',
        'You receive a recommended course and cohort time.',
        'Your child joins a live class and begins progress tracking.'
      ],
      placeholders: {
        country: 'United States, Germany, Canada',
        whatsapp: '+44 7000 000000',
        preferredTime: 'Weekdays after 5 PM CET',
        notes: 'Tell us what you want your child to learn.'
      },
      submitIdle: 'Submit registration',
      submitLoading: 'Submitting registration',
      success: 'Registration received. We will contact you soon.'
    },
    login: {
      eyebrow: 'Login',
      title: 'Welcome back to Roshanayi',
      description:
        'Access live class links, student progress, assignments, certificates, and parent notes.',
      roleAccess: 'Secure role access',
      roleDescription:
        'Your account opens only the tools assigned to your role, keeping academy operations and family information clearly separated.',
      signedIn: 'Signed in',
      account: '{role} account',
      openDashboard: 'Open dashboard',
      switchAccount: 'Switch account',
      chooseRole: 'Choose your role',
      rememberRole: 'Remember this account on this device',
      signingIn: 'Signing in',
      loginAs: 'Continue as {role}',
      redirecting: 'Login successful. Opening your dashboard.',
      newFamily: 'New family?',
      registerChildren: 'Register your children',
      formAria: 'Login to Roshanayi Academy',
      forgotPassword: 'Forgot password?',
      submitIdle: 'Login',
      submitLoading: 'Checking account',
      success: 'Login successful. Your dashboard is ready.',
      newUser: 'New to Roshanayi?'
    },
    dashboard: {
      eyebrow: 'Student Dashboard',
      title: 'Welcome back, Amina.',
      description:
        'Track live classes, weekly practice, teacher notes, certificates, and progress across language, Quran, and heritage learning.',
      progressEyebrow: 'Progress Tracking',
      currentProgress: 'Current course progress',
      term: 'Spring term cohort',
      assignmentsTitle: 'Assignments',
      noAssignmentsTitle: 'No assignments right now',
      noAssignmentsDescription: 'New practice tasks will appear here after your next live class.',
      recentLessonsTitle: 'Recent lessons',
      upcomingTitle: 'Upcoming classes',
      noUpcomingTitle: 'No upcoming classes',
      noUpcomingDescription: 'Your next class will appear here when your cohort schedule is confirmed.',
      certificatesTitle: 'Certificates',
      noCertificatesTitle: 'Certificates will appear here',
      noCertificatesDescription:
        'When Amina completes a course milestone, certificates and completion records will be listed in this space.',
      teacherNoteTitle: 'Teacher note',
      teacherNote:
        'Amina is improving steadily in reading fluency. Please continue short daily Dari practice and upload Quran reading before the next class.',
      progressItems: [
        {
          title: 'Dari Language Foundations',
          subject: 'Language',
          percent: 68,
          next: 'Reading practice: family words and daily routines',
          teacher: 'Maryam Farahi'
        },
        {
          title: 'Quran Reading for Beginners',
          subject: 'Quran',
          percent: 42,
          next: 'Noorani Qaida lesson 9 and short vowel review',
          teacher: 'Qari Idrees'
        },
        {
          title: 'Afghan Culture & Heritage',
          subject: 'Heritage',
          percent: 81,
          next: 'Family interview notes for heritage presentation',
          teacher: 'Layla Sadat'
        }
      ],
      upcoming: [
        {
          course: 'Dari Language Foundations',
          time: 'Tuesday, 5:00 PM GMT',
          teacher: 'Maryam Farahi',
          format: 'Live class'
        },
        {
          course: 'Quran Reading for Beginners',
          time: 'Thursday, 6:30 PM GMT',
          teacher: 'Qari Idrees',
          format: 'Recitation practice'
        }
      ],
      recentLessons: [
        {
          title: 'Dari connected letter forms',
          course: 'Dari Language Foundations',
          completed: 'Completed yesterday'
        },
        {
          title: 'Short vowels and sukoon review',
          course: 'Quran Reading for Beginners',
          completed: 'Completed 3 days ago'
        },
        {
          title: 'Afghanistan regions and family roots',
          course: 'Afghan Culture & Heritage',
          completed: 'Completed last week'
        }
      ],
      assignments: [
        { title: 'Record Quran reading practice', due: 'Due Thursday', status: 'Open' },
        { title: 'Read five Dari sentences to a parent', due: 'Due Friday', status: 'Open' },
        { title: 'Ask a grandparent about a family tradition', due: 'Due Sunday', status: 'Draft' }
      ]
    },
    error: {
      eyebrow: 'Page Error',
      fallback: 'Something went wrong.'
    }
  },
  fa: {
    common: {
      brand: {
        name: 'آکادمی روشنایی',
        shortName: 'روشنایی',
        academy: 'آکادمی',
        initials: 'RA',
        tagline: 'با روشنی بیاموزید'
      },
      nav: {
        home: 'خانه',
        about: 'درباره ما',
        courses: 'دوره‌ها',
        classrooms: 'صنف‌ها',
        teachers: 'استادان',
        pricing: 'قیمت‌ها',
        contact: 'تماس',
        management: 'مدیریت'
      },
      actions: {
        login: 'ورود',
        register: 'ثبت‌نام',
        registerChild: 'ثبت‌نام کودک',
        bookPlacement: 'رزرو راهنمایی تعیین سطح',
        talkToUs: 'با ما صحبت کنید',
        viewAllCourses: 'دیدن همه دوره‌ها',
        viewCourse: 'دیدن دوره',
        findCourse: 'یافتن دوره',
        browseCourses: 'دیدن دوره‌های بیشتر',
        getPlacementHelp: 'گرفتن راهنمایی تعیین سطح',
        createAccount: 'ساخت حساب',
        startRegistration: 'آغاز ثبت‌نام',
        returnHome: 'بازگشت به خانه'
      },
      labels: {
        language: 'زبان',
        switchLanguage: 'تغییر زبان',
        level: 'سطح',
        age: 'سن',
        ageGroup: 'گروه سنی',
        duration: 'مدت',
        lessons: 'درس‌ها',
        format: 'شیوه برگزاری',
        tuition: 'شهریه',
        keyBenefits: 'فایده‌های اصلی',
        from: 'از',
        specialization: 'تخصص',
        credentials: 'مدارک',
        teachingApproach: 'روش تدریس',
        photo: 'عکس',
        teacher: 'استاد',
        next: 'بعدی',
        email: 'ایمیل',
        support: 'پشتیبانی',
        password: 'رمز عبور',
        fullName: 'نام کامل',
        parentName: 'نام والد',
        studentName: 'نام شاگرد',
        studentAge: 'سن شاگرد',
        country: 'کشور',
        whatsappNumber: 'شماره واتساپ',
        courseInterest: 'دوره مورد علاقه',
        preferredTimeZone: 'منطقه زمانی ترجیحی',
        preferredClassTime: 'وقت ترجیحی صنف',
        message: 'پیام',
        learningGoals: 'هدف‌های یادگیری',
        rememberMe: 'مرا به خاطر بسپار',
        category: 'برنامه آموزشی',
        instruction: 'زبان تدریس',
        perMonth: 'دالر در ماه',
        progress: 'پیشرفت'
      },
      categories: {
        all: 'همه',
        dari: 'زبان دری',
        pashto: 'زبان پشتو',
        english: 'زبان انگلیسی',
        islamic: 'آموزه‌های اسلامی',
        quran: 'روخوانی قرآن',
        tajweed: 'تجوید',
        heritage: 'فرهنگ و میراث افغانستان',
        premium: 'برنامه‌های ممتاز زبان',
        notSure: 'هنوز مطمئن نیستم'
      },
      theme: {
        light: 'حالت روشن',
        dark: 'حالت تاریک',
        switchToLight: 'تغییر به حالت روشن',
        switchToDark: 'تغییر به حالت تاریک'
      },
      menu: {
        mainNavigation: 'ناوبری اصلی',
        toggle: 'باز و بسته کردن منوی موبایل'
      }
    },
    seo: {
      home: {
        title: 'خانه',
        ogTitle: 'آکادمی روشنایی | آموزش آنلاین برای کودکان افغان بیرون از کشور',
        description:
          'زبان دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان را با صنف‌های آنلاین زنده برای خانواده‌های افغان بیرون از کشور بیاموزید.',
        ogDescription:
          'صنف‌های آنلاین باکیفیت برای کودکان افغان بیرون از کشور در زبان دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان.'
      },
      about: {
        title: 'درباره ما',
        description:
          'با مأموریت، دیدگاه و داستان آکادمی روشنایی، یک آکادمی آنلاین جهانی برای کودکان افغان بیرون از کشور، آشنا شوید.'
      },
      courses: {
        title: 'دوره‌ها',
        description:
          'دوره‌های آکادمی روشنایی در زبان دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان را برای کودکان بیرون از کشور ببینید.'
      },
      teachers: {
        title: 'استادان',
        description:
          'با استادان آکادمی روشنایی برای دوره‌های دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان آشنا شوید.'
      },
      pricing: {
        title: 'قیمت‌ها',
        description:
          'پلن‌های قیمت آکادمی روشنایی برای صنف‌های آنلاین زنده، پشتیبانی خواهر و برادر، و بسته‌های خانوادگی را ببینید.'
      },
      contact: {
        title: 'تماس',
        description:
          'برای راهنمایی تعیین سطح، پرسش‌های دوره و پشتیبانی یادگیری خانواده با آکادمی روشنایی تماس بگیرید.'
      },
      register: {
        title: 'ثبت‌نام',
        description:
          'کودک خود را برای صنف‌های آنلاین آکادمی روشنایی در دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان ثبت‌نام کنید.'
      },
      login: {
        title: 'ورود',
        description: 'به حساب شاگرد یا والد در آکادمی روشنایی وارد شوید.'
      },
      dashboard: {
        title: 'داشبورد شاگرد',
        description:
          'داشبورد شاگرد آکادمی روشنایی با پیگیری پیشرفت، صنف‌های آینده، درس‌های تازه، سندها و وظایف.'
      }
    },
    layout: {
      footer: {
        description:
          'صنف‌های آنلاین باکیفیت برای کودکان افغان بیرون از کشور، بر پایه زبان دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان.',
        quickLinks: 'لینک‌های سریع',
        courses: 'دوره‌ها',
        contact: 'تماس',
        contactItems: [
          'hello@roshanayi.academy',
          'پشتیبانی تعیین سطح در واتساپ',
          'گروه‌های آنلاین جهانی',
          'امریکای شمالی، اروپا، بریتانیا، آسترالیا'
        ],
        copyright: 'حق نشر {year} آکادمی روشنایی. همه حقوق محفوظ است.',
        privacy: 'حریم خصوصی',
        terms: 'شرایط',
        social: {
          facebook: 'آکادمی روشنایی در فیسبوک',
          instagram: 'آکادمی روشنایی در انستاگرام',
          youtube: 'آکادمی روشنایی در یوتیوب'
        }
      }
    },
    newsletter: {
      label: 'آدرس ایمیل',
      placeholder: 'ایمیل خود را وارد کنید',
      idle: 'اشتراک',
      loading: 'در حال اشتراک',
      success: 'تشکر از اشتراک شما.'
    },
    loading: {
      academyContent: 'در حال بارگذاری محتوای آکادمی',
      courses: 'در حال بارگذاری دوره‌ها',
      dashboard: 'در حال بارگذاری داشبورد شاگرد'
    },
    home: {
      faq: {
        eyebrow: 'پرسش‌ها',
        title: 'پرسش‌های رایج والدین افغان بیرون از کشور.',
        description:
          'راهنمای کوتاه درباره تعیین سطح، آموزش زنده، مناطق زمانی، پشتیبانی خواهر و برادر، و تمرین در خانه.'
      },
      newsletter: {
        eyebrow: 'خبرنامه',
        title: 'منابع والدین برای یادگیری زبان، قرآن و فرهنگ را دریافت کنید.'
      }
    },
    hero: {
      eyebrow: 'آموزش آنلاین مورد اعتماد برای خانواده‌های افغان بیرون از کشور',
      title: 'به کودک خود کمک کنید با زبان، قرآن و فرهنگ افغانستان پیوند بماند.',
      description:
        'آکادمی روشنایی برای کودکان افغان در اروپا، امریکا، کانادا، آسترالیا و دیگر کشورها یک مسیر منظم برای یادگیری دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان فراهم می‌کند؛ با استادان دلسوز و پیشرفت قابل دید برای والدین.',
      note:
        'راهنمایی تعیین سطح برای مبتدیان، خواهر و برادرها، و کودکانی با سطح‌های زبانی متفاوت در دسترس است.',
      stats: [
        { value: '5', label: 'مسیر یادگیری میراث' },
        { value: '3,500+', label: 'ساعت درس برگزارشده' },
        { value: '24+', label: 'گروه سازگار با مناطق زمانی' }
      ]
    },
    academyIntro: {
      eyebrow: 'چرا روشنایی وجود دارد',
      title: 'یک آکادمی جدی برای خانواده‌هایی که یادگیری میراث را منظم می‌خواهند.',
      description:
        'بسیاری از کودکان افغان بیرون از کشور بخشی از زبان، دین و فرهنگ را در خانه می‌فهمند، اما برای رشد به استادان صبور و نصاب واقعی نیاز دارند. آکادمی روشنایی این بخش‌ها را در یک تجربه آنلاین باکیفیت کنار هم می‌آورد.',
      cards: [
        {
          value: 'زنده',
          title: 'صنف‌های کوچک گروهی',
          text:
            'شاگردان در زمان واقعی با استادانی که خانواده‌های افغان مهاجر را می‌فهمند صحبت، خواندن، تلاوت و پرسش می‌کنند.'
        },
        {
          value: 'روشن',
          title: 'پیشرفت قابل سنجش',
          text:
            'هر دوره نتیجه‌های مشخص، تمرین‌ها، یادداشت‌های والدین و مرحله‌های داشبورد دارد.'
        },
        {
          value: 'جهانی',
          title: 'ساخته‌شده برای برنامه‌های بین‌المللی',
          text:
            'گروه‌ها برای امریکای شمالی، اروپا، بریتانیا، آسترالیا و دیگر منطقه‌هایی که خانواده‌های افغان زندگی می‌کنند برنامه‌ریزی می‌شود.'
        }
      ]
    },
    featuredCourses: {
      eyebrow: 'دوره‌های برجسته',
      title: 'از مسیری شروع کنید که کودک شما بیشتر به آن نیاز دارد.',
      description:
        'هر دوره آموزش زنده، تمرین خانوادگی و نتیجه‌های قابل دید را ترکیب می‌کند تا والدین دقیق بدانند کودک‌شان چه می‌آموزد.'
    },
    benefits: {
      eyebrow: 'چرا خانواده‌ها ما را انتخاب می‌کنند',
      title: 'یادگیری باکیفیت همراه با گرمای زندگی خانوادگی افغان.',
      description:
        'آکادمی روشنایی به کودکان کمک می‌کند در مهارت و تعلق رشد کنند و به والدین وضاحت لازم برای ادامه یادگیری در خانه می‌دهد.',
      items: [
        {
          title: 'میراث با ساختار آموزشی',
          text:
            'کودکان زبان، قرآن، تجوید و فرهنگ را از راه درس‌های برنامه‌ریزی‌شده می‌آموزند، نه آموزش پراکنده.'
        },
        {
          title: 'پیشرفتی که والدین دنبال می‌کنند',
          text:
            'داشبوردها، یادداشت‌های صنف، وظایف و بازخورد استاد به خانواده‌ها کمک می‌کند یادگیری را بین صنف‌ها پشتیبانی کنند.'
        },
        {
          title: 'استادانی که کودکان مهاجر را می‌فهمند',
          text:
            'استادان ما می‌دانند کودکان شاید زبان را بفهمند اما در صحبت، خواندن یا تلاوت احساس خجالت کنند.'
        },
        {
          title: 'طراحی‌شده برای خانواده‌های بین‌المللی',
          text:
            'گروه‌های هماهنگ با مناطق زمانی، پشتیبانی تعیین سطح خواهر و برادر، و دسترسی موبایلی یادگیری را عملی می‌سازد.'
        }
      ]
    },
    academyStats: {
      eyebrow: 'آمار آکادمی',
      title: 'برای خانواده‌های افغان در سراسر جهان ساخته شده، نه فقط یک صنف محلی.',
      items: [
        {
          value: '5',
          label: 'مضمون اصلی',
          text: 'دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان.'
        },
        {
          value: '18+',
          label: 'کشور تحت پوشش',
          text: 'خانواده‌ها از امریکای شمالی، اروپا، آسترالیا و فراتر از آن.'
        },
        {
          value: '92%',
          label: 'دید والدین',
          text: 'خانواده‌ها یادداشت، تمرین و گزارش پیشرفت منظم دریافت می‌کنند.'
        },
        {
          value: '4',
          label: 'مسیر تعیین سطح',
          text: 'مبتدی، ادامه‌دهنده، خواهر و برادر، و خانواده‌های با سطح‌های متفاوت.'
        }
      ]
    },
    studentSuccess: {
      eyebrow: 'موفقیت شاگرد',
      title: 'یک ریتم هفتگی روشن برای کودکان و والدین.',
      description:
        'آکادمی روشنایی بر پیروزی‌های کوچک ساخته شده است: کودک یک خط بیشتر می‌خواند، یک جمله بیشتر می‌گوید، با دقت بیشتر تلاوت می‌کند و یک قدم به ریشه‌های خود نزدیک‌تر می‌شود.',
      dashboardButton: 'دیدن داشبورد خانواده',
      sampleLearner: 'مسیر یادگیری شاگرد',
      learnerName: 'آمینه، ۹ ساله',
      learnerDescription: 'خانواده مقیم منچستر، در حال یادگیری دری و روخوانی قرآن.',
      progressLabel: 'پیشرفت ترم',
      ok: 'خوب',
      teacherNote: 'یادداشت استاد',
      note:
        'آمینه برای خواندن با صدای بلند آماده‌تر شده است. لطفاً پس از شام پنج دقیقه خواندن دری را ادامه دهید و تمرین قرآن را پیش از صنف پنج‌شنبه آپلود کنید.',
      milestones: [
        'جمله‌های کوتاه دری را بدون برگشت به انگلیسی می‌خواند',
        'هفته‌ای سه بار تمرین قرآن را کامل می‌کند',
        'پروژه میراث خانوادگی را با اعتماد ارائه می‌کند'
      ]
    },
    testimonials: {
      eyebrow: 'نظر خانواده‌ها',
      title: 'والدین افغان پیشرفتی می‌خواهند که در خانه احساس شود.',
      description:
        'خانواده‌ها آکادمی روشنایی را انتخاب می‌کنند چون آموزش منظم، با احترام فرهنگی و کاربردی برای کودکان بیرون از کشور است.'
    },
    cta: {
      eyebrow: 'آماده شروع هستید؟',
      title: 'با راهنمایی تعیین سطح شروع کنید، سپس به گروه زنده مناسب بپیوندید.',
      description:
        'سن، کشور، سطح زبان و هدف‌های کودک خود را شریک بسازید. تیم ما بهترین دوره، استاد و برنامه سازگار با منطقه زمانی را پیشنهاد می‌کند.'
    },
    about: {
      eyebrow: 'درباره آکادمی روشنایی',
      title: 'یک آکادمی مدرن برای کودکان افغان که بیرون از کشور بزرگ می‌شوند.',
      description:
        'ما از خانواده‌های افغان در اروپا، امریکا، کانادا، آسترالیا و دیگر کشورها با یادگیری آنلاین منظم پشتیبانی می‌کنیم تا زبان، قرآن و فرهنگ بخشی از زندگی روزمره خانواده بماند.',
      values: [
        {
          title: 'مأموریت',
          text:
            'آموزش دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان به کودکان افغان بیرون از کشور از راه صنف‌های زنده، نصاب منظم و پشتیبانی دلسوزانه استاد.'
        },
        {
          title: 'دیدگاه',
          text:
            'نسلی جهانی از کودکان افغان که بتوانند با خانواده صحبت کنند، با اعتماد بخوانند و تلاوت کنند، و میراث افغان خود را با افتخار همراه داشته باشند.'
        },
        {
          title: 'چرا وجود داریم',
          text:
            'آکادمی روشنایی به این دلیل وجود دارد که بسیاری از خانواده‌های افغان بیرون از کشور می‌خواهند کودکان‌شان پیوند بمانند، اما به تجربه آکادمی منظم نیاز دارند نه فقط تدریس گاه‌گاهی.'
        }
      ],
      teach: {
        eyebrow: 'چگونه درس می‌دهیم',
        title: 'ساختار حرفه‌ای، توجه خانواده‌محور.',
        description:
          'روش ما پیشرفت قابل سنجش را با گرمایی ترکیب می‌کند که کودکان هنگام یادگیری موضوعات پیوندخورده با هویت، دین و خانواده نیاز دارند.'
      },
      principles: [
        'احترام به دین، خانواده، زبان و ریشه‌های فرهنگی افغانستان.',
        'صنف‌های مناسب سن با مرحله‌های یادگیری قابل دید و یادداشت‌های والدین.',
        'گروه‌های هماهنگ با مناطق زمانی برای خانواده‌ها در اروپا، امریکای شمالی، آسترالیا و فراتر.',
        'استادان مهربانی که می‌دانند چگونه کودکان دوزبانه را بدون فشار تشویق کنند.'
      ],
      promise: {
        eyebrow: 'وعده ما',
        quote:
          'هر کودک سزاوار مسیری روشن و تشویق‌کننده به سوی زبان، بنیادهای دینی و حافظه فرهنگی است که او را به خانواده پیوند می‌دهد.',
        text:
          'روشنایی یعنی درخشندگی. هدف ما این است که یادگیری میراث برای خانواده‌ها در هر جایی روشن، منظم و ممکن احساس شود.'
      },
      heritage: {
        eyebrow: 'نگهداری میراث',
        title: 'ما کمک می‌کنیم خانواده‌ها میراث را به تمرین هفتگی تبدیل کنند.',
        description:
          'نگهداری هویت افغان بیرون از کشور آسان‌تر می‌شود وقتی کودکان برنامه، استاد، گروه و لحظه‌های کوچک پیشرفت داشته باشند که والدین در خانه پشتیبانی کنند.',
        points: [
          {
            title: 'زبان در خانه',
            text:
              'کودکان واژه‌ها، جمله‌ها، سلام‌واحوال و گفت‌وگوهای خانوادگی را تمرین می‌کنند که برای صحبت با والدین، پدرکلان و مادرکلان و خویشاوندان نیاز دارند.'
          },
          {
            title: 'بنیادهای دینی',
            text:
              'دوره‌های روخوانی قرآن و تجوید به شاگردان کمک می‌کند با اصلاح صبورانه و سرعت محترمانه عادت‌های دقیق بسازند.'
          },
          {
            title: 'حافظه فرهنگی',
            text:
              'درس‌های میراث به کودکان کمک می‌کند منطقه‌ها، شعر، ارزش‌ها، داستان‌های خانوادگی، جشن‌ها و هویت افغانستان را بفهمند.'
          }
        ]
      }
    },
    coursesPage: {
      eyebrow: 'دوره‌ها',
      title: 'یادگیری زنده‌ای که کودک را با زبان، ایمان و میراث پیوند می‌دهد.',
      description:
        'دوره‌های منظم دری، پشتو، انگلیسی، قرآن، آموزه‌های اسلامی و میراث افغانستان را ببینید. میان صنف گروهی کوچک و آموزش شخصی انتخاب کنید و پیش از تصمیم نهایی، با دوره آزمایشی دو روزه آغاز نمایید.',
      registerNow: 'آغاز ثبت‌نام',
      viewCourses: 'دیدن دوره‌ها',
      enrollmentOptions: 'گزینه‌های ثبت‌نام',
      catalogEyebrow: 'فهرست دوره‌ها',
      catalogTitle: 'مسیر یادگیری مناسب کودک خود را پیدا کنید.',
      catalogDescription:
        'مضمون، گروه سنی، شیوه برگزاری و شهریه را در یک جا مقایسه کنید. اگر نقطه آغاز روشن نیست، تیم تعیین سطح در کنار شماست.',
      courseCount: '{count} دوره',
      premiumEyebrow: 'برنامه شخصی زبان',
      premiumDescription:
        'برای شاگردان انگلیسی‌زبان که به آموزش خصوصی یا نیمه‌خصوصی دری و پشتو با برنامه انعطاف‌پذیر نیاز دارند.',
      parentTrustEyebrow: 'ساخته‌شده برای خانواده‌ها',
      parentTrustTitle: 'تجربه‌ای سنجیده که والدین می‌توانند آن را دنبال کنند.',
      parentTrustDescription:
        'صنف‌های کوچک، استادان شایسته، گزارش روشن پیشرفت و محیط آنلاین محترمانه به کودک کمک می‌کند با اطمینان بیاموزد.',
      trialPolicy: 'سیاست دوره آزمایشی دو روزه',
      trialTitle: 'هر شاگرد تازه با یک دوره آزمایشی دو روزه آغاز می‌کند.',
      trialText:
        'پس از دوره آزمایشی، خانواده می‌تواند شیوه صنف را تایید و پرداخت را تکمیل کند؛ پرونده شاگرد در هر حالت محفوظ می‌ماند.',
      enrollment: {
        groupLabel: 'صنف گروهی کوچک',
        groupDetail: 'حداکثر ۱۰ شاگرد با ثبت‌نام ماهانه',
        specialLabel: 'صنف خصوصی یا نیمه‌خصوصی',
        specialDetail: 'یک یا دو شاگرد با برنامه شخصی',
        premiumLabel: 'برنامه ممتاز زبان',
        premiumDetail: 'آموزش شخصی دری یا پشتو برای شاگردان انگلیسی‌زبان',
        trialLabel: 'دوره آزمایشی دو روزه',
        trialDetail: 'پیش از تکمیل پرداخت، فضای صنف را تجربه کنید'
      },
      premiumHighlights: [
        'استادان بومی دری و پشتو',
        'درس‌های متناسب با نیاز شاگرد',
        'برنامه زمانی انعطاف‌پذیر',
        'توجه متمرکز استاد',
        'گزارش ماهانه پیشرفت',
        'آشنایی عمیق با فرهنگ',
        'گواهی پایان دوره'
      ],
      trustItems: [
        {
          title: 'گزارش پیشرفتی که برای والدین کاربرد دارد',
          text: 'گزارش ماهانه، حاضری، مشارکت، تمرین، توانایی‌ها و اولویت‌های بعدی یادگیری را روشن می‌سازد.'
        },
        {
          title: 'صنف کوچک با فرصت واقعی برای مشارکت',
          text: 'صنف گروهی حداکثر ۱۰ شاگرد دارد تا هر کودک فرصت صحبت، پرسش و دریافت بازخورد داشته باشد.'
        },
        {
          title: 'استادانی که شاگردان میراثی را می‌شناسند',
          text: 'شاگردان با استادان شایسته‌ای می‌آموزند که زندگی خانواده‌های چندزبانه افغان در بیرون از کشور را درک می‌کنند.'
        },
        {
          title: 'محیط آنلاین امن و محترمانه',
          text: 'درس‌ها منظم، زیر نظر و متناسب با سن‌اند و برای یادگیری متمرکز از خانه طراحی شده‌اند.'
        },
        {
          title: 'زبان، ایمان و هویت در کنار هم',
          text: 'نصاب در کنار مهارت ارتباطی، فرهنگ افغانستان، آداب و بنیادهای اسلامی را نیز تقویت می‌کند.'
        }
      ],
      searchLabel: 'جستجوی دوره‌ها',
      searchPlaceholder: 'جستجو بر اساس مضمون، گروه سنی، فایده یا سطح',
      showing: 'نمایش {shown} از {total} دوره',
      placementHelp: 'به راهنمایی تعیین سطح نیاز دارید؟ برای راهنمایی ثبت‌نام کنید',
      emptyTitle: 'هیچ دوره‌ای با جستجوی شما برابر نیست',
      emptyDescription:
        'مضمون، گروه سنی یا هدف یادگیری دیگری را امتحان کنید. اگر نمی‌دانید کودک شما از کجا شروع کند، می‌توانید برای پشتیبانی تعیین سطح ثبت‌نام کنید.'
    },
    courseDetails: {
      register: 'ثبت‌نام در این دوره',
      askPlacement: 'پرسش درباره تعیین سطح',
      eyebrow: 'جزئیات دوره',
      pathTitle: 'مسیری روشن از نخستین درس تا پیشرفت پایدار.',
      ageTitle: 'طراحی‌شده برای این گروه سنی',
      programFitTitle: 'این برنامه برای چه کسانی مناسب است',
      instruction: 'زبان تدریس',
      targetStudents: 'مناسب برای',
      trialPolicy: 'سیاست دوره آزمایشی دو روزه',
      overview: 'معرفی دوره',
      objectives: 'هدف‌های یادگیری',
      studentLearning: 'شاگردان چه می‌آموزند',
      teachingMethod: 'درس‌ها چگونه برگزار می‌شود',
      premiumDescription:
        'آموزش شخصی برای یک شاگرد، یا آموزش نیمه‌خصوصی برای دو شاگرد با سطح و هدف‌های نزدیک به هم.',
      specialOnlyTitle: 'صنف شخصی',
      groupClassTitle: 'صنف گروهی کوچک',
      specialClassTitle: 'صنف خصوصی یا نیمه‌خصوصی',
      monthlyTuition: 'شهریه ماهانه به دالر',
      learningPath: 'ترتیب پیشنهادی یادگیری',
      progressReport: 'گزارش ماهانه پیشرفت برای والدین',
      completionCertificate: 'گواهی پایان دوره',
      trialInformation: 'جزئیات دوره آزمایشی',
      learnTitle: 'کودک شما چه خواهد آموخت',
      parentGuidance: 'راهنمایی برای والدین',
      teacherPendingTitle: 'تعیین استاد در انتظار است',
      teacherPendingDescription:
        'تیم تعیین سطح ما پس از بررسی سطح شاگرد، منطقه زمانی و هدف‌های یادگیری، استاد مناسب را تعیین می‌کند.',
      familyBenefits: 'فایده‌ها برای خانواده‌ها',
      outcomes: 'نتیجه‌های یادگیری',
      syllabus: 'نصاب',
      relatedEyebrow: 'مرتبط',
      relatedTitle: 'دوره‌های دیگر روشنایی را هم ببینید.',
      notFound: 'دوره پیدا نشد'
    },
    teachersPage: {
      eyebrow: 'استادان',
      title: 'استادان باتجربه که کودکان افغان بیرون از کشور را می‌فهمند.',
      description:
        'استادان ما تخصص مضمون، صبر و توجه فرهنگی را ترکیب می‌کنند تا هر کودک هنگام یادگیری زبان، قرآن، تجوید و میراث احساس پشتیبانی کند.',
      standards: {
        eyebrow: 'معیارهای استادان',
        title: 'مسلکی، مهربان و پاسخ‌گو به خانواده‌ها.',
        description:
          'استادان روشنایی هم برای مهارت مضمون و هم برای توانایی تشویق کودکانی انتخاب می‌شوند که شاید خجالتی، چندسطحی یا دور از یادگیری میراث باشند.',
        items: [
          'تجربه تدریس به کودکان در خانواده‌های چندزبانه',
          'ارتباط روشن با والدین پس از صنف',
          'اصلاح محترمانه و سرعت مناسب سن',
          'تخصص در زبان، قرآن، تجوید یا میراث'
        ]
      }
    },
    pricing: {
      eyebrow: 'قیمت‌ها',
      title: 'پلن‌های ساده برای یادگیری منظم میراث.',
      description:
        'پلنی را انتخاب کنید که با برنامه، سطح و هدف‌های کودک شما سازگار باشد. خانواده‌ها می‌توانند پیش از انتخاب گروه، با راهنمایی تعیین سطح شروع کنند.',
      startWith: 'شروع با {plan}',
      included: {
        eyebrow: 'شامل هر پلن',
        title: 'پشتیبانی باکیفیت بدون هزینه‌های گیج‌کننده اضافی.',
        items: [
          'آموزش آنلاین زنده با استادان واجد شرایط',
          'گروه‌های مناسب سن برای کودکان و نوجوانان',
          'تمرین‌های طراحی‌شده برای خانواده‌های مصروف',
          'به‌روزرسانی والدین، یادآوری‌ها و پشتیبانی تعیین سطح'
        ]
      },
      faq: {
        eyebrow: 'پرسش‌ها',
        title: 'پرسشی درباره پلن‌ها و تعیین سطح دارید؟',
        description:
          'خانواده‌ها می‌توانند پیش از انتخاب دوره و برنامه مناسب، با ثبت‌نام یا گفت‌وگوی تعیین سطح شروع کنند.'
      },
      plans: [
        {
          name: 'پلن ابتدایی',
          price: '$69',
          period: '/ماه',
          description: 'مناسب برای یک کودک که یک مضمون را با روال هفتگی ثابت شروع می‌کند.',
          features: [
            '۱ صنف زنده در هفته',
            'تعیین سطح ابتدایی',
            'مواد تمرینی هفتگی',
            'یادداشت ماهانه پیشرفت برای والدین',
            'دسترسی به یادآوری‌های صنف'
          ],
          highlighted: false
        },
        {
          name: 'پلن ممتاز',
          price: '$119',
          period: '/ماه',
          description:
            'مناسب برای خانواده‌هایی که پیشرفت سریع‌تر، بازخورد قوی‌تر و دید داشبورد می‌خواهند.',
          features: [
            '۲ صنف زنده در هفته',
            'بازخورد استاد پس از درس‌های کلیدی',
            'داشبورد شاگرد و پیگیری پیشرفت',
            'بازبینی ماهانه با والدین',
            'اولویت در تعیین گروه‌های زمانی دلخواه'
          ],
          highlighted: true
        },
        {
          name: 'پلن خانوادگی',
          price: '$179',
          period: '/ماه',
          description:
            'برای خواهر و برادرها یا خانواده‌هایی که زبان، قرآن، تجوید و میراث را ترکیب می‌کنند.',
          features: [
            'پشتیبانی تعیین سطح خواهر و برادر',
            'ترکیب انعطاف‌پذیر دوره‌ها در مضمون‌های مختلف',
            'تماس ماهانه پیشرفت خانوادگی',
            'ارتباط مشترک با والدین',
            'تخفیف برای ثبت‌نام کودک اضافی'
          ],
          highlighted: false
        }
      ]
    },
    contact: {
      eyebrow: 'تماس',
      title: 'با تیم تعیین سطح ما صحبت کنید.',
      description:
        'درباره دوره‌ها، مناطق زمانی، تعیین سطح خواهر و برادر، سطح روخوانی قرآن یا بهترین نقطه شروع برای کودک خود بپرسید.',
      formAria: 'تماس با آکادمی روشنایی',
      support: {
        title: 'پشتیبانی واتساپ',
        text:
          'برای راهنمایی دوره، گروه‌های موجود و پرسش‌های سریع والدین به تیم تعیین سطح ما پیام بدهید.',
        button: 'تیم تعیین سطح واتساپ'
      },
      emailCard: {
        title: 'ایمیل'
      },
      timeZone: {
        title: 'اطلاعات منطقه زمانی',
        text:
          'گروه‌ها برای خانواده‌ها در امریکای شمالی، اروپا، بریتانیا، آسترالیا و دیگر منطقه‌ها برنامه‌ریزی می‌شود. کشور و وقت دلخواه صنف را در فرم بنویسید.'
      },
      placeholders: {
        country: 'کانادا، آلمان، آسترالیا',
        whatsapp: '+1 555 000 0000',
        timezone: 'EST, GMT, CET, AEST',
        message: 'درباره سن، سطح و برنامه کودک خود برای ما بنویسید.'
      },
      submitIdle: 'فرستادن پیام',
      submitLoading: 'در حال فرستادن پیام',
      success: 'تشکر. تیم ما به زودی با شما تماس می‌گیرد.'
    },
    register: {
      eyebrow: 'ثبت‌نام شاگرد',
      title: 'مسیر یادگیری کودک خود را با روشنایی آغاز کنید.',
      description:
        'سن کودک، کشور، شماره واتساپ و هدف‌های یادگیری را شریک بسازید. تیم تعیین سطح ما بهترین دوره، سطح و برنامه را پیشنهاد می‌کند.',
      familyEyebrow: 'ثبت‌نام خانواده',
      familyTitle: 'همه فرزندان خود را از یک حساب خانوادگی ثبت‌نام کنید.',
      familyDescription:
        'پروفایل والد را یک‌بار بسازید، سپس نیاز آموزشی، دوره دلخواه، شیوه صنف و برنامه هر کودک را جداگانه اضافه کنید.',
      formSteps: ['حساب والدین', 'موقعیت والدین', 'اطلاعات شاگرد', 'ورود اختیاری شاگرد', 'انتخاب دوره', 'افزودن فرزند دیگر', 'توافق و ارسال'],
      stepOf: 'مرحله {current} از {total}',
      childProfiles: '{count} پروفایل شاگرد',
      fields: {
        parentFullName: 'نام کامل والد یا سرپرست', city: 'شهر', timezone: 'منطقه زمانی', relationship: 'نسبت با شاگرد',
        firstName: 'نام', lastName: 'نام خانوادگی', gender: 'جنسیت', dateOfBirth: 'تاریخ تولد', age: 'سن',
        nativeLanguage: 'زبان خانه', currentLevel: 'سطح فعلی یادگیری', courseCategory: 'دسته دوره',
        courseName: 'دوره', classType: 'شیوه صنف', schedulePreference: 'برنامه زمانی دلخواه'
      },
      selections: {
        timezone: 'منطقه زمانی را انتخاب کنید', gender: 'جنسیت را انتخاب کنید', language: 'زبان را انتخاب کنید',
        level: 'سطح را انتخاب کنید', category: 'دسته را انتخاب کنید', course: 'دوره را انتخاب کنید'
      },
      review: {
        newChild: 'کودک تازه', agePending: 'سن وارد نشده', levelPending: 'سطح انتخاب نشده', coursePending: 'دوره انتخاب نشده',
        edit: 'ویرایش پروفایل', addChild: 'افزودن کودک دیگر'
      },
      agreements: {
        trialTitle: 'سیاست دوره آزمایشی دو روزه', trialText: 'هر شاگرد تازه پیش از نیاز به پرداخت، یک دوره آزمایشی دو روزه دریافت می‌کند.',
        paymentTitle: 'سیاست پرداخت ماهانه',
        paymentText: 'هر پرداخت، ثبت‌نام را برای ۳۰ روز فعال می‌کند. تمدید به‌موقع، دسترسی به صنف را بدون آسیب به پرونده شاگرد ادامه می‌دهد.',
        rulesTitle: 'توافق‌نامه آموزشی آکادمی',
        rulesText: 'خانواده‌ها به حاضری منظم، ارتباط محترمانه، انجام کارخانگی و رفتار مناسب در صنف آنلاین متعهد می‌شوند.'
      },
      actions: { back: 'بازگشت', continue: 'ادامه', submitting: 'در حال فرستادن', referralCodes: 'کودهای معرفی شاگردان' },
      validation: {
        parent: 'لطفاً پیش از ادامه، اطلاعات والد یا سرپرست را کامل کنید.',
        student: 'لطفاً پیش از ادامه، پروفایل این شاگرد را کامل کنید.',
        course: 'لطفاً برای این کودک دوره، شیوه صنف و برنامه زمانی را انتخاب کنید.',
        children: 'لطفاً پیش از بازبینی سیاست‌ها، پروفایل همه فرزندان را کامل کنید.',
        policies: 'لطفاً هر سه سیاست آکادمی را بخوانید و بپذیرید.'
      },
      optionLabels: {
        father: 'پدر', mother: 'مادر', guardian: 'سرپرست', female: 'دختر', male: 'پسر', undisclosed: 'ترجیح می‌دهم نگویم',
        dari: 'دری', pashto: 'پشتو', english: 'انگلیسی', urdu: 'اردو', arabic: 'عربی', other: 'زبان دیگر',
        newBeginner: 'شاگرد تازه‌کار', understands: 'زبان را می‌فهمد و به تمرین گفتار نیاز دارد', beginner: 'مبتدی',
        intermediate: 'متوسط', advanced: 'پیشرفته', group: 'صنف گروهی (۳۰ دالر در ماه)',
        special: 'صنف خصوصی یا نیمه‌خصوصی (۱۰۰ دالر در ماه)', premium: 'برنامه ممتاز زبان (۱۵۰ دالر در ماه)',
        weekdays: 'روزهای هفته', weekends: 'پایان هفته', flexible: 'انعطاف‌پذیر'
      },
      formAria: 'ثبت‌نام شاگرد',
      nextTitle: 'بعد چه می‌شود؟',
      steps: [
        'ما سن، سطح و هدف‌های کودک شما را بررسی می‌کنیم.',
        'شما دوره پیشنهادی و وقت گروه مناسب را دریافت می‌کنید.',
        'کودک شما به صنف زنده می‌پیوندد و پیگیری پیشرفت آغاز می‌شود.'
      ],
      placeholders: {
        country: 'ایالات متحده، آلمان، کانادا',
        whatsapp: '+44 7000 000000',
        preferredTime: 'روزهای هفته بعد از ۵ شام CET',
        notes: 'بنویسید می‌خواهید کودک شما چه بیاموزد.'
      },
      submitIdle: 'فرستادن ثبت‌نام',
      submitLoading: 'در حال فرستادن ثبت‌نام',
      success: 'ثبت‌نام دریافت شد. به زودی با شما تماس می‌گیریم.'
    },
    login: {
      eyebrow: 'ورود',
      title: 'خوش برگشتید به روشنایی',
      description:
        'به لینک‌های صنف زنده، پیشرفت شاگرد، وظایف، سندها و یادداشت‌های والدین دسترسی پیدا کنید.',
      roleAccess: 'دسترسی امن بر اساس نقش',
      roleDescription:
        'حساب شما فقط ابزارهای مربوط به نقش‌تان را باز می‌کند تا اطلاعات خانواده و عملیات آکادمی روشن، منظم و جدا از هم بماند.',
      signedIn: 'وارد شده‌اید',
      account: 'حساب {role}',
      openDashboard: 'باز کردن داشبورد',
      switchAccount: 'تغییر حساب',
      chooseRole: 'نقش خود را انتخاب کنید',
      rememberRole: 'این حساب را در این دستگاه به خاطر بسپار',
      signingIn: 'در حال ورود',
      loginAs: 'ادامه به حیث {role}',
      redirecting: 'ورود موفق بود. داشبورد شما باز می‌شود.',
      newFamily: 'خانواده تازه هستید؟',
      registerChildren: 'ثبت‌نام فرزندان',
      formAria: 'ورود به آکادمی روشنایی',
      forgotPassword: 'رمز عبور را فراموش کرده‌اید؟',
      submitIdle: 'ورود',
      submitLoading: 'در حال بررسی حساب',
      success: 'ورود موفق بود. داشبورد شما آماده است.',
      newUser: 'تازه به روشنایی آمده‌اید؟'
    },
    dashboard: {
      eyebrow: 'داشبورد شاگرد',
      title: 'خوش برگشتی، آمینه.',
      description:
        'صنف‌های زنده، تمرین هفتگی، یادداشت‌های استاد، سندها و پیشرفت در زبان، قرآن و میراث را دنبال کنید.',
      progressEyebrow: 'پیگیری پیشرفت',
      currentProgress: 'پیشرفت دوره‌های فعلی',
      term: 'گروه ترم بهار',
      assignmentsTitle: 'وظایف',
      noAssignmentsTitle: 'فعلاً وظیفه‌ای نیست',
      noAssignmentsDescription: 'تمرین‌های تازه پس از صنف زنده بعدی اینجا ظاهر می‌شود.',
      recentLessonsTitle: 'درس‌های تازه',
      upcomingTitle: 'صنف‌های آینده',
      noUpcomingTitle: 'صنف آینده‌ای نیست',
      noUpcomingDescription: 'وقتی برنامه گروه شما تأیید شود، صنف بعدی اینجا ظاهر می‌شود.',
      certificatesTitle: 'سندها',
      noCertificatesTitle: 'سندها اینجا ظاهر می‌شوند',
      noCertificatesDescription:
        'وقتی آمینه یک مرحله دوره را کامل کند، سندها و رکوردهای تکمیل در این بخش فهرست می‌شود.',
      teacherNoteTitle: 'یادداشت استاد',
      teacherNote:
        'آمینه در روانی خواندن به‌طور پیوسته بهتر می‌شود. لطفاً تمرین کوتاه روزانه دری را ادامه دهید و روخوانی قرآن را پیش از صنف بعدی آپلود کنید.',
      progressItems: [
        {
          title: 'بنیادهای زبان دری',
          subject: 'زبان',
          percent: 68,
          next: 'تمرین خواندن: واژه‌های خانواده و کارهای روزمره',
          teacher: 'مریم فراهی'
        },
        {
          title: 'روخوانی قرآن برای مبتدیان',
          subject: 'قرآن',
          percent: 42,
          next: 'درس ۹ نورانی قاعده و مرور حرکت‌های کوتاه',
          teacher: 'قاری ادریس'
        },
        {
          title: 'فرهنگ و میراث افغانستان',
          subject: 'میراث',
          percent: 81,
          next: 'یادداشت‌های مصاحبه خانوادگی برای ارائه میراث',
          teacher: 'لیلا سادات'
        }
      ],
      upcoming: [
        {
          course: 'بنیادهای زبان دری',
          time: 'سه‌شنبه، ۵:۰۰ عصر GMT',
          teacher: 'مریم فراهی',
          format: 'صنف زنده'
        },
        {
          course: 'روخوانی قرآن برای مبتدیان',
          time: 'پنج‌شنبه، ۶:۳۰ شام GMT',
          teacher: 'قاری ادریس',
          format: 'تمرین تلاوت'
        }
      ],
      recentLessons: [
        {
          title: 'شکل‌های پیوسته حروف دری',
          course: 'بنیادهای زبان دری',
          completed: 'دیروز کامل شد'
        },
        {
          title: 'مرور حرکت‌های کوتاه و سکون',
          course: 'روخوانی قرآن برای مبتدیان',
          completed: '۳ روز پیش کامل شد'
        },
        {
          title: 'منطقه‌های افغانستان و ریشه‌های خانوادگی',
          course: 'فرهنگ و میراث افغانستان',
          completed: 'هفته گذشته کامل شد'
        }
      ],
      assignments: [
        { title: 'ضبط تمرین روخوانی قرآن', due: 'مهلت تا پنج‌شنبه', status: 'باز' },
        { title: 'خواندن پنج جمله دری برای یکی از والدین', due: 'مهلت تا جمعه', status: 'باز' },
        { title: 'پرسیدن یک رسم خانوادگی از پدرکلان یا مادرکلان', due: 'مهلت تا یک‌شنبه', status: 'پیش‌نویس' }
      ]
    },
    error: {
      eyebrow: 'خطای صفحه',
      fallback: 'مشکلی پیش آمد.'
    }
  },
  ps: {
    common: {
      brand: {
        name: 'روښنايي اکاډمي',
        shortName: 'روښنايي',
        academy: 'اکاډمي',
        initials: 'RA',
        tagline: 'په رڼا سره زده کړه'
      },
      nav: {
        home: 'کور',
        about: 'زموږ په اړه',
        courses: 'کورسونه',
        classrooms: 'صنفونه',
        teachers: 'استادان',
        pricing: 'بیې',
        contact: 'اړیکه',
        management: 'مدیریت'
      },
      actions: {
        login: 'ننوتل',
        register: 'نوملیکنه',
        registerChild: 'د ماشوم نوملیکنه',
        bookPlacement: 'د کچې ټاکلو مرسته واخلئ',
        talkToUs: 'له موږ سره خبرې وکړئ',
        viewAllCourses: 'ټول کورسونه وګورئ',
        viewCourse: 'کورس وګورئ',
        findCourse: 'کورس پیدا کړئ',
        browseCourses: 'نور کورسونه وګورئ',
        getPlacementHelp: 'د کچې ټاکلو مرسته',
        createAccount: 'حساب جوړ کړئ',
        startRegistration: 'نوملیکنه پیل کړئ',
        returnHome: 'کور ته ستنیدل'
      },
      labels: {
        language: 'ژبه',
        switchLanguage: 'ژبه بدله کړئ',
        level: 'کچه',
        age: 'عمر',
        ageGroup: 'د عمر ډله',
        duration: 'موده',
        lessons: 'درسونه',
        format: 'بڼه',
        tuition: 'فیس',
        keyBenefits: 'اصلي ګټې',
        from: 'له',
        specialization: 'تخصص',
        credentials: 'اسناد',
        teachingApproach: 'د تدریس تګلاره',
        photo: 'انځور',
        teacher: 'استاد',
        next: 'بل',
        email: 'برېښنالیک',
        support: 'ملاتړ',
        password: 'پټنوم',
        fullName: 'بشپړ نوم',
        parentName: 'د مور/پلار نوم',
        studentName: 'د زده کوونکي نوم',
        studentAge: 'د زده کوونکي عمر',
        country: 'هېواد',
        whatsappNumber: 'د واتساپ شمېره',
        courseInterest: 'د خوښې کورس',
        preferredTimeZone: 'غوره وخت زون',
        preferredClassTime: 'د صنف غوره وخت',
        message: 'پیغام',
        learningGoals: 'د زده کړې موخې',
        rememberMe: 'ما په یاد وساته',
        category: 'ښوونیز پروګرام',
        instruction: 'د تدریس ژبه',
        perMonth: 'امریکايي ډالر په میاشت کې',
        progress: 'پرمختګ'
      },
      categories: {
        all: 'ټول',
        dari: 'دري ژبه',
        pashto: 'پښتو ژبه',
        english: 'انګلیسي ژبه',
        islamic: 'اسلامي زده کړې',
        quran: 'د قرآن لوستل',
        tajweed: 'تجوید',
        heritage: 'افغان کلتور او میراث',
        premium: 'ځانګړي ژبني پروګرامونه',
        notSure: 'لا ډاډه نه یم'
      },
      theme: {
        light: 'روښانه حالت',
        dark: 'تیاره حالت',
        switchToLight: 'روښانه حالت ته بدلول',
        switchToDark: 'تیاره حالت ته بدلول'
      },
      menu: {
        mainNavigation: 'اصلي تګ راتګ',
        toggle: 'د موبایل مینو پرانیستل یا تړل'
      }
    },
    seo: {
      home: {
        title: 'کور',
        ogTitle: 'روښنايي اکاډمي | له هېواده بهر افغان ماشومانو لپاره آنلاین زده کړه',
        description:
          'دري، پښتو، د قرآن لوستل، تجوید او افغان کلتور د ژوندیو آنلاین صنفونو له لارې له هېواده بهر افغان کورنیو ته ور زده کړئ.',
        ogDescription:
          'له هېواده بهر افغان ماشومانو لپاره په دري، پښتو، د قرآن لوستلو، تجوید او افغان کلتور کې لوړ کیفیت آنلاین صنفونه.'
      },
      about: {
        title: 'زموږ په اړه',
        description:
          'د روښنايي اکاډمي له ماموریت، لیدلوري او کیسې سره اشنا شئ؛ یوه نړیواله آنلاین اکاډمي د افغان ماشومانو لپاره.'
      },
      courses: {
        title: 'کورسونه',
        description:
          'د روښنايي اکاډمي کورسونه په دري، پښتو، د قرآن لوستلو، تجوید او افغان کلتور کې وګورئ.'
      },
      teachers: {
        title: 'استادان',
        description:
          'د روښنايي اکاډمي له استادانو سره د دري، پښتو، قرآن لوستلو، تجوید او افغان کلتور کورسونو لپاره اشنا شئ.'
      },
      pricing: {
        title: 'بیې',
        description:
          'د ژوندیو آنلاین کورسونو، د خویندو وروڼو ملاتړ او کورنیو بسته بندیو لپاره د روښنايي اکاډمي بیې وګورئ.'
      },
      contact: {
        title: 'اړیکه',
        description:
          'د کچې ټاکلو، د کورسونو پوښتنو او د کورنۍ زده کړې ملاتړ لپاره له روښنايي اکاډمي سره اړیکه ونیسئ.'
      },
      register: {
        title: 'نوملیکنه',
        description:
          'خپل ماشوم د روښنايي اکاډمي آنلاین صنفونو ته په دري، پښتو، قرآن لوستلو، تجوید او افغان کلتور کې ثبت کړئ.'
      },
      login: {
        title: 'ننوتل',
        description: 'د روښنايي اکاډمي د زده کوونکي یا والد حساب ته ننوځئ.'
      },
      dashboard: {
        title: 'د زده کوونکي ډشبورډ',
        description:
          'د روښنايي اکاډمي د زده کوونکي ډشبورډ د پرمختګ، راتلونکو صنفونو، وروستیو درسونو، سندونو او دندو لپاره.'
      }
    },
    layout: {
      footer: {
        description:
          'له هېواده بهر افغان ماشومانو لپاره لوړ کیفیت آنلاین صنفونه، د دري، پښتو، قرآن لوستلو، تجوید او افغان کلتور پر بنسټ.',
        quickLinks: 'چټک لینکونه',
        courses: 'کورسونه',
        contact: 'اړیکه',
        contactItems: [
          'hello@roshanayi.academy',
          'په واتساپ کې د کچې ټاکلو ملاتړ',
          'نړیوال آنلاین ګروپونه',
          'شمالي امریکا، اروپا، برېتانیا، اسټرالیا'
        ],
        copyright: 'د چاپ حق {year} روښنايي اکاډمي. ټول حقوق خوندي دي.',
        privacy: 'محرمیت',
        terms: 'شرایط',
        social: {
          facebook: 'روښنايي اکاډمي په فیسبوک کې',
          instagram: 'روښنايي اکاډمي په انسټاګرام کې',
          youtube: 'روښنايي اکاډمي په یوټیوب کې'
        }
      }
    },
    newsletter: {
      label: 'برېښنالیک پته',
      placeholder: 'خپل برېښنالیک ولیکئ',
      idle: 'ګډون',
      loading: 'ګډون روان دی',
      success: 'ستاسو له ګډون څخه مننه.'
    },
    loading: {
      academyContent: 'د اکاډمي منځپانګه پورته کېږي',
      courses: 'کورسونه پورته کېږي',
      dashboard: 'د زده کوونکي ډشبورډ پورته کېږي'
    },
    home: {
      faq: {
        eyebrow: 'پوښتنې',
        title: 'له هېواده بهر د افغان والدینو عامې پوښتنې.',
        description:
          'د کچې ټاکلو، ژوندۍ زده کړې، وخت زونونو، د خویندو وروڼو ملاتړ او کورني تمرین په اړه لنډ لارښود.'
      },
      newsletter: {
        eyebrow: 'خبرپاڼه',
        title: 'د ژبې، قرآن او میراث زده کړې لپاره د والدینو سرچینې ترلاسه کړئ.'
      }
    },
    hero: {
      eyebrow: 'له هېواده بهر افغان کورنیو لپاره باوري آنلاین زده کړه',
      title: 'خپل ماشوم د افغان ژبې، قرآن او میراث سره تړلی وساتئ.',
      description:
        'روښنايي اکاډمي په اروپا، امریکا، کاناډا، اسټرالیا او نورو ځایونو کې افغان ماشومانو ته د دري، پښتو، قرآن لوستلو، تجوید او افغان کلتور د زده کړې منظم مسیر ورکوي؛ د مهربانو استادانو او د والدینو لپاره ښکاره پرمختګ سره.',
      note:
        'د پیل کوونکو، خویندو وروڼو او د ګډو ژبنیو کچو ماشومانو لپاره د کچې ټاکلو لارښوونه شته.',
      stats: [
        { value: '5', label: 'د میراث د زده کړې لارې' },
        { value: '3,500+', label: 'ورکړل شوي درس ساعتونه' },
        { value: '24+', label: 'د وخت زون سره برابر ګروپونه' }
      ]
    },
    academyIntro: {
      eyebrow: 'ولې روښنايي شته',
      title: 'د هغو کورنیو لپاره جدي اکاډمي چې د میراث زده کړه منظم غواړي.',
      description:
        'ډېر افغان ماشومان له هېواده بهر د کور ژبه، دین او کلتور یو څه پوهېږي، خو د ودې لپاره صبر لرونکي استادان او ریښتینی نصاب غواړي. روښنايي اکاډمي دا برخې په یوه باکیفیته آنلاین تجربه کې یوځای کوي.',
      cards: [
        {
          value: 'ژوندی',
          title: 'کوچني ګروپي صنفونه',
          text:
            'زده کوونکي په ریښتیني وخت کې خبرې، لوستل، تلاوت او پوښتنې کوي، له هغو استادانو سره چې افغان کډوالې کورنۍ درک کوي.'
        },
        {
          value: 'روښانه',
          title: 'د سنجولو وړ پرمختګ',
          text:
            'هر کورس پایلې، تمرینونه، د والدینو یادښتونه او د ډشبورډ مرحلې لري.'
        },
        {
          value: 'نړیوال',
          title: 'د نړیوالو مهالویشونو لپاره جوړ شوی',
          text:
            'ګروپونه د شمالي امریکا، اروپا، برېتانیا، اسټرالیا او نورو سیمو لپاره پلانېږي چې افغان کورنۍ پکې ماشومان لویوي.'
        }
      ]
    },
    featuredCourses: {
      eyebrow: 'ځانګړي کورسونه',
      title: 'له هغه مسیر څخه پیل وکړئ چې ستاسو ماشوم ورته ډېره اړتیا لري.',
      description:
        'هر کورس ژوندۍ زده کړه، کورنی تمرین او ښکاره پایلې سره یوځای کوي، څو والدین په دقیق ډول پوه شي ماشوم یې څه زده کوي.'
    },
    benefits: {
      eyebrow: 'ولې کورنۍ موږ غوره کوي',
      title: 'لوړ کیفیت زده کړه د افغان کورني ژوند له تودوالي سره.',
      description:
        'روښنايي اکاډمي ماشومانو سره په مهارت او تړاو کې مرسته کوي او والدینو ته هغه وضاحت ورکوي چې په کور کې زده کړه ژوندۍ وساتي.',
      items: [
        {
          title: 'میراث له تعلیمي جوړښت سره',
          text:
            'ماشومان ژبه، قرآن، تجوید او کلتور د پلان شوو درسونو له لارې زده کوي، نه تصادفي ټیوټرنګ.'
        },
        {
          title: 'پرمختګ چې والدین یې تعقیبوي',
          text:
            'ډشبورډونه، د صنف یادښتونه، دندې او د استاد نظر کورنیو سره د صنفونو ترمنځ د زده کړې ملاتړ کې مرسته کوي.'
        },
        {
          title: 'استادان چې د کډوالو ماشومان درک کوي',
          text:
            'زموږ استادان پوهېږي چې ماشومان ښايي ژبه درک کړي خو په خبرو، لوستلو یا تلاوت کې شرم احساس کړي.'
        },
        {
          title: 'د نړیوالو کورنیو لپاره جوړ شوی',
          text:
            'د وخت زون سره برابر ګروپونه، د خویندو وروڼو د کچې ټاکلو ملاتړ او موبایل ته برابر لاسرسی زده کړه عملي کوي.'
        }
      ]
    },
    academyStats: {
      eyebrow: 'د اکاډمي شمېرې',
      title: 'د نړیوالو افغان کورنیو لپاره جوړ شوی، نه یوازې د یوه محلي صنف لپاره.',
      items: [
        {
          value: '5',
          label: 'اصلي مضمونونه',
          text: 'دري، پښتو، د قرآن لوستل، تجوید او افغان کلتور.'
        },
        {
          value: '18+',
          label: 'رسېدلي هېوادونه',
          text: 'کورنۍ له شمالي امریکا، اروپا، اسټرالیا او نورو ځایونو څخه.'
        },
        {
          value: '92%',
          label: 'د والدینو لید',
          text: 'کورنۍ منظم یادښتونه، تمرینونه او د پرمختګ راپورونه ترلاسه کوي.'
        },
        {
          value: '4',
          label: 'د کچې ټاکلو لارې',
          text: 'پیل کوونکی، دوام کوونکی، خویندې وروڼه، او ګډې کچې کورنۍ.'
        }
      ]
    },
    studentSuccess: {
      eyebrow: 'د زده کوونکي بریا',
      title: 'د ماشومانو او والدینو لپاره روښانه اونیز ریتم.',
      description:
        'روښنايي اکاډمي پر وړو بریاوو ولاړه ده: ماشوم یوه کرښه نوره لولي، یوه جمله نوره وايي، په ډېر پام تلاوت کوي او خپلو ریښو ته یو ګام نږدې کېږي.',
      dashboardButton: 'د کورنۍ ډشبورډ وګورئ',
      sampleLearner: 'د زده کوونکي سفر',
      learnerName: 'امینه، ۹ کلنه',
      learnerDescription: 'کورنۍ په مانچسټر کې ده، دري او د قرآن لوستل زده کوي.',
      progressLabel: 'د ترم پرمختګ',
      ok: 'سم',
      teacherNote: 'د استاد یادښت',
      note:
        'امینه اوس په لوړ غږ لوستلو ته ډېره چمتو ده. مهرباني وکړئ له ماښام ډوډۍ وروسته پنځه دقیقې دري لوستل دوام ورکړئ او د پنجشنبې له صنف مخکې د قرآن تمرین پورته کړئ.',
      milestones: [
        'لنډې دري جملې له انګلیسي ته له اوښتو پرته لولي',
        'په اونۍ کې درې ځله د قرآن تمرین بشپړوي',
        'د کورني میراث پروژه په باور وړاندې کوي'
      ]
    },
    testimonials: {
      eyebrow: 'د کورنیو نظرونه',
      title: 'افغان والدین داسې پرمختګ غواړي چې په کور کې احساس شي.',
      description:
        'کورنۍ روښنايي اکاډمي غوره کوي ځکه تدریس منظم، فرهنګي درناوی لرونکی او له هېواده بهر ماشومانو لپاره عملي دی.'
    },
    cta: {
      eyebrow: 'پیل ته چمتو یاست؟',
      title: 'د کچې ټاکلو لارښوونې سره پیل وکړئ، بیا مناسب ژوندی ګروپ سره یوځای شئ.',
      description:
        'د خپل ماشوم عمر، هېواد، ژبنۍ کچه او موخې شریکې کړئ. زموږ ټیم به غوره کورس، استاد او د وخت زون سره برابر مهالویش وړاندیز کړي.'
    },
    about: {
      eyebrow: 'د روښنايي اکاډمي په اړه',
      title: 'یوه نوې اکاډمي د هغو افغان ماشومانو لپاره چې له هېواده بهر لویېږي.',
      description:
        'موږ په اروپا، امریکا، کاناډا، اسټرالیا او نورو هېوادونو کې افغان کورنیو سره د منظمې آنلاین زده کړې مرسته کوو، څو ژبه، قرآن او میراث د کورني ژوند برخه پاتې شي.',
      values: [
        {
          title: 'ماموریت',
          text:
            'له هېواده بهر افغان ماشومانو ته دري، پښتو، د قرآن لوستل، تجوید او افغان کلتور د ژوندیو صنفونو، منظم نصاب او مهربان استاد ملاتړ له لارې ور زده کول.'
        },
        {
          title: 'لیدلوری',
          text:
            'یوه نړیواله افغانه نسل چې له کورنۍ سره خبرې کولی شي، په باور لوستل او تلاوت کولی شي، او خپل افغان میراث په ویاړ له ځان سره وړي.'
        },
        {
          title: 'ولې شته یو',
          text:
            'روښنايي اکاډمي ځکه شته چې ډېرې افغان کورنۍ له هېواده بهر غواړي ماشومان یې تړلي پاتې شي، خو د کله ناکله ټیوټرنګ پر ځای منظم اکاډمي تجربه غواړي.'
        }
      ],
      teach: {
        eyebrow: 'موږ څنګه تدریس کوو',
        title: 'مسلکي جوړښت، کورنۍ-محوره پاملرنه.',
        description:
          'زموږ تګلاره د سنجولو وړ پرمختګ له هغه تودوالي سره یوځای کوي چې ماشومان یې د هویت، دین او کورنۍ سره تړلو مضمونونو کې غواړي.'
      },
      principles: [
        'د دین، کورنۍ، ژبې او افغان فرهنګي ریښو درناوی.',
        'د عمر سره مناسب صنفونه د ښکاره زده کړې مرحلو او والدینو یادښتونو سره.',
        'د اروپا، شمالي امریکا، اسټرالیا او نورو ځایونو کورنیو لپاره د وخت زون سره برابر ګروپونه.',
        'مهربان استادان چې دوه ژبي ماشومان له فشار پرته هڅولی شي.'
      ],
      promise: {
        eyebrow: 'زموږ ژمنه',
        quote:
          'هر ماشوم د ژبې، د دین بنسټونو او فرهنګي حافظې پر لور د روښانه او هڅوونکي مسیر حق لري چې هغه له کورنۍ سره تړي.',
        text:
          'روښنايي د رڼا معنا لري. زموږ هدف دا دی چې د میراث زده کړه د هر ځای کورنیو لپاره روښانه، منظمه او ممکنه شي.'
      },
      heritage: {
        eyebrow: 'د میراث ساتنه',
        title: 'موږ له کورنیو سره مرسته کوو چې میراث په اونیز تمرین بدل کړي.',
        description:
          'له هېواده بهر د افغان هویت ساتل اسانه کېږي کله چې ماشومان برنامه، استاد، ګروپ او د پرمختګ وړې شیبې ولري چې والدین یې په کور کې ملاتړ وکړي.',
        points: [
          {
            title: 'ژبه په کور کې',
            text:
              'ماشومان هغه کلمې، جملې، سلامونه او کورنۍ خبرې تمرینوي چې له والدینو، نیکه، انا او خپلوانو سره ورته اړتیا لري.'
          },
          {
            title: 'د دین بنسټونه',
            text:
              'د قرآن لوستلو او تجوید کورسونه زده کوونکو سره مرسته کوي چې د صبر لرونکي اصلاح او درناوي سرعت سره دقیق عادتونه جوړ کړي.'
          },
          {
            title: 'فرهنګي حافظه',
            text:
              'د میراث درسونه ماشومانو سره د افغان سیمو، شعر، ارزښتونو، کورنیو کیسو، جشنونو او هویت په پوهېدو کې مرسته کوي.'
          }
        ]
      }
    },
    coursesPage: {
      eyebrow: 'کورسونه',
      title: 'ژوندۍ زده کړه چې ماشومان له ژبې، ایمان او میراث سره نښلوي.',
      description:
        'د دري، پښتو، انګلیسي، قرآن، اسلامي زده کړو او افغان میراث منظم کورسونه وپلټئ. کوچنی ډله‌ییز یا شخصي صنف وټاکئ او له وروستۍ پرېکړې مخکې دوه ورځنی آزمایښتي پړاو تجربه کړئ.',
      registerNow: 'نوملیکنه پیل کړئ',
      viewCourses: 'کورسونه وګورئ',
      enrollmentOptions: 'د نوملیکنې لارې',
      catalogEyebrow: 'د کورسونو لړ',
      catalogTitle: 'د خپل ماشوم لپاره سمه زده‌کړیزه لاره ومومئ.',
      catalogDescription:
        'مضمون، عمر، د صنف بڼه او فیس په یوه ځای کې پرتله کړئ. که د پیل ځای روښانه نه وي، زموږ د کچې ټاکلو ټیم درسره مرسته کوي.',
      courseCount: '{count} کورسونه',
      premiumEyebrow: 'شخصي ژبنی پروګرام',
      premiumDescription:
        'د انګلیسي ویونکو زده کوونکو لپاره چې د انعطاف‌منونکي مهالویش سره شخصي یا نیمه‌خصوصي دري او پښتو زده کړې ته اړتیا لري.',
      parentTrustEyebrow: 'د کورنیو لپاره جوړ شوی',
      parentTrustTitle: 'یوه سنجول شوې اکاډمیکه تجربه چې والدین یې تعقیبولی شي.',
      parentTrustDescription:
        'کوچني صنفونه، وړ استادان، روښانه پرمختګ راپورونه او درناوی لرونکی آنلاین چاپېریال ماشومانو ته د ډاډمنې زده کړې زمینه برابروي.',
      trialPolicy: 'د دوه ورځني آزمایښتي پړاو تګلاره',
      trialTitle: 'هر نوی زده کوونکی له دوه ورځني آزمایښتي پړاو څخه پیل کوي.',
      trialText:
        'له آزمایښتي پړاو وروسته کورنۍ د صنف بڼه تاییدوي او د دوام لپاره تادیه بشپړوي؛ د زده کوونکي ریکارډ په هر حالت کې خوندي پاتې کېږي.',
      enrollment: {
        groupLabel: 'کوچنی ډله‌ییز صنف',
        groupDetail: 'تر ۱۰ زده کوونکو پورې له میاشتني نوملیکنې سره',
        specialLabel: 'خصوصي یا نیمه‌خصوصي صنف',
        specialDetail: 'یو یا دوه زده کوونکي له شخصي مهالویش سره',
        premiumLabel: 'ځانګړی ژبنی پروګرام',
        premiumDetail: 'د انګلیسي ویونکو لپاره شخصي دري یا پښتو زده کړه',
        trialLabel: 'دوه ورځنی آزمایښتي پړاو',
        trialDetail: 'له تادیې مخکې د صنف تجربه وکړئ'
      },
      premiumHighlights: [
        'دري او پښتو مورنۍ ژبې استادان',
        'د زده کوونکي له اړتیا سره برابر درسونه',
        'انعطاف‌منونکی مهالویش',
        'د استاد متمرکزه پاملرنه',
        'میاشتني پرمختګ راپورونه',
        'فرهنګي ژورتیا',
        'د بشپړولو سند'
      ],
      trustItems: [
        {
          title: 'د والدینو لپاره ګټور پرمختګ راپور',
          text: 'میاشتنی راپور حاضري، ګډون، تمرین، ځواکمن ټکي او د زده کړې راتلونکي لومړیتوبونه روښانوي.'
        },
        {
          title: 'کوچنی صنف او د ګډون ریښتینی فرصت',
          text: 'ډله‌ییز صنف تر ۱۰ زده کوونکو محدود دی، څو هر ماشوم د خبرو، پوښتنو او نظر اخیستلو وخت ولري.'
        },
        {
          title: 'هغه استادان چې میراثي زده کوونکي پېژني',
          text: 'زده کوونکي له وړ استادانو سره زده کړه کوي چې له هېواده بهر څوژبې افغانې کورنۍ درک کوي.'
        },
        {
          title: 'خوندي او درناوی لرونکی آنلاین صنف',
          text: 'درسونه منظم، څارل شوي، د عمر سره برابر او له کوره د متمرکزې زده کړې لپاره جوړ شوي دي.'
        },
        {
          title: 'ژبه، ایمان او هویت یوځای',
          text: 'نصاب د اړیکو مهارتونو ترڅنګ افغان کلتور، آداب او اسلامي بنسټونه هم پیاوړي کوي.'
        }
      ],
      searchLabel: 'کورسونه ولټوئ',
      searchPlaceholder: 'د مضمون، عمر ډلې، ګټې یا کچې له مخې لټون',
      showing: '{shown} له {total} کورسونو ښودل کېږي',
      placementHelp: 'د کچې ټاکلو مرسته غواړئ؟ د لارښوونې لپاره نوملیکنه وکړئ',
      emptyTitle: 'ستاسو له لټون سره کورس برابر نه دی',
      emptyDescription:
        'بل مضمون، عمر ډله یا د زده کړې موخه وازمویئ. که نه پوهېږئ ماشوم مو له کوم ځایه پیل کړي، د کچې ټاکلو ملاتړ لپاره نوملیکنه کولی شئ.'
    },
    courseDetails: {
      register: 'دې کورس ته نوملیکنه',
      askPlacement: 'د کچې ټاکلو په اړه پوښتنه',
      eyebrow: 'د کورس جزئیات',
      pathTitle: 'له لومړي درس څخه تر دوامدار پرمختګ پورې روښانه لاره.',
      ageTitle: 'د دې عمر ډلې لپاره جوړ شوی',
      programFitTitle: 'دا پروګرام د چا لپاره مناسب دی',
      instruction: 'د تدریس ژبه',
      targetStudents: 'تر ټولو مناسب د',
      trialPolicy: 'د دوه ورځني آزمایښتي پړاو تګلاره',
      overview: 'د کورس پېژندنه',
      objectives: 'د زده کړې موخې',
      studentLearning: 'زده کوونکي څه زده کوي',
      teachingMethod: 'درسونه څنګه وړاندې کېږي',
      premiumDescription:
        'د یوه زده کوونکي لپاره شخصي تدریس، یا د ورته کچې او موخو لرونکو دوو زده کوونکو لپاره نیمه‌خصوصي زده کړه.',
      specialOnlyTitle: 'شخصي صنف',
      groupClassTitle: 'کوچنی ډله‌ییز صنف',
      specialClassTitle: 'خصوصي یا نیمه‌خصوصي صنف',
      monthlyTuition: 'میاشتنی فیس په امریکايي ډالر',
      learningPath: 'د زده کړې وړاندیز شوی ترتیب',
      progressReport: 'والدینو ته میاشتنی پرمختګ راپور',
      completionCertificate: 'د بشپړولو سند',
      trialInformation: 'د آزمایښتي پړاو جزئیات',
      learnTitle: 'ستاسو ماشوم به څه زده کړي',
      parentGuidance: 'د والدینو لارښوونه',
      teacherPendingTitle: 'د استاد ټاکل پاتې دي',
      teacherPendingDescription:
        'زموږ د کچې ټاکلو ټیم به د زده کوونکي کچه، وخت زون او د زده کړې موخې تر ارزونې وروسته مناسب استاد وټاکي.',
      familyBenefits: 'د کورنیو لپاره ګټې',
      outcomes: 'د زده کړې پایلې',
      syllabus: 'نصاب',
      relatedEyebrow: 'اړوند',
      relatedTitle: 'د روښنايي نور کورسونه هم وګورئ.',
      notFound: 'کورس ونه موندل شو'
    },
    teachersPage: {
      eyebrow: 'استادان',
      title: 'تجربه لرونکي استادان چې له هېواده بهر افغان ماشومان درک کوي.',
      description:
        'زموږ استادان د مضمون تخصص، صبر او فرهنګي پاملرنه یوځای کوي، څو هر ماشوم د ژبې، قرآن، تجوید او میراث په زده کړه کې ملاتړ احساس کړي.',
      standards: {
        eyebrow: 'د استادانو معیارونه',
        title: 'وړ، مهربان او کورنیو ته ځواب ویونکي.',
        description:
          'د روښنايي استادان هم د مضمون د مهارت او هم د هغو ماشومانو د هڅولو وړتیا لپاره ټاکل کېږي چې ښايي شرمېږي، ګډې کچې ولري یا له میراث زده کړې لرې وي.',
        items: [
          'په څو ژبو کورنیو کې ماشومانو ته د تدریس تجربه',
          'له صنف وروسته له والدینو سره روښانه اړیکه',
          'درناوی لرونکې اصلاح او د عمر مناسب سرعت',
          'په ژبه، قرآن، تجوید یا میراث کې تخصص'
        ]
      }
    },
    pricing: {
      eyebrow: 'بیې',
      title: 'د منظمې میراث زده کړې لپاره ساده پلانونه.',
      description:
        'هغه پلان غوره کړئ چې ستاسو د ماشوم له مهالویش، کچې او موخو سره برابر وي. کورنۍ د ګروپ تر ټاکلو مخکې د کچې ټاکلو لارښوونې سره پیل کولی شي.',
      startWith: 'له {plan} سره پیل',
      included: {
        eyebrow: 'په هر پلان کې شامل',
        title: 'لوړ کیفیت ملاتړ بې له مغشوشو اضافي لګښتونو.',
        items: [
          'ژوندۍ آنلاین زده کړه له وړ استادانو سره',
          'د ماشومانو او تنکیو ځوانانو لپاره د عمر سره برابر ګروپونه',
          'د مصروفو کورنیو لپاره جوړ شوي تمرینونه',
          'د والدینو تازه معلومات، یادونې او د کچې ټاکلو ملاتړ'
        ]
      },
      faq: {
        eyebrow: 'پوښتنې',
        title: 'د پلانونو او کچې ټاکلو په اړه پوښتنې لرئ؟',
        description:
          'کورنۍ کولی شي د مناسب کورس او مهالویش تر ټاکلو مخکې له نوملیکنې یا د کچې ټاکلو خبرو سره پیل وکړي.'
      },
      plans: [
        {
          name: 'بنسټیز پلان',
          price: '$69',
          period: '/میاشت',
          description: 'د یوه ماشوم لپاره مناسب چې یو مضمون له ثابت اونیز معمول سره پیلوي.',
          features: [
            'په اونۍ کې ۱ ژوندی صنف',
            'لومړنۍ کچه ټاکنه',
            'اونیز تمریني مواد',
            'میاشتنی د والدینو د پرمختګ یادښت',
            'د صنف یادونو ته لاسرسی'
          ],
          highlighted: false
        },
        {
          name: 'ممتاز پلان',
          price: '$119',
          period: '/میاشت',
          description:
            'د هغو کورنیو لپاره مناسب چې چټک پرمختګ، قوي نظر او د ډشبورډ لید غواړي.',
          features: [
            'په اونۍ کې ۲ ژوندي صنفونه',
            'له مهمو درسونو وروسته د استاد نظر',
            'د زده کوونکي ډشبورډ او پرمختګ تعقیب',
            'میاشتنۍ د والدینو کتنه',
            'په غوره وخت زونونو کې لومړیتوب'
          ],
          highlighted: true
        },
        {
          name: 'کورنۍ پلان',
          price: '$179',
          period: '/میاشت',
          description:
            'د خویندو وروڼو یا هغو کورنیو لپاره چې ژبه، قرآن، تجوید او میراث سره یوځای کوي.',
          features: [
            'د خویندو وروڼو د کچې ټاکلو ملاتړ',
            'په مضمونونو کې انعطاف منونکی کورس ترکیب',
            'هره میاشت د کورنۍ پرمختګ اړیکه',
            'ګډه د والدینو اړیکه',
            'د اضافي ماشوم نوملیکنې تخفیف'
          ],
          highlighted: false
        }
      ]
    },
    contact: {
      eyebrow: 'اړیکه',
      title: 'زموږ د کچې ټاکلو ټیم سره خبرې وکړئ.',
      description:
        'د کورسونو، وخت زونونو، د خویندو وروڼو کچې، د قرآن لوستلو سطحې یا د خپل ماشوم لپاره د پیل غوره ځای په اړه پوښتنه وکړئ.',
      formAria: 'له روښنايي اکاډمي سره اړیکه',
      support: {
        title: 'واتساپ ملاتړ',
        text:
          'د کورس لارښوونې، شته ګروپونو او د والدینو چټکو پوښتنو لپاره زموږ د کچې ټاکلو ټیم ته پیغام واستوئ.',
        button: 'د واتساپ د کچې ټاکلو ټیم'
      },
      emailCard: {
        title: 'برېښنالیک'
      },
      timeZone: {
        title: 'د وخت زون معلومات',
        text:
          'ګروپونه د شمالي امریکا، اروپا، برېتانیا، اسټرالیا او نورو سیمو کورنیو لپاره پلانېږي. خپل هېواد او غوره صنف وخت په فورم کې ولیکئ.'
      },
      placeholders: {
        country: 'کاناډا، جرمني، اسټرالیا',
        whatsapp: '+1 555 000 0000',
        timezone: 'EST, GMT, CET, AEST',
        message: 'د خپل ماشوم عمر، کچه او مهالویش موږ ته ولیکئ.'
      },
      submitIdle: 'پیغام واستوئ',
      submitLoading: 'پیغام استول کېږي',
      success: 'مننه. زموږ ټیم به ژر درسره اړیکه ونیسي.'
    },
    register: {
      eyebrow: 'د زده کوونکي نوملیکنه',
      title: 'د خپل ماشوم د روښنايي زده کړې سفر پیل کړئ.',
      description:
        'د خپل ماشوم عمر، هېواد، د واتساپ اړیکه او د زده کړې موخې شریکې کړئ. زموږ د کچې ټاکلو ټیم به غوره کورس، کچه او مهالویش وړاندیز کړي.',
      familyEyebrow: 'د کورنۍ نوملیکنه',
      familyTitle: 'خپل ټول ماشومان د یوه کورني حساب له لارې ثبت کړئ.',
      familyDescription:
        'د والد پروفایل یو ځل جوړ کړئ، بیا د هر ماشوم زده‌کړیزې اړتیاوې، غوره کورس، د صنف بڼه او مهالویش جلا ورزیات کړئ.',
      formSteps: ['د والدینو حساب', 'د والدینو ځای', 'د زده کوونکي معلومات', 'اختیاري زده کوونکي ننوتل', 'د کورس ټاکنه', 'بل ماشوم اضافه کړئ', 'تړون او سپارل'],
      stepOf: 'پړاو {current} له {total}',
      childProfiles: '{count} د زده کوونکي پروفایلونه',
      fields: {
        parentFullName: 'د والد یا سرپرست بشپړ نوم', city: 'ښار', timezone: 'وخت زون', relationship: 'له زده کوونکي سره اړیکه',
        firstName: 'نوم', lastName: 'تخلص', gender: 'جنسیت', dateOfBirth: 'د زېږون نېټه', age: 'عمر',
        nativeLanguage: 'د کور ژبه', currentLevel: 'د زده کړې اوسنۍ کچه', courseCategory: 'د کورس څانګه',
        courseName: 'کورس', classType: 'د صنف بڼه', schedulePreference: 'غوره مهالویش'
      },
      selections: {
        timezone: 'وخت زون وټاکئ', gender: 'جنسیت وټاکئ', language: 'ژبه وټاکئ', level: 'کچه وټاکئ',
        category: 'څانګه وټاکئ', course: 'کورس وټاکئ'
      },
      review: {
        newChild: 'نوی ماشوم', agePending: 'عمر نه دی لیکل شوی', levelPending: 'کچه نه ده ټاکل شوې', coursePending: 'کورس نه دی ټاکل شوی',
        edit: 'پروفایل سم کړئ', addChild: 'بل ماشوم زیات کړئ'
      },
      agreements: {
        trialTitle: 'د دوه ورځني آزمایښتي پړاو تګلاره', trialText: 'هر نوی زده کوونکی له تادیې مخکې دوه ورځنی آزمایښتي پړاو ترلاسه کوي.',
        paymentTitle: 'د میاشتني فیس تګلاره',
        paymentText: 'هره تادیه نوملیکنه د ۳۰ ورځو لپاره فعالوي. پر وخت تمدید د زده کوونکي ریکارډ له ګډوډۍ پرته صنفي لاسرسی روان ساتي.',
        rulesTitle: 'د اکاډمۍ زده‌کړیزه هوکړه',
        rulesText: 'کورنۍ منظمې حاضري، درناوی لرونکې اړیکې، کورنۍ دندې او مناسب آنلاین صنفي چلند ته ژمنېږي.'
      },
      actions: { back: 'شاته', continue: 'دوام', submitting: 'لېږل کېږي', referralCodes: 'د زده کوونکو د معرفي کوډونه' },
      validation: {
        parent: 'مهرباني وکړئ له دوام مخکې د والد یا سرپرست معلومات بشپړ کړئ.',
        student: 'مهرباني وکړئ له دوام مخکې د دې زده کوونکي پروفایل بشپړ کړئ.',
        course: 'مهرباني وکړئ د دې ماشوم لپاره کورس، د صنف بڼه او مهالویش وټاکئ.',
        children: 'مهرباني وکړئ د تګلارو له کتلو مخکې د ټولو ماشومانو پروفایلونه بشپړ کړئ.',
        policies: 'مهرباني وکړئ د اکاډمۍ ټولې درې تګلارې ولولئ او ومنئ.'
      },
      optionLabels: {
        father: 'پلار', mother: 'مور', guardian: 'سرپرست', female: 'نجلۍ', male: 'هلک', undisclosed: 'نه غواړم ووایم',
        dari: 'دري', pashto: 'پښتو', english: 'انګلیسي', urdu: 'اردو', arabic: 'عربي', other: 'بله ژبه',
        newBeginner: 'نوی زده کوونکی', understands: 'ژبه پوهېږي او د خبرو تمرین ته اړتیا لري', beginner: 'پیل کوونکی',
        intermediate: 'منځنۍ کچه', advanced: 'لوړه کچه', group: 'ډله‌ییز صنف (۳۰ ډالر په میاشت کې)',
        special: 'خصوصي یا نیمه‌خصوصي صنف (۱۰۰ ډالر په میاشت کې)', premium: 'ځانګړی ژبنی پروګرام (۱۵۰ ډالر په میاشت کې)',
        weekdays: 'د اونۍ ورځې', weekends: 'د اونۍ پای', flexible: 'انعطاف‌منونکی'
      },
      formAria: 'د زده کوونکي نوملیکنه',
      nextTitle: 'وروسته څه کېږي؟',
      steps: [
        'موږ ستاسو د ماشوم عمر، کچه او موخې ارزونه کوو.',
        'تاسو وړاندیز شوی کورس او د ګروپ وخت ترلاسه کوئ.',
        'ستاسو ماشوم ژوندی صنف سره یوځای کېږي او پرمختګ تعقیب پیلېږي.'
      ],
      placeholders: {
        country: 'متحده ایالات، جرمني، کاناډا',
        whatsapp: '+44 7000 000000',
        preferredTime: 'د اونۍ ورځې د CET له ۵ بجو وروسته',
        notes: 'موږ ته ولیکئ چې غواړئ ماشوم مو څه زده کړي.'
      },
      submitIdle: 'نوملیکنه واستوئ',
      submitLoading: 'نوملیکنه استول کېږي',
      success: 'نوملیکنه ترلاسه شوه. موږ به ژر اړیکه ونیسو.'
    },
    login: {
      eyebrow: 'ننوتل',
      title: 'روښنايي ته بیا ښه راغلاست',
      description:
        'د ژوندیو صنفونو لینکونو، د زده کوونکي پرمختګ، دندو، سندونو او د والدینو یادښتونو ته لاسرسی ومومئ.',
      roleAccess: 'د رول له مخې خوندي لاسرسی',
      roleDescription:
        'ستاسو حساب یوازې د رول اړوند وسایل پرانیزي، څو د کورنۍ معلومات او د اکاډمۍ چارې روښانه، منظم او جلا پاتې شي.',
      signedIn: 'ننوتلي یاست',
      account: 'د {role} حساب',
      openDashboard: 'ډشبورډ پرانیزئ',
      switchAccount: 'حساب بدل کړئ',
      chooseRole: 'خپل رول وټاکئ',
      rememberRole: 'دا حساب په دې وسیله په یاد وساتئ',
      signingIn: 'ننوتل روان دي',
      loginAs: 'د {role} په توګه دوام',
      redirecting: 'ننوتل بریالي شول. ډشبورډ پرانیستل کېږي.',
      newFamily: 'نوې کورنۍ یاست؟',
      registerChildren: 'ماشومان ثبت کړئ',
      formAria: 'روښنايي اکاډمي ته ننوتل',
      forgotPassword: 'پټنوم مو هېر شوی؟',
      submitIdle: 'ننوتل',
      submitLoading: 'حساب کتل کېږي',
      success: 'ننوتل بریالي شول. ستاسو ډشبورډ چمتو دی.',
      newUser: 'روښنايي ته نوي یاست؟'
    },
    dashboard: {
      eyebrow: 'د زده کوونکي ډشبورډ',
      title: 'بیا ښه راغلې، امینه.',
      description:
        'ژوندي صنفونه، اونیز تمرین، د استاد یادښتونه، سندونه او د ژبې، قرآن او میراث پرمختګ تعقیب کړئ.',
      progressEyebrow: 'د پرمختګ تعقیب',
      currentProgress: 'د اوسنیو کورسونو پرمختګ',
      term: 'د پسرلي ترم ګروپ',
      assignmentsTitle: 'دندې',
      noAssignmentsTitle: 'اوس کومه دنده نشته',
      noAssignmentsDescription: 'نوي تمرینونه به ستاسو د راتلونکي ژوندي صنف وروسته دلته ښکاره شي.',
      recentLessonsTitle: 'وروستي درسونه',
      upcomingTitle: 'راتلونکي صنفونه',
      noUpcomingTitle: 'راتلونکی صنف نشته',
      noUpcomingDescription: 'کله چې ستاسو د ګروپ مهالویش تایید شي، راتلونکی صنف به دلته ښکاره شي.',
      certificatesTitle: 'سندونه',
      noCertificatesTitle: 'سندونه به دلته ښکاره شي',
      noCertificatesDescription:
        'کله چې امینه د کورس یوه مرحله بشپړه کړي، سندونه او د بشپړولو ریکارډونه به دلته ولیکل شي.',
      teacherNoteTitle: 'د استاد یادښت',
      teacherNote:
        'امینه په لوستلو کې په ثابت ډول ښه کېږي. مهرباني وکړئ لنډ ورځنی دري تمرین دوام ورکړئ او د راتلونکي صنف مخکې د قرآن لوستل پورته کړئ.',
      progressItems: [
        {
          title: 'د دري ژبې بنسټونه',
          subject: 'ژبه',
          percent: 68,
          next: 'د لوستلو تمرین: د کورنۍ کلمې او ورځنی معمول',
          teacher: 'مریم فراهی'
        },
        {
          title: 'د پیل کوونکو لپاره د قرآن لوستل',
          subject: 'قرآن',
          percent: 42,
          next: 'د نوراني قاعدې ۹م درس او د لنډو حرکاتو بیاکتنه',
          teacher: 'قاري ادریس'
        },
        {
          title: 'افغان کلتور او میراث',
          subject: 'میراث',
          percent: 81,
          next: 'د میراث وړاندې کولو لپاره د کورنۍ مرکې یادښتونه',
          teacher: 'لیلا سادات'
        }
      ],
      upcoming: [
        {
          course: 'د دري ژبې بنسټونه',
          time: 'سه شنبه، ۵:۰۰ ماښام GMT',
          teacher: 'مریم فراهی',
          format: 'ژوندی صنف'
        },
        {
          course: 'د پیل کوونکو لپاره د قرآن لوستل',
          time: 'پنجشنبه، ۶:۳۰ ماښام GMT',
          teacher: 'قاري ادریس',
          format: 'د تلاوت تمرین'
        }
      ],
      recentLessons: [
        {
          title: 'د دري نښتي حرفونه',
          course: 'د دري ژبې بنسټونه',
          completed: 'پرون بشپړ شو'
        },
        {
          title: 'د لنډو حرکاتو او سکون بیاکتنه',
          course: 'د پیل کوونکو لپاره د قرآن لوستل',
          completed: '۳ ورځې مخکې بشپړ شو'
        },
        {
          title: 'د افغانستان سیمې او کورنۍ ریښې',
          course: 'افغان کلتور او میراث',
          completed: 'تېره اونۍ بشپړ شو'
        }
      ],
      assignments: [
        { title: 'د قرآن لوستلو تمرین ثبت کړئ', due: 'تر پنجشنبې پورې', status: 'پرانیستی' },
        { title: 'پنځه دري جملې مور یا پلار ته ولولئ', due: 'تر جمعې پورې', status: 'پرانیستی' },
        { title: 'له نیکه یا انا څخه د کورنۍ دود وپوښتئ', due: 'تر یکشنبې پورې', status: 'مسوده' }
      ]
    },
    error: {
      eyebrow: 'د پاڼې تېروتنه',
      fallback: 'یو څه ستونزه پېښه شوه.'
    }
  }
} as const

export const getMessage = (locale: LocaleCode, path: string): unknown => {
  const read = (source: unknown) =>
    path.split('.').reduce<unknown>((value, key) => {
      if (value && typeof value === 'object' && key in value) {
        return (value as Record<string, unknown>)[key]
      }

      return undefined
    }, source)

  return read(messages[locale]) ?? read(messages[defaultLocale])
}
