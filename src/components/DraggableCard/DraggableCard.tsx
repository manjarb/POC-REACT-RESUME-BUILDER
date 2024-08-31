import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DragElement } from '../../common/constants';
import Button from '../Button/Button';

import classes from './DraggableCard.module.scss';

interface IDraggableCardProps {
  title: string;
  id: string;
  subtitle?: string;
  showArrow?: boolean;
  showDelete?: boolean;
  defaultExpanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  onDeleteClick?: () => void;
  onMoveCard: (dragId: string, targetId: string) => void
}

export default function DraggableCard({
  title,
  id,
  subtitle,
  showArrow = true,
  showDelete = true,
  defaultExpanded = false,
  onToggleExpand,
  onDeleteClick,
  onMoveCard,
  children,
}: IDraggableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragElement.SECTION,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),

    }),
    [id],
  );

  const [, drop] = useDrop(
    () => ({
      accept: DragElement.SECTION,
      canDrop: () => false,
      hover: ({ id: dragId }: {id: string}) => {
        if (dragId !== id) {
          onMoveCard(dragId, id);
        }
      },
    }),
    [id, onMoveCard],
  );

  const toggleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (onToggleExpand) {
      onToggleExpand(newExpanded);
    }
  };

  const onDelete = () => {
    if (onDeleteClick) {
      onDeleteClick();
    }
  };


  return (
    <div
      ref={(node) => drag(drop(node))}
      id={id}
      className={`${classes.draggableCard} ${isDragging ? classes.dragging : ''}`}
    >
      <div className={classes.draggableCardHeader} onClick={toggleExpand}>
        <div className={classes.draggableCardContent}>
          <h3 className={classes.draggableCardTitle}>{title}</h3>
          {subtitle && (
            <p className={classes.draggableCardSubtitle}>{subtitle}</p>
          )}
        </div>
        {showDelete && (
          <Button size="sm" variant="danger" onClick={onDelete}>
            Remove
          </Button>
        )}
        {showArrow && (
          <div
            className={`${classes.draggableCardArrow} ${
              expanded ? classes.expanded : ''
            }`}
          >
            {expanded ? '▲' : '▼'}
          </div>
        )}
      </div>
      {expanded && children && (
        <div className={classes.draggableCardBody}>{children}</div>
      )}
    </div>
  );
}
