import {View} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';

const RNScreenWrapper = ({children, style, ref}: Props) => {
  return (
    <View style={[styles.container, style && style]} ref={ref}>
      {children}
    </View>
  );
};

export default RNScreenWrapper;
