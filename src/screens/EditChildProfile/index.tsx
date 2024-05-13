import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {Image, Pressable, View} from 'react-native';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {StateObject} from './interface';
import {scale, verticalScale} from 'react-native-size-matters';
import RNButton from '@tandem/components/RNButton';
import RNDeleteAccount from '@tandem/components/RNDeleteAccount';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import dayjs from 'dayjs';
import {RootState} from '@tandem/redux/store';
import RNChangeAvatarModal from '@tandem/components/RNChangeAvatarModal';
import {LanguageDropDown} from '@tandem/components/LanguageDropDown';
import validationFunction from '@tandem/functions/validationFunction';
import {editChildProfile} from '@tandem/api/editChildProfile';
import userProfile from '@tandem/api/userProfile';
import {
  resetAdultData,
  saveCurrentAdult,
  saveCurrentChild,
} from '@tandem/redux/slices/createChild.slice';
import {deleteChildProfile} from '@tandem/api/deleteChildProfile';
import {EditChildProfileProps} from '@tandem/navigation/types';
import {editAdultProfile} from '@tandem/api/editAdultProfile';
import {deleteAdultProfile} from '@tandem/api/deleteAdultProfile';
import themeColor from '@tandem/theme/themeColor';
import RNDatePicker from '@tandem/components/RNDatePicker';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';

const EditChildProfile = ({route}: EditChildProfileProps) => {
  const dispatch = useAppDispatch();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const childList = useAppSelector(state => state.createChild.childList);
  const adultList = useAppSelector(state => state.createChild.adultList);

  const currentAdult = useAppSelector(
    (state1: RootState) => state1.createChild.currentAdult,
  );

  const {editAdult, childId} = route.params;

  console.log(childId, 'childIdchildId');

  const currentChildFromRoute = useAppSelector(
    (state1: RootState) =>
      state1.createChild.childList.filter(obj => obj.childId === childId)[0],
  );
  const currentChildFromRedux = useAppSelector(
    (state1: RootState) => state1.createChild.currentChild,
  );
  const currentChild = currentChildFromRoute || currentChildFromRedux;
  const [name, setName] = useState<ValidationError>({
    value: editAdult ? currentAdult.role || '' : currentChild.name || '',
  });
  const [dateModal, setDateModal] = useState(false);

  const [dob, setDob] = useState<ValidationError>({
    value: editAdult ? currentAdult.dob || '' : currentChild.dob || '',
  });

  const [state, setState] = useState<StateObject>({
    showModal: false,
    showAvatarModal: false,
    localAvatarState: null,
  });
  const {showModal, showAvatarModal, localAvatarState} = state;
  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const toggleModal = () => {
    updateState({showModal: !showModal});
  };

  const renderAvatarModal = () => {
    updateState({showAvatarModal: !showAvatarModal});
  };

  const getAvatar = (url: string | null) => {
    updateState({localAvatarState: url});
  };

  const toggleDatePicker = () => {
    setDateModal(!dateModal);
  };

  const handleEditChildProfileRequest = async () => {
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
    const response = await editChildProfile({
      name: name.value,
      dob: dob.value, // ! pass in the whole date object
      avatar: localAvatarState || currentChild.avatar,
      childId: currentChild.childId,
    });
    if (response) {
      userProfile();
      dispatch(
        saveCurrentChild({
          ...currentChild,
          name: name.value,
          dob: dob.value,
          avatar: localAvatarState || currentChild.avatar,
        }),
      );
    }
  };

  const handleEditAdultProfileRequest = async () => {
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
    const response = await editAdultProfile({
      role: name.value,
      dob: dob.value, // ! pass in the whole date object
      avatar: localAvatarState || currentAdult.avatar,
      adultId: currentAdult.profileId,
    });
    if (response) {
      userProfile();
      dispatch(
        saveCurrentAdult({
          ...currentAdult,
          role: name.value,
          dob: dob.value,
          avatar: localAvatarState || currentAdult.avatar,
        }),
      );
    }
  };

  const handleDeleteChildRequest = async () => {
    try {
      await deleteChildProfile({childId: currentChild.childId});
      toggleModal();
      dispatch(saveCurrentChild(childList[0]));
    } catch (error) {
      console.log('error in delete adult profile api', error);
    }
  };

  const handleDeleteAdultRequest = async () => {
    try {
      await deleteAdultProfile({adultId: currentAdult.profileId});
      toggleModal();
      if (adultList.length !== 0) {
        dispatch(saveCurrentAdult(adultList[0]));
      } else {
        dispatch(resetAdultData());
      }
    } catch (error) {
      console.log('error in delete adult profile api', error);
    }
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        textHeading
        heading={name.value}
        titleStyle={styles.text}
        customStyle={styles.heading}
      />
      <Pressable onPress={renderAvatarModal}>
        <Image
          source={{
            uri:
              localAvatarState ||
              (editAdult ? currentAdult.avatar : currentChild?.avatar),
          }}
          style={styles.profile}
        />
      </Pressable>
      <View
        style={[styles.content, isTablet && {paddingHorizontal: scale(65)}]}>
        <RNTextInputWithLabel
          label={
            editAdult
              ? translation('RELATIONSHIP')
              : translation('WHAT_IS_CHILD_NAME')
          }
          containerStyle={styles.input}
          hint={translation('NAME')}
          inputViewStyle={styles.inputBox}
          value={name}
          validationType={FORM_INPUT_TYPE.NAME}
          updateText={setName}
        />
        <LanguageDropDown
          customStyle={styles.date}
          heading={translation('DATE_OF_BIRTH')}
          text={dayjs(dob.value?.toString()).format('MMM-YYYY')}
          onPress={toggleDatePicker}
        />
      </View>
      <View
        style={[
          styles.footerButton,
          isTablet && {paddingHorizontal: scale(65)},
        ]}>
        <RNButton
          customStyle={[
            styles.button,
            currentChild.name === name.value &&
              currentChild.dob === dob.value &&
              localAvatarState === null && {
                backgroundColor: '#e9e9e9',
                borderColor: '#e9e9e9',
              },
          ]}
          title={translation('SAVE_CHANGES')}
          onClick={
            editAdult
              ? handleEditAdultProfileRequest
              : handleEditChildProfileRequest
          }
          isDisabled={
            currentChild.name === name.value &&
            currentChild.dob === dob.value &&
            localAvatarState === null
          }
        />
        <RNButton
          customStyle={{
            backgroundColor: themeColor.red,
            borderColor: themeColor.red,
            marginTop: isTablet ? 0 : verticalScale(10),
          }}
          title={translation(editAdult ? 'DELETE_ADULT' : 'DELETE_CHILD')}
          onClick={() => {
            if (!editAdult && childList.length === 1) {
              dispatch(
                addAlertData({
                  type: 'Message',
                  message: translation('CANNOT_DELETE_THE_ONLY_CHILD'),
                  onSuccess: () => {},
                }),
              );
            } else if (editAdult && adultList.length === 1) {
              dispatch(
                addAlertData({
                  type: 'Message',
                  message: translation('CANNOT_DELETE_THE_ONLY_ADULT'),
                  onSuccess: () => {},
                }),
              );
            } else {
              toggleModal();
            }
          }}
        />
      </View>
      <RNDeleteAccount
        visible={showModal}
        renderModal={toggleModal}
        nextClick={
          editAdult ? handleDeleteAdultRequest : handleDeleteChildRequest
        }
        heading={translation('DELETE_MY_ACCOUNT')}
        content={translation(
          editAdult ? 'IF_YOU_DELETE_ACCOUNT' : 'IF_YOU_DELETE_CHILD_ACCOUNT',
        )}
      />
      <RNChangeAvatarModal
        visible={showAvatarModal}
        renderModal={renderAvatarModal}
        getAvatar={getAvatar}
      />
      <RNDatePicker
        visible={dateModal}
        renderModal={toggleDatePicker}
        getMonthYear={date => {
          setDob({value: date});
        }}
      />
    </RNScreenWrapper>
  );
};

export default EditChildProfile;
