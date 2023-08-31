import themeColor from '@tandem/theme/themeColor';
import {ImageSourcePropType} from 'react-native';

export interface colorPalette {
  color: string;
  icon: ImageSourcePropType;
  isSelected: boolean;
  colorCode: string;
}
export interface StateObject {
  addedIllustration: number | null;
  tooltipFirst: boolean;
  tooltipSecond: boolean;
  tooltipThird: boolean;
  tooltipFourth: boolean;
  tooltipFifth: boolean;
}

export interface PlaceType {
  name: string;
  icon: string;
  bgc: string;
  img?: SVGElement;
}

export interface OnlyImageType {
  name: string;
  url: any;
}

export const place: OnlyImageType[] = [
  {name: 'At home', url: require('../../assets/png/onboarding1.png')},
  {name: 'Big sailing boat', url: require('../../assets/png/onboarding2.png')},
  {name: 'Camping in tents', url: require('../../assets/png/onboarding3.png')},
  {name: 'City', url: require('@tandem/assets/png/natureCamp.jpeg')},
  {name: 'Dark forest', url: require('@tandem/assets/png/notSure.png')},
];

export const audience: PlaceType[] = [
  {name: 'Domestic animals', icon: '🐱', bgc: themeColor.themeBlue},
  {name: 'Peoples', icon: '👦🏽', bgc: themeColor.gold},
  {name: 'Farm animals', icon: '🐮', bgc: themeColor.lightGreen},
  {name: 'Jungle animals', icon: '🦁', bgc: themeColor.pink},
  {name: 'Space aliens', icon: '👽', bgc: themeColor.themeBlue},
  {name: 'Scientists', icon: '👨‍🔬', bgc: themeColor.gold},
];

export const typeOfStory: PlaceType[] = [
  {name: 'Fairy tale', icon: '✨', bgc: themeColor.pink},
  {name: 'Adventure', icon: '🏄', bgc: themeColor.themeBlue},
  {name: 'Silly/Comedy', icon: '🤣', bgc: themeColor.gold},
  {name: "I don't know", icon: '☹️', bgc: themeColor.lightGreen},
];

export const attribute: PlaceType[] = [
  {name: 'Dog', icon: '🐶', bgc: themeColor.pink},
  {name: 'Bird', icon: '🐣', bgc: themeColor.themeBlue},
  {name: 'Milk', icon: '🥛', bgc: themeColor.gold},
  {name: 'Book', icon: '📖', bgc: themeColor.lightGreen},
];

export const illustration = [
  {url: require('../../assets/png/onboarding1.png')},
  {url: require('../../assets/png/onboarding2.png')},
  {url: require('../../assets/png/onboarding3.png')},
  {url: require('@tandem/assets/png/natureCamp.jpeg')},
  {url: require('@tandem/assets/png/notSure.png')},
];
