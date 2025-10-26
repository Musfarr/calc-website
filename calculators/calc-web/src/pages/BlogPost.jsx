import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Layout from '../components/Layout';

export default function BlogPost() {
  const { slug } = useParams();

  const fetchPost = async () => {
    const response = await axios.get(
      `https://wp-calc-blog.page.gd/wp-json/wp/v2/posts?slug=${slug}`
    );
    return response.data[0]; // WordPress returns an array, get first item
  };

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: fetchPost,
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout title={post?.title.rendered || 'Blog Post'}>
      <div className="calculator-container">
        {/* Back to Blog Link */}
        <Link to="/blog/" className="btn btn-outline-secondary mb-4">
          ← Back to Blog
        </Link>

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {isError && (
          <div className="alert alert-danger">
            <strong>Error loading post:</strong> {error.message}
          </div>
        )}

        {post && (
          <article>
            {/* Post Header */}
            <header className="mb-4">
              <h1 className="mb-3 text-white">{post.title.rendered}</h1>
              <p className="text-muted">
                <small>Published on {formatDate(post.date)}</small>
              </p>
            </header>

            {/* Post Content */}
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Back to Blog Link (bottom) */}
            <div className="mt-5 pt-4 border-top">
              <Link to="/blog/" className="btn btn-outline-secondary">
                ← Back to Blog
              </Link>
            </div>
          </article>
        )}
      </div>
    </Layout>
  );
}
