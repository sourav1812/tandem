import {View, Image, ImageStyle, StyleProp} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {KidsProfileProps} from './interface';

const RNKidsProfile = ({
  style,
  data,
  imageUrl,
}: {
  style: StyleProp<ImageStyle>;
  data: KidsProfileProps;
  imageUrl: string;
}) => {
  return (
    <View style={styles.container}>
      <Image source={imageUrl} style={[styles.profile, style]} />
      <RNTextComponent style={styles.name} isMedium>
        {data && data?.name}
      </RNTextComponent>
    </View>
  );
};

export default RNKidsProfile;
