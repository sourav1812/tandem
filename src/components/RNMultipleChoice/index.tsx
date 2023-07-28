import {View, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {place} from './interface';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import RNEmojiWithText from '../RNEmojiWithText';
import {multipleChoiceProps} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';

const RNMultipleChoice = ({onNextPress}: multipleChoiceProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.voiceQuestion}>
          <View style={styles.emojiView}>
            <RNTextComponent style={styles.emoji}>🤔</RNTextComponent>
          </View>
          <RNTextComponent style={styles.heading} isSemiBold>
            {translation('multiple-choice.how-many-animals')}
          </RNTextComponent>
          <View style={[styles.options]}>
            <ScrollView
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}>
              {place.map(value => {
                return (
                  <RNEmojiWithText
                    heading={value.name}
                    customStyle={styles.optionsCustom}
                    icon={value.icon}
                    bgcColor={value.bgc}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
      <RNButton
        customStyle={[
          styles.footerButton,
          isTablet && {maxHeight: verticalScale(70)},
        ]}
        title={translation('NEXT')}
        onClick={onNextPress}
        textStyle={{fontSize: verticalScale(16)}}
      />
    </>
  );
};

export default RNMultipleChoice;
