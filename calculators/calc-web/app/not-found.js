import Link from 'next/link';
import Layout from './components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="calculator-container text-center">
        <h1>404 - Page Not Found</h1>
        <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </Layout>
  );
}
