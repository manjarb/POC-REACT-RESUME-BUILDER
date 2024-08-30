import { useRef, useState } from 'react';
import { ITemplateFormData, ITemplateSectionDataDetail, TEMPLATE_OPTIONS, TemplateOption } from '../../common/constants';

export function useCreateTemplate() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | ''>(
    TemplateOption.BASIC,
  );

  const templateSectionDataDetail = useRef<Partial<ITemplateSectionDataDetail>>(
    {},
  );

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value as TemplateOption);
  };

  const onUpdateTemplateSectionDataDetail = (data: Partial<ITemplateSectionDataDetail> | null) => {
    if (data) {
      templateSectionDataDetail.current = {
        ...templateSectionDataDetail.current,
        ...data,
      };
    }
  };

  const onUpdateFormValue = (data: ITemplateFormData) => {
    templateSectionDataDetail.current = {
      ...templateSectionDataDetail.current,
      formValue: { ...data },
    };


  };



  return {
    selectedTemplate,
    handleTemplateChange,
    onUpdateTemplateSectionDataDetail,
    onUpdateFormValue,
    TEMPLATE_OPTIONS,
  };
}
