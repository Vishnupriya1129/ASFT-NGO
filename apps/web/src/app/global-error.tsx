'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Something went wrong</h1>

        <p>{error.message}</p>

        <button onClick={() => reset()}>
          Try Again
        </button>
      </body>
    </html>
  );
}
