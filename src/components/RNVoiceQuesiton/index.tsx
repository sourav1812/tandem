/* eslint-disable react-native/no-inline-styles */
import {View, ScrollView, LayoutAnimation} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNButton from '../RNButton';
import {scale, verticalScale} from 'react-native-size-matters';
import {VoiceQuestionProps} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import RNTooltip from '../RNTooltip';
import {RootState} from '@tandem/redux/store';
import {DIRECTION_ARROWS} from '@tandem/constants/enums';

const RNVoiceQuesiton = ({
  onClick,
  customStyle,
  questions,
}: VoiceQuestionProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const [correctIndex, setCorrectIndex] = useState(-1);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [incorrectAnswerIndex, pushToIncorrectAnswer] = useState<number[]>([]);

  const refOne = useRef<any>(null);
  const refThree = useRef<any>(null);

  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
    2: {height: 0, width: 0, x: 0, y: 0},
  });
  React.useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [correctIndex]);
  return (
    <>
      <View
        style={[
          styles.container,
          !portrait && {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          },
          customStyle && customStyle,
        ]}>
        <View
          style={[
            !portrait && {width: scale(320), marginBottom: verticalScale(25)},
          ]}>
          <RNTooltip
            isTablet={isTablet}
            topViewStyle={{alignItems: 'center'}}
            open={16}
            text={translation('YOU_CAN_WRITE_AN_ANIMAL')}
            textContainerStyle={styles.tooltipTwo}
            textStyle={[
              {
                textAlign: 'center',
                fontSize: verticalScale(16),
                marginTop: 10,
              },
            ]}
            dimensionObject={positionRefs[0]}>
            <ScrollView
              bounces={false}
              ref={refOne}
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
              style={[
                styles.voiceQuestion,
                {
                  marginTop: isTablet ? 50 : verticalScale(100),
                },
              ]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: verticalScale(30)}}>
              <View
                style={{
                  flexDirection: isTablet ? 'row' : 'column',
                  marginBottom: isTablet ? verticalScale(10) : 0,
                }}>
                <View style={styles.emojiView}>
                  <RNTextComponent style={styles.emoji}>🤔</RNTextComponent>
                </View>
                <RNTextComponent style={styles.heading} isSemiBold>
                  {questions[nextQuestion].question}
                </RNTextComponent>
              </View>
              {questions[nextQuestion].options.map((option, index) => (
                <RNButton
                  customStyle={
                    correctIndex === index
                      ? {
                          backgroundColor: '#00cf00',
                          borderColor: '#00cf00',
                        }
                      : incorrectAnswerIndex.includes(index)
                      ? {backgroundColor: 'red', borderColor: 'red'}
                      : {}
                  }
                  key={option}
                  pressableStyle={{marginVertical: 5}}
                  onClick={() => {
                    if (correctIndex !== -1) {
                      return;
                    }
                    if (option === questions[nextQuestion].answer) {
                      setCorrectIndex(index);
                    } else {
                      pushToIncorrectAnswer(prev =>
                        prev.includes(index) ? prev : [...prev, index],
                      );
                    }
                  }}
                  title={option}
                />
              ))}
            </ScrollView>
          </RNTooltip>
        </View>
        {/* <RNTooltip
          isTablet={isTablet}
          topViewStyle={{alignItems: 'center'}}
          open={18}
          bottom={DIRECTION_ARROWS.SOUTH}
          text={translation('YOU_CAN_PRESS_AND_SAY_ANIMAL')}
          textContainerStyle={styles.tooltipTwo}
          textStyle={[
            {
              textAlign: 'center',
              fontSize: verticalScale(16),
              marginTop: 10,
            },
          ]}
          dimensionObject={positionRefs[1]}>
          <Pressable
            ref={refTwo}
            onLayout={() => {
              refTwo?.current?.measure(
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
                    1: {height: width, width: height, x: pageX, y: pageY},
                  }));
                },
              );
            }}
            onPress={toggleMic}
            style={styles.icon}>
            {micStatus ? <MicOn /> : <Mic />}
          </Pressable>
        </RNTooltip> */}
      </View>
      <RNTooltip
        isTablet={isTablet}
        topViewStyle={{alignItems: 'center'}}
        open={17}
        text={translation("IF_YOU_DON'T_KNOW_LET_HELP")}
        bottom={DIRECTION_ARROWS.SOUTH}
        textContainerStyle={styles.tooltipTwo}
        textStyle={[
          {
            textAlign: 'center',
            fontSize: verticalScale(16),
            marginTop: 10,
          },
        ]}
        dimensionObject={positionRefs[2]}>
        <View
          style={{width: '100%'}}
          ref={refThree}
          onLayout={() => {
            refThree?.current?.measure(
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
                  2: {height: width, width: height, x: pageX, y: pageY},
                }));
              },
            );
          }}>
          {correctIndex !== -1 && (
            <RNButton
              customStyle={[
                styles.footerButton,
                isTablet && {maxHeight: verticalScale(70)},
              ]}
              title={translation('NEXT')}
              onClick={() => {
                if (nextQuestion < questions.length - 1) {
                  pushToIncorrectAnswer([]);
                  setCorrectIndex(-1);
                  setNextQuestion(prev => prev + 1);
                } else {
                  onClick();
                }
              }}
              textStyle={{fontSize: verticalScale(16)}}
            />
          )}
        </View>
      </RNTooltip>
    </>
  );
};

export default RNVoiceQuesiton;
