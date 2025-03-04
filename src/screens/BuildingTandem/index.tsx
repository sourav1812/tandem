/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import LottieAnimationFile from './animation.json';
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import {translation} from '@tandem/utils/methods';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {Audio} from 'expo-av';
import SO_loading from '@tandem/assets/appInteraction/SO_loading.mp3';
const BuildingTandem = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [soundState, setSoundState] = useState<Audio.Sound | undefined>();
  React.useEffect(() => {
    const f = async () => {
      const {sound} = await Audio.Sound.createAsync(SO_loading);
      setSoundState(sound);
      sound.playAsync();
    };
    f();
    return () => {
      soundState?.unloadAsync();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        style={{
          flex: 1,
          width: isTablet ? '80%' : '100%',
          height: isTablet ? '80%' : '100%',
          position: 'absolute',
        }}
        source={LottieAnimationFile}
        autoPlay
        loop
      />
      <View
        style={{
          position: 'absolute',
          bottom: verticalScale(90),
        }}>
        <RNTextComponent
          isSemiBold
          style={{
            textAlign: 'center',
            marginBottom: 5,
          }}>
          {translation('BUILDING')}
        </RNTextComponent>
        <Image
          source={require('@tandem/assets/png/logo.png')}
          style={{
            height: verticalScale(40),
            width: verticalScale(150),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
export default BuildingTandem;
