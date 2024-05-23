/* eslint-disable react-native/no-inline-styles */
import Exclaimation from '@tandem/assets/svg/Exclaimation';
import RNButton from '@tandem/components/RNButton';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import React from 'react';
import {verticalScale} from 'react-native-size-matters';

// add exclamation mark as svg or img

const Disclaimer = ({route}: any) => {
  const item = route.params.routeData;
  return (
    <RNScreenWrapper
      style={{
        padding: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Exclaimation style={{marginTop: verticalScale(50)}} />
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
          navigateTo(SCREEN_NAME.STORY, {routeData: item});
        }}
      />
    </RNScreenWrapper>
  );
};

export default Disclaimer;
