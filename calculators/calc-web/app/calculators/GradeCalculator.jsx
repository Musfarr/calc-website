'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { id: 1, name: '', grade: '', weight: '' }
  ]);
  const [result, setResult] = useState(null);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { id: Date.now(), name: '', grade: '', weight: '' }
    ]);
  };

  const removeAssignment = (id) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id, field, value) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const calculateGrade = () => {
    const validAssignments = assignments.filter(a => a.grade && a.weight);
    
    if (validAssignments.length === 0) {
      alert('Please enter at least one grade and weight');
      return;
    }

    let totalWeightedGrade = 0;
    let totalWeight = 0;

    validAssignments.forEach(a => {
      const grade = parseFloat(a.grade);
      const weight = parseFloat(a.weight);
      totalWeightedGrade += (grade * weight);
      totalWeight += weight;
    });

    const finalGrade = totalWeight > 0 ? totalWeightedGrade / totalWeight : 0;
    
    setResult({
      grade: finalGrade.toFixed(2),
      letterGrade: getLetterGrade(finalGrade),
      totalWeight: totalWeight
    });
  };

  const getLetterGrade = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  const resetCalculator = () => {
    setAssignments([{ id: 1, name: '', grade: '', weight: '' }]);
    setResult(null);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Grade Calculator",
    operatingSystem: "All",
    applicationCategory: "CalculatorApplication",
    description: "Easily calculate your overall grade using our free online Grade Calculator. Input your assignment scores and weights to find your current or final grade instantly.",
    url: "https://www.finalgradescalculator.com/grade-calculator/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "220"
    },
    publisher: {
      "@type": "Organization",
      name: "Final Grades Calculator",
      url: "https://www.finalgradescalculator.com/"
    }
  };

  return (
    <>
      <Layout>
        <h1 className="mb-4">Grade Calculator</h1>
        <div className="calculator-container">
        <p className="text-muted">
          Enter your assignment grades and their weights to calculate your final grade.
        </p>

        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Assignment Name (Optional)</th>
                <th>Grade (%)</th>
                <th>Weight (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Midterm"
                      value={assignment.name}
                      onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0-100"
                      min="0"
                      max="100"
                      value={assignment.grade}
                      onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0-100"
                      min="0"
                      max="100"
                      value={assignment.weight}
                      onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeAssignment(assignment.id)}
                      disabled={assignments.length === 1}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-secondary" onClick={addAssignment}>
            + Add Assignment
          </button>
          <button className="btn btn-primary" onClick={calculateGrade}>
            Calculate Grade
          </button>
          <button className="btn btn-outline-secondary" onClick={resetCalculator}>
            Reset
          </button>
        </div>

        {result && (
          <div className="result-display">
            <h3>Your Final Grade</h3>
            <div className="result-value">{result.grade}% ({result.letterGrade})</div>
            <p className="mb-0 mt-2">Total Weight: {result.totalWeight}%</p>
            {result.totalWeight !== 100 && (
              <small className="text-warning">
                ⚠️ Note: Total weight is not 100%. Result is based on {result.totalWeight}% of the grade.
              </small>
            )}
          </div>
        )}

        <div className="mt-4 p-3 bg-light rounded">
          <h2 className="fw-bold">What Is a Grade Calculator?</h2>
          <p>
            A grade calculator is an online tool that helps students calculate their overall course grade based on
            individual assignment scores and their weights. Whether you need a weighted grade calculator, a test grade
            calculator, or a simple school grade calculator, this tool handles it all in seconds.
          </p>
          <p>
            Students use it to track academic progress, plan for upcoming exams, and understand exactly how each
            assignment impacts their final grade.
          </p>

          <h2 className="h4 mt-4 fw-bold">How to Use This Grade Calculator</h2>
          <ol>
            <li>
              <strong>Add your assignments</strong> Click &quot;Add Assignment&quot; for each item you want to include
              i.e. homework, quiz, test, midterm, or final exam. The assignment name is optional, so you can skip it
              and just enter the numbers if you prefer.
            </li>
            <li>
              <strong>Enter the grade</strong> Enter the score you received for each assignment as a percentage
              (e.g., 85%).
            </li>
            <li>
              <strong>Enter the weight</strong> Enter how much each assignment counts toward your overall grade. Your
              syllabus will have this information. For example, if your final exam is worth 40% of your course grade,
              enter 40.
            </li>
            <li>
              <strong>Click &quot;Calculate Grade&quot;</strong> The calculator will instantly display your overall
              weighted grade along with the corresponding grade letter (A, B, C, D, or F).
            </li>
          </ol>

          <h2 className="h4 mt-4 fw-bold">Weighted Grade Calculator – How It Works</h2>
          <p>
            This calculator uses a weighted average formula, which means not all assignments count equally. A final
            exam worth 40% impacts your grade far more than a quiz worth 5%.
          </p>
          <p><strong>Formula:</strong></p>
          <p><strong>Weighted Grade = (Sum of Grade × Weight) ÷ Sum of Weights</strong></p>
          <p><strong>Example:</strong></p>
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2 mb-3">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Grade</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Homework</td><td>90%</td><td>20%</td></tr>
                <tr><td>Midterm</td><td>78%</td><td>30%</td></tr>
                <tr><td>Final Exam</td><td>85%</td><td>50%</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Weighted Grade = (90×20 + 78×30 + 85×50) / (20+30+50) = (1800 + 2340 + 4250) / 100 = <strong>83.9% – B</strong>
          </p>

          <h2 className="h4 mt-4 fw-bold">Grade Calculator for Different Use Cases</h2>
          <p>This online grader works for every type of student and course:</p>
          <ul>
            <li>
              <strong>High School Students:</strong> Use this grade calculator for high school to track grades across
              multiple subjects i.e. English, Math, Science, History, all in one place.
            </li>
            <li>
              <strong>Quarter &amp; Semester Grades:</strong> Need a quarter grade calculator? Simply enter your
              assignments from that quarter and calculate your standing before the term ends.
            </li>
            <li>
              <strong>Test &amp; Quiz Grades:</strong> Use it as a test grade calculator or quiz grader to see how a
              single test score affects your overall average.
            </li>
            <li>
              <strong>Grade Percentage Calculator:</strong> Not sure what percentage you&apos;re at? Enter your scores
              and weights to get an exact grade percentage instantly.
            </li>
          </ul>

          <h2 className="h4 mt-4 fw-bold">Frequently Asked Questions</h2>

          <h3 className="h5 mt-3">1. What is a weighted grade calculator?</h3>
          <p>
            A weighted grade calculator accounts for the fact that different assignments carry different importance. A
            final exam worth 50% of your grade impacts your overall score much more than a homework assignment worth 5%.
          </p>

          <h3 className="h5 mt-3">2. How do I calculate my overall grade?</h3>
          <p>
            Enter each assignment&apos;s score and its weight into the calculator. It will automatically compute your
            overall grade using the weighted average formula.
          </p>

          <h3 className="h5 mt-3">3. Can I use this as a high school grade calculator?</h3>
          <p>
            Yes. This calculator works for high school, college, and university courses. As long as you know your
            scores and weights, it works for any level.
          </p>

          <h3 className="h5 mt-3">4. What if all my assignments have equal weight?</h3>
          <p>
            Just enter the same weight for each assignment (e.g., all at 10%), and the calculator will treat them
            equally when computing your grade.
          </p>

          <h3 className="h5 mt-3">5. What&apos;s the difference between a grade calculator and a final grade calculator?</h3>
          <p>
            A grade calculator shows your current overall grade based on completed work. A{' '}
            <a href="/">final grade calculator</a> tells you what score you need on your final exam to reach a desired
            grade.
          </p>
        </div>
      </div>

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      <CalculatorNav />
      </Layout>
    </>
  );
}
