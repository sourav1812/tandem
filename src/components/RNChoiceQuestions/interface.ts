import {StyleProp, ViewStyle} from 'react-native';
import {PlaceType} from '@tandem/screens/GenerateStory/interface';

export interface MultipleChoiceProps {
  data: PlaceType[];
  customStyle?: StyleProp<ViewStyle>;
  visibletoolTip?: boolean;
  onTooltipClose?: () => void;
  itemStyle?: StyleProp<ViewStyle>;
  type?: string;
  maxSelections?: number;
  index?: number;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
