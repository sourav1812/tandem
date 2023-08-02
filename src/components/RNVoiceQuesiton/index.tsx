import {View, TextInput, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {inputListState} from './interface';
import RNButton from '../RNButton';
import themeColor from '@tandem/theme/themeColor';
import Mic from '@tandem/assets/svg/Mic';
import MicOn from '@tandem/assets/svg/MinOn';
import {verticalScale} from 'react-native-size-matters';
import {VoiceQuestionProps} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import RNTooltip from '../RNTooltip';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/LocalConstants';

const RNVoiceQuesiton = ({
  onClick,
  customStyle,
  tooltipOneVisible = false,
  onTooltipOneClose = () => {},
}: VoiceQuestionProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const tooltipArray = getValueFromKey(TOOLTIP);
  const [inputList, setInputList] = useState<inputListState[]>([{answer: ''}]);
  const [micStatus, setMicStatus] = useState(false);
  const [tooltipMode, setToolTipMode] = useState({
    tooltipTwo: false,
    tooltipThree: false,
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
      <View style={[styles.container, customStyle && customStyle]}>
        <View style={{maxHeight: verticalScale(425)}}>
          <RNTooltip
            open={tooltipArray?.includes(12) ? false : tooltipOneVisible}
            setClose={() => {
              onTooltipOneClose();
              setToolTipMode({tooltipTwo: true, tooltipThree: false});
            }}
            text={translation('YOU_CAN_WRITE_AN_ANIMAL')}
            top={false}
            rotation={-10}
            vectorSize={verticalScale(100)}
            textContainerStyle={styles.tooltipTwo}
            textStyle={[
              {
                textAlign: 'center',
                fontSize: verticalScale(16),
                marginTop: 10,
              },
            ]}>
            <ScrollView
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
          open={tooltipArray?.includes(13) ? false : tooltipMode.tooltipTwo}
          setClose={() => {
            setToolTipMode({tooltipTwo: false, tooltipThree: true});
            tooltipArray.push(13);
            storeKey(TOOLTIP, tooltipArray);
          }}
          text={translation('YOU_CAN_PRESS_AND_SAY_ANIMAL')}
          top={true}
          rotation={0}
          vectorSize={verticalScale(100)}
          textContainerStyle={styles.tooltipTwo}
          textStyle={[
            {
              textAlign: 'center',
              fontSize: verticalScale(16),
              marginTop: 10,
            },
          ]}>
          <Pressable onPress={toggleMic} style={styles.icon}>
            {micStatus ? <MicOn /> : <Mic />}
          </Pressable>
        </RNTooltip>
      </View>
      <RNTooltip
        open={tooltipArray?.includes(14) ? false : tooltipMode.tooltipThree}
        setClose={() => {
          setToolTipMode({tooltipTwo: false, tooltipThree: false});
          tooltipArray.push(14);
          storeKey(TOOLTIP, tooltipArray);
        }}
        text={translation("IF_YOU_DON'T_KNOW_LET_HELP")}
        top={true}
        rotation={0}
        vectorSize={verticalScale(100)}
        textContainerStyle={styles.tooltipTwo}
        textStyle={[
          {
            textAlign: 'center',
            fontSize: verticalScale(16),
            marginTop: 10,
          },
        ]}>
        <RNButton
          customStyle={[
            styles.footerButton,
            isTablet && {maxHeight: verticalScale(70)},
          ]}
          title={translation('I_DONT_KNOW')}
          onClick={onClick}
          textStyle={{color: themeColor.black, fontSize: verticalScale(16)}}
        />
      </RNTooltip>
    </>
  );
};

export default RNVoiceQuesiton;
