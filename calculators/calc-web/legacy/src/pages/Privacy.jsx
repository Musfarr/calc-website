import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout title="Privacy Policy">
      <div className="calculator-container">
        <h2 className="mb-4 text-white">Privacy Policy</h2>
        <p className="text-muted">Last updated: October 15, 2025</p>

        <div className="mt-4">
          <p><strong>Privacy Policy for Final Grades Calculator</strong></p>
          <p>Welcome to Final Grades Calculator (<a href="https://finalgradescalculator.com/" target="_blank" rel="noopener noreferrer">https://finalgradescalculator.com/</a>).</p>
          <p>Your privacy is important to us. This page explains what information we collect, how we use it, and how we keep it safe.</p>

          <h4 className="mt-4">1. Information We Collect</h4>
          <p>We do not collect any personal information such as names, emails, or passwords.</p>
          <p>Our website may automatically collect basic, non-personal information including:</p>
          <ul>
            <li>Your IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages you visit on our site</li>
            <li>Time spent and interactions on the site</li>
          </ul>
          <p>This information is collected anonymously to improve our website’s performance and user experience.</p>

          <h4 className="mt-4">2. Cookies and Advertising</h4>
          <p>Our website uses cookies to:</p>
          <ul>
            <li>Improve site functionality and remember user preferences</li>
            <li>Measure site traffic and analytics (e.g., via Google Analytics)</li>
            <li>Display Google AdSense ads</li>
          </ul>
          <p>Google AdSense may use cookies to show you personalized ads based on your browsing history.</p>
          <p>
            You can learn more or opt out of personalized ads by visiting{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
          </p>

          <h4 className="mt-4">3. How We Use Information</h4>
          <p>We use collected data only to:</p>
          <ul>
            <li>Improve our calculators and website features</li>
            <li>Analyze traffic trends and visitor behavior</li>
            <li>Display relevant ads through Google AdSense</li>
          </ul>
          <p>We do not sell, rent, or share any data with third parties beyond what is necessary for analytics or advertising.</p>

          <h4 className="mt-4">4. Third-Party Services</h4>
          <p>We may use third-party services like Google Analytics and Google AdSense. These services may collect anonymous data through cookies according to their own privacy policies.</p>
          <p>
            You can read Google’s privacy policy here:{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
          </p>

          <h4 className="mt-4">5. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@finalgradescalculator.com">support@finalgradescalculator.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
