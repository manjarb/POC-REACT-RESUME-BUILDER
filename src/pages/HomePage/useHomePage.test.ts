import { renderHook } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { useTemplateData } from '../../components/Templates/hooks/useTemplateData/useTemplateData';

import { useHomePage } from './useHomePage';

vi.mock('../../components/Templates/hooks/useTemplateData/useTemplateData');

describe('useHomePage', () => {
  const mockFetchSaveTemplates = vi.fn();
  const mockSavedTemplates = [
    { id: '1', formValue: { templateName: 'Template 1' } },
    { id: '2', formValue: { templateName: 'Template 2' } },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (useTemplateData as any).mockReturnValue({
      fetchSaveTemplates: mockFetchSaveTemplates,
      savedTemplates: mockSavedTemplates,
    });
  });

  it('fetches saved templates on mount', () => {
    renderHook(() => useHomePage());

    expect(mockFetchSaveTemplates).toHaveBeenCalled();
  });

  it('returns saved templates', () => {
    const { result } = renderHook(() => useHomePage());

    expect(result.current.savedTemplates).toEqual(mockSavedTemplates);
  });
});
