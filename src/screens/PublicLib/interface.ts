import Book from '@tandem/api/getStories/interface';
import {ImageSourcePropType} from 'react-native';

export interface ColorPalette {
  color: string;
  icon: ImageSourcePropType;
  isSelected: boolean;
  colorCode: string;
}
export interface StateObject {
  questionNumber: number;
  colorPalette: ColorPalette[];
}

export interface PlaceType {
  name: string;
  icon: string;
  bgc: string;
}

export interface BooksData {
  id: string;
  headerTitle: string;
  time: string;
  image: any;
  readingTime: number;
  isNew: boolean;
  emogi: string | null;
  week: string;
  teaser: string;
  book: Book;
}
