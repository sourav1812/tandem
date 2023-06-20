import {StyleProp, TextStyle , GestureResponderEvent , TextProps} from 'react-native';

export interface Props {
  props ?: TextProps;
  children: any ;
  isBold?: boolean;
  isSemiBold?: boolean;
  isMedium?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  handleOnPress?: ((event: GestureResponderEvent) => void) | undefined
}
