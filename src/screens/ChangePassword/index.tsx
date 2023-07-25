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

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const toggleModal = () => {
    updateState({showModal: !showModal});
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
      </View>
      <RNButton
        customStyle={[styles.button, isTablet && {maxWidth: scale(180)}]}
        title={translation('CHANGE_PASSWORD')}
        onClick={toggleModal}
      />
      <RNChangePassword visible={showModal} renderModal={toggleModal} />
    </RNScreenWrapper>
  );
};

export default ChangePassword;
