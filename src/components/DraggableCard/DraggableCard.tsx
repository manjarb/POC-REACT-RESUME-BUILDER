import React, { useState } from 'react';
import classes from './DraggableCard.module.scss';

interface IDraggableCardProps {
  title: string;
  id: string;
  subtitle?: string;
  showArrow?: boolean;
  defaultExpanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export default function DraggableCard({
  title,
  id,
  subtitle,
  showArrow = true,
  defaultExpanded = false,
  onToggleExpand,
  onDragStart,
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

  return (
    <div id={id} className={classes.draggableCard} draggable onDragStart={onDragStart}>
      <div className={classes.draggableCardHeader} onClick={toggleExpand}>
        <div className={classes.draggableCardContent}>
          <h3 className={classes.draggableCardTitle}>{title}</h3>
          {subtitle && (
            <p className={classes.draggableCardSubtitle}>{subtitle}</p>
          )}
        </div>
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
      {expanded && (children) && (
        <div className={classes.draggableCardBody}>
          {children}
        </div>
      )}
    </div>
  );
}
