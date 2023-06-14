import {StyleProp, TextStyle , GestureResponderEvent} from 'react-native';

export interface Props {
  children: any ;
  isBold?: boolean;
  isSemiBold?: boolean;
  isMedium?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  handleOnPress?: ((event: GestureResponderEvent) => void) | undefined
}
