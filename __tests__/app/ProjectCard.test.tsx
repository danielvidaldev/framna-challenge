import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/app/_components/ProjectCard';
import { Project } from '@/types';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    title: 'Test Project',
    description: 'A test project description',
    image: 'https://example.com/image.jpg',
    project_url: 'https://example.com/project',
  };

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders project image with correct src', () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText('Test Project');
    expect(image).toHaveAttribute('src', mockProject.image);
  });

  it('has a link to the project URL', () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProject.project_url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies hover animation classes', () => {
    render(<ProjectCard project={mockProject} />);

    const card = screen.getByRole('link');
    expect(card).toHaveClass('transition-all');
  });
});
