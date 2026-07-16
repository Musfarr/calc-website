import { Metadata } from 'next';
import FinalGradeCalculator from './calculators/FinalGradeCalculator';

export const metadata = {
  title: 'Final Grade Calculator | Find the Score You Need to Pass',
  description: 'Enter your current grade, target grade, and exam weight to instantly calculate the exact score you need on your final exam. Free and easy to use.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/',
  },
  openGraph: {
    title: 'Final Grade Calculator | Find the Score You Need to Pass',
    description: 'Enter your current grade, target grade, and exam weight to instantly calculate the exact score you need on your final exam. Free and easy to use.',
    url: 'https://www.finalgradescalculator.com/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Final Grade Calculator | Find the Score You Need to Pass',
    description: 'Enter your current grade, target grade, and exam weight to instantly calculate the exact score you need on your final exam. Free and easy to use.',
  },
};

export default function Home() {
  return <FinalGradeCalculator />;
}
