import {ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNEmojiWithText from '../RNEmojiWithText';
import {multipleChoiceProps} from './interface';
import RNTooltip from '../RNTooltip';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import {getValueFromKey} from '@tandem/helpers/encryptedStorage';
import {translation} from '@tandem/utils/methods';

const RNChoiceQuestions = ({
  data = [],
  customStyle,
  visibletoolTip = false,
  onTooltipClose = () => {},
}: multipleChoiceProps) => {
  const tooltipArray = getValueFromKey(TOOLTIP);

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollView, customStyle && customStyle]}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.map((value, index) => {
        if (index === 0) {
          return (
            <RNTooltip
              open={tooltipArray.includes(5) ? false : visibletoolTip}
              setClose={onTooltipClose}
              text={translation('CHOOSE_FROM_THE_GIVE_OPTIONS')}
              top={false}
              rotation={160}
              textContainerStyle={styles.tooltipContainer}
              textStyle={styles.tooltip}>
              <RNEmojiWithText
                key={index.toString()}
                heading={value.name}
                customStyle={styles.optionsCustom}
                icon={value.icon}
                bgcColor={value.bgc}
              />
            </RNTooltip>
          );
        } else {
          return (
            <RNEmojiWithText
              key={index.toString()}
              heading={value.name}
              customStyle={styles.optionsCustom}
              icon={value.icon}
              bgcColor={value.bgc}
            />
          );
        }
      })}
    </ScrollView>
  );
};

export default RNChoiceQuestions;
