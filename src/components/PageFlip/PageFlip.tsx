import React from 'react';
import {Project} from './Project';
import Book from '@tandem/api/getStories/interface';

export const PageFlip = ({
  book,
  activeIndex,
  setActiveIndex,
  readWithoutImages,
}: {
  book: Book;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  readWithoutImages?: boolean;
}) => {
  const textArray = book.pages.map(page => ({
    text: page.story_text,
    img: readWithoutImages ? null : page.image,
  }));
  return (
    <Project
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      textArray={textArray.reverse()}
    />
  );
};
