import {OnlyImageType} from '@tandem/screens/GenerateStory/interface';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';

export interface MultipleChoiceProps {
  data: OnlyImageType[];
  customStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ImageStyle>;
  type?: string;
  maxSelections?: number;
  index?: number;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
