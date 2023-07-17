import {View} from 'react-native';
import React from 'react';
import {Props} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import themeColor from '@tandem/theme/themeColor';

const RNNumericBulletin = ({customStyle, heading, selected}: Props) => {
  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <View
        style={[styles.content, selected && {backgroundColor: themeColor.gold}]}
      />
      {selected && (
        <View
          style={[
            styles.circle,
            selected && {backgroundColor: themeColor.gold},
          ]}>
          <RNTextComponent isSemiBold style={styles.text}>
            {heading}
          </RNTextComponent>
        </View>
      )}
    </View>
  );
};

export default RNNumericBulletin;
