import React from 'react';

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      <input
        className={`bg-slate-700 border ${error ? 'border-red-500' : 'border-slate-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};

export default Input;
