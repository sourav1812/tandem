import {StyleProp, TextInputProps, ViewStyle} from 'react-native';

export interface Props {
  props?: TextInputProps;
  label?: string;
  showLabel?: boolean;
  hint: string;
  value: string;
  updateText: (value: string) => void;
  inputStyle?: any;
  showError?: boolean;
  title: string;
  customStyle: StyleProp<ViewStyle>;
}
