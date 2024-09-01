import { fireEvent } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { render } from '../../../../test/test.util'; // Adjust the path based on your project structure

import TemplateBuilderArea from './TemplateBuilderArea';
import useTemplateBuilderArea from './useTemplateBuilderArea';

// Mock the useTemplateBuilderArea hook
vi.mock('./useTemplateBuilderArea');

describe('TemplateBuilderArea', () => {
  const mockUseTemplateBuilderArea = {
    onUpdateLeftSectionData: vi.fn(),
    onUpdateRightSectionData: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useTemplateBuilderArea as vi.Mock).mockReturnValue(
      mockUseTemplateBuilderArea,
    );
  });

  it('renders the component with initial props', () => {
    const { getByText } = render(
      <TemplateBuilderArea onUpdateTemplateSectionData={vi.fn()} />,
    );

    // Check for presence of the section titles
    expect(getByText('Left Section')).toBeInTheDocument();
    expect(getByText('RIGHT Section')).toBeInTheDocument();

    // Check for presence of the available sections in the UI
    expect(getByText('+ Description')).toBeInTheDocument();
    expect(getByText('+ Experiences')).toBeInTheDocument();
    expect(getByText('+ Education')).toBeInTheDocument();
    expect(getByText('+ Certifications')).toBeInTheDocument();
    expect(getByText('+ Skills')).toBeInTheDocument();
  });

  it('calls onUpdateLeftSectionData when left section data is updated', () => {
    const { getByText } = render(
      <TemplateBuilderArea onUpdateTemplateSectionData={vi.fn()} />,
    );

    fireEvent.click(getByText('+ Description'));
    expect(
      mockUseTemplateBuilderArea.onUpdateLeftSectionData,
    ).toHaveBeenCalledWith(['description']);
  });

  it('calls onUpdateRightSectionData when right section data is updated', () => {
    const { getByText } = render(
      <TemplateBuilderArea onUpdateTemplateSectionData={vi.fn()} />,
    );

    fireEvent.click(getByText('+ Certifications'));
    expect(
      mockUseTemplateBuilderArea.onUpdateRightSectionData,
    ).toHaveBeenCalledWith(['certifications']);
  });
});
