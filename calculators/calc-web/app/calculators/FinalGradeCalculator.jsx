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
              Think of it this way. You already know roughly where you stand in a course. What you do not know is whether that is enough and what you need to do about it. A final grade calculator gives you that answer before the exam, not after.
            </p>
            <p>
              You enter three numbers, and it tells you the exact score you need on your final to finish the course where you want. No estimating, no hoping things work out. Just a clear target you can actually study toward.
            </p>
            <p>
              It is also surprisingly useful for managing stress. A lot of exam anxiety comes from not knowing whether a situation is salvageable. Sometimes you run the numbers and realize you only need a 65% to hit your goal, which completely changes how you approach exam week. Other times it tells you the situation is tighter than you thought and you need to reprioritize. Either way, knowing is always better than guessing.
            </p>

            <h2 className="h4 mt-4 fw-bold">How to Use the Final Grade Calculator</h2>
            <p>
              Start by entering your current grade as a percentage. You will find this in your student portal or gradebook. If your grades are shown as points rather than percentages, divide your earned points by the total possible points and multiply by 100. So if you have 340 out of 400 points, that works out to 85%.
            </p>
            <p>
              Next, enter the grade you want to finish the course with. Be honest with yourself here. If you need a B to keep a scholarship, enter 80. If passing is the goal, enter 60. The calculator works for any target.
            </p>
            <p>
              Then enter the final exam weight. This is how much your final counts toward your overall course grade, and it lives in your syllabus. If it says something like &quot;Final Exam 30%&quot; under the grading breakdown, enter 30. If it is listed in points, divide the exam points by the total course points and multiply by 100.
            </p>
            <p>
              Hit calculate, and you will see the minimum score you need on your final.
            </p>

            <h2 className="h4 mt-4 fw-bold">The Formula</h2>
            <p>
              The calculator runs on a standard weighted average formula that universities and schools use worldwide.
            </p>
            <p>
              <strong>Required Score = (Target Grade − (1 − Exam Weight) × Current Grade) ÷ Exam Weight</strong>
            </p>
            <p>
              Here is what that actually means in plain terms. Your final course grade is a combination of two things: everything you have done so far and what you score on the final. The formula figures out what that final score needs to be so the combination lands on your target.
            </p>
            <p>A worked example makes it much clearer.</p>
            <p>
              Say your current grade is 70%, you want to finish with 80%, and the final exam is worth 50% of your grade.
            </p>
            <p>
              (80 − (1 − 0.50) × 70) ÷ 0.50 = (80 − 35) ÷ 0.50 = 90%
            </p>
            <p>
              You would need a 90% on your final to bring a 70% current grade up to an 80% overall. That is your number. That is what you study toward.
            </p>

            <h3 className="h5 mt-4 fw-bold">Quick Reference Table</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3 mb-3">
                <thead>
                  <tr>
                    <th>Current</th>
                    <th>Target</th>
                    <th>Exam Weight</th>
                    <th>Required Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>65%</td><td>70%</td><td>30%</td><td>82%</td></tr>
                  <tr><td>75%</td><td>85%</td><td>40%</td><td>100%</td></tr>
                  <tr><td>60%</td><td>65%</td><td>25%</td><td>80%</td></tr>
                  <tr><td>80%</td><td>75%</td><td>50%</td><td>70%</td></tr>
                  <tr><td>55%</td><td>60%</td><td>40%</td><td>67.5%</td></tr>
                  <tr><td>88%</td><td>90%</td><td>20%</td><td>98%</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              If your result comes out above 100%, your target grade is not reachable through the final exam alone. That does not mean you are out of options. Talk to your instructor about extra credit or grade recovery before drawing any conclusions.
            </p>

            <h2 className="h4 mt-4 fw-bold">Understanding Your Result</h2>
            <h3 className="h5 mt-3">Below 60%</h3>
            <p>
              You are in a comfortable position. Your current standing gives you enough room to hit your goal even with a modest performance on the final. Focus on the key material rather than trying to cover everything.
            </p>
            <h3 className="h5 mt-3">60% to 79%</h3>
            <p>
              This is a very achievable range. It requires real preparation but it is well within reach. Prioritize your weaker areas, test yourself with past papers, and give yourself enough time to review properly.
            </p>
            <h3 className="h5 mt-3">80% to 89%</h3>
            <p>
              You will need to go in well prepared. This is not out of reach but it does not leave much room for gaps. Start early, identify what is most likely to come up, and do not leave shaky topics unaddressed.
            </p>
            <h3 className="h5 mt-3">90% to 100%</h3>
            <p>
              A strong performance is required. This is doable, especially if your current grade is already decent, but it means treating the final as your top priority this week.
            </p>
            <h3 className="h5 mt-3">Above 100%</h3>
            <p>
              Your target grade is not mathematically reachable through the final exam. The most realistic options are adjusting your target downward or speaking with your instructor about extra credit, makeup work, or incomplete grade policies at your school.
            </p>

            <h2 className="h4 mt-4 fw-bold">Frequently Asked Questions</h2>

            <h3 className="h5 mt-3">1. What if my required score is above 100%?</h3>
            <p>
              It means the gap between your current grade and your target is too wide for the final exam to close on its own. This happens when a student has a low current grade, a high target, and a final that does not carry enough weight to make up the difference.
            </p>

            <h3 className="h5 mt-3">2. Does this work for high school and college?</h3>
            <p>
              Yes. It works for any course at any level as long as the course uses percentage-based grading and you know your current grade and the final exam weight. The formula is exactly the same whether you are in high school, community college, or university.
            </p>

            <h3 className="h5 mt-3">3. Where do I find the final exam weight?</h3>
            <p>
              Your syllabus is the first place to look, usually under a section called Grading Policy or Assessment Breakdown. It will say something like &quot;Final Exam 30% of your grade.&quot; If you genuinely cannot find it, just email your instructor and ask. Most will tell you straight away.
            </p>

            <h3 className="h5 mt-3">4. What score do I need to get an A?</h3>
            <p>
              Set your target grade to 90, enter your current grade and exam weight, and the calculator will tell you. If the result comes back above 100%, an A may no longer be mathematically possible, but try entering 87 or 88 to find the highest grade still within reach.
            </p>

            <h3 className="h5 mt-3">5. My course does not use a standard final exam?</h3>
            <p>
              This calculator is built for courses where a weighted final exam contributes to your overall grade. If your course uses a different structure like equal-weight assignments throughout the term, no cumulative final, or portfolio-based grading, the result may not apply accurately. Check your course grading policy or ask your instructor how your final grade is determined.
            </p>

            <h3 className="h5 mt-3">6. How do I convert points to a percentage?</h3>
            <p>
              Divide your earned points by the total possible points and multiply by 100. If you have 340 out of 400 points, that is 340 divided by 400 multiplied by 100, which gives you 85%. Use that as your current grade.
            </p>

            {/* <p className="mb-0">
              Looking for more? Try our <a href="/grade-calculator/">Grade Calculator</a>, <a href="/gpa-calculator/">GPA Calculator</a>, or <a href="/percentage-calculator/">Percentage Calculator</a>.
            </p> */}
          </div>
        </div>
      </div>

        <CalculatorNav />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Layout>
    </>
  );
}
