import React, { useState, useCallback } from 'react';
import classes from './TemplateBuilderArea.module.scss';

interface TemplateBuilderAreaProps {
  children?: React.ReactNode;
}

export default function TemplateBuilderArea({
  children,
}: TemplateBuilderAreaProps) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsOver(false);
  }, []);


  return (
    <div
      className={`${classes.templateBuilderArea} ${isOver ? classes.over : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {children || 'Drag and drop your resume elements here'}
    </div>
  );
}
