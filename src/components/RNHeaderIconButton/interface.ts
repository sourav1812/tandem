import {PressableProps, StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label: string;
}
