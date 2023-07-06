import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Props} from './interface';
import {scale} from 'react-native-size-matters';

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
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.text,

        isMedium && {
          fontSize: 16,
          fontFamily: 'Poppins-Medium',
        },
        isSemiBold && {fontSize: 16, fontFamily: 'Poppins-SemiBold'},
        isBold && {fontSize: 14, fontFamily: 'Poppins-Bold'},
        style && style,
      ]}
      onPress={handleOnPress}
      {...props}>
      {children}
    </Text>
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
