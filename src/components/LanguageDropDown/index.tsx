import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNTextComponent from '../RNTextComponent';
import DownArrow from '@tandem/assets/svg/DownArrow';
import {verticalScale} from 'react-native-size-matters';

interface languageDropDownProp {
  heading: string;
  text: string;
  customStyle?: StyleProp<ViewStyle>;
  showIcon?: boolean;
  fadeText?: boolean;
  onPress?: () => void;
}

export const LanguageDropDown = ({
  heading,
  text,
  customStyle,
  showIcon = true,
  fadeText = false,
  onPress,
}: languageDropDownProp) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  return (
    <Pressable onPress={onPress}>
      <RNTextComponent
        style={[styles.dropdownBox, {fontSize: verticalScale(12)}]}>
        {heading}
      </RNTextComponent>
      <View
        style={[
          styles.dropdown,
          isTablet && {paddingVertical: verticalScale(10)},
          customStyle && customStyle,
        ]}>
        <RNTextComponent
          style={[
            {
              color: fadeText ? '#979797' : undefined,
              fontSize: verticalScale(12),
            },
          ]}>
          {text}
        </RNTextComponent>
        {showIcon && <DownArrow />}
      </View>
    </Pressable>
  );
};
