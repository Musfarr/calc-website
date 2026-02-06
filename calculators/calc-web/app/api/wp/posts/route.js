const WORDPRESS_BASE_URL = 'https://calculator.risenxagency.com/wp-json/wp/v2';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const wpUrl = new URL(`${WORDPRESS_BASE_URL}/posts`);
  
  // Copy all query params to WordPress URL
  for (const [key, value] of searchParams.entries()) {
    wpUrl.searchParams.set(key, value);
  }
  
  // Ensure _embed is set
  if (!wpUrl.searchParams.has('_embed')) {
    wpUrl.searchParams.set('_embed', '');
  }

  try {
    const wpResponse = await fetch(wpUrl.toString(), {
      headers: {
        Accept: 'application/json',
      },
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
