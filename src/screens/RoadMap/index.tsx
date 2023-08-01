import {Alert, Pressable, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import YellowButton from '@tandem/assets/svg/YellowButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import Who from '@tandem/assets/svg/Who';
import Where from '@tandem/assets/svg/Where';
import themeColor from '@tandem/theme/themeColor';
import WhatThing from '@tandem/assets/svg/WhatThing';
import WhatHappens from '@tandem/assets/svg/WhatHappens';
import StyleColor from '@tandem/assets/svg/StyleColor';
import Create from '@tandem/assets/svg/CreateIcon';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {scale, verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {setQuestionIndex} from '@tandem/redux/slices/questions.slice';
import {useNavigation} from '@react-navigation/native';
import RNButton from '@tandem/components/RNButton';
import BackButton from '@tandem/assets/svg/LeftArrow';

const RNRoadmap = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const questionIndex = useAppSelector(state => state.questions.index);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // if (questionIndex === 0) {
        //   Alert.alert('');
        //   navigation.push(SCREEN_NAME.BOTTOM_TAB);
        // } else {
        //   dispatch(setQuestionIndex(questionIndex - 1));
        //   navigateTo(SCREEN_NAME.GENERATE_STORY);
        // }
        e.preventDefault();
      }),
    [navigation],
  );

  const handleNavigate = (index: number) => {
    console.log(index);
    // if (index >= questionIndex) {
    //   dispatch(setQuestionIndex(index));
    // }
    dispatch(setQuestionIndex(index));

    navigateTo(SCREEN_NAME.GENERATE_STORY);
  };

  return (
    <>
      <RNScreenWrapper style={styles.container}>
        <View style={styles.header}>
          <RNButton
            onlyIcon
            icon={<BackButton />}
            onClick={() => {
              if (questionIndex === 0) {
                // navigation.push(SCREEN_NAME.BOTTOM_TAB);
                navigateTo(SCREEN_NAME.HOME);
              } else {
                dispatch(setQuestionIndex(questionIndex - 1));
                setTimeout(() => {
                  navigateTo(SCREEN_NAME.GENERATE_STORY);
                }, 100);
              }
            }}
          />
          <Pressable
            onPress={() => {
              navigateTo(SCREEN_NAME.ACCOUNT);
            }}>
            <YellowButton />
          </Pressable>
        </View>
        <View style={styles.roadmap}>
          <Pressable
            style={styles.create}
            onPress={() => {
              if (questionIndex === 7) {
                navigateTo(SCREEN_NAME.STORY_TELLING);
              }
            }}>
            <Create mapIndex={questionIndex} />
          </Pressable>
          <Pressable
            onPress={() => {
              handleNavigate(5);
            }}
            style={[styles.stylecolor, isTablet && {left: scale(48)}]}>
            <StyleColor
              fillColor={
                questionIndex > 5 ? themeColor.themeBlue : themeColor.lightGray
              }
              textColor={
                questionIndex > 5 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
          <Pressable
            onPress={() => {
              handleNavigate(4);
            }}
            style={[
              styles.whatHappens,
              {left: isTablet ? scale(102) : scale(105)},
            ]}>
            <WhatHappens
              fillColor={
                questionIndex > 4 ? themeColor.lightGreen : themeColor.lightGray
              }
              textColor={
                questionIndex > 4 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
          <Pressable
            onPress={() => {
              handleNavigate(3);
            }}
            style={[
              styles.whatThing,
              isTablet && {left: scale(34), bottom: verticalScale(281)},
            ]}>
            <WhatThing
              fillColor={
                questionIndex > 3 ? themeColor.gold : themeColor.lightGray
              }
              textColor={
                questionIndex > 3 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
          <Pressable
            onPress={() => {
              handleNavigate(2);
            }}
            style={[styles.where, {left: isTablet ? scale(110) : scale(100)}]}>
            <Where
              fillColor={
                questionIndex > 2 ? themeColor.green : themeColor.lightGray
              }
              textColor={
                questionIndex > 2 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
          <Pressable
            onPress={() => {
              handleNavigate(1);
            }}
            style={[styles.who, isTablet && {left: scale(55)}]}>
            <Who
              fillColor={questionIndex >= 1 ? '#9A00FF' : themeColor.lightGray}
              textColor={
                questionIndex >= 1 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
          <Pressable
            style={[styles.start]}
            onPress={() => {
              handleNavigate(0);
            }}>
            <RNTextComponent style={styles.startText} isSemiBold>
              {translation('START')}
            </RNTextComponent>
          </Pressable>
        </View>
      </RNScreenWrapper>
    </>
  );
};

export default RNRoadmap;
