"use client";

import React, { useEffect, useRef, useState, forwardRef } from "react";
import Image from "next/image";

interface SectionCardProps {
    id: string;
    title: string;
    description: string;
    picture: string;
    index: number;
    children?: React.ReactNode;
}

export const SectionCard = forwardRef<HTMLElement, SectionCardProps>(({
    id,
    title,
    description,
    picture,
    index,
    children,
}, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const cardRef = (ref as React.RefObject<HTMLElement>) || internalRef;
    const [stickyTop, setStickyTop] = useState(80);

    // Calculate sticky position
    useEffect(() => {
        const calculateSticky = () => {
            const headerOffset = 80;
            if (index === 0) {
                setStickyTop(headerOffset);
                return;
            }

            const allCards = Array.from(document.querySelectorAll("section[id]"));
            let totalOffset = headerOffset;

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

    // Scroll scaling logic
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

    const zIndex = 10 + index;

    return (
        <section
            ref={cardRef}
            id={id}
            className="w-full bg-white/90 backdrop-blur-sm rounded-card-lg shadow-card overflow-hidden sticky transition-all duration-300 ease-out border-2 border-accent/30"
            style={{
                top: `${stickyTop}px`,
                zIndex,
            }}
        >
            <div className="bg-linear-to-r from-accent to-accent-dark px-8 py-6 max-md:px-6 max-md:py-4">
                <h2 className="m-0 text-3xl font-bold text-text-dark text-center max-md:text-2xl">
                    {title}
                </h2>
            </div>
            <div className="p-12 max-md:p-6">
                <div className="grid grid-cols-2 gap-12 mb-8 max-lg:grid-cols-1 max-lg:gap-6">
                    <div className="flex flex-col justify-center">
                        <p className="text-lg leading-relaxed text-text-dark m-0 max-md:text-base">
                            {description}
                        </p>
                    </div>
                    <div className="w-full h-80 rounded-3xl overflow-hidden shadow-lg max-lg:h-64 max-md:h-52 relative border-2 border-accent/50">
                        <Image src={picture} alt={title} fill className="object-cover" unoptimized />
                    </div>
                </div>
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    );
});

SectionCard.displayName = "SectionCard";