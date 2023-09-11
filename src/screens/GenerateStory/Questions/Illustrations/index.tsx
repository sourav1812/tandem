import RNTextComponent from '@tandem/components/RNTextComponent';
import {ILLUSTRATION} from '@tandem/constants/local';
import {translation} from '@tandem/utils/methods';
import {verticalScale} from 'react-native-size-matters';
import {styles} from '../../styles';
import React from 'react';
import GenerateStory from '../..';
import themeColor from '@tandem/theme/themeColor';
import {ScrollView, Pressable} from 'react-native';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {STORY_PARTS} from '@tandem/constants/enums';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {store} from '@tandem/redux/store';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';

export default () => {
  const [disabled, setDisabled] = React.useState(true);
  const [selected, setSelectable] = React.useState<null | string>(null);
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(1.2, {duration: 200}),
      withTiming(1),
    );
  };
  return (
    <GenerateStory
      questionNumber={6}
      onNextQuestion={() => {
        store.dispatch(
          pushStoryGenerationResponse({
            key: STORY_PARTS.STYLES,
            value: [selected], // ! VERY IMPORTANT : SEND ILLUSTRATION TEXT ASK CLIENT FOR KEYS
          }),
        );
        navigateTo(SCREEN_NAME.GENERATE_STORY_COLORS);
      }}
      disabled={disabled}>
      <>
        <RNTextComponent
          isSemiBold
          style={[styles.question, {height: verticalScale(70)}]}>
          {translation('generate-story.what-style-illustration')}{' '}
          <RNTextComponent
            style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}
            isSemiBold>
            {translation('generate-story.shall-we-use')}
          </RNTextComponent>{' '}
        </RNTextComponent>
        <ScrollView
          contentContainerStyle={[styles.scrollView]}
          scrollEnabled
          showsVerticalScrollIndicator={false}>
          {ILLUSTRATION.map((obj, index) => {
            return (
              <Pressable
                key={index.toString()}
                onPress={() => {
                  runAnimation();
                  if (obj.name === selected) {
                    setSelectable(null);
                    setDisabled(true);
                    return;
                  }
                  setDisabled(false);
                  setSelectable(obj.name);
                }}>
                <Animated.View
                  style={[
                    {transform: [{scale: scaleButton}]},

                    styles.illustration,
                    {borderWidth: 3, borderColor: 'transparent'},
                    obj.name === selected && {
                      borderColor: themeColor.themeBlue,
                    },
                  ]}>
                  <obj.svg
                    width={verticalScale(120)}
                    height={verticalScale(120)}
                  />
                </Animated.View>
              </Pressable>
            );
          })}
        </ScrollView>
      </>
    </GenerateStory>
  );
};
