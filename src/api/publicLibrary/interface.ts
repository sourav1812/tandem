import {RATING_INFO, STORIES_RESPONSE} from '@tandem/constants/enums';

export interface Page {
  [STORIES_RESPONSE.ILLUSTRATION_PROMPT]: string;
  [STORIES_RESPONSE.ILLUSTRATION_URL]: string;
  [STORIES_RESPONSE.IMG]: string | null;
  [STORIES_RESPONSE.PAGE_NUMBER]: number;
  [STORIES_RESPONSE.SELECTED_ILLUSTRATION]: string | null;
  [STORIES_RESPONSE.STORY_TEXT]: string;
  image?: string;
}

export interface Prompt {
  characters: string[];
  childAge: number;
  childGender: string;
  childInStory: boolean;
  childName: string;
  genre: string;
  illustrationColors: string[];
  illustrationStyle: string;
  location: string;
  numberOfPages: number;
  plotElements: string[];
  readingAge: number;
  wordsPerPage: number;
}

export interface StoryData {
  _id: string;
  userId: string;
  childId: string;
  prompt: {
    characters: string[];
    location: string[];
    plotElements: string[];
    genre: string[];
    illustrationStyle: string[];
    illustrationColors: string[];
    childInStory: boolean;
    childName: string;
    childAge: number;
    childGender: string;
    readingAge: number;
  };
  teaser: string;
  title: string;
  referenceId: string;
  thumbnail?: string;
  storyInfo: [
    {
      _id: string;
      bookId: string;
      userId: string;
      pages: {text: string; _id: string}[];
      comprehension_questions: {
        question: string;
        answer: string;
        _id: string;
      }[];
      createdAt: string;
      updatedAt: string;
    },
  ];
  ratingInfo: {
    _id: string;
    bookId: string;
    userId: string;
    storyRating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
}

export interface RatingInfo {
  [RATING_INFO.ID]: string;
  [RATING_INFO.BOOK_ID]: string;
  [RATING_INFO.USER_ID]: string;
  [RATING_INFO.STORY_RATING]: number;
  [RATING_INFO.CREATED_AT]: string;
  [RATING_INFO.UPDATED_AT]: string;
  [RATING_INFO.V]: number;
}
