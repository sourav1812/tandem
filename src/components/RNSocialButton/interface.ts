import {ReactNode} from 'react';
import {StyleProp, ViewStyle, PressableProps, TextStyle} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  title?: string;
  onClick: () => void;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}
