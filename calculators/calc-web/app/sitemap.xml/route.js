import { fetchPosts } from '../lib/wp';

export async function GET() {
  const baseUrl = 'https://www.finalgradescalculator.com';

  const staticRoutes = [
    { url: '/', lastmod: new Date().toISOString().split('T')[0], priority: '1.0' },
    { url: '/grade-calculator/', lastmod: new Date().toISOString().split('T')[0], priority: '0.8' },
    { url: '/percentage-calculator/', lastmod: new Date().toISOString().split('T')[0], priority: '0.8' },
    { url: '/gpa-calculator/', lastmod: new Date().toISOString().split('T')[0], priority: '0.8' },
    { url: '/blog/', lastmod: new Date().toISOString().split('T')[0], priority: '0.9' },
    { url: '/privacy/', lastmod: new Date().toISOString().split('T')[0], priority: '0.5' },
    { url: '/terms/', lastmod: new Date().toISOString().split('T')[0], priority: '0.5' },
  ];

  let blogRoutes = [];
  try {
    const posts = await fetchPosts({ per_page: 100 });
    if (Array.isArray(posts)) {
      blogRoutes = posts.map((post) => ({
        url: `/blog/${post.slug}/`,
        lastmod: new Date(post.modified).toISOString().split('T')[0],
        priority: '0.7',
      }));
    }
  } catch (err) {
    console.error('Error fetching blog posts for sitemap:', err);
  }

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
