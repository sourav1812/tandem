import {Pressable, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {RoadmapProps} from './interface';
import YellowButton from '@tandem/assets/svg/YellowButton';
import RNTextComponent from '../RNTextComponent';
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
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {scale} from 'react-native-size-matters';

const RNRoadmap = ({
  customStyle,
  nextQuestion,
  questionIndex,
}: RoadmapProps) => {
  const [mapIndex, setMapIndex] = useState(0);
  const isTablet = checkIfTablet();

  useEffect(() => {
    console.log(mapIndex);

    setMapIndex(questionIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <Pressable
        onPress={() => {
          navigateTo(SCREEN_NAME.ACCOUNT);
        }}>
        <YellowButton style={styles.button} />
      </Pressable>
      <Pressable style={styles.roadmap} onPress={nextQuestion}>
        {/* <RoadMap
          props={{style: styles.roadmap, height: verticalScale(570)}}
          index={questionIndex}
        /> */}
        <Pressable
          style={styles.create}
          onPress={() => {
            navigateTo(SCREEN_NAME.STORY_TELLING);
          }}>
          <Create
            mapIndex={questionIndex}
            props={{style: {right: isTablet ? scale(25) : scale(0)}}}
          />
        </Pressable>
        <StyleColor
          props={{style: styles.stylecolor}}
          fillColor={
            questionIndex >= 11 ? themeColor.themeBlue : themeColor.lightGray
          }
          textColor={
            questionIndex >= 11 ? themeColor.white : themeColor.themeBlue
          }
        />
        <WhatHappens
          props={{
            style: styles.whatHappens,
            ...{left: isTablet ? scale(20) : scale(55)},
          }}
          fillColor={
            questionIndex >= 9 ? themeColor.lightGreen : themeColor.lightGray
          }
          textColor={
            questionIndex >= 9 ? themeColor.white : themeColor.themeBlue
          }
        />
        <WhatThing
          props={{
            style: styles.whatThing,
          }}
          fillColor={
            questionIndex >= 7 ? themeColor.gold : themeColor.lightGray
          }
          textColor={
            questionIndex >= 7 ? themeColor.white : themeColor.themeBlue
          }
        />
        <Where
          props={{
            style: styles.where,
            ...{left: isTablet ? scale(17) : scale(50)},
          }}
          fillColor={
            questionIndex >= 5 ? themeColor.green : themeColor.lightGray
          }
          textColor={
            questionIndex >= 5 ? themeColor.white : themeColor.themeBlue
          }
        />
        <Who
          props={{style: styles.who}}
          fillColor={questionIndex >= 3 ? '#9A00FF' : themeColor.lightGray}
          textColor={
            questionIndex >= 3 ? themeColor.white : themeColor.themeBlue
          }
        />
        <Pressable
          style={[styles.start, isTablet && {left: scale(8)}]}
          onPress={nextQuestion}>
          <RNTextComponent style={styles.startText} isSemiBold>
            {translation('START')}
          </RNTextComponent>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default RNRoadmap;
