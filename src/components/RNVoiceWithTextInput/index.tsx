import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import RNButton from '../RNButton';
import themeColor from '@tandem/theme/themeColor';
import Mic from '@tandem/assets/svg/Mic';
import MicOn from '@tandem/assets/svg/MinOn';
import {verticalScale} from 'react-native-size-matters';
import {VoiceQuestionProps} from './interface';
import RNTextComponent from '../RNTextComponent';
import RNTextInputWithLabel from '../RNTextInputWithLabel';

const RNVoiceWithTextInput = ({
  onNextPress,
  customStyle,
}: VoiceQuestionProps) => {
  const [micStatus, setMicStatus] = useState(false);

  const toggleMic = () => {
    setMicStatus(!micStatus);
  };

  return (
    <>
      <View style={[styles.container, customStyle && customStyle]}>
        <View style={styles.emojiView}>
          <RNTextComponent style={styles.emoji}>🤔</RNTextComponent>
        </View>
        <RNTextComponent
          style={[styles.heading, {color: themeColor.black, opacity: 0.6}]}
          isSemiBold>
          Can you remember what{'\n'}
        </RNTextComponent>
        <RNTextComponent isSemiBold style={[styles.heading, {marginTop: 0}]}>
          the cat was called?
        </RNTextComponent>
        <RNTextInputWithLabel
          inputStyle={styles.input}
          containerStyle={styles.inputBox}
          inputViewStyle={{borderWidth: 0}}
        />
        <Pressable onPress={toggleMic} style={styles.icon}>
          {micStatus ? <MicOn /> : <Mic />}
        </Pressable>
      </View>
      <RNButton
        customStyle={styles.footerButton}
        title={en.ANSWER}
        onClick={onNextPress}
        textStyle={{fontSize: verticalScale(16)}}
      />
    </>
  );
};

export default RNVoiceWithTextInput;
