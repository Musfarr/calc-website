import Layout from '../components/Layout';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Blog() {
  const fetchPosts = async () => {

    const response = await axios.get('https://wp-calc-blog.page.gd/wp-json/wp/v2/posts');
    return response.data;
  };
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us' ,{
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  console.log('posts', posts);
  return (
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

          {/* Example Blog Post Cards */}
          {!isLoading && posts?.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{post.title.rendered}</h5>
                  <p className="text-muted small mb-2">Posted on {formatDate(post.date)}</p>
                  <p className="card-text">
                    {post.excerpt.rendered.substring(0, 102) + "..."}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="btn btn-outline-primary btn-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}

          
        </div>

        
      </div>
    </Layout>
  );
}
