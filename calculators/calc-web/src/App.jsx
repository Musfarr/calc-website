import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Pages
import GradeCalculator from './pages/GradeCalculator';
import PercentageCalculator from './pages/PercentageCalculator';
import FinalGradeCalculator from './pages/FinalGradeCalculator';
import GPACalculator from './pages/GPACalculator';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';


function App() {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        {/* Calculator Routes */}
        <Route path="/" element={<FinalGradeCalculator />} />
        <Route path="/grade-calculator" element={<GradeCalculator />} />
        <Route path="/percentage-calculator" element={<PercentageCalculator />} />
        <Route path="/gpa-calculator" element={<GPACalculator />} />
        
        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* Static Pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
    </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
