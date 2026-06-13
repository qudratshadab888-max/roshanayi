export default defineNuxtConfig({
  compatibilityDate: '2026-06-12',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
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
            'Roshanayi Academy helps Afghan children abroad learn Dari, Pashto, Quran Reading, Tajweed, and Afghan Culture & Heritage through premium online classes.'
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
        '/courses/dari-language-foundations',
        '/courses/pashto-for-kids',
        '/courses/quran-reading-for-beginners',
        '/courses/tajweed-essentials',
        '/courses/afghan-culture-heritage',
        '/teachers',
        '/pricing',
        '/contact',
        '/management',
        '/classrooms',
        '/classrooms/classroom-dari-foundations',
        '/classrooms/classroom-quran-beginners',
        '/classrooms/classroom-tajweed-essentials',
        '/classrooms/classroom-pashto-kids',
        '/classrooms/classroom-english-confidence',
        '/dashboard',
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
