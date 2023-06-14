import {TextInputProps} from 'react-native';

export interface Props {
  props?: TextInputProps;
  label: string;
  showLabel?: boolean;
  hint: string;
  value: string;
  updateText: (value: string) => void;
  inputStyle?: any;
  showError?: boolean;
}
