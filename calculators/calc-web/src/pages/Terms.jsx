import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout title="Terms and Conditions">
      <div className="calculator-container">
        <h2 className="mb-4">Terms and Conditions</h2>
        <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-4">
          <h4>1. Acceptance of Terms</h4>
          <p>
            By accessing and using Calculator Hub, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to these terms, please do not 
            use our service.
          </p>

          <h4 className="mt-4">2. Use of Service</h4>
          <p>
            Calculator Hub provides free online calculators for educational purposes. You agree to use 
            these calculators for lawful purposes only. The service is provided "as is" without any 
            warranties, expressed or implied.
          </p>

          <h4 className="mt-4">3. Accuracy of Calculations</h4>
          <p>
            While we strive to provide accurate calculations, Calculator Hub does not guarantee the 
            accuracy, completeness, or reliability of any calculation results. Users should verify 
            important calculations independently.
          </p>
          <p>
            <strong>Important:</strong> Do not rely solely on our calculators for critical academic 
            or financial decisions. Always double-check important calculations with your instructor 
            or institution.
          </p>

          <h4 className="mt-4">4. Limitation of Liability</h4>
          <p>
            Calculator Hub and its operators shall not be liable for any direct, indirect, incidental, 
            consequential, or punitive damages arising out of your use of or inability to use the service, 
            even if we have been advised of the possibility of such damages.
          </p>

          <h4 className="mt-4">5. Third-Party Links and Advertisements</h4>
          <p>
            Our website may contain links to third-party websites and display third-party advertisements. 
            We are not responsible for the content, privacy policies, or practices of third-party sites 
            or advertisers.
          </p>

          <h4 className="mt-4">6. Intellectual Property</h4>
          <p>
            All content, features, and functionality of Calculator Hub, including but not limited to 
            text, graphics, logos, and software, are the property of Calculator Hub and are protected 
            by copyright and other intellectual property laws.
          </p>

          <h4 className="mt-4">7. User Conduct</h4>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the service for any illegal or unauthorized purpose</li>
            <li>Attempt to gain unauthorized access to any part of the service</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>Reproduce, duplicate, copy, or resell any part of the service without permission</li>
          </ul>

          <h4 className="mt-4">8. Modifications to Service</h4>
          <p>
            We reserve the right to modify, suspend, or discontinue the service (or any part thereof) 
            at any time without notice. We shall not be liable to you or any third party for any 
            modification, suspension, or discontinuance of the service.
          </p>

          <h4 className="mt-4">9. Changes to Terms</h4>
          <p>
            We reserve the right to update these Terms and Conditions at any time. Your continued use 
            of the service after any changes indicates your acceptance of the new terms.
          </p>

          <h4 className="mt-4">10. Governing Law</h4>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with applicable 
            laws, without regard to its conflict of law provisions.
          </p>

          <h4 className="mt-4">11. Contact Information</h4>
          <p>
            If you have any questions about these Terms and Conditions, please contact us through our 
            website.
          </p>

          <div className="alert alert-info mt-4">
            <strong>Academic Integrity Notice:</strong> These calculators are meant to help you 
            understand and verify your work. Always follow your institution's academic integrity 
            policies and guidelines.
          </div>
        </div>
      </div>
    </Layout>
  );
}
