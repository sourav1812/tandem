import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import Lion from '../../assets/svg/AnimatedLion';
import {RNParentProfileProp} from './interface';

const RNParentProfile = ({
  height,
  width,
  data,
}: {
  height: number;
  width: number;
  data: RNParentProfileProp;
}) => {
  return (
    <View style={styles.container}>
      <Lion height={height} width={width} />
      <RNTextComponent style={styles.name} isMedium>
        {data && data.name}
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;
