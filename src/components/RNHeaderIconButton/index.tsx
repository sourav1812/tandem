import { View, Text, Pressable, TextComponent } from 'react-native';
import React from 'react';
import RNTextComponent from '../RNTextComponent';
import { Props } from './interface';
import { styles } from './styles';


const RNHeaderIconButton = ({ props, customStyle, textStyle, label , onClick }: Props) => {
  return (
    <Pressable style={[styles.container, (customStyle  && customStyle)]} {...props} onPress={onClick}    >
      <RNTextComponent isMedium style={{ ...styles.text, ...(textStyle as Object) }} >
        {label}
      </RNTextComponent>
    </Pressable >
  )
};

export default RNHeaderIconButton;
