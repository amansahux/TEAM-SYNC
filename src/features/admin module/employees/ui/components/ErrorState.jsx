import React from 'react';
import Button from './Button';

const ErrorState = ({ message = 'Something went wrong while fetching data.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[var(--card)] border border-[var(--border)] rounded-2xl my-8">
      <div className="w-16 h-16 bg-red-500/10 text-[var(--danger)] rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-4xl">error</span>
      </div>
      <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">Oops!</h3>
      <p className="text-[var(--text-secondary)] mb-6">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
