import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import Lion from '../../assets/svg/AnimatedLion';
import {translation} from '@tandem/utils/methods';

const RNParentProfile = ({height, width}: {height: number; width: number}) => {
  return (
    <View style={styles.container}>
      <Lion height={height} width={width} />
      <RNTextComponent style={styles.name} isMedium>
        {translation('DAD')}
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;
