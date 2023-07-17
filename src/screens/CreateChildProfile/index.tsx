import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Pressable, ScrollView, View} from 'react-native';
import {CreateChildProfileProps} from '@tandem/navigation/types';
import BlueButton from '@tandem/assets/svg/BlueButton';
import {styles} from './styles';
import RNNumericBulletin from '@tandem/components/RNNumericBulletin';
import {avatarArray, childProfileStateObject, indicatorType} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import RNAvatarComponent from '@tandem/components/RNAvatarComponent';
import Camera from '@tandem/assets/svg/Camera';

const CreateChildProfile = ({navigation}: CreateChildProfileProps) => {
  const isTablet = checkIfTablet();
  const [state, setState] = useState<childProfileStateObject>({
    bulletinArray: [
      {index: 1, isSelected: true},
      {index: 2, isSelected: false},
      {index: 3, isSelected: false},
    ],
    questionIndex: 1,
    name: '',
    date: '',
  });

  const {bulletinArray, questionIndex, name, date} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const nextQuestion = () => {
    if (questionIndex <= 2) {
      let indexArry: indicatorType[] = [...bulletinArray];
      bulletinArray.map((item, index) => {
        if (questionIndex + 1 > index) {
          indexArry[index].isSelected = true;
        }
      });
      updateState({questionIndex: questionIndex + 1, bulletinArray: indexArry});
    } else {
      navigation.navigate(COMPONENTSNAME.ACCOUNT);
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

  const form = () => {
    switch (questionIndex) {
      case 1:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('LETS_START_WITH_YOUR_CHILD')}
            </RNTextComponent>
            <RNTextComponent
              style={[styles.content, isTablet && {fontSize: 22}]}>
              {translation('ADD_ONE_OF_YOUR_CHILDREN')}
            </RNTextComponent>
            <View style={styles.options}>
              <RNEmojiWithText
                icon={'👧'}
                customStyle={styles.girl}
                bgcColor={themeColor.purple}
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
              />
              <RNTextComponent style={styles.sex}>
                {translation('BOY')}
              </RNTextComponent>
            </View>
            <RNButton
              title={translation('PREFER_NOT_TO_SAY')}
              onClick={() => {}}
              onlyBorder
              customStyle={styles.footerButton}
            />
          </>
        );
      case 2:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.heading}>
              {translation('LETS_START_WITH_YOUR_CHILD')}
            </RNTextComponent>
            <RNTextComponent
              style={[styles.content, isTablet && {fontSize: 22}]}>
              {translation('ADD_ONE_OF_YOUR_CHILDREN')}
            </RNTextComponent>
            <View style={styles.inputField}>
              <RNTextInputWithLabel
                showLabel
                label={translation('WHAT_IS_CHILD_NAME')}
                inputViewStyle={styles.inputBox}
                containerStyle={styles.containerBox}
                value={name}
                updateText={e => updateState({name: e})}
                hint={translation('ENTER_NAME')}
              />
              <RNTextInputWithLabel
                showLabel
                label={translation('DATE_OF_BIRTH')}
                inputViewStyle={styles.inputBox}
                containerStyle={styles.containerBox}
                value={date}
                updateText={e => updateState({date: e})}
                hint={translation('ENTER_DATE_OF_BIRTH')}
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
              style={[styles.content, isTablet && {fontSize: 22}]}>
              {translation('YOU_CAN_CHANGE_IT_AFTER')}
            </RNTextComponent>
            <View style={styles.avatarBox}>
              <ScrollView
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}>
                <RNAvatarComponent
                  Icon={{icon: Camera}}
                  customStyle={styles.avatar2}
                  pressableDisable
                />
                {avatarArray.map(item => {
                  return (
                    <RNAvatarComponent
                      Icon={item}
                      customStyle={styles.avatar}
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
      <Pressable onPress={() => {}}>
        <BlueButton style={styles.button} />
      </Pressable>
      <View style={styles.indicator}>
        {bulletinArray.map(item => (
          <RNNumericBulletin selected={item.isSelected} heading={item.index} />
        ))}
      </View>
      {form()}
      <View style={styles.bottomButtons}>
        <RNButton
          title={'<'}
          onClick={previousQuestion}
          customStyle={styles.left}
          textStyle={styles.leftText}
        />
        <RNButton
          title={translation('NEXT')}
          onClick={nextQuestion}
          textStyle={styles.rightText}
        />
      </View>
    </RNScreenWrapper>
  );
};

export default CreateChildProfile;
