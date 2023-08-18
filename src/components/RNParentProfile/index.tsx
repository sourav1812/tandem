import {StyleProp, TextStyle, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import Lion from '../../assets/svg/AnimatedLion';
import {RNParentProfileProp} from './interface';

const RNParentProfile = ({
  height,
  width,
  data,
  custumStyle,
}: {
  height: number;
  width: number;
  data: RNParentProfileProp;
  custumStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <View style={styles.container}>
      <Lion height={height} width={width} />
      <RNTextComponent style={[styles.name, custumStyle]} isMedium>
        {data && data?.name}
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;
