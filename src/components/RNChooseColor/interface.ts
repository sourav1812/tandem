import {ImageSourcePropType} from 'react-native';

export interface colorPaletteType {
  color: string;
  icon: ImageSourcePropType;
  isSelected: boolean;
  colorCode: string;
}
export interface stateObject {
  colorPalette: {firstColor: string; secondColor: string}[];
  color1: string;
  color2: string;
}
