import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {Pressable, Switch, View} from 'react-native';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {StateObject} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import RNDeleteAccount from '@tandem/components/RNDeleteAccount';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import {LanguageDropDown} from '@tandem/components/LanguageDropDown';
import {RootState} from '@tandem/redux/store';
import {editUserProfile} from '@tandem/api/editUserProfile';
import validationFunction from '@tandem/functions/validationFunction';
import {saveUserData} from '@tandem/redux/slices/userData.slice';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';

const ProfileSettings = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(
    (state1: RootState) => state1.userData.userDataObject,
  );
  console.log(userData, 'userDatauserData');
  const [state, setState] = useState<StateObject>({
    showModal: false,
  });
  const [name, setName] = useState<ValidationError>({value: userData.name});
  // const [email, setEmail] = useState<ValidationError>({value: ''});
  const {showModal} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const toggleModal = () => {
    updateState({showModal: !showModal});
  };

  const handleUserProfileRequest = async () => {
    if (
      !validationFunction([
        {
          state: name,
          setState: setName,
          typeOfValidation: FORM_INPUT_TYPE.NAME,
        },
      ])
    ) {
      return;
    }
    const response = await editUserProfile({
      name: name.value,
    });
    if (response) {
      dispatch(
        saveUserData({
          ...userData,
          name: name.value,
        }),
      );
    }
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        textHeading
        heading={translation('PROFILE_SETTINGS')}
        titleStyle={styles.text}
        customStyle={styles.heading}
      />
      <View
        style={[styles.content, isTablet && {paddingHorizontal: scale(65)}]}>
        <RNTextInputWithLabel
          label={translation('YOUR_NAME')}
          containerStyle={styles.input}
          hint={translation('NAME')}
          inputViewStyle={styles.inputBox}
          value={name}
          validationType={FORM_INPUT_TYPE.NAME}
          updateText={setName}
        />
        <LanguageDropDown
          heading={translation('YOUR_EMAIL')}
          text={userData.email}
          showIcon={false}
          fadeText
          customStyle={styles.dropDownButton}
        />
        <LanguageDropDown
          onPress={() => {
            navigateTo(SCREEN_NAME.SELECT_LANGUAGE, {goBack: true});
          }}
          heading={translation('LANGUAGE')}
          text={'English'}
          customStyle={styles.dropDownButton}
        />
        <NotificationSwitch />
      </View>
      <View
        style={[
          styles.footerButton,
          isTablet && {paddingHorizontal: scale(65)},
        ]}>
        <RNButton
          customStyle={styles.button}
          title={translation('SAVE_CHANGES')}
          onClick={handleUserProfileRequest}
        />
        <RNTextComponent
          style={styles.bottom}
          isSemiBold
          handleOnPress={toggleModal}>
          {translation('DELETE_MY_ACCOUNT')}
        </RNTextComponent>
      </View>
      <RNDeleteAccount
        visible={showModal}
        renderModal={toggleModal}
        nextClick={() => {}}
        heading={translation('DELETE_ACCOUNT')}
        content={translation('IF_YOU_DELETE_ACCOUNT')}
      />
    </RNScreenWrapper>
  );
};

export default ProfileSettings;

const NotificationSwitch = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
    <Pressable
      style={[
        styles.dropdown,
        {
          borderRadius: 16,
          marginTop: verticalScale(12),
          backgroundColor: themeColor.lightGray,
          paddingVertical: isTablet ? verticalScale(11) : verticalScale(14),
        },
      ]}>
      <RNTextComponent
        style={[styles.label, isTablet && {fontSize: verticalScale(11)}]}>
        {translation('NOTIFICATION')}
      </RNTextComponent>
      <Switch
        trackColor={{false: themeColor.themeBlue, true: themeColor.gold}}
        thumbColor={themeColor.white}
        ios_backgroundColor={themeColor.gold}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Pressable>
  );
};
