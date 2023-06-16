import {StyleProp, ViewStyle, PressableProps} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  onlyBorder?: boolean;
  color?: string;
  title: string;
  buttonColor?: string;
  noBorderRadius?: boolean;
  onClick : ()=>void;
}
