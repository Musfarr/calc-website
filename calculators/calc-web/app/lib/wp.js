import { cache } from 'react';

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

export const fetchPostBySlug = cache(async function fetchPostBySlug(slug) {
  const url = new URL(`${WORDPRESS_BASE_URL}/posts`);
  url.searchParams.set('slug', slug);
  url.searchParams.set('per_page', '1');
  url.searchParams.set('_embed', '');

  const attemptFetch = () =>
    fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 300 },
    });

  let res;
  try {
    res = await attemptFetch();
    if (!res.ok) throw new Error(`Failed with status ${res.status}`);
  } catch (err) {
    try {
      res = await attemptFetch();
    } catch (retryErr) {
      console.error(`fetchPostBySlug: failed after retry for slug "${slug}"`, retryErr);
      return null;
    }
  }

  if (!res.ok) {
    return null;
  }
  const posts = await res.json();
  return Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
});

export function getPostMeta(post) {
  return post?.yoast_head_json || null;
}

export function getCanonicalFromMeta(meta) {
  return meta?.canonical || null;
}
