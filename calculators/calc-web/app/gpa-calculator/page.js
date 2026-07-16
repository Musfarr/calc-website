import { Metadata } from 'next';
import GPACalculator from '../calculators/GPACalculator';

export const metadata = {
  title: 'GPA Calculator | Fast GPA Calculations',
  description: 'Find out your GPA in seconds. Enter your grades and credit hours to calculate your semester GPA or track your cumulative GPA across all terms.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/gpa-calculator/',
  },
  openGraph: {
    title: 'GPA Calculator | Fast GPA Calculations',
    description: 'Find out your GPA in seconds. Enter your grades and credit hours to calculate your semester GPA or track your cumulative GPA across all terms.',
    url: 'https://www.finalgradescalculator.com/gpa-calculator/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator | Fast GPA Calculations',
    description: 'Find out your GPA in seconds. Enter your grades and credit hours to calculate your semester GPA or track your cumulative GPA across all terms.',
  },
};

export default function Page() {
  return <GPACalculator />;
}
