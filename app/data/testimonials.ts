import { defaultLocale, type LocaleCode } from '~/i18n/messages'
import type { Testimonial } from '~/types'

const testimonialsByLocale: Record<LocaleCode, Testimonial[]> = {
  en: [
    {
      name: 'Farzana Amini',
      location: 'California, United States',
      quote:
        'My daughter used to answer her grandparents in English. After Dari Foundations, she reads short sentences and tries speaking Dari every weekend.',
      result: 'Parent of a Dari Foundations student'
    },
    {
      name: 'Hamid Karimi',
      location: 'Ontario, Canada',
      quote:
        'The Quran Reading teacher is patient and clear. We can finally see progress because the dashboard shows what our son practiced and what comes next.',
      result: 'Parent of a Quran Reading student'
    },
    {
      name: 'Zahra Noori',
      location: 'Melbourne, Australia',
      quote:
        'Roshanayi understands families living abroad. The class times work for us, and the lessons feel connected to our home, language, and values.',
      result: 'Family Plan parent'
    }
  ],
  fa: [
    {
      name: 'فرزانه امینی',
      location: 'کالیفرنیا، ایالات متحده',
      quote:
        'دخترم پیش‌تر به پدرکلان و مادرکلانش به انگلیسی پاسخ می‌داد. پس از بنیادهای دری، جمله‌های کوتاه می‌خواند و هر آخر هفته کوشش می‌کند دری صحبت کند.',
      result: 'والد شاگرد دوره بنیادهای دری'
    },
    {
      name: 'حمید کریمی',
      location: 'انتاریو، کانادا',
      quote:
        'استاد روخوانی قرآن صبور و روشن درس می‌دهد. بالاخره پیشرفت را می‌بینیم چون داشبورد نشان می‌دهد پسر ما چه تمرین کرده و بعد چه می‌آید.',
      result: 'والد شاگرد روخوانی قرآن'
    },
    {
      name: 'زهرا نوری',
      location: 'ملبورن، آسترالیا',
      quote:
        'روشنایی خانواده‌های بیرون از کشور را می‌فهمد. وقت صنف‌ها برای ما مناسب است و درس‌ها به خانه، زبان و ارزش‌های ما پیوند دارد.',
      result: 'والد پلن خانوادگی'
    }
  ],
  ps: [
    {
      name: 'فرزانه امیني',
      location: 'کالیفورنیا، متحده ایالات',
      quote:
        'زما لور به پخوا خپل نیکه او انا ته په انګلیسي ځواب ورکاوه. د دري بنسټونو وروسته لنډې جملې لولي او هره اونۍ هڅه کوي دري خبرې وکړي.',
      result: 'د دري بنسټونو د زده کوونکي والد'
    },
    {
      name: 'حمید کریمي',
      location: 'اونټاریو، کاناډا',
      quote:
        'د قرآن لوستلو استاد صبور او روښانه دی. موږ بالاخره پرمختګ وینو، ځکه ډشبورډ ښيي زوی مو څه تمرین کړي او څه ورپسې دي.',
      result: 'د قرآن لوستلو د زده کوونکي والد'
    },
    {
      name: 'زهرا نوري',
      location: 'ملبورن، اسټرالیا',
      quote:
        'روښنايي له هېواده بهر کورنۍ درک کوي. د صنف وختونه زموږ لپاره کار کوي او درسونه زموږ له کور، ژبې او ارزښتونو سره تړلي ښکاري.',
      result: 'د کورنۍ پلان والد'
    }
  ]
}

export const getTestimonials = (locale: LocaleCode = defaultLocale) => testimonialsByLocale[locale]

export const testimonials = getTestimonials()
