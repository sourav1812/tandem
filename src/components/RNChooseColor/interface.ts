import {StyleProp, ViewStyle} from 'react-native';

export interface ColorPaletteType {
  customStyle?: StyleProp<ViewStyle>;
  isTablet?: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface StateObject {
  colorPalette: {firstColor: string; secondColor: string}[];
}
