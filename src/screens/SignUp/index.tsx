/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
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

const SignUp = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  // const [state, setState] = useState<StateObject>({
  //   name: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });
  const [name, setName] = useState<ValidationError>({value: ''});
  const [email, setEmail] = useState<ValidationError>({value: ''});
  const [password, setPassword] = useState<ValidationError>({value: ''});
  const [confirmPassword, setConfirmPassword] = useState<ValidationError>({
    value: '',
  });

  // const {name, email, password, confirmPassword} = state;

  // const updateState = (date: any) => {
  //   setState((previouState: any) => {
  //     return {...previouState, ...date};
  //   });
  // };

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
              updateText={setName}
              validationType={FORM_INPUT_TYPE.NAME}
              hint={i18n.t('ENTER_NAME')}
              inputStyle={styles.inputText}
            />
            <RNTextInputWithLabel
              label={i18n.t('EMAIL')}
              backgroundColor={themeColor.lightGray}
              containerStyle={styles.input2}
              value={email}
              updateText={setEmail}
              validationType={FORM_INPUT_TYPE.EMAIL}
              hint={i18n.t('EMAIL')}
              inputStyle={styles.inputText}
            />
            <RNTextInputWithLabel
              label={i18n.t('PASSWORD')}
              containerStyle={styles.input2}
              value={password}
              updateText={setPassword}
              validationType={FORM_INPUT_TYPE.PASSWORD}
              backgroundColor={themeColor.lightGray}
              hint={i18n.t('ENTER_PASSWORD')}
              inputStyle={styles.inputText}
              rightSideIcon
            />
            <RNTextInputWithLabel
              label={i18n.t('CONFIRM_PASSWORD')}
              // label={en.EMAIL}
              containerStyle={styles.input2}
              backgroundColor={themeColor.lightGray}
              inputStyle={styles.inputText}
              value={confirmPassword}
              updateText={setConfirmPassword}
              validationType={FORM_INPUT_TYPE.PASSWORD}
              hint={i18n.t('ENTER_PASSWORD')}
              rightSideIcon
            />
            <RNButton
              title={i18n.t('SIGN_UP')}
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
