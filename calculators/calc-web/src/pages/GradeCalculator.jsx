import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';
import { Helmet } from 'react-helmet-async';

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { id: 1, name: '', grade: '', weight: '' }
  ]);
  const [result, setResult] = useState(null);

  // Add new assignment row
  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { id: Date.now(), name: '', grade: '', weight: '' }
    ]);
  };

  // Remove assignment row
  const removeAssignment = (id) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  // Update assignment value
  const updateAssignment = (id, field, value) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  // Calculate weighted grade
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

  // Convert number grade to letter grade
  const getLetterGrade = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  // Reset calculator
  const resetCalculator = () => {
    setAssignments([{ id: 1, name: '', grade: '', weight: '' }]);
    setResult(null);
  };

  return (
    <>
    <Helmet>
      <title>Grade Calculator | Track Your Academic Progress</title>
      <meta name="description" content="This grade calculator makes the calculation very easy. Enter your values and get instant results. Follow our simple guide to calculate your grades easily." />
      {/* <meta name="keywords" content="grade calculator, weighted grade calculator, academic progress tracker" /> */}
      <meta name="author" content="Final Grades Calculator" />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.finalgradescalculator.com/grade-calculator" />
      <meta property="og:title" content="Grade Calculator | Track Your Academic Progress" />
      <meta property="og:description" content="This grade calculator makes the calculation very easy. Enter your values and get instant results. Follow our simple guide to calculate your grades easily." />
      <meta property="og:image" content="https://www.finalgradescalculator.com/images/og-default.png" />
      <meta property="og:site_name" content="Final Grades Calculator" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://www.finalgradescalculator.com/grade-calculator" />
      <meta name="twitter:title" content="Grade Calculator | Track Your Academic Progress" />
      <meta name="twitter:description" content="This grade calculator makes the calculation very easy. Enter your values and get instant results. Follow our simple guide to calculate your grades easily." />
      <meta name="twitter:image" content="https://www.finalgradescalculator.com/images/og-default.png" />

      <link rel="canonical" href="https://www.finalgradescalculator.com/grade-calculator" />
      <link rel="alternate" hreflang="en" href="https://www.finalgradescalculator.com/grade-calculator" />

      <link rel="icon" href="/6.png" type="image/png" />
      <link rel="apple-touch-icon" href="/6.png" />

      <meta name="language" content="en" />
      <meta name="geo.region" content="US" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-title" content="Final Grades Calculator" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
    <Layout title="Grade Calculator">
      <div className="calculator-container">
        <h1 className="mb-4 text-white">Calculate Your Weighted Grade</h1>
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

        {/* Result Display */}
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

        {/* How to Use */}
        <div className="mt-4 p-3 bg-light rounded">
          <p className="mb-3">
            This online grade calculator is built to quickly, accurately, and easily compute academic grades based on entered scores and weighted averages. 
            It simplifies calculating current grades, enabling students and educators to manage their academic progress with ease and precision.
          </p>
          
          <h2 className='fw-bold'>How to Use a Grade Calculator?</h2>
          <p> <strong>Here's a step-by-step guide on how to use a Grade Calculator:</strong></p>
          
          <h6 className="mt-3"><strong>Step 1: Input the Assignments</strong></h6>
          <p>Users manually enter the name of each assignment, such as: Assignment 1, 2, 3, Homework, Final Exam, etc.</p>
          
          <h6><strong>Step 2: Input the Grade</strong></h6>
          <p>Enter your scores for each assignment, test, project, or other exam throughout the course. Each entry generally includes the earned grade percentage (like 10%, 30%, 50%).</p>
          
          <h6><strong>Step 3: Input the Weight</strong></h6>
          <p>Enter the assignment's weight into the course grade, indicating how different assignments impact the final grade, with a final exam potentially carrying more weight than small tasks.</p>
          
          <h6><strong>Step 4: Calculate the Grade Automatically</strong></h6>
          <p>The tool automatically calculates the final grade based on entered grades and weights. Users can view their final score and see how each assignment impacts the overall mark.</p>
          
          <h6><strong>Step 5: Adjust as Needed</strong></h6>
          <p>Users can add multiple grades and weights to view the cumulative final grade score for their course performance. This dynamic feature enables real-time exploration of various scenarios, helping users make informed decisions about their academic strategy and goal achievement.</p>
          
          <h5 className="mt-4">Weighted Grade Calculation</h5>
          <p>The weighted grade is equal to <strong>(Sum of (Grade × Weight)) / (Sum of Weights)</strong>.</p>
          <p>To use it: multiply each assignment's grade by its weight (as a decimal), sum these values, and then divide by the total of all the weights.</p>
          
          <h6 className="mt-3"><strong>For Example:</strong></h6>
          <ul>
            <li>Math course with a grade of 80 and a weight of 30%.</li>
            <li>Biology course with a grade of 90 and a weight of 50%.</li>
            <li>History course with a grade of 72 and a weight of 20%.</li>
          </ul>
          
          <p>The weighted average grade is calculated by:</p>
          <p><strong>Weighted grade = w₁×g₁ + w₂×g₂ + w₃×g₃</strong></p>
          <p>= 30%×80 + 50%×90 + 20%×72 = <strong>83.4</strong></p>
          
          <p className="mt-3">When the weights are not in percent (hours or points...), you should also divide by the sum of the weights:</p>
          <p><strong>Weighted grade = (w₁×g₁ + w₂×g₂ + w₃×g₃ + ...) / (w₁ + w₂ + w₃ + ...)</strong></p>
          
          <h6 className="mt-3"><strong>Example:</strong></h6>
          <ul>
            <li>Completed a 3-point Math course with a grade of 80.</li>
            <li>Completed a 5-point Biology course with a grade of 90.</li>
            <li>Completed a 2-point History course with a grade of 72.</li>
          </ul>
          
          <p>The weighted average grade is calculated by:</p>
          <p><strong>Weighted grade = (w₁×g₁ + w₂×g₂ + w₃×g₃) / (w₁ + w₂ + w₃)</strong></p>
          <p>= (3×80 + 5×90 + 2×72) / (3 + 5 + 2) = <strong>83.4</strong></p>
        </div>
      </div>

      {/* Navigation to Other Calculators */}
      <CalculatorNav />
    </Layout>
    </>
  );
}
