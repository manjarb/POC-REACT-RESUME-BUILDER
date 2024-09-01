import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ITemplateSectionDataDetailSave,
  StorageKey,
} from '../../../../common/constants';

import { useTemplateData } from './useTemplateData';

describe('useTemplateData Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should initialize with an empty list of saved templates', () => {
    const { result } = renderHook(() => useTemplateData());

    expect(result.current.savedTemplates).toEqual([]);
  });

  it('should fetch saved templates from localStorage and update state', async () => {
    const mockTemplates: ITemplateSectionDataDetailSave[] = [
      { id: 'template-1', formValue: {}, left: [], right: [] },
      { id: 'template-2', formValue: {}, left: [], right: [] },
    ];

    // Mock localStorage to return the mockTemplates
    localStorage.setItem(StorageKey.TEMPLATES, JSON.stringify(mockTemplates));

    const { result } = renderHook(() => useTemplateData());

    await act(async () => {
      result.current.fetchSaveTemplates();
    });

    expect(result.current.savedTemplates).toEqual(mockTemplates);
  });

  it('should handle empty localStorage without breaking', async () => {
    const { result } = renderHook(() => useTemplateData());

    await act(async () => {
      result.current.fetchSaveTemplates();
    });

    expect(result.current.savedTemplates).toEqual([]);
  });


});
