import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Pages
import GradeCalculator from './pages/GradeCalculator';
import PercentageCalculator from './pages/PercentageCalculator';
import FinalGradeCalculator from './pages/FinalGradeCalculator';
import GPACalculator from './pages/GPACalculator';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <Routes>
        {/* Calculator Routes */}
        <Route path="/" element={<GradeCalculator />} />
        <Route path="/percentage" element={<PercentageCalculator />} />
        <Route path="/final-grade" element={<FinalGradeCalculator />} />
        <Route path="/gpa" element={<GPACalculator />} />
        
        {/* Blog Route */}
        <Route path="/blog" element={<Blog />} />
        
        {/* Static Pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
