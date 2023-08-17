/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Pressable, ScrollView, View} from 'react-native';
import BlueButton from '@tandem/assets/svg/BlueButton';
import {styles} from './styles';
import RNNumericBulletin from '@tandem/components/RNNumericBulletin';
import {avatarArray, childProfileStateObject, indicatorType} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import RNAvatarComponent from '@tandem/components/RNAvatarComponent';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import DatePicker from 'react-native-date-picker';
import {LanguageDropDown} from '@tandem/components/LanguageDropDown';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import dayjs from 'dayjs';
import {addNewChild} from '@tandem/api/creatChildProfile';
import validationFunction from '@tandem/functions/validationFunction';
import {saveChildData} from '@tandem/redux/slices/createChild.slice';

const CreateChildProfile = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const childList = useAppSelector(state => state.createChild.childList);
  console.log(childList, 'childDatachildData');
  const dispatch = useAppDispatch();
  const [state, setState] = useState<childProfileStateObject>({
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
  const [imageData, setImageData] = useState<ImageOrVideo | null>(null);
  const [avtarIndex, setavtarIndex] = useState<number | null>(null);

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetChildData());
  //   };
  // }, []);

  const nextQuestion = async () => {
    if (questionIndex <= 2) {
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
      const response = await addNewChild({
        name: 'mohan',
        age: '32',
        gender: 'male',
        avatar: 'sjdfkljklfskl34349349895jksjdfksj',
      });
      console.log(response, 'responseresponse');
      if (response) {
        dispatch(
          saveChildData([
            ...childList,
            {
              ...(response?.childId && {childId: response?.childId}),
              ...(name.value && {name: name.value}),
              ...(dob.value && {dob: dob.value}),
              ...(gender && {gender: gender}),
              ...(avtarIndex && {avtarIndex: avtarIndex}),
            },
          ]),
        );
        setTimeout(() => {
          navigateTo(SCREEN_NAME.BOTTOM_TAB, {}, true);
        }, 300);
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

  const form = () => {
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
                  // Alert.alert('');
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
                      icon={
                        imageData && index === 0
                          ? {uri: imageData?.path}
                          : item.icon
                      }
                      customStyle={[
                        styles.avatar,
                        index === 0 && {justifyContent: 'center'},
                        index === 0 &&
                          index === avtarIndex &&
                          imageData && {
                            borderWidth: 3,
                            borderColor: themeColor.themeBlue,
                          },
                        index === avtarIndex &&
                          index !== 0 && {
                            backgroundColor: themeColor.themeBlue,
                          },
                        isTablet && {marginTop: verticalScale(24)},
                      ]}
                      imgStyle={
                        index !== 0
                          ? styles.avatarImg
                          : imageData && {height: '100%', width: '100%'}
                      }
                      onPress={() => {
                        if (index === 0) {
                          ImagePicker.openPicker({
                            width: 500,
                            height: 500,
                            cropping: true,
                            includeBase64: true,
                            loadingLabelText: 'Image',
                          })
                            .then(response => {
                              setImageData(response);
                              console.log(response);
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }
                        setavtarIndex(index);
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
      {form()}
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
          customStyle={gender === '' && styles.disabled}
          textStyle={[styles.rightText, isTablet && {maxWidth: 310}]}
        />
      </View>
      <DatePicker
        modal
        mode={'date'}
        open={dateModal}
        date={new Date(dob.value)}
        onConfirm={date => {
          setDateModal(false);
          setDob({value: date});
        }}
        onCancel={() => {
          setDateModal(false);
        }}
      />
    </RNScreenWrapper>
  );
};

export default CreateChildProfile;
