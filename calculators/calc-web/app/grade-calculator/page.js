import { Metadata } from 'next';
import GradeCalculator from '../calculators/GradeCalculator';

export const metadata = {
  title: 'Grade Calculator – Calculate Weighted Grades Online',
  description: 'Calculate your grade instantly. Enter assignment scores to get your weighted grade. Works as a test grade, quiz grade & high school grade calculator.',
  alternates: {
    canonical: 'https://www.finalgradescalculator.com/grade-calculator/',
  },
  openGraph: {
    title: 'Grade Calculator – Calculate Weighted Grades Online',
    description: 'Calculate your grade instantly. Enter assignment scores to get your weighted grade. Works as a test grade, quiz grade & high school grade calculator.',
    url: 'https://www.finalgradescalculator.com/grade-calculator/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grade Calculator – Calculate Weighted Grades Online',
    description: 'Calculate your grade instantly. Enter assignment scores to get your weighted grade. Works as a test grade, quiz grade & high school grade calculator.',
  },
};

export default function Page() {
  return <GradeCalculator />;
}
