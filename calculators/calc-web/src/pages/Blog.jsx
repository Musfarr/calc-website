import Layout from '../components/Layout';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Blog() {
  const fetchPosts = async () => {
    const response = await axios.get('https://wp-calc-blog.page.gd/wp-json/wp/v2/posts?_embed');
    return response.data;
  };
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getFeaturedImage = (post) => {
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return 'https://via.placeholder.com/400x250/6c757d/ffffff?text=Blog+Post';
  };

  const getExcerpt = (excerpt) => {
    const div = document.createElement('div');
    div.innerHTML = excerpt;
    const text = div.textContent || div.innerText || '';
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

    return (

      <>
      <Helmet> 
        <title>Final Grades Calculator | Study Tips, GPA Guides & Exam Insights</title>
        <meta
          name="description"
          content="Explore the Final Grades Calculator blog for expert study advice, GPA calculation guides, exam prep strategies, and success tips. Learn how to boost your grades."
        />
        <link rel="canonical" href="https://www.finalgradescalculator.com/blog/" />
      </Helmet>
    <Layout title="Blog">
      <div className="calculator-container">
        <h2 className="mb-4">Blog</h2>
        <p className="text-muted">
          Educational content, tips, and resources for students.
        </p>

        <div className="row mt-4">
          {/* Placeholder for WordPress blog posts */}
          {/* <div className="col-md-12">
          <div className="alert alert-info">!
              <h5>🚀 WordPress Blog Integration Coming Soon!</h5>
              <p className="mb-0">
                This section will display blog posts from your WordPress backend. 
                You can integrate WordPress REST API or GraphQL here to fetch and display posts.
              </p>
            </div>
          </div> */}

          {isLoading && (
            <div className="col-12 d-flex justify-content-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Blog Post Cards */}
          {!isLoading && posts?.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm hover-shadow">
                {/* Featured Image */}
                <img 
                  src={getFeaturedImage(post)} 
                  className="card-img-top" 
                  alt={post.title.rendered}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250/6c757d/ffffff?text=Blog+Post';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title.rendered}</h5>
                  <p className="text-muted small mb-2">
                    <i className="bi bi-calendar3"></i> {formatDate(post.date)}
                  </p>
                  <p className="card-text flex-grow-1">
                    {getExcerpt(post.excerpt.rendered)}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}/`} 
                    className="btn btn-outline-primary btn-sm mt-auto"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          
        </div>

        
      </div>
    </Layout>
    </>
  );
}
