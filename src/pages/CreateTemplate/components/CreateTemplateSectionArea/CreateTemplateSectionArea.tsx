import { useState } from 'react';
import classes from './CreateTemplateSectionArea.module.scss';
import Button from '../../../../components/Button/Button';
import { capitalizeFirstLetter } from '../../../../common/utils/string.util';
import DraggableCard from '../../../../components/DraggableCard/DraggableCard';
import { TemplateArea } from '../../../../common/constants';

interface ICreateTemplateSectionAreaProps {
  areaName: string;
  templateArea: TemplateArea
  availableSections: string[];
}

export default function CreateTemplateSectionArea({
  areaName,
  availableSections,
}: ICreateTemplateSectionAreaProps) {
  const [sections, setSections] = useState<Record<string, string>>(
    availableSections.reduce((a, v) => ({ ...a, [v]: v }), {}),
  );

  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const onAddSection = (name: string) => {
    setSelectedSections((prev) => {
      const newSections = [...prev];
      newSections.push(name);

      return newSections;
    });

    setSections((prev) => {
      const newSections = { ...prev };
      delete newSections[name];
      return newSections;
    });
  };

  const onDeleteSection = (name: string, index: number) => {
    setSelectedSections((prev) => {
      const newSections = [...prev];
      newSections.splice(index, 1);

      return newSections;
    });

    setSections((prev) => {
      const newSections = { ...prev };
      newSections[name] = name;
      return newSections;
    });
  };

  const SelectSectionList = () => {
    return (
      <>
        <h4 className="text-center">{areaName}</h4>
        {selectedSections.map((section, index) => (
          <div key={section} className="m-b-10">
            <DraggableCard
              title={capitalizeFirstLetter(section)}
              id={section}
              showArrow={false}
              onDeleteClick={() => onDeleteSection(section, index)}
            />
          </div>
        ))}
        <div className="m-t-15">
          {Object.keys(sections).map((key) => (
            <Button onClick={() => onAddSection(key)} variant="link">
              + {capitalizeFirstLetter(key)}
            </Button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={classes.container}>
      <SelectSectionList />
    </div>
  );
}
