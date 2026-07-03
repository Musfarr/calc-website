import Layout from '../components/Layout';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Us – Final Grades Calculator',
  description: 'Have a question or suggestion? Get in touch with the Final Grades Calculator team. We typically respond within 24–48 hours.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactPage() {
  return (
    <Layout>
      <h1 className="mb-2">Contact Us</h1>
      <p className="text-muted mb-4">
        Have a question or suggestion? Fill out the form below and your email client will open with everything
        pre-filled. We typically respond within 24–48 hours.
      </p>

      <div className="calculator-container">
        <ContactForm />

        <hr className="my-4" />

        <div className="d-flex align-items-start gap-2 mt-3">
          <div>
            <p className="mb-1 fw-semibold">Email us directly:</p>
            <a href="mailto:info@finalgradescalculator.com" className="text-decoration-none">
              info@finalgradescalculator.com
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
