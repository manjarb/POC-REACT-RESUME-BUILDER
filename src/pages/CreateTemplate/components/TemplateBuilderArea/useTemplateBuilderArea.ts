import { useRef } from 'react';
import { ITemplateSectionData } from '../../../../common/constants';

interface IUseTemplateBuilderAreaProps {
  onUpdateTemplateSectionData: (data: ITemplateSectionData) => void;
}

export default function useTemplateBuilderArea({ onUpdateTemplateSectionData }: IUseTemplateBuilderAreaProps) {
  const templateSectionData = useRef<ITemplateSectionData>({
    left: [],
    right: [],
  });

  const onUpdateLeftSectionData = (data: string[]) => {
    templateSectionData.current = {
      ...templateSectionData.current,
      left: data,
    };
    onUpdateTemplateSectionData(templateSectionData.current);
  };

  const onUpdateRightSectionData = (data: string[]) => {
    templateSectionData.current = {
      ...templateSectionData.current,
      right: data,
    };
    onUpdateTemplateSectionData(templateSectionData.current);
  };

  return {
    templateSectionData,
    onUpdateLeftSectionData,
    onUpdateRightSectionData,
  };
}
