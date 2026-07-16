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
          <h2 className="fw-bold">What Is a GPA Calculator?</h2>
          <p>
            Your GPA is one of the most consequential numbers in your academic record. It affects scholarship eligibility, academic standing, graduate school applications, honors designations, and in some fields, early career opportunities. Understanding exactly where yours stands and what is driving it gives you something to act on rather than just worry about.
          </p>
          <p>
            A GPA calculator works out your Grade Point Average by combining the grades you received with the credit weight of each course. It does not treat every class equally. A four-credit course contributes more to your GPA than a two-credit one, even if you earned the same letter grade in both.
          </p>
          <p>
            This calculator is useful at any point in the semester or academic year. Use it after grades are posted to see where you landed, mid-semester to model different outcomes, or before course registration to plan which classes fit your GPA goals.
          </p>

          <h2 className="h4 mt-4 fw-bold">How to Use the GPA Calculator</h2>
          <p>
            Add one row for each course. Enter the number of credit hours, typically 3 or 4 per course though this varies by institution and course type, and select the letter grade you received from the dropdown.
          </p>
          <p>
            The course name is optional. If you are tracking a full semester or comparing multiple terms, naming your courses makes it easier to read the results and catch any entry errors. If you just want a quick calculation, skip the names.
          </p>
          <p>
            Once all your courses are entered, click Calculate GPA. Your Grade Point Average will appear alongside the total credits entered.
          </p>
          <p>
            To see how a grade change would affect your GPA, adjust any grade in the dropdown and recalculate. This is useful for understanding which courses had the biggest impact on your average and which ones, if retaken or replaced, would move the needle most.
          </p>
          
          <h2 className="h4 mt-4 fw-bold">How GPA Is Calculated</h2>
          <p>
            GPA uses a weighted average formula. Each grade is first converted to a grade point value on a 4.0 scale. That value is then multiplied by the number of credit hours the course carries. All of those products are added together and divided by the total number of credits entered.
          </p>
          <p><strong>GPA = Sum of (Grade Points × Credits) ÷ Sum of All Credits</strong></p>

          <h3 className="h5 mt-3 fw-bold">Grade point scale:</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2 mb-3">
              <thead>
                <tr>
                  <th>Letter Grade</th>
                  <th>Grade Points</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>A+</td><td>4.0</td></tr>
                <tr><td>A</td><td>4.0</td></tr>
                <tr><td>A-</td><td>3.7</td></tr>
                <tr><td>B+</td><td>3.3</td></tr>
                <tr><td>B</td><td>3.0</td></tr>
                <tr><td>B-</td><td>2.7</td></tr>
                <tr><td>C+</td><td>2.3</td></tr>
                <tr><td>C</td><td>2.0</td></tr>
                <tr><td>C-</td><td>1.7</td></tr>
                <tr><td>D+</td><td>1.3</td></tr>
                <tr><td>D</td><td>1.0</td></tr>
                <tr><td>F</td><td>0.0</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="h5 mt-3 fw-bold">Worked example:</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2 mb-3">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Credits</th>
                  <th>Grade</th>
                  <th>Grade Points</th>
                  <th>Weighted Points</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Math 101</td><td>4</td><td>A</td><td>4.0</td><td>16.0</td></tr>
                <tr><td>English 101</td><td>3</td><td>B</td><td>3.0</td><td>9.0</td></tr>
                <tr><td>History 101</td><td>3</td><td>A-</td><td>3.7</td><td>11.1</td></tr>
              </tbody>
            </table>
          </div>
          <p>Total weighted points: 16.0 + 9.0 + 11.1 = 36.1</p>
          <p>Total credits: 4 + 3 + 3 = 10</p>
          <p><strong>GPA = 36.1 ÷ 10 = 3.61</strong></p>
          <p>
            Notice that the Math course carries the most influence here. Four credits at an A contributes 16 points, compared to the three-credit courses at 9 and 11.1. This is exactly why credit hours matter in the calculation and why a high grade in a high-credit course can meaningfully lift your GPA, while a poor grade in the same situation can significantly drag it down.
          </p>

          <h2 className="h4 mt-4 fw-bold">What Your GPA Means</h2>
          <p>
            GPA thresholds vary by institution and context, but these ranges reflect how GPAs are generally interpreted across most universities and colleges:
          </p>
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2 mb-3">
              <thead>
                <tr>
                  <th>GPA Range</th>
                  <th>Standing</th>
                  <th>What It Often Means</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>3.7 to 4.0</td><td>Excellent</td><td>Dean&apos;s List eligibility at most institutions</td></tr>
                <tr><td>3.3 to 3.69</td><td>Very Good</td><td>Competitive for graduate school and scholarships</td></tr>
                <tr><td>3.0 to 3.29</td><td>Good</td><td>Meets most academic requirements comfortably</td></tr>
                <tr><td>2.7 to 2.99</td><td>Satisfactory</td><td>Above minimum standing, may limit some opportunities</td></tr>
                <tr><td>2.0 to 2.69</td><td>Passing</td><td>Meets minimum requirements at most institutions</td></tr>
                <tr><td>Below 2.0</td><td>At Risk</td><td>May trigger academic probation at many schools</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            These are general benchmarks. Always check your specific institution&apos;s policies and any program-specific GPA requirements. Graduate programs, scholarships, and professional schools often set their own thresholds.
          </p>

          <h2 className="h4 mt-4 fw-bold">How Individual Grades Affect Your GPA</h2>
          <p>
            One of the most useful things a GPA calculator can show you is how sensitive your average is to a single grade change. The impact depends entirely on the credit weight of the course.
          </p>
          <p>
            A grade change in a four-credit course moves your GPA more than the same change in a two-credit course. A student with 60 accumulated credits will see less movement from one new course than a first-semester student with only 15 credits, because the new grade is being averaged against a much larger base.
          </p>
          <p>
            This has practical implications. Early in your academic career, each course has an outsized effect on your GPA. One strong semester can establish a solid foundation. One difficult semester is also harder to recover from later, once you have more credits diluting any single term&apos;s impact. Later in your degree, maintaining your GPA is generally more manageable, but significantly raising it requires consistent performance over multiple terms. A single good semester will not move a cumulative GPA by much when it is competing against three years of prior results.
          </p>

          <h2 className="h4 mt-4 fw-bold">Cumulative GPA vs. Semester GPA</h2>
          <p>
            Your semester GPA reflects only the courses from one term. Your cumulative GPA covers your entire academic record.
          </p>
          <p>
            To calculate your cumulative GPA using this tool, enter all courses across all semesters. Each course is weighted by its credits, so the total reflects the same formula your institution uses. If you want to see just one semester, enter only those courses.
          </p>
          <p>
            Some students track both. Semester GPA tells you how a particular term went and whether your performance is trending up or down. Cumulative GPA is what appears on your transcript and what external parties such as employers, graduate schools, and scholarship committees typically evaluate.
          </p>
          <p>
            If your cumulative GPA is lower than you would like, look at your semester GPA trend. Consistent improvement over several terms is visible to admissions committees and demonstrates trajectory, even if the cumulative number has not caught up yet.
          </p>

          <h2 className="h4 mt-4 fw-bold">Frequently Asked Questions</h2>

          <h3 className="h5 mt-3">1. Does an A+ count differently from an A?</h3>
          <p>
            At most institutions in the US, both A+ and A convert to 4.0 grade points, so they contribute identically to your GPA. Some schools do award 4.3 for an A+, which can push a GPA above 4.0. This calculator uses the standard 4.0 scale. Check your institution&apos;s policy if precision matters.
          </p>

          <h3 className="h5 mt-3">2. Do all courses count toward my GPA?</h3>
          <p>
            Not always. Pass or fail courses, transfer credits, audit enrolments, and remedial courses are often excluded from GPA calculations depending on your institution&apos;s policy. Check with your registrar to confirm which courses appear in your GPA and which do not before entering them here.
          </p>

          <h3 className="h5 mt-3">3. How many credits does it take to raise my GPA significantly?</h3>
          <p>
            It depends on how many credits you have already completed. The more accumulated credits you carry, the harder it is to move your GPA in either direction. A student with 120 completed credits would need an extraordinary run of grades to shift their cumulative GPA by even a few tenths of a point. Use this calculator to model different scenarios and see the real impact.
          </p>

          <h3 className="h5 mt-3">4. What if my school uses a different grading scale?</h3>
          <p>
            Some institutions use a 4.3 scale awarding 4.3 for A+, a 5.0 scale, or percentage-based grading with custom conversion tables. This calculator uses the standard 4.0 scale common across US colleges and universities. If your institution uses a different scale, consult your registrar or student handbook for the correct conversion.
          </p>

          <h3 className="h5 mt-3">5. Can I use this to calculate my GPA for graduate school applications?</h3>
          <p>
            Yes, with one caveat. Some graduate programs calculate GPA differently, for example using only the last 60 credits, or only upper-division coursework, or only courses within a specific major. Before relying on your result for an application, confirm which courses the program wants included and enter accordingly.
          </p>

          <h3 className="h5 mt-3">6. What is the fastest way to raise a low GPA?</h3>
          <p>
            The most direct path is earning strong grades in high-credit courses over consecutive terms, combined with any grade replacement or academic renewal policies your institution offers. Some schools allow students to retake a course and have the new grade replace or average with the original in the GPA calculation. Check with your registrar as those policies vary widely and can make a meaningful difference.
          </p>
        </div>
      </div>

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      <CalculatorNav />
      </Layout>
    </>
  );
}
