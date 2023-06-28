import {View, StatusBar, Dimensions} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';

const RNScreenWrapper = ({children, style}: Props) => {


  return (
    <View style={style || [styles.container]}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        hidden={false}
        showHideTransition={'slide'}
      />
      {children}
    </View>
  );
};

export default RNScreenWrapper;
