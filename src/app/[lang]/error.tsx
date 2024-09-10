'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { BASE_URL } from '@/contains/constants';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  let apiURL = BASE_URL;
  console.log('APIIIII', apiURL);
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Server Error: ', error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Api url: {apiURL || 'Not available'}</p>{' '}
      {/* Display "Not available" if apiURL is empty */}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
