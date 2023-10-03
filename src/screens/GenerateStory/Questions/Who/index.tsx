import RNChoiceQuestions from '@tandem/components/RNChoiceQuestions';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {STORY_PARTS} from '@tandem/constants/enums';
import {AUDIENCE} from '@tandem/constants/local';
import {translation} from '@tandem/utils/methods';
import {verticalScale} from 'react-native-size-matters';
import {styles} from '../../styles';
import React from 'react';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import GenerateStory from '../..';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import removeQuestionData from '@tandem/functions/removeQuestionData';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const navigation: any = useNavigation();
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );

  const [disabled, setDisabled] = React.useState(true);

  return (
    <GenerateStory
      type={STORY_PARTS.WHO}
      maxSelections={3}
      onBack={() => {
        removeQuestionData(STORY_PARTS.WHO);
      }}
      questionNumber={1}
      onNextQuestion={() => {
        navigation.push(SCREEN_NAME.GENERATE_STORY_INCLUSION);
      }}
      disabled={disabled}>
      <>
        <RNTextComponent
          isSemiBold
          style={[styles.question, !portrait && {height: verticalScale(40)}]}>
          {translation('WHO')}{' '}
          <RNTextComponent
            isSemiBold
            style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
            {translation('generate-story.is-in-story')}{' '}
          </RNTextComponent>
        </RNTextComponent>
        <RNChoiceQuestions
          setDisabled={setDisabled}
          type={STORY_PARTS.WHO}
          maxSelections={3}
          index={0}
          data={AUDIENCE}
        />
      </>
    </GenerateStory>
  );
};
