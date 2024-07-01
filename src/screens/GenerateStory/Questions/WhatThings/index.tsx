import RNChoiceQuestions from '@tandem/components/RNChoiceQuestions';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {STORY_PARTS} from '@tandem/constants/enums';
import {ATTRIBUTE, shuffle} from '@tandem/constants/local';
import {translation} from '@tandem/utils/methods';
import {verticalScale} from 'react-native-size-matters';
import {styles} from '../../styles';
import React from 'react';
import GenerateStory from '../..';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useNavigation} from '@react-navigation/native';
import removeQuestionData from '@tandem/functions/removeQuestionData';
import {InteractionManager} from 'react-native';

export default () => {
  const [disabled, setDisabled] = React.useState(true);
  const navigation: any = useNavigation();
  const [renderList, setRenderList] = React.useState(false);
  const data = React.useMemo(() => shuffle(ATTRIBUTE), []);
  React.useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setRenderList(true);
    });

    // Cleanup the promise if the component unmounts
    return () => interactionPromise.cancel();
  }, []);
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
        {renderList ? (
          <RNChoiceQuestions
            setDisabled={setDisabled}
            type={STORY_PARTS.WHAT_THINGS}
            maxSelections={1}
            index={3}
            data={data}
          />
        ) : null}
      </>
    </GenerateStory>
  );
};
