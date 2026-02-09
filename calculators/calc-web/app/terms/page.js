import { Metadata } from 'next';
import Layout from '../components/Layout';

export const metadata = {
  title: 'Terms & Conditions - Final Grades Calculator',
  description: 'Terms and conditions for Final Grades Calculator.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/terms/',
  },
};

export default function TermsPage() {
  return (
    <Layout>
      <h1>Terms & Conditions</h1>
      <div className="calculator-container">
        <h2>Terms & Conditions</h2>
        <p>
          Welcome to Final Grades Calculator. These terms and conditions outline the rules and regulations for the use
          of our website.
        </p>

        <h3>License</h3>
        <p>
          Unless otherwise stated, we own the intellectual property rights for all material on this website. All
          intellectual property rights are reserved. You may access this from within our website provided that you do
          not: republish, sell, rent or sub-license material on our website; reproduce, duplicate or copy material
          from this website for commercial purposes.
        </p>

        <h3>User Comments</h3>
        <p>
          In these terms and conditions, "User Comments" shall mean any audio, video, text, images or other material
          you choose to display on this website. By displaying User Comments, you grant us a non-exclusive, worldwide
          irrevocable license to use, reproduce, adapt and publish your User Comments in any media.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          In no event shall our company, nor any of its officers, directors and employees, be held liable for anything
          arising out of or in any way connected with your use of this website whether such liability is under contract.
        </p>

        <h3>Indemnification</h3>
        <p>
          Except where such provision is illegal, every provision of these terms and conditions which operates to
          exclude or limit the liability of our company, its officers, directors and employees shall indemnify and hold
          harmless our company, its officers, directors and employees from and against any damages, losses, costs,
          liabilities and expenses (including legal fees) arising out of any breach of these terms and conditions by a
          user.
        </p>

        <h3>Severability</h3>
        <p>
          If any provision of these terms and conditions is found to be invalid under any applicable law, such
          provisions shall be deleted without affecting the remaining provisions herein.
        </p>

        <h3>Variation of Terms</h3>
        <p>
          We are permitted to revise these terms and conditions relating to our website at any time. By using this
          website, you are deemed to have accepted such revision.
        </p>

        <h3>Assignment</h3>
        <p>
          The performance of our obligations under these terms and conditions is subject to existing laws and legal
          process, and nothing in these terms and conditions is intended to alleviate or deprive you of any mandatory
          protections under applicable laws.
        </p>

        <h3>Entire Agreement</h3>
        <p>
          These terms and conditions, including any legal notices and disclaimers contained on this website, constitute
          the entire agreement between us and you relating to your use of this website, and supersede all prior
          negotiations, representations or agreements, whether written or oral relating to such subject matter.
        </p>
      </div>
    </Layout>
  );
}
