import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <div className="w-2.5 h-2.5 bg-slate-300 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2.5 h-2.5 bg-slate-300 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2.5 h-2.5 bg-slate-300 rounded-full animate-pulse"></div>
    </div>
  );
};

export default LoadingSpinner;