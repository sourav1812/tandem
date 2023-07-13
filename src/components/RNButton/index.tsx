/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import themeColor from '@tandem/theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';

const RNButton = ({
  props,
  customStyle,
  onlyBorder,
  title,
  buttonColor,
  noBorderRadius,
  onClick,
  onlyIcon,
  IconButtoncustomStyle,
  icon,
  textStyle,
}: Props) => {
  const isTablet = checkIfTablet();
  return (
    <>
      {!onlyIcon ? (
        <Pressable
          style={[
            styles.container,
            {
              ...(buttonColor && {
                borderColor: buttonColor,
                backgroundColor: buttonColor,
              }),
            },
            {...(onlyBorder && {backgroundColor: 'white'})},
            {...(noBorderRadius && {borderRadius: 0})},
            isTablet && {maxHeight: 55},
            customStyle && customStyle,
          ]}
          {...props}
          onPress={onClick}>
          <RNTextComponent
            isSemiBold
            style={[
              {
                textAlign: 'center',
                fontSize: isTablet ? 16 : verticalScale(14),
                color: themeColor.white,
                ...(onlyBorder && {color: buttonColor || themeColor.themeBlue}),
              },
              textStyle && textStyle,
            ]}>
            {title}
          </RNTextComponent>
        </Pressable>
      ) : (
        <Pressable
          style={[
            styles.iconContainer,
            IconButtoncustomStyle && IconButtoncustomStyle,
          ]}
          {...props}
          onPress={onClick}>
          {icon}
        </Pressable>
      )}
    </>
  );
};

export default RNButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    // maxHeight: 52,
    height: verticalScale(48),
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: themeColor.themeBlue,
    backgroundColor: themeColor.themeBlue,
  },
  iconContainer: {
    borderRadius: verticalScale(12),
    backgroundColor: '#F1F4F9',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(36),
    width: verticalScale(36),
  },
});
