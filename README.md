# Roshanayi Academy

Roshanayi Academy is a modern Nuxt 4 educational platform for Afghan families abroad. It includes responsive public pages, course browsing, course details, teacher profiles, pricing, contact, registration, login, and a sample student dashboard.

## Stack

- Nuxt 4
- Vue 3 Composition API
- TypeScript
- Tailwind CSS
- Responsive design
- Dark mode
- SEO metadata and sitemap route

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Structure

- `app/components/layout` - header and footer
- `app/components/sections` - home and marketing sections
- `app/components/ui` - reusable cards, buttons, FAQ, newsletter
- `app/data` - typed course, teacher, FAQ, and testimonial content
- `app/pages` - all Nuxt routes
- `app/assets/css/main.css` - Tailwind layers and shared utilities
- `public/images` - project-bound image assets
- `server/routes/sitemap.xml.ts` - SEO sitemap
