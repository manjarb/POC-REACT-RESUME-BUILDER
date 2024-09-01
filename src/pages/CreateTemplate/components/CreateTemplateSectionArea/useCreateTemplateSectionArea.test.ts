import { act,renderHook } from '@testing-library/react';
import { useDrop } from 'react-dnd';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DragElement } from '../../../../common/constants';
import { arrayMove } from '../../../../common/utils/array/array.util';

import { useCreateTemplateSectionArea } from './useCreateTemplateSectionArea';

// Mock the useDrop hook from react-dnd
vi.mock('react-dnd', () => ({
  useDrop: vi.fn(),
}));

// Mock the arrayMove utility function
vi.mock('../../../../common/utils/array/array.util', () => ({
  arrayMove: vi.fn(),
}));

describe('useCreateTemplateSectionArea', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useDrop as vi.Mock).mockReturnValue([{}, vi.fn()]);
  });

  it('should initialize with available sections', () => {
    const { result } = renderHook(() =>
      useCreateTemplateSectionArea({
        availableSections: ['experience', 'education'],
      }),
    );

    expect(result.current.sections).toEqual({
      experience: 'experience',
      education: 'education',
    });
    expect(result.current.selectedSections).toEqual([]);
  });

  it('should add a section', () => {
    const { result } = renderHook(() =>
      useCreateTemplateSectionArea({
        availableSections: ['experience', 'education'],
      }),
    );

    act(() => {
      result.current.onAddSection('experience');
    });

    expect(result.current.selectedSections).toEqual(['experience']);
    expect(result.current.sections).toEqual({
      education: 'education',
    });
  });

  it('should delete a section', () => {
    const { result } = renderHook(() =>
      useCreateTemplateSectionArea({
        availableSections: ['experience', 'education'],
      }),
    );

    act(() => {
      result.current.onAddSection('experience');
      result.current.onDeleteSection('experience', 0);
    });

    expect(result.current.selectedSections).toEqual([]);
    expect(result.current.sections).toEqual({
      experience: 'experience',
      education: 'education',
    });
  });

  it('should move a section', () => {
    const { result } = renderHook(() =>
      useCreateTemplateSectionArea({
        availableSections: ['experience', 'education'],
      }),
    );

    act(() => {
      result.current.onAddSection('experience');
      result.current.onAddSection('education');
    });

    act(() => {
      result.current.onMoveCard('experience', 'education');
    });

    expect(arrayMove).toHaveBeenCalledWith(['experience', 'education'], 0, 1);
  });
});
