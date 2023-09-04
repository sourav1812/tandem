import {Pressable, Text} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';

const RNEmojiWithText = ({
  props,
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
  return (
    <Pressable
      ref={ref && ref}
      onLayout={onLayout && onLayout}
      style={[
        styles.container,
        customStyle && customStyle,
        {
          ...(isSelected && bgcColor && {backgroundColor: bgcColor}),
        },
      ]}
      {...props}
      onPress={() => {
        onPress();
      }}>
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
            isSelected && {height: verticalScale(45), width: verticalScale(45)},
          ]}
        />
      )}
      {heading && isSelected && (
        <RNTextComponent style={styles.heading} isSemiBold numberOfLines={2}>
          {heading}
        </RNTextComponent>
      )}
    </Pressable>
  );
};

export default RNEmojiWithText;
