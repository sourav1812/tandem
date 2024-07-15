import React from 'react';
import {View, ViewStyle} from 'react-native';

export interface Props {
  children: any;
  style?: ViewStyle;
  statusBarBgc?: string;
  giveStatusColor?: boolean;
  ref?: React.LegacyRef<View>;
}
