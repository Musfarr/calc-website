'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: '', credits: '', grade: '' }
  ]);
  const [result, setResult] = useState(null);

  const gradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0,
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: '', credits: '', grade: '' }
    ]);
  };

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(c => c.name && c.credits && c.grade);
    
    if (validCourses.length === 0) {
      alert('Please enter at least one course');
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    validCourses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * credits;
      totalCredits += credits;
    });

    const gpa = (totalPoints / totalCredits).toFixed(2);
    setResult(gpa);
  };

  const resetCalculator = () => {
    setCourses([{ id: 1, name: '', credits: '', grade: '' }]);
    setResult(null);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPA Calculator",
    operatingSystem: "All",
    applicationCategory: "CalculatorApplication",
    description: "Easily calculate your GPA with our free online GPA Calculator. Input your courses, credits, and grades to get your GPA instantly.",
    url: "https://www.finalgradescalculator.com/gpa-calculator/",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "240"
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
        <h1 className="mb-4">GPA Calculator</h1>
        <div className="calculator-container">
        <p className="text-muted">
          Enter your courses, credits, and grades to calculate your GPA.
        </p>

        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Grade</th>
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
                      placeholder="e.g., Math 101"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Credits"
                      min="0"
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
                      {Object.keys(gradePoints).map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
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

        {result && (
          <div className="result-display">
            <h3>Your GPA</h3>
            <div className="result-value">{result}</div>
            <p className="mb-0 mt-2">Based on {courses.filter(c => c.grade).length} courses</p>
          </div>
        )}

        <div className="mt-4 p-3 bg-light rounded">
          <p className="mb-3">
            This online GPA calculator is designed to quickly and accurately calculate your Grade Point Average based on your courses, credits, and grades. 
            It simplifies GPA calculation, enabling students to track their academic progress with ease and precision.
          </p>
          
          <h2 className='fw-bold'>How to Use a GPA Calculator?</h2>
          <p><strong>Here's a step-by-step guide on how to use a GPA Calculator:</strong></p>
          
          <h3 className="mt-3"><strong>Step 1: Enter Course Name</strong></h3>
          <p>Enter the name of each course you've taken (e.g., Math 101, Biology 201, etc.). This is optional but helps you keep track.</p>
          
          <h3><strong>Step 2: Enter Credits</strong></h3>
          <p>Enter the number of credit hours for each course. This is typically 3 or 4 credits per course, but can vary.</p>
          
          <h3><strong>Step 3: Select Grade</strong></h3>
          <p>Select the letter grade you received for each course from the dropdown menu (A+, A, A-, B+, B, B-, C+, C, C-, D+, D, F).</p>
          
          <h3><strong>Step 4: Calculate GPA</strong></h3>
          <p>Click the "Calculate GPA" button to compute your GPA based on the courses, credits, and grades you've entered.</p>
          
          <h3><strong>Step 5: View Results</strong></h3>
          <p>Your calculated GPA will be displayed. You can add more courses or adjust grades to see how they affect your GPA.</p>
          
          <h2 className="mt-4">GPA Calculation Formula</h2>
          <p>GPA is calculated using the following formula:</p>
          <p><strong>GPA = (Sum of (Grade Points × Credits)) / (Sum of Credits)</strong></p>
          
          <h6 className="mt-3"><strong>Grade Point Scale:</strong></h6>
          <ul>
            <li>A+ = 4.0</li>
            <li>A = 4.0</li>
            <li>A- = 3.7</li>
            <li>B+ = 3.3</li>
            <li>B = 3.0</li>
            <li>B- = 2.7</li>
            <li>C+ = 2.3</li>
            <li>C = 2.0</li>
            <li>C- = 1.7</li>
            <li>D+ = 1.3</li>
            <li>D = 1.0</li>
            <li>F = 0.0</li>
          </ul>
          
          <h6 className="mt-3"><strong>Example:</strong></h6>
          <ul>
            <li>Math 101: 4 credits, Grade A (4.0 points) = 16 points</li>
            <li>English 101: 3 credits, Grade B (3.0 points) = 9 points</li>
            <li>History 101: 3 credits, Grade A- (3.7 points) = 11.1 points</li>
          </ul>
          
          <p>Total points: 16 + 9 + 11.1 = 36.1</p>
          <p>Total credits: 4 + 3 + 3 = 10</p>
          <p><strong>GPA = 36.1 / 10 = 3.61</strong></p>
        </div>
      </div>

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      <CalculatorNav />
      </Layout>
    </>
  );
}
