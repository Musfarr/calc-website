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
            Your course grade is not a simple average of everything you have done. A homework assignment worth 5% and a final exam worth 40% are very different things, even if you scored identically on both. A basic average ignores that completely. A grade calculator does not.
          </p>
          <p>
            It takes each of your scores and weighs them according to how much they actually count in your course, then combines everything into one overall grade. What you get is a number that genuinely reflects where you stand, not a rough estimate that treats a quiz the same as a midterm.
          </p>
          <p>
            Most students find it useful in three situations. The first is mid-semester, when you want to know exactly where you stand before it is too late to do anything about it. The second is right after a big assignment comes back, when you want to see how much it actually moved your grade. The third is before finals, when you are trying to figure out where to focus your energy. All three come down to the same thing: turning a scattered set of scores into one clear, honest number.
          </p>

          <h2 className="h4 mt-4 fw-bold">How to Use Grade Calculator</h2>
          <p>
            Enter your assignment grades and their weights to find your overall course grade instantly. You can find your results here by simply entering your grades.
          </p>

          <h3 className="h5 mt-3 fw-bold">Adding your assignments</h3>
          <p>
            Add one row for each assignment. Enter the grade you received as a percentage and the weight it carries in your course. Both of these live in your syllabus, usually under a section called Grading Policy or Assessment Breakdown. If your syllabus lists grades in points rather than percentages, divide your earned points by the total possible points and multiply by 100. So 72 out of 90 points becomes 80%.
          </p>

          <h3 className="h5 mt-3 fw-bold">Adding assignment names</h3>
          <p>
            This part is completely optional. If you are entering a full semester of work and want to be able to read through it clearly, naming each row helps. If you just want a quick number, skip it entirely and go straight to the grades and weights.
          </p>

          <h3 className="h5 mt-3 fw-bold">Getting your result</h3>
          <p>
            Once everything is entered, hit Calculate. You will see your overall weighted grade as a percentage along with the corresponding letter grade.
          </p>

          <h3 className="h5 mt-3 fw-bold">Two things worth knowing before you start</h3>
          <p>
            Your weights do not need to add up to 100% for the calculator to work. If you are only entering assignments you have completed so far, that is completely fine. The calculator works out your weighted average for whatever you have entered and does not assume a zero for anything you left out.
          </p>
          <p>
            If your syllabus lists categories rather than individual assignments, for example, Homework 20%, Midterm 30%, Final Exam 50%, you can enter one row per category. Just use your overall grade within that category and the category weight. You do not need to break it down further unless you want to.
          </p>

          <h2 className="h4 mt-4 fw-bold">How the Weighted Grade Formula Works</h2>
          <p>
            The formula multiplies each grade by its weight, adds all of those results together, and then divides by the total weight entered. That gives you a grade that reflects how much each piece of work actually mattered.
          </p>
          <p><strong>Weighted Grade = (Sum of Grade × Weight) ÷ Sum of All Weights</strong></p>
          <p>Here is a worked example:</p>
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
            (90×20 + 78×30 + 85×50) ÷ (20+30+50) = (1800 + 2340 + 4250) ÷ 100 = 83.9% which is B
          </p>
          <p>
            Now think about those scores were flipped. A 78% on the final and a 90% on the homework instead of the other way around. The overall grade drops noticeably because the final carries half the weight. That is exactly why weighted grading exists and why a strong performance on high-weight assignments matters so much more than squeezing a few extra points out of a low-weight quiz.
          </p>

          <h2 className="h4 mt-4 fw-bold">What Each Letter Grade Represents</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2 mb-3">
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Percentage Range</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>90% and above</td></tr>
                <tr><td>B</td><td>80% to 89%</td></tr>
                <tr><td>C</td><td>70% to 79%</td></tr>
                <tr><td>D</td><td>60% to 69%</td></tr>
                <tr><td>F</td><td>Below 60%</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Some schools use plus and minus grades like A- or B+ with slightly different cutoff points. If that level of precision matters for your GPA, check your institution&apos;s grading scale directly.
          </p>

          <h2 className="h4 mt-4 fw-bold">Common Ways Students Use This Calculator</h2>
          <p>
            Checking where you stand mid-semester is probably the most common use. Enter everything that has been graded so far, and you will know exactly where your overall grade sits before finals arrive. That gives you time to make decisions rather than just react to results.
          </p>
          <p>
            Seeing what a single grade did to your average is another. Got a midterm back and not sure how much damage or how much good it did? Enter your scores with and without it, and you will see the exact difference. This also helps you work out which upcoming assignments are worth the most effort.
          </p>
          <p>
            Planning your final push is where it really pays off. If your final exam is worth 40% and you know your current grade going in, you can work out exactly what you need to score to hit your target. If that is what you are after, pair this with the <a href="/">Final Grade Calculator</a>, which is built specifically for that question.
          </p>
          <p>
            One thing students often miss is checking whether their weights add up correctly. If you have entered all your assignments and the weights sum to something noticeably above or below 100%, something is off. Go back to your syllabus and double-check, or ask your instructor.
          </p>

          <h2 className="h4 mt-4 fw-bold">Frequently Asked Questions</h2>

          <h3 className="h5 mt-3">1. What is the difference between a weighted and unweighted grade calculator?</h3>
          <p>
            An unweighted calculator adds up all your scores and divides by the number of assignments. Every grade counts the same regardless of how much that assignment was actually worth. A weighted calculator accounts for the difference, so a final exam worth 50% of your grade contributes far more to the result than a homework assignment worth 5%. For most real courses, weighted is the accurate one.
          </p>

          <h3 className="h5 mt-3">2. What if all my assignments carry the same weight?</h3>
          <p>
            Enter the same weight for each one, say 10 across the board, and the calculator treats them equally. The result will be identical to a simple average, which is exactly what you want in that situation.
          </p>

          <h3 className="h5 mt-3">3. Can I use this for high school, college, and university courses?</h3>
          <p>
            Yes. As long as you know your scores and what each one is worth, the calculator works for any course at any level. The formula does not change.
          </p>

          <h3 className="h5 mt-3">4. My course lists categories, not individual assignments?</h3>
          <p>
            Enter one row per category. Use your grade for that category and the weight it carries in your syllabus. If your homework average is 88% and homework counts for 20% of your grade, enter 88 and 20. That is all you need.
          </p>

          <h3 className="h5 mt-3">5. What if I have not finished all my assignments yet?</h3>
          <p>
            Enter what you have. The calculator gives you an accurate weighted average for the work you have entered and does not penalise you for anything you have left out. It treats whatever weights you entered as the whole picture, so your result reflects only what you have put in.
          </p>

          <h3 className="h5 mt-3">6. How do I know if my weights are correct?</h3>
          <p>
            If you have entered every assignment category from your syllabus and your weights do not add up to around 100%, something is either missing or entered incorrectly. Your syllabus is the definitive source. If something still does not add up after checking, ask your instructor to clarify the grading breakdown.
          </p>

          <h3 className="h5 mt-3">7. What is the difference between this and a final grade calculator?</h3>
          <p>
            This calculator shows your current overall grade based on work you have already completed. A <a href="/">final grade calculator</a> answers a different question entirely. It tells you what score you need on an upcoming exam to reach a specific target. Both are useful, just at different moments in the semester.
          </p>
        </div>
      </div>

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      <CalculatorNav />
      </Layout>
    </>
  );
}
