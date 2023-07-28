import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import Lion from '../../assets/svg/AnimatedLion';

const RNParentProfile = ({height, width}: {height: number; width: number}) => {
  return (
    <View style={styles.container}>
      <Lion height={height} width={width} />
      <RNTextComponent style={styles.name} isMedium>
        Dad
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;
