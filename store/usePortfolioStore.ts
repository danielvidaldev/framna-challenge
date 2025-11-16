"use client";

import { create } from "zustand";
import { SectionData, Project } from "@/types";
import { ApiService } from "@/lib/api";

interface PortfolioStore {
  about: SectionData | null;
  experience: SectionData | null;
  projects: SectionData | null;
  isLoading: boolean;
  error: string | null;

  fetchAllData: () => Promise<void>;
  updateSection: (id: string, data: Partial<SectionData>) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  deleteProject: (projectIndex: number) => Promise<void>;
  testConnection: () => Promise<{ success: boolean; message: string }>;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  about: null,
  experience: null,
  projects: null,
  isLoading: false,
  error: null,

  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      const sections = await ApiService.getAllSections();

      const about = sections.find((s) => s.id === "1");
      const experience = sections.find((s) => s.id === "2");
      const projects = sections.find((s) => s.id === "3");

      set({
        about: about || null,
        experience: experience || null,
        projects: projects || null,
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

      if (id === "1") {
        set({ about: updated });
      } else if (id === "2") {
        set({ experience: updated });
      } else if (id === "3") {
        set({ projects: updated });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update section",
      });
    }
  },

  addProject: async (project: Project) => {
    try {
      const currentProjects = get().projects;
      if (currentProjects) {
        const updatedProjects = {
          ...currentProjects,
          projects: [...(currentProjects.projects || []), project],
        };
        await ApiService.updateSection(currentProjects.id, updatedProjects);
        set({ projects: updatedProjects });
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
      const currentProjects = get().projects;
      if (currentProjects && currentProjects.projects) {
        const updatedProjectsList = currentProjects.projects.filter(
          (_, index) => index !== projectIndex
        );
        const updatedProjects = {
          ...currentProjects,
          projects: updatedProjectsList,
        };
        await ApiService.updateSection(currentProjects.id, updatedProjects);
        set({ projects: updatedProjects });
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
