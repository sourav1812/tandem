import {ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';

export interface characterProps {
  url: ImageSourcePropType;
  characterName: string;
  customStyle?: StyleProp<ViewStyle>;
}
