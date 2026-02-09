import { Metadata } from 'next';
import Layout from '../components/Layout';

export const metadata = {
  title: 'Privacy Policy - Final Grades Calculator',
  description: 'Privacy policy for Final Grades Calculator.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <Layout>
      <h1>Privacy Policy</h1>
      <div className="calculator-container">
        <h2>Privacy Policy</h2>
        <p>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website.
        </p>

        <h3>Information We Collect</h3>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the site
          includes:
        </p>
        <ul>
          <li>Personal Information: Name, email address, and other details you voluntarily provide.</li>
          <li>Device Information: Information about your device, browser, and IP address.</li>
          <li>Usage Information: How you interact with our website.</li>
        </ul>

        <h3>Use of Your Information</h3>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience.</p>

        <h3>Disclosure of Your Information</h3>
        <p>We do not sell, trade, or rent your personal information to third parties.</p>

        <h3>Security of Your Information</h3>
        <p>We use administrative, technical, and physical security measures to protect your personal information.</p>

        <h3>Contact Us</h3>
        <p>If you have questions or concerns about this Privacy Policy, please contact us.</p>
      </div>
    </Layout>
  );
}
