import {Pressable, Image} from 'react-native';
import React from 'react';
import {avatarComponentProps} from './interface';
import {styles} from './styles';

const RNAvatarComponent = ({
  icon,
  customStyle,
  imgStyle,
  pressableDisable,
  onPress,
}: avatarComponentProps) => {
  return (
    <Pressable
      style={[styles.container, customStyle && customStyle]}
      disabled={pressableDisable}
      onPress={onPress}>
      <Image
        source={{uri: icon}}
        style={[styles.img, imgStyle && imgStyle]}
        // resizeMode="contain"
      />
    </Pressable>
  );
};

export default RNAvatarComponent;
