import { SectionData } from "@/types";

const API_BASE_URL = "https://69160509465a9144626e9c0e.mockapi.io";
const RESOURCE_NAME = "framna-challenge";

export class ApiService {
    private static async fetchData<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    private static async putData<T>(
        endpoint: string,
        id: string,
        data: unknown
    ): Promise<T> {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    static async getAllSections() {
        return this.fetchData<SectionData[]>(RESOURCE_NAME);
    }

    static async updateSection(id: string, data: unknown) {
        return this.putData(RESOURCE_NAME, id, data);
    }

    static async getSectionByTitle(title: string) {
        const sections = await this.getAllSections();
        return sections.find(
            (section) => section.title.toLowerCase() === title.toLowerCase()
        );
    }

    static async testConnection(): Promise<{ success: boolean; message: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/${RESOURCE_NAME}`);
            if (response.ok) {
                const data = await response.json();
                return {
                    success: true,
                    message: `API connection successful! Found ${data.length} sections.`,
                };
            }
            return {
                success: false,
                message: `API connection failed: ${response.statusText}`,
            };
        } catch (error) {
            return {
                success: false,
                message: `API connection failed: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`,
            };
        }
    }
}
