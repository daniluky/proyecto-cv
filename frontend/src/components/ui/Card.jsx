import React from 'react';

const Card = ({ children, className }) => {
    return (
        <div className={`bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-700 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
