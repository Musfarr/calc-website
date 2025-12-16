const WORDPRESS_BASE_URL = 'https://wp-calc-blog.page.gd/wp-json/wp/v2';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const slug = req.query?.slug;

  if (!slug || (Array.isArray(slug) && !slug.length)) {
    return res.status(400).json({ error: 'Missing slug query param' });
  }

  const slugValue = Array.isArray(slug) ? slug[0] : slug;

  const url = new URL(`${WORDPRESS_BASE_URL}/posts`);
  url.searchParams.set('slug', String(slugValue));
  url.searchParams.set('_embed', '');

  try {
    const wpResponse = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'calc-web-vercel-proxy',
      },
    });

    const text = await wpResponse.text();

    res.setHeader('Content-Type', wpResponse.headers.get('content-type') || 'application/json');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    if (!wpResponse.ok) {
      return res.status(wpResponse.status).send(text);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: 'Invalid JSON from upstream' });
    }

    const post = Array.isArray(data) ? data[0] : data;

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(502).json({ error: 'Bad Gateway', message: error?.message || 'Unknown error' });
  }
}
