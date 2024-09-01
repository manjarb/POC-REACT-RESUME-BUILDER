import { act,renderHook } from '@testing-library/react';
import { JsonData } from 'json-edit-react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import {
  defaultCertification,
  defaultEducation,
  defaultExperience,
  defaultSkills,
  IBasicFormUserData,
} from '../../common/constants';
import { useTemplateData } from '../../components/Templates/hooks/useTemplateData/useTemplateData';

import { useCreateResume } from './useCreateResume';

// Mock the useTemplateData hook
vi.mock('../../components/Templates/hooks/useTemplateData/useTemplateData');

describe('useCreateResume', () => {
  const mockUseTemplateData = {
    fetchSaveTemplates: vi.fn(),
    savedTemplates: [
      {
        id: 'template-1',
        formValue: { templateOption: 'basic' },
      },
      {
        id: 'template-2',
        formValue: { templateOption: 'advanced' },
      },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useTemplateData as any).mockReturnValue(mockUseTemplateData);
  });

  it('should initialize with default data', () => {
    const { result } = renderHook(() => useCreateResume());

    expect(result.current.basicUserData).toBeNull();
    expect(result.current.educationsData).toEqual(defaultEducation);
    expect(result.current.experiencesData).toEqual(defaultExperience);
    expect(result.current.certificationsData).toEqual(defaultCertification);
    expect(result.current.skillsData).toEqual(defaultSkills);
  });

  it('should fetch saved templates on mount', () => {
    renderHook(() => useCreateResume());
    expect(mockUseTemplateData.fetchSaveTemplates).toHaveBeenCalled();
  });

  it('should update basic user data with debounce', async () => {
    const { result } = renderHook(() => useCreateResume());
    const basicUserData: IBasicFormUserData = {
      templateId: 'template-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      linkedin: 'linkedin.com/in/johndoe',
      address: '123 Main St',
      description: 'A brief description.',
    };

    await act(() => {
      result.current.onUpdateBasicUserData(basicUserData);
    });

    // Check if debounce works by waiting for the timeout
    await new Promise((r) => setTimeout(r, 600));
    expect(result.current.basicUserData).toEqual(basicUserData);
  });

  it('should update education data', () => {
    const { result } = renderHook(() => useCreateResume());
    const newEducationData: JsonData = [
      { degree: 'Bachelor of Science', major: 'Computer Science' },
    ];

    act(() => {
      result.current.onUpdateEducation(newEducationData);
    });

    expect(result.current.educationsData).toEqual(newEducationData);
  });

  it('should update experience data', () => {
    const { result } = renderHook(() => useCreateResume());
    const newExperienceData: JsonData = [
      { title: 'Software Engineer', company: 'ABC Company' },
    ];

    act(() => {
      result.current.onUpdateExperience(newExperienceData);
    });

    expect(result.current.experiencesData).toEqual(newExperienceData);
  });

  it('should update certification data', () => {
    const { result } = renderHook(() => useCreateResume());
    const newCertificationData: JsonData = [
      { name: 'AWS Certified Developer' },
    ];

    act(() => {
      result.current.onUpdateCertification(newCertificationData);
    });

    expect(result.current.certificationsData).toEqual(newCertificationData);
  });

  it('should update skill data', () => {
    const { result } = renderHook(() => useCreateResume());
    const newSkillData: JsonData = [{ name: 'JavaScript', score: 10 }];

    act(() => {
      result.current.onUpdateSkill(newSkillData);
    });

    expect(result.current.skillsData).toEqual(newSkillData);
  });
});
