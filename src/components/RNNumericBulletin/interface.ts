import {ViewStyle, StyleProp} from 'react-native';

export interface Props {
  customStyle?: StyleProp<ViewStyle>;
  heading: Number;
  selected: boolean;
}
