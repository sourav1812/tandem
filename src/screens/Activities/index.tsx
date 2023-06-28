import { View, Text, Pressable, ImageBackground, Image, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import { styles } from './styles';
import RNTextComponent from '../../components/RNTextComponent';
import themeColor from '../../theme/themeColor';
import RNEmojiWithText from '../../components/RNEmojiWithText';
import RNButton from '../../components/RNButton';
import { place } from './interface';
import { stateObject } from './interface';
import Camera from '../../assets/svg/Camera'
import LeftArrow from '../../assets/svg/LeftArrow'
import QuestionMark from '../../assets/svg/QuestionMark'
import { ActivitiesScreenProps } from '../../navigation/types';
import { COMPONENTSNAME } from '../../navigation/ComponentName';
import { verticalScale } from 'react-native-size-matters';
import RNVoiceQuesiton from '../../components/RNVoiceQuesiton';
import  en  from '../../constants/api/lang/en';
import RNMultipleChoice from '../../components/RNMultipleChoice';
import RNWellDoneModal from '../../components/RNWellDoneModal';
import RNVoiceWithTextInput from '../../components/RNVoiceWithTextInput';



const Activities = ({ navigation} :ActivitiesScreenProps) => {
  const heighWidth = useRef(new Animated.Value(120)).current
  const [state, setState] = useState<stateObject>({
    questionNumber: 0,
    showModal : false
  });

  const { questionNumber  , showModal} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return { ...previouState, ...date };
    });
  };

  const renderModal = ()=>{
    updateState({showModal : !showModal});
  }

  const dynamicContent = () => {
    switch (questionNumber) {
      case 0:
        return (
           <RNVoiceQuesiton onClick={renderModal} />
        );
        break;
      case 1:
        return (
         <RNMultipleChoice onNextPress={()=>{
            navigation.navigate(COMPONENTSNAME.STORY_TELLING)
         }} />
        );
        break;
    }
  };

  const nextQuestion = () => {
    if (questionNumber <= 1) {
      updateState({ questionNumber: questionNumber + 1 });
    }else  {
      navigation.navigate(COMPONENTSNAME.STORY_TELLING)
    }
  };

  const previousQuestion = () => {
    if (questionNumber > 0) {
      updateState({ questionNumber: questionNumber - 1 });
    } else {
      navigation.goBack();
    }
  }


  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <RNButton onlyIcon onClick={previousQuestion} icon={<LeftArrow/>} />
          <RNTextComponent style={styles.heading} isSemiBold>
            {en.generate_Story}{' '}
          </RNTextComponent>
          <RNButton onlyIcon onClick={previousQuestion} icon={<QuestionMark/>} />
        </View>
        {dynamicContent()}
      </View>
      <RNWellDoneModal visible={showModal} renderModal={renderModal} nextClick={()=>{
        renderModal()
        nextQuestion()
      }}  />
    </RNScreenWrapper>
  );
};

export default Activities;
