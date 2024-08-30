import { useDrop } from 'react-dnd';
import classes from './CreateTemplateSectionArea.module.scss';
import Button from '../../../../components/Button/Button';
import { capitalizeFirstLetter } from '../../../../common/utils/string.util';
import DraggableCard from '../../../../components/DraggableCard/DraggableCard';
import { DragElement, TemplateArea } from '../../../../common/constants';
import { useCreateTemplateSectionArea } from './useCreateTemplateSectionArea';

interface ICreateTemplateSectionAreaProps {
  areaName: string;
  templateArea: TemplateArea;
  availableSections: string[];
}

export default function CreateTemplateSectionArea({
  areaName,
  availableSections,
}: ICreateTemplateSectionAreaProps) {
  const {
    sections,
    selectedSections,
    onAddSection,
    onDeleteSection,
    onMoveCard,
  } = useCreateTemplateSectionArea({ availableSections });

  const [, cardDrop] = useDrop(
    () => ({
      accept: DragElement.SECTION,
      hover: () => {},
    }),
    [selectedSections],
  );

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
