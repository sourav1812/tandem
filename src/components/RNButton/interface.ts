import {ReactNode} from 'react';
import {
  StyleProp,
  ViewStyle,
  PressableProps,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  onlyBorder?: boolean;
  color?: string;
  title?: string;
  buttonColor?: string;
  noBorderRadius?: boolean;
  onClick: () => Promise<void> | void;
  onlyIcon?: boolean;
  IconButtoncustomStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  isDisabled?: boolean;
  ref?: any;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  loadPercentage?: number;
  pressableStyle?: StyleProp<ViewStyle>;
  hitSlop?: number;
}
