import {Pressable, Text} from 'react-native';
import React, {useState} from 'react';
import {Props} from './interface';
import {styles} from './styles';
import RNTextComponent from '@components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';

const RNEmojiWithText = ({
  props,
  customStyle,
  heading,
  emoji,
  showText,
  icon,
  bgcColor,
}: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Pressable
      style={[
        styles.container,
        customStyle && customStyle,
        {
          ...((showText || isSelected) &&
            bgcColor && {backgroundColor: bgcColor}),
        },
      ]}
      {...props}
      onPress={() => {
        setIsSelected(!isSelected);
      }}>
      <Text
        style={[
          styles.emoji,
          {...((showText || isSelected) && {fontSize: verticalScale(33)})},
          emoji && emoji,
        ]}>
        {icon}
      </Text>
      {showText ||
        (isSelected && (
          <RNTextComponent style={styles.heading} isSemiBold numberOfLines={2}>
            {heading}
          </RNTextComponent>
        ))}
    </Pressable>
  );
};

export default RNEmojiWithText;
