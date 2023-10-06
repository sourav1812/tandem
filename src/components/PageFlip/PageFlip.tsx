import React from 'react';
import {Project} from './Project';
import {StoryData} from '@tandem/api/getStories/interface';
import {StateObject} from '@tandem/screens/StoryTelling/interface';

export const PageFlip = ({
  book,
  activeIndex,
  setActiveIndex,
  readWithoutImages,
  tooltipState,
  setTooltipState,
}: {
  book: StoryData;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  readWithoutImages?: boolean;
  tooltipState: StateObject;
  setTooltipState: React.Dispatch<React.SetStateAction<StateObject>>;
}) => {
  const textArray = book.storyInfo[0].pages.map(page => ({
    text: page.text,
    img: null, //readWithoutImages ? null : page.image,
  }));
  return (
    <Project
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      textArray={textArray.reverse()}
      tooltipState={tooltipState}
      setTooltipState={setTooltipState}
    />
  );
};
