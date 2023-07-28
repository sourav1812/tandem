import {View, StatusBar} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';

const RNScreenWrapper = ({
  children,
  style,
  statusBarBgc = 'transparent',
}: Props) => {
  return (
    <View style={[styles.container, style && style]}>
      <StatusBar
        translucent
        backgroundColor={statusBarBgc}
        hidden={false}
        showHideTransition={'slide'}
      />
      {children}
    </View>
  );
};

export default RNScreenWrapper;
