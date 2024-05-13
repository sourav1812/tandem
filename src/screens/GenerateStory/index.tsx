/* eslint-disable react-native/no-inline-styles */
import {LayoutAnimation, View} from 'react-native';
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
import RNTooltip from '@tandem/components/RNTooltip';
import navigateTo from '@tandem/navigation/navigate';
import {DIRECTION_ARROWS, STORY_PARTS} from '@tandem/constants/enums';
// import Pie from '@tandem/components/Pie';

export default ({
  onNextQuestion,
  children,
  disabled,
  questionNumber,
  onBack,
  type,
  maxSelections,
}: {
  onNextQuestion?: () => void;
  children: React.ReactElement;
  disabled?: boolean;
  questionNumber: number;
  onBack: () => void;
  showButtonTooltip?: number;
  onCloseButtonTooltip?: () => void;
  type?:
    | STORY_PARTS.WHO
    | STORY_PARTS.WHAT_THINGS
    | STORY_PARTS.WHAT_HAPPENS
    | STORY_PARTS.COLOR
    | STORY_PARTS.WHERE
    | STORY_PARTS.STYLES;
  maxSelections?: number;
}) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const storyGeneration = useAppSelector(state => state.storyGeneration);
  const activeState = type ? storyGeneration[type] : null;
  const [userCameback, setUserCameBack] = React.useState(false);

  React.useEffect(() => {
    if (activeState && activeState?.length > 0) {
      setUserCameBack(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [disabled]);

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: scale(20),
          }}>
          <View style={styles.header}>
            <RNButton
              onlyIcon
              onClick={() => {
                if (userCameback && activeState && activeState.length === 0) {
                  return;
                }
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
          open={10}
          bottom={DIRECTION_ARROWS.SOUTH}
          text={translation('PRESS_THE_BUTTON')}
          textStyle={styles.tooltip}>
          <View style={{width: '100%'}}>
            <RNButton
              isDisabled={disabled}
              customStyle={[
                styles.footerButton,
                {
                  height: verticalScale(80),
                  maxHeight: verticalScale(80),
                },
                disabled && {
                  backgroundColor: '#474747',
                  borderColor: '#474747',
                },
              ]}
              title={translation('NEXT')}
              onClick={onNextQuestion}
              textStyle={[
                styles.buttonText,
                // {marginTop: disabled || !maxSelections ? 0 : verticalScale(30)},
              ]}
            />
          </View>
        </RNTooltip>
      )}
      {/* {!disabled && activeState && maxSelections && (
        <Pressable onPress={onNextQuestion}>
          <Pie current={activeState.length} total={maxSelections} />
        </Pressable>
      )} */}
    </RNScreenWrapper>
  );
};
