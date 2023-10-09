import React from 'react';
import {Project} from './Project';
import {StateObject} from '@tandem/screens/StoryTelling/interface';

export const PageFlip = ({
  activeIndex,
  setActiveIndex,
  textArray,
  tooltipState,
  setTooltipState,
}: {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  textArray?: {text: string; img: any}[];
  tooltipState: StateObject;
  setTooltipState: React.Dispatch<React.SetStateAction<StateObject>>;
}) => {
  return (
    <Project
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      textArray={textArray || []}
      tooltipState={tooltipState}
      setTooltipState={setTooltipState}
    />
  );
};
