import Layout from '../components/Layout';

export default function Blog() {
  return (
    <Layout title="Blog">
      <div className="calculator-container">
        <h2 className="mb-4">Blog</h2>
        <p className="text-muted">
          Educational content, tips, and resources for students.
        </p>

        <div className="row mt-4">
          {/* Placeholder for WordPress blog posts */}
          <div className="col-md-12">
            <div className="alert alert-info">
              <h5>🚀 WordPress Blog Integration Coming Soon!</h5>
              <p className="mb-0">
                This section will display blog posts from your WordPress backend. 
                You can integrate WordPress REST API or GraphQL here to fetch and display posts.
              </p>
            </div>
          </div>

          {/* Example Blog Post Cards */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">How to Calculate Your GPA</h5>
                <p className="text-muted small mb-2">Posted on Jan 15, 2025</p>
                <p className="card-text">
                  Learn the basics of GPA calculation and how it impacts your academic standing...
                </p>
                <a href="#" className="btn btn-outline-primary btn-sm">Read More</a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Study Tips for Final Exams</h5>
                <p className="text-muted small mb-2">Posted on Jan 10, 2025</p>
                <p className="card-text">
                  Prepare effectively for your finals with these proven study strategies...
                </p>
                <a href="#" className="btn btn-outline-primary btn-sm">Read More</a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Understanding Weighted Grades</h5>
                <p className="text-muted small mb-2">Posted on Jan 5, 2025</p>
                <p className="card-text">
                  Discover how weighted grades work and calculate your course grade accurately...
                </p>
                <a href="#" className="btn btn-outline-primary btn-sm">Read More</a>
              </div>
            </div>
          </div>
        </div>

        {/* WordPress Integration Instructions */}
        <div className="mt-5 p-4 bg-light rounded">
          <h4>📝 WordPress Integration Guide</h4>
          <p>To integrate WordPress blog posts into this page:</p>
          <ol className="mb-0">
            <li>
              <strong>Set up WordPress REST API:</strong>
              <br />
              <code>const WP_API = 'https://your-wp-site.com/wp-json/wp/v2/posts'</code>
            </li>
            <li>
              <strong>Fetch posts using React Query or useEffect:</strong>
              <br />
              <code>const &#123; data: posts &#125; = useQuery(['posts'], () =&gt; fetchPosts());</code>
            </li>
            <li>
              <strong>Display posts dynamically:</strong>
              <br />
              Map through the posts array and render them in cards or list format.
            </li>
            <li>
              <strong>Add pagination and filtering:</strong>
              <br />
              Implement pagination for better user experience with large numbers of posts.
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
