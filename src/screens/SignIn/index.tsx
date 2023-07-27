/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import Google from '@tandem/assets/svg/GoogleLogo';
import Apple from '@tandem/assets/svg/AppleLogo';
import FB from '@tandem/assets/svg/FBlogo';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {verticalScale} from 'react-native-size-matters';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const SignIn = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [email, setEmail] = useState<ValidationError>({value: ''});
  const [password, setPassword] = useState<ValidationError>({value: ''});

  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white, flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          height: height,
          width: width,
        }}>
        <ScrollView
          contentContainerStyle={{
            height: height,
            width: width,
          }}>
          {isTablet ? (
            <ImageBackground
              style={styles.container}
              source={require('@tandem/assets/png/authScreenBgc.png')}
              resizeMode="stretch">
              <RNLogoHeader customStyle={styles.header} />
              <RNTextComponent style={styles.heading} isSemiBold>
                {i18n.t('SIGN_IN')}
              </RNTextComponent>
              <View
                style={[
                  styles.form,
                  isTablet && {paddingHorizontal: verticalScale(120)},
                ]}>
                <RNTextInputWithLabel
                  label={i18n.t('EMAIL')}
                  backgroundColor={themeColor.lightGray}
                  containerStyle={styles.input2}
                  value={email}
                  validationType={FORM_INPUT_TYPE.EMAIL}
                  updateText={setEmail}
                  hint={i18n.t('ENTER_YOUR_EMAIL')}
                  inputStyle={styles.inputText}
                />
                <RNTextInputWithLabel
                  label={i18n.t('PASSWORD')}
                  // label={en.EMAIL}
                  backgroundColor={themeColor.lightGray}
                  containerStyle={styles.input2}
                  value={password}
                  updateText={setPassword}
                  validationType={FORM_INPUT_TYPE.PASSWORD}
                  hint={i18n.t('ENTER_PASSWORD')}
                  inputStyle={styles.inputText}
                  rightSideIcon={true}
                />
                <RNTextComponent style={styles.forgotPassword}>
                  {i18n.t('FORGOT_PASSWORD')}
                </RNTextComponent>
                <RNButton
                  title={i18n.t('SIGN_IN')}
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
                  style={[styles.buttonText, isTablet && {fontSize: 22}]}>
                  {i18n.t('ALREADY_HAVE_AN_ACCOUNT')}{' '}
                  <RNTextComponent
                    isSemiBold
                    style={[styles.signup, isTablet && {fontSize: 22}]}
                    handleOnPress={() => navigateTo(SCREEN_NAME.SIGN_UP)}>
                    {i18n.t('SIGN_UP')}
                  </RNTextComponent>
                </RNTextComponent>
              </View>
            </ImageBackground>
          ) : (
            <>
              <RNLogoHeader customStyle={styles.header} />
              <RNTextComponent style={styles.heading} isSemiBold>
                {i18n.t('SIGN_IN')}
              </RNTextComponent>
              <View
                style={[
                  styles.form,
                  isTablet && {paddingHorizontal: verticalScale(100)},
                ]}>
                <RNTextInputWithLabel
                  label={i18n.t('EMAIL')}
                  backgroundColor={themeColor.lightGray}
                  containerStyle={styles.input2}
                  value={email}
                  validationType={FORM_INPUT_TYPE.EMAIL}
                  updateText={setEmail}
                  hint={i18n.t('ENTER_YOUR_EMAIL')}
                  inputStyle={styles.inputText}
                />
                <RNTextInputWithLabel
                  label={i18n.t('PASSWORD')}
                  // label={en.EMAIL}
                  backgroundColor={themeColor.lightGray}
                  containerStyle={styles.input2}
                  value={password}
                  updateText={setPassword}
                  validationType={FORM_INPUT_TYPE.PASSWORD}
                  hint={i18n.t('ENTER_PASSWORD')}
                  inputStyle={styles.inputText}
                  rightSideIcon={true}
                />
                <RNTextComponent style={styles.forgotPassword}>
                  {i18n.t('FORGOT_PASSWORD')}
                </RNTextComponent>
                <RNButton
                  title={i18n.t('SIGN_IN')}
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
                  style={[styles.buttonText, isTablet && {fontSize: 22}]}>
                  {i18n.t('ALREADY_HAVE_AN_ACCOUNT')}{' '}
                  <RNTextComponent
                    isSemiBold
                    style={[styles.signup, isTablet && {fontSize: 22}]}
                    handleOnPress={() => navigateTo(SCREEN_NAME.SIGN_UP)}>
                    {i18n.t('SIGN_UP')}
                  </RNTextComponent>
                </RNTextComponent>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default SignIn;
