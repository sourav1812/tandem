import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {MenuButtonProps} from './interface';
import RightArrow from '@tandem/assets/svg/RightBlueArrow';
import RNTextComponent from '../RNTextComponent';

const RNMenuButton = ({title, customStyle}: MenuButtonProps) => {
  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <RNTextComponent style={styles.text}>{title}</RNTextComponent>
      <RightArrow />
    </View>
  );
};

export default RNMenuButton;
