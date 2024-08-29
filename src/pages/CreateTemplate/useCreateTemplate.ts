import { useState } from 'react';
import { TEMPLATE_OPTIONS, TemplateOption } from '../../common/constants';

export function useCreateTemplate() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | ''>(
    TemplateOption.BASIC,
  );

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value as TemplateOption);
  };

  return {
    selectedTemplate,
    handleTemplateChange,
    TEMPLATE_OPTIONS,
  };
}
