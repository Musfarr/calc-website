import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: '', credits: '', grade: '' }
  ]);
  const [result, setResult] = useState(null);

  // Grade to GPA conversion (4.0 scale)
  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  // Add new course
  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: '', credits: '', grade: '' }
    ]);
  };

  // Remove course
  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Update course value
  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  // Calculate GPA
  const calculateGPA = () => {
    const validCourses = courses.filter(c => c.credits && c.grade);
    
    if (validCourses.length === 0) {
      alert('Please enter at least one course with credits and grade');
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    validCourses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradePoints[course.grade] || 0;
      
      totalPoints += (points * credits);
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    setResult({
      gpa: gpa.toFixed(3),
      totalCredits: totalCredits,
      totalCourses: validCourses.length,
      classification: getClassification(gpa)
    });
  };

  // Get classification based on GPA
  const getClassification = (gpa) => {
    if (gpa >= 3.7) return 'Summa Cum Laude (Highest Honors)';
    if (gpa >= 3.5) return 'Magna Cum Laude (High Honors)';
    if (gpa >= 3.3) return 'Cum Laude (Honors)';
    if (gpa >= 3.0) return 'Good Standing';
    if (gpa >= 2.0) return 'Satisfactory';
    return 'Below Satisfactory';
  };

  // Reset calculator
  const resetCalculator = () => {
    setCourses([{ id: 1, name: '', credits: '', grade: '' }]);
    setResult(null);
  };

  return (
    <Layout title="GPA Calculator">
      <div className="calculator-container">
        <h2 className="mb-4">GPA Calculator</h2>
        <p className="text-muted">
          Calculate your Grade Point Average (GPA) based on your courses, credit hours, and grades.
        </p>

        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Name (Optional)</th>
                <th>Credit Hours</th>
                <th>Letter Grade</th>
                <th>Grade Points</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Calculus I"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g., 3"
                      min="0"
                      max="10"
                      step="0.5"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    >
                      <option value="">Select Grade</option>
                      <option value="A+">A+ (4.0)</option>
                      <option value="A">A (4.0)</option>
                      <option value="A-">A- (3.7)</option>
                      <option value="B+">B+ (3.3)</option>
                      <option value="B">B (3.0)</option>
                      <option value="B-">B- (2.7)</option>
                      <option value="C+">C+ (2.3)</option>
                      <option value="C">C (2.0)</option>
                      <option value="C-">C- (1.7)</option>
                      <option value="D+">D+ (1.3)</option>
                      <option value="D">D (1.0)</option>
                      <option value="D-">D- (0.7)</option>
                      <option value="F">F (0.0)</option>
                    </select>
                  </td>
                  <td className="text-center">
                    {course.grade && course.credits ? (
                      <strong>{(gradePoints[course.grade] * parseFloat(course.credits)).toFixed(2)}</strong>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length === 1}
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
          <button className="btn btn-secondary" onClick={addCourse}>
            + Add Course
          </button>
          <button className="btn btn-primary" onClick={calculateGPA}>
            Calculate GPA
          </button>
          <button className="btn btn-outline-secondary" onClick={resetCalculator}>
            Reset
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className="result-display">
            <h3>Your GPA</h3>
            <div className="result-value">{result.gpa}</div>
            <div className="mt-3">
              <p className="mb-1"><strong>Total Credits:</strong> {result.totalCredits}</p>
              <p className="mb-1"><strong>Courses Calculated:</strong> {result.totalCourses}</p>
              <p className="mb-0"><strong>Classification:</strong> {result.classification}</p>
            </div>
          </div>
        )}

        {/* GPA Scale Reference */}
        <div className="mt-4 p-3 bg-light rounded">
          <h5>GPA Scale (4.0 System):</h5>
          <div className="row">
            <div className="col-md-6">
              <ul className="mb-0">
                <li><strong>A+:</strong> 4.33 - Excellent</li>
                <li><strong>A:</strong> 4.00</li>
                <li><strong>A-:</strong> 3.67</li>
                <li><strong>B+:</strong> 3.33</li>
                <li><strong>B:</strong> 3.00 - Good</li>
                <li><strong>B-:</strong> 2.67</li>
                <li><strong>C+:</strong> 2.33</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="mb-0">
                <li><strong>C:</strong> 2.00 - Average</li>
                <li><strong>C-:</strong> 1.67</li>
                <li><strong>D+:</strong> 1.33</li>
                <li><strong>D:</strong> 1.00 - Poor</li>
                <li><strong>D-:</strong> 0.67</li>
                <li><strong>F:</strong> 0 - Fail</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="mt-3 p-3 bg-light rounded">
          <p className="mb-3">
            This GPA calculator is designed to quickly and accurately compute your grade point average based on your course credit hours and letter grades. 
            It simplifies academic tracking by helping students and educators calculate GPA with ease, supporting informed decisions about academic performance and goals.
          </p>
          
          <h5>How to Use a GPA Calculator?</h5>
          <p>Here's a step-by-step guide on how to use a GPA Calculator:</p>
          <p>
            Enter the course name in the "Course Name" field (optional), the number of credit hours in the "Credit Hours" field, 
            and select your grade from the "Letter Grade" dropdown. Then click "Calculate GPA" to see your GPA result.
          </p>
          
          <h6 className="mt-3"><strong>For example:</strong></h6>
          <p>
            The GPA is calculated as a weighted average of the grades, where the number of credit/hours is the weight and the numeric grade is taken from the GPA table.
          </p>
          
          <p>The GPA is equal to the sum of the product of the credit hours weight (w) times the grade (g):</p>
          <p><strong>GPA = w₁×g₁ + w₂×g₂ + w₃×g₃ + ... + wₙ×gₙ</strong></p>
          
          <p className="mt-3">The credit hours weight (wᵢ) is equal to the credit hours of the class divided by the sum of the credit hours of all the classes:</p>
          <p><strong>wᵢ = cᵢ / (c₁ + c₂ + c₃ + ... + cₙ)</strong></p>
        </div>
      </div>

      <CalculatorNav />
    </Layout>
  );
}
