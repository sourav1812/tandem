import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {View} from 'react-native';
import {StateObject} from './interface';
import {scale} from 'react-native-size-matters';
import RNButton from '@tandem/components/RNButton';
import RNSecureTextInput from '@tandem/components/RNSecureTextInput';
import RNChangePassword from '@tandem/components/RNChangePassword';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const ChangePassword = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [state, setState] = useState<StateObject>({
    name: '',
    email: '',
    showModal: false,
  });

  const {name, email, showModal} = state;

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
        <RNSecureTextInput
          title={translation('CURRENT_PASSWORD')}
          customStyle={styles.input}
          hint={translation('PASSWORD')}
          inputStyle={styles.inputText}
        />
        <RNSecureTextInput
          title={translation('NEW_PASSWORD')}
          customStyle={styles.input}
          hint={translation('PASSWORD')}
          inputStyle={styles.inputText}
        />
        <RNSecureTextInput
          title={translation('CONFIRM_NEW_PASSWORD')}
          customStyle={styles.input}
          hint={translation('PASSWORD')}
          inputStyle={styles.inputText}
          inputViewStyle={styles.inputBox}
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
