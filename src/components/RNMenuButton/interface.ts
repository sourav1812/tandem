import {StyleProp, ViewStyle} from 'react-native';

export interface MenuButtonProps {
  title: string;
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
