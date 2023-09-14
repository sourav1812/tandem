/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {MultipleChoiceProps} from './interface';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import themeColor from '@tandem/theme/themeColor';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {store} from '@tandem/redux/store';

const RNImageChoice = ({
  data = [],
  customStyle,
  type,
  maxSelections = data.length,
  setDisabled,
}: MultipleChoiceProps) => {
  const activeState = useAppSelector(state => state.storyGeneration[type]);
  React.useEffect(() => {
    if (activeState.length > 0) {
      setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    <ScrollView
      style={[styles.scrollView, customStyle && customStyle]}
      contentContainerStyle={{
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
      }}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.map((value, indexLocal) => {
        return (
          <AnimatedImageChoice
            value={value}
            onPress={() => handlePress(value.name)}
            activeState={activeState}
            key={indexLocal.toString()}
          />
        );
      })}
    </ScrollView>
  );
};

export default RNImageChoice;

const AnimatedImageChoice = ({
  value,
  onPress,
  activeState,
}: {
  value: {
    name: string;
    file: string;
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
        onPress();
        runAnimation();
      }}>
      <Animated.View style={[{transform: [{scale: scaleButton}]}]}>
        <Image
          source={{uri: value.file}}
          style={[
            styles.illustration,
            activeState.includes(value.name) && {
              borderWidth: 3,
              borderColor: themeColor.themeBlue,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};
