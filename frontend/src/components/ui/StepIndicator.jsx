import React from 'react';

const StepIndicator = ({ currentStep, steps }) => {
    return (
        <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -z-10 rounded-full"></div>
            <div
                className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, index) => {
                const isActive = index + 1 === currentStep;
                const isCompleted = index + 1 < currentStep;

                return (
                    <div key={index} className="flex flex-col items-center gap-2 bg-slate-900 px-4 z-10">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 shadow-lg
                ${isActive ? 'border-green-500 bg-slate-800 text-green-500 scale-110 shadow-green-500/20' :
                                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                                        'border-slate-700 bg-slate-800 text-slate-500'}`}
                        >
                            {isCompleted ? '✓' : index + 1}
                        </div>
                        <span className={`text-xs font-medium ${isActive || isCompleted ? 'text-white' : 'text-slate-500'}`}>
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;
