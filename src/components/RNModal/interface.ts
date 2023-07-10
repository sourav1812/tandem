import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export interface RNModalProps {
  visible: boolean;
  renderModal: () => void;
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}
