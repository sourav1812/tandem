import {View, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNEmojiWithText from '../RNEmojiWithText';
import {multipleChoiceProps} from './interface';

const RNChoiceQuestions = ({data = [], customStyle}: multipleChoiceProps) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.scrollView, customStyle && customStyle]}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.map((value, index) => {
        return (
          <RNEmojiWithText
            key={index.toString()}
            heading={value.name}
            customStyle={styles.optionsCustom}
            icon={value.icon}
            bgcColor={value.bgc}
          />
        );
      })}
    </ScrollView>
  );
};

export default RNChoiceQuestions;
