import React from "react";

interface NavButtonProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({ active, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`text-black font-semibold text-base cursor-pointer transition-all duration-300 px-6 py-4 rounded-2xl border-2 hover:bg-accent hover:border-black hover:-translate-y-0.5 active:translate-y-0 max-md:text-sm max-md:px-4 max-md:py-2 ${
                active ? "border-black bg-accent" : "border-transparent"
            }`}
        >
            {children}
        </button>
    );
};
