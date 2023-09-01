import {StyleProp, View, Image, ImageStyle} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {RNParentProfileProp} from './interface';

const RNParentProfile = ({
  avatar,
  data,
  custumStyle,
}: {
  avatar: string;
  data: RNParentProfileProp;
  custumStyle?: StyleProp<ImageStyle>;
}) => {
  console.log(data, 'RNParentProfileProp');
  return (
    <View style={styles.container}>
      <Image
        source={{uri: avatar}}
        style={[styles.profile, custumStyle && custumStyle]}
        borderRadius={100}
      />
      <RNTextComponent style={[styles.name]} isMedium>
        {data && data?.role}
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;
