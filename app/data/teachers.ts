import { defaultLocale, type LocaleCode } from '~/i18n/messages'
import type { Teacher } from '~/types'

type TeacherText = Pick<
  Teacher,
  'name' | 'role' | 'specialty' | 'location' | 'experience' | 'credentials' | 'bio' | 'languages' | 'approach'
>

const teacherBase = [
  {
    slug: 'maryam-farahi',
    initials: 'MF',
    avatarClass: 'bg-purple-100 text-brand-purple dark:bg-purple-900 dark:text-purple-100'
  },
  {
    slug: 'ahmad-wali',
    initials: 'AW',
    avatarClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100'
  },
  {
    slug: 'qari-idrees',
    initials: 'QI',
    avatarClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100'
  },
  {
    slug: 'layla-sadat',
    initials: 'LS',
    avatarClass: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-100'
  }
] as const satisfies ReadonlyArray<Pick<Teacher, 'slug' | 'initials' | 'avatarClass'>>

const teacherText: Record<LocaleCode, Record<(typeof teacherBase)[number]['slug'], TeacherText>> = {
  en: {
    'maryam-farahi': {
      name: 'Maryam Farahi',
      role: 'Lead Dari Language Teacher',
      specialty: 'Dari Language',
      location: 'Toronto, Canada',
      experience: '9 years',
      credentials: 'M.Ed. Literacy Education, former bilingual classroom teacher',
      bio:
        'Maryam grew up between Kabul and Toronto and has spent nearly a decade helping Afghan children in diaspora families build confidence in Dari. Her classes balance phonics, conversation, reading fluency, and gentle writing practice so children can use Dari with parents and grandparents.',
      languages: ['Dari', 'English', 'Basic Pashto'],
      approach: 'Structured literacy, warm correction, and parent-friendly home practice.'
    },
    'ahmad-wali': {
      name: 'Ahmad Wali',
      role: 'Pashto Language Instructor',
      specialty: 'Pashto Language',
      location: 'Hamburg, Germany',
      experience: '7 years',
      credentials: 'BA Language Education, community Pashto school mentor',
      bio:
        'Ahmad specializes in making Pashto feel natural for children who may understand the language but hesitate to speak it. His lessons use repetition, oral storytelling, greetings, family vocabulary, and pronunciation coaching for young learners in Europe and North America.',
      languages: ['Pashto', 'Dari', 'German', 'English'],
      approach: 'Conversation-first learning with songs, stories, and real family phrases.'
    },
    'qari-idrees': {
      name: 'Qari Idrees',
      role: 'Quran and Tajweed Instructor',
      specialty: 'Tajweed',
      location: 'Sydney, Australia',
      experience: '12 years',
      credentials: 'Ijazah in Quran recitation, certified Tajweed instructor',
      bio:
        'Qari Idrees teaches Quran reading and Tajweed with patience, clarity, and respect for each child pace. He supports beginners with Arabic letters and Noorani Qaida while helping advanced students improve makharij, madd, stopping signs, and rule application.',
      languages: ['Arabic', 'Dari', 'Pashto', 'English'],
      approach: 'Calm recitation coaching, precise correction, and steady practice routines.'
    },
    'layla-sadat': {
      name: 'Layla Sadat',
      role: 'Culture and Heritage Educator',
      specialty: 'Afghan Culture & Heritage',
      location: 'London, United Kingdom',
      experience: '8 years',
      credentials: 'MA Cultural Studies, heritage curriculum designer',
      bio:
        'Layla creates heritage lessons for children who are growing up far from Afghanistan but still want to understand their family story. Her classes include geography, poetry, proverbs, celebrations, family interviews, values, and creative presentations.',
      languages: ['Dari', 'English', 'Basic Pashto'],
      approach: 'Project-based heritage learning with storytelling and family connection.'
    }
  },
  fa: {
    'maryam-farahi': {
      name: 'مریم فراهی',
      role: 'استاد ارشد زبان دری',
      specialty: 'زبان دری',
      location: 'تورنتو، کانادا',
      experience: '۹ سال',
      credentials: 'ماستری آموزش خواندن و نوشتن، استاد پیشین صنف دوزبانه',
      bio:
        'مریم میان کابل و تورنتو بزرگ شده و نزدیک به یک دهه به کودکان افغان در خانواده‌های مهاجر کمک کرده است تا در زبان دری اعتماد بسازند. صنف‌های او صداشناسی، گفت‌وگو، روانی خواندن و تمرین نرم نوشتن را متوازن می‌کند تا کودکان بتوانند با والدین و پدرکلان و مادرکلان دری استفاده کنند.',
      languages: ['دری', 'انگلیسی', 'پشتوی ابتدایی'],
      approach: 'سوادآموزی منظم، اصلاح گرم و تمرین خانگی مناسب والدین.'
    },
    'ahmad-wali': {
      name: 'احمد ولی',
      role: 'استاد زبان پشتو',
      specialty: 'زبان پشتو',
      location: 'هامبورگ، آلمان',
      experience: '۷ سال',
      credentials: 'لیسانس آموزش زبان، راهنمای مکتب اجتماعی پشتو',
      bio:
        'احمد در طبیعی ساختن پشتو برای کودکانی تخصص دارد که شاید زبان را بفهمند، اما در صحبت کردن تردید داشته باشند. درس‌های او از تکرار، قصه‌گویی شفاهی، سلام‌واحوال، واژه‌های خانوادگی و تمرین تلفظ برای شاگردان خردسال در اروپا و امریکای شمالی استفاده می‌کند.',
      languages: ['پشتو', 'دری', 'آلمانی', 'انگلیسی'],
      approach: 'یادگیری گفت‌وگومحور با آهنگ‌ها، داستان‌ها و جمله‌های واقعی خانوادگی.'
    },
    'qari-idrees': {
      name: 'قاری ادریس',
      role: 'استاد قرآن و تجوید',
      specialty: 'تجوید',
      location: 'سیدنی، آسترالیا',
      experience: '۱۲ سال',
      credentials: 'اجازه تلاوت قرآن، استاد تصدیق‌شده تجوید',
      bio:
        'قاری ادریس روخوانی قرآن و تجوید را با صبر، وضاحت و احترام به سرعت هر کودک تدریس می‌کند. او مبتدیان را با حروف عربی و نورانی قاعده پشتیبانی می‌کند و به شاگردان پیشرفته کمک می‌کند مخارج، مد، نشانه‌های وقف و اجرای قواعد را بهتر سازند.',
      languages: ['عربی', 'دری', 'پشتو', 'انگلیسی'],
      approach: 'تمرین آرام تلاوت، اصلاح دقیق و روال تمرین پایدار.'
    },
    'layla-sadat': {
      name: 'لیلا سادات',
      role: 'آموزگار فرهنگ و میراث',
      specialty: 'فرهنگ و میراث افغانستان',
      location: 'لندن، بریتانیا',
      experience: '۸ سال',
      credentials: 'ماستری مطالعات فرهنگی، طراح نصاب میراث',
      bio:
        'لیلا درس‌های میراث را برای کودکانی می‌سازد که دور از افغانستان بزرگ می‌شوند اما هنوز می‌خواهند داستان خانواده خود را بفهمند. صنف‌های او جغرافیا، شعر، ضرب‌المثل‌ها، جشن‌ها، مصاحبه‌های خانوادگی، ارزش‌ها و ارائه‌های خلاق را شامل می‌شود.',
      languages: ['دری', 'انگلیسی', 'پشتوی ابتدایی'],
      approach: 'یادگیری میراث پروژه‌محور با قصه‌گویی و پیوند خانوادگی.'
    }
  },
  ps: {
    'maryam-farahi': {
      name: 'مریم فراهی',
      role: 'د دري ژبې مشره استاده',
      specialty: 'دري ژبه',
      location: 'ټورنټو، کاناډا',
      experience: '۹ کاله',
      credentials: 'د سواد زده کړې ماستري، پخوانۍ دوه ژبې صنف استاده',
      bio:
        'مریم د کابل او ټورنټو ترمنځ لویه شوې او نږدې یوه لسیزه یې په کډوالو افغان کورنیو کې له ماشومانو سره د دري باور په جوړولو کې مرسته کړې. د هغې صنفونه غږونه، خبرې، روان لوستل او نرم لیکني تمرین سره برابروي څو ماشومان له مور، پلار، نیکه او انا سره دري وکاروي.',
      languages: ['دري', 'انګلیسي', 'بنسټیزه پښتو'],
      approach: 'منظم سواد، تود اصلاح او د والدینو لپاره اسانه کورنی تمرین.'
    },
    'ahmad-wali': {
      name: 'احمد ولي',
      role: 'د پښتو ژبې استاد',
      specialty: 'پښتو ژبه',
      location: 'هامبورګ، جرمني',
      experience: '۷ کاله',
      credentials: 'د ژبې زده کړې لیسانس، د ټولنیز پښتو ښوونځي لارښود',
      bio:
        'احمد په دې کې تخصص لري چې پښتو هغو ماشومانو ته طبیعي کړي چې ښايي ژبه پوهېږي خو په خبرو کې زړه نازړه وي. د هغه درسونه د تکرار، شفاهي کیسو، سلامونو، کورنۍ کلمو او تلفظ تمرین کاروي.',
      languages: ['پښتو', 'دري', 'جرمني', 'انګلیسي'],
      approach: 'لومړی خبرې، د سندرو، کیسو او واقعي کورنیو جملو له لارې.'
    },
    'qari-idrees': {
      name: 'قاري ادریس',
      role: 'د قرآن او تجوید استاد',
      specialty: 'تجوید',
      location: 'سیډني، اسټرالیا',
      experience: '۱۲ کاله',
      credentials: 'د قرآن تلاوت اجازه، تصدیق شوی د تجوید استاد',
      bio:
        'قاري ادریس د قرآن لوستل او تجوید په صبر، وضاحت او د هر ماشوم د سرعت په درناوي تدریس کوي. هغه پیل کوونکي د عربي تورو او نوراني قاعدې سره ملاتړ کوي او پرمختللو زده کوونکو سره د مخارجو، مد، وقف نښو او قواعدو په ښه کولو کې مرسته کوي.',
      languages: ['عربي', 'دري', 'پښتو', 'انګلیسي'],
      approach: 'ارام تلاوت کوچنګ، دقیق اصلاح او ثابت تمریني معمول.'
    },
    'layla-sadat': {
      name: 'لیلا سادات',
      role: 'د کلتور او میراث ښوونکې',
      specialty: 'افغان کلتور او میراث',
      location: 'لندن، برېتانیا',
      experience: '۸ کاله',
      credentials: 'د فرهنګي مطالعاتو ماستري، د میراث نصاب ډیزاینره',
      bio:
        'لیلا د هغو ماشومانو لپاره میراثي درسونه جوړوي چې له افغانستانه لرې لویېږي خو لا هم غواړي د خپلې کورنۍ کیسه وپوهېږي. د هغې صنفونه جغرافیه، شعر، متلونه، جشنونه، کورنۍ مرکې، ارزښتونه او خلاقې وړاندې کول رانغاړي.',
      languages: ['دري', 'انګلیسي', 'بنسټیزه پښتو'],
      approach: 'پروژه-محوره میراث زده کړه د کیسه ویلو او کورني تړاو سره.'
    }
  }
}

export const getTeachers = (locale: LocaleCode = defaultLocale): Teacher[] =>
  teacherBase.map((teacher) => ({
    ...teacher,
    ...teacherText[locale][teacher.slug]
  }))

export const teachers = getTeachers()
