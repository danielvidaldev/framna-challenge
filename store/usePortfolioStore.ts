"use client";

import { create } from "zustand";
import { SectionData, Project } from "@/types";
import { ApiService } from "@/lib/api";

interface PortfolioStore {
  sections: SectionData[];
  isLoading: boolean;
  error: string | null;

  fetchAllData: () => Promise<void>;
  updateSection: (id: string, data: Partial<SectionData>) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (projectIndex: number) => Promise<void>;
  testConnection: () => Promise<{ success: boolean; message: string }>;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  sections: [],
  isLoading: false,
  error: null,

  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      const sections = await ApiService.getAllSections();

      set({
        sections: sections || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch portfolio data",
        isLoading: false,
      });
    }
  },

  updateSection: async (id: string, data: Partial<SectionData>) => {
    try {
      const updated = (await ApiService.updateSection(id, data)) as SectionData;
      const currentSections = get().sections;
      const updatedSections = currentSections.map((section) =>
        section.id === id ? updated : section
      );
      set({ sections: updatedSections });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update section",
      });
    }
  },

  addProject: async (project: Project) => {
    try {
      const currentSections = get().sections;
      const projectsSection = currentSections.find((s) => s.id === "3");

      if (projectsSection) {
        const updatedProjects = {
          ...projectsSection,
          projects: [...(projectsSection.projects || []), project],
        };
        await ApiService.updateSection(projectsSection.id, updatedProjects);

        const updatedSections = currentSections.map((section) =>
          section.id === "3" ? updatedProjects : section
        );
        set({ sections: updatedSections });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to add project",
      });
    }
  },

  deleteProject: async (projectIndex: number) => {
    try {
      const currentSections = get().sections;
      const projectsSection = currentSections.find((s) => s.id === "3");

      if (projectsSection && projectsSection.projects) {
        const updatedProjectsList = projectsSection.projects.filter(
          (_: Project, index: number) => index !== projectIndex
        );
        const updatedProjects = {
          ...projectsSection,
          projects: updatedProjectsList,
        };
        await ApiService.updateSection(projectsSection.id, updatedProjects);

        const updatedSections = currentSections.map((section) =>
          section.id === "3" ? updatedProjects : section
        );
        set({ sections: updatedSections });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete project",
      });
    }
  },

  testConnection: async () => {
    return await ApiService.testConnection();
  },
}));
