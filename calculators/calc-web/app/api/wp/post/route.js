const WORDPRESS_BASE_URL = 'https://calculator.risenxagency.com/wp-json/wp/v2';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const wpUrl = new URL(`${WORDPRESS_BASE_URL}/posts`);
  wpUrl.searchParams.set('slug', slug);
  wpUrl.searchParams.set('_embed', '');

  try {
    const wpResponse = await fetch(wpUrl.toString(), {
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await wpResponse.json();
    const post = Array.isArray(data) ? data[0] : data;

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
