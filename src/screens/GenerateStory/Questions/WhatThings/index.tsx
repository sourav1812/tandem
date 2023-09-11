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
import navigateTo from '@tandem/navigation/navigate';

export default () => {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <GenerateStory
      questionNumber={4}
      onNextQuestion={() => {
        navigateTo(SCREEN_NAME.ROADMAP);
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
          index={3}
          maxSelections={5}
          data={ATTRIBUTE}
        />
      </>
    </GenerateStory>
  );
};
