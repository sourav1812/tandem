import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {Image, Pressable, View} from 'react-native';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {StateObject, languageDropDownProp} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import DownArrow from '@tandem/assets/svg/DownArrow';
import RNButton from '@tandem/components/RNButton';
import RNDeleteAccount from '@tandem/components/RNDeleteAccount';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import dayjs from 'dayjs';
import {RootState} from '@tandem/redux/store';
import {avatarArray} from '../CreateChildProfile/interface';

const EditChildProfile = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [state, setState] = useState<StateObject>({
    showModal: false,
  });
  const currentChild = useAppSelector(
    (state1: RootState) => state1.createChild.currentChild,
  );
  const [name, setName] = useState<ValidationError>({
    value: currentChild.name || '',
  });
  const [dob, setDob] = useState(
    new Date(currentChild.dob).toDateString() || dayjs().format('DD/MM/YYYY'),
  );
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
        heading={name.value}
        titleStyle={styles.text}
        customStyle={styles.heading}
      />
      <Image
        source={
          currentChild?.imageUrl
            ? {
                uri: currentChild?.imageUrl,
              }
            : avatarArray[currentChild?.avtarIndex].icon
        }
        style={styles.profile}
      />
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
        <LanguageDropDown heading={translation('DATE_OF_BIRTH')} text={dob} />
        <LanguageDropDown
          text={translation('FEATURES')}
          heading={translation('CHILD_FEATURES')}
        />
      </View>
      <View
        style={[
          styles.footerButton,
          isTablet && {paddingHorizontal: scale(65)},
        ]}>
        <RNButton
          customStyle={styles.button}
          title={translation('SAVE_CHANGES')}
          onClick={() => {}}
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
    </RNScreenWrapper>
  );
};

export default EditChildProfile;

const LanguageDropDown = ({heading, text}: languageDropDownProp) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  return (
    <View>
      <RNTextComponent
        style={[
          styles.dropdownBox,
          {fontSize: isTablet ? 16 : verticalScale(12)},
        ]}>
        {heading}
      </RNTextComponent>
      <Pressable
        style={[
          styles.dropdown,
          isTablet && {paddingVertical: verticalScale(10)},
        ]}>
        <RNTextComponent style={[isTablet && {fontSize: 18}]}>
          {text}
        </RNTextComponent>
        <DownArrow />
      </Pressable>
    </View>
  );
};
