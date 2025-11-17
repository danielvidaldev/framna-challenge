"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SectionCardProps {
    id: string;
    title: string;
    description: string;
    picture: string;
    children?: React.ReactNode;
    priority?: boolean;
}

export const SectionCard = forwardRef<HTMLElement, SectionCardProps>(({
    id,
    title,
    description,
    picture,
    children,
    priority = false,
}, ref) => {
    const [scrollProgress, setScrollProgress] = useState(priority ? 1 : 0);
    const [isMobile, setIsMobile] = useState(false);
    const internalRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            const currentRef = internalRef.current;
            if (!currentRef) return;

            const rect = currentRef.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const progress = 1 - (elementCenter / windowHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));
            setScrollProgress(clampedProgress);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [isMobile]);

    // No animations on mobile or the first section
    const opacity = isMobile ? 1 : (priority ? 1 : Math.min(1, 0.3 + scrollProgress * 1.4));
    const translateX = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 30);
    const titleTranslateY = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 20);
    const descTranslateX = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 30);
    const imageScale = isMobile ? 1 : (priority ? 1 : 0.95 + scrollProgress * 0.05);
    const imageRotate = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 2);

    // Different layouts based on whether there are children (projects)
    const hasProjects = !!children;

    return (
        <section
            ref={(node) => {
                internalRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            }}
            id={id}
            className="w-full max-w-full bg-linear-to-br from-white via-white to-gray-50/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-gray-200/50 mb-24 will-change-transform"
            style={{
                opacity,
                transform: `translateX(${translateX}px)`,
            }}
        >
            {hasProjects ? (
                // Layout WITH projects: Title + description side by side with image, then projects below
                <div className="p-12 max-md:p-6">
                    <div className="grid grid-cols-2 gap-12 mb-8 max-lg:grid-cols-1 max-lg:gap-6">
                        <div className="flex flex-col justify-start">
                            <div
                                className="mb-6"
                                style={{
                                    transform: `translateY(${titleTranslateY}px)`,
                                }}
                            >
                                <h2 className="m-0 mb-4 text-4xl font-bold text-gray-900 max-md:text-3xl relative inline-block pb-3">
                                    {title}
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-accent via-accent-dark to-accent rounded-full"></span>
                                </h2>
                            </div>
                            <div
                                style={{
                                    transform: `translateX(${descTranslateX}px)`,
                                    opacity: isMobile ? 1 : (priority ? 1 : Math.min(1, 0.4 + scrollProgress * 1.2)),
                                }}
                            >
                                <p className="text-lg leading-relaxed text-gray-700 m-0 max-md:text-base">
                                    {description}
                                </p>
                            </div>
                        </div>

                        <div
                            className="w-full h-80 rounded-2xl overflow-hidden shadow-2xl max-lg:h-64 max-md:h-52 relative group"
                            style={{
                                transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
                                opacity: isMobile ? 1 : (priority ? 1 : Math.min(1, 0.4 + scrollProgress * 1.2)),
                            }}
                        >
                            <div className="absolute inset-0 bg-linear-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <Image
                                src={picture}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                                priority={priority}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            opacity: isMobile ? 1 : (priority ? 1 : Math.min(1, 0.3 + scrollProgress * 1.4)),
                            transform: `translateY(${isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 30)}px)`,
                        }}
                    >
                        {children}
                    </div>
                </div>
            ) : (
                // Layout WITHOUT projects: 50/50 split with title+description on left, image on right
                <div className="grid grid-cols-2 max-lg:grid-cols-1">
                    <div
                        className="p-12 max-md:p-6 flex flex-col justify-start"
                        style={{
                            transform: `translateX(${descTranslateX}px)`,
                            opacity: isMobile ? 1 : (priority ? 1 : Math.min(1, 0.4 + scrollProgress * 1.2)),
                        }}
                    >
                        <div
                            className="mb-6"
                            style={{
                                transform: `translateY(${titleTranslateY}px)`,
                            }}
                        >
                            <h2 className="m-0 mb-4 text-4xl font-bold text-gray-900 max-md:text-3xl relative inline-block pb-3">
                                {title}
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-accent via-accent-dark to-accent rounded-full"></span>
                            </h2>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-700 m-0 max-md:text-base">
                            {description}
                        </p>
                    </div>

                    <div
                        className="relative h-full min-h-[500px] max-lg:min-h-[400px] max-md:min-h-[300px]"
                        style={{
                            transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
                            opacity: isMobile ? 1 : (priority ? 1 : Math.min(1, 0.4 + scrollProgress * 1.2)),
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-tr from-accent/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        <Image
                            src={picture}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-110"
                            unoptimized
                            priority={priority}
                        />
                    </div>
                </div>
            )}
        </section>
    );
});

SectionCard.displayName = "SectionCard";