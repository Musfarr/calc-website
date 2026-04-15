import Layout from '../components/Layout';

export const metadata = {
  title: 'About Us – Final Grades Calculator',
  description: 'Learn about Final Grades Calculator — a free online tool built to help students calculate their final exam grades, weighted grades, and GPA with ease.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/about/',
  },
  openGraph: {
    title: 'About Us – Final Grades Calculator',
    description: 'Learn about Final Grades Calculator — a free online tool built to help students calculate their final exam grades, weighted grades, and GPA with ease.',
    url: 'https://www.finalgradescalculator.com/about/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us – Final Grades Calculator',
    description: 'Learn about Final Grades Calculator — a free online tool built to help students calculate their final exam grades, weighted grades, and GPA with ease.',
  },
};

export default function AboutPage() {
  return (
    <Layout>
      <h1 className="mb-4">About Final Grades Calculator</h1>
      <div className="calculator-container">
        <p>
          Final Grades Calculator is a free academic tool designed to help students at every level — from high school
          to university — to take control of their academic performance. Our platform provides instant, accurate grade
          calculations so students can plan smarter and focus on what matters most: their studies.
        </p>

        <h2 className="mt-4">Our Purpose</h2>
        <p>
          Academic planning shouldn&apos;t be complicated. Students often find themselves unsure of where they stand in
          a course, especially as final exams approach. Final Grades Calculator was created to eliminate that
          uncertainty by giving every student a clear, data-driven answer in seconds.
        </p>

        <h2 className="mt-4">Our Tools</h2>
        <p>We offer a suite of free calculators built for everyday academic use:</p>
        <ul>
          <li>
            <strong><a href="/">Final Grade Calculator</a>:</strong> Determine the exact score required on your final
            exam to achieve your desired course grade.
          </li>
          <li>
            <strong><a href="/grade-calculator/">Grade Calculator</a>:</strong> Compute your overall grade across
            multiple assignments and assessments.
          </li>
          <li>
            <strong><a href="/gpa-calculator/">GPA Calculator</a>:</strong> Monitor and calculate your GPA.
          </li>
          <li>
            <strong><a href="/percentage-calculator/">Percentage Calculator</a>:</strong> Perform quick and accurate
            percentage calculations for any academic purpose.
          </li>
        </ul>

        <h2 className="mt-4">Our Commitment</h2>
        <p>
          We are committed to providing students with reliable, fast, and completely free tools — no registration
          required, no hidden fees, and no unnecessary complexity. Every calculator on this site is built with accuracy
          and simplicity as the top priorities.
        </p>

        <h2 className="mt-4">Get In Touch</h2>
        <p>
          We welcome feedback, suggestions, and inquiries. Please visit our{' '}
          <a href="/contact/">Contact page</a> to reach out. We typically respond within 1–2 business days.
        </p>
      </div>
    </Layout>
  );
}
