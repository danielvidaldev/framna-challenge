"use client";

import React from "react";

export const EmptyProjectsState: React.FC = () => {
    return (
        <div className="grid w-full">
            <div className="col-span-full text-center p-16 bg-accent-light/50 border-2 border-dashed border-accent rounded-3xl text-text-dark text-lg font-semibold">
                No projects yet. Add some from the admin panel!
            </div>
        </div>
    );
};
