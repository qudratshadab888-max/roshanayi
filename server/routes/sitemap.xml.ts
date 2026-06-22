const routes = [
  '',
  'about',
  'courses',
  'courses/dari-for-children',
  'courses/dari-for-teens',
  'courses/dari-reading-writing',
  'courses/dari-for-english-speakers-beginner',
  'courses/dari-for-english-speakers-intermediate',
  'courses/pashto-for-children',
  'courses/pashto-for-teens',
  'courses/pashto-reading-writing',
  'courses/pashto-for-english-speakers-beginner',
  'courses/pashto-for-english-speakers-intermediate',
  'courses/english-starter',
  'courses/english-beginner',
  'courses/english-intermediate',
  'courses/english-advanced',
  'courses/spoken-english',
  'courses/quran-reading-basics',
  'courses/quran-tajweed',
  'courses/islamic-studies-for-children',
  'courses/daily-duas-islamic-manners',
  'courses/seerah-of-prophet-muhammad',
  'courses/afghan-culture-heritage',
  'teachers',
  'apply-teacher',
  'pricing',
  'contact',
  'dashboard',
  'login',
  'register'
]

export default defineEventHandler((event) => {
  const baseUrl = 'https://roshanayi.academy'
  const urls = routes
    .map((route) => {
      const loc = route ? `${baseUrl}/${route}` : baseUrl

      return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${route ? '0.8' : '1.0'}</priority></url>`
    })
    .join('')

  setHeader(event, 'content-type', 'application/xml; charset=UTF-8')

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
})
