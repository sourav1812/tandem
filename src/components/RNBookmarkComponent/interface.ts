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
  large?: boolean;
  emoji?: string;
  headingStyle?: StyleProp<TextStyle>;
  onPress?: () => void | undefined;
}
