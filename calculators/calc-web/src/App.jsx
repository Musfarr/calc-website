import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import NotFound from './pages/NotFound';
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
        <Route path="/grade-calculator" element={<Navigate to="/grade-calculator/" replace />} />
        <Route path="/grade-calculator/" element={<GradeCalculator />} />
        <Route path="/percentage-calculator" element={<Navigate to="/percentage-calculator/" replace />} />
        <Route path="/percentage-calculator/" element={<PercentageCalculator />} />
        <Route path="/gpa-calculator" element={<Navigate to="/gpa-calculator/" replace />} />
        <Route path="/gpa-calculator/" element={<GPACalculator />} />
        
        {/* Blog Routes */}
        <Route path="/blog" element={<Navigate to="/blog/" replace />} />
        <Route path="/blog/" element={<Blog />} />
        <Route path="/blog/:slug" element={<Navigate to="/blog/:slug/" replace />} />
        <Route path="/blog/:slug/" element={<BlogPost />} />
        
        {/* Static Pages */}
        <Route path="/privacy" element={<Navigate to="/privacy/" replace />} />
        <Route path="/privacy/" element={<Privacy />} />
        <Route path="/terms" element={<Navigate to="/terms/" replace />} />
        <Route path="/terms/" element={<Terms />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
