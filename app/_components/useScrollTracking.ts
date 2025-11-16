"use client";

import { useEffect, useState } from "react";

const HEADER_HEIGHT = 60;

export const useScrollTracking = (sections: readonly string[]) => {
    const [activeSection, setActiveSection] = useState<string>(sections[0] || "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: `-${HEADER_HEIGHT}px 0px -40% 0px`,
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return { activeSection, scrollToSection };
};
