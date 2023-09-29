import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface TooltipProps {
  children: ReactNode;
  open: number | undefined;
  setClose?: () => void;
  text: string;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  mainStyle?: StyleProp<ViewStyle>;
  dimensionObject?: any;
  top?: string;
  bottom?: string;
  rotation?: number;
  topViewStyle?: StyleProp<ViewStyle>;
  isTablet?: boolean;
  placement?: 'center' | 'left' | 'right' | 'bottom' | 'top' | undefined;
  useWait?: boolean;
}
