const routes = [
  '',
  'about',
  'courses',
  'courses/dari-language-foundations',
  'courses/pashto-for-kids',
  'courses/quran-reading-for-beginners',
  'courses/tajweed-essentials',
  'courses/afghan-culture-heritage',
  'teachers',
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
