import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ViewProps} from 'react-native';

export interface Props {
  props?: ViewProps;
  customStyle?: StyleProp<ViewStyle>;
  borderIconColor: string;
  heading: string;
  subHeading: string | undefined;
  showIcon?: boolean;
  showSubheading?: boolean;
  emoji?: string;
  headingStyle?: StyleProp<TextStyle>;
}
