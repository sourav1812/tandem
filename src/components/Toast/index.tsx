/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useRef} from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Animated, Easing} from 'react-native';
import {Props} from './interface';
import themeColor from '@tandem/theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import {styles} from './styles';
const Toast = ({message, setMessage}: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (message) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          delay: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.linear),
        }).start(() => setMessage(''));
      });
    }
  }, [message, opacity]);
  if (!message) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.black,
          opacity: opacity,
          bottom: verticalScale(150),
        },
      ]}>
      <RNTextComponent
        style={{
          fontSize: verticalScale(12),
          color: themeColor.white,
          textTransform: 'capitalize',
          textAlign: 'center',
        }}
        isMedium>
        {message}
      </RNTextComponent>
    </Animated.View>
  );
};
export default Toast;
