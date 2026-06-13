import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/data/**/*.{js,ts}',
    './app/app.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6D28D9',
          purpleDark: '#4C1D95',
          purpleSoft: '#F3E8FF',
          gold: '#FBBF24',
          goldDark: '#B45309',
          ink: '#1F2937'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 55px rgba(17, 24, 39, 0.08)',
        lift: '0 14px 35px rgba(109, 40, 217, 0.18)'
      }
    }
  },
  plugins: []
} satisfies Config
