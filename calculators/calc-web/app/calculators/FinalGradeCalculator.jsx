'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';

export default function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateFinalGrade = () => {
    const current = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalWeight);

    if (isNaN(current) || isNaN(desired) || isNaN(weight)) {
      alert('Please enter valid numbers in all fields');
      return;
    }

    if (weight <= 0 || weight > 100) {
      alert('Final exam weight must be between 1 and 100');
      return;
    }

    if (current < 0 || current > 100 || desired < 0 || desired > 100) {
      alert('Grades must be between 0 and 100');
      return;
    }

    const currentWeight = (100 - weight) / 100;
    const finalWeightDecimal = weight / 100;
    const requiredFinal = (desired - (current * currentWeight)) / finalWeightDecimal;

    setResult({
      required: requiredFinal.toFixed(2),
      achievable: requiredFinal <= 100 && requiredFinal >= 0,
      letterGrade: getLetterGrade(requiredFinal)
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
    setCurrentGrade('');
    setDesiredGrade('');
    setFinalWeight('');
    setResult(null);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Final Grade Calculator",
    operatingSystem: "All",
    applicationCategory: "CalculatorApplication",
    description: "Easily calculate your final grade percentage and plan your academic success with our free Final Grade Calculator tool.",
    url: "https://www.finalgradescalculator.com/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "275"
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
        <h1 className="mb-4">Final Grade Calculator</h1>
        <div className="calculator-container">
        <p className="text-muted">
          Calculate what grade you need on your final exam to achieve your desired course grade.
        </p>

        <div className="row g-4 mt-3">
          <div className="col-md-4">
            <label className="form-label">Current Grade (%)</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="e.g., 85"
              min="0"
              max="100"
              step="0.01"
              value={currentGrade}
              onChange={(e) => {
                setCurrentGrade(e.target.value);
                setResult(null);
              }}
            />
            <small className="text-muted">Your current grade before the final exam</small>
          </div>

          <div className="col-md-4">
            <label className="form-label">Desired Grade (%)</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="e.g., 90"
              min="0"
              max="100"
              step="0.01"
              value={desiredGrade}
              onChange={(e) => {
                setDesiredGrade(e.target.value);
                setResult(null);
              }}
            />
            <small className="text-muted">The final grade you want to achieve</small>
          </div>

          <div className="col-md-4">
            <label className="form-label">Final Exam Weight (%)</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="e.g., 30"
              min="1"
              max="100"
              step="0.01"
              value={finalWeight}
              onChange={(e) => {
                setFinalWeight(e.target.value);
                setResult(null);
              }}
            />
            <small className="text-muted">How much the final exam is worth</small>
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-primary btn-lg" onClick={calculateFinalGrade}>
            Calculate Required Grade
          </button>
          <button className="btn btn-outline-secondary btn-lg" onClick={resetCalculator}>
            Reset
          </button>
        </div>

        {result && (
          <div className={`result-display ${result.achievable ? '' : 'border-warning'}`}>
            <h3>Required Final Exam Grade</h3>
            <div className="result-value">
              {result.required}% ({result.letterGrade})
            </div>
            
            {result.achievable ? (
              result.required >= 0 ? (
                <div className="alert alert-success mt-3 mb-0">
                  <strong>✓ Achievable!</strong> You need to score {result.required}% on your final exam.
                </div>
              ) : (
                <div className="alert alert-info mt-3 mb-0">
                  <strong>Great news!</strong> You can score 0% on the final and still achieve your desired grade!
                </div>
              )
            ) : (
              <div className="alert alert-warning mt-3 mb-0">
                <strong>⚠ Not achievable</strong> - You would need to score {result.required}% which is above 100%. 
                Consider aiming for a lower target grade.
              </div>
            )}
          </div>
        )}

        <div className="mt-4 p-3 bg-light rounded">
          <h2 className='mt-2 fw-bold'>How to Use a Final Grade Calculator?</h2>

          <div className="">
            <p><strong>Here's a step-by-step guide on how to use a Final Grade Calculator:</strong></p>
            <p>
              Enter your current grade before the final exam in the "Current Grade (%)" field, the final grade you want to achieve in the "Desired Grade (%)" field, and how much the final exam is worth in the "Final Exam Weight (%)" field. Then click "Calculate Required Grade" to see the result.
            </p>
            <p><strong>For Example:</strong> </p>
            <p>Current grade is 70% (or C-).</p>
            <p>Final exam weight is 50%.</p>
            <p>Required grade is 80% (or B-).</p>
            <p>The final exam grade is equal to the required grade, minus 100% minus the final exam weight (wfinal) times the current grade (g), divided by the final exam weight (w):</p>
            <p>Final exam grade = (80% - (100% - 50%) * 70%) / 50% = 86%</p>
            <p> <strong>So Final exam grade =</strong></p>
            <p>=
              required grade - (100% - wfinal)×current grade
              wfinal
              =
              80% - (100% - 50%)×70%
              50%
              = 90%
            </p>
            <p>So the final exam grade should be 90% (or A-).</p>
          </div>
        </div>
      </div>

        <CalculatorNav />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Layout>
    </>
  );
}
