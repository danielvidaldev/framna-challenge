"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Header } from "@/components/Header";
import { SectionCard } from "@/app/_components/SectionCard";
import { ProjectGrid } from "@/app/_components/ProjectGrid";
import { SectionData } from "@/types";

export default function Home() {
    const { about, experience, projects, isLoading, error, fetchAllData } =
        usePortfolioStore();

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Array of refs for all SectionCards
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center min-h-screen text-2xl text-text-dark bg-linear-to-br from-white to-gray-50">
                    Loading portfolio...
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
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

    const sections = [
        about && { data: about, id: "about" },
        experience && { data: experience, id: "experience" },
        projects && { data: projects, id: "projects" },
    ].filter(Boolean) as { data: any; id: string }[];

    return (
        <>
            <Header />
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
                                title={section.data.title}
                                description={section.data.description}
                                picture={section.data.image}
                                index={i}
                                priority={i === 0}
                                ref={(el: HTMLElement | null) => {
                                    if (el) sectionRefs.current[i] = el;
                                }}
                            >
                                {section.id === "projects" && (
                                    <ProjectGrid projects={section.data.projects || []} />
                                )}
                            </SectionCard>
                        );
                    })}
                </div>
            </div>
        </>
    );
}