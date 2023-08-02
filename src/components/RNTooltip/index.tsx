/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {TooltipProps} from './interface';
import {verticalScale} from 'react-native-size-matters';
import RNTextComponent from '../RNTextComponent';
import {Platform, StatusBar, View} from 'react-native';
import {getValueFromKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import {
  tooltipHelperBottom,
  tooltipHelperTop,
} from '@tandem/helpers/tooltipHelper';
import RNArrowIconTop from '../RNArrowIconTop';
import RNArrowIconBottom from '../RNArrowIconBottom';

const RNTooltip = ({
  children,
  open,
  setClose,
  text,
  top,
  textContainerStyle,
  textStyle,
  mainStyle,
  dimensionObject,
}: TooltipProps) => {
  const tooltipNumber = getValueFromKey(TOOLTIP);
  const helperTop = tooltipHelperTop(dimensionObject);
  const helperBottom = tooltipHelperBottom(dimensionObject);

  return (
    <Tooltip
      isVisible={tooltipNumber.length < 14 ? open : false}
      content={
        <>
          {helperTop && <RNArrowIconTop type={helperTop} />}
          <View style={[textContainerStyle && textContainerStyle]}>
            <RNTextComponent
              isSemiBold
              style={[
                {
                  color: 'white',
                  fontSize: verticalScale(20),
                  textAlign: 'center',
                },
                textStyle && textStyle,
              ]}>
              {text}
            </RNTextComponent>
          </View>
          {helperBottom && <RNArrowIconBottom type={helperBottom} />}
        </>
      }
      backgroundColor="#000000CC"
      disableShadow
      contentStyle={[
        {
          backgroundColor: 'transparent',
          width: 'auto',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -10,
        },
        mainStyle && mainStyle,
      ]}
      placement={top ? 'top' : 'bottom'}
      topAdjustment={
        Platform.OS === 'android' ? -(StatusBar.currentHeight || 0) : 0
      }
      onClose={setClose}>
      {children}
    </Tooltip>
  );
};

export default RNTooltip;
