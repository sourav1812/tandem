/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import LottieAnimationFile from './animation.json';
import React from 'react';
import {Image, View} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';

const BuildingTandem = () => {
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
        style={{flex: 1, width: '100%', height: '100%', position: 'absolute'}}
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
          Building
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
