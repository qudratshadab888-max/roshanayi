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
        progress: 'progress'
      },
      categories: {
        all: 'All',
        dari: 'Dari Language',
        pashto: 'Pashto Language',
        quran: 'Quran Reading',
        tajweed: 'Tajweed',
        heritage: 'Afghan Culture & Heritage',
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
          'Learn Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage through live online classes for Afghan families abroad.',
        ogDescription:
          'Premium online classes for Afghan children abroad in Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage.'
      },
      about: {
        title: 'About',
        description:
          'Learn about the mission, vision, and story behind Roshanayi Academy, a global online academy for Afghan children abroad.'
      },
      courses: {
        title: 'Courses',
        description:
          'Browse Roshanayi Academy courses in Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage for children abroad.'
      },
      teachers: {
        title: 'Teachers',
        description:
          'Meet Roshanayi Academy teachers for Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage courses.'
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
          'Register your child for Roshanayi Academy online classes in Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage.'
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
          'Premium online classes for Afghan children abroad, built around Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage.',
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
        'Roshanayi Academy gives Afghan children in Europe, America, Canada, Australia, and beyond a structured path to learn Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage with caring teachers and parent-visible progress.',
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
        'Each course combines live instruction, family practice, and visible outcomes so parents can understand exactly what their child is learning.'
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
          text: 'Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage.'
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
      dashboardButton: 'View sample dashboard',
      sampleLearner: 'Sample learner',
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
            'Teach Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage to Afghan children abroad through live classes, structured curriculum, and caring teacher support.'
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
      title: 'Choose the right learning path for your child.',
      description:
        'Browse live online courses in Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage. Every course includes clear outcomes, parent-visible progress, and time-zone aware cohorts.',
      searchLabel: 'Search courses',
      searchPlaceholder: 'Search by subject, age group, benefit, or level',
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
      formAria: 'Login to Roshanayi Academy',
      forgotPassword: 'Forgot password?',
      submitIdle: 'Login',
      submitLoading: 'Checking account',
      success: 'Demo login submitted. In production this connects to authentication.',
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
        progress: 'پیشرفت'
      },
      categories: {
        all: 'همه',
        dari: 'زبان دری',
        pashto: 'زبان پشتو',
        quran: 'روخوانی قرآن',
        tajweed: 'تجوید',
        heritage: 'فرهنگ و میراث افغانستان',
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
      dashboardButton: 'دیدن داشبورد نمونه',
      sampleLearner: 'شاگرد نمونه',
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
      title: 'مسیر یادگیری مناسب کودک خود را انتخاب کنید.',
      description:
        'دوره‌های آنلاین زنده در دری، پشتو، روخوانی قرآن، تجوید و فرهنگ افغانستان را ببینید. هر دوره نتیجه‌های روشن، پیشرفت قابل دید برای والدین و گروه‌های سازگار با مناطق زمانی دارد.',
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
      formAria: 'ورود به آکادمی روشنایی',
      forgotPassword: 'رمز عبور را فراموش کرده‌اید؟',
      submitIdle: 'ورود',
      submitLoading: 'در حال بررسی حساب',
      success: 'ورود آزمایشی فرستاده شد. در نسخه اصلی به سیستم احراز هویت وصل می‌شود.',
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
        progress: 'پرمختګ'
      },
      categories: {
        all: 'ټول',
        dari: 'دري ژبه',
        pashto: 'پښتو ژبه',
        quran: 'د قرآن لوستل',
        tajweed: 'تجوید',
        heritage: 'افغان کلتور او میراث',
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
      dashboardButton: 'نمونه ډشبورډ وګورئ',
      sampleLearner: 'نمونه زده کوونکی',
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
      title: 'د خپل ماشوم لپاره مناسب زده کړې مسیر غوره کړئ.',
      description:
        'په دري، پښتو، د قرآن لوستلو، تجوید او افغان کلتور کې ژوندي آنلاین کورسونه وګورئ. هر کورس روښانه پایلې، د والدینو لپاره ښکاره پرمختګ او د وخت زون سره برابر ګروپونه لري.',
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
      formAria: 'روښنايي اکاډمي ته ننوتل',
      forgotPassword: 'پټنوم مو هېر شوی؟',
      submitIdle: 'ننوتل',
      submitLoading: 'حساب کتل کېږي',
      success: 'ازمایښتي ننوتل واستول شول. په تولید کې دا د تصدیق سیستم سره نښلېږي.',
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
