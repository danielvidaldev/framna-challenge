import { ApiService } from '@/lib/api';

// Mock the global fetch function
global.fetch = jest.fn();

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSections', () => {
    it('fetches all sections successfully', async () => {
      const mockSections = [
        { id: '1', title: 'About', description: 'About me', image: 'image.jpg', projects: [] },
        { id: '2', title: 'Projects', description: 'My work', image: 'work.jpg', projects: [] },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSections,
      });

      const result = await ApiService.getAllSections();

      expect(result).toEqual(mockSections);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('framna-challenge'),
        expect.objectContaining({ cache: 'no-store' })
      );
    });

    it('throws error on failed fetch', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(ApiService.getAllSections()).rejects.toThrow('API Error: Not Found');
    });
  });

  describe('updateSection', () => {
    it('updates a section successfully', async () => {
      const mockSection = { id: '1', title: 'Updated', description: 'New desc', image: 'img.jpg' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSection,
      });

      const result = await ApiService.updateSection('1', mockSection);

      expect(result).toEqual(mockSection);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/1'),
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockSection),
        })
      );
    });
  });

  describe('testConnection', () => {
    it('returns success when API is reachable', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: '1' }, { id: '2' }],
      });

      const result = await ApiService.testConnection();

      expect(result.success).toBe(true);
      expect(result.message).toContain('2 sections');
    });

    it('returns failure when API is unreachable', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await ApiService.testConnection();

      expect(result.success).toBe(false);
      expect(result.message).toContain('Network error');
    });
  });
});
