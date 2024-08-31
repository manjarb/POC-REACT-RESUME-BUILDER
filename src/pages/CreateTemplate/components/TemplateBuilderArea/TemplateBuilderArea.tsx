import { ITemplateSectionData, TemplateSection } from '../../../../common/constants';
import CreateTemplateSectionArea from '../CreateTemplateSectionArea/CreateTemplateSectionArea';

import useTemplateBuilderArea from './useTemplateBuilderArea';

import classes from './TemplateBuilderArea.module.scss';

interface TemplateBuilderAreaProps {
  onUpdateTemplateSectionData: (data: ITemplateSectionData) => void;
}

export default function TemplateBuilderArea({ onUpdateTemplateSectionData }: TemplateBuilderAreaProps) {
  const { onUpdateLeftSectionData, onUpdateRightSectionData } = useTemplateBuilderArea({ onUpdateTemplateSectionData });

  return (
    <div className={`${classes.templateBuilderArea}`}>
      <CreateTemplateSectionArea
        areaName="Left Section"
        availableSections={[
          // TODO: Enable these options when be have a proper template
          // TemplateSection.CONTACT,
          TemplateSection.DESCRIPTION,
          TemplateSection.EXPERIENCES,
          TemplateSection.EDUCATION,
          // TemplateSection.CERTIFICATIONS,
          // TemplateSection.REFERENCES,
          // TemplateSection.SKILLS,
        ]}
        onSelectedSectionsChange={onUpdateLeftSectionData}
      />
      <div className="m-t-15">
        <CreateTemplateSectionArea
          areaName="RIGHT Section"
          availableSections={[
            // TemplateSection.CONTACT,
            // TemplateSection.DESCRIPTION,
            // TemplateSection.EXPERIENCES,
            // TemplateSection.EDUCATION,
            TemplateSection.CERTIFICATIONS,
            // TemplateSection.REFERENCES,
            TemplateSection.SKILLS,
          ]}
          onSelectedSectionsChange={onUpdateRightSectionData}
        />
      </div>
    </div>
  );
}
