import React from 'react';

const Skeleton = ({ className = '', variant = 'text', width, height }) => {
  const style = {
    width: width || (variant === 'circular' ? '2.5rem' : '100%'),
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '2.5rem' : 'auto'),
    borderRadius: variant === 'circular' ? '50%' : '0.5rem',
  };

  return <div className={`animate-pulse bg-[var(--border)] ${className}`} style={style} />;
};

export default Skeleton;
