import {PressableProps, ViewStyle, StyleProp, TextStyle} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  heading?: string;
  emoji?: StyleProp<TextStyle>;
  icon: string;
  bgcColor: string;
}
