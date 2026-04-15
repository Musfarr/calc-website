const WORDPRESS_BASE_URL = 'https://calculator.risenxagency.com/wp-json/wp/v2';
const BASE_URL = 'https://www.finalgradescalculator.com';

const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' },
  { url: '/grade-calculator/', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/percentage-calculator/', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/gpa-calculator/', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/blog/', priority: 0.9, changeFrequency: 'daily' },
  { url: '/about/', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/contact/', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/privacy/', priority: 0.5, changeFrequency: 'yearly' },
  { url: '/terms/', priority: 0.5, changeFrequency: 'yearly' },
];

export default async function sitemap() {
  let blogEntries = [];

  try {
    const res = await fetch(
      `${WORDPRESS_BASE_URL}/posts?per_page=100&_fields=slug,modified`,
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: 3600 },
      }
    );
    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts)) {
        blogEntries = posts.map((post) => ({
          url: `${BASE_URL}/blog/${post.slug}/`,
          lastModified: post.modified ? new Date(post.modified) : new Date(),
          priority: 0.7,
          changeFrequency: 'weekly',
        }));
      }
    }
  } catch (err) {
    console.error('Sitemap: failed to fetch blog posts', err);
  }

  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(today),
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }));

  return [...staticEntries, ...blogEntries];
}
