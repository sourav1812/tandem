import {View, StatusBar} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';

const RNScreenWrapper = ({children, style, giveStatusColor = false}: Props) => {
  return (
    <View style={[styles.container, style && style]}>
      <StatusBar
        translucent
        backgroundColor={giveStatusColor ? '#000000CC' : 'transparent'}
        hidden={false}
        showHideTransition={'slide'}
      />
      {children}
    </View>
  );
};

export default RNScreenWrapper;
