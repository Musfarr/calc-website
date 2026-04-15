import { Metadata } from 'next';
import Layout from '../components/Layout';

export const metadata = {
  title: 'Terms & Conditions – Final Grades Calculator',
  description: 'Read the terms and conditions for using Final Grades Calculator. Understand your rights and responsibilities when using our free grade calculation tools.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/terms/',
  },
  openGraph: {
    title: 'Terms & Conditions – Final Grades Calculator',
    description: 'Read the terms and conditions for using Final Grades Calculator. Understand your rights and responsibilities when using our free grade calculation tools.',
    url: 'https://www.finalgradescalculator.com/terms/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions – Final Grades Calculator',
    description: 'Read the terms and conditions for using Final Grades Calculator. Understand your rights and responsibilities when using our free grade calculation tools.',
  },
};

export default function TermsPage() {
  return (
    <Layout>
      <h1 className="mb-4">Terms &amp; Conditions</h1>
      <div className="calculator-container">
        <p><strong>Last Updated: April 15, 2026</strong></p>
        <p>
          Welcome to Final Grades Calculator. By accessing or using our website at{' '}
          <a href="https://www.finalgradescalculator.com">www.finalgradescalculator.com</a>, you agree to be bound by
          these Terms &amp; Conditions. Please read them carefully before using our site.
        </p>

        <h2 className="mt-4">1. Acceptance of Terms</h2>
        <p>
          By using this website, you confirm that you are at least 13 years of age and agree to comply with these
          Terms &amp; Conditions. If you do not agree with any part of these terms, please discontinue use of our
          website immediately.
        </p>

        <h2 className="mt-4">2. Use of the Website</h2>
        <p>
          Final Grades Calculator provides free academic tools including grade calculators, GPA calculators, and
          percentage calculators for personal, non-commercial educational use. You agree to use this website only for
          lawful purposes and in a manner that does not infringe the rights of others.
        </p>
        <p>You agree NOT to:</p>
        <ul>
          <li>Copy, reproduce, or redistribute any content from this website for commercial purposes</li>
          <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
          <li>Use any automated tools, bots, or scrapers to extract content from this website</li>
          <li>Misrepresent the accuracy of calculator results as official academic records</li>
        </ul>

        <h2 className="mt-4">3. Accuracy of Information</h2>
        <p>
          The calculators and tools provided on this website are intended for estimation and planning purposes only.
          While we strive to ensure accuracy, Final Grades Calculator does not guarantee that the results produced by
          our tools are error-free or suitable for official academic use.
        </p>
        <p>
          Always verify your grades and academic standing directly with your educational institution. We are not
          responsible for any academic decisions made based on results from our calculators.
        </p>

        <h2 className="mt-4">4. Intellectual Property</h2>
        <p>
          All content on this website, including but not limited to text, graphics, logos, calculator designs, and
          blog articles, is the intellectual property of Final Grades Calculator and is protected under applicable
          copyright laws.
        </p>
        <p>
          You may not reproduce, duplicate, or publish any content from this website without prior written permission
          from us.
        </p>

        <h2 className="mt-4">5. Third-Party Advertising</h2>
        <p>
          Our website displays advertisements served by Google AdSense and potentially other third-party ad networks.
          These advertisers may use cookies and similar technologies to serve ads relevant to your interests. We are
          not responsible for the content of third-party advertisements displayed on our site.
        </p>
        <p>For more information, please refer to our <a href="/privacy/">Privacy Policy</a>.</p>

        <h2 className="mt-4">6. Third-Party Links</h2>
        <p>
          Our website may contain links to external websites for reference or informational purposes. These links do
          not constitute an endorsement of the linked websites. We have no control over the content or privacy
          practices of third-party sites and accept no responsibility for them.
        </p>

        <h2 className="mt-4">7. Disclaimer of Warranties</h2>
        <p>
          This website and its tools are provided on an &quot;as is&quot; and &quot;as available&quot; basis without
          any warranties of any kind, either express or implied. Final Grades Calculator makes no warranties that:
        </p>
        <ul>
          <li>The website will be uninterrupted or error-free</li>
          <li>The results produced by our calculators will be accurate in all cases</li>
          <li>The website is free of viruses or other harmful components</li>
        </ul>

        <h2 className="mt-4">8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Final Grades Calculator shall not be liable for any
          direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to
          use this website, including reliance on any calculator results provided herein.
        </p>

        <h2 className="mt-4">9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be effective
          immediately upon posting to this page with an updated &quot;Last Updated&quot; date. Your continued use of
          the website after any changes constitutes your acceptance of the revised terms.
        </p>

        <h2 className="mt-4">10. Governing Law</h2>
        <p>
          These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of Pakistan.
          Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the
          courts of Pakistan.
        </p>

        <h2 className="mt-4">11. Contact Us</h2>
        <p>
          If you have any questions about these Terms &amp; Conditions, please contact us at:{' '}
          <a href="mailto:info@finalgradescalculator.com">info@finalgradescalculator.com</a>
        </p>
      </div>
    </Layout>
  );
}
