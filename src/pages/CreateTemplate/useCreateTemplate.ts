import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {
  ITemplateFormData,
  ITemplateSectionData,
  ITemplateSectionDataDetail,
  ITemplateSectionDataDetailSave,
  StorageKey,
  TEMPLATE_OPTIONS,
  TemplateOption,
} from '../../common/constants';


export function useCreateTemplate() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | ''>(
    TemplateOption.BASIC,
  );

  const [templateSectionDataDetail, setTemplateSectionDataDetail] =
    useState<ITemplateSectionDataDetail>({
      formValue: {},
      left: [],
      right: [],
    });

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value as TemplateOption);
  };

  const onUpdateTemplateSectionDataDetail = (
    data: ITemplateSectionData | null,
  ) => {
    if (data) {
      setTemplateSectionDataDetail((prev) => {
        const newData = { ...prev, ...data };
        return newData;
      });
    }
  };

  const onUpdateFormValue = (data: ITemplateFormData) => {
    setTemplateSectionDataDetail((prev) => {
      const newData = { ...prev, formValue: { ...data } };
      return newData;
    });
  };

  const saveTemplate = () => {
    const currentSaveTemplates = localStorage.getItem('templates');
    if (currentSaveTemplates) {
      const templates: ITemplateSectionDataDetailSave[] =
        JSON.parse(currentSaveTemplates);
      templates.push({ ...templateSectionDataDetail, id: uuidv4() });
      localStorage.setItem(StorageKey.TEMPLATES, JSON.stringify(templates));
    } else {
      const newTemplate: ITemplateSectionDataDetailSave = {
        ...templateSectionDataDetail,
        id: uuidv4(),
      };
      localStorage.setItem(StorageKey.TEMPLATES, JSON.stringify([newTemplate]));
    }

    navigate('/');
  };

  return {
    selectedTemplate,
    handleTemplateChange,
    onUpdateTemplateSectionDataDetail,
    onUpdateFormValue,
    saveTemplate,
    TEMPLATE_OPTIONS,
    templateSectionDataDetail,
  };
}
