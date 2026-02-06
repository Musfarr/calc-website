# Next.js Migration Notes

## What Changed

### From Vite React to Next.js 14 (App Router)

**Architecture:**
- **Before**: Client-side rendered (CSR) React app with react-router-dom
- **After**: Server-side rendered (SSR) Next.js with App Router

**Key Improvements:**
1. **SEO Meta Tags**: Now rendered server-side, visible in "View Source" (Ctrl+U)
2. **ISR (Incremental Static Regeneration)**: Blog posts cached and revalidated every 5 minutes
3. **Dynamic Sitemap**: Automatically includes all routes with proper priorities
4. **Trailing Slashes**: All routes enforce trailing slashes for SEO consistency
5. **Native Script Management**: Google Analytics and AdSense integrated via Next.js Script component

### File Structure

**Removed:**
- `src/` directory (old Vite structure)
- `vite.config.js`
- `index.html` (Vite entry point)
- `react-router-dom` dependencies
- `react-helmet-async` (replaced by Next.js metadata API)
- `@tanstack/react-query` (replaced by native fetch with ISR)
- Prerender scripts (replaced by Next.js ISR)

**Added:**
- `app/` directory (Next.js App Router)
- `app/layout.js` (root layout with global scripts)
- `app/globals.css` (global styles)
- `app/lib/wp.js` (WordPress API utilities)
- `next.config.js` (Next.js configuration)
- `.env.example` (environment variables template)
- `DEPLOYMENT.md` (deployment guide)

### Routes

All routes now include trailing slashes:

| Old Route | New Route |
|-----------|-----------|
| `/` | `/` |
| `/grade-calculator` | `/grade-calculator/` |
| `/percentage-calculator` | `/percentage-calculator/` |
| `/gpa-calculator` | `/gpa-calculator/` |
| `/blog` | `/blog/` |
| `/blog/:slug` | `/blog/:slug/` |
| `/privacy` | `/privacy/` |
| `/terms` | `/terms/` |
| `/sitemap.xml` | `/sitemap.xml/` |

### Components

**Calculator Components:**
- `FinalGradeCalculator.jsx` → `app/calculators/FinalGradeCalculator.jsx` (client component)
- `GradeCalculator.jsx` → `app/calculators/GradeCalculator.jsx` (client component)
- `PercentageCalculator.jsx` → `app/calculators/PercentageCalculator.jsx` (client component)
- `GPACalculator.jsx` → `app/calculators/GPACalculator.jsx` (client component)

**Layout & Blog:**
- `Layout.jsx` → `app/components/Layout.jsx` (client component with Bootstrap)
- `BlogList.jsx` → `app/components/BlogList.jsx` (client-side fetching)
- `BlogPost.jsx` → `app/components/BlogPost.jsx` (client-side rendering with TOC)

**Server Components:**
- `app/page.js` (home page with metadata)
- `app/blog/page.js` (blog listing with metadata)
- `app/blog/[slug]/page.js` (dynamic blog posts with SSR metadata)
- `app/grade-calculator/page.js` (metadata wrapper)
- `app/percentage-calculator/page.js` (metadata wrapper)
- `app/gpa-calculator/page.js` (metadata wrapper)
- `app/privacy/page.js` (static page)
- `app/terms/page.js` (static page)

### Data Fetching

**Before:**
```javascript
// Client-side with react-query
const { data: posts } = useQuery(['posts'], () => 
  axios.get('/api/wp/posts')
);
```

**After:**
```javascript
// Server-side with ISR
export async function generateMetadata({ params }) {
  const post = await fetchPostBySlug(params.slug);
  // Meta tags rendered server-side
}

// Client-side for dynamic content
const [posts, setPosts] = useState([]);
useEffect(() => {
  fetch('https://calculator.risenxagency.com/wp-json/wp/v2/posts')
    .then(r => r.json())
    .then(setPosts);
}, []);
```

### Meta Tags

**Before (Client-side):**
```javascript
<Helmet>
  <title>{post.title}</title>
  <meta name="description" content={post.description} />
</Helmet>
```

**After (Server-side):**
```javascript
export const metadata = {
  title: post.title,
  description: post.description,
  canonical: 'https://www.finalgradescalculator.com/blog/post-slug/',
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
};
```

### Styling

- Bootstrap 5.3.2 imported globally in `app/layout.js`
- All CSS from `src/App.css` and `src/index.css` merged into `app/globals.css`
- Responsive design maintained with Bootstrap grid system
- Custom CSS for gradients, animations, and theme colors preserved

### Scripts

**Google Analytics & AdSense:**
- Moved from `index.html` to `app/layout.js`
- Using Next.js `<Script>` component with `strategy="afterInteractive"`
- Ensures scripts load after page hydration

### Dependencies

**Removed:**
- `vite`
- `react-router-dom`
- `react-helmet-async`
- `@tanstack/react-query`
- `axios`
- `@prerenderer/prerenderer`
- `@prerenderer/renderer-puppeteer`
- `@sparticuz/chromium`

**Added:**
- `next` (14.1.0)
- `bootstrap` (5.3.2)

**Unchanged:**
- `react` (18.3.1)
- `react-dom` (18.3.1)

## Verification Checklist

- [x] Next.js app builds successfully
- [x] All routes compile without errors
- [x] Blog posts pre-render as static HTML
- [x] Sitemap route generates XML
- [x] Dev server runs on localhost:3000
- [ ] Meta tags visible in View Source for blog posts
- [ ] Sitemap includes all routes with correct priorities
- [ ] Trailing slashes work correctly
- [ ] Calculator pages render with pixel parity
- [ ] Blog list fetches and displays posts
- [ ] Blog post pages show TOC and author info
- [ ] Responsive design works on mobile
- [ ] Google Analytics fires on page load
- [ ] AdSense script loads correctly

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions to Vercel.

## Rollback Plan

If issues arise, the old Vite app is still available in git history:
```bash
git log --oneline
git checkout <commit-hash>
```

## Future Improvements

1. **Image Optimization**: Use Next.js `<Image>` component for featured images
2. **Caching**: Increase ISR revalidation time if needed
3. **Analytics**: Add Vercel Web Analytics for performance monitoring
4. **API Routes**: Create `/api/revalidate` webhook for on-demand ISR
5. **Sitemap Index**: Split sitemap into multiple files for large sites
6. **Schema.org**: Add structured data for blog posts and calculators
