import path from 'path';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

const WORDPRESS_BASE_URL = 'https://calculator.risenxagency.com/wp-json/wp/v2';

const withTrailingSlash = (url) => (url.endsWith('/') ? url : `${url}/`);

const fetchPostSlugs = async () => {
  const slugs = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL(`${WORDPRESS_BASE_URL}/posts`);
    url.searchParams.set('per_page', String(perPage));
    url.searchParams.set('page', String(page));
    url.searchParams.set('_fields', 'slug');

    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'calc-web-prerender',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch slugs (page ${page}): ${response.status} ${errorText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    data.forEach((post) => {
      if (post?.slug) {
        slugs.push(post.slug);
      }
    });

    if (data.length < perPage) {
      break;
    }

    page += 1;
  }

  return slugs;
};

const buildRoutes = async () => {
  const baseRoutes = [
    '/',
    '/grade-calculator/',
    '/percentage-calculator/',
    '/gpa-calculator/',
    '/blog/',
    '/privacy/',
    '/terms/',
  ];

  const slugs = await fetchPostSlugs();
  const blogRoutes = slugs.map((slug) => withTrailingSlash(`/blog/${slug}`));

  return Array.from(new Set([...baseRoutes, ...blogRoutes]));
};

const run = async () => {
  const routes = await buildRoutes();

  const prerenderer = new Prerenderer({
    staticDir: path.join(process.cwd(), 'dist'),
    routes,
    renderer: new PuppeteerRenderer({
      headless: 'new',
      renderAfterTime: 8000,
    }),
  });

  await prerenderer.initialize();
  await prerenderer.renderRoutes(routes);
  await prerenderer.destroy();
};

run().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
