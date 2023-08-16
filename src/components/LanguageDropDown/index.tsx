import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNTextComponent from '../RNTextComponent';
import DownArrow from '@tandem/assets/svg/DownArrow';
import {verticalScale} from 'react-native-size-matters';

interface languageDropDownProp {
  heading: string;
  text: string;
  customStyle: StyleProp<ViewStyle>;
}

export const LanguageDropDown = ({
  heading,
  text,
  customStyle,
}: languageDropDownProp) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  return (
    <View>
      <RNTextComponent
        style={[
          styles.dropdownBox,
          {fontSize: isTablet ? 16 : verticalScale(12)},
        ]}>
        {heading}
      </RNTextComponent>
      <View
        style={[
          styles.dropdown,
          isTablet && {paddingVertical: verticalScale(10)},
          customStyle && customStyle,
        ]}>
        <RNTextComponent style={[isTablet && {fontSize: 18}]}>
          {text}
        </RNTextComponent>
        <DownArrow />
      </View>
    </View>
  );
};
