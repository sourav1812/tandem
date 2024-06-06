/* eslint-disable react-native/no-inline-styles */
// import Exclaimation from '@tandem/assets/svg/Exclaimation';
import LeftArrow from '@tandem/assets/svg/LeftArrow';
import RobotDisclaimer from '@tandem/assets/svg/RobotDisclaimer';
import RNButton from '@tandem/components/RNButton';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import React from 'react';
import {View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

// add exclamation mark as svg or img

const Disclaimer = ({route}: any) => {
  const item = route.params.routeData;
  const publicRoute = !!route.params?.publicRoute;
  return (
    <RNScreenWrapper
      style={{
        padding: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          paddingHorizontal: verticalScale(21),
          position: 'absolute',
          top: verticalScale(44),
          left: 0,
        }}>
        <RNButton
          onlyIcon
          icon={<LeftArrow />}
          onClick={() => {
            navigateTo();
          }}
        />
      </View>

      {/* <Exclaimation style={{marginTop: verticalScale(50)}} /> */}
      <RobotDisclaimer />

      <RNTextComponent isMedium style={{textAlign: 'center'}}>
        {translation('AI_INSTRUCTIONS')}
      </RNTextComponent>
      <RNButton
        pressableStyle={{
          width: '100%',
          marginTop: 'auto',
          marginBottom: verticalScale(20),
        }}
        title={translation('NEXT')}
        onClick={() => {
          navigateTo(SCREEN_NAME.STORY, {
            routeData: item,
            publicRoute: publicRoute,
          });
        }}
      />
    </RNScreenWrapper>
  );
};

export default Disclaimer;
