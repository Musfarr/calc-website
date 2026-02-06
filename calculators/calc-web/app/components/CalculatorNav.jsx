'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Final Grade Calculator' },
  { href: '/grade-calculator/', label: 'Grade Calculator' },
  { href: '/percentage-calculator/', label: 'Percentage Calculator' },
  { href: '/gpa-calculator/', label: 'GPA Calculator' },
];

export default function CalculatorNav() {
  const pathname = usePathname();

  const normalize = (path) => {
    if (!path) return '/';
    if (path === '/') return '/';
    return path.endsWith('/') ? path : `${path}/`;
  };

  const current = normalize(pathname);

  return (
    <div className="nav-calculators">
      {links.map((link) => {
        const isActive = current === normalize(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`btn nav-btn ${isActive ? 'btn-primary active-btn' : 'btn-outline-primary'}`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
