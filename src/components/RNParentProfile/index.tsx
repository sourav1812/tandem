import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import Lion from '../../assets/svg/AnimatedLion';
import {verticalScale} from 'react-native-size-matters';

const RNParentProfile = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.profile}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxQ0jO56vMAhn2sjpMZWA-qz2Rjd6SXG_Dg1uOmuTOclXebhcrd9FZY0xIbzoXETQ4uE&usqp=CAU',
        }}
      /> */}
      <Lion height={verticalScale(105)} width={verticalScale(90)} />
      <RNTextComponent style={styles.name} isMedium>
        Dad
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;
