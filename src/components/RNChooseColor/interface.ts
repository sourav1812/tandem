import {StyleProp, ViewStyle} from 'react-native';

export interface colorPaletteType {
  tooltipVisible: boolean;
  onTooltipClose: () => void;
  customStyle?: StyleProp<ViewStyle>;
}
export interface StateObject {
  colorPalette: {firstColor: string; secondColor: string}[];
  color1: string;
  color2: string;
  color3: string;
}
