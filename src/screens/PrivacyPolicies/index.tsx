/* eslint-disable react-native/no-inline-styles */
import {Platform, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import styles from './styles';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {translation} from '@tandem/utils/methods';

const PrivacyPolicies = () => {
  return (
    <RNScreenWrapper
      style={{
        backgroundColor: themeColor.white,
        paddingHorizontal: verticalScale(20),
        paddingTop:
          Platform.OS === 'ios' ? verticalScale(20) : StatusBar.currentHeight,
      }}>
      <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <RNLogoHeader
          heading={translation('PRIVACY_POLICY')}
          textHeading
          customStyle={styles.heading}
        />
        <RNTextInputWithLabel
          editable={false}
          inputStyle={{fontSize: 13, marginLeft: -10, marginTop: 15}}
          multiline
          value={{
            value: translation('privacy-policy.initial-text'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('privacy-policy.info-we-collect')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('privacy-policy.info-we-collect-value'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('privacy-policy.sharing-your-info')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('privacy-policy.sharing-your-info-value'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('privacy-policy.how-we-use-info')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('privacy-policy.how-we-use-info-value'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('privacy-policy.security')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('privacy-policy.security-value'),
          }}
        />
      </ScrollView>
    </RNScreenWrapper>
  );
};

export default PrivacyPolicies;
