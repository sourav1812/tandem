import {STORIES_RESPONSE} from '@tandem/constants/enums';

export default interface Book {
  [STORIES_RESPONSE.BOOK_COVER]?: string;
  [STORIES_RESPONSE.BOOK_ID]: string;
  [STORIES_RESPONSE.CHILD_ID]: string;
  [STORIES_RESPONSE.COMPREHENSION_QUESTIONS]: string;
  [STORIES_RESPONSE.CREATED_AT]: string;
  [STORIES_RESPONSE.LLM]?: {
    [key: string]: string;
  };
  [STORIES_RESPONSE.ORGANIZATION_ID]: string;
  [STORIES_RESPONSE.PAGES]: Page[];
  [STORIES_RESPONSE.PROMPT]: Prompt;
  [STORIES_RESPONSE.RATING]?: string;
  [STORIES_RESPONSE.STATUS]: number;
  [STORIES_RESPONSE.STORY]: string;
  [STORIES_RESPONSE.TEASER]: string;
  [STORIES_RESPONSE.THUMBNAIL]?: string;
  [STORIES_RESPONSE.TITLE]?: string;
  [STORIES_RESPONSE.USER_ID]: string;
}

export interface Page {
  [STORIES_RESPONSE.ILLUSTRATION_PROMPT]: string;
  [STORIES_RESPONSE.ILLUSTRATION_URL]: string;
  [STORIES_RESPONSE.IMG]: string | null;
  [STORIES_RESPONSE.PAGE_NUMBER]: number;
  [STORIES_RESPONSE.SELECTED_ILLUSTRATION]: string | null;
  [STORIES_RESPONSE.STORY_TEXT]: string;
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
