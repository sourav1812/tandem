import {View} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';
import statusbar from '@tandem/functions/statusbar';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNScreenWrapper = ({children, style, giveStatusColor = false}: Props) => {
  const tooltipFromRedux = useAppSelector(state => state.tooltipReducer);
  const toShowAllTooltip = Object.values(tooltipFromRedux).every(
    value => value,
  );

  statusbar(
    giveStatusColor || !toShowAllTooltip
      ? themeColor.tooltipBgcColor
      : undefined,
  );

  return <View style={[styles.container, style && style]}>{children}</View>;
};

export default RNScreenWrapper;
