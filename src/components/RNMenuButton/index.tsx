import {Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {MenuButtonProps} from './interface';
import RightArrow from '@tandem/assets/svg/RightBlueArrow';
import RNTextComponent from '../RNTextComponent';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const RNMenuButton = ({
  title,
  customStyle,
  isDisabled = false,
  onPress,
  isSemiBold,
}: MenuButtonProps) => {
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(1.1, {duration: 200}),
      withTiming(1),
    );
  };

  return (
    <Pressable
      disabled={isDisabled}
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
          customStyle && customStyle,
          {
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}>
        <RNTextComponent isSemiBold={isSemiBold} style={styles.text}>
          {title}
        </RNTextComponent>
        <RightArrow color={isDisabled ? '#EEEEEE' : ''} />
      </Animated.View>
    </Pressable>
  );
};

export default RNMenuButton;
