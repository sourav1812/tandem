/* eslint-disable react-native/no-inline-styles */
import {Platform, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import styles from './style';
import {translation} from '@tandem/utils/methods';

const TermsOfUse = () => {
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
          heading={translation('TERMS_OF_USE')}
          textHeading
          customStyle={styles.heading}
        />

        <RNTextInputWithLabel
          editable={false}
          inputStyle={{fontSize: 13, marginLeft: -10, marginTop: 15}}
          multiline
          value={{
            value: translation('terms-of-use.initial-text'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('terms-of-use.use-of-service')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('terms-of-use.use-of-service-value'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('terms-of-use.intellectual')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('terms-of-use.intellectual-value'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('terms-of-use.limitation')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('terms-of-use.limitation-value'),
          }}
        />
        <RNTextInputWithLabel
          editable={false}
          label={translation('terms-of-use.Changes-to-these-terms')}
          labelStyle={{fontSize: 13, fontWeight: 'bold', marginLeft: 10}}
          inputStyle={{fontSize: 13, marginLeft: -10}}
          multiline
          value={{
            value: translation('terms-of-use.Changes-to-these-terms-value'),
          }}
        />
      </ScrollView>
    </RNScreenWrapper>
  );
};

export default TermsOfUse;
