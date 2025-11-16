"use client";

import React from "react";
import { Project } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface ProjectFormProps {
    project: Project;
    onProjectChange: (project: Project) => void;
    onSave?: () => void;
    onCancel?: () => void;
    submitLabel?: string;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
    project,
    onProjectChange,
    onSave,
    onCancel,
    submitLabel = "Add Project",
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

            <div className="flex gap-4">
                {onSave && <Button onClick={onSave}>{submitLabel}</Button>}
                {onCancel && <Button onClick={onCancel}>Cancel</Button>}
            </div>
        </>
    );
};
