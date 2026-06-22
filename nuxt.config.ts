export default defineNuxtConfig({
  compatibilityDate: '2026-06-12',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabasePublishableKey: process.env.NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      paypalClientId: process.env.NUXT_PUBLIC_PAYPAL_CLIENT_ID || ''
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Roshanayi Academy',
      titleTemplate: '%s | Roshanayi Academy',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Roshanayi Academy helps Afghan children abroad learn Dari, Pashto, English, Islamic Studies, Quran, and Afghan Culture & Heritage through premium online classes.'
        },
        { name: 'theme-color', content: '#6D28D9' },
        { property: 'og:site_name', content: 'Roshanayi Academy' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/hero-roshanayi-academy.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/about',
        '/courses',
        '/courses/dari-for-children',
        '/courses/dari-for-teens',
        '/courses/dari-reading-writing',
        '/courses/dari-for-english-speakers-beginner',
        '/courses/dari-for-english-speakers-intermediate',
        '/courses/pashto-for-children',
        '/courses/pashto-for-teens',
        '/courses/pashto-reading-writing',
        '/courses/pashto-for-english-speakers-beginner',
        '/courses/pashto-for-english-speakers-intermediate',
        '/courses/english-starter',
        '/courses/english-beginner',
        '/courses/english-intermediate',
        '/courses/english-advanced',
        '/courses/spoken-english',
        '/courses/quran-reading-basics',
        '/courses/quran-tajweed',
        '/courses/islamic-studies-for-children',
        '/courses/daily-duas-islamic-manners',
        '/courses/seerah-of-prophet-muhammad',
        '/courses/afghan-culture-heritage',
        '/teachers',
        '/apply-teacher',
        '/pricing',
        '/contact',
        '/management',
        '/classrooms',
        '/classrooms/classroom-dari-foundations',
        '/classrooms/classroom-quran-beginners',
        '/classrooms/classroom-tajweed-essentials',
        '/classrooms/classroom-pashto-kids',
        '/classrooms/classroom-english-confidence',
        '/classrooms/classroom-farsi-english-speakers',
        '/classrooms/classroom-dari-fluency',
        '/classrooms/classroom-islamic-basics',
        '/classrooms/classroom-afghan-culture',
        '/dashboard',
        '/dashboard/admin',
        '/dashboard/admin/payments',
        '/dashboard/manager',
        '/dashboard/manager/payments',
        '/dashboard/teacher',
        '/dashboard/parent',
        '/dashboard/parent/payments',
        '/dashboard/student',
        '/dashboard/student/payments',
        '/login',
        '/register'
      ]
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts'
  },
  typescript: {
    strict: true
  }
})
