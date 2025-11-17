"use client";

import React from "react";
import { Project, SectionData } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface ProjectFormProps {
    project: Project;
    onProjectChange: (project: Project) => void;
    onSave?: () => void;
    onCancel?: () => void;
    submitLabel?: string;
    sections?: SectionData[];
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
    project,
    onProjectChange,
    onSave,
    onCancel,
    submitLabel = "Add Project",
    sections = [],
}) => {
    return (
        <>
            <Input
                label={submitLabel === "Add Project" ? "New Project Title" : "Title"}
                type="text"
                value={project.title}
                onChange={(e) => onProjectChange({ ...project, title: e.target.value })}
            />

            <Textarea
                label="Description"
                value={project.description}
                onChange={(e) => onProjectChange({ ...project, description: e.target.value })}
            />

            <Input
                label="Image URL"
                type="text"
                value={project.image}
                onChange={(e) => onProjectChange({ ...project, image: e.target.value })}
            />

            <Input
                label="Project Link"
                type="text"
                value={project.project_url}
                onChange={(e) => onProjectChange({ ...project, project_url: e.target.value })}
            />

            {sections.length > 0 && (
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-black">
                        Attach to Section
                    </label>
                    <select
                        className="w-full px-4 py-3 border-2 border-black rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        value={project.section_id || "3"}
                        onChange={(e) => onProjectChange({ ...project, section_id: e.target.value })}
                    >
                        {sections.map((section) => (
                            <option key={section.id} value={section.id}>
                                {section.title} (ID: {section.id})
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex mt-4 space-x-4 justify-end">
                {onSave && <Button onClick={onSave}>{submitLabel}</Button>}
                {onCancel && <Button onClick={onCancel}>Cancel</Button>}
            </div>
        </>
    );
};
