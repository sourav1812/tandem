import {View} from 'react-native';
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNButton from '@tandem/components/RNButton';
import {stateObject} from './interface';
import LeftArrow from '@tandem/assets/svg/LeftArrow';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import RNVoiceQuesiton from '@tandem/components/RNVoiceQuesiton';
import RNMultipleChoice from '@tandem/components/RNMultipleChoice';
import RNWellDoneModal from '@tandem/components/RNWellDoneModal';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';

const Activities = () => {
  // const heighWidth = useRef(new Animated.Value(120)).current;
  const [state, setState] = useState<stateObject>({
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
        return <RNVoiceQuesiton onClick={renderModal} />;
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
            {i18n.t('GENERATE_STORY')}{' '}
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

export default Activities;
