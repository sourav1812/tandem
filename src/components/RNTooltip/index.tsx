/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import {TooltipProps} from './interface';
import {scale} from 'react-native-size-matters';
import RNTextComponent from '../RNTextComponent';
import {Platform, StatusBar, View} from 'react-native';

import {
  tooltipHelperBottom,
  tooltipHelperTop,
} from '@tandem/helpers/tooltipHelper';
import RNArrowIconTop from '../RNArrowIconTop';
import RNArrowIconBottom from '../RNArrowIconBottom';
import {
  changeTooltipState,
  changeTooltipStatePlusONe,
} from '@tandem/redux/slices/tooltip.slice';
import wait from '@tandem/functions/wait';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import statusbar from '@tandem/functions/statusbar';
import themeColor from '@tandem/theme/themeColor';

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
  useWait,
}: TooltipProps) => {
  const dispatch = useDispatch();
  const token = useAppSelector(state => state.tokenReducer.token);
  const helperTop = top ? top : tooltipHelperTop(dimensionObject);
  const helperBottom = bottom ? bottom : tooltipHelperBottom(dimensionObject);
  const tooltipFromRedux = useAppSelector(state => state.tooltipReducer);
  const toShowAllTooltip = Object.values(tooltipFromRedux).every(
    value => value,
  );

  useEffect(() => {
    if (toShowAllTooltip) return;
    if (!open) return;
    if (open && tooltipFromRedux?.[open]) return;
    if (!token || token === '') return;
    statusbar(themeColor.tooltipBgcColor);
    return () => {
      statusbar(undefined);
    };
  }, [open, toShowAllTooltip, token, tooltipFromRedux]);

  return (
    <Tooltip
      allowChildInteraction={false}
      isVisible={
        !toShowAllTooltip
          ? open
            ? tooltipFromRedux?.[open]
              ? false
              : true
            : false
          : false
      }
      content={
        <View style={[topViewStyle && topViewStyle]}>
          {helperTop && (
            <RNArrowIconTop
              rotation={rotation}
              type={helperTop}
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
              type={helperBottom}
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
      onClose={
        setClose
          ? setClose
          : async () => {
              dispatch(changeTooltipState(open));
              if (useWait) {
                await wait(200);
              }
              dispatch(changeTooltipStatePlusONe(open));
            }
      }>
      {children}
    </Tooltip>
  );
};

export default RNTooltip;
