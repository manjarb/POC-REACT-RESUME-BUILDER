import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import TemplateForm from './TemplateForm';

describe('TemplateForm', () => {
  const mockOnUpdateFormValue = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the form with default values', async () => {
    const { getByLabelText } = render(
      <TemplateForm onUpdateFormValue={mockOnUpdateFormValue} />,
    );

    await waitFor(() => {
      expect(getByLabelText('Base Font Size (px)')).toHaveValue(12);
      expect(getByLabelText('Font Family')).toHaveValue('Arial');
      expect(getByLabelText('Title Color')).toHaveValue('#082A4D');
      expect(getByLabelText('Right Column Background Color')).toHaveValue(
        '#082A4D',
      );
      expect(getByLabelText('Template Option')).toHaveValue('basic');
      expect(getByLabelText('Header Vertical Padding (px)')).toHaveValue(20);
      expect(getByLabelText('Line Spacing')).toHaveValue(1.25);
      expect(getByLabelText('Header Background Color')).toHaveValue('#FFF');
      expect(getByLabelText('Header Text Color')).toHaveValue('#000000');
      expect(getByLabelText('Watermark Picture URL')).toHaveValue('');
    });
  });

  it('shows validation errors for required fields', async () => {
    const { getByLabelText, getByText } = render(
      <TemplateForm onUpdateFormValue={mockOnUpdateFormValue} />,
    );

    // Clear a required field
    fireEvent.change(getByLabelText('Template Name'), {
      target: { value: '' },
    });

    // Trigger validation by trying to submit or change another field
    fireEvent.blur(getByLabelText('Template Name'));

    await waitFor(() => {
      // Expect validation message
      expect(getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('calls onUpdateFormValue with valid data', async () => {
    const { getByLabelText } = render(
      <TemplateForm onUpdateFormValue={mockOnUpdateFormValue} />,
    );

    // Change values
    fireEvent.change(getByLabelText('Template Name'), {
      target: { value: 'My Custom Template' },
    });
    fireEvent.change(getByLabelText('Base Font Size (px)'), {
      target: { value: '16' },
    });
    fireEvent.change(getByLabelText('Title Color'), {
      target: { value: '#112233' },
    });

    // Trigger form submission by blurring the last field or changing another field
    fireEvent.blur(getByLabelText('Title Color'));

    await waitFor(() => {
      // Expect onUpdateFormValue to have been called with the correct data
      expect(mockOnUpdateFormValue).toHaveBeenCalledWith({
        templateName: 'My Custom Template',
        baseFontSize: 16,
        fontFamily: 'Arial',
        titleColor: '#112233',
        rightColumnBgColor: '#082A4D',
        templateOption: 'basic',
        headerPadding: 20,
        lineSpacing: 1.25,
        headerBackgroundColor: '#FFF',
        headerTextColor: '#000000',
        watermarkUrl: '',
      });
    });
  });

  it('handles invalid color format', async () => {
    const { getByLabelText, getByText } = render(
      <TemplateForm onUpdateFormValue={mockOnUpdateFormValue} />,
    );

    // Enter invalid color value
    fireEvent.change(getByLabelText('Title Color'), {
      target: { value: 'invalid-color' },
    });
    fireEvent.blur(getByLabelText('Title Color'));

    await waitFor(() => {
      // Expect validation message
      expect(getByText('Invalid color format')).toBeInTheDocument();
    });
  });
});
