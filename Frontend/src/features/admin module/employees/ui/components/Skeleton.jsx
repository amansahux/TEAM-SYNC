import React from 'react';

const Skeleton = ({ className = '', variant = 'text', width, height }) => {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div 
      className={`skeleton-base skeleton-${variant} ${className}`} 
      style={Object.keys(style).length > 0 ? style : undefined} 
    />
  );
};

export default Skeleton;
