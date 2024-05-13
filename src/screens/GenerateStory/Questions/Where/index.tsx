import RNTextComponent from '@tandem/components/RNTextComponent';
import {STORY_PARTS} from '@tandem/constants/enums';
import {translation} from '@tandem/utils/methods';
import {verticalScale} from 'react-native-size-matters';
import {styles} from '../../styles';
import React from 'react';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import GenerateStory from '../..';
import RNImageChoice from '@tandem/components/RNImageChoice';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useNavigation} from '@react-navigation/native';
import removeQuestionData from '@tandem/functions/removeQuestionData';

export default () => {
  const [disabled, setDisabled] = React.useState(true);
  const places = useAppSelector(state => state.cache.places);
  const navigation: any = useNavigation();
  return (
    <GenerateStory
      type={STORY_PARTS.WHERE}
      maxSelections={1}
      onBack={() => {
        if (disabled) {
          return;
        }
        removeQuestionData(STORY_PARTS.WHERE);
      }}
      questionNumber={5}
      onNextQuestion={() => {
        navigation.push(SCREEN_NAME.ROADMAP);
      }}
      disabled={disabled}>
      <>
        <RNTextComponent
          isSemiBold
          style={[
            styles.question,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              color: 'rgba(10, 8, 4, 0.6)',
              height: verticalScale(70),
            },
          ]}>
          {translation('generate-story.where-shall-we')}
          {'\n '}
          <RNTextComponent isSemiBold style={styles.question}>
            {translation('generate-story.go-in-our-story')}
          </RNTextComponent>
        </RNTextComponent>
        <RNImageChoice
          setDisabled={setDisabled}
          type={STORY_PARTS.WHERE}
          maxSelections={1}
          index={2}
          data={places}
        />
      </>
    </GenerateStory>
  );
};
