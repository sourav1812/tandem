import {ViewStyle, StyleProp, TextStyle, LayoutChangeEvent} from 'react-native';

export interface Props {
  customStyle?: StyleProp<ViewStyle>;
  heading?: string;
  emoji?: StyleProp<TextStyle>;
  icon?: string | undefined;
  bgcColor: string;
  ref?: any;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  onPress?: () => void;
  isSelected?: boolean;
  Svgimg?: any;
  image?: any;
  showBorderWhenPressed?: boolean;
  mask?: boolean;
  disabled?: boolean;
  halfRotationDuration?: number;
}

export interface IconProps {
  icon: string | undefined;
  heading?: string;
  isSelected?: boolean;
  emoji?: StyleProp<TextStyle>;
  Svgimg?: any;
}
