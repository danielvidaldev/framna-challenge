import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-text-dark font-semibold text-sm">
                    {label}
                </label>
            )}
            <input
                className={`px-4 py-3 border-2 border-gray-200 rounded-lg text-base font-normal transition-all duration-300 focus:border-accent focus:outline-none ${className}`}
                {...props}
            />
        </div>
    );
};
