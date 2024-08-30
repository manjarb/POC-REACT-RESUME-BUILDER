import classes from './TemplateBuilderArea.module.scss';
import CreateTemplateSectionArea from '../CreateTemplateSectionArea/CreateTemplateSectionArea';
import { TemplateArea, TemplateSection } from '../../../../common/constants';

interface TemplateBuilderAreaProps {}

export default function TemplateBuilderArea({}: TemplateBuilderAreaProps) {
  return (
    <div className={`${classes.templateBuilderArea}`}>
      <CreateTemplateSectionArea
        templateArea={TemplateArea.LEFT}
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
      />
      <div className="m-t-15">
        <CreateTemplateSectionArea
          templateArea={TemplateArea.RIGHT}
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
        />
      </div>
    </div>
  );
}
