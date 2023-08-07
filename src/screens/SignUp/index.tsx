/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ImageBackground,
  Dimensions,
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
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import {RootState} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';

const SignUp = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [name, setName] = useState<ValidationError>({value: ''});
  const [email, setEmail] = useState<ValidationError>({value: ''});
  const [password, setPassword] = useState<ValidationError>({value: ''});
  const [confirmPassword, setConfirmPassword] = useState<ValidationError>({
    value: '',
  });
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{height: '100%', width: '100%'}}>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isTablet ? (
              <ImageBackground
                style={[styles.container]}
                source={
                  !portrait
                    ? require('@tandem/assets/png/tabletWelcomeScreen.png')
                    : require('@tandem/assets/png/authScreenBgc.png')
                }
                resizeMode="stretch">
                <RNLogoHeader customStyle={styles.header} />
                <RNTextComponent style={styles.heading} isSemiBold>
                  {translation('CREATE_AN_ACCOUNT')}
                </RNTextComponent>
                <View
                  style={[
                    styles.form,
                    isTablet && {
                      paddingHorizontal: !portrait
                        ? verticalScale(200)
                        : verticalScale(120),
                    },
                  ]}>
                  <RNTextInputWithLabel
                    label={translation('NAME')}
                    backgroundColor={themeColor.lightGray}
                    containerStyle={styles.input}
                    value={name}
                    updateText={setName}
                    validationType={FORM_INPUT_TYPE.NAME}
                    hint={translation('ENTER_NAME')}
                    inputStyle={styles.inputText}
                  />
                  <RNTextInputWithLabel
                    label={translation('EMAIL')}
                    backgroundColor={themeColor.lightGray}
                    containerStyle={styles.input2}
                    value={email}
                    updateText={setEmail}
                    validationType={FORM_INPUT_TYPE.EMAIL}
                    hint={translation('EMAIL')}
                    inputStyle={styles.inputText}
                  />
                  <RNTextInputWithLabel
                    label={translation('PASSWORD')}
                    containerStyle={styles.input2}
                    value={password}
                    updateText={setPassword}
                    validationType={FORM_INPUT_TYPE.PASSWORD}
                    backgroundColor={themeColor.lightGray}
                    hint={translation('ENTER_PASSWORD')}
                    inputStyle={styles.inputText}
                    rightSideIcon
                  />
                  <RNTextInputWithLabel
                    label={translation('CONFIRM_PASSWORD')}
                    // label={en.EMAIL}
                    containerStyle={styles.input2}
                    backgroundColor={themeColor.lightGray}
                    inputStyle={styles.inputText}
                    value={confirmPassword}
                    updateText={setConfirmPassword}
                    validationType={FORM_INPUT_TYPE.PASSWORD}
                    hint={translation('ENTER_PASSWORD')}
                    rightSideIcon
                  />
                  <RNButton
                    title={translation('SIGN_UP')}
                    customStyle={styles.button}
                    onClick={() => {
                      if (confirmPassword.value === password.value) {
                        navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS);
                      } else {
                        Alert.alert('Message', 'Password does not match.', [
                          {
                            text: 'OK',
                            onPress: () => {},
                          },
                        ]);
                      }
                    }}
                  />
                  <View style={styles.continueDesign}>
                    <View style={styles.line} />
                    <RNTextComponent
                      style={[styles.text, isTablet && {fontSize: 14}]}>
                      {translation('OR_CONTINUE_WITH')}
                    </RNTextComponent>
                    <View style={styles.line} />
                  </View>
                  <View style={styles.bottomOptions}>
                    <View
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <Google />
                    </View>
                    <View
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <FB />
                    </View>
                    <View
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <Apple />
                    </View>
                  </View>
                  <RNTextComponent
                    style={[styles.buttonText, isTablet && {fontSize: 16}]}>
                    {translation('ALREADY_HAVE_AN_ACCOUNT')}{' '}
                    <RNTextComponent
                      isSemiBold
                      style={[styles.signup, isTablet && {fontSize: 16}]}
                      handleOnPress={() => navigateTo(SCREEN_NAME.SIGN_IN)}>
                      {translation('SIGN_IN')}
                    </RNTextComponent>
                  </RNTextComponent>
                </View>
              </ImageBackground>
            ) : (
              <>
                <RNLogoHeader customStyle={styles.header} />
                <RNTextComponent style={styles.heading} isSemiBold>
                  {/* {en.CREATE_AN_ACCOUNT} */}
                  {translation('CREATE_AN_ACCOUNT')}
                </RNTextComponent>
                <View
                  style={[
                    styles.form,
                    isTablet && {paddingHorizontal: verticalScale(100)},
                  ]}>
                  <RNTextInputWithLabel
                    label={translation('NAME')}
                    backgroundColor={themeColor.lightGray}
                    containerStyle={styles.input}
                    value={name}
                    updateText={setName}
                    validationType={FORM_INPUT_TYPE.NAME}
                    hint={translation('ENTER_NAME')}
                    inputStyle={styles.inputText}
                  />
                  <RNTextInputWithLabel
                    label={translation('EMAIL')}
                    backgroundColor={themeColor.lightGray}
                    containerStyle={styles.input2}
                    value={email}
                    updateText={setEmail}
                    validationType={FORM_INPUT_TYPE.EMAIL}
                    hint={translation('EMAIL')}
                    inputStyle={styles.inputText}
                  />
                  <RNTextInputWithLabel
                    label={translation('PASSWORD')}
                    containerStyle={styles.input2}
                    value={password}
                    updateText={setPassword}
                    validationType={FORM_INPUT_TYPE.PASSWORD}
                    backgroundColor={themeColor.lightGray}
                    hint={translation('ENTER_PASSWORD')}
                    inputStyle={styles.inputText}
                    rightSideIcon
                  />
                  <RNTextInputWithLabel
                    label={translation('CONFIRM_PASSWORD')}
                    // label={en.EMAIL}
                    containerStyle={styles.input2}
                    backgroundColor={themeColor.lightGray}
                    inputStyle={styles.inputText}
                    value={confirmPassword}
                    updateText={setConfirmPassword}
                    validationType={FORM_INPUT_TYPE.PASSWORD}
                    hint={translation('ENTER_PASSWORD')}
                    rightSideIcon
                  />
                  <RNButton
                    title={translation('SIGN_UP')}
                    customStyle={styles.button}
                    onClick={() => {
                      if (confirmPassword.value === password.value) {
                        navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS);
                      } else {
                        Alert.alert('Message', 'Password does not match.', [
                          {
                            text: 'OK',
                            onPress: () => {},
                          },
                        ]);
                      }
                    }}
                  />
                  <View style={styles.continueDesign}>
                    <View style={styles.line} />
                    <RNTextComponent
                      style={[styles.text, isTablet && {fontSize: 14}]}>
                      {translation('OR_CONTINUE_WITH')}
                    </RNTextComponent>
                    <View style={styles.line} />
                  </View>
                  <View style={styles.bottomOptions}>
                    <View
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <Google />
                    </View>
                    <View
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <FB />
                    </View>
                    <View
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <Apple />
                    </View>
                  </View>
                  <RNTextComponent
                    style={[styles.buttonText, isTablet && {fontSize: 16}]}>
                    {translation('ALREADY_HAVE_AN_ACCOUNT')}{' '}
                    <RNTextComponent
                      isSemiBold
                      style={[styles.signup, isTablet && {fontSize: 16}]}
                      handleOnPress={() => navigateTo(SCREEN_NAME.SIGN_IN)}>
                      {translation('SIGN_IN')}
                    </RNTextComponent>
                  </RNTextComponent>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default SignUp;
