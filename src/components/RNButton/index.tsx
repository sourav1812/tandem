/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import themeColor from '@tandem/theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNButton = ({
  props,
  customStyle,
  onlyBorder,
  title,
  buttonColor,
  noBorderRadius,
  onClick,
  onlyIcon,
  IconButtoncustomStyle,
  icon,
  textStyle,
  isDisabled = false,
  ref,
  onLayout,
}: Props) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const isButtonDisabled = useAppSelector(
    state => state.activityIndicator.isButtonDisabled,
  );
  const [pressed, setPressed] = React.useState(false);
  const disabled = isDisabled || isButtonDisabled;

  const handlePress = async () => {
    if (pressed) return;
    setPressed(true);
    await onClick();
    setPressed(false);
  };

  return (
    <>
      {!onlyIcon ? (
        <Pressable
          ref={ref && ref}
          onLayout={onLayout && onLayout}
          style={[
            styles.container,
            {
              ...(buttonColor && {
                borderColor: buttonColor,
                backgroundColor: buttonColor,
              }),
            },
            {...(onlyBorder && {backgroundColor: 'white'})},
            {...(noBorderRadius && {borderRadius: 0})},
            isTablet && {maxHeight: 55},
            customStyle && customStyle,
          ]}
          disabled={disabled}
          {...props}
          onPress={handlePress}>
          {isButtonDisabled && pressed ? (
            <ActivityIndicator
              style={{marginHorizontal: 15}}
              color={
                onlyBorder
                  ? buttonColor || themeColor.themeBlue
                  : themeColor.white
              }
            />
          ) : (
            <RNTextComponent
              isSemiBold
              style={[
                {
                  textAlign: 'center',
                  fontSize: isTablet ? 16 : verticalScale(14),
                  color: themeColor.white,
                  ...(onlyBorder && {
                    color: buttonColor || themeColor.themeBlue,
                  }),
                },
                textStyle && textStyle,
              ]}>
              {title}
            </RNTextComponent>
          )}
        </Pressable>
      ) : (
        <Pressable
          ref={ref && ref}
          onLayout={onLayout && onLayout}
          style={[
            styles.iconContainer,
            IconButtoncustomStyle && IconButtoncustomStyle,
          ]}
          {...props}
          onPress={handlePress}>
          {isButtonDisabled && pressed ? (
            <ActivityIndicator
              color={
                onlyBorder
                  ? buttonColor || themeColor.themeBlue
                  : themeColor.white
              }
            />
          ) : (
            icon
          )}
        </Pressable>
      )}
    </>
  );
};

export default RNButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: verticalScale(48),
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: themeColor.themeBlue,
    backgroundColor: themeColor.themeBlue,
  },
  iconContainer: {
    borderRadius: verticalScale(12),
    backgroundColor: '#F1F4F9',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(36),
    width: verticalScale(36),
  },
});
