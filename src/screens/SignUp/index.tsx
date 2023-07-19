/* eslint-disable react-native/no-inline-styles */
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import RNButton from '@tandem/components/RNButton';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import RNSecureTextInput from '@tandem/components/RNSecureTextInput';
import Google from '@tandem/assets/svg/GoogleLogo';
import Apple from '@tandem/assets/svg/AppleLogo';
import FB from '@tandem/assets/svg/FBlogo';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {stateObject} from './interface';
import {verticalScale} from 'react-native-size-matters';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';

const SignUp = () => {
  const isTablet = checkIfTablet();

  const [state, setState] = useState<stateObject>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {name, email, password, confirmPassword} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{height: '100%', width: '100%'}}>
        <ScrollView style={{height: '100%', width: '100%'}}>
          <RNLogoHeader customStyle={styles.header} />
          <RNTextComponent style={styles.heading} isSemiBold>
            {/* {en.CREATE_AN_ACCOUNT} */}
            {i18n.t('CREATE_AN_ACCOUNT')}
          </RNTextComponent>
          <View
            style={[
              styles.form,
              isTablet && {paddingHorizontal: verticalScale(100)},
            ]}>
            <RNTextInputWithLabel
              label={i18n.t('NAME')}
              backgroundColor={themeColor.lightGray}
              containerStyle={styles.input}
              value={name}
              updateText={e => {
                updateState({name: e});
              }}
              hint={i18n.t('ENTER_NAME')}
              inputStyle={styles.inputText}
            />
            <RNTextInputWithLabel
              label={i18n.t('EMAIL')}
              backgroundColor={themeColor.lightGray}
              containerStyle={styles.input2}
              value={email}
              updateText={e => {
                updateState({email: e});
              }}
              hint={i18n.t('EMAIL')}
              inputStyle={styles.inputText}
            />
            <RNSecureTextInput
              title={i18n.t('PASSWORD')}
              customStyle={styles.input2}
              value={password}
              updateText={e => {
                updateState({password: e});
              }}
              hint={i18n.t('ENTER_PASSWORD')}
              inputStyle={styles.inputText}
            />
            <RNSecureTextInput
              title={i18n.t('CONFIRM_PASSWORD')}
              // label={en.EMAIL}
              customStyle={styles.input2}
              inputStyle={styles.inputText}
              value={confirmPassword}
              updateText={e => {
                updateState({confirmPassword: e});
              }}
              hint={i18n.t('CONFIRM_PASSWORD')}
            />
            <RNButton
              title={i18n.t('SIGN_UP')}
              customStyle={styles.button}
              onClick={() => {
                navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS);
              }}
            />
            <View style={styles.continueDesign}>
              <View style={styles.line} />
              <RNTextComponent
                style={[styles.text, isTablet && {fontSize: 14}]}>
                {i18n.t('OR_CONTINUE_WITH')}
              </RNTextComponent>
              <View style={styles.line} />
            </View>
            <View style={styles.bottomOptions}>
              <View
                style={[
                  styles.option,
                  isTablet && {paddingHorizontal: 36, paddingVertical: 17},
                ]}>
                <Google />
              </View>
              <View
                style={[
                  styles.option,
                  isTablet && {paddingHorizontal: 36, paddingVertical: 17},
                ]}>
                <FB />
              </View>
              <View
                style={[
                  styles.option,
                  isTablet && {paddingHorizontal: 36, paddingVertical: 17},
                ]}>
                <Apple />
              </View>
            </View>
            <RNTextComponent
              style={[styles.buttonText, isTablet && {fontSize: 16}]}>
              {i18n.t('ALREADY_HAVE_AN_ACCOUNT')}{' '}
              <RNTextComponent
                isSemiBold
                style={[styles.signup, isTablet && {fontSize: 16}]}
                handleOnPress={() => navigateTo(SCREEN_NAME.SIGN_IN)}>
                {i18n.t('SIGN_IN')}
              </RNTextComponent>
            </RNTextComponent>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default SignUp;
