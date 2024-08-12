import {Platform, Pressable, Vibration, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import YellowButton from '@tandem/assets/svg/YellowButton';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import BackButton from '@tandem/assets/svg/LeftArrow';
import {verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {RootState, store} from '@tandem/redux/store';
import RNButton from '@tandem/components/RNButton';
import generateStory from '@tandem/api/generateStory';
import {STORY_PARTS} from '@tandem/constants/enums';
import {goBackInOrder} from '@tandem/functions/removeQuestionData';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import lockOrientation from '@tandem/functions/lockOrientation';
import {Stats, updateChildStats} from '@tandem/redux/slices/createChild.slice';
import {setStoryGenTracking} from '@tandem/redux/slices/activityIndicator.slice';
import analytics from '@react-native-firebase/analytics';
import FullRoadMap from '@tandem/assets/svg/FullRoadMap';

const SCREEN = [
  SCREEN_NAME.GENERATE_STORY_WHAT_HAPPENS,
  SCREEN_NAME.GENERATE_STORY_WHO,
  SCREEN_NAME.GENERATE_STORY_INCLUSION,
  SCREEN_NAME.GENERATE_STORY_WHAT_THINGS,
  SCREEN_NAME.GENERATE_STORY_WHERE,
  SCREEN_NAME.GENERATE_STORY_ILLUSTRATIONS,
  SCREEN_NAME.GENERATE_STORY_COLORS,
];

const RNRoadmap = () => {
  const navigation: any = useNavigation();
  const storyGenerationResponse = useAppSelector(
    (state: RootState) => state.storyGeneration,
  );
  const isStoryGenTracking = useAppSelector(
    (state: RootState) => state.activityIndicator.isStoryGenTracking,
  );
  const currentChild = useAppSelector(
    (state: RootState) => state.createChild.currentChild,
  );
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const whatHappens = true;
  const who =
    storyGenerationResponse[STORY_PARTS.WHAT_HAPPENS].length > 0 ||
    storyGenerationResponse[STORY_PARTS.WHO].length > 0;
  const inclusion =
    (who && storyGenerationResponse[STORY_PARTS.WHO].length > 0) ||
    storyGenerationResponse[STORY_PARTS.INCLUSION] !== null;
  const whatThings =
    (inclusion && storyGenerationResponse[STORY_PARTS.INCLUSION] !== null) ||
    storyGenerationResponse[STORY_PARTS.WHAT_THINGS].length > 0;
  const where =
    (whatThings &&
      storyGenerationResponse[STORY_PARTS.WHAT_THINGS].length > 0) ||
    storyGenerationResponse[STORY_PARTS.WHERE].length > 0;
  const illustration =
    (where && storyGenerationResponse[STORY_PARTS.WHERE].length > 0) ||
    storyGenerationResponse[STORY_PARTS.STYLES].length > 0;
  const colors =
    illustration && storyGenerationResponse[STORY_PARTS.STYLES].length > 0;

  const checkIfClickable = [
    whatHappens,
    who,
    inclusion,
    whatThings,
    where,
    illustration,
    colors,
  ];

  const handleNavigate = (index: number) => {
    console.log('hi');
    if (checkIfClickable[index]) {
      Vibration.vibrate();
      navigation.push(SCREEN[index]);
    }
  };

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    lockOrientation();
    return () => {
      if (isTablet) {
        Orientation.unlockAllOrientations();
      }
    };
  }, [isTablet]);

  React.useEffect(() => {
    if (isStoryGenTracking) {
      console.log('wont be calling this useEffect again');
      return;
    }
    // logic to calculate time spent reading story
    const timeSpent = () => {
      const stats: Stats = JSON.parse(
        JSON.stringify(
          store.getState().createChild.stats?.[currentChild.childId],
        ),
      );

      const timeAlreadyPast = stats?.generation?.totalTime || 0;
      // we will call this in an interval and add 5 sec to it
      // ! we want to foundation object ready by now in slice
      stats.generation.totalTime = timeAlreadyPast + 5;
      console.log(
        'current story generation time by child ',
        currentChild.childId,
        'is ',
        timeAlreadyPast + 5,
      );
      dispatch(
        updateChildStats({childId: currentChild.childId, stats: {...stats}}),
      );

      // calling timeSpent recursively after 5 seconds
    };
    // set someReduxState to true
    dispatch(setStoryGenTracking(true));
    const unsubscribe = setInterval(() => {
      timeSpent();
    }, 5000);
    return () => {
      clearInterval(unsubscribe);
      dispatch(setStoryGenTracking(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const calculatedPaddingTop = () => {
    let paddingTop = 0;

    if (isTablet) {
      paddingTop = 0;
    } else {
      paddingTop = Platform.select({ios: verticalScale(10), android: 0}) || 0;
    }
    if (checkIfClickable[6]) {
      paddingTop += verticalScale(25);
    }
    return paddingTop;
  };

  const handleCreate = async () => {
    try {
      await generateStory({
        childId: currentChild.childId,
        storyPromptData: storyGenerationResponse,
      });
      analytics().logEvent('newStoryGenerated', {
        childId: currentChild.childId,
        characters: JSON.stringify(storyGenerationResponse.characters),
        childInStory: JSON.stringify(storyGenerationResponse.childInStory),
        genre: JSON.stringify(storyGenerationResponse.genre),
        illustrationStyle: JSON.stringify(
          storyGenerationResponse.illustrationStyle,
        ),
        location: JSON.stringify(storyGenerationResponse.location),
        plotElements: JSON.stringify(storyGenerationResponse.plotElements),
      });
    } catch (error) {
      console.log('error generating story', error);
    }
  };
  return (
    <RNScreenWrapper
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: verticalScale(20),
        paddingTop: calculatedPaddingTop(),
      }}>
      <View collapsable={false} style={styles.header}>
        <RNButton
          onlyIcon
          icon={<BackButton />}
          onClick={() => {
            goBackInOrder();
          }}
        />
        <Pressable
          onPress={() => {
            navigateTo(SCREEN_NAME.ACCOUNT);
          }}>
          <YellowButton />
        </Pressable>
      </View>
      <FullRoadMap
        A_STORY_THAT_ENABLED={checkIfClickable[0]}
        onPress_A_STORY_THAT={() => {
          handleNavigate(0);
        }}
        WHO_ENABLED={checkIfClickable[1]}
        onPress_WHO={() => {
          handleNavigate(1);
        }}
        WHAT_THINGS_ENABLED={checkIfClickable[3]}
        onPress_WHAT_THINGS={() => {
          handleNavigate(3);
        }}
        WHERE_ENABLED={checkIfClickable[4]}
        onPress_WHERE={() => {
          handleNavigate(4);
        }}
        STYLES_AND_COLORS_ENABLED={checkIfClickable[5]}
        onPress_STYLES_AND_COLORS={() => {
          handleNavigate(5);
        }}
        CREATE_ENABLED={checkIfClickable[6]}
        onPress_CREATE={handleCreate}
      />
    </RNScreenWrapper>
  );
};

export default RNRoadmap;
