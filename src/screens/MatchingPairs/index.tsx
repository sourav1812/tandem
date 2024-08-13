import RNButton from '@tandem/components/RNButton';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {ATTRIBUTE, shuffle} from '@tandem/constants/local';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNShake from 'react-native-shake';
import {verticalScale} from 'react-native-size-matters';
import {PlaceType} from '../GenerateStory/interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import Orientation from 'react-native-orientation-locker';
import {translation} from '@tandem/utils/methods';
import animateProgressBar from '@tandem/functions/animateProgressBar';
import gotoBookshelf from '@tandem/functions/gotoBookshelf';
import LottieView from 'lottie-react-native';
import Animation from './animation.json';
import {
  setProgressRef,
  setStoryBookNotification,
} from '@tandem/redux/slices/activityIndicator.slice';
import {store} from '@tandem/redux/store';
import FloatingProgressBar from '@tandem/components/FloatingProgressBar';
import themeColor from '@tandem/theme/themeColor';
import SO_matching_pairs_correct from '@tandem/assets/appInteraction/SO_maching_pairs_correct.mp3';
import SO_matching_pairs_incorrect from '@tandem/assets/appInteraction/SO_maching_pairs_incorrect.mp3';
import SO_matching_pairs_flip from '@tandem/assets/appInteraction/SO_maching_pairs_flip.mp3';
import {Audio} from 'expo-av';

const shakeText = translation('SHAKE_TEXT');
const storyNotDoneButTimesUp = translation('STORY_NEARLY_READY');

const MatchingPairs = () => {
  const [matchingPairsArray, setArray] = React.useState<PlaceType[]>([]);
  const [matchedIndexes, setMatchedIndex] = React.useState<number[]>([]);
  const [checkIfPairArray, setIfPairArray] = React.useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = React.useState(false);
  const [disabledButton, setDisabled] = React.useState(false);
  const [buttonColor, setButtonColor] = useState('red');
  const [buttonText, setButtonText] = React.useState(
    translation('FLIP_CARD_TEXT'),
  );
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const progressRef = React.useRef<any>(null);
  const halfRotationDuration = 150; // ! time of full rotation animation = 2 * halfRotationDuration
  const handlePress = (index: number) => {
    if (matchedIndexes.includes(index) || checkIfPairArray.includes(index)) {
      return;
    }
    if (checkIfPairArray.length === 0) {
      playSound(SO_matching_pairs_flip);
    }
    setIfPairArray(prev => (prev.length === 1 ? [...prev, index] : [index]));
  };
  const storyBookNotification = useAppSelector(
    state => state.activityIndicator.storyBookNotification,
  );
  React.useEffect(() => {
    if (progressRef.current) {
      // progressRef.current;
      store.dispatch(setProgressRef(progressRef.current));
    }
  }, []);
  React.useEffect(() => {
    animateProgressBar({delay: 5000, percentage: 50});
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const refreshMatching = () => {
    const numberOfUniqueElements = isTablet ? 6 : 4;
    const MATCHES_ARRAY = [...new Array(numberOfUniqueElements).keys()].map(
      () => ATTRIBUTE[Math.trunc(Math.random() * (ATTRIBUTE.length - 1))],
    );
    const RANDOMISED_PLAYING_ARRAY: PlaceType[] = [];
    MATCHES_ARRAY.forEach(item => {
      RANDOMISED_PLAYING_ARRAY.push(item);
      // ! come up with a better randomising algorithm
      const number = Math.random() * 10;
      number < 5
        ? RANDOMISED_PLAYING_ARRAY.unshift(item)
        : RANDOMISED_PLAYING_ARRAY.push(item);
    });
    setMatchedIndex([]);
    setIfPairArray([]);
    setButtonText(translation('FLIP_CARD_TEXT'));
    setButtonColor('red');
    setTimeout(() => {
      setArray(shuffle(RANDOMISED_PLAYING_ARRAY));
    }, halfRotationDuration);
  };

  React.useEffect(() => {
    refreshMatching();
    const subscription = RNShake.addListener(() => {
      refreshMatching();
    });
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (matchingPairsArray.length > 0 && checkIfPairArray.length === 2) {
      if (
        checkIfPairArray[0] !== checkIfPairArray[1] &&
        matchingPairsArray[checkIfPairArray[0]].name ===
          matchingPairsArray[checkIfPairArray[1]].name
      ) {
        // ! meaning a match add it to matchedIndexes
        playSound(SO_matching_pairs_correct);
        setMatchedIndex(prev => [...prev, ...checkIfPairArray]);
        setIfPairArray([]);

        return;
      }
      playSound(SO_matching_pairs_incorrect);
      setTimeout(() => {
        if (buttonColor === 'red') {
          setButtonText(shakeText);
        }
        setIfPairArray([]);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIfPairArray, matchingPairsArray]);

  React.useEffect(() => {
    if (
      matchedIndexes.length > 0 &&
      matchedIndexes.length === matchingPairsArray.length &&
      !gameCompleted
    ) {
      //! game completed
      setButtonText(translation('SHAKE_DEVICE'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedIndexes.length]);

  React.useEffect(() => {
    if (storyBookNotification) {
      setGameCompleted(true);
      setButtonText(translation('BOOK_IS_READY'));
      store.dispatch(setStoryBookNotification(false));
      setButtonColor(themeColor.themeBlue);
    }
  }, [storyBookNotification]);

  React.useEffect(() => {
    setTimeout(() => {
      if (buttonColor === themeColor.themeBlue) {
        // ! do not modify button now
        return;
      }
      setGameCompleted(true);
      setButtonText(storyNotDoneButTimesUp);
      setButtonColor('green');
    }, 90 * 1000); // ! after 90 sec we want to go to bookshelf regardless
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSound = async (soundFile: any) => {
    setDisabled(true);
    const {sound} = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    setTimeout(async () => {
      await sound.unloadAsync();
      setDisabled(false);
    }, 500);
  };

  return (
    <RNScreenWrapper style={styles.screenWrapper}>
      <>
        <View style={[styles.cardWrapper]}>
          {matchingPairsArray.map((item, index) => (
            <RNEmojiWithText
              halfRotationDuration={halfRotationDuration}
              disabled={disabledButton || checkIfPairArray.length === 2}
              mask={true}
              isSelected={
                matchedIndexes.includes(index) ||
                checkIfPairArray.includes(index)
              }
              onPress={() => handlePress(index)}
              key={index.toString()}
              heading={item.name}
              customStyle={{margin: verticalScale(5)}}
              icon={item?.icon}
              bgcColor={item.bgc}
              Svgimg={item.svgIcon}
            />
          ))}
        </View>
        {gameCompleted && (
          <LottieView
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              width: verticalScale(120),
              height: verticalScale(120),
              alignSelf: 'center',
              position: 'absolute',
              bottom: verticalScale(80),
              transform: [{rotate: '90deg'}],
            }}
            source={Animation}
            autoPlay
            loop
          />
        )}
        <RNButton
          onClick={() => {
            if (gameCompleted) {
              gotoBookshelf();
              return;
            }
            refreshMatching();
          }}
          title={buttonText}
          customStyle={[
            styles.buttonCustom,
            {backgroundColor: buttonColor, borderColor: buttonColor},
          ]}
          pressableStyle={styles.buttonPressable}
          textStyle={{fontSize: verticalScale(10)}}
        />
        <FloatingProgressBar ref={progressRef} />
      </>
    </RNScreenWrapper>
  );
};

export default MatchingPairs;

const styles = StyleSheet.create({
  screenWrapper: {padding: verticalScale(15), backgroundColor: 'black'},
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(50),
  },
  buttonCustom: {
    height: 'auto',
    padding: verticalScale(10),
  },
  buttonPressable: {marginTop: 'auto', marginBottom: verticalScale(15)},
});
