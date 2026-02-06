import { Metadata } from 'next';
import GPACalculator from '../calculators/GPACalculator';

export const metadata = {
  title: 'GPA Calculator | Easily Calculate Your GPA',
  description: 'Now easily track and calculate your GPA with our free GPA calculator. Enter your courses, credits, and grades to get your GPA instantly.',
  canonical: 'https://www.finalgradescalculator.com/gpa-calculator/',
  openGraph: {
    title: 'GPA Calculator | Easily Calculate Your GPA',
    description: 'Now easily track and calculate your GPA with our free GPA calculator. Enter your courses, credits, and grades to get your GPA instantly.',
    url: 'https://www.finalgradescalculator.com/gpa-calculator/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPA Calculator | Easily Calculate Your GPA',
    description: 'Now easily track and calculate your GPA with our free GPA calculator. Enter your courses, credits, and grades to get your GPA instantly.',
  },
};

export default function Page() {
  return <GPACalculator />;
}
