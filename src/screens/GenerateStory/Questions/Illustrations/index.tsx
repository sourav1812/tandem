import RNTextComponent from '@tandem/components/RNTextComponent';
import {STORY_PARTS} from '@tandem/constants/enums';
import {translation} from '@tandem/utils/methods';
import {styles} from '../../styles';
import React from 'react';
import GenerateStory from '../..';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useNavigation} from '@react-navigation/native';
import removeQuestionData from '@tandem/functions/removeQuestionData';
import RNImageChoice from '@tandem/components/RNImageChoice';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

export default () => {
  const [disabled, setDisabled] = React.useState(true);
  const storyStyles = useAppSelector(state => state.cache.storyStyles);
  console.log({storyStyles});
  const navigation: any = useNavigation();
  return (
    <GenerateStory
      type={STORY_PARTS.STYLES}
      maxSelections={1}
      onBack={() => {
        if (disabled) {
          return;
        }
        removeQuestionData(STORY_PARTS.STYLES);
      }}
      questionNumber={6}
      onNextQuestion={() => {
        navigation.push(SCREEN_NAME.ROADMAP);
      }}
      disabled={disabled}>
      <>
        <RNTextComponent isSemiBold style={styles.question}>
          {translation('generate-story.what-style-illustration')}{' '}
          <RNTextComponent
            isSemiBold
            style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
            {translation('generate-story.what-style-illustration-2')}
          </RNTextComponent>{' '}
        </RNTextComponent>
        <RNImageChoice
          setDisabled={setDisabled}
          type={STORY_PARTS.STYLES}
          maxSelections={1}
          data={storyStyles}
        />
      </>
    </GenerateStory>
  );
};
