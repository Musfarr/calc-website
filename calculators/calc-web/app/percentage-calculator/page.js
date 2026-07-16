import { Metadata } from 'next';
import PercentageCalculator from '../calculators/PercentageCalculator';

export const metadata = {
  title: 'Percentage Calculator | Easy Percentage Calculations',
  description: 'Calculate percentages instantly. Find what percent one number is of another, work out percentage increases or decreases, and more. No signup needed.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/percentage-calculator/',
  },
  openGraph: {
    title: 'Percentage Calculator | Easy Percentage Calculations',
    description: 'Calculate percentages instantly. Find what percent one number is of another, work out percentage increases or decreases, and more. No signup needed.',
    url: 'https://www.finalgradescalculator.com/percentage-calculator/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator | Easy Percentage Calculations',
    description: 'Calculate percentages instantly. Find what percent one number is of another, work out percentage increases or decreases, and more. No signup needed.',
  },
};

export default function Page() {
  return <PercentageCalculator />;
}
