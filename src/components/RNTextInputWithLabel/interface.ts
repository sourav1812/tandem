import {TextInputProps , StyleProp , TextStyle} from 'react-native';

export interface Props {
  props?: TextInputProps;
  label?: string;
  showLabel?: boolean;
  hint: string;
  value: string;
  updateText: (value: string) => void;
  inputStyle?:  StyleProp<TextStyle>;
  showIcon?: boolean;
  Icon?: any;
}
