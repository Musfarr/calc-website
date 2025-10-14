import { Link, useLocation } from 'react-router-dom';
import logo from '/5.png';
export default function Layout({ children, title }) {
  const location = useLocation();

  return (
    <>
      {/* Header with Navigation */}
      <header className="gradient-header">
        <div className="container-fluid">
          <div className="row align-items-center py-3 mx-4">
            <div className="col-md-6">
              <Link to="/" className="text-decoration-none text-white">
                <img src={logo} alt="Logo" className=" w-25 img-fluid" />
                {/* <h1 className="mb-0 h3">🧮 Calculator Hub</h1> */}
                {/* <p className="mb-0 small">Free Online Calculators for Students</p> */}
              </Link>
            </div>
            <div className="col-md-6">
              <nav className="navbar navbar-expand-lg navbar-dark">
                <button
                  className="navbar-toggler ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mainNav"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="mainNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active fw-bold' : ''}`}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="calculatorsDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                      >
                        Calculators
                      </a>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/">Final Grade Calculator</Link></li>
                        <li><Link className="dropdown-item" to="/gradeCalculator">Grade Calculator</Link></li>
                        <li><Link className="dropdown-item" to="/percentageCalculator">Percentage Calculator</Link></li>
                        <li><Link className="dropdown-item" to="/gpaCalculator">GPA Calculator</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link 
                        to="/blog" 
                        className={`nav-link ${location.pathname.startsWith('/blog') ? 'active fw-bold' : ''}`}
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Top Ad */}
      <div className="container-fluid mt-3">
        <div id="ad-top" className="ad-laceholder">
          {/* <small>Ad</small> */}
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="container-fluid " >
        <div className="row">
          {/* Left Sidebar Ad - Smaller */}
          <div className="col-xl-2 d-none d-xl-block">
            <div id="ad-left" className="ad-laceholder sticky-top" style={{ top: '20px' }}>
              {/* <small>Ad</small> */}
            </div>
          </div>

          {/* Main Content - Full Width */}
          <div className="col-xl-8 col-12">
            <div className="px-md-4">
              {children}
            </div>
          </div>

          {/* Right Sidebar Ad - Smaller */}
          <div className="col-xl-2 d-none d-xl-block">
            <div id="ad-right" className="ad-laceholder sticky-top" style={{ top: '20px' }}>
              {/* <small>Ad</small> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-2">&copy; 2025 Calculator Hub. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link to="/">Home</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
