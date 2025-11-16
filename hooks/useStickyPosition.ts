"use client";

import { useEffect, useState } from "react";

const HEADER_OFFSET = 60;

export const useStickyPosition = (index: number) => {
    const [stickyTop, setStickyTop] = useState(HEADER_OFFSET);

    useEffect(() => {
        const calculateSticky = () => {
            if (index === 0) {
                setStickyTop(HEADER_OFFSET);
                return;
            }

            const allCards = Array.from(document.querySelectorAll("section[id]"));
            let totalOffset = HEADER_OFFSET;

            allCards.slice(0, index).forEach((prevCard) => {
                const title = prevCard.querySelector(".bg-accent");
                if (title) {
                    totalOffset += title.getBoundingClientRect().height;
                }
            });

            setStickyTop(totalOffset);
        };

        calculateSticky();
        window.addEventListener("resize", calculateSticky);
        const timer = setTimeout(calculateSticky, 100);

        return () => {
            window.removeEventListener("resize", calculateSticky);
            clearTimeout(timer);
        };
    }, [index]);

    const zIndex = 10 + index;

    return { stickyTop, zIndex };
};
