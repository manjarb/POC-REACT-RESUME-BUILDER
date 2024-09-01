import { fireEvent, waitFor } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { TemplateOption } from '../../common/constants';
import { render } from '../../test/test.util'; // Adjust the path based on your project structure

import CreateTemplate from './CreateTemplate';
import { useCreateTemplate } from './useCreateTemplate';

vi.mock('./useCreateTemplate');

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

describe('CreateTemplate', () => {
  const mockSaveTemplate = vi.fn();
  const mockOnUpdateTemplateSectionDataDetail = vi.fn();
  const mockOnUpdateFormValue = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    (useCreateTemplate as vi.Mock).mockReturnValue({
      onUpdateTemplateSectionDataDetail: mockOnUpdateTemplateSectionDataDetail,
      onUpdateFormValue: mockOnUpdateFormValue,
      templateSectionDataDetail: {
        id: '8e090751-827e-46f8-8466-b744c1a60bbe',
        formValue: { templateOption: TemplateOption.BASIC },
        left: [],
        right: [],
      },
      saveTemplate: mockSaveTemplate,
    });
  });

  it('renders the CreateTemplate component with form and template builder', async () => {
    const { getByText, getByRole } = render(<CreateTemplate />);

    // Check if the form and template builder are rendered
    expect(getByText('Create Template')).toBeInTheDocument();
    expect(getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('calls saveTemplate when Save button is clicked', () => {
    const { getByRole } = render(<CreateTemplate />);

    const saveButton = getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockSaveTemplate).toHaveBeenCalled();
  });

  it('updates the template section data when TemplateBuilderArea is used', async () => {
    const { getByText } = render(<CreateTemplate />);

    // Simulate interaction with the TemplateBuilderArea component
    fireEvent.click(getByText('+ Skills'));

    await waitFor(() => {
      expect(mockOnUpdateTemplateSectionDataDetail).toHaveBeenCalledWith({
        left: [],
        right: [
          'skills',
        ],
      });
    });
  });
});
