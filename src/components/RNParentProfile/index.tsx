import {StyleProp, View, Image, ImageStyle} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {RNParentProfileProp} from './interface';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

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
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: opacity}]}>
      <Image
        source={{uri: avatar}}
        style={[styles.profile, custumStyle && custumStyle]}
        borderRadius={100}
      />
      <RNTextComponent style={[styles.name]} isMedium>
        {data && data?.role}
      </RNTextComponent>
    </Animated.View>
  );
};

export default RNParentProfile;
