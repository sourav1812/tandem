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
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {SvgProps} from 'react-native-svg';
import removeQuestionData from '@tandem/functions/removeQuestionData';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {useNavigation} from '@react-navigation/native';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
import {store} from '@tandem/redux/store';
import QuestionMark from '@tandem/assets/svg/QuestionMarkRed';

export default () => {
  const navigation: any = useNavigation();
  const [disabled, setDisabled] = React.useState(true);
  const type = STORY_PARTS.STYLES;
  const maxSelections = 1;
  const activeState = useAppSelector(state => state.storyGeneration[type]);

  const handlePress = (name: string) => {
    if (maxSelections === 1) {
      store.dispatch(pushStoryGenerationResponse({key: type, value: [name]}));
      setDisabled(false);
      return;
    }
    if (activeState.length < maxSelections && !activeState.includes(name)) {
      const localRef = JSON.parse(JSON.stringify(activeState));
      localRef.push(name);
      store.dispatch(pushStoryGenerationResponse({key: type, value: localRef}));
      setDisabled(false);
      return;
    }
    const stateFiltered = activeState.filter(oldName => oldName !== name);
    if (stateFiltered.length === activeState.length) {
      return;
    }
    store.dispatch(
      pushStoryGenerationResponse({
        key: type,
        value: stateFiltered,
      }),
    );
    if (stateFiltered.length === 0) {
      setDisabled(true);
    }
  };

  return (
    <GenerateStory
      type={type}
      maxSelections={maxSelections}
      onBack={() => {
        if (disabled) {
          return;
        }
        removeQuestionData(STORY_PARTS.STYLES);
      }}
      questionNumber={6}
      onNextQuestion={() => {
        // navigation.push(SCREEN_NAME.GENERATE_STORY_COLORS);
        navigation.push(SCREEN_NAME.ROADMAP);
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
              <AnimatedIllustrationChoice
                obj={obj}
                activeState={activeState}
                key={index.toString()}
                onPress={() => handlePress(obj.name)}
              />
            );
          })}
          <RNEmojiWithText
            isSelected={activeState.includes('Not sure')}
            onPress={() => handlePress('Not sure')}
            heading={'Not sure'}
            customStyle={styles.illustration}
            bgcColor={'pink'}
            Svgimg={QuestionMark}
          />
        </ScrollView>
      </>
    </GenerateStory>
  );
};

const AnimatedIllustrationChoice = ({
  obj,
  onPress,
  activeState,
}: {
  obj: {
    name: string;
    svg: React.FC<SvgProps>;
  };
  onPress: () => void;
  activeState: string[];
}) => {
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(1.2, {duration: 200}),
      withTiming(1),
    );
  };
  return (
    <Pressable
      onPress={() => {
        runAnimation();
        onPress();
      }}>
      <Animated.View
        style={[
          {transform: [{scale: scaleButton}]},
          styles.illustration,
          {borderWidth: 3, borderColor: 'transparent'},
          activeState.includes(obj.name) && {
            borderColor: themeColor.themeBlue,
          },
        ]}>
        <obj.svg width={verticalScale(120)} height={verticalScale(120)} />
      </Animated.View>
    </Pressable>
  );
};
