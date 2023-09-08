/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Pressable, ScrollView, View} from 'react-native';
import BlueButton from '@tandem/assets/svg/BlueButton';
import {styles} from './styles';
import RNNumericBulletin from '@tandem/components/RNNumericBulletin';
import {ChildProfileStateObject, IndicatorType} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import RNAvatarComponent from '@tandem/components/RNAvatarComponent';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import validationFunction from '@tandem/functions/validationFunction';
import {
  saveAdultData,
  saveChildData,
  saveCurrentAdult,
  saveCurrentChild,
} from '@tandem/redux/slices/createChild.slice';
import {CreateChildProfileProps} from '@tandem/navigation/types';
import {LanguageDropDown} from '@tandem/components/LanguageDropDown';
import {addNewChild} from '@tandem/api/creatChildProfile';
import {addNewAdult} from '@tandem/api/createAdultProfile';
import {PEOPLE} from '@tandem/constants/enums';

const GENDERS = {
  girl: 'girl',
  boy: 'boy',
  preferNotToSay: 'preferNotToSay',
};

const CreateChildProfile = ({route}: CreateChildProfileProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const avatars = useAppSelector(state => state.cache.avatars);
  const fromAddAdult = route.params?.fromAddAdult;
  const dispatch = useAppDispatch();
  const [state, setState] = useState<ChildProfileStateObject>({
    bulletinArray: [
      {index: 1, isSelected: true},
      {index: 2, isSelected: false},
      {index: 3, isSelected: false},
    ],
    questionIndex: 1,
    gender: '',
  });
  const {bulletinArray, questionIndex, gender} = state;
  const [name, setName] = useState<ValidationError>({value: ''});
  const [role, setRole] = useState<ValidationError>({value: ''});
  const [dateModal, setDateModal] = useState(false);
  const [dob, setDob] = useState<ValidationError>({
    value: new Date().toString(),
  });
  const [avatar, setAvatar] = useState<string | null>(null);

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const nextQuestion = async () => {
    if (questionIndex <= 2 && avatar === null) {
      let indexArry: IndicatorType[] = [...bulletinArray];
      bulletinArray.map((item, index) => {
        if (questionIndex + 1 > index) {
          indexArry[index].isSelected = true;
        }
      });
      updateState({questionIndex: questionIndex + 1, bulletinArray: indexArry});
    } else {
      if (fromAddAdult) {
        await handleAddAdult();
      } else {
        await handleCreateChild();
      }
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 1) {
      let indexArry: IndicatorType[] = [...bulletinArray];
      indexArry.map(item => (item.isSelected = false));
      bulletinArray.map((item, index) => {
        if (questionIndex - 1 > index) {
          indexArry[index].isSelected = true;
        }
      });
      updateState({questionIndex: questionIndex - 1});
    } else {
      navigateTo();
    }
  };

  const handleCreateChild = async () => {
    if (
      !validationFunction([
        {
          state: name,
          setState: setName,
          typeOfValidation: FORM_INPUT_TYPE.NAME,
        },
        {
          state: dob,
          setState: setDob,
          typeOfValidation: FORM_INPUT_TYPE.DOB,
        },
      ])
    ) {
      return;
    }
    // TODO make it dynamic
    try {
      const response = await addNewChild({
        name: name.value,
        dob: dob.value, // ! pass in the whole date object
        gender: gender,
        avatar,
      });
      if (response) {
        dispatch(
          saveCurrentChild({
            childId: response?.childId,
            name: name.value,
            dob: dob.value,
            gender: gender,
            avatar: avatar,
            type: PEOPLE.CHILD,
          }),
        );

        dispatch(
          saveChildData({
            childId: response?.childId,
            name: name.value,
            dob: dob.value,
            gender: gender,
            avatar: avatar,
            type: PEOPLE.CHILD,
          }),
        );
      }
    } catch (error) {
      console.log('error in adding child', error);
    }
  };

  const handleAddAdult = async () => {
    if (
      !validationFunction([
        {
          state: role,
          setState: setRole,
          typeOfValidation: FORM_INPUT_TYPE.NAME,
        },
        {
          state: dob,
          setState: setDob,
          typeOfValidation: FORM_INPUT_TYPE.DOB,
        },
      ])
    ) {
      return;
    }
    // TODO make it dynamic
    try {
      const response = await addNewAdult({
        role: role.value,
        dob: dob.value, // ! pass in the whole date object
        avatar,
      });
      if (response) {
        dispatch(
          saveCurrentAdult({
            profileId: response?.profileId,
            dob: dob.value,
            avatar: avatar,
            type: PEOPLE.ADULT,
            role: role.value,
          }),
        );
        dispatch(
          saveAdultData({
            profileId: response?.profileId,
            dob: dob.value,
            avatar: avatar,
            type: PEOPLE.ADULT,
            role: role.value,
          }),
        );
      }
    } catch (error) {
      console.log('error in adding  adult data', error);
    }
  };

  const selectDate = () => {
    setDateModal(true);
  };

  const selectGender = (type: string) => {
    updateState({gender: type});
  };

  const disableButtonForChilForm = () => {
    if (questionIndex === 1 && !gender) {
      return false;
    }
    if (questionIndex === 2 && !name.value) {
      return false;
    }
    if (avatar === null && questionIndex === 3) {
      return false;
    }

    return true;
  };

  const disableButtonForAdultForm = () => {
    if (questionIndex === 1 && role.value === '') {
      return false;
    }
    if (avatar === null && questionIndex === 3) {
      return false;
    }
    return true;
  };

  const childForm = () => {
    switch (questionIndex) {
      case 1:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('LETS_START_WITH_YOUR_CHILD')}
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.content,
                isTablet && {fontSize: 17.5, marginTop: 8},
              ]}>
              {translation('ADD_ONE_OF_YOUR_CHILDREN')}
            </RNTextComponent>
            <View style={styles.options}>
              <RNEmojiWithText
                icon={'👧'}
                customStyle={styles.girl}
                bgcColor={themeColor.purple}
                onPress={() => {
                  selectGender(GENDERS.girl);
                }}
                isSelected={gender === GENDERS.girl}
              />
              <RNTextComponent style={styles.sex}>
                {translation('GIRL')}
              </RNTextComponent>
            </View>
            <View style={styles.options}>
              <RNEmojiWithText
                icon={'👦'}
                customStyle={styles.boy}
                bgcColor={themeColor.lightGreen}
                onPress={() => {
                  selectGender(GENDERS.boy);
                }}
                isSelected={gender === GENDERS.boy}
              />
              <RNTextComponent style={styles.sex}>
                {translation('BOY')}
              </RNTextComponent>
            </View>
            <RNButton
              title={translation('PREFER_NOT_TO_SAY')}
              onClick={() => {
                selectGender(GENDERS.preferNotToSay);
              }}
              onlyBorder
              customStyle={
                gender === GENDERS.preferNotToSay
                  ? styles.footerButtonOnSelect
                  : styles.footerButton
              }
              textStyle={
                gender === GENDERS.preferNotToSay && {color: themeColor.white}
              }
            />
          </>
        );
      case 2:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('ADD_CHILD_INFO')}
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.content,
                isTablet && {fontSize: 17.5, marginTop: 8},
              ]}>
              {translation('COMPLETE_A_QUESTIONAIRE')}
            </RNTextComponent>
            <View
              style={[
                styles.inputField,
                isTablet && {width: 400, alignSelf: 'center'},
              ]}>
              <RNTextInputWithLabel
                label={translation('WHAT_IS_CHILD_NAME')}
                inputViewStyle={[
                  styles.inputBox,
                  isTablet && {borderRadius: 12, marginTop: 8},
                ]}
                containerStyle={styles.containerBox}
                value={name}
                validationType={FORM_INPUT_TYPE.NAME}
                updateText={setName}
                hint={translation('ENTER_NAME')}
              />
              <LanguageDropDown
                customStyle={styles.date}
                heading={translation('DATE_OF_BIRTH')}
                text={dayjs(dob.value?.toString()).format('DD/MM/YYYY')}
                onPress={selectDate}
              />
            </View>
          </>
        );
      case 3:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('SELECT_AN_AVATAR')}
            </RNTextComponent>
            <RNTextComponent
              style={[styles.content, isTablet && {fontSize: 18}]}>
              {translation('YOU_CAN_CHANGE_IT_AFTER')}
            </RNTextComponent>
            <View style={styles.avatarBox}>
              <ScrollView
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}>
                {avatars.map((item, index) => {
                  return (
                    <RNAvatarComponent
                      key={index.toString()}
                      icon={item.file}
                      customStyle={[
                        styles.avatar,
                        avatar === item.path && {
                          backgroundColor: themeColor.themeBlue,
                        },
                      ]}
                      imgStyle={styles.avatarImg}
                      onPress={() => {
                        // if (index === 0) {
                        //   return;
                        // ImagePicker.openPicker({
                        //   width: 300,
                        //   height: 300,
                        //   cropping: true,
                        //   includeBase64: true,
                        //   loadingLabelText: 'Image',
                        //   mediaType: 'photo',
                        // })
                        //   .then(response => {
                        //     setImageData(response);
                        //   })
                        //   .catch(err => {
                        //     console.log(err);
                        //   });
                        // }
                        setAvatar(item.path);
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        );
    }
  };

  const adultForm = () => {
    switch (questionIndex) {
      case 1:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('YOUR_RELATIONSHIP')}
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.content,
                isTablet && {fontSize: 17.5, marginTop: 8},
              ]}>
              {translation('WHICH_OF_THESE_BEST_DESCRIBE')}
            </RNTextComponent>
            <View
              style={[
                styles.inputField,
                isTablet && {width: 400, alignSelf: 'center'},
              ]}>
              <RNTextInputWithLabel
                label={translation('RELATIONSHIP')}
                inputViewStyle={[
                  styles.inputBox,
                  isTablet && {borderRadius: 12, marginTop: 8},
                ]}
                containerStyle={styles.containerBox}
                value={role}
                validationType={FORM_INPUT_TYPE.NAME}
                updateText={setRole}
                hint={translation('ENTER')}
              />
            </View>
          </>
        );
      case 2:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('YOUR_DOB')}
            </RNTextComponent>
            <View
              style={[
                styles.inputField,
                isTablet && {width: 400, alignSelf: 'center'},
              ]}>
              <LanguageDropDown
                customStyle={styles.date}
                heading={translation('DATE_OF_BIRTH')}
                text={dayjs(dob.value?.toString()).format('DD/MM/YYYY')}
                onPress={selectDate}
              />
            </View>
          </>
        );
      case 3:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('SELECT_AN_AVATAR')}
            </RNTextComponent>
            <RNTextComponent
              style={[styles.content, isTablet && {fontSize: 18}]}>
              {translation('YOU_CAN_CHANGE_IT_AFTER')}
            </RNTextComponent>
            <View style={styles.avatarBox}>
              <ScrollView
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}>
                {avatars.map(item => {
                  return (
                    <RNAvatarComponent
                      icon={item.file}
                      customStyle={[
                        styles.avatar,
                        avatar === item.path && {
                          backgroundColor: themeColor.themeBlue,
                        },
                      ]}
                      imgStyle={styles.avatarImg}
                      onPress={() => {
                        // if (index === 0) {
                        //   return;
                        // ImagePicker.openPicker({
                        //   width: 300,
                        //   height: 300,
                        //   cropping: true,
                        //   includeBase64: true,
                        //   loadingLabelText: 'Image',
                        //   mediaType: 'photo',
                        // })
                        //   .then(response => {
                        //     setImageData(response);
                        //     console.log(response, 'sdfghjrfdsresponse');
                        //   })
                        //   .catch(err => {
                        //     console.log(err);
                        //   });
                        // }
                        setAvatar(item.path);
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        );
    }
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <Pressable
        onPress={() => {
          navigateTo(SCREEN_NAME.ACCOUNT);
        }}>
        <BlueButton style={styles.button} />
      </Pressable>
      <View style={styles.indicator}>
        {bulletinArray.map(item => (
          <RNNumericBulletin selected={item.isSelected} heading={item.index} />
        ))}
      </View>
      {fromAddAdult ? adultForm() : childForm()}
      <View style={[styles.bottomButtons, isTablet && {width: 430}]}>
        <RNButton
          title={'<'}
          onClick={previousQuestion}
          customStyle={[styles.left, isTablet && {maxWidth: 92}]}
          textStyle={styles.leftText}
        />
        <RNButton
          title={translation('NEXT')}
          onClick={nextQuestion}
          customStyle={
            !fromAddAdult
              ? !disableButtonForChilForm() && styles.disabled
              : !disableButtonForAdultForm() && styles.disabled
          }
          textStyle={[styles.rightText, isTablet && {maxWidth: 310}]}
          isDisabled={
            !fromAddAdult
              ? !disableButtonForChilForm()
              : !disableButtonForAdultForm()
          }
        />
      </View>
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

export default CreateChildProfile;
