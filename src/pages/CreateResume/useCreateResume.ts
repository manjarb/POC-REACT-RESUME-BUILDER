import { JsonData } from 'json-edit-react';
import _debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  defaultEducation,
  IBasicFormUserData,
  IBasicTemplateCombineData,
  IUserEducation,
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
      experiences: [],
      certifications: [],
      references: [],
      skills: [],
    };
  }, [basicUserData, educationsData]);

  useEffect(() => {
    fetchSaveTemplates();
  }, []);

  return {
    basicUserData,
    selectedTemplate,
    combinedUserData,
    educationsData,
    onUpdateEducation,
    onUpdateBasicUserData,
  };
}
