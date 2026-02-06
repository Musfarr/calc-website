# Final Grades Calculator - Next.js

A modern Next.js application for grade, GPA, and percentage calculations with a blog powered by WordPress API.

## Features

- **Server-Side Rendering (SSR)**: Meta tags (title, description, canonical, OG, Twitter) are rendered server-side for proper SEO indexing.
- **Incremental Static Regeneration (ISR)**: Blog posts are cached and revalidated every 5 minutes.
- **Dynamic Sitemap**: Automatically includes all calculator routes and blog posts.
- **Trailing Slashes**: All routes include trailing slashes for SEO consistency.
- **Bootstrap 5**: Responsive, modern UI with Bootstrap styling.
- **Google Analytics & AdSense**: Integrated tracking and monetization scripts.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **React**: 18.3
- **Styling**: Bootstrap 5.3.2, custom CSS
- **CMS**: WordPress REST API
- **Deployment**: Vercel

## Project Structure

```
app/
├── layout.js                 # Root layout with global scripts
├── globals.css               # Global styles
├── page.js                   # Home page (Final Grade Calculator)
├── calculators/              # Calculator components
│   ├── FinalGradeCalculator.jsx
│   ├── GradeCalculator.jsx
│   ├── PercentageCalculator.jsx
│   └── GPACalculator.jsx
├── components/
│   ├── Layout.jsx            # Main layout wrapper
│   ├── BlogList.jsx          # Blog listing
│   └── BlogPost.jsx          # Blog post display
├── blog/
│   ├── page.js               # Blog listing page
│   └── [slug]/page.js        # Dynamic blog post page
├── grade-calculator/page.js
├── percentage-calculator/page.js
├── gpa-calculator/page.js
├── privacy/page.js
├── terms/page.js
├── sitemap.xml/route.js      # Dynamic sitemap
├── not-found.js              # 404 page
└── lib/
    └── wp.js                 # WordPress API utilities
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file (optional, defaults are set):

```
NEXT_PUBLIC_WP_BASE_URL=https://calculator.risenxagency.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://www.finalgradescalculator.com
```

## SEO & Meta Tags

### Server-Side Rendering

All pages use Next.js `metadata` API for server-side meta tag generation:

```javascript
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  canonical: 'https://www.finalgradescalculator.com/page/',
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
};
```

### Blog Posts

Blog post meta tags are fetched from WordPress Yoast SEO JSON and rendered server-side via `generateMetadata()`:

```javascript
export async function generateMetadata({ params }) {
  const post = await fetchPostBySlug(params.slug);
  const meta = getPostMeta(post);
  // Returns title, description, canonical, robots, OG, Twitter from Yoast
}
```

### Verification

To verify meta tags are server-rendered:
1. Open any page in your browser.
2. Press `Ctrl+U` (or `Cmd+U` on Mac) to view page source.
3. Meta tags should be visible in the `<head>` section.

## Blog Posts

### Fetching Posts

Blog posts are fetched from the WordPress REST API with ISR caching:

```javascript
export async function fetchPosts(params = {}) {
  // Fetches with 5-minute revalidation (ISR)
}

export async function fetchPostBySlug(slug) {
  // Fetches a single post by slug
}
```

### New Posts

When a new blog post is published in WordPress:
1. The app will fetch it client-side immediately (via `BlogList.jsx`).
2. Server-side meta tags will be generated on the next request (ISR revalidation).
3. The sitemap will include the new post within 5 minutes.

**Recommendation**: Set up a WordPress webhook to trigger a Vercel rebuild on new posts for instant SEO indexing.

## Sitemap

The dynamic sitemap is available at `/sitemap.xml/` and includes:
- All calculator routes (priority 0.8)
- Blog listing (priority 0.9)
- All blog posts (priority 0.7)
- Static pages (priority 0.5)

Sitemap is cached for 1 hour with stale-while-revalidate for 24 hours.

## Deployment

### Vercel

1. Push code to GitHub.
2. Connect repo to Vercel.
3. Vercel will auto-build and deploy on push.
4. Meta tags and sitemap are generated at build time and on-demand via ISR.

### Environment

Ensure these are set in Vercel project settings:
- `NEXT_PUBLIC_WP_BASE_URL`: WordPress API base URL
- `NEXT_PUBLIC_SITE_URL`: Your site's canonical URL

## Scripts

- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## License

MIT
