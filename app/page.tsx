import { ApiService } from "@/lib/api";
import { Header } from "@/components/Header";
import { SectionCard } from "@/app/_components/SectionCard";
import { ProjectGrid } from "@/app/_components/ProjectGrid";
import { SectionData } from "@/types";

// This page uses Static Site Generation (SSG)
// Data is fetched at build time for optimal performance
export default async function Home() {
    let sections: SectionData[] = [];
    let error: string | null = null;

    try {
        // Fetch data at build time (SSG)
        sections = await ApiService.getAllSections();
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load portfolio data";
    }

    const headerSections = sections.map((s) => ({ id: s.id, title: s.title }));

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
                            >
                                {section.projects && section.projects.length > 0 && (
                                    <ProjectGrid projects={section.projects} />
                                )}
                            </SectionCard>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
