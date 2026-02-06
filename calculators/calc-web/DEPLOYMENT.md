# Deployment Guide

## Vercel Deployment

This Next.js application is optimized for deployment on Vercel with automatic builds and ISR caching.

### Prerequisites

1. GitHub repository connected to Vercel
2. Vercel account with project created
3. Environment variables configured

### Environment Variables

Set these in Vercel Project Settings → Environment Variables:

```
NEXT_PUBLIC_WP_BASE_URL=https://calculator.risenxagency.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://www.finalgradescalculator.com
NEXT_PUBLIC_GA_ID=G-98RFDVM6LP
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-9269385747801854
```

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Migrate to Next.js with SSR/ISR for SEO"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically detect the push and start building
   - Build takes ~2-3 minutes
   - Once deployed, your site is live at your Vercel domain

3. **Custom Domain**
   - In Vercel project settings, add your custom domain
   - Update DNS records as instructed by Vercel

### Verification After Deployment

1. **Check Meta Tags in View Source**
   - Open any blog post URL in browser
   - Press `Ctrl+U` to view page source
   - Verify `<title>`, `<meta name="description">`, `<link rel="canonical">` are present

2. **Test Sitemap**
   - Visit `https://yourdomain.com/sitemap.xml/`
   - Verify all routes are listed with correct priorities

3. **SEO Tools**
   - Run through Ahrefs, SEMrush, or similar SEO tools
   - Verify meta tags are detected
   - Check that canonical URLs are correct

### ISR (Incremental Static Regeneration)

- Blog posts are cached for 5 minutes (300 seconds)
- After 5 minutes, next request triggers revalidation
- New blog posts will appear in sitemap within 5 minutes of publishing
- Meta tags for new posts will be server-rendered on first request after revalidation

### Monitoring

1. **Vercel Analytics**
   - Monitor build times and performance
   - Check for any build errors in Deployment logs

2. **Server Logs**
   - Check Vercel Function logs for any errors
   - Monitor WordPress API response times

### Troubleshooting

**Issue: Meta tags not showing in View Source**
- Verify ISR revalidation time has passed (5 minutes)
- Check WordPress API is responding correctly
- Verify `generateMetadata()` function is being called

**Issue: Sitemap not updating**
- Check `fetchPosts()` is returning data from WordPress
- Verify ISR cache is being cleared (5-minute revalidation)
- Check Vercel logs for errors

**Issue: Blog posts not rendering**
- Verify WordPress API endpoint is accessible
- Check post slug format matches WordPress
- Verify `fetchPostBySlug()` is working correctly

### Rollback

If you need to rollback to a previous version:
1. In Vercel dashboard, go to Deployments
2. Find the previous successful deployment
3. Click "Redeploy" to restore that version

### Performance Tips

1. **Image Optimization**
   - Use Next.js Image component for featured images
   - Vercel automatically optimizes images

2. **Caching**
   - ISR is set to 5 minutes for blog posts
   - Adjust `revalidate` value in `app/lib/wp.js` if needed

3. **Database**
   - WordPress API is cached at Vercel edge
   - Consider increasing cache time for high-traffic sites

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to test locally.

## Production Build

```bash
npm run build
npm start
```

This creates an optimized production build and starts the server.
