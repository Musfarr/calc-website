import Layout from '../components/Layout';
import Link from 'next/link';
import { fetchPosts } from '../lib/wp';

export const metadata = {
  title: 'Blog – Final Grades Calculator',
  description: 'Read our latest articles about grades, calculators, and educational tips.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/blog/',
  },
  openGraph: {
    title: 'Blog – Final Grades Calculator',
    description: 'Read our latest articles about grades, calculators, and educational tips.',
    url: 'https://www.finalgradescalculator.com/blog/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog – Final Grades Calculator',
    description: 'Read our latest articles about grades, calculators, and educational tips.',
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  let posts = [];

  try {
    const data = await fetchPosts({ per_page: 20 });
    posts = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('BlogPage: failed to fetch posts', err);
  }

  return (
    <Layout>
      <h1 className="mb-4">Blog</h1>
      {posts.length === 0 ? (
        <div className="calculator-container">No posts found.</div>
      ) : (
        <div className="blog-list-container">
          <div className="row">
            {posts.map((post) => {
              const featured = post._embedded?.['wp:featuredmedia']?.[0];
              const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '';

              return (
                <div key={post.id} className="col-md-6 col-lg-4 mb-4 blog-card">
                  <div className="card h-100">
                    {featured && (
                      <img
                        src={featured.source_url}
                        className="card-img-top"
                        alt={post.title.rendered}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h2 className="card-title h5">{post.title.rendered}</h2>
                      <p className="card-text flex-grow-1">{excerpt.substring(0, 150)}...</p>
                      <Link href={`/blog/${post.slug}/`} className="btn btn-read btn-sm mt-2 align-self-start">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}
