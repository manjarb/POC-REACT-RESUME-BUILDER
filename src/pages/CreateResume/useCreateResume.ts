import { JsonData } from 'json-edit-react';
import _debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  defaultCertification,
  defaultEducation,
  defaultExperience,
  defaultSkills,
  IBasicFormUserData,
  IBasicTemplateCombineData,
  IUserCertification,
  IUserEducation,
  IUserExperience,
  IUserSkill,
} from '../../common/constants';
import { useTemplateData } from '../../components/Templates/hooks/useTemplateData/useTemplateData';

export function useCreateResume() {
  const [basicUserData, setBasicUserData] = useState<IBasicFormUserData | null>(
    null,
  );
  const { fetchSaveTemplates, savedTemplates } = useTemplateData();
  const [educationsData, setEducationsData] = useState<IUserEducation[]>(
    defaultEducation,
  );
  const [experiencesData, setExperiencesData] =
    useState<IUserExperience[]>(defaultExperience);
  const [certificationsData, setCertificationsData] =
    useState<IUserCertification[]>(defaultCertification);
  const [skillsData, setSkillsData] =
    useState<IUserSkill[]>(defaultSkills);

  const debounceUpdateBasicUser = useCallback(
    _debounce(setBasicUserData, 500),
    [],
  );

  const onUpdateBasicUserData = (data: IBasicFormUserData) => {
    debounceUpdateBasicUser(data);
  };

  const onUpdateEducation = (data: JsonData) => {
    if (Array.isArray(data)) {
      setEducationsData(data.filter((d) => d) as IUserEducation[]);
    }
  };

  const onUpdateExperience = (data: JsonData) => {
    if (Array.isArray(data)) {
      setExperiencesData(data.filter((d) => d) as IUserExperience[]);
    }
  };

  const onUpdateCertification = (data: JsonData) => {
    if (Array.isArray(data)) {
      setCertificationsData(data.filter((d) => d) as IUserCertification[]);
    }
  };

  const onUpdateSkill = (data: JsonData) => {
    if (Array.isArray(data)) {
      setSkillsData(data.filter((d) => d) as IUserSkill[]);
    }
  };

  const selectedTemplate = useMemo(() => {
    return savedTemplates.find((t) => t.id === basicUserData?.templateId);
  }, [savedTemplates, basicUserData]);

  const combinedUserData = useMemo<IBasicTemplateCombineData | null>(() => {
    if (!basicUserData) {
      return null;
    }

    return {
      ...basicUserData,
      education: educationsData,
      experiences: experiencesData,
      certifications: certificationsData,
      skills: skillsData,
    };
  }, [basicUserData, educationsData, certificationsData, experiencesData, skillsData]);

  useEffect(() => {
    fetchSaveTemplates();
  }, []);

  return {
    basicUserData,
    selectedTemplate,
    combinedUserData,
    educationsData,
    experiencesData,
    certificationsData,
    skillsData,
    onUpdateEducation,
    onUpdateBasicUserData,
    onUpdateExperience,
    onUpdateCertification,
    onUpdateSkill,
  };
}
