import {
  PressableProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';

export interface Props {
  props?: PressableProps;
  customStyle?: StyleProp<ViewStyle>;
  heading?: string;
  emoji?: StyleProp<TextStyle>;
  icon: string;
  bgcColor: string;
  ref?: any;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  onPress: () => void;
  isSelected: boolean;
}
