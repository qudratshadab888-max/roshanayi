import { defaultLocale, type LocaleCode } from '~/i18n/messages'
import type { Course, CourseCategory } from '~/types'

type CourseCategoryKey = 'dari' | 'pashto' | 'quran' | 'tajweed' | 'heritage'

type CourseText = Pick<
  Course,
  | 'title'
  | 'summary'
  | 'description'
  | 'level'
  | 'ageGroup'
  | 'duration'
  | 'format'
  | 'benefits'
  | 'outcomes'
  | 'syllabus'
  | 'parentNote'
>

const categoryOrder: CourseCategoryKey[] = ['dari', 'pashto', 'quran', 'tajweed', 'heritage']

const categoryLabels: Record<LocaleCode, Record<CourseCategoryKey | 'all', CourseCategory | 'All'>> = {
  en: {
    all: 'All',
    dari: 'Dari Language',
    pashto: 'Pashto Language',
    quran: 'Quran Reading',
    tajweed: 'Tajweed',
    heritage: 'Afghan Culture & Heritage'
  },
  fa: {
    all: 'همه',
    dari: 'زبان دری',
    pashto: 'زبان پشتو',
    quran: 'روخوانی قرآن',
    tajweed: 'تجوید',
    heritage: 'فرهنگ و میراث افغانستان'
  },
  ps: {
    all: 'ټول',
    dari: 'دري ژبه',
    pashto: 'پښتو ژبه',
    quran: 'د قرآن لوستل',
    tajweed: 'تجوید',
    heritage: 'افغان کلتور او میراث'
  }
}

const courseBase = [
  {
    slug: 'dari-language-foundations',
    categoryKey: 'dari',
    lessons: 36,
    price: '$79/month',
    rating: '4.9/5',
    students: '1,240+',
    featured: true,
    accentClass:
      'bg-purple-50 text-brand-purple ring-purple-100 dark:bg-purple-950/50 dark:text-purple-200 dark:ring-purple-800',
    teacherSlug: 'maryam-farahi'
  },
  {
    slug: 'pashto-for-kids',
    categoryKey: 'pashto',
    lessons: 30,
    price: '$79/month',
    rating: '4.8/5',
    students: '910+',
    featured: true,
    accentClass:
      'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800',
    teacherSlug: 'ahmad-wali'
  },
  {
    slug: 'quran-reading-for-beginners',
    categoryKey: 'quran',
    lessons: 48,
    price: '$89/month',
    rating: '4.9/5',
    students: '1,680+',
    featured: true,
    accentClass:
      'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800',
    teacherSlug: 'qari-idrees'
  },
  {
    slug: 'tajweed-essentials',
    categoryKey: 'tajweed',
    lessons: 42,
    price: '$99/month',
    rating: '4.9/5',
    students: '760+',
    featured: false,
    accentClass:
      'bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-200 dark:ring-sky-800',
    teacherSlug: 'qari-idrees'
  },
  {
    slug: 'afghan-culture-heritage',
    categoryKey: 'heritage',
    lessons: 24,
    price: '$69/month',
    rating: '4.8/5',
    students: '640+',
    featured: false,
    accentClass:
      'bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800',
    teacherSlug: 'layla-sadat'
  }
] as const satisfies ReadonlyArray<
  Pick<
    Course,
    | 'slug'
    | 'lessons'
    | 'price'
    | 'rating'
    | 'students'
    | 'featured'
    | 'accentClass'
    | 'teacherSlug'
  > & { categoryKey: CourseCategoryKey }
>

const courseText: Record<LocaleCode, Record<(typeof courseBase)[number]['slug'], CourseText>> = {
  en: {
    'dari-language-foundations': {
      title: 'Dari Language Foundations',
      summary:
        'A complete Dari pathway for children who hear Dari at home but need structure, confidence, and reading fluency.',
      description:
        'This live online course helps Afghan children abroad build a usable Dari foundation through alphabet work, everyday vocabulary, guided reading, simple writing, and speaking practice connected to family life.',
      level: 'Beginner to Intermediate',
      ageGroup: 'Ages 6-13',
      duration: '12 weeks',
      format: '3 live small-group classes per week',
      benefits: [
        'Helps children speak more naturally with parents and grandparents.',
        'Builds reading and writing confidence without overwhelming beginners.',
        'Uses Afghan stories, manners, and family vocabulary to make lessons meaningful.',
        'Includes weekly parent notes so families can practice at home.'
      ],
      outcomes: [
        'Recognize and write the Dari alphabet in isolated and connected forms.',
        'Read short age-appropriate passages with correct pronunciation and pacing.',
        'Use everyday Dari sentences for home, school, food, greetings, and family topics.',
        'Write simple words and short sentences with teacher feedback.'
      ],
      syllabus: [
        'Dari alphabet, sounds, and connected forms',
        'Family, home, school, and daily routine vocabulary',
        'Reading words, sentences, and short stories',
        'Writing practice, dictation, and sentence building',
        'Speaking circles, poems, and parent practice prompts'
      ],
      parentNote:
        'Best for children who understand some Dari but need confidence speaking, reading, and writing in a structured setting.'
    },
    'pashto-for-kids': {
      title: 'Pashto for Kids',
      summary: 'An engaging Pashto course for young learners who need confidence using the language at home.',
      description:
        'Pashto for Kids introduces children to Pashto sounds, letters, greetings, conversation patterns, and cultural expressions through live practice, repetition, storytelling, and gentle teacher correction.',
      level: 'Beginner',
      ageGroup: 'Ages 5-12',
      duration: '10 weeks',
      format: '3 live small-group classes per week',
      benefits: [
        'Makes Pashto approachable for children who may feel shy speaking it.',
        'Strengthens pronunciation through listening, repetition, and teacher modeling.',
        'Connects language practice with Afghan respect, greetings, and family values.',
        'Gives parents simple weekly phrases to continue practice at home.'
      ],
      outcomes: [
        'Understand common Pashto phrases used at home.',
        'Read and write foundational Pashto letters, words, and short sentences.',
        'Speak in simple sentences with clearer pronunciation and confidence.',
        'Use greetings, questions, and family vocabulary in real conversations.'
      ],
      syllabus: [
        'Pashto alphabet and sounds',
        'Greetings and family words',
        'Numbers, colors, and daily objects',
        'Simple sentences and question patterns',
        'Story practice, listening games, and oral confidence'
      ],
      parentNote:
        'Best for families who want their child to begin using Pashto in everyday conversations with relatives.'
    },
    'quran-reading-for-beginners': {
      title: 'Quran Reading for Beginners',
      summary: 'A careful beginner pathway from Arabic letters to confident Quran reading practice.',
      description:
        'This course supports children who are beginning Quran reading with Arabic letter recognition, vowel practice, joining rules, Noorani Qaida fluency, and short supervised recitation.',
      level: 'Beginner',
      ageGroup: 'Ages 5-14',
      duration: '16 weeks',
      format: '3 live classes plus guided weekly practice',
      benefits: [
        'Builds a strong foundation before students move into full recitation.',
        'Helps children avoid common pronunciation habits early.',
        'Creates a calm and respectful Quran learning routine at home.',
        'Gives parents progress updates on fluency, accuracy, and practice needs.'
      ],
      outcomes: [
        'Recognize Arabic letters in isolated and joined forms.',
        'Read Quranic words and short lines with guided correction.',
        'Develop steady daily recitation habits.',
        'Prepare for Tajweed Essentials with a clear reading foundation.'
      ],
      syllabus: [
        'Arabic letters and pronunciation points',
        'Short vowels and sukoon',
        'Joining letters and reading words',
        'Noorani Qaida fluency practice',
        'Short surah reading with teacher feedback'
      ],
      parentNote:
        'Best for children who are new to Quran reading or need a patient restart with correct foundations.'
    },
    'tajweed-essentials': {
      title: 'Tajweed Essentials',
      summary:
        'A practical Tajweed course for children ready to improve accuracy, rhythm, and recitation beauty.',
      description:
        'Tajweed Essentials helps students apply core rules while reciting, with direct teacher correction, makharij practice, stopping signs, madd rules, and weekly recitation goals.',
      level: 'Intermediate',
      ageGroup: 'Ages 8-16',
      duration: '14 weeks',
      format: 'Live recitation coaching',
      benefits: [
        'Moves students from basic reading to more accurate recitation.',
        'Improves makharij, clarity, rhythm, and confidence.',
        'Provides individual correction in a respectful learning environment.',
        'Supports children preparing for family recitation, Ramadan goals, or memorization.'
      ],
      outcomes: [
        'Apply core Tajweed rules while reading.',
        'Improve makharij, rhythm, and clarity.',
        'Receive personalized correction from qualified teachers.',
        'Build confidence reciting in front of family or class.'
      ],
      syllabus: [
        'Makharij and sifat review',
        'Rules of noon sakin and tanween',
        'Meem sakin and qalqalah',
        'Madd rules and stopping signs',
        'Guided recitation assessment'
      ],
      parentNote:
        'Best for students who can already read Quranic text and are ready to improve rule application and fluency.'
    },
    'afghan-culture-heritage': {
      title: 'Afghan Culture & Heritage',
      summary:
        'A creative heritage course that helps children abroad understand Afghanistan, family stories, and cultural pride.',
      description:
        'This project-based course helps Afghan children abroad explore Afghanistan through geography, languages, poetry, proverbs, family history, celebrations, values, food, clothing, and creative heritage presentations.',
      level: 'All Levels',
      ageGroup: 'Ages 7-15',
      duration: '8 weeks',
      format: 'Project-based live classes',
      benefits: [
        'Helps children understand where their family story comes from.',
        'Builds pride without politics, pressure, or heavy academic language.',
        'Encourages conversations with parents and grandparents.',
        'Ends with a personal heritage project children can present with confidence.'
      ],
      outcomes: [
        'Understand major regions, languages, and traditions of Afghanistan.',
        'Explore poetry, storytelling, calligraphy, and family history.',
        'Create a personal heritage project.',
        'Build pride and belonging in a global Afghan community.'
      ],
      syllabus: [
        'Afghanistan map, regions, and languages',
        'Family stories and oral history',
        'Poetry, proverbs, and values',
        'Celebrations, clothing, food, and arts',
        'Student heritage presentation'
      ],
      parentNote:
        'Best for families who want children to feel connected to Afghan heritage while growing up in another country.'
    }
  },
  fa: {
    'dari-language-foundations': {
      title: 'بنیادهای زبان دری',
      summary:
        'یک مسیر کامل دری برای کودکانی که در خانه دری می‌شنوند، اما به ساختار، اعتماد و روانی خواندن نیاز دارند.',
      description:
        'این دوره آنلاین زنده به کودکان افغان بیرون از کشور کمک می‌کند با الفبا، واژه‌های روزمره، خواندن راهنمایی‌شده، نوشتن ساده و تمرین صحبت پیوندخورده با زندگی خانوادگی، بنیاد کاربردی زبان دری بسازند.',
      level: 'مبتدی تا متوسط',
      ageGroup: 'سن ۶ تا ۱۳ سال',
      duration: '۱۲ هفته',
      format: '۳ صنف زنده کوچک در هفته',
      benefits: [
        'به کودکان کمک می‌کند طبیعی‌تر با والدین و پدرکلان و مادرکلان صحبت کنند.',
        'اعتماد در خواندن و نوشتن را بدون سنگین ساختن مسیر برای مبتدیان می‌سازد.',
        'از داستان‌ها، آداب و واژه‌های خانوادگی افغان برای معنی‌دار شدن درس‌ها استفاده می‌کند.',
        'یادداشت‌های هفتگی والدین دارد تا خانواده‌ها در خانه تمرین کنند.'
      ],
      outcomes: [
        'حروف الفبای دری را در شکل جدا و پیوسته بشناسد و بنویسد.',
        'متن‌های کوتاه مناسب سن را با تلفظ و سرعت درست بخواند.',
        'جمله‌های روزمره دری را برای خانه، مکتب، غذا، سلام و خانواده به کار ببرد.',
        'واژه‌ها و جمله‌های کوتاه را با بازخورد استاد بنویسد.'
      ],
      syllabus: [
        'الفبای دری، صداها و شکل‌های پیوسته',
        'واژه‌های خانواده، خانه، مکتب و کارهای روزمره',
        'خواندن واژه‌ها، جمله‌ها و داستان‌های کوتاه',
        'تمرین نوشتن، املا و ساختن جمله',
        'حلقه‌های صحبت، شعرها و تمرین‌های والدین'
      ],
      parentNote:
        'بهترین گزینه برای کودکانی است که کمی دری می‌فهمند، اما برای صحبت، خواندن و نوشتن در یک فضای منظم به اعتماد نیاز دارند.'
    },
    'pashto-for-kids': {
      title: 'پشتو برای کودکان',
      summary: 'یک دوره جذاب پشتو برای کودکان خردسال که به اعتماد در استفاده از زبان در خانه نیاز دارند.',
      description:
        'پشتو برای کودکان، صداها، حروف، سلام‌واحوال، الگوهای گفت‌وگو و بیان‌های فرهنگی پشتو را از راه تمرین زنده، تکرار، قصه‌گویی و اصلاح نرم استاد معرفی می‌کند.',
      level: 'مبتدی',
      ageGroup: 'سن ۵ تا ۱۲ سال',
      duration: '۱۰ هفته',
      format: '۳ صنف زنده کوچک در هفته',
      benefits: [
        'پشتو را برای کودکانی که شاید از صحبت کردن خجالت بکشند، آسان و نزدیک می‌سازد.',
        'تلفظ را با شنیدن، تکرار و الگوی استاد تقویت می‌کند.',
        'تمرین زبان را با احترام، سلام‌واحوال و ارزش‌های خانوادگی افغان پیوند می‌دهد.',
        'برای ادامه تمرین در خانه، جمله‌های ساده هفتگی به والدین می‌دهد.'
      ],
      outcomes: [
        'عبارت‌های رایج پشتو در خانه را بفهمد.',
        'حروف، واژه‌ها و جمله‌های کوتاه پایه پشتو را بخواند و بنویسد.',
        'با تلفظ روشن‌تر و اعتماد بیشتر جمله‌های ساده بگوید.',
        'سلام، پرسش‌ها و واژه‌های خانوادگی را در گفت‌وگوی واقعی استفاده کند.'
      ],
      syllabus: [
        'الفبا و صداهای پشتو',
        'سلام‌واحوال و واژه‌های خانواده',
        'عددها، رنگ‌ها و اشیای روزمره',
        'جمله‌های ساده و الگوهای پرسش',
        'تمرین قصه، بازی شنیداری و اعتماد گفتاری'
      ],
      parentNote:
        'بهترین گزینه برای خانواده‌هایی است که می‌خواهند کودک‌شان پشتو را در گفت‌وگوهای روزمره با خویشاوندان آغاز کند.'
    },
    'quran-reading-for-beginners': {
      title: 'روخوانی قرآن برای مبتدیان',
      summary: 'یک مسیر دقیق از حروف عربی تا تمرین بااعتماد روخوانی قرآن.',
      description:
        'این دوره از کودکانی پشتیبانی می‌کند که روخوانی قرآن را آغاز می‌کنند؛ با شناخت حروف عربی، تمرین حرکات، قواعد وصل، روانی نورانی قاعده و تلاوت کوتاه زیر نظر استاد.',
      level: 'مبتدی',
      ageGroup: 'سن ۵ تا ۱۴ سال',
      duration: '۱۶ هفته',
      format: '۳ صنف زنده همراه با تمرین هفتگی راهنمایی‌شده',
      benefits: [
        'پیش از رفتن به تلاوت کامل، بنیاد قوی می‌سازد.',
        'به کودکان کمک می‌کند عادت‌های تلفظی نادرست را زود اصلاح کنند.',
        'روال آرام و محترمانه یادگیری قرآن در خانه ایجاد می‌کند.',
        'به والدین گزارش پیشرفت در روانی، دقت و نیازهای تمرین می‌دهد.'
      ],
      outcomes: [
        'حروف عربی را در شکل جدا و پیوسته بشناسد.',
        'واژه‌ها و خط‌های کوتاه قرآنی را با اصلاح استاد بخواند.',
        'عادت تلاوت روزانه و پایدار بسازد.',
        'با بنیاد روشن خواندن، برای اساسات تجوید آماده شود.'
      ],
      syllabus: [
        'حروف عربی و مخارج تلفظ',
        'حرکت‌های کوتاه و سکون',
        'وصل حروف و خواندن واژه‌ها',
        'تمرین روانی نورانی قاعده',
        'خواندن سوره‌های کوتاه با بازخورد استاد'
      ],
      parentNote:
        'بهترین گزینه برای کودکانی است که تازه روخوانی قرآن را شروع می‌کنند یا به آغاز دوباره با بنیاد درست نیاز دارند.'
    },
    'tajweed-essentials': {
      title: 'اساسات تجوید',
      summary: 'یک دوره کاربردی تجوید برای کودکانی که آماده بهتر ساختن دقت، ریتم و زیبایی تلاوت‌اند.',
      description:
        'اساسات تجوید به شاگردان کمک می‌کند قواعد اصلی را هنگام تلاوت اجرا کنند؛ با اصلاح مستقیم استاد، تمرین مخارج، نشانه‌های وقف، قواعد مد و هدف‌های هفتگی تلاوت.',
      level: 'متوسط',
      ageGroup: 'سن ۸ تا ۱۶ سال',
      duration: '۱۴ هفته',
      format: 'تمرین زنده تلاوت',
      benefits: [
        'شاگردان را از خواندن پایه به تلاوت دقیق‌تر می‌برد.',
        'مخارج، وضاحت، ریتم و اعتماد را بهتر می‌سازد.',
        'در فضای محترمانه یادگیری، اصلاح فردی فراهم می‌کند.',
        'از کودکانی که برای تلاوت خانوادگی، هدف‌های رمضان یا حفظ آماده می‌شوند پشتیبانی می‌کند.'
      ],
      outcomes: [
        'قواعد اصلی تجوید را هنگام خواندن اجرا کند.',
        'مخارج، ریتم و وضاحت را بهتر سازد.',
        'از استادان واجد شرایط اصلاح شخصی دریافت کند.',
        'برای تلاوت در برابر خانواده یا صنف اعتماد بسازد.'
      ],
      syllabus: [
        'مرور مخارج و صفات',
        'قواعد نون ساکن و تنوین',
        'میم ساکن و قلقله',
        'قواعد مد و نشانه‌های وقف',
        'ارزیابی تلاوت راهنمایی‌شده'
      ],
      parentNote:
        'بهترین گزینه برای شاگردانی است که متن قرآن را می‌خوانند و آماده بهتر ساختن اجرای قواعد و روانی‌اند.'
    },
    'afghan-culture-heritage': {
      title: 'فرهنگ و میراث افغانستان',
      summary:
        'یک دوره خلاق میراث که به کودکان بیرون از کشور کمک می‌کند افغانستان، داستان‌های خانوادگی و افتخار فرهنگی را بفهمند.',
      description:
        'این دوره پروژه‌محور به کودکان افغان بیرون از کشور کمک می‌کند افغانستان را از راه جغرافیا، زبان‌ها، شعر، ضرب‌المثل‌ها، تاریخ خانوادگی، جشن‌ها، ارزش‌ها، غذا، لباس و ارائه‌های خلاق میراث بشناسند.',
      level: 'همه سطح‌ها',
      ageGroup: 'سن ۷ تا ۱۵ سال',
      duration: '۸ هفته',
      format: 'صنف‌های زنده پروژه‌محور',
      benefits: [
        'به کودکان کمک می‌کند بفهمند داستان خانواده‌شان از کجا می‌آید.',
        'بدون سیاست، فشار یا زبان سخت علمی، افتخار می‌سازد.',
        'گفت‌وگو با والدین و پدرکلان و مادرکلان را تشویق می‌کند.',
        'با یک پروژه شخصی میراث پایان می‌یابد که کودک با اعتماد ارائه می‌کند.'
      ],
      outcomes: [
        'منطقه‌ها، زبان‌ها و سنت‌های اصلی افغانستان را بفهمد.',
        'شعر، قصه‌گویی، خوش‌نویسی و تاریخ خانوادگی را کشف کند.',
        'یک پروژه شخصی میراث بسازد.',
        'در جامعه جهانی افغان، افتخار و تعلق بسازد.'
      ],
      syllabus: [
        'نقشه افغانستان، منطقه‌ها و زبان‌ها',
        'داستان‌های خانوادگی و تاریخ شفاهی',
        'شعر، ضرب‌المثل‌ها و ارزش‌ها',
        'جشن‌ها، لباس، غذا و هنرها',
        'ارائه میراث شاگرد'
      ],
      parentNote:
        'بهترین گزینه برای خانواده‌هایی است که می‌خواهند کودکان‌شان هنگام بزرگ شدن در کشور دیگر با میراث افغان پیوند داشته باشند.'
    }
  },
  ps: {
    'dari-language-foundations': {
      title: 'د دري ژبې بنسټونه',
      summary:
        'د هغو ماشومانو لپاره بشپړ دري مسیر چې په کور کې دري اوري، خو جوړښت، باور او روان لوستلو ته اړتیا لري.',
      description:
        'دا ژوندی آنلاین کورس له هېواده بهر افغان ماشومانو سره مرسته کوي چې د الفبا، ورځنیو کلمو، لارښود لوستلو، ساده لیکلو او د کورني ژوند سره تړلي خبرو تمرین له لارې د دري ژبې کارېدونکی بنسټ جوړ کړي.',
      level: 'پیل کوونکی تر منځنۍ کچې',
      ageGroup: 'عمر ۶ تر ۱۳ کاله',
      duration: '۱۲ اونۍ',
      format: 'په اونۍ کې ۳ واړه ژوندي ګروپي صنفونه',
      benefits: [
        'ماشومانو سره مرسته کوي چې له مور، پلار، نیکه او انا سره طبیعي خبرې وکړي.',
        'د پیل کوونکو له ستړي کولو پرته د لوستلو او لیکلو باور جوړوي.',
        'افغانې کیسې، ادبونه او کورنۍ کلمې کاروي څو درسونه معنا ولري.',
        'اونیز د والدینو یادښتونه لري چې کورنۍ په کور کې تمرین وکړي.'
      ],
      outcomes: [
        'د دري الفبا جلا او نښتي شکلونه وپېژني او ولیکي.',
        'د عمر سره برابر لنډ متنونه په سم تلفظ او سرعت ولولي.',
        'د کور، مکتب، خوړو، سلام او کورنۍ لپاره ورځنۍ دري جملې وکاروي.',
        'ساده کلمې او لنډې جملې د استاد له نظر سره ولیکي.'
      ],
      syllabus: [
        'دري الفبا، غږونه او نښتي شکلونه',
        'د کورنۍ، کور، مکتب او ورځني معمول کلمې',
        'د کلمو، جملو او لنډو کیسو لوستل',
        'د لیکلو تمرین، املا او جمله جوړونه',
        'د خبرو حلقې، شعرونه او د والدینو تمرینونه'
      ],
      parentNote:
        'د هغو ماشومانو لپاره غوره دی چې یو څه دري پوهېږي، خو په منظم چاپېریال کې د خبرو، لوستلو او لیکلو لپاره باور ته اړتیا لري.'
    },
    'pashto-for-kids': {
      title: 'پښتو د ماشومانو لپاره',
      summary: 'د ځوانو زده کوونکو لپاره په زړه پورې پښتو کورس چې په کور کې د ژبې کارولو باور غواړي.',
      description:
        'پښتو د ماشومانو لپاره د پښتو غږونه، توري، سلامونه، د خبرو بڼې او فرهنګي عبارتونه د ژوندۍ تمرین، تکرار، کیسه ویلو او نرم استاد اصلاح له لارې ور پېژني.',
      level: 'پیل کوونکی',
      ageGroup: 'عمر ۵ تر ۱۲ کاله',
      duration: '۱۰ اونۍ',
      format: 'په اونۍ کې ۳ واړه ژوندي ګروپي صنفونه',
      benefits: [
        'پښتو د هغو ماشومانو لپاره اسانه کوي چې ښايي په خبرو کې شرمېږي.',
        'تلفظ د اورېدو، تکرار او د استاد د بېلګې له لارې پیاوړی کوي.',
        'د ژبې تمرین د افغان احترام، سلامونو او کورنیو ارزښتونو سره نښلوي.',
        'والدینو ته ساده اونیزې جملې ورکوي چې په کور کې تمرین دوام کړي.'
      ],
      outcomes: [
        'په کور کې کارېدونکې عامې پښتو جملې وپوهېږي.',
        'بنسټیز پښتو توري، کلمې او لنډې جملې ولولي او ولیکي.',
        'په روښانه تلفظ او باور سره ساده جملې ووایي.',
        'سلامونه، پوښتنې او کورنۍ کلمې په ریښتینو خبرو کې وکاروي.'
      ],
      syllabus: [
        'پښتو الفبا او غږونه',
        'سلامونه او کورنۍ کلمې',
        'شمېرې، رنګونه او ورځني شیان',
        'ساده جملې او د پوښتنې بڼې',
        'د کیسې تمرین، د اورېدو لوبې او د خبرو باور'
      ],
      parentNote:
        'د هغو کورنیو لپاره غوره دی چې غواړي ماشوم یې له خپلوانو سره په ورځنیو خبرو کې پښتو کارول پیل کړي.'
    },
    'quran-reading-for-beginners': {
      title: 'د پیل کوونکو لپاره د قرآن لوستل',
      summary: 'له عربي تورو څخه تر باوري قرآن لوستلو پورې دقیق پیلنی مسیر.',
      description:
        'دا کورس له هغو ماشومانو سره مرسته کوي چې د قرآن لوستل پیلوي؛ د عربي تورو پېژندنه، د حرکاتو تمرین، د نښلولو قواعد، د نوراني قاعدې رواني او لنډه څارل شوې تلاوت پکې شامل دي.',
      level: 'پیل کوونکی',
      ageGroup: 'عمر ۵ تر ۱۴ کاله',
      duration: '۱۶ اونۍ',
      format: '۳ ژوندي صنفونه او لارښود اونیز تمرین',
      benefits: [
        'د بشپړ تلاوت تر پیل مخکې قوي بنسټ جوړوي.',
        'ماشومانو سره مرسته کوي چې عام تلفظي عادتونه ژر سم کړي.',
        'په کور کې د قرآن د زده کړې ارامه او درناوی لرونکې روټین جوړوي.',
        'والدینو ته د روانۍ، دقت او تمرین اړتیاوو په اړه پرمختګ ورکوي.'
      ],
      outcomes: [
        'عربي توري په جلا او نښتي شکلونو کې وپېژني.',
        'قرآني کلمې او لنډې کرښې د استاد له اصلاح سره ولولي.',
        'ثابت ورځنی تلاوت عادت جوړ کړي.',
        'د روښانه لوستلو بنسټ سره د تجوید بنسټونو ته چمتو شي.'
      ],
      syllabus: [
        'عربي توري او د تلفظ ځایونه',
        'لنډې حرکات او سکون',
        'د تورو نښلول او د کلمو لوستل',
        'د نوراني قاعدې رواني تمرین',
        'د لنډو سورتونو لوستل د استاد له نظر سره'
      ],
      parentNote:
        'د هغو ماشومانو لپاره غوره دی چې د قرآن لوستل نوي پیلوي یا د سمو بنسټونو سره صبر لرونکي بیا پیل ته اړتیا لري.'
    },
    'tajweed-essentials': {
      title: 'د تجوید بنسټونه',
      summary: 'د هغو ماشومانو لپاره عملي تجوید کورس چې دقت، ریتم او د تلاوت ښکلا ښه کول غواړي.',
      description:
        'د تجوید بنسټونه له زده کوونکو سره مرسته کوي چې اصلي قواعد د تلاوت پر مهال عملي کړي؛ د استاد مستقیم اصلاح، د مخارج تمرین، د وقف نښې، د مد قواعد او اونیز تلاوت هدفونه لري.',
      level: 'منځنۍ کچه',
      ageGroup: 'عمر ۸ تر ۱۶ کاله',
      duration: '۱۴ اونۍ',
      format: 'ژوندی د تلاوت کوچنګ',
      benefits: [
        'زده کوونکي له بنسټیز لوستلو څخه دقیق تلاوت ته بیایي.',
        'مخارج، وضاحت، ریتم او باور ښه کوي.',
        'په درناوي چاپېریال کې فردي اصلاح برابروي.',
        'له هغو ماشومانو سره مرسته کوي چې د کورنۍ تلاوت، رمضان موخو یا حفظ ته چمتو کېږي.'
      ],
      outcomes: [
        'اصلي تجوید قواعد د لوستلو پر مهال عملي کړي.',
        'مخارج، ریتم او وضاحت ښه کړي.',
        'له وړ استادانو څخه شخصي اصلاح ترلاسه کړي.',
        'د کورنۍ یا صنف مخې ته د تلاوت باور جوړ کړي.'
      ],
      syllabus: [
        'د مخارجو او صفاتو بیاکتنه',
        'د نون ساکن او تنوین قواعد',
        'میم ساکن او قلقله',
        'د مد قواعد او د وقف نښې',
        'لارښود تلاوت ارزونه'
      ],
      parentNote:
        'د هغو زده کوونکو لپاره غوره دی چې قرآني متن لوستلای شي او د قواعدو عملي کولو او روانۍ ښه کولو ته چمتو دي.'
    },
    'afghan-culture-heritage': {
      title: 'افغان کلتور او میراث',
      summary:
        'خلاق میراثي کورس چې له هېواده بهر ماشومانو سره د افغانستان، کورنیو کیسو او فرهنګي ویاړ په پوهېدو کې مرسته کوي.',
      description:
        'دا پروژه-محوره کورس له هېواده بهر افغان ماشومانو سره مرسته کوي چې افغانستان د جغرافیې، ژبو، شعر، متلونو، کورني تاریخ، جشنونو، ارزښتونو، خوړو، جامو او خلاقو میراثي وړاندې کولو له لارې وپېژني.',
      level: 'ټولې کچې',
      ageGroup: 'عمر ۷ تر ۱۵ کاله',
      duration: '۸ اونۍ',
      format: 'پروژه-محوره ژوندي صنفونه',
      benefits: [
        'ماشومانو سره مرسته کوي چې د خپلې کورنۍ کیسه له کومه راځي وپوهېږي.',
        'بې له سیاست، فشار یا درنې علمي ژبې ویاړ جوړوي.',
        'له والدینو، نیکه او انا سره خبرې هڅوي.',
        'په شخصي میراث پروژه پای ته رسېږي چې ماشوم یې په باور وړاندې کوي.'
      ],
      outcomes: [
        'د افغانستان مهمې سیمې، ژبې او دودونه وپېژني.',
        'شعر، کیسه ویلو، خوشنویسۍ او کورني تاریخ وپلټي.',
        'شخصي میراث پروژه جوړه کړي.',
        'په نړیواله افغانه ټولنه کې ویاړ او تړاو جوړ کړي.'
      ],
      syllabus: [
        'د افغانستان نقشه، سیمې او ژبې',
        'کورنۍ کیسې او شفاهي تاریخ',
        'شعر، متلونه او ارزښتونه',
        'جشنونه، جامې، خواړه او هنرونه',
        'د زده کوونکي میراث وړاندې کول'
      ],
      parentNote:
        'د هغو کورنیو لپاره غوره دی چې غواړي ماشومان یې په بل هېواد کې د لویېدو پر مهال له افغان میراث سره تړلي پاتې شي.'
    }
  }
}

export const getCourseCategories = (locale: LocaleCode = defaultLocale) => [
  categoryLabels[locale].all,
  ...categoryOrder.map((key) => categoryLabels[locale][key])
]

export const getCourses = (locale: LocaleCode = defaultLocale): Course[] =>
  courseBase.map((course) => ({
    ...course,
    ...courseText[locale][course.slug],
    category: categoryLabels[locale][course.categoryKey]
  }))

export const courses = getCourses()
export const courseCategories = getCourseCategories()
export const featuredCourses = courses.filter((course) => course.featured)
