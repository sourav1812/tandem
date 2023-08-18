import {View, Image, ImageStyle, StyleProp} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {KidsProfileProps} from './interface';
import {avatarArray} from '@tandem/screens/CreateChildProfile/interface';

const RNKidsProfile = ({
  style,
  data,
  imageIndex,
}: {
  style: StyleProp<ImageStyle>;
  data: KidsProfileProps;
  imageIndex: number;
}) => {
  console.log(data, 'imageIndeximageIndexasasass');
  return (
    <View style={styles.container}>
      <Image
        source={
          avatarArray[imageIndex]?.icon || {
            uri: data.imageUrl,
          }
        }
        style={[styles.profile, style]}
      />
      <RNTextComponent style={styles.name} isMedium>
        {data && data?.name}
      </RNTextComponent>
    </View>
  );
};

export default RNKidsProfile;
