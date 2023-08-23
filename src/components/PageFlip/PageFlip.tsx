import React from 'react';
import {Project} from './Project';
import Book from '@tandem/api/getStories/interface';

export const PageFlip = ({
  book,
  activeIndex,
  setActiveIndex,
}: {
  book: Book;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}) => {
  const textArray = book.pages.map(page => ({
    text: page.story_text,
    img: page.illustration_url,
  }));
  return (
    <Project
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      textArray={textArray.reverse()}
    />
  );
};
