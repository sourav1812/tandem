/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Props} from './interface';
import {scale} from 'react-native-size-matters';
import Animated from 'react-native-reanimated';

const RNTextComponent = ({
  props,
  children,
  style,
  isBold,
  isMedium,
  isSemiBold,
  numberOfLines,
  handleOnPress,
}: Props) => {
  return (
    <Animated.Text
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        isMedium && {
          fontSize: scale(16),
          fontFamily: 'Poppins-Medium',
        },
        isSemiBold && {fontSize: scale(16), fontFamily: 'Poppins-SemiBold'},
        isBold && {fontSize: scale(16), fontFamily: 'Poppins-Bold'},
        style && style,
      ]}
      onPress={handleOnPress}
      {...props}>
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: scale(14),
    flexShrink: 1,
  },
});

export default RNTextComponent;
