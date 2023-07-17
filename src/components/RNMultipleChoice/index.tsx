import {View, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {place} from './interface';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import RNEmojiWithText from '../RNEmojiWithText';
import {multipleChoiceProps} from './interface';
import i18n from '@tandem/constants/lang/i18n';

const RNMultipleChoice = ({onNextPress}: multipleChoiceProps) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.voiceQuestion}>
          <View style={styles.emojiView}>
            <RNTextComponent style={styles.emoji}>🤔</RNTextComponent>
          </View>
          <RNTextComponent style={styles.heading} isSemiBold>
            How many animals can you name that starts with the letter C?
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
        customStyle={styles.footerButton}
        title={i18n.t('NEXT')}
        onClick={onNextPress}
        textStyle={{fontSize: verticalScale(16)}}
      />
    </>
  );
};

export default RNMultipleChoice;
