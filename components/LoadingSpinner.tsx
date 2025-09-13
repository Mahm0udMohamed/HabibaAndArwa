import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse py-2">
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
    </div>
  );
};

export default LoadingSpinner;