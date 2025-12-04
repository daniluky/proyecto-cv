import React from 'react';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = "px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/20",
        secondary: "bg-slate-600 hover:bg-slate-500 text-white",
        outline: "border-2 border-slate-600 hover:bg-slate-700 text-slate-300",
        danger: "bg-red-500 hover:bg-red-600 text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
