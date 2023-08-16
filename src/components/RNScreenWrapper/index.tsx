import {View} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';
import statusbar from '@tandem/functions/statusbar';
import themeColor from '@tandem/theme/themeColor';

const RNScreenWrapper = ({children, style, giveStatusColor = false}: Props) => {
  statusbar(giveStatusColor ? themeColor.tooltipBgcColor : undefined);
  return <View style={[styles.container, style && style]}>{children}</View>;
};

export default RNScreenWrapper;
