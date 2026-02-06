import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'Final Grades Calculator',
  description: 'Free online calculators for grades, percentages, GPA, and study tips.',
  metadataBase: new URL('https://www.finalgradescalculator.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/6.png" />
        <link rel="apple-touch-icon" href="/6.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9269385747801854"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-98RFDVM6LP" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-98RFDVM6LP');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
