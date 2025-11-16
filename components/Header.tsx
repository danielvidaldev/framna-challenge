"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";

const SECTIONS = ["about", "experience", "projects"] as const;

export const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>("about");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const sectionId of SECTIONS) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-black px-12 py-6 flex justify-between items-center shadow-md max-md:px-6 max-md:py-4">
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
                    className="text-text-dark no-underline font-medium text-sm px-6 py-2 bg-transparent rounded-lg border border-text-dark transition-all duration-300 opacity-70 hover:opacity-100 hover:text-black hover:border-black max-md:text-xs max-md:px-4"
                >
                    Admin
                </Link>
            </div>
        </header>
    );
};
