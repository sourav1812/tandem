import {Image, ImageStyle, StyleProp} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {KidsProfileProps} from './interface';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const RNKidsProfile = ({
  style,
  data,
  avatar,
}: {
  style: StyleProp<ImageStyle>;
  data: KidsProfileProps;
  avatar: string;
}) => {
  const opacity = useSharedValue(0);

  const runAnimation = () => {
    opacity.value = withTiming(1, {duration: 500});
  };

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: opacity}]}>
      <Image source={{uri: avatar}} style={[styles.profile, style]} />
      <RNTextComponent style={styles.name} isMedium>
        {data && data?.name}
      </RNTextComponent>
    </Animated.View>
  );
};

export default RNKidsProfile;
