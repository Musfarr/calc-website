import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.finalgradescalculator.com';
const WORDPRESS_API = 'https://calculator.risenxagency.com/wp-json/wp/v2/posts';

// Static routes with their priorities
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/grade-calculator/', priority: '0.8', changefreq: 'weekly' },
  { path: '/gpa-calculator/', priority: '0.8', changefreq: 'weekly' },
  { path: '/percentage-calculator/', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog/', priority: '0.7', changefreq: 'daily' },
  { path: '/privacy/', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms/', priority: '0.5', changefreq: 'monthly' },
];

async function fetchBlogPosts() {
  try {
    const response = await axios.get(WORDPRESS_API);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
    return [];
  }
}

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

function generateSitemapXML(routes) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

async function generateSitemap() {
  console.log('🚀 Generating sitemap...');

  // Get current date for static routes
  const today = formatDate(new Date());

  // Add static routes
  const allRoutes = staticRoutes.map(route => ({
    ...route,
    lastmod: today,
  }));

  // Fetch and add blog posts
  console.log('📝 Fetching blog posts from WordPress...');
  const posts = await fetchBlogPosts();
  
  posts.forEach(post => {
    allRoutes.push({
      path: `/blog/${post.slug}/`,
      lastmod: formatDate(post.modified),
      changefreq: 'monthly',
      priority: '0.6',
    });
  });

  console.log(`✅ Found ${posts.length} blog posts`);

  // Generate XML
  const sitemapXML = generateSitemapXML(allRoutes);

  // Write to file
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXML);

  console.log(`✅ Sitemap generated successfully with ${allRoutes.length} URLs`);
  console.log(`📍 Location: ${sitemapPath}`);
}

generateSitemap().catch(error => {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
});
