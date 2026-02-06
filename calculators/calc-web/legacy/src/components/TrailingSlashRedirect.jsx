import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Component that ensures all routes have trailing slashes
 * Automatically redirects routes without trailing slashes to include them
 */
export default function TrailingSlashRedirect({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    
    // Skip if already has trailing slash or is root
    if (pathname === '/' || pathname.endsWith('/')) {
      return;
    }

    // Redirect to the same path with trailing slash
    const newPath = `${pathname}/${search}${hash}`;
    navigate(newPath, { replace: true });
  }, [location, navigate]);

  return children;
}
