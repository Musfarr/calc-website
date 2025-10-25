import { Link, useLocation } from 'react-router-dom';

export default function CalculatorNav() {
  const location = useLocation();
  
  const calculators = [
    { path: '/', label: 'Final Grade Calculator' },
    { path: '/grade-calculator/', label: 'Grade Calculator' },
    { path: '/percentage-calculator/', label: 'Percentage Calculator' },
    { path: '/gpa-calculator/', label: 'GPA Calculator' }
  ];

  return (
    <div className="nav-calculators">
      {calculators.map((calc) => (
        <Link
          key={calc.path}
          to={calc.path}
          className={`btn ${location.pathname === calc.path ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          {calc.label}
        </Link>
      ))}
    </div>
  );
}
