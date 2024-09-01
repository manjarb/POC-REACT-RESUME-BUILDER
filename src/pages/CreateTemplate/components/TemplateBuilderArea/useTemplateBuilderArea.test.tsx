import { act,renderHook } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import useTemplateBuilderArea from './useTemplateBuilderArea';

describe('useTemplateBuilderArea', () => {
  const mockOnUpdateTemplateSectionData = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with empty left and right sections', () => {
    const { result } = renderHook(() =>
      useTemplateBuilderArea({
        onUpdateTemplateSectionData: mockOnUpdateTemplateSectionData,
      }),
    );

    expect(result.current.templateSectionData.current).toEqual({
      left: [],
      right: [],
    });
  });

  it('should update left section data and call onUpdateTemplateSectionData', () => {
    const { result } = renderHook(() =>
      useTemplateBuilderArea({
        onUpdateTemplateSectionData: mockOnUpdateTemplateSectionData,
      }),
    );

    const newLeftSectionData = ['experiences', 'education'];

    act(() => {
      result.current.onUpdateLeftSectionData(newLeftSectionData);
    });

    expect(result.current.templateSectionData.current.left).toEqual(
      newLeftSectionData,
    );
    expect(mockOnUpdateTemplateSectionData).toHaveBeenCalledWith({
      left: newLeftSectionData,
      right: [],
    });
  });

  it('should update right section data and call onUpdateTemplateSectionData', () => {
    const { result } = renderHook(() =>
      useTemplateBuilderArea({
        onUpdateTemplateSectionData: mockOnUpdateTemplateSectionData,
      }),
    );

    const newRightSectionData = ['certifications', 'skills'];

    act(() => {
      result.current.onUpdateRightSectionData(newRightSectionData);
    });

    expect(result.current.templateSectionData.current.right).toEqual(
      newRightSectionData,
    );
    expect(mockOnUpdateTemplateSectionData).toHaveBeenCalledWith({
      left: [],
      right: newRightSectionData,
    });
  });

  it('should update both left and right section data correctly', () => {
    const { result } = renderHook(() =>
      useTemplateBuilderArea({
        onUpdateTemplateSectionData: mockOnUpdateTemplateSectionData,
      }),
    );

    const newLeftSectionData = ['description'];
    const newRightSectionData = ['skills'];

    act(() => {
      result.current.onUpdateLeftSectionData(newLeftSectionData);
      result.current.onUpdateRightSectionData(newRightSectionData);
    });

    expect(result.current.templateSectionData.current).toEqual({
      left: newLeftSectionData,
      right: newRightSectionData,
    });
    expect(mockOnUpdateTemplateSectionData).toHaveBeenCalledWith({
      left: newLeftSectionData,
      right: newRightSectionData,
    });
  });
});
