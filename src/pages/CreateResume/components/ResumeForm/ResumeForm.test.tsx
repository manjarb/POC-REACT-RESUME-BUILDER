import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { useTemplateData } from '../../../../components/Templates/hooks/useTemplateData/useTemplateData';

import ResumeForm from './ResumeForm';

// Mock the useTemplateData hook
vi.mock(
  '../../../../components/Templates/hooks/useTemplateData/useTemplateData',
);

describe('ResumeForm Component', () => {
  const mockOnUpdateFormValue = vi.fn();
  const mockTemplates = [
    { id: 'template-1', formValue: { templateName: 'Template 1' } },
    { id: 'template-2', formValue: { templateName: 'Template 2' } },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    // eslint-disable-next-line
    (useTemplateData as any).mockReturnValue({
      fetchSaveTemplates: vi.fn(),
      savedTemplates: mockTemplates,
    });
  });

  it('renders the form with all fields', () => {
    const { getByLabelText } = render(
      <ResumeForm onUpdateFormValue={mockOnUpdateFormValue} />,
    );

    expect(getByLabelText('First Name')).toBeInTheDocument();
    expect(getByLabelText('Last Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Linkedin')).toBeInTheDocument();
    expect(getByLabelText('Address')).toBeInTheDocument();
    expect(getByLabelText('Description')).toBeInTheDocument();
  });

  it('populates template select options from fetched templates', () => {
    const { getByLabelText, getByText } = render(
      <ResumeForm onUpdateFormValue={mockOnUpdateFormValue} />,
    );

    const select = getByLabelText('Template Option');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('template-1');
    expect(getByText('Template 1')).toBeInTheDocument();
    expect(getByText('Template 2')).toBeInTheDocument();
  });

  it('calls onUpdateFormValue with form data when valid', async () => {
    const { getByLabelText } = render(
      <ResumeForm onUpdateFormValue={mockOnUpdateFormValue} />,
    );

    fireEvent.input(getByLabelText('First Name'), {
      target: { value: 'John' },
    });
    fireEvent.input(getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.input(getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.input(getByLabelText('Linkedin'), {
      target: { value: 'linkedin.com/in/johndoe' },
    });
    fireEvent.input(getByLabelText('Address'), {
      target: { value: '123 Main St' },
    });
    fireEvent.input(getByLabelText('Description'), {
      target: { value: 'A brief description.' },
    });

    await waitFor(() => {
      expect(mockOnUpdateFormValue).toHaveBeenCalledWith({
        templateId: 'template-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        linkedin: 'linkedin.com/in/johndoe',
        address: '123 Main St',
        description: 'A brief description.',
      });
    });
  });
});
