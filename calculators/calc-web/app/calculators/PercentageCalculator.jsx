'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';

export default function PercentageCalculator() {
  const [type1, setType1] = useState({ percent: '', number: '', result: null });
  const [type2, setType2] = useState({ number1: '', number2: '', result: null });
  const [type3, setType3] = useState({ original: '', new: '', result: null });

  const calculateType1 = () => {
    const percent = parseFloat(type1.percent);
    const number = parseFloat(type1.number);
    
    if (isNaN(percent) || isNaN(number)) {
      alert('Please enter valid numbers');
      return;
    }
    
    const result = (percent / 100) * number;
    setType1({ ...type1, result: result.toFixed(2) });
  };

  const calculateType2 = () => {
    const number1 = parseFloat(type2.number1);
    const number2 = parseFloat(type2.number2);
    
    if (isNaN(number1) || isNaN(number2) || number2 === 0) {
      alert('Please enter valid numbers (denominator cannot be 0)');
      return;
    }
    
    const result = (number1 / number2) * 100;
    setType2({ ...type2, result: result.toFixed(2) });
  };

  const calculateType3 = () => {
    const original = parseFloat(type3.original);
    const newValue = parseFloat(type3.new);
    
    if (isNaN(original) || isNaN(newValue) || original === 0) {
      alert('Please enter valid numbers (original value cannot be 0)');
      return;
    }
    
    const difference = newValue - original;
    const percentChange = (difference / original) * 100;
    const isIncrease = percentChange > 0;
    
    setType3({ 
      ...type3, 
      result: {
        percent: Math.abs(percentChange).toFixed(2),
        type: isIncrease ? 'increase' : 'decrease',
        difference: Math.abs(difference).toFixed(2)
      }
    });
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Percentage Calculator",
    operatingSystem: "All",
    applicationCategory: "CalculatorApplication",
    description: "Use our free Percentage Calculator to find what percentage one number is of another, or to calculate percentage changes easily and quickly.",
    url: "https://www.finalgradescalculator.com/percentage-calculator/",
    publisher: {
      "@type": "Organization",
      name: "Final Grades Calculator",
      url: "https://www.finalgradescalculator.com/"
    }
  };

  return (
    <>
      <Layout>
        <h1 className="mb-4">Percentage Calculator</h1>
        <div className="calculator-container">
        <p className="text-muted">
          Calculate percentages quickly with these three useful calculators.
        </p>

        {/* Type 1: What is X% of Y? */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">What is X% of Y?</h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Percent (%)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 25"
                  value={type1.percent}
                  onChange={(e) => setType1({ ...type1, percent: e.target.value, result: null })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Of Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 200"
                  value={type1.number}
                  onChange={(e) => setType1({ ...type1, number: e.target.value, result: null })}
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary w-100" onClick={calculateType1}>
                  Calculate
                </button>
              </div>
            </div>
            {type1.result !== null && (
              <div className="alert alert-success mt-3 mb-0">
                <strong>Result:</strong> {type1.percent}% of {type1.number} = <strong>{type1.result}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Type 2: X is what percent of Y? */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">X is what percent of Y?</h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Number (X)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 50"
                  value={type2.number1}
                  onChange={(e) => setType2({ ...type2, number1: e.target.value, result: null })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Of Number (Y)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 200"
                  value={type2.number2}
                  onChange={(e) => setType2({ ...type2, number2: e.target.value, result: null })}
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary w-100" onClick={calculateType2}>
                  Calculate
                </button>
              </div>
            </div>
            {type2.result !== null && (
              <div className="alert alert-success mt-3 mb-0">
                <strong>Result:</strong> {type2.number1} is <strong>{type2.result}%</strong> of {type2.number2}
              </div>
            )}
          </div>
        </div>

        {/* Type 3: Percent Increase/Decrease */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Percent Increase/Decrease</h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label">Original Value</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 100"
                  value={type3.original}
                  onChange={(e) => setType3({ ...type3, original: e.target.value, result: null })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">New Value</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 150"
                  value={type3.new}
                  onChange={(e) => setType3({ ...type3, new: e.target.value, result: null })}
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary w-100" onClick={calculateType3}>
                  Calculate
                </button>
              </div>
            </div>
            {type3.result !== null && (
              <div className={`alert ${type3.result.type === 'increase' ? 'alert-success' : 'alert-warning'} mt-3 mb-0`}>
                <strong>Result:</strong> {type3.result.percent}% <strong>{type3.result.type}</strong>
                <br />
                <small>Difference: {type3.result.difference}</small>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="p-3 bg-light rounded">
          <h2 className="fw-bold">What Is a Percentage Calculator?</h2>
          <p>
            A percentage calculator handles the three most common percentage problems people encounter in daily life: finding a percentage of a number, comparing two numbers as a percentage, and measuring how much something has changed over time.
          </p>
          <p>
            Percentages show up everywhere: exam scores, discounts, tax rates, salary increases, nutrition labels, interest rates, and statistics. The math behind them is straightforward, but it is easy to get confused about which formula applies to which situation. This tool removes that confusion by separating the three calculation types so you always know you are using the right one.
          </p>

          <h2 className="h4 mt-4 fw-bold">Calculate Percentages in Three Different Ways</h2>
          <p>
            Three calculators in one. Find a percentage of a number, work out what percent one number is of another, or calculate how much something has increased or decreased.
          </p>

          <h3 className="h5 mt-3 fw-bold">Calculator 1: What Is X% of Y?</h3>
          <p>Use this when you know a percentage and want to find the actual value it represents.</p>
          <p><strong>How it works:</strong> Divide the percentage by 100, then multiply by the number.</p>
          <p><strong>Result = (Percentage ÷ 100) × Number</strong></p>
          <p><strong>Example:</strong> What is 20% of 60? = (20 ÷ 100) × 60 = 0.20 × 60 = 12</p>
          <p><strong>Where you would use this:</strong></p>
          <ul>
            <li><strong>Discounts:</strong> A jacket costs $120 and is 35% off. What is the discount? (35 ÷ 100) × 120 = $42 off, making the final price $78.</li>
            <li><strong>Tax:</strong> A meal costs $45, and tax is 8%. How much tax do you owe? (8 ÷ 100) × 45 = $3.60.</li>
            <li><strong>Exam scores:</strong> A test has 80 questions, and you need to score 75% to pass. How many do you need to correct? (75 ÷ 100) × 80 = 60 questions.</li>
            <li><strong>Tips:</strong> Your restaurant bill is $94, and you want to leave an 18% tip. (18 ÷ 100) × 94 = $16.92.</li>
            <li><strong>Interest:</strong> You invest $2,000 at a 5% annual return. How much do you earn in a year? (5 ÷ 100) × 2,000 = $100.</li>
          </ul>

          <h3 className="h5 mt-3 fw-bold">Calculator 2: X Is What Percent of Y?</h3>
          <p>Use this when you have two numbers and want to express the first as a percentage of the second.</p>
          <p><strong>How it works:</strong> Divide the first number by the second, then multiply by 100.</p>
          <p><strong>Percentage = (X ÷ Y) × 100</strong></p>
          <p><strong>Example:</strong> 12 is what percent of 60? = (12 ÷ 60) × 100 = 0.20 × 100 = 20%</p>
          <p><strong>Where you would use this:</strong></p>
          <ul>
            <li><strong>Test scores:</strong> You scored 43 out of 55 on an exam. What percentage is that? (43 ÷ 55) × 100 = 78.2%.</li>
            <li><strong>Budget tracking:</strong> You spent $340 out of a $500 monthly budget. How much have you used? (340 ÷ 500) × 100 = 68%.</li>
            <li><strong>Sales performance:</strong> A salesperson closed 27 out of 40 leads this month. What is their conversion rate? (27 ÷ 40) × 100 = 67.5%.</li>
            <li><strong>Nutrition:</strong> A snack has 14g of fat and your daily limit is 65g. What percentage of your limit is that? (14 ÷ 65) × 100 = 21.5%.</li>
            <li><strong>Survey results:</strong> 180 out of 240 respondents said yes. What percentage agreed? (180 ÷ 240) × 100 = 75%.</li>
          </ul>

          <h3 className="h5 mt-3 fw-bold">Calculator 3: Percentage Increase or Decrease</h3>
          <p>Use this when you want to measure how much something has changed between two values, expressed as a percentage.</p>
          <p><strong>How it works:</strong> Subtract the original value from the new value, divide by the original value, then multiply by 100. A positive result means an increase. A negative result means a decrease.</p>
          <p><strong>Percentage Change = ((New Value − Original Value) ÷ Original Value) × 100</strong></p>
          <p><strong>Example:</strong> What is the percentage change from 40 to 50? = ((50 − 40) ÷ 40) × 100 = (10 ÷ 40) × 100 = 25% increase</p>
          <p><strong>Example:</strong> What is the percentage change from 80 to 60? = ((60 − 80) ÷ 80) × 100 = (−20 ÷ 80) × 100 = −25% (a 25% decrease)</p>
          <p><strong>Where you would use this:</strong></p>
          <ul>
            <li><strong>Salary changes:</strong> Your salary went from $48,000 to $54,000. How much of a raise is that? ((54,000 − 48,000) ÷ 48,000) × 100 = 12.5% increase.</li>
            <li><strong>Price changes:</strong> A product cost $25 last year and costs $31 now. How much has the price risen? ((31 − 25) ÷ 25) × 100 = 24% increase.</li>
            <li><strong>Weight or fitness:</strong> Someone went from 210 lbs to 185 lbs. What percentage of their body weight did they lose? ((185 − 210) ÷ 210) × 100 = −11.9%, meaning an 11.9% decrease.</li>
            <li><strong>Business metrics:</strong> Monthly website visits dropped from 12,000 to 9,500. What is the percentage decline? ((9,500 − 12,000) ÷ 12,000) × 100 = −20.8%.</li>
            <li><strong>Investment returns:</strong> A stock was bought at $150 and is now worth $210. What is the return? ((210 − 150) ÷ 150) × 100 = 40% gain.</li>
          </ul>

          <h2 className="h4 mt-4 fw-bold">Percentage Increase vs. Percentage Decrease: What Is the Difference?</h2>
          <p>
            Both use the same formula. The only difference is the direction of the result. If the new value is higher than the original, the result is positive a percentage increase. If the new value is lower, the result is negative a percentage decrease.
          </p>
          <p>
            One thing to be aware of: a 50% increase followed by a 50% decrease does not bring you back to your starting point. If something increases from 100 to 150 (a 50% increase) and then decreases by 50% from 150, it lands at 75 not 100. This is because the second percentage is calculated from the new, higher value. It is a common source of confusion in financial and statistical contexts, and it is worth keeping in mind when interpreting percentage changes over time.
          </p>

          <h2 className="h4 mt-4 fw-bold">Common Percentage Reference Points</h2>
          <p>These are some percentages that come up frequently, expressed as decimals and fractions for quick mental math:</p>
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-2 mb-3">
              <thead>
                <tr>
                  <th>Percentage</th>
                  <th>Decimal</th>
                  <th>Fraction</th>
                  <th>Quick Method</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1%</td><td>0.01</td><td>1/100</td><td>Divide by 100</td></tr>
                <tr><td>5%</td><td>0.05</td><td>1/20</td><td>Divide by 20</td></tr>
                <tr><td>10%</td><td>0.10</td><td>1/10</td><td>Divide by 10</td></tr>
                <tr><td>20%</td><td>0.20</td><td>1/5</td><td>Divide by 5</td></tr>
                <tr><td>25%</td><td>0.25</td><td>1/4</td><td>Divide by 4</td></tr>
                <tr><td>33.3%</td><td>0.333</td><td>1/3</td><td>Divide by 3</td></tr>
                <tr><td>50%</td><td>0.50</td><td>1/2</td><td>Divide by 2</td></tr>
                <tr><td>75%</td><td>0.75</td><td>3/4</td><td>Divide by 4, multiply by 3</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="h4 mt-4 fw-bold">Frequently Asked Questions</h2>

          <h3 className="h5 mt-3">1. What is the formula for calculating a percentage?</h3>
          <p>
            It depends on what you are calculating. To find X% of a number, use (X ÷ 100) × Number. To find what percentage X is of Y, use (X ÷ Y) × 100. To find percentage change, use ((New − Original) ÷ Original) × 100.
          </p>

          <h3 className="h5 mt-3">2. How do I calculate a percentage increase?</h3>
          <p>
            Subtract the original value from the new value, divide that difference by the original value, and multiply by 100. If the answer is positive, it is an increase. If it is negative, it is a decrease.
          </p>

          <h3 className="h5 mt-3">3. What is the difference between percentage and percentage points?</h3>
          <p>
            These are not the same thing. If an interest rate rises from 4% to 6%, it has increased by 2 percentage points, but it has increased by 50% relative to its original value. Percentage points describe an absolute difference between two percentages. Percentage change describes a relative difference. This distinction matters in finance, statistics, and reporting.
          </p>

          <h3 className="h5 mt-3">4. Can I calculate a percentage of a percentage?</h3>
          <p>
            Yes. Convert both percentages to decimals and multiply them. For example, 20% of 15% is 0.20 × 0.15 = 0.03, which is 3%. This comes up in tax-on-tax calculations and layered discount scenarios.
          </p>

          <h3 className="h5 mt-3">5. What does it mean if a percentage change is negative?</h3>
          <p>
            It means the value decreased. A result of −15% means the new value is 15% lower than the original. The formula is the same, and the sign of the result tells you the direction.
          </p>

          <h3 className="h5 mt-3">6. How do I reverse a percentage and find the original value before a percentage was applied?</h3>
          <p>
            Divide the final value by (1 + the percentage as a decimal) for an increase, or by (1 − the percentage as a decimal) for a decrease. For example, if a price is $130 after a 30% increase, the original price was 130 ÷ 1.30 = $100. This is useful for working out pre-tax or pre-discount prices.
          </p>

          <h3 className="h5 mt-3">7. Why do two percentage changes not cancel each other out?</h3>
          <p>
            Because each percentage is calculated from a different base. A 25% increase from 100 gives you 125. A 25% decrease from 125 gives you 93.75, not 100. The base changes each time, which is why percentage changes are not simply additive or reversible.
          </p>
        </div>
      </div>

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      <CalculatorNav />
      </Layout>
    </>
  );
}
