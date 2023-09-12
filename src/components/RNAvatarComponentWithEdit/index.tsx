import {ImageBackground, Pressable} from 'react-native';
import React from 'react';
import {avatarComponentProps} from './interface';
import {styles} from './styles';
import GrayCamera from '@tandem/assets/svg/CameraGray';
import Camera from '@tandem/assets/svg/Camera';

const RNAvatarComponentWithEdit = ({
  icon,
  customStyle,
  imgStyle,
  onEdit,
  onSelect,
  isImageFromPicker = false,
}: avatarComponentProps) => {
  return icon.uri !== null ? (
    <Pressable onPress={onSelect} style={[imgStyle && imgStyle]}>
      <ImageBackground source={icon} style={[styles.img]} resizeMode="cover">
        {isImageFromPicker && (
          <Pressable onPress={onEdit} style={styles.icon}>
            <GrayCamera height={20} width={24} />
          </Pressable>
        )}
      </ImageBackground>
    </Pressable>
  ) : (
    <Pressable
      style={[styles.container, customStyle && customStyle]}
      onPress={onEdit}>
      <Camera />
    </Pressable>
  );
};

export default RNAvatarComponentWithEdit;
