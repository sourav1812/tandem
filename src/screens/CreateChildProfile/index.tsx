/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {
  Pressable,
  ScrollView,
  View,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
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
import ImageCropPicker from 'react-native-image-crop-picker';
import {cacheAvatars} from '@tandem/functions/cache';
import RNChooseImage from '@tandem/components/RNChooseImage';
import Boy from '@tandem/assets/svg/Boy';
import Girl from '@tandem/assets/svg/Girl';
import {RELATIONSHIP_ARRAY} from '@tandem/constants/local';
import RNDatePicker from '@tandem/components/RNDatePicker';
import {verticalScale, scale} from 'react-native-size-matters';
import {width} from '@tandem/helpers/dimensions';

const GENDERS = {
  girl: 'girl',
  boy: 'boy',
  preferNotToSay: 'preferNotToSay',
};

const CreateChildProfile = ({route}: CreateChildProfileProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const avatars = useAppSelector(state => state.cache.avatars);
  const portrait = useAppSelector(state => state.orientation.isPortrait);
  const socialLoginData = useAppSelector(
    state => state.userData.socialDataObject,
  );
  const fromAddAdult = route.params?.fromAddAdult;
  const initialState = {
    bulletinArray: [
      {index: 1, isSelected: true},
      {index: 2, isSelected: false},
      {index: 3, isSelected: false},
    ],
    questionIndex: 1,
    gender: '',
    imagePickerUrl: socialLoginData.image !== '' ? socialLoginData.image : null,
    showImageModal: false,
    showRoles: false,
  };
  const dispatch = useAppDispatch();
  const [state, setState] = useState<ChildProfileStateObject>(initialState);
  const {bulletinArray, questionIndex, gender, showImageModal, showRoles} =
    state;
  const [name, setName] = useState<ValidationError>({value: ''});
  const [role, setRole] = useState<null | string>(null);
  const [otherRole, setOtherRole] = useState<ValidationError>({value: ''});
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
  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [dateModal]);

  const nextQuestion = async () => {
    Keyboard.dismiss();
    if (questionIndex <= 2) {
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
      ]) &&
      role === null
    ) {
      return;
    }
    try {
      if (!avatar) {
        return;
      }
      const childObject: {
        name: string;
        dob: string;
        gender: string;
        avatar: string;
        type?: PEOPLE;
        childId?: string;
      } = {
        name: name.value,
        dob: dob.value,
        gender,
        avatar,
      };
      const response = await addNewChild(childObject, () => {
        setState(initialState);
      });
      if (response) {
        childObject.type = PEOPLE.CHILD;
        childObject.childId = response?.childId;
        dispatch(saveCurrentChild(childObject));
        dispatch(saveChildData(childObject));
      }
    } catch (error) {
      console.log('error in adding child', error);
    }
  };

  const handleAddAdult = async () => {
    if (
      !validationFunction([
        {
          state: dob,
          setState: setDob,
          typeOfValidation: FORM_INPUT_TYPE.DOB,
        },
      ])
    ) {
      return;
    }
    if (!role || !avatar) {
      return;
    }
    try {
      const adultObject: {
        role: string;
        dob: string;
        avatar: string;
        type?: PEOPLE;
        profileId?: string;
      } = {
        role: role === 'Other' ? otherRole.value || role : role,
        dob: dob.value,
        avatar,
      };
      const response = await addNewAdult(adultObject, () => {
        setState(initialState);
      });
      if (response) {
        adultObject.profileId = response?.profileId;
        adultObject.type = PEOPLE.ADULT;
        dispatch(saveCurrentAdult(adultObject));
        dispatch(saveAdultData(adultObject));
      }
    } catch (error) {
      console.log('error in adding  adult data', error);
    }
  };

  const selectDate = () => {
    setTimeout(() => {
      setDateModal(true);
    }, 200);
  };

  const selectGender = (type: string) => {
    updateState({gender: type});
  };

  const renderImageModal = () => {
    updateState({showImageModal: !showImageModal});
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
    if (questionIndex === 1 && role === null) {
      return false;
    }
    if (avatar === null && questionIndex === 3) {
      return false;
    }
    return true;
  };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 350,
      height: 350,
      cropping: true,
      loadingLabelText: 'Image',
      mediaType: 'photo',
    })
      .then(response => {
        cacheAvatars('imageFromGallery', response.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 350,
      height: 350,
      cropping: true,
      loadingLabelText: 'Image',
      mediaType: 'photo',
    })
      .then(response => {
        cacheAvatars('imageFromGallery', response.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleRoles = () => {
    updateState({showRoles: !showRoles});
  };

  const toggleDatePicker = () => {
    setDateModal(!dateModal);
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
                isTablet && {fontSize: verticalScale(11), marginTop: 8},
              ]}>
              {translation('ADD_ONE_OF_YOUR_CHILDREN')}
            </RNTextComponent>
            <View
              style={{
                flexDirection: !portrait ? 'row' : 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: width.wMax - verticalScale(80),
                alignSelf: 'center',
              }}>
              <View style={styles.options}>
                <RNEmojiWithText
                  Svgimg={Girl}
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
                  // icon={'👦'}
                  Svgimg={Boy}
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
                isTablet && {fontSize: verticalScale(11), marginTop: 8},
              ]}>
              {translation('COMPLETE_A_QUESTIONAIRE')}
            </RNTextComponent>
            <View
              style={[
                styles.inputField,
                {
                  width: width.wMax - (isTablet ? scale(120) : scale(50)),
                  alignSelf: 'center',
                },
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
                text={dayjs(dob.value?.toString()).format('YYYY')}
                onPress={() => {
                  Keyboard.dismiss();
                  selectDate();
                }}
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
              style={[
                styles.content,
                isTablet && {
                  fontSize: verticalScale(11),
                  marginBottom: verticalScale(10),
                },
              ]}>
              {translation('YOU_CAN_CHANGE_IT_AFTER')}
            </RNTextComponent>
            <View style={styles.avatarBox}>
              <ScrollView
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}>
                {avatars.map((item, index) => {
                  // if (index === 0) {
                  //   console.log(item, 'indexvsdff');
                  //   return (
                  //     <RNAvatarComponentWithEdit
                  //       onEdit={renderImageModal}
                  //       onSelect={() => {
                  //         if (item.isPickerImg) {
                  //           renderImageModal();
                  //         } else {
                  //           setAvatar(item.path);
                  //         }
                  //       }}
                  //       icon={{uri: imagePickerUrl || item.file}}
                  //       imgStyle={[
                  //         {
                  //           marginTop: verticalScale(12),
                  //           borderWidth: 3,
                  //           borderColor: 'transparent',
                  //         },
                  //         avatar === item.path && {
                  //           borderColor: themeColor.themeBlue,
                  //           borderRadius: 1000,
                  //         },
                  //       ]}
                  //       isImageFromPicker={imagePickerUrl ? true : false}
                  //     />
                  //   );
                  // } else {
                  //   return (
                  //     <RNAvatarComponent
                  //       icon={item.file}
                  //       customStyle={[
                  //         styles.avatar,
                  //         avatar === item.path && {
                  //           backgroundColor: themeColor.themeBlue,
                  //         },
                  //       ]}
                  //       imgStyle={styles.avatarImg}
                  //       onPress={() => {
                  //         setAvatar(item.path);
                  //       }}
                  //     />
                  //   );
                  // }
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
                        setAvatar(item.path);
                      }}
                      key={index.toString()}
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
                isTablet && {fontSize: verticalScale(12), marginTop: 8},
              ]}>
              {translation('WHICH_OF_THESE_BEST_DESCRIBE')}
            </RNTextComponent>
            <View
              style={[
                styles.inputField,
                {width: width.wMax - scale(100), alignSelf: 'center'},
                isTablet && {
                  alignSelf: 'center',
                },
              ]}>
              <LanguageDropDown
                customStyle={[
                  styles.date,
                  isTablet && {maxHeight: verticalScale(42)},
                ]}
                heading={translation('RELATIONSHIP')}
                text={role || translation('SELECT')}
                onPress={() => {
                  toggleRoles();
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                }}
              />
              {showRoles && (
                <View style={styles.dropDown}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {RELATIONSHIP_ARRAY.map((item, index) => {
                      return (
                        <Pressable
                          style={[
                            styles.role,
                            {
                              backgroundColor:
                                role === item.role ? themeColor.gold : 'white',
                            },
                          ]}
                          onPress={() => {
                            setRole(item.role);
                            toggleRoles();
                            LayoutAnimation.configureNext(
                              LayoutAnimation.Presets.easeInEaseOut,
                            );
                          }}>
                          <RNTextComponent
                            style={{
                              fontSize: isTablet
                                ? verticalScale(14)
                                : verticalScale(12),
                            }}
                            key={index.toString()}>
                            {item.role}
                          </RNTextComponent>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
              {role === 'Other' && (
                <RNTextInputWithLabel
                  inputViewStyle={[
                    styles.inputBox,
                    isTablet && {borderRadius: 12, marginTop: 8},
                  ]}
                  containerStyle={styles.containerBox}
                  value={otherRole}
                  validationType={FORM_INPUT_TYPE.NAME}
                  updateText={setOtherRole}
                  hint={translation('ENTER_NAME')}
                />
              )}
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
                {width: width.wMax - scale(100), alignSelf: 'center'},
              ]}>
              <LanguageDropDown
                customStyle={styles.date}
                heading={translation('DATE_OF_BIRTH')}
                text={dayjs(dob.value?.toString()).format('YYYY')}
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
              style={[
                styles.content,
                isTablet && {
                  fontSize: verticalScale(11),
                  marginBottom: verticalScale(10),
                },
              ]}>
              {translation('YOU_CAN_CHANGE_IT_AFTER')}
            </RNTextComponent>
            <View style={styles.avatarBox}>
              <ScrollView
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}>
                {avatars.map((item, index) => {
                  // if (index === 0) {
                  //   console.log(item, 'indexvsdff');
                  //   return (
                  //     <RNAvatarComponentWithEdit
                  //       onEdit={renderImageModal}
                  //       onSelect={() => {
                  //         if (item.isPickerImg) {
                  //           renderImageModal();
                  //         } else {
                  //           setAvatar(item.path);
                  //         }
                  //       }}
                  //       icon={{uri: imagePickerUrl || item.file}}
                  //       imgStyle={[
                  //         {
                  //           marginTop: verticalScale(12),
                  //           borderWidth: 3,
                  //           borderColor: 'transparent',
                  //         },
                  //         avatar === item.path && {
                  //           borderColor: themeColor.themeBlue,
                  //           borderRadius: 1000,
                  //         },
                  //       ]}
                  //       isImageFromPicker={imagePickerUrl ? true : false}
                  //     />
                  //   );
                  // } else {
                  //   return (
                  //     <RNAvatarComponent
                  //       icon={item.file}
                  //       customStyle={[
                  //         styles.avatar,
                  //         avatar === item.path && {
                  //           backgroundColor: themeColor.themeBlue,
                  //         },
                  //       ]}
                  //       imgStyle={styles.avatarImg}
                  //       onPress={() => {
                  //         setAvatar(item.path);
                  //       }}
                  //     />
                  //   );
                  // }
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
                        setAvatar(item.path);
                      }}
                      key={index.toString()}
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
        <BlueButton
          style={[
            styles.button,
            {marginTop: isTablet ? verticalScale(20) : verticalScale(40)},
          ]}
        />
      </Pressable>
      <View style={styles.indicator}>
        {bulletinArray.map((item, index) => (
          <RNNumericBulletin
            selected={item.isSelected}
            heading={item.index}
            key={index.toString()}
          />
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
      {/* <DatePicker
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
      /> */}
      <RNChooseImage
        visible={showImageModal}
        renderModal={renderImageModal}
        openCamera={openCamera}
        openGallery={openGallery}
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

export default CreateChildProfile;
