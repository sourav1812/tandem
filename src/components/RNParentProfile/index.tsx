import {StyleProp, View, Image, ImageStyle} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {RNParentProfileProp} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNParentProfile = ({
  avatar,
  data,
  custumStyle,
}: {
  avatar: string;
  data: RNParentProfileProp;
  custumStyle?: StyleProp<ImageStyle>;
}) => {
  const avatars = useAppSelector(state => state.cache.avatars);
  const filePath = avatars.filter(obj => obj.path === avatar)[0]?.file;
  return (
    <View style={styles.container}>
      <Image
        source={{uri: filePath || avatar}}
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
