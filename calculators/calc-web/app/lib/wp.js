const WORDPRESS_BASE_URL = 'https://calculator.risenxagency.com/wp-json/wp/v2';

const defaultFetchOptions = { next: { revalidate: 300 } };

export async function fetchPosts(params = {}) {
  const url = new URL(`${WORDPRESS_BASE_URL}/posts`);
  const merged = {
    _embed: '',
    per_page: 20,
    ...params,
  };
  Object.entries(merged).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, String(v)));
    } else {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
    ...defaultFetchOptions,
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export async function fetchPostBySlug(slug) {
  const posts = await fetchPosts({ slug, per_page: 1 });
  return Array.isArray(posts) ? posts[0] : null;
}

export function getPostMeta(post) {
  return post?.yoast_head_json || null;
}

export function getCanonicalFromMeta(meta) {
  return meta?.canonical || null;
}
