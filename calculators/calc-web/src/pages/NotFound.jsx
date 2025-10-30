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
          
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/" className="btn btn-outline-primary">
              Final Grade Calculator
            </Link>
            <Link to="/grade-calculator/" className="btn btn-outline-primary">
              Grade Calculator
            </Link>
            <Link to="/percentage-calculator/" className="btn btn-outline-primary">
              Percentage Calculator
            </Link>
            <Link to="/gpa-calculator/" className="btn btn-outline-primary">
              GPA Calculator
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
