import {PressableProps, ViewStyle, StyleProp} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  borderIconColor?: string;
  heading: string;
  subHeading: string;
}
