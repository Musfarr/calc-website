import { Metadata } from 'next';
import Layout from '../components/Layout';
import BlogList from '../components/BlogList';

export const metadata = {
  title: 'Blog - Final Grades Calculator',
  description: 'Read our latest articles about grades, calculators, and educational tips.',
  canonical: 'https://www.finalgradescalculator.com/blog/',
  openGraph: {
    title: 'Blog - Final Grades Calculator',
    description: 'Read our latest articles about grades, calculators, and educational tips.',
    url: 'https://www.finalgradescalculator.com/blog/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Final Grades Calculator',
    description: 'Read our latest articles about grades, calculators, and educational tips.',
  },
};

export default function BlogPage() {
  return (
    <Layout>
      <h1>Blog</h1>
      <BlogList />
    </Layout>
  );
}
