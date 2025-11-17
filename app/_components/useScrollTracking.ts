"use client";

import { useEffect, useState } from "react";

const HEADER_HEIGHT = 60;

export const useScrollTracking = (sections: readonly string[]) => {
    const [activeSection, setActiveSection] = useState<string>(sections[0] || "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = new Map<string, number>();

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSections.set(entry.target.id, entry.intersectionRatio);
                    }
                });

                let maxRatio = 0;
                let mostVisible = "";

                visibleSections.forEach((ratio, id) => {
                    if (ratio > maxRatio) {
                        maxRatio = ratio;
                        mostVisible = id;
                    }
                });

                if (mostVisible && maxRatio > 0.2) {
                    setActiveSection(mostVisible);
                }
            },
            {
                rootMargin: `-${HEADER_HEIGHT}px 0px -30% 0px`,
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            }
        );

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight) {
                const lastSection = sections[sections.length - 1];
                if (lastSection && activeSection !== lastSection) {
                    setActiveSection(lastSection);
                }
            }
        };

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sections, activeSection]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ block: "start" });
        }
    };

    return { activeSection, scrollToSection };
};
