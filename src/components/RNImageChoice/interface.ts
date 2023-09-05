import {ImageStyle, StyleProp, ViewStyle} from 'react-native';

export interface MultipleChoiceProps {
  data: {name: string; file: string}[];
  customStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ImageStyle>;
  type?: string;
  maxSelections?: number;
  index?: number;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
