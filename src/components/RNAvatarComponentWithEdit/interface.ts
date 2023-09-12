import {ImageStyle, StyleProp, ViewStyle} from 'react-native';

export interface avatarComponentProps {
  icon?: any;
  customStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  onEdit?: () => void;
  onSelect?: () => void;
  isImageFromPicker?: boolean;
}
