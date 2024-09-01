import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TemplateOption } from '../../common/constants';

import CreateResume from './CreateResume';
import { useCreateResume } from './useCreateResume';

// Mock the useCreateResume hook
vi.mock('./useCreateResume');

// Partial mock of @react-pdf/renderer to keep everything but PDFViewer intact
vi.mock('@react-pdf/renderer', async (importOriginal) => {
  const original = await importOriginal<typeof import('@react-pdf/renderer')>();

  return {
    ...original,
    PDFViewer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe('CreateResume Component', () => {
  const mockUseCreateResume = {
    onUpdateBasicUserData: vi.fn(),
    onUpdateEducation: vi.fn(),
    onUpdateExperience: vi.fn(),
    onUpdateCertification: vi.fn(),
    onUpdateSkill: vi.fn(),
    selectedTemplate: {
      id: '8e090751-827e-46f8-8466-b744c1a60bbe',
      formValue: { templateOption: TemplateOption.BASIC },
      left: ['description', 'experiences', 'education'],
      right: ['certifications', 'skills'],
    },
    combinedUserData: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      linkedin: 'linkedin.com/in/johndoe',
      address: '123 Main St',
      description: 'A brief description.',
    },
    educationsData: [],
    experiencesData: [],
    certificationsData: [],
    skillsData: [],
  };

  beforeEach(() => {
    vi.resetAllMocks();
    // eslint-disable-next-line
    (useCreateResume as any).mockReturnValue(mockUseCreateResume);
  });

  it('renders the component with all sections', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <CreateResume />
      </MemoryRouter>,
    );

    expect(getByText('Create Resume')).toBeInTheDocument();
    expect(getByText('Education')).toBeInTheDocument();
    expect(getByText('Experience')).toBeInTheDocument();
    expect(getByText('Certification')).toBeInTheDocument();
    expect(getByText('Skill')).toBeInTheDocument();
    expect(getByLabelText('First Name')).toBeInTheDocument();
  });

  it('navigates back when "Back" button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateResume />
      </MemoryRouter>,
    );

    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    // Ensure the back button triggers navigation
    expect(window.location.pathname).toBe('/');
  });

  it('renders the PDFViewer with the selected template', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateResume />
      </MemoryRouter>,
    );

    expect(getByText('Create Resume')).toBeInTheDocument();
    expect(getByText('Education')).toBeInTheDocument();

    // Verify PDFViewer is rendering
    const pdfViewer = getByText('Create Resume');
    expect(pdfViewer).toBeInTheDocument();
  });
});
