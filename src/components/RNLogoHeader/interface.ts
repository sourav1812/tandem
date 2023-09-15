import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface LogoHeaderProps {
  customStyle?: StyleProp<ViewStyle>;
  textHeading?: boolean;
  heading?: string;
  titleStyle?: StyleProp<TextStyle>;
  rightIcon?: ReactNode;
  onRightButtonPress?: () => void;
  customRight?: boolean;
  showBackButton?: boolean;
}
