import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = "", id, ...props }) => {
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={textareaId} className="text-text-dark font-semibold text-sm">
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={`px-4 py-3 border-2 border-gray-200 rounded-lg text-base font-normal transition-all duration-300 focus:border-accent focus:outline-none min-h-32 resize-vertical ${className}`}
                {...props}
            />
        </div>
    );
};
