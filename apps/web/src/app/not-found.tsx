'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#333' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#999', maxWidth: '400px', textAlign: 'center' }}>
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link href="/" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#039BE5', color: 'white', textDecoration: 'none', borderRadius: '4px', transition: 'background-color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0277BD')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#039BE5')}>
        Return to Home
      </Link>
    </div>
  );
}
