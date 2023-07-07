import {View, Image} from 'react-native';
import React from 'react';
import {characterProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';

const RNCharacterComponent = ({
  characterName,
  url,
  customStyle,
}: characterProps) => {
  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <Image source={url} style={styles.img} />
      <RNTextComponent style={styles.title} isSemiBold>
        {characterName}
      </RNTextComponent>
    </View>
  );
};

export default RNCharacterComponent;
