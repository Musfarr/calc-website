const WORDPRESS_BASE_URL = 'https://calculator.risenxagency.com/wp-json/wp/v2';

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  // If slug is provided, fetch single post
  if (slug) {
    const wpUrl = new URL(`${WORDPRESS_BASE_URL}/posts`);
    wpUrl.searchParams.set('slug', slug);
    wpUrl.searchParams.set('_embed', '');

    try {
      const wpResponse = await fetch(wpUrl.toString(), {
        headers: { Accept: 'application/json' },
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

  // Otherwise, fetch posts list
  const wpUrl = new URL(`${WORDPRESS_BASE_URL}/posts`);

  for (const [key, value] of searchParams.entries()) {
    wpUrl.searchParams.set(key, value);
  }

  if (!wpUrl.searchParams.has('_embed')) {
    wpUrl.searchParams.set('_embed', '');
  }

  try {
    const wpResponse = await fetch(wpUrl.toString(), {
      headers: { Accept: 'application/json' },
    });

    const data = await wpResponse.json();

    return new Response(JSON.stringify(data), {
      status: wpResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
