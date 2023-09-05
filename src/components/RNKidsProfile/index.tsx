import {View, Image, ImageStyle, StyleProp} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {KidsProfileProps} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNKidsProfile = ({
  style,
  data,
  avatar,
}: {
  style: StyleProp<ImageStyle>;
  data: KidsProfileProps;
  avatar: string;
}) => {
  const avatars = useAppSelector(state => state.cache.avatars);
  const filePath = avatars.filter(obj => obj.path === avatar)[0]?.file;
  return (
    <View style={styles.container}>
      <Image
        source={{uri: filePath || avatar}}
        style={[styles.profile, style]}
      />
      <RNTextComponent style={styles.name} isMedium>
        {data && data?.name}
      </RNTextComponent>
    </View>
  );
};

export default RNKidsProfile;
