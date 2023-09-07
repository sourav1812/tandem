/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, Pressable, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {inputListState} from './interface';
import RNButton from '../RNButton';
import themeColor from '@tandem/theme/themeColor';
import Mic from '@tandem/assets/svg/Mic';
import MicOn from '@tandem/assets/svg/MinOn';
import {scale, verticalScale} from 'react-native-size-matters';
import {VoiceQuestionProps} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import RNTooltip from '../RNTooltip';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/local';
import {RootState} from '@tandem/redux/store';

const RNVoiceQuesiton = ({
  onClick,
  customStyle,
  tooltipOneVisible = false,
  onTooltipOneClose = () => {},
}: VoiceQuestionProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const tooltipArray = getValueFromKey(TOOLTIP);
  const [inputList, setInputList] = useState<inputListState[]>([{answer: ''}]);
  const [micStatus, setMicStatus] = useState(false);
  const [tooltipMode, setToolTipMode] = useState({
    tooltipTwo: false,
    tooltipThree: false,
  });
  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);
  const refThree = useRef<any>(null);

  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
    2: {height: 0, width: 0, x: 0, y: 0},
  });

  const toggleMic = () => {
    setMicStatus(!micStatus);
    if (inputList.length <= 5 && !micStatus) {
      const answerArry = [...inputList];
      answerArry.push({answer: ''});
      setInputList(answerArry);
    }
  };

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
            {maxHeight: verticalScale(425)},
            !portrait && {width: scale(320), marginBottom: verticalScale(25)},
          ]}>
          <RNTooltip
            isTablet={isTablet}
            topViewStyle={{alignItems: 'center'}}
            open={tooltipArray?.includes(12) ? false : tooltipOneVisible}
            setClose={() => {
              onTooltipOneClose();
              setToolTipMode({tooltipTwo: true, tooltipThree: false});
            }}
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
              style={styles.voiceQuestion}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: verticalScale(30)}}>
              <View style={styles.emojiView}>
                <RNTextComponent style={styles.emoji}>🤔</RNTextComponent>
              </View>
              <RNTextComponent style={styles.heading} isSemiBold>
                How many animals can you name that starts with the letter C?
              </RNTextComponent>
              {inputList.map((item, index) => {
                return (
                  <View key={index.toString()} style={styles.answerField}>
                    <View style={styles.bullitin}>
                      <RNTextComponent style={styles.leftText} isMedium>
                        {index + 1}
                      </RNTextComponent>
                    </View>
                    <TextInput
                      style={[styles.input]}
                      onChangeText={e => {
                        let answerArry = [...inputList];
                        answerArry[index].answer = e;
                        setInputList(answerArry);
                      }}
                      value={inputList[index].answer}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </RNTooltip>
        </View>
        <RNTooltip
          isTablet={isTablet}
          topViewStyle={{alignItems: 'center'}}
          open={tooltipArray?.includes(13) ? false : tooltipMode.tooltipTwo}
          setClose={() => {
            setToolTipMode({tooltipTwo: false, tooltipThree: true});
            tooltipArray.push(13);
            storeKey(TOOLTIP, tooltipArray);
          }}
          bottom={'South'}
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
        </RNTooltip>
      </View>
      <RNTooltip
        isTablet={isTablet}
        topViewStyle={{alignItems: 'center'}}
        open={tooltipArray?.includes(14) ? false : tooltipMode.tooltipThree}
        setClose={() => {
          setToolTipMode({tooltipTwo: false, tooltipThree: false});
          tooltipArray.push(14);
          storeKey(TOOLTIP, tooltipArray);
        }}
        text={translation("IF_YOU_DON'T_KNOW_LET_HELP")}
        bottom={'South'}
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
          <RNButton
            customStyle={[
              styles.footerButton,
              isTablet && {maxHeight: verticalScale(70)},
            ]}
            title={translation('I_DONT_KNOW')}
            onClick={onClick}
            textStyle={{color: themeColor.black, fontSize: verticalScale(16)}}
          />
        </View>
      </RNTooltip>
    </>
  );
};

export default RNVoiceQuesiton;
