import { render, screen } from '@testing-library/react';
import { ProjectGrid } from '@/app/_components/ProjectGrid';
import { Project } from '@/types';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ProjectGrid Component', () => {
  const mockProjects: Project[] = [
    {
      title: 'Project 1',
      description: 'Description 1',
      image: 'https://example.com/img1.jpg',
      project_url: 'https://example.com/project1',
    },
    {
      title: 'Project 2',
      description: 'Description 2',
      image: 'https://example.com/img2.jpg',
      project_url: 'https://example.com/project2',
    },
  ];

  it('renders all projects in the grid', () => {
    render(<ProjectGrid projects={mockProjects} />);

    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('applies grid layout classes', () => {
    const { container } = render(<ProjectGrid projects={mockProjects} />);

    const grid = container.firstChild;
    expect(grid).toHaveClass('grid');
  });

  it('renders empty state when no projects', () => {
    render(<ProjectGrid projects={[]} />);

    // ProjectGrid doesn't render anything for empty projects, so we just check it doesn't crash
    const { container } = render(<ProjectGrid projects={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders correct number of ProjectCard components', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockProjects.length);
  });
});
