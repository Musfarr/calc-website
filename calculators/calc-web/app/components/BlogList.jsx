'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://calculator.risenxagency.com/wp-json/wp/v2/posts?_embed&per_page=20');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="calculator-container">Loading posts...</div>;
  if (error) return <div className="calculator-container text-danger">Error: {error}</div>;
  if (posts.length === 0) return <div className="calculator-container">No posts found.</div>;

  return (
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
                  <h5 className="card-title">{post.title.rendered}</h5>
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
  );
}
