"use client";

import { useEffect, useRef, useMemo } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Header } from "@/components/Header";
import { SectionCard } from "@/app/_components/SectionCard";
import { ProjectGrid } from "@/app/_components/ProjectGrid";

export default function Home() {
    const { sections, isLoading, error, fetchAllData } = usePortfolioStore();

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    const headerSections = useMemo(
        () => sections.map((s) => ({ id: s.id, title: s.title })),
        [sections]
    );

    if (isLoading) {
        return (
            <>
                <Header sections={[]} />
                <div className="flex items-center justify-center min-h-screen text-2xl text-text-dark bg-linear-to-br from-white to-gray-50">
                    Loading portfolio...
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header sections={[]} />
                <div className="flex items-center justify-center min-h-screen text-2xl text-error text-center px-12 bg-linear-to-br from-white to-gray-50">
                    <div>
                        <h2 className="mb-6">Error loading portfolio</h2>
                        <p>{error}</p>
                        <p className="mt-4 text-base">
                            Make sure the API is properly configured and try again.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header sections={headerSections} />
            <div className="bg-linear-to-br from-white via-gray-50 to-white min-h-screen pt-20">
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(193,255,114,0.1)_0%,transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(193,255,114,0.08)_0%,transparent_40%)]" />
                </div>

                <div className="relative z-1 max-w-7xl mx-auto px-6 py-12">
                    {sections.map((section, i) => {
                        return (
                            <SectionCard
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                description={section.description}
                                picture={section.image}
                                priority={i === 0}
                                ref={(el: HTMLElement | null) => {
                                    if (el) sectionRefs.current[i] = el;
                                }}
                            >
                                {section.id === "3" && (
                                    <ProjectGrid projects={section.projects || []} />
                                )}
                            </SectionCard>
                        );
                    })}
                </div>
            </div>
        </>
    );
}