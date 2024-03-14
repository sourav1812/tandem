/* eslint-disable react-native/no-inline-styles */
import RNButton from '@tandem/components/RNButton';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import themeColor from '@tandem/theme/themeColor';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

export default () => {
  return (
    <RNScreenWrapper
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        padding: verticalScale(10),
        backgroundColor: '#fff',
      }}>
      <RNLogoHeader
        showBackButton
        textHeading
        customStyle={{
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
          top: verticalScale(60),
          margin: 10,
        }}
        titleStyle={{marginLeft: scale(35)}}
        heading={'Conversation Starters'}
      />
      <RNButton
        customStyle={{
          backgroundColor: themeColor.green,
          borderColor: themeColor.green,
        }}
        onClick={() => {
          navigateTo(SCREEN_NAME.CONVERSATION, {
            text: 'Have you ever thought about...',
          });
        }}
        title={'1 💬'}
      />
      <RNButton
        customStyle={{
          marginVertical: verticalScale(20),
          backgroundColor: themeColor.pink,
          borderColor: themeColor.pink,
        }}
        onClick={() => {
          navigateTo(SCREEN_NAME.CONVERSATION, {
            text: 'Have you ever thought about...',
          });
        }}
        title={'2 💬'}
      />
      <RNButton
        customStyle={{
          backgroundColor: themeColor.purple,
          borderColor: themeColor.purple,
        }}
        onClick={() => {
          navigateTo(SCREEN_NAME.CONVERSATION, {
            text: 'Have you ever had a small adventure in an unexpected place?\nWhat was it like?',
          });
        }}
        title={'3 💬'}
      />
    </RNScreenWrapper>
  );
};

export const ConversationScreen = ({
  route,
}: {
  route: {params: {text: string}};
}) => {
  return (
    <RNScreenWrapper
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        padding: verticalScale(10),
        backgroundColor: '#000',
      }}>
      <RNLogoHeader
        showBackButton
        textHeading
        customStyle={{
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
          top: verticalScale(60),
          margin: 10,
        }}
        heading={''}
      />
      <RNTextComponent isSemiBold style={{color: '#fff', textAlign: 'center'}}>
        {route.params.text}
      </RNTextComponent>
    </RNScreenWrapper>
  );
};
