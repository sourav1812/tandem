import {StyleProp, Image, ImageStyle} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {RNParentProfileProp} from './interface';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import FastImage from 'react-native-fast-image';

const RNParentProfile = ({
  avatar,
  data,
  custumStyle,
}: {
  avatar: string;
  data: RNParentProfileProp;
  custumStyle?: StyleProp<ImageStyle>;
}) => {
  const opacity = useSharedValue(0);

  const runAnimation = () => {
    opacity.value = withTiming(1, {duration: 600});
  };

  useEffect(() => {
    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avatars = useAppSelector(state => state.cache.avatars);
  const filePath = avatars.filter(obj => obj.path === avatar)[0]?.file;
  return (
    <Animated.View style={[styles.container, {opacity: opacity}]}>
      <FastImage
        onProgress={() => {
          console.log('Loading...');
        }}
        source={{uri: filePath || avatar, priority: FastImage.priority.high}}
        style={[styles.profile, custumStyle && custumStyle]}
        // borderRadius={200}
      />
      <RNTextComponent style={[styles.name]} isMedium>
        {data && data?.role}
      </RNTextComponent>
    </Animated.View>
  );
};

export default RNParentProfile;
