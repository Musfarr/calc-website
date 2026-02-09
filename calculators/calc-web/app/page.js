import { Metadata } from 'next';
import FinalGradeCalculator from './calculators/FinalGradeCalculator';

export const metadata = {
  title: 'Final Grade Calculator - Easy Calculation',
  description: 'Curious about what grades you need on your final exam? Use our free final grade calculator to find out exactly what you need to get the grade you want.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/',
  },
  openGraph: {
    title: 'Final Grade Calculator - Easy Calculation',
    description: 'Curious about what grades you need on your final exam? Use our free final grade calculator to find out exactly what you need to get the grade you want.',
    url: 'https://www.finalgradescalculator.com/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Final Grade Calculator - Easy Calculation',
    description: 'Curious about what grades you need on your final exam? Use our free final grade calculator to find out exactly what you need to get the grade you want.',
  },
};

export default function Home() {
  return <FinalGradeCalculator />;
}
