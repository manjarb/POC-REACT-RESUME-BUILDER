import { useState } from 'react';
import {
  ITemplateFormData,
  ITemplateSectionData,
  ITemplateSectionDataDetail,
  TEMPLATE_OPTIONS,
  TemplateOption,
} from '../../common/constants';

export function useCreateTemplate() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | ''>(
    TemplateOption.BASIC,
  );

  const [templateSectionDataDetail, setTemplateSectionDataDetail] = useState<ITemplateSectionDataDetail>({
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
      setTemplateSectionDataDetail(prev => {
        const newData = { ...prev, ...data };
        return newData;
      });
    }
  };

  const onUpdateFormValue = (data: ITemplateFormData) => {
    setTemplateSectionDataDetail((prev) => {
      const newData = { ...prev, formValue:{ ...data } };
      return newData;
    });
  };

  return {
    selectedTemplate,
    handleTemplateChange,
    onUpdateTemplateSectionDataDetail,
    onUpdateFormValue,
    TEMPLATE_OPTIONS,
    templateSectionDataDetail,
  };
}
