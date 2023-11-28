import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image, View} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {verticalScale} from 'react-native-size-matters';
import {translation} from '@tandem/utils/methods';
import {getVersion} from 'react-native-device-info';
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
        <RNTextComponent style={styles.version}>
          Version {getVersion()}
        </RNTextComponent>
      </View>
      <View>
        <RNTextComponent style={styles.license}>
          ©️{' '}
          {new Date().getFullYear() === 2023
            ? new Date().getFullYear()
            : '2023-' + new Date().getFullYear()}{' '}
          TANDEM{'\n'}
          EARLY IDEAS LIMITED
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
