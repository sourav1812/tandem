import {View} from 'react-native';
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNButton from '@tandem/components/RNButton';
import {StateObject} from './interface';
import LeftArrow from '@tandem/assets/svg/LeftArrow';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import RNMultipleChoice from '@tandem/components/RNMultipleChoice';
import RNWellDoneModal from '@tandem/components/RNWellDoneModal';
import RNVoiceWithTextInput from '@tandem/components/RNVoiceWithTextInput';
import navigateTo from '@tandem/navigation/navigate';

const Questions = () => {
  // const heighWidth = useRef(new Animated.Value(120)).current;
  const [state, setState] = useState<StateObject>({
    questionNumber: 0,
    showModal: false,
  });

  const {questionNumber, showModal} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const renderModal = () => {
    updateState({showModal: !showModal});
  };

  const dynamicContent = () => {
    switch (questionNumber) {
      case 0:
        return (
          <RNVoiceWithTextInput
            onNextPress={nextQuestion}
            customStyle={styles.inputQuestion}
          />
        );
      case 1:
        return (
          <RNMultipleChoice
            onNextPress={() => {
              navigateTo(SCREEN_NAME.STORY_TELLING);
            }}
          />
        );
    }
  };

  const nextQuestion = () => {
    if (questionNumber <= 1) {
      updateState({questionNumber: questionNumber + 1});
    } else {
      navigateTo(SCREEN_NAME.STORY_TELLING);
    }
  };

  const previousQuestion = () => {
    if (questionNumber > 0) {
      updateState({questionNumber: questionNumber - 1});
    } else {
      navigateTo();
    }
  };

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <RNButton onlyIcon onClick={previousQuestion} icon={<LeftArrow />} />
          <RNTextComponent style={styles.heading} isSemiBold>
            Magic Castle{' '}
          </RNTextComponent>
          <RNButton
            onlyIcon
            onClick={previousQuestion}
            icon={<QuestionMark />}
          />
        </View>
        {dynamicContent()}
      </View>
      <RNWellDoneModal
        visible={showModal}
        renderModal={renderModal}
        nextClick={() => {
          renderModal();
          nextQuestion();
        }}
      />
    </RNScreenWrapper>
  );
};

export default Questions;
