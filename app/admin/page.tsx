"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Project, SectionData } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { SectionForm } from "@/app/admin/_components/SectionForm";
import { ProjectForm } from "@/app/admin/_components/ProjectForm";
import { Button } from "@/components/ui/Button";

export default function AdminPage() {
    const {
        sections,
        isLoading,
        fetchAllData,
        updateSection,
        addProject,
        deleteProject,
    } = usePortfolioStore();

    const [saveIndicator, setSaveIndicator] = useState(false);

    const [newProject, setNewProject] = useState<Project>({
        title: "",
        description: "",
        image: "",
        project_url: "",
        section_id: "3",
    });

    const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [editingProjectSectionId, setEditingProjectSectionId] = useState<string | null>(null);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const showSaveIndicator = () => {
        setSaveIndicator(true);
        setTimeout(() => setSaveIndicator(false), 2000);
    };

    const handleSaveSection = async (section: SectionData) => {
        await updateSection(section.id, section);
        showSaveIndicator();
        await fetchAllData();
    };

    const handleAddProject = async () => {
        if (
            newProject.title &&
            newProject.description &&
            newProject.image &&
            newProject.project_url
        ) {
            await addProject(newProject);
            setNewProject({ title: "", description: "", image: "", project_url: "", section_id: "3" });
            showSaveIndicator();
            await fetchAllData();
        }
    };

    const handleDeleteProject = async (index: number, sectionId: string) => {
        await deleteProject(index, sectionId);
        showSaveIndicator();
        await fetchAllData();
    };

    const handleEditProject = (index: number, project: Project, sectionId: string) => {
        setEditingProjectIndex(index);
        setEditingProject({ ...project, section_id: project.section_id || sectionId });
        setEditingProjectSectionId(sectionId);
    };

    const handleUpdateProject = async () => {
        if (editingProjectIndex !== null && editingProject && editingProjectSectionId) {
            const originalSection = sections.find((s) => s.id === editingProjectSectionId);
            const newSectionId = editingProject.section_id || editingProjectSectionId;
            const isSectionChanged = newSectionId !== editingProjectSectionId;

            if (!originalSection) return;

            if (isSectionChanged) {
                const updatedOriginalProjects = (originalSection.projects || []).filter(
                    (_: Project, index: number) => index !== editingProjectIndex
                );
                await updateSection(originalSection.id, {
                    ...originalSection,
                    projects: updatedOriginalProjects,
                });

                const newSection = sections.find((s) => s.id === newSectionId);
                if (newSection) {
                    const updatedNewProjects = [...(newSection.projects || []), editingProject];
                    await updateSection(newSection.id, {
                        ...newSection,
                        projects: updatedNewProjects,
                    });
                }
            } else {
                const updatedProjects = [...(originalSection.projects || [])];
                updatedProjects[editingProjectIndex] = editingProject;
                await updateSection(originalSection.id, {
                    ...originalSection,
                    projects: updatedProjects,
                });
            }

            showSaveIndicator();
            setEditingProjectIndex(null);
            setEditingProject(null);
            setEditingProjectSectionId(null);
            await fetchAllData();
        }
    };

    const handleCancelEdit = () => {
        setEditingProjectIndex(null);
        setEditingProject(null);
        setEditingProjectSectionId(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center p-16 text-lg text-text-dark">
                        Loading admin panel...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-12 max-md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12 bg-white p-8 rounded-3xl border-2 border-black shadow-hover max-md:flex-col max-md:gap-4 max-md:p-6">
                    <h1 className="text-5xl font-bold text-black m-0 max-md:text-3xl">Admin Panel</h1>
                    <Link
                        href="/"
                        className="px-8 py-4 bg-accent border-2 border-black rounded-2xl no-underline text-black font-semibold transition-all duration-300 shadow-button hover:brightness-90 hover:-translate-x-px hover:-translate-y-px hover:shadow-button-hover max-md:px-6 max-md:py-3"
                    >
                        ← Back to Portfolio
                    </Link>
                </div>

                {/* Dynamically render all sections */}
                {sections.map((section) => (
                    <SectionForm
                        key={section.id}
                        title={`${section.title} Section`}
                        data={section}
                        onSave={handleSaveSection}
                    />
                ))}

                <section className="bg-white border-2 border-black rounded-3xl p-12 mb-8 shadow-hover max-md:p-6">
                    <h2 className="text-3xl font-bold text-black m-0 mb-8 pb-4 border-b-2 border-accent max-md:text-2xl">
                        Individual Projects
                    </h2>

                    <ProjectForm
                        project={newProject}
                        onProjectChange={setNewProject}
                        onSave={handleAddProject}
                        submitLabel="Add Project"
                        sections={sections}
                    />

                    {sections.map((section) => {
                        const sectionProjects = section.projects || [];
                        if (sectionProjects.length === 0) return null;

                        return (
                            <div key={section.id} className="mt-12">
                                <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
                                    <span className="px-3 py-1 bg-accent border-2 border-black rounded-lg text-sm">
                                        {section.title}
                                    </span>
                                    <span className="text-sm text-text-dark">
                                        ({sectionProjects.length} project{sectionProjects.length !== 1 ? 's' : ''})
                                    </span>
                                </h3>
                                <div className="grid gap-6">
                                    {sectionProjects.map((project, index) => (
                                        <div
                                            key={`${section.id}-${project.title}-${index}`}
                                            className="p-6 bg-gray-100 border-2 border-black rounded-2xl flex justify-between items-start gap-6 transition-all duration-300 hover:shadow-hover-active max-md:flex-col"
                                        >
                                            {editingProjectIndex === index && editingProject && editingProjectSectionId === section.id ? (
                                                <div className="flex-1 w-full">
                                                    <ProjectForm
                                                        project={editingProject}
                                                        onProjectChange={setEditingProject}
                                                        onSave={handleUpdateProject}
                                                        onCancel={handleCancelEdit}
                                                        submitLabel="Save Changes"
                                                        sections={sections}
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    {project.image && (
                                                        <div className="relative w-32 h-32 shrink-0 rounded-xl overflow-hidden border-2 border-black shadow-md">
                                                            <Image
                                                                src={project.image}
                                                                alt={project.title}
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <strong className="block mb-2 text-lg">
                                                            {project.title}
                                                        </strong>
                                                        <p className="mb-2 text-sm">{project.description}</p>
                                                        <small className="text-xs">
                                                            <a
                                                                href={project.project_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-text-dark break-all hover:text-black transition-colors"
                                                            >
                                                                {project.project_url}
                                                            </a>
                                                        </small>
                                                    </div>
                                                    <div className="flex gap-4 shrink-0 max-md:w-full">
                                                        <Button
                                                            onClick={() => handleEditProject(index, project, section.id)}
                                                            className="px-6 py-2 max-md:flex-1"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleDeleteProject(index, section.id)}
                                                            className="px-6 py-2 max-md:flex-1"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>

            <div
                className={`fixed bottom-8 right-8 px-6 py-4 bg-accent border-2 border-black rounded-2xl font-semibold shadow-button-hover pointer-events-none transition-all duration-300 ${
                    saveIndicator ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
            >
                ✓ Saved!
            </div>
        </div>
    );
}
