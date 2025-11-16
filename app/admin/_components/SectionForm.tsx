"use client";

import React, { useState, useEffect } from "react";
import { SectionData } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface SectionFormProps {
    title: string;
    data: SectionData;
    onDataChange: (data: SectionData) => void;
    onSave: (data: SectionData) => void;
}

export const SectionForm: React.FC<SectionFormProps> = ({
    title,
    data,
    onDataChange,
    onSave,
}) => {
    const [localData, setLocalData] = useState(data);

    // Sync local state when external data changes
    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleChange = (updates: Partial<SectionData>) => {
        const updated = { ...localData, ...updates };
        setLocalData(updated);
    };

    const handleSave = () => {
        onSave(localData);
    };

    return (
        <section className="bg-white border-2 border-black rounded-3xl p-12 mb-8 shadow-hover max-md:p-6">
            <h2 className="text-3xl font-bold text-black m-0 mb-8 pb-4 border-b-2 border-accent max-md:text-2xl">
                {title}
            </h2>

            <div className="flex flex-col gap-6">
                <Input
                    label="Title"
                    type="text"
                    value={localData.title}
                    onChange={(e) => handleChange({ title: e.target.value })}
                />

                <Textarea
                    label="Description"
                    value={localData.description}
                    onChange={(e) => handleChange({ description: e.target.value })}
                />

                <Input
                    label="Image URL"
                    type="text"
                    value={localData.image}
                    onChange={(e) => handleChange({ image: e.target.value })}
                />

                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </section>
    );
};
