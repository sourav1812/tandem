import themeColor from '@tandem/theme/themeColor';

export interface StateObject {
  questionNumber: number;
  showModal: boolean;
}

interface placeType {
  name: string;
  icon: string;
  bgc: string;
}

export const place: placeType[] = [
  {name: 'Home', icon: '🏠', bgc: themeColor.themeBlue},
  {name: 'City', icon: '🏙️', bgc: themeColor.gold},
  {name: 'Jungle', icon: '🌴', bgc: themeColor.lightGreen},
  {name: 'Farm', icon: '🐮', bgc: themeColor.pink},
  {name: 'Hill', icon: '⛰️', bgc: themeColor.themeBlue},
  {name: 'Camp', icon: '⛺', bgc: themeColor.gold},
  {name: 'Jungle', icon: '🌴', bgc: themeColor.lightGreen},
  {name: 'Farm', icon: '🐮', bgc: themeColor.pink},
  {name: 'Hill', icon: '⛰️', bgc: themeColor.themeBlue},
  {name: 'Camp', icon: '⛺', bgc: themeColor.gold},
];
