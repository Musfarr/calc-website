import { useState } from 'react';
import Layout from '../components/Layout';
import CalculatorNav from '../components/CalculatorNav';
import { Helmet } from 'react-helmet-async';

export default function PercentageCalculator() {
  // Type 1: What is X% of Y?
  const [type1, setType1] = useState({ percent: '', number: '', result: null });
  
  // Type 2: X is what percent of Y?
  const [type2, setType2] = useState({ number1: '', number2: '', result: null });
  
  // Type 3: Percent increase/decrease
  const [type3, setType3] = useState({ original: '', new: '', result: null });

  // Calculate Type 1: What is X% of Y?
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

  // Calculate Type 2: X is what percent of Y?
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

  // Calculate Type 3: Percent increase/decrease
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

  return (
    <>
    <Helmet>
      <title>Online Percentage Calculator - Put the Value, Get the Answer</title>
        <meta name="description" content="With this percentage calculator, you can easily calculate the percentage of a value, what percent one is of another, & the percentage difference. Click Now!" />
        <meta property="og:title" content="Online Percentage Calculator - Put the Value, Get the Answer" />
        <link rel="canonical" href="https://www.finalgradescalculator.com/percentage-calculator" />
    </Helmet>
    <Layout title="Percentage Calculator">
      <div className="calculator-container">
        <h1 className="mb-4 text-white">Percentage Calculator</h1>
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
          <p className="mb-3">
            This online percentage calculator is designed to quickly and accurately determine percentages for any value or comparison. 
            It simplifies everyday calculations, assisting students, professionals, and anyone who needs quick percentage results to manage their tasks with ease.
          </p>
          
          <h5>How to Use a Percentage Calculator?</h5>
          <p>Here's a step-by-step guide on how to use a Percentage Calculator:</p>
          
          <h6 className="mt-3"><strong>To Calculate the Percentage of a Value</strong></h6>
          <p>
            Enter the percentage in the "Percent (%)" field and the number you want to calculate it from in the "Of Number" field. 
            Then click "Calculate" to see the result.
          </p>
          <p><strong>For example:</strong></p>
          <p>What is 20% of $60?</p>
          <p>20% is 20/100 multiplied by $60:</p>
          <p><strong>20% × $60 = 20/100 × $60 = 0.2 × $60 = $12</strong></p>
          
          <h6 className="mt-3"><strong>To Calculate What Percentage One Number is Of Another</strong></h6>
          <p>
            Enter the first number in the "Number (X)" field and the second number in the "Of Number (Y)" field. 
            Then click "Calculate" to find out what percentage the first number is of the second.
          </p>
          <p><strong>For Example:</strong></p>
          <p>$12 is what percent of $60?</p>
          <p>$12 is divided by $60 and multiplied by 100%:</p>
          <p><strong>($12 / $60) × 100% = 20%</strong></p>
          
          <h6 className="mt-3"><strong>To Calculate the Percentage Change</strong></h6>
          <p>
            Enter the original value in the "Original Value" field and the new value in the "New Value" field. 
            Then click "Calculate" to find the percentage change between the two values.
          </p>
          <p><strong>For Example:</strong></p>
          <p>What is the percentage change from $40 to $50?</p>
          <p>The difference between $50 and $40 is divided by $40 and multiplied by 100%:</p>
          <p><strong>(($50 - $40) / $40) × 100% = 0.25 × 100% = 25%</strong></p>
        </div>
      </div>

      <CalculatorNav />
    </Layout>
    </>
  );
}
