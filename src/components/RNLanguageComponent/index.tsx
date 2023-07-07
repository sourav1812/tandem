import {View} from 'react-native';
import React from 'react';
import {LanguageComponentProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';

const RNLanguageComponent = ({
  customStyle,
  title,
  flag,
}: LanguageComponentProps) => {
  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <RNTextComponent style={styles.flag}>
        {flag}
        {'  '}
      </RNTextComponent>
      <RNTextComponent style={styles.label}>{title}</RNTextComponent>
    </View>
  );
};

export default RNLanguageComponent;
