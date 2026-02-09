import { Metadata } from 'next';
import GradeCalculator from '../calculators/GradeCalculator';

export const metadata = {
  title: 'Grade Calculator - Effortless Grade Calculation',
  description: 'This grade calculator makes the calculation very easy. You can calculate the grade by entering the scores and weights.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/grade-calculator/',
  },
  openGraph: {
    title: 'Grade Calculator - Effortless Grade Calculation',
    description: 'This grade calculator makes the calculation very easy. You can calculate the grade by entering the scores and weights.',
    url: 'https://www.finalgradescalculator.com/grade-calculator/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grade Calculator - Effortless Grade Calculation',
    description: 'This grade calculator makes the calculation very easy. You can calculate the grade by entering the scores and weights.',
  },
};

export default function Page() {
  return <GradeCalculator />;
}
