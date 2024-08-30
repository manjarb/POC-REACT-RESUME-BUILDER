import classes from './CreateTemplateSectionArea.module.scss';
import Button from '../../../../components/Button/Button';
import { capitalizeFirstLetter } from '../../../../common/utils/string.util';
import DraggableCard from '../../../../components/DraggableCard/DraggableCard';
import { useCreateTemplateSectionArea } from './useCreateTemplateSectionArea';
import { useEffect } from 'react';

interface ICreateTemplateSectionAreaProps {
  areaName: string;
  availableSections: string[];
  onSelectedSectionsChange: (section: string[]) => void;
}

export default function CreateTemplateSectionArea({
  areaName,
  availableSections,
  onSelectedSectionsChange,
}: ICreateTemplateSectionAreaProps) {
  const {
    sections,
    selectedSections,
    onAddSection,
    onDeleteSection,
    onMoveCard,
    cardDrop,
  } = useCreateTemplateSectionArea({ availableSections });

  useEffect(() => {
    onSelectedSectionsChange(selectedSections);
  }, [selectedSections]);

  const SelectSectionList = () => {
    return (
      <div ref={cardDrop}>
        <h4 className="text-center">{areaName}</h4>
        <p className="text-center">Drag the elements to adjust content order</p>
        {selectedSections.map((section, index) => (
          <div key={section} className="m-b-10">
            <DraggableCard
              title={capitalizeFirstLetter(section)}
              id={section}
              showArrow={false}
              onDeleteClick={() => onDeleteSection(section, index)}
              onMoveCard={onMoveCard}
            />
          </div>
        ))}
        <div className="m-t-15">
          {Object.keys(sections).map((key) => (
            <Button key={key} onClick={() => onAddSection(key)} variant="link">
              + {capitalizeFirstLetter(key)}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <SelectSectionList />
    </div>
  );
}
