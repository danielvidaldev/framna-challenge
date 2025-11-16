"use client";

import React from "react";
import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { EmptyProjectsState } from "./EmptyProjectsState";

interface ProjectGridProps {
    projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return <EmptyProjectsState />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 w-full">
            {projects.map((project, index) => (
                <ProjectCard key={`${project.title}-${index}`} project={project} />
            ))}
        </div>
    );
};
