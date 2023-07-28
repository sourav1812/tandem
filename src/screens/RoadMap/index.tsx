import {Pressable} from 'react-native';
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
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';

const RNRoadmap = () => {
  // const [mapIndex, setMapIndex] = useState(0);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  return (
    <RNScreenWrapper style={styles.container}>
      <Pressable
        onPress={() => {
          navigateTo(SCREEN_NAME.ACCOUNT);
        }}>
        <YellowButton style={styles.button} />
      </Pressable>
      <Pressable style={styles.roadmap} onPress={() => {}}>
        {/* <RoadMap
          props={{style: styles.roadmap, height: verticalScale(570)}}
          index={questionIndex}
        /> */}
        <Pressable
          style={styles.create}
          onPress={() => {
            navigateTo(SCREEN_NAME.BOTTOM_TAB);
          }}>
          <Create
            mapIndex={2}
            props={{style: {right: isTablet ? scale(25) : scale(0)}}}
          />
        </Pressable>
        <StyleColor
          props={{style: styles.stylecolor}}
          fillColor={2 >= 11 ? themeColor.themeBlue : themeColor.lightGray}
          textColor={2 >= 11 ? themeColor.white : themeColor.themeBlue}
        />
        <WhatHappens
          props={{
            style: styles.whatHappens,
            ...{left: isTablet ? scale(20) : scale(55)},
          }}
          fillColor={false ? themeColor.lightGreen : themeColor.lightGray}
          textColor={false ? themeColor.white : themeColor.themeBlue}
        />
        <WhatThing
          props={{
            style: styles.whatThing,
          }}
          fillColor={false ? themeColor.gold : themeColor.lightGray}
          textColor={false ? themeColor.white : themeColor.themeBlue}
        />
        <Where
          props={{
            style: styles.where,
            ...{left: isTablet ? scale(17) : scale(50)},
          }}
          fillColor={false ? themeColor.green : themeColor.lightGray}
          textColor={false ? themeColor.white : themeColor.themeBlue}
        />
        <Who
          props={{style: styles.who}}
          fillColor={false ? '#9A00FF' : themeColor.lightGray}
          textColor={false ? themeColor.white : themeColor.themeBlue}
        />
        <Pressable
          style={[styles.start, isTablet && {left: scale(8)}]}
          onPress={() => {}}>
          <RNTextComponent style={styles.startText} isSemiBold>
            {translation('START')}
          </RNTextComponent>
        </Pressable>
      </Pressable>
    </RNScreenWrapper>
  );
};

export default RNRoadmap;
