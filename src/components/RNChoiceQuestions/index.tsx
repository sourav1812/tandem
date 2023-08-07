import {ScrollView} from 'react-native';
import React, {useRef} from 'react';
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
  itemStyle,
  onTooltipClose = () => {},
}: multipleChoiceProps) => {
  const tooltipArray = getValueFromKey(TOOLTIP);
  const refOne = useRef<any>(null);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
  });
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
              textContainerStyle={[
                styles.tooltipContainer,
                itemStyle && itemStyle,
              ]}
              textStyle={styles.tooltip}
              dimensionObject={positionRefs[0]}>
              <RNEmojiWithText
                onLayout={() => {
                  refOne?.current?.measure(
                    (
                      x: number,
                      y: number,
                      width: number,
                      height: number,
                      pageX: number,
                      pageY: number,
                    ) => {
                      setPositionRefs(prev => ({
                        ...prev,
                        0: {height: width, width: height, x: pageX, y: pageY},
                      }));
                    },
                  );
                }}
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
              customStyle={[styles.optionsCustom, itemStyle && itemStyle]}
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
