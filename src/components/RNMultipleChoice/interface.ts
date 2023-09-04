import themeColor from '@tandem/theme/themeColor';
import {StyleProp, ViewStyle} from 'react-native';

export interface inputListState {
  answer: string;
}

export interface multipleChoiceProps {
  onNextPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
}

interface PlaceType {
  name: string;
  icon: string;
  bgc: string;
}

export const place: PlaceType[] = [
  {name: 'Bear', icon: '🐻', bgc: themeColor.red},
  {name: 'Cat', icon: '🐱', bgc: '#74D949'},
  {name: 'Cow', icon: '🐮', bgc: themeColor.red},
  {name: 'Dog', icon: '🐶', bgc: '#74D949'},
];
