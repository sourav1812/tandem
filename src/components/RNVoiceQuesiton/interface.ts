import {StyleProp, ViewStyle} from 'react-native';

export interface inputListState {
  answer: string;
}

export interface VoiceQuestionProps {
  onClick: () => void;
  customStyle?: StyleProp<ViewStyle>;
  tooltipOneVisible?: boolean;
  onTooltipOneClose?: () => void;
}
