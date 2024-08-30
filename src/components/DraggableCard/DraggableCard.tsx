import React, { useState } from 'react';
import classes from './DraggableCard.module.scss';
import Button from '../Button/Button';

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
  children,
}: IDraggableCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

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
      id={id}
      className={classes.draggableCard}
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
