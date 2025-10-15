import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout title="Terms and Conditions">
      <div className="calculator-container">
        <h2 className="mb-4 text-white">Terms and Conditions</h2>
        <p className="text-muted">Last updated: October 15, 2025</p>

        <div className="mt-4">
          <p>
            Welcome to Final Grades Calculator
            (<a href="https://finalgradescalculator.com/" target="_blank" rel="noopener noreferrer">https://finalgradescalculator.com/</a>).
          </p>
          <p>
            By using this website, you agree to the following terms and conditions. Please read them carefully before using our tools or services.
          </p>

          <h4>1. Acceptance of Terms</h4>
          <p>
            By accessing and using Final Grades Calculator, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website.
          </p>

          <h4 className="mt-4">2. Use of Website</h4>
          <p>Our website provides free online tools such as:</p>
          <ul>
            <li>Final Grade Calculator</li>
            <li>GPA Calculator</li>
            <li>Percentage Calculator</li>
          </ul>
          <p>
            You may use these tools for personal, educational, or non-commercial purposes only. You agree not to misuse, copy, or redistribute the tools or their underlying code.
          </p>

          <h4 className="mt-4">3. Accuracy of Information</h4>
          <p>
            While we try our best to ensure accuracy, the calculators and results are provided for informational purposes only. Final Grades Calculator does not guarantee the correctness, completeness, or reliability of any calculation or content on the site. Always verify results independently before making any decisions based on them.
          </p>

          <h4 className="mt-4">4. Advertisements</h4>
          <p>
            Our website displays Google AdSense ads. We are not responsible for the content, accuracy, or privacy practices of third-party advertisers. Clicking on ads is at your own discretion.
          </p>

          <h4 className="mt-4">5. Intellectual Property</h4>
          <p>
            All text, design, and functionality on Final Grades Calculator are owned by us and protected under applicable copyright laws. You may not copy, reproduce, or redistribute any part of the website without prior written consent.
          </p>

          <h4 className="mt-4">6. Limitation of Liability</h4>
          <p>
            Final Grades Calculator and its owners shall not be held liable for any loss, damage, or consequences resulting from your use of the website or its tools, inaccurate calculations or technical errors, or third-party links or ads. Use of this site is entirely at your own risk.
          </p>

          <h4 className="mt-4">7. External Links</h4>
          <p>
            Our website may contain links to external websites for reference or advertising. We do not control and are not responsible for the content or policies of these third-party sites.
          </p>

          <h4 className="mt-4">8. Modifications to Terms</h4>
          <p>
            We may update these Terms and Conditions at any time without prior notice. Changes will be posted on this page with an updated date. Continued use of the website means you accept the revised terms.
          </p>

          <h4 className="mt-4">9. Contact Us</h4>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at{' '}
            <a href="mailto:support@finalgradescalculator.com">support@finalgradescalculator.com</a>.
          </p>

        </div>
      </div>
    </Layout>
  );
}
