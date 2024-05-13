/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {View} from 'react-native';
import {StateObject} from './interface';
import {scale} from 'react-native-size-matters';
import RNButton from '@tandem/components/RNButton';
import RNChangePassword from '@tandem/components/RNChangePassword';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import validationFunction from '@tandem/functions/validationFunction';
import {changePassword} from '@tandem/api/changePassword';
import {store} from '@tandem/redux/store';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import logout from '@tandem/functions/logout';

const ChangePassword = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [state, setState] = useState<StateObject>({
    showModal: false,
  });
  const [currentPassword, setCurrentPassword] = useState<ValidationError>({
    value: '',
  });
  const [newPassword, setNewPassword] = useState<ValidationError>({
    value: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<ValidationError>({
    value: '',
  });
  const {showModal} = state;

  const updateState = (data: any) => {
    setState((previouState: any) => {
      return {...previouState, ...data};
    });
  };

  const toggleModal = () => {
    updateState({showModal: !showModal});
  };

  const hangleChangePassword = () => {
    if (
      !validationFunction([
        {
          state: currentPassword,
          setState: setCurrentPassword,
          typeOfValidation: FORM_INPUT_TYPE.PASSWORD,
        },
        {
          state: newPassword,
          setState: setCurrentPassword,
          typeOfValidation: FORM_INPUT_TYPE.PASSWORD,
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
    if (newPassword.value === confirmPassword.value) {
      store.dispatch(
        addAlertData({
          type: 'Message',
          message: translation('LOGOUT_FROM_ALL_DEVICES'),
          onSuccess: () => handleResetPassword(true),
          onDestructive: () => handleResetPassword(false),
        }),
      );
    } else {
      setConfirmPassword(prev => ({
        ...prev,
        message: 'Your password do not match.',
      }));
    }
  };

  const handleResetPassword = async (logoutFromAllDevices: boolean) => {
    try {
      await changePassword({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        logoutFromAllDevices,
      });
      if (logoutFromAllDevices) {
        logout({api: false});
      }
    } catch (error) {
      console.log('error in reset password', error);
    }
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        textHeading
        heading={translation('CHANGE_PASSWORD')}
        titleStyle={styles.text}
        customStyle={styles.heading}
      />
      <View
        style={[styles.content, isTablet && {paddingHorizontal: scale(65)}]}>
        <RNTextInputWithLabel
          label={translation('CURRENT_PASSWORD')}
          containerStyle={styles.input}
          value={currentPassword}
          updateText={setCurrentPassword}
          validationType={FORM_INPUT_TYPE.PASSWORD}
          hint={translation('PASSWORD')}
          inputStyle={styles.inputText}
          inputViewStyle={styles.inputBox}
          rightSideIcon
        />
        <RNTextInputWithLabel
          label={translation('NEW_PASSWORD')}
          containerStyle={styles.input}
          value={newPassword}
          updateText={setNewPassword}
          validationType={FORM_INPUT_TYPE.PASSWORD}
          hint={translation('PASSWORD')}
          inputStyle={styles.inputText}
          inputViewStyle={styles.inputBox}
          rightSideIcon
        />
        <RNTextInputWithLabel
          label={translation('CONFIRM_NEW_PASSWORD')}
          containerStyle={styles.input}
          hint={translation('PASSWORD')}
          inputStyle={styles.inputText}
          inputViewStyle={styles.inputBox}
          value={confirmPassword}
          updateText={setConfirmPassword}
          validationType={FORM_INPUT_TYPE.PASSWORD}
          rightSideIcon
        />
        <RNButton
          pressableStyle={{marginTop: 'auto', marginBottom: 20}}
          customStyle={[styles.button, isTablet && {maxWidth: scale(180)}]}
          title={translation('CHANGE_PASSWORD')}
          onClick={hangleChangePassword}
        />
      </View>
      <RNChangePassword visible={showModal} renderModal={toggleModal} />
    </RNScreenWrapper>
  );
};

export default ChangePassword;
