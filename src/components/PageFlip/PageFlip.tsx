import React from 'react';
import {Project} from './Project';
import Book from '@tandem/api/getStories/interface';
import {StateObject} from '@tandem/screens/StoryTelling/interface';

export const PageFlip = ({
  book,
  activeIndex,
  setActiveIndex,
  tooltipState,
  setTooltipState,
}: {
  book: Book;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  tooltipState: StateObject;
  setTooltipState: React.Dispatch<React.SetStateAction<StateObject>>;
}) => {
  const textArray = book.pages.map(page => ({
    text: page.story_text,
    img: page.image,
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
