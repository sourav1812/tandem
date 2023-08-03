import {Pressable, Text} from 'react-native';
import React, {useState} from 'react';
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
}: Props) => {
  const [isSelected, setIsSelected] = useState(false);

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
        setIsSelected(!isSelected);
      }}>
      <Text
        style={[
          styles.emoji,
          {...(heading && isSelected && {fontSize: verticalScale(33)})},
          emoji && emoji,
        ]}>
        {icon}
      </Text>
      {heading && isSelected && (
        <RNTextComponent style={styles.heading} isSemiBold numberOfLines={2}>
          {heading}
        </RNTextComponent>
      )}
    </Pressable>
  );
};

export default RNEmojiWithText;
