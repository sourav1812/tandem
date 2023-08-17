import {StyleProp, ViewStyle} from 'react-native';

export interface colorPaletteType {
  tooltipVisible: boolean;
  onTooltipClose: () => void;
  customStyle?: StyleProp<ViewStyle>;
  isTablet?: boolean;
}
export interface StateObject {
  colorPalette: {firstColor: string; secondColor: string}[];
}
