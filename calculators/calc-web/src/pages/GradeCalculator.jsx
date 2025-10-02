import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';

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
    <Layout title="Grade Calculator">
      <div className="calculator-container">
        <h2 className="mb-4">Calculate Your Weighted Grade</h2>
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
          <h5>How to Use:</h5>
          <ol className="mb-0">
            <li>Enter each assignment/test grade (as a percentage)</li>
            <li>Enter the weight of each assignment (as a percentage)</li>
            <li>Add more rows if needed</li>
            <li>Click "Calculate Grade" to see your weighted final grade</li>
          </ol>
        </div>
      </div>

      {/* Navigation to Other Calculators */}
      <CalculatorNav />
    </Layout>
  );
}
