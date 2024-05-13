import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {AppState, Pressable, Switch, View} from 'react-native';
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
import {
  changeNotifications,
  saveUserData,
} from '@tandem/redux/slices/userData.slice';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {languages} from '../SelectLanguage/interface';
import i18n from '@tandem/constants/lang/i18n';
import {deleteUser} from '@tandem/api/deleteUser';
import {
  notificationActiveStatus,
  requestPermission,
} from '@tandem/functions/permissions';
import {setNotificationStatus} from '@tandem/redux/slices/permissions.slice';

const ProfileSettings = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(
    (state1: RootState) => state1.userData.userDataObject,
  );
  const [state, setState] = useState<StateObject>({
    showModal: false,
  });
  const [firstName, setFName] = useState<ValidationError>({
    value: userData.firstName,
  });
  const [lastName, setLName] = useState<ValidationError>({
    value: userData.lastName,
  });
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
          state: firstName,
          setState: setFName,
          typeOfValidation: FORM_INPUT_TYPE.NAME,
        },
        {
          state: lastName,
          setState: setLName,
          typeOfValidation: FORM_INPUT_TYPE.NAME,
        },
      ])
    ) {
      return;
    }
    const response = await editUserProfile({
      firstName: firstName.value,
      lastName: lastName.value,
    });
    if (response) {
      dispatch(
        saveUserData({
          ...userData,
          firstName: firstName.value,
          lastName: lastName.value,
        }),
      );
    }
  };

  const handleDeleteUserRequest = async () => {
    try {
      await deleteUser();
      toggleModal();
    } catch (error) {
      console.log('error in delete user api ', error);
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <RNTextInputWithLabel
            label={translation('NAME')}
            backgroundColor={themeColor.lightGray}
            containerStyle={styles.input}
            value={firstName}
            updateText={setFName}
            validationType={FORM_INPUT_TYPE.NAME}
            hint={translation('ENTER_NAME')}
            inputStyle={styles.inputText}
            inputViewStyle={{paddingRight: 5}}
          />
          <RNTextInputWithLabel
            label={translation('SURNAME')}
            backgroundColor={themeColor.lightGray}
            containerStyle={styles.input}
            value={lastName}
            updateText={setLName}
            validationType={FORM_INPUT_TYPE.NAME}
            hint={translation('ENTER_SURNAME')}
            inputStyle={styles.inputText}
            inputViewStyle={{paddingRight: 5}}
          />
        </View>
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
          text={languages.filter(obj => obj.code === i18n.locale)[0].name}
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
        nextClick={handleDeleteUserRequest}
        heading={translation('DELETE_ACCOUNT')}
        content={translation('IF_YOU_DELETE_ACCOUNT')}
      />
    </RNScreenWrapper>
  );
};

export default ProfileSettings;

const NotificationSwitch = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const user = useAppSelector(state => state.userData.userDataObject);
  const localNotifications = useAppSelector(
    state => state.permissions.notificationStatus,
  );

  const [isEnabled, setIsEnabled] = useState({
    fromApp: localNotifications,
    fromBackend: user.allowNotifications,
  });

  const appState = React.useRef(AppState.currentState);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        notificationActiveStatus().then(({fromApp}) => {
          setIsEnabled(prev => ({...prev, fromApp}));
        });
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    dispatch(setNotificationStatus(user.allowNotifications));
    notificationActiveStatus().then(res => {
      setIsEnabled(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSwitch = async () => {
    if (!isEnabled.fromApp) {
      await requestPermission();
      return;
    }
    dispatch(setNotificationStatus(!isEnabled.fromBackend));
    dispatch(changeNotifications(!isEnabled.fromBackend));
    setIsEnabled(prev => {
      return {...prev, fromBackend: !prev.fromBackend};
    });
  };

  return (
    <Pressable
      style={[
        styles.dropdown,
        // eslint-disable-next-line react-native/no-inline-styles
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
        trackColor={{false: '#474747', true: themeColor.gold}}
        thumbColor={themeColor.white}
        ios_backgroundColor={'#474747'}
        onValueChange={toggleSwitch}
        value={isEnabled.fromApp && isEnabled.fromBackend}
      />
    </Pressable>
  );
};
