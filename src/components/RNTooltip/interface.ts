import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface TooltipProps {
  children: ReactNode;
  open: boolean;
  setClose: () => void;
  text: string;
  top: boolean;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  mainStyle?: StyleProp<ViewStyle>;
  dimensionObject: any;
}
