import {StyleProp, ViewStyle} from 'react-native';

export interface ColorPaletteType {
  // tooltipVisible: boolean;
  // onTooltipClose: () => void;
  customStyle?: StyleProp<ViewStyle>;
  isTablet?: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface StateObject {
  colorPalette: {firstColor: string; secondColor: string}[];
}
