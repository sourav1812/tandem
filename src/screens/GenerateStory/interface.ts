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
  bgc: string;
  icon?: string;
  svgIcon?: SVGElement;
}

export interface OnlyImageType {
  name: string;
  url: string;
}
