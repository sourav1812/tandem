import {Pressable, View} from 'react-native';
import React from 'react';
import {Props} from './interface';
import Bookmark from '@tandem/assets/svg/Bookmark';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import RNButton from '../RNButton';

const RNBookmarkComponent = ({
  props,
  customStyle,
  borderIconColor,
  iconBorder,
  heading,
  subHeading,
  showIcon = true,
  showSubheading = false,
  emoji,
  headingStyle,
  onPress,
  large,
}: Props) => {
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(withTiming(0.9), withTiming(1));
  };
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
          runAnimation();
        }
      }}
      onLongPress={runAnimation}>
      <Animated.View
        style={[
          styles.container,
          {transform: [{scale: scaleButton}]},
          {...(borderIconColor && {borderColor: borderIconColor})},
          {
            ...(showIcon &&
              !iconBorder && {
                backgroundColor: borderIconColor,
                paddingVertical: verticalScale(6),
              }),
          },
          {...(!showIcon && {justifyContent: 'center'})},
          {
            width: large ? 2 * verticalScale(140) + 10 : verticalScale(140),
            maxWidth: large ? 2 * verticalScale(190) + 10 : verticalScale(190),
          },
          customStyle && customStyle,
        ]}
        {...props}>
        {!showIcon ? (
          <>
            <View style={styles.icon}>
              <Bookmark fill={borderIconColor && borderIconColor} />
            </View>
            <RNTextComponent
              style={[styles.heading, headingStyle && headingStyle]}>
              {heading}
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.subHeading,
                {...(borderIconColor && {color: borderIconColor})},
              ]}>
              {subHeading}
            </RNTextComponent>
          </>
        ) : (
          !iconBorder && (
            <>
              <View style={styles.imgContainer}>
                {emoji && (
                  <RNTextComponent style={styles.img}>
                    {typeof emoji === 'string' ? emoji : null}
                  </RNTextComponent>
                )}
              </View>
              <RNTextComponent
                numberOfLines={2}
                isSemiBold
                style={[
                  styles.text2,
                  {marginTop: verticalScale(6)},
                  headingStyle && headingStyle,
                ]}>
                {heading}
              </RNTextComponent>
              {showSubheading && (
                <RNTextComponent
                  numberOfLines={1}
                  style={[styles.subHeading, {color: themeColor.white}]}>
                  {subHeading}
                </RNTextComponent>
              )}
            </>
          )
        )}
        {!showIcon ||
          (iconBorder && (
            <>
              <View
                style={[
                  styles.imgContainer,
                  {backgroundColor: themeColor.themeBlue},
                ]}>
                {emoji && (
                  <RNTextComponent style={styles.img}>
                    {typeof emoji === 'string' ? emoji : null}
                  </RNTextComponent>
                )}
              </View>
              <RNButton
                onClick={() => {}}
                title="Contact Us"
                pressableStyle={{width: '100%', padding: 16}}
                customStyle={{height: verticalScale(35)}}
              />
            </>
          ))}
      </Animated.View>
    </Pressable>
  );
};

export default RNBookmarkComponent;
