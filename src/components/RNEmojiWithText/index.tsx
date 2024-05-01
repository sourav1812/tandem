import {Pressable, Text} from 'react-native';
import React from 'react';
import {IconProps, Props} from './interface';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import themeColor from '@tandem/theme/themeColor';

const RNEmojiWithText = ({
  customStyle,
  heading,
  emoji,
  icon,
  bgcColor,
  ref,
  onLayout,
  onPress = () => {},
  isSelected,
  Svgimg,
  showBorderWhenPressed = false,
  mask,
  disabled,
}: Props) => {
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(0.9, {duration: 200}),
      withTiming(1),
    );
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        if (disabled) {
          return;
        }
        runAnimation();
        onPress();
      }}>
      <Animated.View
        ref={ref && ref}
        onLayout={onLayout && onLayout}
        style={[
          styles.container,
          {transform: [{scale: scaleButton}]},
          customStyle && customStyle,
          {
            ...(isSelected &&
              bgcColor && {
                backgroundColor: bgcColor,
                borderWidth: showBorderWhenPressed ? 3 : 0,
                borderColor: themeColor.themeBlue,
              }),
            backgroundColor: mask
              ? isSelected
                ? bgcColor
                : 'purple'
              : isSelected
              ? bgcColor
              : themeColor.lightGray,
          },
        ]}>
        {mask && !isSelected ? null : (
          <IconRednerItem
            icon={icon}
            heading={heading}
            isSelected={isSelected}
            emoji={emoji}
            Svgimg={Svgimg}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

export default RNEmojiWithText;

const IconRednerItem = ({
  icon,
  heading,
  isSelected,
  emoji,
  Svgimg,
}: IconProps) => (
  <>
    {icon ? (
      <Text
        style={[
          styles.emoji,
          {...(heading && isSelected && {fontSize: verticalScale(33)})},
          emoji && emoji,
        ]}>
        {icon}
      </Text>
    ) : (
      <Svgimg
        style={[
          styles.svgIcon,
          isSelected &&
            (heading && heading.split(' ').length > 1
              ? {
                  height: verticalScale(55),
                  width: verticalScale(55),
                }
              : {height: verticalScale(65), width: verticalScale(65)}),
        ]}
      />
    )}
    {heading && (
      <RNTextComponent
        style={[
          styles.heading,
          {
            fontSize: verticalScale(16) - heading.split(' ').length * 1.2,
            color: !isSelected ? 'gray' : 'white',
          },
        ]}
        isSemiBold>
        {heading}
        {/* {heading.split(' ').join('\n')} */}
      </RNTextComponent>
    )}
  </>
);
