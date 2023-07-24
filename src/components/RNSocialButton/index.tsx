/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import themeColor from '@tandem/theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNSocialButton = ({
  props,
  customStyle,
  title,
  onClick,
  textStyle,
  icon,
}: Props) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  return (
    <Pressable
      style={[
        styles.container,
        isTablet && {maxHeight: 55},
        customStyle && customStyle,
      ]}
      {...props}
      onPress={onClick}>
      {icon}
      <RNTextComponent
        isSemiBold
        style={[
          styles.text,
          {
            fontSize: isTablet ? 16 : verticalScale(14),
          },
          textStyle && textStyle,
        ]}>
        {title}
      </RNTextComponent>
    </Pressable>
  );
};

export default RNSocialButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: verticalScale(48),
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: themeColor.themeBlue,
    backgroundColor: themeColor.white,
  },
  text: {
    fontSize: verticalScale(14),
    color: themeColor.black,
    marginLeft: 8,
  },
});
