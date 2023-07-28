import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import Lion from '../../assets/svg/AnimatedLion';
import {verticalScale} from 'react-native-size-matters';
import {ParentProfileProps} from './interface';

const RNParentProfile = ({data}: ParentProfileProps) => {
  return (
    <View style={styles.container}>
      <Lion height={verticalScale(105)} width={verticalScale(90)} />
      <RNTextComponent style={styles.name} isMedium>
        {data && data.name}
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;
