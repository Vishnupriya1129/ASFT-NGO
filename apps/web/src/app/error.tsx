'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#d32f2f' }}>Something went wrong</h1>
      <p style={{ marginBottom: '1rem', color: '#666', maxWidth: '500px', textAlign: 'center' }}>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      {error.digest && (
        <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '2rem' }}>
          Error ID: {error.digest}
        </p>
      )}
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#039BE5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0277BD')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#039BE5')}
      >
        Try again
      </button>
    </div>
  );
}
