import { Metadata } from 'next';
import GradeCalculator from '../calculators/GradeCalculator';

export const metadata = {
  title: 'Grade Calculator | Calculate Your Overall Course Grade',
  description: 'Add your assignments, tests, and weights to calculate your current course grade. See exactly where you stand before results are officially released.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/grade-calculator/',
  },
  openGraph: {
    title: 'Grade Calculator | Calculate Your Overall Course Grade',
    description: 'Add your assignments, tests, and weights to calculate your current course grade. See exactly where you stand before results are officially released.',
    url: 'https://www.finalgradescalculator.com/grade-calculator/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grade Calculator | Calculate Your Overall Course Grade',
    description: 'Add your assignments, tests, and weights to calculate your current course grade. See exactly where you stand before results are officially released.',
  },
};

export default function Page() {
  return <GradeCalculator />;
}
