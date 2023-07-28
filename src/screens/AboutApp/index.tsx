import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image, View} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {verticalScale} from 'react-native-size-matters';
import {translation} from '@tandem/utils/methods';

const AboutApp = () => {
  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        customStyle={styles.header}
        textHeading
        heading={translation('ABOUT_APP')}
      />
      <View>
        <Image
          source={require('../../assets/png/logo.png')}
          style={styles.img}
          resizeMode="contain"
        />
        <RNTextComponent style={styles.version}>Version 1.0</RNTextComponent>
      </View>
      <View>
        <RNTextComponent style={styles.license}>
          ©️ 2023 TANDEM{'\n'}
          MOBILE APPLICATION
        </RNTextComponent>
        <RNTextComponent
          style={[
            styles.license,
            {
              marginTop: 1,
              fontSize: verticalScale(11),
              marginBottom: verticalScale(20),
            },
          ]}>
          All Rights Reserved
        </RNTextComponent>
      </View>
    </RNScreenWrapper>
  );
};

export default AboutApp;
