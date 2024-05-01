import RNButton from '@tandem/components/RNButton';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {ATTRIBUTE} from '@tandem/constants/local';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNShake from 'react-native-shake';
import {verticalScale} from 'react-native-size-matters';
import {PlaceType} from '../GenerateStory/interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const MatchingPairs = () => {
  const [matchingPairsArray, setArray] = React.useState<PlaceType[]>([]);
  const [matchedIndexes, setMatchedIndex] = React.useState<number[]>([]);
  const [checkIfPairArray, setIfPairArray] = React.useState<number[]>([]);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const handlePress = (index: number) => {
    if (matchedIndexes.includes(index)) {
      return;
    }
    setIfPairArray(prev => (prev.length === 1 ? [...prev, index] : [index]));
  };

  const refreshMatching = () => {
    const numberOfUniqueElements = isTablet ? 5 : 4;
    const MATCHES_ARRAY = [...new Array(numberOfUniqueElements).keys()].map(
      () => ATTRIBUTE[Math.trunc(Math.random() * (ATTRIBUTE.length - 1))],
    );
    const RANDOMISED_PLAYING_ARRAY: PlaceType[] = [];
    MATCHES_ARRAY.forEach((item, index) => {
      RANDOMISED_PLAYING_ARRAY.push(item);
      // ! come up with a better randomising algorithm
      index % 2 !== 0
        ? RANDOMISED_PLAYING_ARRAY.unshift(item)
        : RANDOMISED_PLAYING_ARRAY.push(item);
    });
    setMatchedIndex([]);
    setIfPairArray([]);
    setArray(RANDOMISED_PLAYING_ARRAY);
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
        setMatchedIndex(prev => [...prev, ...checkIfPairArray]);
      }
      setIfPairArray([]);
    }
  }, [checkIfPairArray, matchingPairsArray]);

  return (
    <RNScreenWrapper style={styles.screenWrapper}>
      <>
        <View style={styles.cardWrapper}>
          {matchingPairsArray.map((item, index) => (
            <RNEmojiWithText
              // create masking functionality
              isSelected={matchedIndexes.includes(index)}
              onPress={() => handlePress(index)}
              key={index.toString()}
              heading={item.name}
              customStyle={{marginVertical: verticalScale(5)}}
              icon={item?.icon}
              bgcColor={item.bgc}
              Svgimg={item.svgIcon}
            />
          ))}
        </View>
        <RNButton
          onClick={refreshMatching}
          title="Try Again"
          customStyle={styles.buttonCustom}
          pressableStyle={styles.buttonPressable}
        />
      </>
    </RNScreenWrapper>
  );
};

export default MatchingPairs;

const styles = StyleSheet.create({
  screenWrapper: {padding: verticalScale(10), backgroundColor: 'black'},
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: verticalScale(50),
  },
  buttonCustom: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  buttonPressable: {marginTop: 'auto', marginBottom: verticalScale(20)},
});
