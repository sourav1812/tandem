/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import LottieAnimationFile from './animation.json';
import React from 'react';
import {View} from 'react-native';
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
        style={{flex: 1, width: '100%', height: '100%'}}
        source={LottieAnimationFile}
        autoPlay
        loop
      />
      <RNTextComponent
        isSemiBold
        style={{
          position: 'absolute',
          bottom: verticalScale(50),
          textAlign: 'center',
        }}>
        Building Tandem...
      </RNTextComponent>
    </View>
  );
};
export default BuildingTandem;
