import {StyleProp, TextStyle} from 'react-native';

export interface Props {
  children: string;
  isBold?: boolean;
  isSemiBold?: boolean;
  isMedium?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  handleOnPress?: any;
}
