import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    className = "",
    children,
    ...props
}) => {
    const baseClasses =
        "px-6 py-2.5 border-2 border-black rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 shadow-button hover:brightness-90 hover:enabled:-translate-x-px hover:enabled:-translate-y-px hover:enabled:shadow-button-hover active:enabled:translate-x-0 active:enabled:translate-y-0 active:enabled:shadow-button-active disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-accent",
        secondary: "bg-gray-200",
        danger: "bg-error",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
