import RNChoiceQuestions from '@tandem/components/RNChoiceQuestions';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {STORY_PARTS} from '@tandem/constants/enums';
import {ATTRIBUTE} from '@tandem/constants/local';
import {translation} from '@tandem/utils/methods';
import {verticalScale} from 'react-native-size-matters';
import {styles} from '../../styles';
import React from 'react';
import GenerateStory from '../..';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useNavigation} from '@react-navigation/native';
import removeQuestionData from '@tandem/functions/removeQuestionData';

export default () => {
  const [disabled, setDisabled] = React.useState(true);
  const navigation: any = useNavigation();
  return (
    <GenerateStory
      type={STORY_PARTS.WHAT_THINGS}
      maxSelections={1}
      onBack={() => {
        if (disabled) {
          return;
        }
        removeQuestionData(STORY_PARTS.WHAT_THINGS);
      }}
      questionNumber={4}
      onNextQuestion={() => {
        navigation.push(SCREEN_NAME.ROADMAP);
      }}
      disabled={disabled}>
      <>
        <RNTextComponent
          isSemiBold
          style={[styles.question, {height: verticalScale(70)}]}>
          {translation('generate-story.include-things')}{' '}
        </RNTextComponent>
        <RNChoiceQuestions
          setDisabled={setDisabled}
          type={STORY_PARTS.WHAT_THINGS}
          maxSelections={1}
          index={3}
          data={ATTRIBUTE}
        />
      </>
    </GenerateStory>
  );
};
