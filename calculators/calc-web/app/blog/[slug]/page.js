import { Metadata } from 'next';
import Layout from '../../components/Layout';
import BlogPost from '../../components/BlogPost';
import { fetchPostBySlug, getPostMeta } from '../../lib/wp';

// Allow dynamic rendering for new posts not in generateStaticParams
export const dynamicParams = true;

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  try {
    const post = await fetchPostBySlug(params.slug);

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The blog post you are looking for does not exist.',
      };
    }

    const meta = getPostMeta(post);
    const canonical = `https://www.finalgradescalculator.com/blog/${post.slug}/`;
    const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '';

    return {
      title: meta?.title || post.title.rendered,
      description: meta?.description || excerpt,
      alternates: {
        canonical,
      },
      robots: meta?.robots || 'index, follow',
      openGraph: {
        title: meta?.og_title || post.title.rendered,
        description: meta?.og_description || excerpt,
        url: canonical,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: meta?.twitter_title || post.title.rendered,
        description: meta?.twitter_description || excerpt,
      },
    };
  } catch (err) {
    console.error('Error generating metadata for blog post:', err);
    return {
      title: 'Blog Post',
      description: 'Read our blog post',
    };
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch('https://calculator.risenxagency.com/wp-json/wp/v2/posts?per_page=100', {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const posts = await res.json();
    if (!Array.isArray(posts)) return [];
    return posts.map((post) => ({ slug: String(post.slug) }));
  } catch (err) {
    console.error('Error generating static params:', err);
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    return (
      <Layout>
        <div className="calculator-container">
          <h1>Post Not Found</h1>
          <p>The blog post you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <BlogPost post={post} />
    </Layout>
  );
}
