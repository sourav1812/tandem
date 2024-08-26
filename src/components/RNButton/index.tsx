/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import themeColor from '@tandem/theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Audio} from 'expo-av';
import SO_button_click from '@tandem/assets/appInteraction/SO_button_click.mp3';
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
  loadPercentage,
  pressableStyle = {},
  onLayout,
  hitSlop,
  SoundObject,
  enlargeAnimation,
}: Props) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const isButtonDisabled = useAppSelector(
    state => state.activityIndicator.isButtonDisabled,
  );
  const [pressed, setPressed] = React.useState(false);
  const disabled = isDisabled || isButtonDisabled;
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    if (enlargeAnimation) {
      scaleButton.value = withSequence(withTiming(1.5), withTiming(1));
      return;
    }
    scaleButton.value = withSequence(withTiming(0.9), withTiming(1));
  };
  const handlePress = async () => {
    if (pressed || disabled) {
      return;
    }
    setPressed(true);
    await onClick();
  };

  const handlePressIn = async () => {
    if (disabled) {
      return;
    }
    Keyboard.dismiss();
    runAnimation();
    if (pressed) {
      return;
    }
    const {sound} = await Audio.Sound.createAsync(
      SoundObject || SO_button_click,
    );
    await sound.playAsync();
    setTimeout(async () => {
      await sound.unloadAsync();
      setPressed(false);
    }, 1500);
  };

  return (
    <>
      {!onlyIcon ? (
        <Pressable
          style={[pressableStyle && pressableStyle]}
          disabled={disabled}
          {...props}
          onLongPress={runAnimation}
          hitSlop={hitSlop}
          onPressIn={handlePressIn}
          onPress={() => {
            if (handlePress) {
              handlePress();
            }
          }}>
          <Animated.View
            ref={ref && ref}
            onLayout={onLayout && onLayout}
            style={[
              styles.container,
              {transform: [{scale: scaleButton}]},
              {
                ...(buttonColor && {
                  borderColor: buttonColor,
                  backgroundColor: buttonColor,
                }),
              },
              {...(onlyBorder && {backgroundColor: 'white'})},
              {...(noBorderRadius && {borderRadius: 0})},
              isTablet && {maxHeight: verticalScale(35)},
              customStyle && customStyle,
            ]}>
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
                    fontSize: verticalScale(14),
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
            {loadPercentage !== undefined && (
              <View
                style={{
                  width: `${100 - loadPercentage}%`,
                  height: '100%',
                  backgroundColor: '#00000088',
                  zIndex: -3,
                  position: 'absolute',
                  alignSelf: 'flex-end',
                }}
              />
            )}
          </Animated.View>
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
