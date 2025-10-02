import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout title="Privacy Policy">
      <div className="calculator-container">
        <h2 className="mb-4">Privacy Policy</h2>
        <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-4">
          <h4>1. Information We Collect</h4>
          <p>
            Calculator Hub is committed to protecting your privacy. We do not collect, store, 
            or share any personal information. All calculations are performed locally in your 
            browser, and no data is sent to our servers.
          </p>

          <h4 className="mt-4">2. Cookies and Tracking</h4>
          <p>
            We may use cookies and similar tracking technologies to improve user experience. 
            These may include:
          </p>
          <ul>
            <li>Analytics cookies to understand how visitors use our site</li>
            <li>Advertising cookies from third-party ad networks</li>
            <li>Preference cookies to remember your settings</li>
          </ul>

          <h4 className="mt-4">3. Third-Party Services</h4>
          <p>
            Our website may display advertisements from third-party ad networks. These networks 
            may use cookies and web beacons to collect information about your visits to this and 
            other websites to provide advertisements about goods and services of interest to you.
          </p>

          <h4 className="mt-4">4. Data Security</h4>
          <p>
            Since we do not collect or store personal data, there is no risk of your calculation 
            data being compromised. All calculations happen in your browser and are not transmitted 
            to our servers.
          </p>

          <h4 className="mt-4">5. Children's Privacy</h4>
          <p>
            Our service is intended for students and general users. We do not knowingly collect 
            personal information from children under 13. If you are a parent or guardian and believe 
            your child has provided personal information, please contact us.
          </p>

          <h4 className="mt-4">6. Changes to This Policy</h4>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h4 className="mt-4">7. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our 
            website.
          </p>
        </div>
      </div>
    </Layout>
  );
}
