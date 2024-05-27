import {Pressable, Text} from 'react-native';
import React from 'react';
import {IconProps, Props} from './interface';
import {styles} from './styles';
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
  halfRotationDuration = 0,
}: Props) => {
  const scaleButton = useSharedValue(1);
  const rotation = useSharedValue('180deg');
  const [isSelectedAnimation, setSelectedAnimation] = React.useState(
    !!isSelected,
  );

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(0.9, {duration: 200}),
      withTiming(1),
    );
  };
  const runRotation = (toggle: boolean) => {
    rotation.value = withSequence(
      withTiming('90deg', {duration: halfRotationDuration}),
      withTiming(toggle ? '0deg' : '180deg', {duration: halfRotationDuration}),
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      setSelectedAnimation(!!isSelected);
    }, halfRotationDuration);
    runRotation(!!isSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        if (disabled) {
          return;
        }
        if (!mask) {
          runAnimation();
        }
        onPress();
      }}>
      <Animated.View
        ref={ref && ref}
        onLayout={onLayout && onLayout}
        style={[
          styles.container,
          {
            transform: [
              {scale: scaleButton},
              {rotateY: mask ? rotation : '0deg'},
            ],
          },
          customStyle && customStyle,
          {
            ...(isSelectedAnimation &&
              bgcColor && {
                backgroundColor: bgcColor,
                borderWidth: showBorderWhenPressed ? 3 : 0,
                borderColor: themeColor.themeBlue,
              }),
            backgroundColor: mask
              ? isSelectedAnimation
                ? bgcColor
                : 'purple'
              : isSelectedAnimation
              ? bgcColor
              : themeColor.lightGray,
          },
        ]}>
        {mask && !isSelectedAnimation ? null : (
          <IconRednerItem
            icon={icon}
            heading={heading}
            isSelected={isSelectedAnimation}
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
          {height: verticalScale(65), width: verticalScale(65)},
        ]}
      />
    )}
    {heading && (
      <Text
        style={[
          styles.heading,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            fontSize: verticalScale(13),
            color: !isSelected ? 'gray' : 'white',
            fontFamily: 'Poppins-SemiBold',
          },
        ]}>
        {heading}
      </Text>
    )}
  </>
);
