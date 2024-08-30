import classes from './TemplateBuilderArea.module.scss';
import CreateTemplateSectionArea from '../CreateTemplateSectionArea/CreateTemplateSectionArea';
import { ITemplateSectionData, TemplateSection } from '../../../../common/constants';
import useTemplateBuilderArea from './useTemplateBuilderArea';

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
          TemplateSection.CONTACT,
          TemplateSection.DESCRIPTION,
          TemplateSection.EXPERIENCES,
          TemplateSection.EDUCATION,
          TemplateSection.CERTIFICATIONS,
          TemplateSection.REFERENCES,
          TemplateSection.SKILLS,
        ]}
        onSelectedSectionsChange={onUpdateLeftSectionData}
      />
      <div className="m-t-15">
        <CreateTemplateSectionArea
          areaName="RIGHT Section"
          availableSections={[
            TemplateSection.CONTACT,
            TemplateSection.DESCRIPTION,
            TemplateSection.EXPERIENCES,
            TemplateSection.EDUCATION,
            TemplateSection.CERTIFICATIONS,
            TemplateSection.REFERENCES,
            TemplateSection.SKILLS,
          ]}
          onSelectedSectionsChange={onUpdateRightSectionData}
        />
      </div>
    </div>
  );
}
