import {StyleProp, ViewStyle} from 'react-native';
import {placeType} from '@tandem/screens/GenerateStory/interface';

export interface multipleChoiceProps {
  data: placeType[];
  customStyle?: StyleProp<ViewStyle>;
  visibletoolTip?: boolean;
  onTooltipClose?: () => void;
  itemStyle?: StyleProp<ViewStyle>;
}
