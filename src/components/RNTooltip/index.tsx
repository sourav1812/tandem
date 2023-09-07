/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {TooltipProps} from './interface';
import {scale} from 'react-native-size-matters';
import RNTextComponent from '../RNTextComponent';
import {Platform, StatusBar, View} from 'react-native';
import {getValueFromKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/local';
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
  topViewStyle,
  isTablet,
  placement,
}: TooltipProps) => {
  const tooltipNumber = getValueFromKey(TOOLTIP);
  const helperTop = tooltipHelperTop(dimensionObject);
  const helperBottom = tooltipHelperBottom(dimensionObject);

  return (
    <Tooltip
      allowChildInteraction={false}
      isVisible={tooltipNumber?.length < 15 ? open : false}
      content={
        <View style={[topViewStyle && topViewStyle]}>
          {helperTop && (
            <RNArrowIconTop
              rotation={rotation}
              type={top ? top : helperTop}
              isTablet={isTablet}
            />
          )}
          <View style={[textContainerStyle && textContainerStyle]}>
            <RNTextComponent
              isSemiBold
              style={[
                {
                  color: 'white',
                  fontSize: scale(18),
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
              isTablet={isTablet}
            />
          )}
        </View>
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
        },
        mainStyle && mainStyle,
      ]}
      placement={placement ? placement : helperBottom ? 'top' : 'bottom'}
      topAdjustment={
        Platform.OS === 'android' ? -(StatusBar.currentHeight || 0) : 0
      }
      onClose={setClose}>
      {children}
    </Tooltip>
  );
};

export default RNTooltip;
