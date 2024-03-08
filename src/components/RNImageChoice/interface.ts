import {STORY_PARTS} from '@tandem/constants/enums';
import {ImageStyle, StyleProp, ViewStyle} from 'react-native';

export interface MultipleChoiceProps {
  data: {name: string; file: string}[];
  customStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ImageStyle>;
  type:
    | STORY_PARTS.WHERE
    | STORY_PARTS.WHO
    | STORY_PARTS.WHAT_HAPPENS
    | STORY_PARTS.STYLES;
  maxSelections?: number;
  index?: number;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
