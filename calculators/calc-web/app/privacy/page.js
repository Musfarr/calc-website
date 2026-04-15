import { Metadata } from 'next';
import Layout from '../components/Layout';

export const metadata = {
  title: 'Privacy Policy – Final Grades Calculator',
  description: 'Learn how Final Grades Calculator collects, uses, and protects your data. Your privacy is important to us — read our full privacy policy here.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/privacy/',
  },
  openGraph: {
    title: 'Privacy Policy – Final Grades Calculator',
    description: 'Learn how Final Grades Calculator collects, uses, and protects your data. Your privacy is important to us — read our full privacy policy here.',
    url: 'https://www.finalgradescalculator.com/privacy/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy – Final Grades Calculator',
    description: 'Learn how Final Grades Calculator collects, uses, and protects your data. Your privacy is important to us — read our full privacy policy here.',
  },
};

export default function PrivacyPage() {
  return (
    <Layout>
      <h1 className="mb-4">Privacy Policy</h1>
      <div className="calculator-container">
        <p><strong>Last Updated: April 15, 2026</strong></p>
        <p>
          Welcome to Final Grades Calculator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy
          explains how we collect, use, and protect your information when you visit{' '}
          <a href="https://www.finalgradescalculator.com">www.finalgradescalculator.com</a>. By using our website, you
          agree to the terms outlined in this policy.
        </p>

        <h2 className="mt-4">1. Information We Collect</h2>
        <p>We may collect the following types of information when you visit our website:</p>
        <ul>
          <li><strong>Usage Data:</strong> Pages visited, time spent on pages, browser type, device type, and IP address.</li>
          <li><strong>Cookies &amp; Tracking Data:</strong> Small files stored on your device that help us understand how users interact with our site.</li>
          <li><strong>Voluntarily Provided Information:</strong> Any information you choose to submit when contacting us, such as your name and email address.</li>
        </ul>
        <p>We do not collect sensitive personal information such as financial details, passwords, or government identification numbers.</p>

        <h2 className="mt-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate and improve our website and calculators</li>
          <li>Analyze website traffic and user behavior to enhance user experience</li>
          <li>Serve relevant advertisements through third-party ad networks</li>
          <li>Respond to inquiries submitted via our contact form or email</li>
        </ul>

        <h2 className="mt-4">3. Cookies</h2>
        <p>
          Our website uses cookies to improve your browsing experience. Cookies are small text files placed on your
          device by your browser. We use the following types of cookies:
        </p>
        <ul>
          <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (e.g., Google Analytics).</li>
          <li><strong>Advertising Cookies:</strong> Used by third-party ad networks to serve relevant advertisements based on your interests and browsing history.</li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings at any time. Please note that disabling
          cookies may affect the functionality of certain features on our website.
        </p>

        <h2 className="mt-4">4. Google AdSense &amp; Third-Party Advertising</h2>
        <p>
          We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads
          based on your prior visits to this website or other websites on the internet.
        </p>
        <ul>
          <li>Google and its partners may use cookies to serve ads based on your browsing history.</li>
          <li>You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
          <li>For more information on how Google collects and uses data, please visit <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy &amp; Terms</a>.</li>
        </ul>
        <p>
          Third-party vendors, including Google, use cookies in conjunction with web beacons to compile data about
          your interactions with our website in order to serve you relevant advertisements.
        </p>

        <h2 className="mt-4">5. Google Analytics</h2>
        <p>
          We may use Google Analytics to analyze website traffic. Google Analytics collects information such as how
          often users visit our site, what pages they visit, and what other sites they used prior to visiting. We use
          this information to improve our website. Google Analytics collects only the IP address assigned to you on
          the date you visit our site. For more information, visit the{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Analytics Privacy Policy</a>.
        </p>

        <h2 className="mt-4">6. Disclosure of Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share information in the
          following limited circumstances:
        </p>
        <ul>
          <li><strong>Service Providers:</strong> Trusted third-party services that assist us in operating our website (e.g., hosting providers, analytics tools).</li>
          <li><strong>Legal Requirements:</strong> If required by law or in response to valid legal requests by public authorities.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
        </ul>

        <h2 className="mt-4">7. Data Retention</h2>
        <p>
          We retain usage and analytics data only for as long as necessary to fulfill the purposes outlined in this
          Privacy Policy. We do not store personal data beyond what is required for operational purposes.
        </p>

        <h2 className="mt-4">8. Children&apos;s Privacy</h2>
        <p>
          Our website is not directed at children under the age of 13. We do not knowingly collect personal
          information from children. If you believe a child has provided us with personal information, please contact
          us and we will promptly delete it.
        </p>

        <h2 className="mt-4">9. Your Privacy Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
          <li><strong>Opt-Out:</strong> Opt out of personalized advertising at any time via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at the email below.</p>

        <h2 className="mt-4">10. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or
          content of those websites. We encourage you to review the privacy policies of any third-party sites you
          visit.
        </p>

        <h2 className="mt-4">11. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page
          with an updated &quot;Last Updated&quot; date. Your continued use of our website after any changes
          constitutes your acceptance of the revised policy.
        </p>

        <h2 className="mt-4">12. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:{' '}
          <a href="mailto:info@finalgradescalculator.com">info@finalgradescalculator.com</a>
        </p>
      </div>
    </Layout>
  );
}
