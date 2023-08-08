/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {TooltipProps} from './interface';
import {scale} from 'react-native-size-matters';
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
  textContainerStyle,
  textStyle,
  mainStyle,
  top,
  bottom,
  dimensionObject,
  rotation,
}: TooltipProps) => {
  const tooltipNumber = getValueFromKey(TOOLTIP);
  const helperTop = tooltipHelperTop(dimensionObject);
  const helperBottom = tooltipHelperBottom(dimensionObject);

  return (
    <Tooltip
      isVisible={tooltipNumber.length < 14 ? open : false}
      content={
        <>
          {helperTop && (
            <RNArrowIconTop rotation={rotation} type={top ? top : helperTop} />
          )}
          <View style={[textContainerStyle && textContainerStyle]}>
            <RNTextComponent
              isSemiBold
              style={[
                {
                  color: 'white',
                  fontSize: scale(20),
                  textAlign: 'center',
                },
                textStyle && textStyle,
              ]}>
              {text}
            </RNTextComponent>
          </View>
          {helperBottom && (
            <RNArrowIconBottom
              rotation={rotation}
              type={bottom ? bottom : helperBottom}
            />
          )}
        </>
      }
      backgroundColor="#000000CC"
      disableShadow
      contentStyle={[
        {
          backgroundColor: 'transparent',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -10,
        },
        mainStyle && mainStyle,
      ]}
      placement={helperBottom ? 'top' : 'bottom'}
      topAdjustment={
        Platform.OS === 'android' ? -(StatusBar.currentHeight || 0) : 0
      }
      onClose={setClose}>
      {children}
    </Tooltip>
  );
};

export default RNTooltip;
