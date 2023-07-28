import {Pressable, View} from 'react-native';
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
import {scale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {setQuestionIndex} from '@tandem/redux/slices/questions.slice';

const RNRoadmap = () => {
  const dispatch = useAppDispatch();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const questionIndex = useAppSelector(state => state.questions.index);

  const navigate = (index: number) => {
    dispatch(setQuestionIndex(index));
    navigateTo(SCREEN_NAME.GENERATE_STORY);
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <Pressable
        onPress={() => {
          navigateTo(SCREEN_NAME.ACCOUNT);
        }}>
        <YellowButton style={styles.button} />
      </Pressable>
      <View style={styles.roadmap}>
        <Pressable
          style={styles.create}
          onPress={() => {
            navigateTo(SCREEN_NAME.BOTTOM_TAB);
          }}>
          <Create
            mapIndex={questionIndex}
            props={{style: {right: isTablet ? scale(25) : scale(0)}}}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigate(6);
          }}>
          <StyleColor
            props={{style: styles.stylecolor}}
            fillColor={false ? themeColor.themeBlue : themeColor.lightGray}
            textColor={false ? themeColor.white : themeColor.themeBlue}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigate(5);
          }}>
          <WhatHappens
            props={{
              style: styles.whatHappens,
              ...{left: isTablet ? scale(20) : scale(55)},
            }}
            fillColor={false ? themeColor.lightGreen : themeColor.lightGray}
            textColor={false ? themeColor.white : themeColor.themeBlue}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigate(4);
          }}>
          <WhatThing
            props={{
              style: styles.whatThing,
            }}
            fillColor={false ? themeColor.gold : themeColor.lightGray}
            textColor={false ? themeColor.white : themeColor.themeBlue}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigate(3);
          }}>
          <Where
            props={{
              style: styles.where,
              ...{left: isTablet ? scale(17) : scale(50)},
            }}
            fillColor={
              questionIndex === 2 ? themeColor.green : themeColor.lightGray
            }
            textColor={
              questionIndex === 2 ? themeColor.white : themeColor.themeBlue
            }
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigate(2);
          }}>
          <Who
            props={{style: styles.who}}
            fillColor={questionIndex <= 1 ? '#9A00FF' : themeColor.lightGray}
            textColor={
              questionIndex <= 1 ? themeColor.white : themeColor.themeBlue
            }
          />
        </Pressable>
        <Pressable
          style={[styles.start, isTablet && {left: scale(8)}]}
          onPress={() => {
            navigate(1);
          }}>
          <RNTextComponent style={styles.startText} isSemiBold>
            {translation('START')}
          </RNTextComponent>
        </Pressable>
      </View>
    </RNScreenWrapper>
  );
};

export default RNRoadmap;
