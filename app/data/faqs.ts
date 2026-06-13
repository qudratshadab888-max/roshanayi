import { defaultLocale, type LocaleCode } from '~/i18n/messages'
import type { FaqItem } from '~/types'

const faqsByLocale: Record<LocaleCode, FaqItem[]> = {
  en: [
    {
      question: 'Are classes live or recorded?',
      answer:
        'Core classes are live in small groups so children can speak, read, recite, and receive correction. Families also receive lesson notes, practice tasks, and optional review materials.'
    },
    {
      question: 'What time zones do you support?',
      answer:
        'We plan cohorts for North America, Europe, the United Kingdom, Australia, and other regions where Afghan families live. Placement staff help families choose a realistic schedule.'
    },
    {
      question: 'Can siblings join the same plan?',
      answer:
        'Yes. Family plans include sibling support and placement guidance so children can learn at the right level.'
    },
    {
      question: 'Do children need prior language knowledge?',
      answer:
        'No. Beginner tracks start with letters, sounds, simple vocabulary, and confidence-building practice.'
    },
    {
      question: 'How do you place a student at the right level?',
      answer:
        'After registration, we review the child age, current ability, family goals, and preferred time zone. Some students receive a short placement call before joining a cohort.'
    },
    {
      question: 'Do parents receive progress updates?',
      answer:
        'Yes. Parents receive teacher notes, dashboard progress, upcoming class reminders, and practice recommendations so learning continues at home.'
    }
  ],
  fa: [
    {
      question: 'صنف‌ها زنده است یا ضبط‌شده؟',
      answer:
        'صنف‌های اصلی به‌صورت زنده در گروه‌های کوچک برگزار می‌شود تا کودکان صحبت، خواندن، تلاوت و اصلاح دریافت کنند. خانواده‌ها همچنین یادداشت درس، تمرین‌ها و مواد مرور اختیاری دریافت می‌کنند.'
    },
    {
      question: 'از کدام مناطق زمانی پشتیبانی می‌کنید؟',
      answer:
        'ما برای امریکای شمالی، اروپا، بریتانیا، آسترالیا و دیگر منطقه‌هایی که خانواده‌های افغان زندگی می‌کنند گروه برنامه‌ریزی می‌کنیم. تیم تعیین سطح به خانواده‌ها کمک می‌کند برنامه عملی انتخاب کنند.'
    },
    {
      question: 'آیا خواهر و برادر می‌توانند در یک پلن باشند؟',
      answer:
        'بله. پلن‌های خانوادگی شامل پشتیبانی خواهر و برادر و راهنمایی تعیین سطح است تا هر کودک در سطح درست بیاموزد.'
    },
    {
      question: 'آیا کودکان باید پیش‌زمینه زبانی داشته باشند؟',
      answer:
        'نخیر. مسیرهای مبتدی با حروف، صداها، واژه‌های ساده و تمرین اعتمادساز شروع می‌شود.'
    },
    {
      question: 'چگونه شاگرد را در سطح درست قرار می‌دهید؟',
      answer:
        'پس از ثبت‌نام، سن کودک، توانایی فعلی، هدف‌های خانواده و منطقه زمانی ترجیحی را بررسی می‌کنیم. بعضی شاگردان پیش از پیوستن به گروه یک تماس کوتاه تعیین سطح دریافت می‌کنند.'
    },
    {
      question: 'آیا والدین گزارش پیشرفت دریافت می‌کنند؟',
      answer:
        'بله. والدین یادداشت‌های استاد، پیشرفت داشبورد، یادآوری صنف آینده و پیشنهاد تمرین دریافت می‌کنند تا یادگیری در خانه ادامه پیدا کند.'
    }
  ],
  ps: [
    {
      question: 'صنفونه ژوندي دي که ثبت شوي؟',
      answer:
        'اصلي صنفونه په کوچنیو ګروپونو کې ژوندي وي، څو ماشومان خبرې، لوستل، تلاوت او اصلاح ترلاسه کړي. کورنۍ د درس یادښتونه، تمرینونه او اختیاري د بیاکتنې مواد هم ترلاسه کوي.'
    },
    {
      question: 'تاسو کوم وخت زونونه ملاتړ کوئ؟',
      answer:
        'موږ د شمالي امریکا، اروپا، برېتانیا، اسټرالیا او نورو سیمو لپاره ګروپونه پلان کوو چې افغان کورنۍ پکې اوسېږي. د کچې ټاکلو ټیم له کورنیو سره د عملي مهالویش په ټاکلو کې مرسته کوي.'
    },
    {
      question: 'ایا خویندې وروڼه په یوه پلان کې شاملېدای شي؟',
      answer:
        'هو. کورنۍ پلانونه د خویندو وروڼو ملاتړ او د کچې ټاکلو لارښوونه لري، څو ماشومان په سمه کچه زده کړه وکړي.'
    },
    {
      question: 'ایا ماشومان باید مخکې ژبنۍ پوهه ولري؟',
      answer:
        'نه. د پیل لارې له تورو، غږونو، ساده کلمو او د باور جوړونې تمرین څخه شروع کېږي.'
    },
    {
      question: 'زده کوونکی څنګه په سمه کچه کېږدئ؟',
      answer:
        'له نوملیکنې وروسته د ماشوم عمر، اوسنۍ وړتیا، د کورنۍ موخې او غوره وخت زون ګورو. ځینې زده کوونکي له ګروپ سره تر یوځای کېدو مخکې لنډ د کچې ټاکلو تماس ترلاسه کوي.'
    },
    {
      question: 'ایا والدین د پرمختګ تازه معلومات ترلاسه کوي؟',
      answer:
        'هو. والدین د استاد یادښتونه، د ډشبورډ پرمختګ، د راتلونکي صنف یادونې او د تمرین سپارښتنې ترلاسه کوي، څو زده کړه په کور کې دوام وکړي.'
    }
  ]
}

export const getFaqs = (locale: LocaleCode = defaultLocale) => faqsByLocale[locale]

export const faqs = getFaqs()
