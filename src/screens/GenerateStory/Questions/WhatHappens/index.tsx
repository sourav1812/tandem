import RNChoiceQuestions from '@tandem/components/RNChoiceQuestions';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {STORY_PARTS} from '@tandem/constants/enums';
import {TYPE_OF_STORY} from '@tandem/constants/local';
import {translation} from '@tandem/utils/methods';
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
      onBack={() => {
        removeQuestionData(STORY_PARTS.WHAT_HAPPENS);
      }}
      questionNumber={5}
      onNextQuestion={() => {
        navigation.push(SCREEN_NAME.ROADMAP);
      }}
      disabled={disabled}>
      <>
        <RNTextComponent isSemiBold style={styles.question}>
          {translation('generate-story.what-sort-of')}{' '}
          <RNTextComponent
            isSemiBold
            style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
            {translation('generate-story.do-you-want-today')}
          </RNTextComponent>{' '}
        </RNTextComponent>
        <RNChoiceQuestions
          setDisabled={setDisabled}
          type={STORY_PARTS.WHAT_HAPPENS}
          index={4}
          maxSelections={1}
          data={TYPE_OF_STORY}
        />
      </>
    </GenerateStory>
  );
};
