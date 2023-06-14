import {StyleProp, ViewStyle, PressableProps} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  onlyBorder?: boolean;
  color?: string;
  children?: string;
  buttonColor?: string | any;
  noBorderRadius?: boolean;
}
