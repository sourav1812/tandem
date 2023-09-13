/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
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
import {scale, verticalScale} from 'react-native-size-matters';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import {RootState} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';
import loginUserWithEmail from '@tandem/api/loginUserWithEmail';
import validationFunction from '@tandem/functions/validationFunction';
import socialLogin from '@tandem/functions/socialLogin';
import {SOCIAL_AUTH} from '@tandem/constants/enums';

const SignIn = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [email, setEmail] = useState<ValidationError>({value: ''});
  const [password, setPassword] = useState<ValidationError>({value: ''});
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  const signInButtonHandler = async () => {
    if (
      !validationFunction([
        {
          state: email,
          setState: setEmail,
          typeOfValidation: FORM_INPUT_TYPE.EMAIL,
        },
        {
          state: password,
          setState: setPassword,
          typeOfValidation: FORM_INPUT_TYPE.CONFIRM_PASSWORD,
        },
      ])
    ) {
      return;
    }
    try {
      await loginUserWithEmail({
        email: email.value,
        password: password.value,
      });
    } catch (error: any) {
      console.log('error in login api', error.message);
    }
  };

  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white, flex: 1}}>
      <View
        style={{
          height:
            Platform.OS === 'ios' ? verticalScale(20) : StatusBar.currentHeight,
        }}
      />
      <ImageBackground
        style={styles.container}
        source={
          isTablet
            ? !portrait
              ? require('@tandem/assets/png/tabletWelcomeScreen.png')
              : require('@tandem/assets/png/authScreenBgc.png')
            : require('@tandem/assets/png/signInMobileBgc.png')
        }
        resizeMode="stretch"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          height: height,
          width: width,
        }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            height: height,
            width: width,
            paddingBottom: verticalScale(30),
          }}>
          <RNLogoHeader customStyle={styles.header} />
          <RNTextComponent style={styles.heading} isSemiBold>
            {translation('SIGN_IN')}
          </RNTextComponent>
          <View
            style={[
              styles.form,
              isTablet && {
                paddingHorizontal: !portrait ? scale(160) : verticalScale(120),
              },
            ]}>
            <RNTextInputWithLabel
              autoCapitalize="none"
              label={translation('EMAIL')}
              backgroundColor={themeColor.lightGray}
              containerStyle={styles.input2}
              value={email}
              validationType={FORM_INPUT_TYPE.EMAIL}
              updateText={setEmail}
              hint={translation('ENTER_YOUR_EMAIL')}
              inputStyle={styles.inputText}
            />
            <RNTextInputWithLabel
              autoCapitalize="none"
              label={translation('PASSWORD')}
              // label={en.EMAIL}
              backgroundColor={themeColor.lightGray}
              containerStyle={styles.input2}
              value={password}
              updateText={setPassword}
              validationType={FORM_INPUT_TYPE.CONFIRM_PASSWORD}
              hint={translation('ENTER_PASSWORD')}
              inputStyle={styles.inputText}
              rightSideIcon={true}
            />
            <Pressable onPress={() => navigateTo(SCREEN_NAME.FORGOT_PASSWORD)}>
              <RNTextComponent style={styles.forgotPassword}>
                {translation('FORGOT_PASSWORD')}
              </RNTextComponent>
            </Pressable>

            <RNButton
              title={translation('SIGN_IN')}
              customStyle={styles.button}
              onClick={signInButtonHandler}
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
              <Pressable
                onPress={() => {
                  socialLogin(SOCIAL_AUTH.GOOGLE);
                }}
                style={[
                  styles.option,
                  isTablet && {paddingHorizontal: 36, paddingVertical: 17},
                ]}>
                <Google />
              </Pressable>
              <Pressable
                onPress={() => {
                  socialLogin(SOCIAL_AUTH.FACEBOOK);
                }}
                style={[
                  styles.option,
                  isTablet && {paddingHorizontal: 36, paddingVertical: 17},
                ]}>
                <FB />
              </Pressable>
              {Platform.OS === 'ios' && (
                <Pressable
                  onPress={() => {
                    socialLogin(SOCIAL_AUTH.APPLE);
                  }}
                  style={[
                    styles.option,
                    isTablet && {paddingHorizontal: 36, paddingVertical: 17},
                  ]}>
                  <Apple />
                </Pressable>
              )}
            </View>
            <RNTextComponent
              style={[styles.buttonText, isTablet && {fontSize: 22}]}>
              {translation('DONT_HAVE_ACCOUNT')}{' '}
              <RNTextComponent
                isSemiBold
                style={[styles.signup, isTablet && {fontSize: 22}]}
                handleOnPress={() => navigateTo(SCREEN_NAME.SIGN_UP)}>
                {translation('SIGN_UP')}
              </RNTextComponent>
            </RNTextComponent>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default SignIn;
