import {LayoutAnimation, Platform, Pressable, View} from 'react-native';
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
import BackButton from '@tandem/assets/svg/LeftArrow';
import {verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {setQuestionIndex} from '@tandem/redux/slices/questions.slice';
import {useSelector} from 'react-redux';
import {RootState} from '@tandem/redux/store';
import RNButton from '@tandem/components/RNButton';
import {useNavigation} from '@react-navigation/native';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';

const RNRoadmap = () => {
  const dispatch = useAppDispatch();
  const isTablet = checkIfTablet();
  const questionIndex = useAppSelector(state => state.questions.index);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
    2: {height: 0, width: 0, x: 0, y: 0},
    3: {height: 0, width: 0, x: 0, y: 0},
    4: {height: 0, width: 0, x: 0, y: 0},
    5: {height: 0, width: 0, x: 0, y: 0},
    6: {height: 0, width: 0, x: 0, y: 0},
  });
  const portrait = useSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  let scale = portrait ? 1 : 1.4;
  const navigation = useNavigation();

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
    // if (index >= questionIndex) {
    //   dispatch(setQuestionIndex(index));
    // }
    dispatch(setQuestionIndex(index));
    navigateTo(SCREEN_NAME.GENERATE_STORY);
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <RNButton
          onlyIcon
          icon={<BackButton />}
          onClick={() => {
            navigateTo(SCREEN_NAME.HOME);
          }}
        />
        <Pressable
          onPress={() => {
            navigateTo(SCREEN_NAME.ACCOUNT);
          }}>
          <YellowButton />
        </Pressable>
      </View>
      <View
        style={[
          styles.roadmap,
          !isTablet && Platform.OS !== 'ios' && {paddingTop: 10},
        ]}>
        <Pressable
          onLayout={event => {
            const layout = event.nativeEvent?.layout;
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setPositionRefs(prev => ({
              ...prev,
              6: layout,
            }));
          }}
          style={[styles.create, {left: verticalScale(35) / scale}]}
          onPress={() => {
            navigateTo(SCREEN_NAME.STORY_TELLING);
          }}>
          <Create scale={scale} mapIndex={questionIndex} />
        </Pressable>
        {positionRefs[6].y !== 0 && (
          <Pressable
            onLayout={event => {
              const layout = event.nativeEvent?.layout;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setPositionRefs(prev => ({
                ...prev,
                5: layout,
              }));
            }}
            onPress={() => {
              handleNavigate(5);
            }}
            style={[
              styles.stylecolor,
              {
                top: positionRefs[6].y + verticalScale(110) / scale,
                left: positionRefs[6].x - verticalScale(83) / scale,
              },
            ]}>
            <StyleColor
              scale={scale}
              fillColor={
                questionIndex > 5 ? themeColor.themeBlue : themeColor.lightGray
              }
              textColor={
                questionIndex > 5 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
        )}
        {positionRefs[5].y !== 0 && (
          <Pressable
            onLayout={event => {
              const layout = event.nativeEvent?.layout;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setPositionRefs(prev => ({
                ...prev,
                4: layout,
              }));
            }}
            onPress={() => {
              handleNavigate(4);
            }}
            style={[
              styles.whatHappens,
              {
                top: positionRefs[5].y + verticalScale(71.6) / scale,
                left: positionRefs[5].x + verticalScale(81) / scale,
              },
            ]}>
            <WhatHappens
              scale={scale}
              fillColor={
                questionIndex > 4 ? themeColor.lightGreen : themeColor.lightGray
              }
              textColor={
                questionIndex > 4 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
        )}
        {positionRefs[4].y !== 0 && (
          <Pressable
            onLayout={event => {
              const layout = event.nativeEvent?.layout;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setPositionRefs(prev => ({
                ...prev,
                3: layout,
              }));
            }}
            onPress={() => {
              handleNavigate(3);
            }}
            style={[
              styles.whatThing,
              {
                top: positionRefs[4].y + verticalScale(80) / scale,
                left: positionRefs[4].x - verticalScale(102) / scale,
              },
            ]}>
            <WhatThing
              scale={scale}
              fillColor={
                questionIndex > 3 ? themeColor.gold : themeColor.lightGray
              }
              textColor={
                questionIndex > 3 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
        )}
        {positionRefs[3].y !== 0 && (
          <Pressable
            onLayout={event => {
              const layout = event.nativeEvent?.layout;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setPositionRefs(prev => ({
                ...prev,
                2: layout,
              }));
            }}
            onPress={() => {
              handleNavigate(2);
            }}
            style={[
              styles.where,
              {
                top: positionRefs[3].y + verticalScale(96.5) / scale,
                left: positionRefs[3].x + verticalScale(105) / scale,
              },
            ]}>
            <Where
              scale={scale}
              fillColor={
                questionIndex > 2 ? themeColor.green : themeColor.lightGray
              }
              textColor={
                questionIndex > 2 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
        )}
        {positionRefs[2].y !== 0 && (
          <Pressable
            onLayout={event => {
              const layout = event.nativeEvent?.layout;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setPositionRefs(prev => ({
                ...prev,
                1: layout,
              }));
            }}
            onPress={() => {
              handleNavigate(0);
            }}
            style={[
              styles.who,
              {
                top: positionRefs[2].y + verticalScale(76.5) / scale,
                left: positionRefs[2].x - verticalScale(81) / scale,
              },
            ]}>
            <Who
              scale={scale}
              fillColor={questionIndex >= 1 ? '#9A00FF' : themeColor.lightGray}
              textColor={
                questionIndex >= 1 ? themeColor.white : themeColor.themeBlue
              }
            />
          </Pressable>
        )}
        {positionRefs[1].y !== 0 && (
          <Pressable
            onLayout={event => {
              const layout = event.nativeEvent?.layout;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setPositionRefs(prev => ({
                ...prev,
                0: layout,
              }));
            }}
            style={[
              styles.start,
              {
                top: positionRefs[1].y + verticalScale(120) / scale,
                left: positionRefs[1].x + verticalScale(105) / scale,
                height: verticalScale(80) / scale,
                width: verticalScale(80) / scale,
              },
            ]}
            onPress={() => {
              handleNavigate(0);
            }}>
            <RNTextComponent
              style={[styles.startText, {fontSize: verticalScale(14) / scale}]}
              isSemiBold>
              {translation('START')}
            </RNTextComponent>
          </Pressable>
        )}
      </View>
    </RNScreenWrapper>
  );
};

export default RNRoadmap;
