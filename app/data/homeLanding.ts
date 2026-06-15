import { defaultLocale, type LocaleCode } from '~/i18n/messages'
import type { FaqItem, Testimonial } from '~/types'

type TextBlock = {
  eyebrow: string
  title: string
  description: string
}

type Card = {
  title: string
  text: string
}

type DashboardCard = Card & {
  value: string
}

export type HomeLandingCopy = {
  seo: {
    title: string
    ogTitle: string
    description: string
    ogDescription: string
  }
  whatsappMessage: string
  hero: TextBlock & {
    primaryAction: string
    secondaryAction: string
    badges: string[]
  }
  trust: TextBlock & {
    reasons: Card[]
  }
  registration: TextBlock & {
    steps: string[]
  }
  safety: TextBlock & {
    rules: string[]
    cardEyebrow: string
    cardTitle: string
    cardDescription: string
    metrics: Array<{ value: string; label: string }>
  }
  programs: TextBlock & {
    itemEyebrow: string
    items: Card[]
  }
  dashboard: TextBlock & {
    profileLabel: string
    profileName: string
    activeLabel: string
    cards: DashboardCard[]
  }
  testimonials: TextBlock & {
    items: Testimonial[]
  }
  faq: TextBlock & {
    items: FaqItem[]
  }
  cta: TextBlock & {
    primaryAction: string
    secondaryAction: string
  }
}

const homeLandingCopy: Record<LocaleCode, HomeLandingCopy> = {
  en: {
    seo: {
      title: 'Dari, Pashto, Quran & English Classes',
      ogTitle: 'Roshanayi Academy | Trusted online classes for Afghan children',
      description:
        'Live online Dari, Pashto, Quran, Tajweed, Islamic Basics, English, and Afghan heritage classes for Afghan children worldwide with trial classes and parent progress reports.',
      ogDescription:
        'Register your child for live online classes with two trial classes before payment, safe communication, and parent progress tracking.'
    },
    whatsappMessage:
      'Hello Roshanayi Academy, I want to ask about classes for my child.',
    hero: {
      eyebrow: 'Trusted online learning for Afghan families abroad',
      title: 'Dari, Pashto, Quran & English Classes for Afghan Children Worldwide',
      description:
        'Live online classes with structured learning, parent progress reports, and two trial classes before payment.',
      primaryAction: 'Register Your Child',
      secondaryAction: 'Contact on WhatsApp',
      badges: [
        'Two Trial Classes',
        'Parent Reports',
        'Safe Communication',
        'Qualified Teachers',
        'Flexible Time Zones'
      ]
    },
    trust: {
      eyebrow: 'Why Parents Trust Roshanayi Academy',
      title: 'Clear rules, caring teachers, and visible progress for families.',
      description:
        'Parents abroad need more than a tutor. They need a safe, organized academy system that protects communication, payments, and student progress.',
      reasons: [
        {
          title: 'Two trial classes before payment',
          text:
            'Families can see the teacher, schedule, and learning style before confirming enrollment.'
        },
        {
          title: 'Small group classes',
          text:
            'Children receive attention, correction, and speaking time without feeling lost in a large class.'
        },
        {
          title: 'Progress tracking for parents',
          text:
            'Parents can follow attendance, progress notes, next class details, and teacher feedback.'
        },
        {
          title: 'Teacher supervision by academy admin',
          text:
            'Teachers work inside the academy system, with class activity and student progress reviewed.'
        },
        {
          title: 'Safe communication policy',
          text:
            'Parent contact details and student records are handled carefully through academy channels.'
        },
        {
          title: 'Organized fee/payment system',
          text:
            'Payments are tracked by Roshanayi Academy so families have clear confirmation and records.'
        }
      ]
    },
    registration: {
      eyebrow: 'How Registration Works',
      title: 'A simple path from registration to regular classes.',
      description:
        'Parents know what happens next at every stage, from first form submission to ongoing progress tracking.',
      steps: [
        'Parent submits registration form',
        'Academy reviews student level and schedule',
        'Student joins two trial classes',
        'Parent confirms enrollment and payment',
        'Student continues with progress tracking'
      ]
    },
    safety: {
      eyebrow: 'Safe Learning System',
      title: 'Built to prevent payment confusion and keep learning accountable.',
      description:
        'Roshanayi Academy keeps teacher communication, attendance, student records, and fee confirmation organized through the academy system.',
      rules: [
        'Teachers cannot collect fees directly',
        'Payments are tracked through the academy',
        'Parents receive payment confirmation',
        'Attendance is recorded',
        'Student progress is reviewed regularly'
      ],
      cardEyebrow: 'Academy Control',
      cardTitle: 'Payments stay with Roshanayi Academy.',
      cardDescription:
        'Teachers are responsible for teaching and attendance. Payment confirmation, records, and parent support stay with the academy admin team.',
      metrics: [
        { value: '2', label: 'trial classes before payment' },
        { value: '100%', label: 'academy payment tracking' }
      ]
    },
    programs: {
      eyebrow: 'Programs',
      title: 'Core classes for language, Quran, faith, English, and Afghan identity.',
      description:
        'Families can begin with one course, then add more subjects as the child grows in confidence.',
      itemEyebrow: 'Roshanayi Program',
      items: [
        {
          title: 'Dari for Afghan Children',
          text: 'Reading, speaking, writing, and confidence for heritage learners.'
        },
        {
          title: 'Pashto for Afghan Children',
          text: 'Conversation, alphabet, family vocabulary, and cultural connection.'
        },
        {
          title: 'Quran Reading',
          text: 'Arabic letters, joining rules, vowels, and guided reading practice.'
        },
        {
          title: 'Tajweed',
          text: 'Makharij, pronunciation, madd, stopping rules, and careful correction.'
        },
        {
          title: 'Islamic Basics',
          text: 'Age-appropriate duas, manners, stories, and daily Islamic foundations.'
        },
        {
          title: 'English Classes',
          text: 'Practical reading, speaking, writing, and confidence for all levels.'
        },
        {
          title: 'Farsi/Dari for English Speakers',
          text: 'A bridge course for children who mainly speak English at home.'
        },
        {
          title: 'Afghan Culture & Heritage',
          text: 'Stories, values, geography, poetry, celebrations, and family identity.'
        }
      ]
    },
    dashboard: {
      eyebrow: 'Parent Dashboard Preview',
      title: 'Parents can understand what is happening without chasing updates.',
      description:
        'The Phase 1 academy system is designed around simple parent visibility: class attendance, payment clarity, upcoming schedule, progress, and teacher notes.',
      profileLabel: 'Sample child profile',
      profileName: 'Amina, age 9',
      activeLabel: 'Active',
      cards: [
        {
          title: 'Attendance',
          value: 'Present: 7 / 8',
          text: 'Parents can see attendance history and missed classes.'
        },
        {
          title: 'Payment status',
          value: 'June: Paid',
          text: 'Clear monthly fee status with academy confirmation.'
        },
        {
          title: 'Upcoming class',
          value: 'Thursday, 6:30 PM',
          text: 'Next lesson time and course details in one place.'
        },
        {
          title: 'Progress report',
          value: '72% progress',
          text: 'Simple progress notes help parents support practice.'
        },
        {
          title: 'Teacher notes',
          value: 'Practice reading aloud',
          text: 'Teachers share short, practical feedback after class.'
        }
      ]
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What Afghan parents abroad say about Roshanayi.',
      description:
        'These placeholder stories reflect the experience Roshanayi Academy is designed to provide: trust, structure, and steady progress.',
      items: [
        {
          name: 'Farzana Amini',
          location: 'California, United States',
          quote:
            'The two trial classes helped us feel comfortable before paying. My daughter now reads short Dari sentences and we receive clear progress notes.',
          result: 'Parent of a Dari student'
        },
        {
          name: 'Hamid Karimi',
          location: 'Ontario, Canada',
          quote:
            'I like that payments go through the academy, not directly to teachers. It feels organized and safer for parents living abroad.',
          result: 'Parent of a Quran Reading student'
        },
        {
          name: 'Zahra Noori',
          location: 'Melbourne, Australia',
          quote:
            'Roshanayi understands Afghan families outside Afghanistan. The time zones, teacher notes, and small classes make it easy for our children to continue.',
          result: 'Parent in the family program'
        }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions from Afghan parents.',
      description:
        'Clear answers about trial classes, payment, countries, subjects, progress tracking, and teacher payment rules.',
      items: [
        {
          question: 'Do you offer trial classes?',
          answer:
            'Yes. New students can attend two trial classes before payment, so parents can review the teacher, class style, and schedule first.'
        },
        {
          question: 'How do parents pay?',
          answer:
            'Parents pay through the academy process after the trial period. Payment status and confirmation are tracked by Roshanayi Academy.'
        },
        {
          question: 'Can my child join from any country?',
          answer:
            'Yes. Classes are online and planned for families in North America, Europe, the UK, Australia, and other time zones.'
        },
        {
          question: 'Do you teach English too?',
          answer:
            'Yes. Roshanayi Academy offers English classes for different levels, alongside Dari, Pashto, Quran, Tajweed, and heritage programs.'
        },
        {
          question: 'Do you teach Farsi/Dari to English speakers?',
          answer:
            'Yes. We offer Farsi/Dari for English-speaking children and families who want a gentle bridge into Dari language learning.'
        },
        {
          question: 'How do parents track progress?',
          answer:
            'Parents can review attendance, payment status, upcoming classes, teacher notes, and progress reports in the academy system.'
        },
        {
          question: 'Are teachers allowed to take private payments?',
          answer:
            'No. Teachers cannot collect fees directly. Payments are handled and confirmed through Roshanayi Academy to keep records clear and safe.'
        }
      ]
    },
    cta: {
      eyebrow: 'Ready to begin?',
      title: 'Start with two trial classes before payment.',
      description:
        'Register your child today, or ask our team on WhatsApp about the right course, level, and time zone.',
      primaryAction: 'Register Now',
      secondaryAction: 'Ask on WhatsApp'
    }
  },
  fa: {
    seo: {
      title: 'صنف‌های دری، پشتو، قرآن و انگلیسی',
      ogTitle: 'آکادمی روشنایی | صنف‌های آنلاین قابل اعتماد برای کودکان افغان',
      description:
        'صنف‌های آنلاین زنده دری، پشتو، قرآن، تجوید، مبانی اسلامی، انگلیسی و میراث افغان برای کودکان افغان در سراسر جهان، همراه با صنف‌های آزمایشی و گزارش پیشرفت والدین.',
      ogDescription:
        'کودک خود را برای صنف‌های آنلاین زنده ثبت‌نام کنید؛ با دو صنف آزمایشی پیش از پرداخت، ارتباط امن و پیگیری پیشرفت برای والدین.'
    },
    whatsappMessage:
      'سلام آکادمی روشنایی، می‌خواهم درباره صنف‌های کودک خود معلومات بگیرم.',
    hero: {
      eyebrow: 'آموزش آنلاین قابل اعتماد برای خانواده‌های افغان بیرون از کشور',
      title: 'صنف‌های دری، پشتو، قرآن و انگلیسی برای کودکان افغان در سراسر جهان',
      description:
        'صنف‌های آنلاین زنده با آموزش منظم، گزارش پیشرفت برای والدین و دو صنف آزمایشی پیش از پرداخت.',
      primaryAction: 'ثبت‌نام کودک',
      secondaryAction: 'تماس در واتساپ',
      badges: [
        'دو صنف آزمایشی',
        'گزارش والدین',
        'ارتباط امن',
        'استادان واجد شرایط',
        'وقت‌های انعطاف‌پذیر'
      ]
    },
    trust: {
      eyebrow: 'چرا والدین به آکادمی روشنایی اعتماد می‌کنند',
      title: 'قوانین روشن، استادان دلسوز و پیشرفت قابل دید برای خانواده‌ها.',
      description:
        'والدین بیرون از کشور به چیزی بیشتر از یک معلم خصوصی نیاز دارند؛ یک سیستم امن و منظم که ارتباط، پرداخت‌ها و پیشرفت شاگرد را محافظت کند.',
      reasons: [
        {
          title: 'دو صنف آزمایشی پیش از پرداخت',
          text:
            'خانواده‌ها می‌توانند استاد، برنامه و روش آموزش را پیش از تایید ثبت‌نام ببینند.'
        },
        {
          title: 'صنف‌های کوچک گروهی',
          text:
            'کودکان توجه، اصلاح و وقت صحبت دریافت می‌کنند و در صنف بزرگ گم نمی‌شوند.'
        },
        {
          title: 'پیگیری پیشرفت برای والدین',
          text:
            'والدین می‌توانند حاضری، یادداشت‌های پیشرفت، جزئیات صنف بعدی و بازخورد استاد را دنبال کنند.'
        },
        {
          title: 'نظارت اداری بر استادان',
          text:
            'استادان در سیستم آکادمی کار می‌کنند و فعالیت صنف و پیشرفت شاگرد بررسی می‌شود.'
        },
        {
          title: 'سیاست ارتباط امن',
          text:
            'معلومات تماس والدین و رکوردهای شاگردان از راه کانال‌های آکادمی با دقت مدیریت می‌شود.'
        },
        {
          title: 'سیستم منظم فیس و پرداخت',
          text:
            'پرداخت‌ها توسط آکادمی روشنایی پیگیری می‌شود تا خانواده‌ها تایید و رکورد روشن داشته باشند.'
        }
      ]
    },
    registration: {
      eyebrow: 'ثبت‌نام چگونه پیش می‌رود',
      title: 'یک مسیر ساده از ثبت‌نام تا صنف‌های منظم.',
      description:
        'والدین در هر مرحله می‌دانند بعد چه می‌شود؛ از فرستادن فرم تا پیگیری دوامدار پیشرفت.',
      steps: [
        'والد فرم ثبت‌نام را می‌فرستد',
        'آکادمی سطح و برنامه شاگرد را بررسی می‌کند',
        'شاگرد در دو صنف آزمایشی شرکت می‌کند',
        'والد ثبت‌نام و پرداخت را تایید می‌کند',
        'شاگرد با پیگیری پیشرفت ادامه می‌دهد'
      ]
    },
    safety: {
      eyebrow: 'سیستم آموزش امن',
      title: 'برای جلوگیری از سردرگمی پرداخت و پاسخگو نگه‌داشتن آموزش ساخته شده است.',
      description:
        'آکادمی روشنایی ارتباط استاد، حاضری، رکوردهای شاگرد و تایید فیس را از راه سیستم آکادمی منظم نگه می‌دارد.',
      rules: [
        'استادان نمی‌توانند مستقیماً فیس بگیرند',
        'پرداخت‌ها از راه آکادمی پیگیری می‌شود',
        'والدین تایید پرداخت دریافت می‌کنند',
        'حاضری ثبت می‌شود',
        'پیشرفت شاگرد به‌طور منظم بررسی می‌شود'
      ],
      cardEyebrow: 'کنترول آکادمی',
      cardTitle: 'پرداخت‌ها نزد آکادمی روشنایی باقی می‌ماند.',
      cardDescription:
        'مسوولیت استادان تدریس و حاضری است. تایید پرداخت، رکوردها و پشتیبانی والدین نزد تیم اداری آکادمی می‌ماند.',
      metrics: [
        { value: '2', label: 'صنف آزمایشی پیش از پرداخت' },
        { value: '100%', label: 'پیگیری پرداخت توسط آکادمی' }
      ]
    },
    programs: {
      eyebrow: 'برنامه‌ها',
      title: 'صنف‌های اصلی برای زبان، قرآن، ایمان، انگلیسی و هویت افغان.',
      description:
        'خانواده‌ها می‌توانند با یک دوره آغاز کنند و با افزایش اعتماد کودک، مضمون‌های دیگر را اضافه کنند.',
      itemEyebrow: 'برنامه روشنایی',
      items: [
        {
          title: 'دری برای کودکان افغان',
          text: 'خواندن، صحبت، نوشتن و اعتماد برای شاگردان میراثی.'
        },
        {
          title: 'پشتو برای کودکان افغان',
          text: 'گفت‌وگو، الفبا، واژه‌های خانواده و پیوند فرهنگی.'
        },
        {
          title: 'روخوانی قرآن',
          text: 'حروف عربی، قواعد وصل، حرکت‌ها و تمرین خواندن راهنمایی‌شده.'
        },
        {
          title: 'تجوید',
          text: 'مخارج، تلفظ، مد، قواعد وقف و اصلاح دقیق.'
        },
        {
          title: 'مبانی اسلامی',
          text: 'دعاها، آداب، داستان‌ها و بنیادهای روزمره اسلامی مناسب سن.'
        },
        {
          title: 'صنف‌های انگلیسی',
          text: 'خواندن، صحبت، نوشتن و اعتماد عملی برای همه سطح‌ها.'
        },
        {
          title: 'فارسی/دری برای انگلیسی‌زبانان',
          text: 'یک دوره پل‌ساز برای کودکانی که بیشتر در خانه انگلیسی صحبت می‌کنند.'
        },
        {
          title: 'فرهنگ و میراث افغانستان',
          text: 'داستان‌ها، ارزش‌ها، جغرافیا، شعر، جشن‌ها و هویت خانوادگی.'
        }
      ]
    },
    dashboard: {
      eyebrow: 'نمایش داشبورد والدین',
      title: 'والدین بدون دنبال‌کردن پیام‌های پراکنده می‌فهمند چه جریان دارد.',
      description:
        'سیستم مرحله اول آکادمی برای دید ساده والدین ساخته شده است: حاضری صنف، وضاحت پرداخت، برنامه آینده، پیشرفت و یادداشت استاد.',
      profileLabel: 'نمونه پروفایل کودک',
      profileName: 'آمینه، ۹ ساله',
      activeLabel: 'فعال',
      cards: [
        {
          title: 'حاضری',
          value: 'حاضر: ۷ / ۸',
          text: 'والدین می‌توانند تاریخچه حاضری و صنف‌های از دست‌رفته را ببینند.'
        },
        {
          title: 'وضعیت پرداخت',
          value: 'جون: پرداخت شده',
          text: 'وضعیت روشن فیس ماهانه همراه با تایید آکادمی.'
        },
        {
          title: 'صنف آینده',
          value: 'پنجشنبه، ۶:۳۰ شام',
          text: 'وقت درس بعدی و جزئیات دوره در یک جای مشخص.'
        },
        {
          title: 'گزارش پیشرفت',
          value: '۷۲٪ پیشرفت',
          text: 'یادداشت‌های ساده پیشرفت به والدین کمک می‌کند تمرین را پشتیبانی کنند.'
        },
        {
          title: 'یادداشت استاد',
          value: 'خواندن با صدای بلند را تمرین کند',
          text: 'استادان پس از صنف بازخورد کوتاه و عملی شریک می‌کنند.'
        }
      ]
    },
    testimonials: {
      eyebrow: 'نظر والدین',
      title: 'والدین افغان بیرون از کشور درباره روشنایی چه می‌گویند.',
      description:
        'این داستان‌های نمونه تجربه‌ای را نشان می‌دهد که روشنایی برای آن طراحی شده است: اعتماد، نظم و پیشرفت پایدار.',
      items: [
        {
          name: 'فرزانه امینی',
          location: 'کالیفرنیا، ایالات متحده',
          quote:
            'دو صنف آزمایشی باعث شد پیش از پرداخت آرامش خاطر داشته باشیم. دخترم حالا جمله‌های کوتاه دری می‌خواند و ما یادداشت‌های روشن پیشرفت دریافت می‌کنیم.',
          result: 'والد شاگرد دری'
        },
        {
          name: 'حمید کریمی',
          location: 'انتاریو، کانادا',
          quote:
            'خوشم می‌آید که پرداخت‌ها از راه آکادمی انجام می‌شود، نه مستقیم به استاد. برای والدین بیرون از کشور منظم‌تر و امن‌تر احساس می‌شود.',
          result: 'والد شاگرد روخوانی قرآن'
        },
        {
          name: 'زهرا نوری',
          location: 'ملبورن، آسترالیا',
          quote:
            'روشنایی خانواده‌های افغان بیرون از افغانستان را می‌فهمد. وقت‌های صنف، یادداشت‌های استاد و صنف‌های کوچک ادامه یادگیری را برای کودکان ما آسان ساخته است.',
          result: 'والد در برنامه خانوادگی'
        }
      ]
    },
    faq: {
      eyebrow: 'پرسش‌ها',
      title: 'پرسش‌های رایج والدین افغان.',
      description:
        'پاسخ‌های روشن درباره صنف‌های آزمایشی، پرداخت، کشورها، مضمون‌ها، پیگیری پیشرفت و قوانین پرداخت استادان.',
      items: [
        {
          question: 'آیا صنف آزمایشی دارید؟',
          answer:
            'بله. شاگردان تازه می‌توانند پیش از پرداخت در دو صنف آزمایشی شرکت کنند تا والدین اول استاد، روش صنف و برنامه را بررسی کنند.'
        },
        {
          question: 'والدین چگونه پرداخت می‌کنند؟',
          answer:
            'والدین پس از دوره آزمایشی از راه روند آکادمی پرداخت می‌کنند. وضعیت و تایید پرداخت توسط آکادمی روشنایی پیگیری می‌شود.'
        },
        {
          question: 'آیا کودک من از هر کشور می‌تواند شرکت کند؟',
          answer:
            'بله. صنف‌ها آنلاین است و برای خانواده‌ها در امریکای شمالی، اروپا، بریتانیا، آسترالیا و مناطق زمانی دیگر برنامه‌ریزی می‌شود.'
        },
        {
          question: 'آیا انگلیسی هم تدریس می‌کنید؟',
          answer:
            'بله. آکادمی روشنایی در کنار دری، پشتو، قرآن، تجوید و میراث، صنف‌های انگلیسی برای سطح‌های مختلف دارد.'
        },
        {
          question: 'آیا فارسی/دری را به انگلیسی‌زبانان یاد می‌دهید؟',
          answer:
            'بله. ما برای کودکان و خانواده‌های انگلیسی‌زبان که می‌خواهند آرام وارد یادگیری دری شوند، دوره فارسی/دری داریم.'
        },
        {
          question: 'والدین چگونه پیشرفت را دنبال می‌کنند؟',
          answer:
            'والدین می‌توانند حاضری، وضعیت پرداخت، صنف‌های آینده، یادداشت‌های استاد و گزارش پیشرفت را در سیستم آکادمی ببینند.'
        },
        {
          question: 'آیا استادان اجازه گرفتن پرداخت خصوصی دارند؟',
          answer:
            'نه. استادان نمی‌توانند مستقیماً فیس بگیرند. پرداخت‌ها از راه آکادمی روشنایی مدیریت و تایید می‌شود تا رکوردها روشن و امن بماند.'
        }
      ]
    },
    cta: {
      eyebrow: 'آماده آغاز هستید؟',
      title: 'با دو صنف آزمایشی پیش از پرداخت شروع کنید.',
      description:
        'امروز کودک خود را ثبت‌نام کنید، یا از تیم ما در واتساپ درباره دوره، سطح و منطقه زمانی مناسب بپرسید.',
      primaryAction: 'ثبت‌نام اکنون',
      secondaryAction: 'پرسش در واتساپ'
    }
  },
  ps: {
    seo: {
      title: 'دري، پښتو، قرآن او انګلیسي صنفونه',
      ogTitle: 'روښنايي اکاډمي | د افغان ماشومانو لپاره باوري آنلاین صنفونه',
      description:
        'دري، پښتو، قرآن، تجوید، اسلامي بنسټونه، انګلیسي او افغان میراث لپاره ژوندۍ آنلاین صنفونه، له آزمایښتي صنفونو او د والدینو پرمختګ راپورونو سره.',
      ogDescription:
        'خپل ماشوم ژوندیو آنلاین صنفونو ته ثبت کړئ؛ له تادیې مخکې دوه آزمایښتي صنفونه، خوندي اړیکه او د والدینو لپاره د پرمختګ تعقیب.'
    },
    whatsappMessage:
      'سلام روښنايي اکاډمي، زه غواړم د خپل ماشوم د صنفونو په اړه پوښتنه وکړم.',
    hero: {
      eyebrow: 'له هېواده بهر افغان کورنیو لپاره باوري آنلاین زده کړه',
      title: 'په ټوله نړۍ کې د افغان ماشومانو لپاره دري، پښتو، قرآن او انګلیسي صنفونه',
      description:
        'ژوندي آنلاین صنفونه له منظمې زده کړې، د والدینو پرمختګ راپورونو او له تادیې مخکې دوه آزمایښتي صنفونو سره.',
      primaryAction: 'د ماشوم نوملیکنه',
      secondaryAction: 'په واتساپ اړیکه',
      badges: [
        'دوه آزمایښتي صنفونه',
        'د والدینو راپورونه',
        'خوندي اړیکه',
        'وړ استادان',
        'انعطاف منونکي وختونه'
      ]
    },
    trust: {
      eyebrow: 'ولې والدین پر روښنايي اکاډمي باور کوي',
      title: 'روښانه اصول، مهربان استادان او کورنیو ته ښکاره پرمختګ.',
      description:
        'له هېواده بهر والدین له یو خصوصي ښوونکي څخه زیات څه غواړي؛ یو خوندي او منظم اکاډمي سیستم چې اړیکه، تادیات او د زده کوونکي پرمختګ وساتي.',
      reasons: [
        {
          title: 'له تادیې مخکې دوه آزمایښتي صنفونه',
          text:
            'کورنۍ د نوملیکنې له تایید مخکې استاد، مهالویش او د زده کړې طریقه لیدلی شي.'
        },
        {
          title: 'کوچني ګروپي صنفونه',
          text:
            'ماشومان پاملرنه، اصلاح او د خبرو وخت ترلاسه کوي او په لوی صنف کې نه ورکېږي.'
        },
        {
          title: 'د والدینو لپاره د پرمختګ تعقیب',
          text:
            'والدین حاضري، د پرمختګ یادښتونه، د راتلونکي صنف جزئیات او د استاد نظر لیدلی شي.'
        },
        {
          title: 'د اکاډمي له خوا د استادانو څارنه',
          text:
            'استادان د اکاډمي په سیستم کې کار کوي او د صنف فعالیت او د زده کوونکي پرمختګ ارزول کېږي.'
        },
        {
          title: 'د خوندي اړیکې پالیسي',
          text:
            'د والدینو د اړیکې معلومات او د زده کوونکو ریکارډونه د اکاډمي له چینلونو په دقت ساتل کېږي.'
        },
        {
          title: 'منظم فیس او تادیه سیستم',
          text:
            'تادیات د روښنايي اکاډمي له لارې تعقیبېږي، څو کورنۍ روښانه تایید او ریکارډ ولري.'
        }
      ]
    },
    registration: {
      eyebrow: 'نوملیکنه څنګه کار کوي',
      title: 'له نوملیکنې څخه تر منظم صنفونو پورې ساده مسیر.',
      description:
        'والدین په هر پړاو کې پوهېږي چې وروسته څه کېږي؛ له لومړي فارم څخه تر دوامداره پرمختګ تعقیب پورې.',
      steps: [
        'والد د نوملیکنې فارم استوي',
        'اکاډمي د زده کوونکي کچه او مهالویش ارزوي',
        'زده کوونکی دوه آزمایښتي صنفونو ته ځي',
        'والد نوملیکنه او تادیه تاییدوي',
        'زده کوونکی د پرمختګ له تعقیب سره دوام ورکوي'
      ]
    },
    safety: {
      eyebrow: 'خوندي زده کړې سیستم',
      title: 'د تادیې د ګډوډۍ مخنیوي او د زده کړې د حساب ورکولو لپاره جوړ شوی.',
      description:
        'روښنايي اکاډمي د استاد اړیکه، حاضري، د زده کوونکي ریکارډونه او د فیس تایید د اکاډمي په سیستم کې منظم ساتي.',
      rules: [
        'استادان مستقیم فیس نه شي اخیستلی',
        'تادیات د اکاډمي له لارې تعقیبېږي',
        'والدین د تادیې تایید ترلاسه کوي',
        'حاضري ثبتېږي',
        'د زده کوونکي پرمختګ په منظم ډول ارزول کېږي'
      ],
      cardEyebrow: 'د اکاډمي کنټرول',
      cardTitle: 'تادیات له روښنايي اکاډمي سره پاتې کېږي.',
      cardDescription:
        'استادان د تدریس او حاضري مسوولیت لري. د تادیې تایید، ریکارډونه او د والدینو ملاتړ د اکاډمي له اداري ټیم سره پاتې کېږي.',
      metrics: [
        { value: '2', label: 'له تادیې مخکې آزمایښتي صنفونه' },
        { value: '100%', label: 'د اکاډمي له خوا د تادیې تعقیب' }
      ]
    },
    programs: {
      eyebrow: 'پروګرامونه',
      title: 'د ژبې، قرآن، ایمان، انګلیسي او افغان هویت لپاره اصلي صنفونه.',
      description:
        'کورنۍ له یو کورس څخه پیل کولی شي او د ماشوم د باور له زیاتېدو سره نور مضمونونه ورزیاتولی شي.',
      itemEyebrow: 'د روښنايي پروګرام',
      items: [
        {
          title: 'د افغان ماشومانو لپاره دري',
          text: 'لوستل، خبرې، لیکل او د میراث زده کوونکو لپاره باور.'
        },
        {
          title: 'د افغان ماشومانو لپاره پښتو',
          text: 'خبرې، الفبا، د کورنۍ کلمې او فرهنګي تړاو.'
        },
        {
          title: 'د قرآن لوستل',
          text: 'عربي توري، د نښلولو قواعد، حرکتونه او لارښود شوی لوستل.'
        },
        {
          title: 'تجوید',
          text: 'مخارج، تلفظ، مد، د وقف قواعد او دقیق اصلاح.'
        },
        {
          title: 'اسلامي بنسټونه',
          text: 'د عمر سره برابر دعاګانې، آداب، کیسې او ورځني اسلامي بنسټونه.'
        },
        {
          title: 'انګلیسي صنفونه',
          text: 'عملي لوستل، خبرې، لیکل او د ټولو کچو لپاره باور.'
        },
        {
          title: 'فارسي/دري د انګلیسي ویونکو لپاره',
          text: 'د هغو ماشومانو لپاره پُل جوړوونکی کورس چې په کور کې زیات انګلیسي وایي.'
        },
        {
          title: 'افغان کلتور او میراث',
          text: 'کیسې، ارزښتونه، جغرافیه، شعر، جشنونه او کورنی هویت.'
        }
      ]
    },
    dashboard: {
      eyebrow: 'د والدینو ډشبورډ نمونه',
      title: 'والدین بې له پرله‌پسې پوښتنو پوهېږي چې څه روان دي.',
      description:
        'د اکاډمي د لومړي پړاو سیستم د والدینو د ساده لید لپاره جوړ شوی: د صنف حاضري، د تادیې روښانتیا، راتلونکی مهالویش، پرمختګ او د استاد یادښتونه.',
      profileLabel: 'د ماشوم نمونه پروفایل',
      profileName: 'امینه، ۹ کلنه',
      activeLabel: 'فعال',
      cards: [
        {
          title: 'حاضري',
          value: 'حاضر: ۷ / ۸',
          text: 'والدین د حاضري تاریخچه او پاتې شوي صنفونه لیدلی شي.'
        },
        {
          title: 'د تادیې حالت',
          value: 'جون: تادیه شوی',
          text: 'د اکاډمي له تایید سره روښانه میاشتنی فیس حالت.'
        },
        {
          title: 'راتلونکی صنف',
          value: 'پنجشنبه، ۶:۳۰ ماښام',
          text: 'د راتلونکي درس وخت او د کورس جزئیات په یوه ځای کې.'
        },
        {
          title: 'د پرمختګ راپور',
          value: '۷۲٪ پرمختګ',
          text: 'ساده پرمختګ یادښتونه له والدینو سره د تمرین په ملاتړ کې مرسته کوي.'
        },
        {
          title: 'د استاد یادښتونه',
          value: 'په لوړ غږ لوستل تمرین کړئ',
          text: 'استادان له صنف وروسته لنډ او عملي نظر شریکوي.'
        }
      ]
    },
    testimonials: {
      eyebrow: 'د والدینو نظرونه',
      title: 'له هېواده بهر افغان والدین د روښنايي په اړه څه وایي.',
      description:
        'دا نمونه کیسې هغه تجربه ښيي چې روښنايي اکاډمي یې د ورکولو لپاره جوړه شوې ده: باور، نظم او دوامداره پرمختګ.',
      items: [
        {
          name: 'فرزانه امیني',
          location: 'کالیفورنیا، متحده ایالات',
          quote:
            'دوو آزمایښتي صنفونو له تادیې مخکې موږ ته ډاډ راکړ. زما لور اوس لنډې دري جملې لولي او موږ روښانه پرمختګ یادښتونه ترلاسه کوو.',
          result: 'د دري زده کوونکي والد'
        },
        {
          name: 'حمید کریمي',
          location: 'اونټاریو، کاناډا',
          quote:
            'دا مې خوښېږي چې تادیات د اکاډمي له لارې کېږي، نه مستقیم استاد ته. له هېواده بهر والدینو لپاره منظم او خوندي احساسېږي.',
          result: 'د قرآن لوستلو زده کوونکي والد'
        },
        {
          name: 'زهرا نوري',
          location: 'ملبورن، اسټرالیا',
          quote:
            'روښنايي له افغانستانه بهر افغان کورنۍ درک کوي. د وخت زونونه، د استاد یادښتونه او کوچني صنفونه زموږ ماشومانو ته دوام اسانه کوي.',
          result: 'د کورنۍ پروګرام والد'
        }
      ]
    },
    faq: {
      eyebrow: 'پوښتنې',
      title: 'د افغان والدینو عامې پوښتنې.',
      description:
        'د آزمایښتي صنفونو، تادیې، هېوادونو، مضمونونو، پرمختګ تعقیب او د استاد تادیې اصولو په اړه روښانه ځوابونه.',
      items: [
        {
          question: 'آیا آزمایښتي صنفونه لرئ؟',
          answer:
            'هو. نوي زده کوونکي له تادیې مخکې دوه آزمایښتي صنفونو ته تللی شي، څو والدین لومړی استاد، د صنف طریقه او مهالویش وګوري.'
        },
        {
          question: 'والدین څنګه تادیه کوي؟',
          answer:
            'والدین د آزمایښتي پړاو وروسته د اکاډمي له لارې تادیه کوي. د تادیې حالت او تایید د روښنايي اکاډمي له خوا تعقیبېږي.'
        },
        {
          question: 'آیا زما ماشوم له هر هېواد څخه ګډون کولی شي؟',
          answer:
            'هو. صنفونه آنلاین دي او د شمالي امریکا، اروپا، برېتانیا، اسټرالیا او نورو وخت زونونو کورنیو لپاره پلانېږي.'
        },
        {
          question: 'آیا انګلیسي هم تدریسوئ؟',
          answer:
            'هو. روښنايي اکاډمي د دري، پښتو، قرآن، تجوید او میراث تر څنګ د بېلابېلو کچو لپاره انګلیسي صنفونه هم لري.'
        },
        {
          question: 'آیا فارسی/دري انګلیسي ویونکو ته ورزده کوئ؟',
          answer:
            'هو. موږ د هغو ماشومانو او کورنیو لپاره فارسی/دري کورس لرو چې غواړي په نرمه توګه د دري ژبې زده کړه پیل کړي.'
        },
        {
          question: 'والدین څنګه پرمختګ تعقیبوي؟',
          answer:
            'والدین د اکاډمي په سیستم کې حاضري، د تادیې حالت، راتلونکي صنفونه، د استاد یادښتونه او پرمختګ راپورونه لیدلی شي.'
        },
        {
          question: 'آیا استادان خصوصي تادیه اخیستلی شي؟',
          answer:
            'نه. استادان مستقیم فیس نه شي اخیستلی. تادیات د روښنايي اکاډمي له لارې مدیریت او تاییدېږي، څو ریکارډونه روښانه او خوندي پاتې شي.'
        }
      ]
    },
    cta: {
      eyebrow: 'پیل ته چمتو یاست؟',
      title: 'له تادیې مخکې له دوو آزمایښتي صنفونو سره پیل وکړئ.',
      description:
        'نن خپل ماشوم ثبت کړئ، یا زموږ له ټیم څخه په واتساپ کې د مناسب کورس، کچې او وخت زون په اړه پوښتنه وکړئ.',
      primaryAction: 'همدا اوس نوملیکنه',
      secondaryAction: 'په واتساپ پوښتنه'
    }
  }
}

export const getHomeLandingCopy = (locale: LocaleCode = defaultLocale) =>
  homeLandingCopy[locale] ?? homeLandingCopy[defaultLocale]
