# Verification Guide

Follow these steps to verify the migration is working correctly before deploying to Vercel.

## Local Testing

### 1. Start Dev Server
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

### 2. Test Calculator Pages

**Final Grade Calculator** (`/`)
- [ ] Page loads without errors
- [ ] Title shows "Final Grade Calculator"
- [ ] Input fields work (current grade, desired grade, final weight)
- [ ] Calculate button produces result
- [ ] Result displays correctly

**Grade Calculator** (`/grade-calculator/`)
- [ ] Page loads
- [ ] Can add/remove assignments
- [ ] Calculate button works
- [ ] Weighted grade displays

**Percentage Calculator** (`/percentage-calculator/`)
- [ ] Page loads
- [ ] Dropdown to select calculation type works
- [ ] Calculate button produces result

**GPA Calculator** (`/gpa-calculator/`)
- [ ] Page loads
- [ ] Can add/remove courses
- [ ] Grade dropdown populated
- [ ] Calculate button works

### 3. Test Blog Pages

**Blog Listing** (`/blog/`)
- [ ] Page loads
- [ ] Blog posts display as cards
- [ ] "Read More" links work
- [ ] Featured images show (if available)

**Blog Post** (`/blog/how-to-study-for-a-test/`)
- [ ] Page loads
- [ ] Title displays
- [ ] Featured image shows
- [ ] Content renders
- [ ] Table of Contents appears
- [ ] Author bio displays
- [ ] Meta tags in View Source (see step 4)

### 4. Verify Meta Tags in View Source

**For any blog post:**
1. Open `http://localhost:3000/blog/how-to-study-for-a-test/`
2. Press `Ctrl+U` (or `Cmd+U` on Mac) to view page source
3. Look for these tags in `<head>`:
   ```html
   <title>Blog Post Title</title>
   <meta name="description" content="...">
   <link rel="canonical" href="https://www.finalgradescalculator.com/blog/.../">
   <meta property="og:title" content="...">
   <meta property="og:description" content="...">
   <meta name="twitter:card" content="summary_large_image">
   ```

**Expected Result**: All meta tags should be visible in the HTML source.

### 5. Test Static Pages

**Privacy Policy** (`/privacy/`)
- [ ] Page loads
- [ ] Content displays

**Terms & Conditions** (`/terms/`)
- [ ] Page loads
- [ ] Content displays

**404 Page** (`/nonexistent-page/`)
- [ ] Shows "404 - Page Not Found"
- [ ] "Go Home" button works

### 6. Test Sitemap

**Sitemap Route** (`/sitemap.xml/`)
- [ ] Opens as XML file
- [ ] Contains all calculator routes
- [ ] Contains blog listing
- [ ] Contains all blog posts
- [ ] Each entry has `<loc>`, `<lastmod>`, `<priority>`

### 7. Test Trailing Slashes

**Without trailing slash** (should redirect):
- [ ] `http://localhost:3000/grade-calculator` → redirects to `/grade-calculator/`
- [ ] `http://localhost:3000/blog` → redirects to `/blog/`

### 8. Test Responsive Design

**Mobile View** (use browser DevTools):
- [ ] Navigation collapses to hamburger menu
- [ ] Content readable on small screens
- [ ] Buttons clickable
- [ ] Tables scroll horizontally
- [ ] Images scale properly

**Tablet View**:
- [ ] Layout adapts
- [ ] Content readable
- [ ] All features work

### 9. Test Scripts

**Google Analytics**:
- [ ] Open browser DevTools → Network tab
- [ ] Reload page
- [ ] Look for request to `www.googletagmanager.com`
- [ ] Should see `gtag` requests

**Google AdSense**:
- [ ] Open browser DevTools → Network tab
- [ ] Look for request to `pagead2.googlesyndication.com`
- [ ] Script should load without errors

### 10. Check Console for Errors

**Browser Console** (F12):
- [ ] No red error messages
- [ ] No 404 errors for resources
- [ ] No CORS errors
- [ ] Warnings are OK (Next.js dev warnings)

## Production Build Testing

### Build for Production
```bash
npm run build
npm start
```

### Verify Production Build
- [ ] Build completes without errors
- [ ] Server starts on `http://localhost:3000`
- [ ] All pages load
- [ ] Meta tags still visible in View Source
- [ ] No console errors

## SEO Tool Verification

### Using Ahrefs or SEMrush

1. **Enter your Vercel URL** (after deployment)
2. **Check Meta Tags**:
   - [ ] Title detected
   - [ ] Description detected
   - [ ] Canonical URL detected
   - [ ] OpenGraph tags detected
   - [ ] Twitter tags detected

3. **Check Sitemap**:
   - [ ] Sitemap URL recognized
   - [ ] All URLs indexed
   - [ ] No crawl errors

### Using Google Search Console

1. **Add property** for your domain
2. **Submit sitemap** at `/sitemap.xml/`
3. **Check coverage**:
   - [ ] All URLs indexed
   - [ ] No errors
   - [ ] No warnings

## Performance Checks

### Lighthouse (Chrome DevTools)

1. Open DevTools → Lighthouse
2. Run audit for:
   - [ ] Performance (target: >90)
   - [ ] Accessibility (target: >90)
   - [ ] Best Practices (target: >90)
   - [ ] SEO (target: >90)

### Core Web Vitals

- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

## Deployment Verification

After deploying to Vercel:

### 1. Test Live Site
- [ ] All pages load from Vercel URL
- [ ] Meta tags visible in View Source
- [ ] Sitemap accessible at `/sitemap.xml/`
- [ ] Calculators work
- [ ] Blog posts render
- [ ] No console errors

### 2. Test Custom Domain
- [ ] Domain points to Vercel
- [ ] All pages accessible
- [ ] HTTPS working
- [ ] Redirects working

### 3. Monitor Vercel Logs
```bash
vercel logs [project-name]
```
- [ ] No errors in function logs
- [ ] No 500 errors
- [ ] WordPress API calls successful

### 4. Final SEO Check
- [ ] Run Ahrefs/SEMrush crawl
- [ ] Verify meta tags detected
- [ ] Check for crawl errors
- [ ] Verify sitemap indexed

## Rollback Plan

If issues occur:

1. **Stop current deployment**
   ```bash
   vercel rollback
   ```

2. **Revert to previous version**
   - In Vercel dashboard → Deployments
   - Find previous successful deployment
   - Click "Redeploy"

3. **Check git history**
   ```bash
   git log --oneline
   git checkout <commit-hash>
   ```

## Common Issues & Solutions

### Issue: Meta tags not in View Source
**Solution**:
- Wait 5 minutes for ISR revalidation
- Hard refresh (Ctrl+Shift+R)
- Check WordPress API is responding
- Verify `generateMetadata()` in page file

### Issue: Blog posts not loading
**Solution**:
- Check WordPress API endpoint
- Verify post slug format
- Check browser console for errors
- Verify `fetchPostBySlug()` working

### Issue: Sitemap empty
**Solution**:
- Check `/sitemap.xml/` endpoint
- Verify WordPress API returns posts
- Check Vercel logs for errors
- Wait for ISR revalidation

### Issue: Trailing slashes not working
**Solution**:
- Verify `next.config.js` has `trailingSlash: true`
- Rebuild and redeploy
- Clear browser cache

### Issue: Calculators not working
**Solution**:
- Check Bootstrap JS loaded
- Verify no console errors
- Test on localhost first
- Check input validation logic

## Success Criteria

✅ **Migration is successful when:**
1. All pages load without errors
2. Meta tags visible in View Source for blog posts
3. Sitemap includes all routes
4. Trailing slashes working
5. Calculators functional
6. Blog posts rendering with TOC and author
7. No console errors
8. Responsive design working
9. SEO tools detect meta tags
10. Production build works

---

**Ready to Deploy?** ✓

If all checks pass, you're ready to deploy to Vercel!
