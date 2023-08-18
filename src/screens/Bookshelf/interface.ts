import themeColor from '../../theme/themeColor';
import {ImageSourcePropType} from 'react-native';

export interface colorPalette {
  color: string;
  icon: ImageSourcePropType;
  isSelected: boolean;
  colorCode: string;
}
export interface StateObject {
  questionNumber: number;
  colorPalette: colorPalette[];
}

interface placeType {
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
  emogi: string;
  week: string;
  teaser: string;
}

export const place: placeType[] = [
  {name: 'Home', icon: '🏠', bgc: themeColor.themeBlue},
  {name: 'City', icon: '🏙️', bgc: themeColor.gold},
  {name: 'Jungle', icon: '🌴', bgc: themeColor.lightGreen},
  {name: 'Farm', icon: '🐮', bgc: themeColor.pink},
  {name: 'Hill', icon: '⛰️', bgc: themeColor.themeBlue},
  {name: 'Camp', icon: '⛺', bgc: themeColor.gold},
];

export const audience: placeType[] = [
  {name: 'Domestic animals', icon: '🐱', bgc: themeColor.themeBlue},
  {name: 'Peoples', icon: '👦🏽', bgc: themeColor.gold},
  {name: 'Farm animals', icon: '🐮', bgc: themeColor.lightGreen},
  {name: 'Jungle animals', icon: '🦁', bgc: themeColor.pink},
  {name: 'Space aliens', icon: '👽', bgc: themeColor.themeBlue},
  {name: 'Scientists', icon: '👨‍🔬', bgc: themeColor.gold},
];

export const typeOfStory: placeType[] = [
  {name: 'Fairy tale', icon: '✨', bgc: themeColor.themeBlue},
  {name: 'Adventure', icon: '🏄', bgc: themeColor.gold},
  {name: 'Silly/Comedy', icon: '🤣', bgc: themeColor.lightGreen},
  {name: "I don't know", icon: '☹️', bgc: themeColor.pink},
];
