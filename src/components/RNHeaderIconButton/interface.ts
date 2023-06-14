import {PressableProps, StyleProp, TextStyle} from 'react-native';

export interface Props {
  props?: StyleProp<PressableProps>;
  customStyle?: any;
  textStyle?: any;
  label: string;
}
