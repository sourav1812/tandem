import {StyleProp, ViewStyle} from 'react-native';

export interface inputListState {
  answer: string;
}

export interface VoiceQuestionProps {
  onClick: () => void;
  customStyle?: StyleProp<ViewStyle>;
  questions: {
    question: string;
    options: string[];
    answer: string;
    _id: string;
  }[];
}
