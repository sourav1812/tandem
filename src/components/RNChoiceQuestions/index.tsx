/* eslint-disable react-native/no-inline-styles */
import {ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNEmojiWithText from '../RNEmojiWithText';
import {MultipleChoiceProps} from './interface';
import {
  clearParticularState,
  pushStoryGenerationResponse,
} from '@tandem/redux/slices/storyGeneration.slice';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {store} from '@tandem/redux/store';
import themeColor from '@tandem/theme/themeColor';
import QuestionMark from '@tandem/assets/svg/QuestionMarkRed';

const RNChoiceQuestions = ({
  data = [],
  customStyle,
  itemStyle,
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
    if (activeState.includes('Not sure')) {
      store.dispatch(clearParticularState(type));
      store.dispatch(pushStoryGenerationResponse({key: type, value: [name]}));
      return;
    }
    if (maxSelections === 1 || name === 'Not sure') {
      store.dispatch(clearParticularState(type));
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
  const [maxIndex, setMaxIndex] = React.useState(10);
  React.useEffect(() => {
    setTimeout(() => {
      setMaxIndex(data.length);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={[styles.scrollView, customStyle && customStyle]}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.slice(0, maxIndex).map((value, indexLocal) => {
        return (
          <RNEmojiWithText
            isSelected={activeState.includes(value.name)}
            onPress={() => handlePress(value.name)}
            key={indexLocal.toString()}
            heading={value.name}
            customStyle={[styles.optionsCustom, itemStyle && itemStyle]}
            icon={value?.icon}
            bgcColor={value.bgc}
            Svgimg={value.svgIcon}
          />
        );
      })}
      {maxIndex === data.length && (
        <RNEmojiWithText
          isSelected={activeState.includes('Not sure')}
          onPress={() => handlePress('Not sure')}
          heading={'Not sure'}
          customStyle={[styles.optionsCustom, itemStyle && itemStyle]}
          bgcColor={themeColor.pink}
          Svgimg={QuestionMark}
        />
      )}
    </ScrollView>
  );
};

export default RNChoiceQuestions;
