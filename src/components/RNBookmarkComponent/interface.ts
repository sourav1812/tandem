import {PressableProps} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: any;
  borderIconColor: string;
  heading?: string;
  subHeading?: string;
  showIcon?: boolean;
}
