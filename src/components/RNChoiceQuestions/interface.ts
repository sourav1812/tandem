import {StyleProp, ViewStyle} from 'react-native';
import {PlaceType} from '@tandem/screens/GenerateStory/interface';
import {STORY_PARTS} from '@tandem/constants/enums';

export interface MultipleChoiceProps {
  data: PlaceType[];
  customStyle?: StyleProp<ViewStyle>;
  visibletoolTip?: boolean;
  onTooltipClose?: () => void;
  itemStyle?: StyleProp<ViewStyle>;
  type:
    | STORY_PARTS.WHO
    | STORY_PARTS.WHAT_THINGS
    | STORY_PARTS.WHAT_HAPPENS
    | STORY_PARTS.COLOR;
  maxSelections?: number;
  index?: number;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
