import RNTextComponent from '@tandem/components/RNTextComponent';
import {STORY_PARTS} from '@tandem/constants/enums';
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
import RNImageChoice from '@tandem/components/RNImageChoice';

export default () => {
  const navigation: any = useNavigation();
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const whoInStory = useAppSelector(state => state.cache.who);

  const [disabled, setDisabled] = React.useState(true);

  return (
    <GenerateStory
      type={STORY_PARTS.WHO}
      maxSelections={1}
      onBack={() => {
        if (disabled) {
          return;
        }
        removeQuestionData(STORY_PARTS.WHO);
      }}
      questionNumber={2}
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
        <RNImageChoice
          setDisabled={setDisabled}
          type={STORY_PARTS.WHO}
          maxSelections={1}
          index={0}
          data={whoInStory}
        />
      </>
    </GenerateStory>
  );
};
