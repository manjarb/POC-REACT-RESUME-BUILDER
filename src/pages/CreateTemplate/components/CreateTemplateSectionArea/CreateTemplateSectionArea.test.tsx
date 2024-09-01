import { fireEvent } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { render } from '../../../../test/test.util';

import CreateTemplateSectionArea from './CreateTemplateSectionArea';
import { useCreateTemplateSectionArea } from './useCreateTemplateSectionArea';

vi.mock('./useCreateTemplateSectionArea');

describe('CreateTemplateSectionArea', () => {
  const mockUseCreateTemplateSectionArea = {
    sections: { experience: 'experience', education: 'education' },
    selectedSections: [],
    onAddSection: vi.fn(),
    onDeleteSection: vi.fn(),
    onMoveCard: vi.fn(),
    cardDrop: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useCreateTemplateSectionArea as any).mockReturnValue(
      mockUseCreateTemplateSectionArea,
    );
  });

  it('renders the component with initial props', () => {
    const { getByText } = render(
      <CreateTemplateSectionArea
        areaName="Left Column"
        availableSections={['experience', 'education']}
        onSelectedSectionsChange={vi.fn()}
      />,
    );

    expect(getByText('Left Column')).toBeInTheDocument();
    expect(
      getByText('Drag the elements to adjust content order'),
    ).toBeInTheDocument();
    expect(getByText('+ Experience')).toBeInTheDocument();
    expect(getByText('+ Education')).toBeInTheDocument();
  });

  it('calls onAddSection when a section is added', () => {
    const { getByText } = render(
      <CreateTemplateSectionArea
        areaName="Left Column"
        availableSections={['experience']}
        onSelectedSectionsChange={vi.fn()}
      />,
    );

    fireEvent.click(getByText('+ Experience'));
    expect(mockUseCreateTemplateSectionArea.onAddSection).toHaveBeenCalledWith(
      'experience',
    );
  });

  it('calls onDeleteSection when a section is deleted', () => {
    mockUseCreateTemplateSectionArea.selectedSections = ['experience'] as any;
    const { getByText } = render(
      <CreateTemplateSectionArea
        areaName="Left Column"
        availableSections={['experience', 'education']}
        onSelectedSectionsChange={vi.fn()}
      />,
    );

    fireEvent.click(getByText('Remove'));
    expect(
      mockUseCreateTemplateSectionArea.onDeleteSection,
    ).toHaveBeenCalledWith('experience', 0);
  });

  it('calls onMoveCard when a section is reordered', () => {
    mockUseCreateTemplateSectionArea.selectedSections = [
      'experience',
      'education',
    ] as any;
    const { getByText } = render(
      <CreateTemplateSectionArea
        areaName="Left Column"
        availableSections={['experience', 'education']}
        onSelectedSectionsChange={vi.fn()}
      />,
    );

    // Simulate drag-and-drop action
    fireEvent.dragStart(getByText('Experience'));
    fireEvent.drop(getByText('Education'));
    expect(mockUseCreateTemplateSectionArea.onMoveCard).toHaveBeenCalled();
  });

  it('calls onSelectedSectionsChange when sections change', () => {
    const onSelectedSectionsChangeMock = vi.fn();
    const { getByText } = render(
      <CreateTemplateSectionArea
        areaName="Left Column"
        availableSections={['experience', 'education']}
        onSelectedSectionsChange={onSelectedSectionsChangeMock}
      />,
    );

    fireEvent.click(getByText('+ Experience'));
    expect(onSelectedSectionsChangeMock).toHaveBeenCalledWith(['experience', 'education']);
  });
});
