import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {Image, Pressable, View} from 'react-native';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {StateObject} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale} from 'react-native-size-matters';
import RNButton from '@tandem/components/RNButton';
import RNDeleteAccount from '@tandem/components/RNDeleteAccount';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import dayjs from 'dayjs';
import {RootState} from '@tandem/redux/store';
import RNChangeAvatarModal from '@tandem/components/RNChangeAvatarModal';
import DatePicker from 'react-native-date-picker';
import {LanguageDropDown} from '@tandem/components/LanguageDropDown';
import validationFunction from '@tandem/functions/validationFunction';
import {editChildProfile} from '@tandem/api/editChildProfile';
import userProfile from '@tandem/api/userProfile';
import {saveCurrentChild} from '@tandem/redux/slices/createChild.slice';

const EditChildProfile = () => {
  const dispatch = useAppDispatch();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const currentChild = useAppSelector(
    (state1: RootState) => state1.createChild.currentChild,
  );
  const [name, setName] = useState<ValidationError>({
    value: currentChild.name || '',
  });
  const [dateModal, setDateModal] = useState(false);

  const [dob, setDob] = useState<ValidationError>({
    value: currentChild.dob || '',
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

  const selectDate = () => {
    setDateModal(true);
  };

  const getAvatar = (url: string | null) => {
    console.log(url);
    updateState({localAvatarState: url});
  };

  const handleEditProfileRequest = async () => {
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
            uri: localAvatarState || currentChild?.avatar,
          }}
          style={styles.profile}
        />
      </Pressable>
      <View
        style={[styles.content, isTablet && {paddingHorizontal: scale(65)}]}>
        <RNTextInputWithLabel
          label={translation('WHAT_IS_CHILD_NAME')}
          containerStyle={styles.input}
          hint={translation('NAME')}
          inputViewStyle={styles.inputBox}
          value={name}
          validationType={FORM_INPUT_TYPE.NAME}
          updateText={setName}
        />
        <Pressable
          onPress={() => {
            selectDate();
          }}>
          <LanguageDropDown
            customStyle={styles.date}
            heading={translation('DATE_OF_BIRTH')}
            text={dayjs(dob.value?.toString()).format('DD/MM/YYYY')}
          />
        </Pressable>
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
          onClick={handleEditProfileRequest}
          isDisabled={
            currentChild.name === name.value &&
            currentChild.dob === dob.value &&
            localAvatarState === null
          }
        />
        <RNTextComponent
          style={styles.bottom}
          isSemiBold
          handleOnPress={toggleModal}>
          {translation('DELETE_ACCOUNT')}
        </RNTextComponent>
      </View>
      <RNDeleteAccount
        visible={showModal}
        renderModal={toggleModal}
        nextClick={() => {}}
        heading={translation('DELETE_MY_ACCOUNT')}
        content={translation('IF_YOU_DELETE_CHILD_ACCOUNT')}
      />
      <RNChangeAvatarModal
        visible={showAvatarModal}
        renderModal={renderAvatarModal}
        getAvatar={getAvatar}
      />
      <DatePicker
        modal
        mode={'date'}
        open={dateModal}
        date={new Date(dob.value)}
        onConfirm={date => {
          setDateModal(false);
          setDob({value: date.toISOString()});
        }}
        onCancel={() => {
          setDateModal(false);
        }}
      />
    </RNScreenWrapper>
  );
};

export default EditChildProfile;
