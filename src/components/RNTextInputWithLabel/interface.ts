import {ValidationError} from '@tandem/utils/validations';
import {ReactNode} from 'react';
import {TextInputProps, StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface Props {
  props?: TextInputProps;
  label?: string;
  hint?: string;
  value: ValidationError;
  updateText?: React.Dispatch<React.SetStateAction<ValidationError>>;
  inputStyle?: StyleProp<TextStyle>;
  showIcon?: boolean;
  Icon?: any;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputViewStyle?: StyleProp<ViewStyle>;
  validationType?: string;
  errorTextStyle?: StyleProp<TextStyle>;
  rightSideIcon?: boolean;
  rightSideIconProp?: ReactNode;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  multiline?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  editable?: boolean;
  scrollEnabled?: boolean;
}
