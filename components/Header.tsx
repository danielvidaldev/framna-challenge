"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";
import { useScrollTracking } from "@/app/_components/useScrollTracking";

interface Section {
    id: string;
    title: string;
}

interface HeaderProps {
    sections: Section[];
}

export const Header: React.FC<HeaderProps> = ({ sections }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sectionIds = useMemo(() => sections.map(s => s.id), [sections]);
    const { activeSection, scrollToSection } = useScrollTracking(sectionIds);

    const handleNavClick = (id: string) => {
        scrollToSection(id);
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-black px-12 py-3 flex justify-between items-center shadow-md max-md:px-6 max-md:py-2">
            <div className="text-2xl font-bold text-black tracking-tight">
                Portfolio
            </div>

            <div className="hidden md:flex items-center gap-12">
                <nav className="flex gap-6">
                    {sections.map((section) => (
                        <NavButton
                            key={section.id}
                            active={activeSection === section.id}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.title}
                        </NavButton>
                    ))}
                </nav>
                <Link
                    href="/admin"
                    className="text-text-dark no-underline font-medium text-sm px-4 py-1.5 bg-transparent rounded-lg border border-text-dark transition-all duration-300 opacity-70 hover:opacity-100 hover:text-black hover:border-black"
                >
                    Admin
                </Link>
            </div>

            <button
                className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-white">
                    <nav className="flex flex-col h-full">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleNavClick(section.id)}
                                className={`w-full text-left px-6 py-4 text-lg font-medium border-b border-gray-200 transition-colors ${
                                    activeSection === section.id
                                        ? 'bg-accent text-black'
                                        : 'bg-white text-text-dark hover:bg-gray-50'
                                }`}
                            >
                                {section.title}
                            </button>
                        ))}
                        <Link
                            href="/admin"
                            className="w-full text-left px-6 py-4 text-lg font-medium border-b border-gray-200 bg-white text-text-dark hover:bg-gray-50 no-underline"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};
