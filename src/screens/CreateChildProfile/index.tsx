/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Pressable, ScrollView, View} from 'react-native';
import BlueButton from '@tandem/assets/svg/BlueButton';
import {styles} from './styles';
import RNNumericBulletin from '@tandem/components/RNNumericBulletin';
import {avatarArray, ChildProfileStateObject, indicatorType} from './interface';
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
import {LanguageDropDown} from '@tandem/components/LanguageDropDown';
import dayjs from 'dayjs';
import {addNewChild} from '@tandem/api/creatChildProfile';
import validationFunction from '@tandem/functions/validationFunction';
import {
  saveChildData,
  saveCurrentChild,
} from '@tandem/redux/slices/createChild.slice';
import {CreateChildProfileProps} from '@tandem/navigation/types';

const CreateChildProfile = ({route}: CreateChildProfileProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const childList = useAppSelector(state => state.createChild.childList);
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
      let indexArry: indicatorType[] = [...bulletinArray];
      bulletinArray.map((item, index) => {
        if (questionIndex + 1 > index) {
          indexArry[index].isSelected = true;
        }
      });
      updateState({questionIndex: questionIndex + 1, bulletinArray: indexArry});
    } else {
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

      const response = await addNewChild({
        name: name.value,
        dob: dob.value, // ! pass in the whole date object
        gender: gender,
        avatar,
      });
      if (response) {
        if (childList.length === 0) {
          dispatch(
            saveCurrentChild({
              childId: response?.childId,
              name: name.value,
              dob: dob.value,
              gender: gender,
              avatar: avatar,
              type: 'child',
            }),
          );
        }
        dispatch(
          saveChildData({
            childId: response?.childId,
            name: name.value,
            dob: dob.value,
            gender: gender,
            avatar: avatar,
            type: 'child',
          }),
        );
      }
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 1) {
      let indexArry: indicatorType[] = [...bulletinArray];
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

  const selectDate = () => {
    setDateModal(true);
  };

  const selectGender = (type: string) => {
    switch (type) {
      case 'girl':
        updateState({gender: 'girl'});
        break;
      case 'boy':
        updateState({gender: 'boy'});
        break;
      case 'preferNotToSay':
        updateState({gender: 'preferNotToSay'});
        break;
    }
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
                  selectGender('girl');
                }}
                isSelected={gender === 'girl'}
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
                  selectGender('boy');
                }}
                isSelected={gender === 'boy'}
              />
              <RNTextComponent style={styles.sex}>
                {translation('BOY')}
              </RNTextComponent>
            </View>
            <RNButton
              title={translation('PREFER_NOT_TO_SAY')}
              onClick={() => {
                selectGender('preferNotToSay');
              }}
              onlyBorder
              customStyle={
                gender === 'preferNotToSay'
                  ? styles.footerButtonOnSelect
                  : styles.footerButton
              }
              textStyle={
                gender === 'preferNotToSay' && {color: themeColor.white}
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
                {avatarArray.map((item, index) => {
                  return (
                    <RNAvatarComponent
                      icon={item.icon}
                      customStyle={[
                        styles.avatar,
                        avatar === item.icon && {
                          backgroundColor: themeColor.themeBlue,
                        },
                      ]}
                      imgStyle={styles.avatarImg}
                      onPress={() => {
                        if (index === 0) {
                          return;
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
                        }
                        setAvatar(item.icon);
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
              <Pressable
                onPress={() => {
                  // selectDate();
                }}>
                <LanguageDropDown
                  customStyle={styles.date}
                  heading={translation('SELECT')}
                  text={translation('MUM')}
                />
              </Pressable>
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
                {avatarArray.map((item, index) => {
                  return (
                    <RNAvatarComponent
                      icon={item.icon}
                      customStyle={[
                        styles.avatar,
                        avatar === item.icon && {
                          backgroundColor: themeColor.themeBlue,
                        },
                      ]}
                      imgStyle={styles.avatarImg}
                      onPress={() => {
                        if (index === 0) {
                          return;
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
                        }
                        setAvatar(item.icon);
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
