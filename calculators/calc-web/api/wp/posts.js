const WORDPRESS_BASE_URL = 'https://calculator.risenxagency.com/wp-json/wp/v2';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const url = new URL(`${WORDPRESS_BASE_URL}/posts`);

  for (const [key, value] of Object.entries(req.query || {})) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, String(item)));
    } else {
      url.searchParams.set(key, String(value));
    }
  }

  if (!url.searchParams.has('_embed')) {
    url.searchParams.set('_embed', '');
  }

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

    const posts = JSON.parse(text);
    if (!Array.isArray(posts)) {
      console.error('WP API did not return an array:', posts);
      return res.status(200).json([]);
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(502).json({ error: 'Bad Gateway', message: error?.message || 'Unknown error' });
  }
}
