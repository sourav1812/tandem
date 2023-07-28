import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {TooltipProps} from './interface';

const RNTooltip = ({children}: TooltipProps) => {
  return <Tooltip>{children}</Tooltip>;
};

export default RNTooltip;
