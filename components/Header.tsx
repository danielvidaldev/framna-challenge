"use client";

import React from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";
import { useScrollTracking } from "@/app/_components/useScrollTracking";

const SECTIONS = ["about", "experience", "projects"] as const;

export const Header: React.FC = () => {
    const { activeSection, scrollToSection } = useScrollTracking(SECTIONS);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-black px-12 py-3 flex justify-between items-center shadow-md max-md:px-6 max-md:py-2">
            <div className="text-2xl font-bold text-black tracking-tight">
                Portfolio
            </div>
            <div className="flex items-center gap-12 max-md:gap-6">
                <nav className="flex gap-6 max-md:gap-4">
                    {SECTIONS.map((section) => (
                        <NavButton
                            key={section}
                            active={activeSection === section}
                            onClick={() => scrollToSection(section)}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </NavButton>
                    ))}
                </nav>
                <Link
                    href="/admin"
                    className="text-text-dark no-underline font-medium text-sm px-4 py-1.5 bg-transparent rounded-lg border border-text-dark transition-all duration-300 opacity-70 hover:opacity-100 hover:text-black hover:border-black max-md:text-xs max-md:px-3"
                >
                    Admin
                </Link>
            </div>
        </header>
    );
};
