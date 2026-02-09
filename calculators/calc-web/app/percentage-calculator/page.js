import { Metadata } from 'next';
import PercentageCalculator from '../calculators/PercentageCalculator';

export const metadata = {
  title: 'Online Percentage Calculator - Put the Value, Get the Answer',
  description: 'With this percentage calculator, you can easily calculate the percentage of any number. Calculate what percent is X of Y, what is X% of Y, and percent change.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/percentage-calculator/',
  },
  openGraph: {
    title: 'Online Percentage Calculator - Put the Value, Get the Answer',
    description: 'With this percentage calculator, you can easily calculate the percentage of any number. Calculate what percent is X of Y, what is X% of Y, and percent change.',
    url: 'https://www.finalgradescalculator.com/percentage-calculator/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Percentage Calculator - Put the Value, Get the Answer',
    description: 'With this percentage calculator, you can easily calculate the percentage of any number. Calculate what percent is X of Y, what is X% of Y, and percent change.',
  },
};

export default function Page() {
  return <PercentageCalculator />;
}
