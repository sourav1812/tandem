import React from 'react';
import GenerateStory from '../..';
import RNChooseColor from '@tandem/components/RNChooseColor';
import {scale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useNavigation} from '@react-navigation/native';
import {STORY_PARTS} from '@tandem/constants/enums';
import removeQuestionData from '@tandem/functions/removeQuestionData';

export default () => {
  const [disabled, setDisabled] = React.useState(true);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const navigation: any = useNavigation();
  return (
    <GenerateStory
      onBack={() => {
        if (disabled) {
          return;
        }
        removeQuestionData(STORY_PARTS.COLOR);
      }}
      questionNumber={6}
      onNextQuestion={() => {
        navigation.push(SCREEN_NAME.ROADMAP);
      }}
      disabled={disabled}>
      <RNChooseColor
        setDisabled={setDisabled}
        isTablet={isTablet}
        customStyle={{paddingHorizontal: scale(16)}}
      />
    </GenerateStory>
  );
};
