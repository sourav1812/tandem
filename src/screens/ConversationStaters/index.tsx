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

export default ({
  route,
}: {
  route: {params: {conversationStarters: string[]}};
}) => {
  const conversationStarters = route.params.conversationStarters;
  const COLOR_ARRAY = [
    themeColor.green,
    themeColor.gold,
    themeColor.purple,
    themeColor.themeBlue,
    themeColor.lightGreen,
    themeColor.pink,
  ];
  const getColorIndex = (index: number) => {
    return index % COLOR_ARRAY.length;
  };
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

      {conversationStarters.map((text, index) => (
        <RNButton
          key={text + index}
          customStyle={{
            marginVertical: verticalScale(5),
            backgroundColor: COLOR_ARRAY[getColorIndex(index)],
            borderColor: COLOR_ARRAY[getColorIndex(index)],
          }}
          onClick={() => {
            navigateTo(SCREEN_NAME.CONVERSATION, {
              text,
            });
          }}
          title={`${index + 1} 💬`}
        />
      ))}
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
