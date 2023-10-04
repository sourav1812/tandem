/* eslint-disable react-native/no-inline-styles */
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
  StatusBar,
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
import registerUser from '@tandem/api/registerUser';
import validationFunction from '@tandem/functions/validationFunction';
import socialLogin from '@tandem/functions/socialLogin';
import {SOCIAL_AUTH} from '@tandem/constants/enums';

const SignUp = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [name, setName] = useState<ValidationError>({value: ''});
  const [surName, setSurName] = useState<ValidationError>({value: ''});
  const [email, setEmail] = useState<ValidationError>({value: ''});
  const [password, setPassword] = useState<ValidationError>({value: ''});
  const [confirmPassword, setConfirmPassword] = useState<ValidationError>({
    value: '',
  });
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  // const resetStates = () => {
  //   setName(prev => ({...prev, value: ''}));
  //   setEmail(prev => ({...prev, value: ''}));
  //   setPassword(prev => ({...prev, value: ''}));
  //   setConfirmPassword(prev => ({...prev, value: ''}));
  // };

  const handleSignUpButton = async () => {
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
          typeOfValidation: FORM_INPUT_TYPE.PASSWORD,
        },
        {
          state: name,
          setState: setName,
          typeOfValidation: FORM_INPUT_TYPE.NAME,
        },
        {
          state: surName,
          setState: setSurName,
          typeOfValidation: FORM_INPUT_TYPE.NAME,
        },
        {
          state: confirmPassword,
          setState: setConfirmPassword,
          typeOfValidation: FORM_INPUT_TYPE.CONFIRM_PASSWORD,
        },
      ])
    ) {
      return;
    }
    if (confirmPassword.value === password.value) {
      try {
        await registerUser({
          email: email.value,
          firstName: name.value,
          lastName: surName.value,
          password: password.value,
        });
      } catch (error) {
        // resetStates();
        console.log('signup error', error);
      }
    } else {
      setConfirmPassword(prev => ({
        ...prev,
        message: translation('PASSWORD_DONT_MATCH'),
      }));
    }
  };

  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white, flex: 1}}>
      {isTablet && (
        <ImageBackground
          style={[styles.container]}
          source={
            !portrait
              ? require('@tandem/assets/png/tabletWelcomeScreen.png')
              : require('@tandem/assets/png/authScreenBgc.png')
          }
          resizeMode="stretch"
        />
      )}
      <View
        style={{
          height:
            Platform.OS === 'ios' ? verticalScale(20) : StatusBar.currentHeight,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          height: height,
          width: width,
        }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <>
            {isTablet ? (
              <>
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <RNTextInputWithLabel
                      label={translation('NAME')}
                      backgroundColor={themeColor.lightGray}
                      containerStyle={styles.input}
                      value={name}
                      updateText={setName}
                      validationType={FORM_INPUT_TYPE.NAME}
                      hint={translation('ENTER_NAME')}
                      inputStyle={[styles.inputText]}
                      inputViewStyle={{paddingRight: 5}}
                      errorTextStyle={{
                        fontSize: portrait
                          ? verticalScale(8)
                          : verticalScale(10),
                      }}
                    />
                    <RNTextInputWithLabel
                      label={translation('SURNAME')}
                      backgroundColor={themeColor.lightGray}
                      containerStyle={styles.input}
                      value={surName}
                      updateText={setSurName}
                      validationType={FORM_INPUT_TYPE.NAME}
                      hint={translation('ENTER_SURNAME')}
                      inputStyle={[styles.inputText]}
                      inputViewStyle={{paddingRight: 5}}
                      errorTextStyle={{
                        fontSize: portrait
                          ? verticalScale(8)
                          : verticalScale(10),
                      }}
                    />
                  </View>
                  <RNTextInputWithLabel
                    autoCapitalize="none"
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
                    autoCapitalize="none"
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
                    autoCapitalize="none"
                    label={translation('CONFIRM_PASSWORD')}
                    // label={en.EMAIL}
                    containerStyle={styles.input2}
                    backgroundColor={themeColor.lightGray}
                    inputStyle={styles.inputText}
                    value={confirmPassword}
                    updateText={setConfirmPassword}
                    validationType={FORM_INPUT_TYPE.CONFIRM_PASSWORD}
                    // errorText={errorText}
                    hint={translation('ENTER_PASSWORD')}
                    rightSideIcon
                  />
                  <RNButton
                    title={translation('SIGN_UP')}
                    customStyle={styles.button}
                    onClick={handleSignUpButton}
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
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <Google />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        socialLogin(SOCIAL_AUTH.FACEBOOK);
                      }}
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
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
                          isTablet && {
                            paddingHorizontal: 36,
                            paddingVertical: 17,
                          },
                        ]}>
                        <Apple />
                      </Pressable>
                    )}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <RNTextInputWithLabel
                      label={translation('NAME')}
                      backgroundColor={themeColor.lightGray}
                      containerStyle={styles.input}
                      value={name}
                      updateText={setName}
                      validationType={FORM_INPUT_TYPE.NAME}
                      hint={translation('ENTER_NAME')}
                      inputStyle={styles.inputText}
                      inputViewStyle={{paddingRight: 5}}
                    />
                    <RNTextInputWithLabel
                      label={translation('SURNAME')}
                      backgroundColor={themeColor.lightGray}
                      containerStyle={styles.input}
                      value={surName}
                      updateText={setSurName}
                      validationType={FORM_INPUT_TYPE.NAME}
                      hint={translation('ENTER_SURNAME')}
                      inputStyle={styles.inputText}
                      inputViewStyle={{paddingRight: 5}}
                    />
                  </View>
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
                    containerStyle={styles.input2}
                    backgroundColor={themeColor.lightGray}
                    inputStyle={styles.inputText}
                    value={confirmPassword}
                    updateText={setConfirmPassword}
                    validationType={FORM_INPUT_TYPE.CONFIRM_PASSWORD}
                    hint={translation('ENTER_PASSWORD')}
                    rightSideIcon
                  />
                  <RNButton
                    title={translation('SIGN_UP')}
                    customStyle={styles.button}
                    onClick={handleSignUpButton}
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
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
                      ]}>
                      <Google />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        socialLogin(SOCIAL_AUTH.FACEBOOK);
                      }}
                      style={[
                        styles.option,
                        isTablet && {
                          paddingHorizontal: 36,
                          paddingVertical: 17,
                        },
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
                          isTablet && {
                            paddingHorizontal: 36,
                            paddingVertical: 17,
                          },
                        ]}>
                        <Apple />
                      </Pressable>
                    )}
                  </View>
                  <RNTextComponent
                    style={[
                      styles.buttonText,
                      isTablet && {fontSize: verticalScale(16)},
                    ]}>
                    {translation('ALREADY_HAVE_AN_ACCOUNT')}{' '}
                    <RNTextComponent
                      isSemiBold
                      style={[
                        styles.signup,
                        isTablet && {fontSize: verticalScale(16)},
                      ]}
                      handleOnPress={() => navigateTo(SCREEN_NAME.SIGN_IN)}>
                      {translation('SIGN_IN')}
                    </RNTextComponent>
                  </RNTextComponent>
                </View>
              </>
            )}
          </>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default SignUp;
