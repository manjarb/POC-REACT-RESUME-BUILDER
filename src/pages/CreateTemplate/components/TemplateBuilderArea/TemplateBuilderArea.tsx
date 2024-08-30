import React from 'react';
import classes from './TemplateBuilderArea.module.scss';
import CreateTemplateSectionArea from '../CreateTemplateSectionArea/CreateTemplateSectionArea';
import { TemplateArea, TemplateSection } from '../../../../common/constants';

interface TemplateBuilderAreaProps {}

export default function TemplateBuilderArea({}: TemplateBuilderAreaProps) {
  return (
    <div className={`${classes.templateBuilderArea}`}>
      <CreateTemplateSectionArea
        templateArea={TemplateArea.LEFT}
        areaName="Left Area"
        availableSections={[
          TemplateSection.EXPERIENCES,
          TemplateSection.EDUCATION,
          TemplateSection.CERTIFICATIONS,
          TemplateSection.REFERENCES,
          TemplateSection.SKILLS,
        ]}
      />
    </div>
  );
}
