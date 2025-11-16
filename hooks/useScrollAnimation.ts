"use client";

import { useEffect, RefObject } from "react";

export const useScrollAnimation = (
    cardRef: RefObject<HTMLElement>,
    index: number,
    stickyTop: number
) => {
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleScroll = () => {
            const cardRect = card.getBoundingClientRect();

            // Find the next section element
            const allSections = Array.from(document.querySelectorAll("section[id]"));
            const currentIndex = allSections.indexOf(card);
            const nextSection = allSections[currentIndex + 1] as HTMLElement | undefined;
            const nextRect = nextSection?.getBoundingClientRect();

            const stuck = cardRect.top <= stickyTop;
            const reachedNext = nextRect ? cardRect.bottom >= nextRect.top - 10 : false;

            if (!stuck && !reachedNext && index !== 0) {
                const viewportHeight = window.innerHeight;
                const scrollProgress = Math.max(
                    0,
                    Math.min(1, (viewportHeight - cardRect.top) / viewportHeight)
                );
                const scale = 0.95 + scrollProgress * 0.05;
                card.style.transform = `scale(${scale})`;
            } else {
                card.style.transform = "scale(1)";
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [index, stickyTop, cardRef]);
};
