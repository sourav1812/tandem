import {ImageStyle, StyleProp, ViewStyle} from 'react-native';

export interface avatarComponentProps {
  icon: any;
  customStyle?: StyleProp<ViewStyle>;
  pressableDisable?: boolean;
  onPress: () => void;
  imgStyle?: StyleProp<ImageStyle>;
}
