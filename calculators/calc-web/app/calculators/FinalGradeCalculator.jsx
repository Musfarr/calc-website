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
          <h2 className="mt-2 fw-bold">What Is a Final Grade Calculator?</h2>

          <div>
            <p>
              A final grade calculator helps students figure out exactly what score they need on their final exam to reach a desired course grade. Whether you&apos;re trying to pass a class, maintain your GPA, or aim for an A, this tool removes all the guesswork.
            </p>
            <p>
              Just enter three numbers: your current grade, your desired grade, and how much the final exam is worth and you&apos;ll instantly know the minimum score you need to hit your goal.
            </p>

            <h2 className="h4 mt-4 fw-bold">How to Use This Final Exam Grade Calculator</h2>
            <p>Using this calculator takes less than a minute. Here&apos;s how:</p>
            <ol>
              <li>
                <strong>Enter your current grade</strong> This is your grade right now, before the final exam. Check your class portal, syllabus, or ask your teacher. Enter it as a percentage (e.g., 74%).
              </li>
              <li>
                <strong>Enter your desired grade</strong> What final grade do you want in the course? Enter the percentage you&apos;re aiming for (e.g., 80% for a B).
              </li>
              <li>
                <strong>Enter the final exam weight</strong> How much is your final exam worth in the overall course grade? This is usually listed in your syllabus (e.g., 40%).
              </li>
              <li>
                <strong>Click &quot;Calculate Required Grade&quot;</strong> The calculator will instantly show you the exact score you need on your final exam.
              </li>
            </ol>

            <h2 className="h4 mt-4 fw-bold">Final Exam Grade Formula</h2>
            <p>If you want to understand the math behind the result, here&apos;s the formula:</p>
            <p>
              <strong>Final Exam Grade = (Desired Grade − (1 − Exam Weight) × Current Grade) / Exam Weight</strong>
            </p>
            <p><strong>Example:</strong></p>
            <ul>
              <li>Current grade: 70%</li>
              <li>Desired grade: 80%</li>
              <li>Final exam weight: 50%</li>
            </ul>
            <p>
              Calculation: Final Exam Grade = (80% − (1 − 0.50) × 70%) / 0.50 = (80% − 35%) / 0.50 = 45% / 0.50 = 90%
            </p>
            <p>
              So you&apos;d need a 90% on your final exam to finish the course with an 80%.
            </p>

            <h2 className="h4 mt-4 fw-bold">More Examples</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3 mb-3">
                <thead>
                  <tr>
                    <th>Current Grade</th>
                    <th>Desired Grade</th>
                    <th>Exam Weight</th>
                    <th>Required Final Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>65%</td>
                    <td>70%</td>
                    <td>30%</td>
                    <td>78%</td>
                  </tr>
                  <tr>
                    <td>75%</td>
                    <td>85%</td>
                    <td>40%</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>80%</td>
                    <td>90%</td>
                    <td>50%</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>60%</td>
                    <td>65%</td>
                    <td>25%</td>
                    <td>80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Note:</strong> If the required score comes out above 100%, you may need to reconsider your target grade or check if extra credit is available.
            </p>

            <h2 className="h4 mt-4 fw-bold">Frequently Asked Questions</h2>
            <h3 className="h5 mt-3">1. What score do I need on my final to get an A?</h3>
            <p>
              It depends on your current grade and how much the final is worth. Enter your numbers into the calculator above to find out instantly.
            </p>

            <h3 className="h5 mt-3">2. What if my final exam is worth 30% instead of 50%?</h3>
            <p>
              No problem just enter 30 in the &quot;Final Exam Weight&quot; field. The calculator adjusts automatically based on whatever weight your exam carries.
            </p>

            <h3 className="h5 mt-3">3. Can I use this calculator for college and high school?</h3>
            <p>
              Yes. This final grade calculator works for any course i.e. high school, college, or university as long as you know your current grade and your final exam&apos;s weight.
            </p>

            <h3 className="h5 mt-3">4. What if my required score is over 100%?</h3>
            <p>
              That means your target grade may not be mathematically reachable with the final exam alone. You might want to lower your desired grade or explore extra credit options with your teacher.
            </p>

            <h3 className="h5 mt-3">5. How do I find my final exam weight?</h3>
            <p>
              Check your course syllabus. It&apos;s usually listed under &quot;Grading Policy&quot; or &quot;Assessment Breakdown.&quot; Common weights are 20%, 30%, 40%, or 50%.
            </p>

            <p className="mb-0">
              Looking for more? Try our <a href="/grade-calculator/">Grade Calculator</a>, <a href="/gpa-calculator/">GPA Calculator</a>, or <a href="/percentage-calculator/">Percentage Calculator</a>.
            </p>
          </div>
        </div>
      </div>

        <CalculatorNav />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Layout>
    </>
  );
}
