/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import LeftArrow from '@tandem/assets/svg/LeftArrow';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import {scale, verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/local';
import RNTooltip from '@tandem/components/RNTooltip';
import navigateTo from '@tandem/navigation/navigate';
import {DIRECTION_ARROWS} from '@tandem/constants/enums';

export default ({
  onNextQuestion,
  children,
  disabled,
  giveStatusColor,
  questionNumber,
  onBack,
  showButtonTooltip,
  onCloseButtonTooltip,
}: {
  onNextQuestion?: () => void;
  children: React.ReactElement;
  disabled?: boolean;
  giveStatusColor?: boolean;
  questionNumber: number;
  onBack: () => void;
  showButtonTooltip?: boolean;
  onCloseButtonTooltip?: () => void;
}) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const tooltipArray = getValueFromKey(TOOLTIP);

  return (
    <RNScreenWrapper giveStatusColor={giveStatusColor}>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: scale(20),
          }}>
          <View style={styles.header}>
            <RNButton
              onlyIcon
              onClick={() => {
                onBack();
                navigateTo();
              }}
              icon={<LeftArrow />}
            />
            <RNTextComponent style={styles.heading} isSemiBold>
              {translation('GENERATE_STORY')}{' '}
              <RNTextComponent isSemiBold style={styles.questionNumber}>
                {questionNumber}/6
              </RNTextComponent>
            </RNTextComponent>
            <RNButton onlyIcon onClick={() => {}} icon={<QuestionMark />} />
          </View>
          <View style={styles.progressBar}>
            {Array.from({length: 6}, (_, index) => {
              return index;
            }).map(index => {
              return (
                <View
                  key={index.toString()}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        index < questionNumber
                          ? themeColor.themeBlue
                          : 'rgba(66, 133, 246, 0.5)',
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
        {children}
      </View>
      {onNextQuestion && (
        <RNTooltip
          isTablet={isTablet}
          topViewStyle={{
            alignItems: 'center',
          }}
          open={!!showButtonTooltip}
          setClose={() => {
            tooltipArray.push(6);
            storeKey(TOOLTIP, tooltipArray);
            if (onCloseButtonTooltip) {
              onCloseButtonTooltip();
            }
          }}
          bottom={DIRECTION_ARROWS.SOUTH}
          text={translation('PRESS_THE_BUTTON')}
          textStyle={styles.tooltip}>
          <View style={{width: '100%', backgroundColor: 'pink'}}>
            <RNButton
              isDisabled={disabled}
              customStyle={[
                styles.footerButton,
                {height: verticalScale(70), maxHeight: verticalScale(70)},
                disabled && {
                  backgroundColor: '#474747',
                  borderColor: '#474747',
                },
              ]}
              title={translation('SELECT')}
              onClick={onNextQuestion}
              textStyle={styles.buttonText}
            />
          </View>
        </RNTooltip>
      )}
    </RNScreenWrapper>
  );
};
