import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image, ScrollView, View} from 'react-native';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {getVersion} from 'react-native-device-info';
import {verticalScale} from 'react-native-size-matters';
import {translation} from '@tandem/utils/methods';
const AboutApp = () => {
  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        customStyle={styles.header}
        textHeading
        heading={'About Us'}
      />
      <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/png/logo.png')}
          style={styles.img}
          resizeMode="contain"
        />
        <RNTextInputWithLabel
          editable={false}
          scrollEnabled={false}
          inputStyle={{fontSize: 13, marginLeft: -10, marginTop: 15}}
          multiline
          value={{
            value: translation('ABOUT_US_TEXT'),
          }}
        />
        <View>
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
      </ScrollView>
    </RNScreenWrapper>
  );
};

export default AboutApp;
