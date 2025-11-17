"use client";

import React, { forwardRef } from "react";
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
    return (
        <section
            ref={ref}
            id={id}
            className="w-full bg-white/90 backdrop-blur-sm rounded-card-lg shadow-card overflow-hidden border-2 border-accent/30 mb-8"
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
                {children && <div className="mt-8">{children}</div>}
            </div>
        </section>
    );
});

SectionCard.displayName = "SectionCard";