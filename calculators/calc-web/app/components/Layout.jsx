"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <header className="gradient-header">
        <div className="container-fluid">
          <div className="row align-items-center py-3 mx-4">
            <div className="col-6 col-md-6">
              <Link href="/" className="text-decoration-none text-white">
                <img src="/5.png" alt="Logo" className="logo-img img-fluid" />
              </Link>
            </div>
            <div className="col-6 col-md-6">
              <nav className="navbar navbar-expand-lg navbar-dark p-0">
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
                        href="/"
                        className={`nav-link ${pathname === '/' ? 'active fw-bold' : ''}`}
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
                        <li><Link className="dropdown-item" href="/">Final Grade Calculator</Link></li>
                        <li><Link className="dropdown-item" href="/grade-calculator/">Grade Calculator</Link></li>
                        <li><Link className="dropdown-item" href="/percentage-calculator/">Percentage Calculator</Link></li>
                        <li><Link className="dropdown-item" href="/gpa-calculator/">GPA Calculator</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/blog/"
                        className={`nav-link ${pathname.startsWith('/blog') ? 'active fw-bold' : ''}`}
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

      <div className="container-fluid mt-3">
        <div id="ad-top" className="ad-laceholder"></div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2 d-none d-xl-block">
            <div id="ad-left" className="ad-laceholder sticky-top" style={{ top: '20px' }}></div>
          </div>

          <div className="col-xl-8 col-12">
            <div className="px-md-4">
              {children}
            </div>
          </div>

          <div className="col-xl-2 d-none d-xl-block">
            <div id="ad-right" className="ad-laceholder sticky-top" style={{ top: '20px' }}></div>
          </div>
        </div>
      </div>

      <footer className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-2">&copy; 2026 Final Grades Calculator. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link href="/">Home</Link>
              <Link href="/blog/">Blog</Link>
              <Link href="/privacy/">Privacy Policy</Link>
              <Link href="/terms/">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
