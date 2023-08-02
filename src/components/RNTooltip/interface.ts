import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface TooltipProps {
  children: ReactNode;
  open: boolean;
  setClose: () => void;
  text: string;
  top: boolean;
  rotation: number;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  vectorSize?: number;
  mainStyle?: StyleProp<ViewStyle>;
}
