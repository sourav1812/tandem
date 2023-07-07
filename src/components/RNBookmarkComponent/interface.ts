import {StyleProp, ViewStyle} from 'react-native';
import {ViewProps} from 'react-native';

export interface Props {
  props?: ViewProps;
  customStyle?: StyleProp<ViewStyle>;
  borderIconColor: string;
  heading: string;
  subHeading: string;
  showIcon?: boolean;
}
