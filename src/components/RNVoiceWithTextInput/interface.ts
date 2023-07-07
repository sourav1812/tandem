import {StyleProp, ViewStyle} from 'react-native';

export interface inputListState {
  answer: string;
}

export interface VoiceQuestionProps {
  onNextPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
}
