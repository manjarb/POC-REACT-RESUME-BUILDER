import { useState } from 'react';
import { useDrop } from 'react-dnd';

import { DragElement } from '../../../../common/constants';
import { arrayMove } from '../../../../common/utils/array.util';

interface UseCreateTemplateSectionAreaProps {
  availableSections: string[];
}


export function useCreateTemplateSectionArea({
  availableSections,
}: UseCreateTemplateSectionAreaProps) {
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

  const onMoveCard = (dragId: string, targetId: string) => {
    setSelectedSections((prev) => {
      const newSections = [...prev];
      const oldIndex = prev.findIndex(p => p === dragId);
      const newIndex = prev.findIndex((p) => p === targetId);
      arrayMove(newSections, oldIndex, newIndex);
      return newSections;
    });
  };

  const [, cardDrop] = useDrop(
    () => ({
      accept: DragElement.SECTION,
      hover: () => {},
    }),
    [selectedSections],
  );



  return {
    sections,
    selectedSections,
    onAddSection,
    onDeleteSection,
    onMoveCard,
    cardDrop,
  };
}
