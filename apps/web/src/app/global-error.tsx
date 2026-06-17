'use client';

import * as Sentry from '@sentry/nextjs';
import { ReactNode } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  Sentry.captureException(error);

  return (
    <html>
      <body>
        <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          {error.digest && <p>Error ID: {error.digest}</p>}
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
