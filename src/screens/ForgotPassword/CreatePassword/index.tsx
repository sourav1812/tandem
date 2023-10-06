import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import {verticalScale} from 'react-native-size-matters';
import {styles} from './style';
import validationFunction from '@tandem/functions/validationFunction';
import {resetPassword} from '@tandem/api/forgotPassword';
import {CreatePasswordInterface} from '@tandem/navigation/types';

const CreatePassword = ({route}: CreatePasswordInterface) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [password, setPassword] = useState<ValidationError>({value: ''});
  const [confirmPassword, setConfirmPassword] = useState<ValidationError>({
    value: '',
  });

  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  const handleClick = async () => {
    if (
      !validationFunction([
        {
          state: password,
          setState: setPassword,
          typeOfValidation: FORM_INPUT_TYPE.PASSWORD,
        },
        {
          state: confirmPassword,
          setState: setConfirmPassword,
          typeOfValidation: FORM_INPUT_TYPE.PASSWORD,
        },
      ])
    ) {
      return;
    }
    if (password.value !== confirmPassword.value) {
      setConfirmPassword(prev => ({
        ...prev,
        message: translation('PASSWORD_DONT_MATCH'),
      }));
      return;
    }

    try {
      await resetPassword({
        newPassword: password.value,
        resetToken: route.params.resetToken,
        onSuccess: () => {
          navigateTo(SCREEN_NAME.SIGN_IN);
        },
      });
    } catch (error) {
      console.log('error in resetPassword screen', error);
    }
  };

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
          <ImageBackground
            style={styles.container}
            source={
              isTablet
                ? require('@tandem/assets/png/forgotPasswordTabletBgc.png')
                : require('@tandem/assets/png/forgotPasswordMobileBgc.png')
            }
            resizeMode="stretch">
            <RNLogoHeader customStyle={styles.header} />
            <RNTextComponent style={styles.heading} isSemiBold>
              {translation('create-password.create-password')}
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.subHeading,
                {
                  fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                  marginTop: verticalScale(10),
                },
              ]}>
              {translation('create-password.create-new-password')}
            </RNTextComponent>
            <View
              style={[
                styles.form,
                isTablet && {paddingHorizontal: verticalScale(120)},
              ]}>
              <RNTextInputWithLabel
                label={translation('PASSWORD')}
                backgroundColor={themeColor.lightGray}
                containerStyle={styles.input2}
                value={password}
                validationType={FORM_INPUT_TYPE.PASSWORD}
                updateText={setPassword}
                rightSideIcon
                hint={translation('PASSWORD')}
                inputStyle={styles.inputText}
              />
              <RNTextInputWithLabel
                label={translation('create-password.confirm-password')}
                backgroundColor={themeColor.lightGray}
                containerStyle={styles.input2}
                value={confirmPassword}
                validationType={FORM_INPUT_TYPE.PASSWORD}
                updateText={setConfirmPassword}
                hint={translation('PASSWORD')}
                rightSideIcon
                inputStyle={styles.inputText}
              />
              <RNButton
                title={translation('create-password.confirm-password')}
                customStyle={styles.button}
                onClick={handleClick}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default CreatePassword;
