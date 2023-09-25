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
}: Props) => {
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(1.2, {duration: 200}),
      withTiming(1),
    );
  };

  return (
    <Pressable
      onPress={() => {
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
            ...(isSelected && bgcColor && {backgroundColor: bgcColor}),
          },
        ]}>
        <IconRednerItem
          icon={icon}
          heading={heading}
          isSelected={isSelected}
          emoji={emoji}
          Svgimg={Svgimg}
        />
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
    {heading && isSelected && (
      <RNTextComponent
        style={[
          styles.heading,
          {
            fontSize:
              heading.split(' ').length > 1
                ? verticalScale(15)
                : verticalScale(16),
          },
        ]}
        isSemiBold>
        {heading.split(' ').join('\n')}
      </RNTextComponent>
    )}
  </>
);
