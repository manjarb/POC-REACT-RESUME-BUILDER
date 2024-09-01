import { act,renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import {
  ITemplateFormData,
  ITemplateSectionData,
  StorageKey,
  TemplateOption,
} from '../../common/constants';

import { useCreateTemplate } from './useCreateTemplate';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useCreateTemplate', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCreateTemplate());

    expect(result.current.selectedTemplate).toBe(TemplateOption.BASIC);
    expect(result.current.templateSectionDataDetail).toEqual({
      formValue: {},
      left: [],
      right: [],
    });
    expect(result.current.TEMPLATE_OPTIONS).toEqual(
      expect.arrayContaining([
        { value: TemplateOption.BASIC, label: 'Basic Template' },
        { value: TemplateOption.MODERN, label: 'Modern Template' },
        { value: TemplateOption.HEADER, label: 'Header Template' },
      ]),
    );
  });

  it('should handle template selection change', () => {
    const { result } = renderHook(() => useCreateTemplate());

    act(() => {
      result.current.handleTemplateChange('advanced');
    });

    expect(result.current.selectedTemplate).toBe('advanced');
  });

  it('should update template section data detail', () => {
    const { result } = renderHook(() => useCreateTemplate());

    const newSectionData: ITemplateSectionData = {
      left: ['description'],
      right: ['certifications'],
    };

    act(() => {
      result.current.onUpdateTemplateSectionDataDetail(newSectionData);
    });

    expect(result.current.templateSectionDataDetail).toEqual({
      formValue: {},
      left: ['description'],
      right: ['certifications'],
    });
  });

  it('should update form values', () => {
    const { result } = renderHook(() => useCreateTemplate());

    const newFormData: ITemplateFormData = {
      templateName: 'New Template',
      baseFontSize: 14,
      fontFamily: 'Arial',
      titleColor: '#000000',
      rightColumnBgColor: '#FFFFFF',
      templateOption: 'basic',
      headerPadding: 10,
      lineSpacing: 1.5,
      headerBackgroundColor: '#FFFFFF',
      headerTextColor: '#000000',
      watermarkUrl: '',
    };

    act(() => {
      result.current.onUpdateFormValue(newFormData);
    });

    expect(result.current.templateSectionDataDetail.formValue).toEqual(
      newFormData,
    );
  });

  it('should save template to localStorage and navigate to home', () => {
    const { result } = renderHook(() => useCreateTemplate());

    const newFormData: ITemplateFormData = {
      templateName: 'New Template',
      baseFontSize: 14,
      fontFamily: 'Arial',
      titleColor: '#000000',
      rightColumnBgColor: '#FFFFFF',
      templateOption: 'basic',
      headerPadding: 10,
      lineSpacing: 1.5,
      headerBackgroundColor: '#FFFFFF',
      headerTextColor: '#000000',
      watermarkUrl: '',
    };

    const newSectionData: ITemplateSectionData = {
      left: ['description'],
      right: ['certifications'],
    };

    act(() => {
      result.current.onUpdateFormValue(newFormData);
      result.current.onUpdateTemplateSectionDataDetail(newSectionData);
      result.current.saveTemplate();
    });

    const savedTemplates = JSON.parse(
      localStorage.getItem(StorageKey.TEMPLATES) || '[]',
    );

    expect(savedTemplates).toHaveLength(1);
    expect(savedTemplates[0]).toMatchObject({
      formValue: {},
      left: [],
      right: [],
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
