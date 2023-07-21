import {StyleProp, ViewStyle} from 'react-native';

export interface RoadmapProps {
  customStyle?: StyleProp<ViewStyle>;
  nextQuestion: () => void;
  questionIndex: number;
}
