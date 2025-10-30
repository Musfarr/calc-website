# Sitemap Generation Script

This script automatically generates a dynamic sitemap that includes all blog posts from WordPress.

## Usage

### Manual Generation
```bash
npm run generate:sitemap
```

### Automatic Generation (on build)
The sitemap is automatically regenerated before each build:
```bash
npm run build
```

## How It Works

1. Fetches all blog posts from the WordPress API
2. Combines static routes with dynamic blog post URLs
3. Generates an XML sitemap at `public/sitemap.xml`
4. Includes proper lastmod dates, changefreq, and priority values

## Configuration

Edit `scripts/generate-sitemap.js` to:
- Update the site URL
- Modify static routes
- Adjust priority and changefreq values
- Change the WordPress API endpoint

## Output

The generated sitemap includes:
- Static pages (calculators, privacy, terms, etc.)
- Blog listing page
- Individual blog post pages (dynamically fetched)

All URLs include trailing slashes for SEO consistency.
