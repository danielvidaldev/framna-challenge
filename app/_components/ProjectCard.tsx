"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white border-2 border-black rounded-3xl overflow-hidden transition-all duration-300 no-underline text-inherit shadow-hover relative hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hover-lg active:-translate-x-0.5 active:-translate-y-0.5 active:shadow-hover-active"
        >
            <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-300 z-0 group-hover:opacity-5" />

            <div className="relative w-full h-60 border-b-2 border-black overflow-hidden z-1">
                <div className="absolute inset-0 bg-linear-to-br from-accent/30 to-accent/10 z-1" />

                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                />
            </div>

            <div className="p-8 relative z-1 bg-white">
                <h3 className="text-2xl font-bold text-black m-0 mb-4 leading-tight">
                    {project.title}
                </h3>
                <p className="text-base text-text-dark leading-relaxed m-0">
                    {project.description}
                </p>
            </div>
        </a>
    );
};
