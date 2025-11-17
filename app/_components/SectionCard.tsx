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

    // No animations on mobile
    const opacity = isMobile ? 1 : (priority ? 1 : Math.min(1, scrollProgress * 2));
    const translateX = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 50 - 50);
    const scale = isMobile ? 1 : (priority ? 1 : 0.9 + scrollProgress * 0.1);
    const titleTranslateY = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 20);
    const descTranslateX = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 30);
    const imageScale = isMobile ? 1 : (priority ? 1 : 0.95 + scrollProgress * 0.05);
    const imageRotate = isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 2);

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
            className="w-full bg-white/90 backdrop-blur-sm rounded-card-lg shadow-card overflow-hidden border-2 border-accent/30 mb-8 will-change-transform"
            style={{
                opacity,
                transform: `translateX(${translateX}px) scale(${scale})`,
            }}
        >
            <div
                className="bg-linear-to-r from-accent to-accent-dark px-8 py-6 max-md:px-6 max-md:py-4"
                style={{
                    transform: `translateY(${titleTranslateY}px)`,
                }}
            >
                <h2 className="m-0 text-3xl font-bold text-text-dark text-center max-md:text-2xl">
                    {title}
                </h2>
            </div>
            <div className="p-12 max-md:p-6">
                <div className="grid grid-cols-2 gap-12 mb-8 max-lg:grid-cols-1 max-lg:gap-6">
                    <div
                        className="flex flex-col justify-center"
                        style={{
                            transform: `translateX(${descTranslateX}px)`,
                            opacity: isMobile ? 1 : (priority ? 1 : Math.min(1, scrollProgress * 1.5)),
                        }}
                    >
                        <p className="text-lg leading-relaxed text-text-dark m-0 max-md:text-base">
                            {description}
                        </p>
                    </div>
                    <div
                        className="w-full h-80 rounded-3xl overflow-hidden shadow-lg max-lg:h-64 max-md:h-52 relative border-2 border-accent/50"
                        style={{
                            transform: `scale(${imageScale}) rotate(${imageRotate}deg)`,
                            opacity: isMobile ? 1 : (priority ? 1 : Math.min(1, scrollProgress * 1.3)),
                        }}
                    >
                        <Image
                            src={picture}
                            alt={title}
                            fill
                            className="object-cover"
                            unoptimized
                            priority={priority}
                        />
                    </div>
                </div>
                {children && (
                    <div
                        className="mt-8"
                        style={{
                            opacity: isMobile ? 1 : (priority ? 1 : Math.max(0, scrollProgress * 2 - 0.5)),
                            transform: `translateY(${isMobile ? 0 : (priority ? 0 : (1 - scrollProgress) * 30)}px)`,
                        }}
                    >
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
});

SectionCard.displayName = "SectionCard";