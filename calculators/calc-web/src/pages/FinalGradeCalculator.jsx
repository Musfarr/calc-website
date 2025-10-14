import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';

export default function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [result, setResult] = useState(null);

  // Calculate required final exam grade
  const calculateFinalGrade = () => {
    const current = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalWeight);

    // Validation
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

    // Formula: Required Final = (Desired Grade - Current Grade * (1 - Final Weight)) / Final Weight
    const currentWeight = (100 - weight) / 100;
    const finalWeightDecimal = weight / 100;
    
    const requiredFinal = (desired - (current * currentWeight)) / finalWeightDecimal;

    setResult({
      required: requiredFinal.toFixed(2),
      achievable: requiredFinal <= 100 && requiredFinal >= 0,
      letterGrade: getLetterGrade(requiredFinal)
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
    setCurrentGrade('');
    setDesiredGrade('');
    setFinalWeight('');
    setResult(null);
  };

  return (
    <Layout title="Final Grade Calculator">
      <div className="calculator-container">
        <h2 className="mb-4">Final Grade Calculator</h2>
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

        {/* Result Display */}
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

        {/* Example Section */}
        {/* <div className="mt-4 p-3 bg-light rounded">
          <h5>Example:</h5>
          <p className="mb-2">
            If you have an <strong>85%</strong> in the class, want to achieve a <strong>90%</strong> final grade, 
            and the final exam is worth <strong>30%</strong> of your grade:
          </p>
          <ul className="mb-0">
            <li>Current grade contribution: 85% × 70% = 59.5%</li>
            <li>Desired total: 90%</li>
            <li>Required from final: 90% - 59.5% = 30.5%</li>
            <li>Required final grade: 30.5% ÷ 30% = <strong>101.67%</strong> (Not achievable)</li>
          </ul>
        </div> */}

        {/* How to Use */}
        {/* <div className="mt-3 p-3 bg-light rounded">
          <h5>How to Use:</h5>
          <ol className="mb-0">
            <li>Enter your current grade in the class (before the final exam)</li>
            <li>Enter the grade you want to achieve in the class</li>
            <li>Enter what percentage of your grade the final exam is worth</li>
            <li>Click "Calculate" to see what you need to score on the final</li>
          </ol>
        </div> */}





        <div className="mt-3 p-3 bg-light rounded">
          <h5 className='mt-2 '>How to Use a Final Grade Calculator?</h5>

          <div className="">
          <ol className="mb-0">
            <p><strong>Here’s a step-by-step guide on how to use a Final Grade Calculator:</strong></p>
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
          </ol>


          </div>

          
        </div>
      </div>

      <CalculatorNav />
    </Layout>
  );
}
