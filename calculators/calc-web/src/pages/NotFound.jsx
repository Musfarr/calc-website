import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Final Grades Calculator</title>
        <meta name="description" content="Oops! The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Layout title="404 - Page Not Found">
        <div className="text-center py-5">
          <h1 className="display-4 fw-bold text-white">404 - Page Not Found</h1>
          <p className="text-muted mt-3">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <img
            src="/404.jpg"
            alt="404 Page Not Found"
            className="img-fluid my-4"
            style={{ maxWidth: '360px' }}
          />
          <div>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
