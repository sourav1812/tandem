/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {MultipleChoiceProps} from './interface';
import {store} from '@tandem/redux/store';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import themeColor from '@tandem/theme/themeColor';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const RNImageChoice = ({
  data = [],
  customStyle,
  itemStyle,
  type,
  maxSelections = data.length,
  setDisabled,
}: MultipleChoiceProps) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    store.dispatch(pushStoryGenerationResponse({key: type, value: selected}));
    if (selected.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handlePress = (name: string) => {
    if (selected.length < maxSelections && !selected.includes(name)) {
      setSelected(prev => [...prev, name]);
    } else {
      setSelected(prev => prev.filter(oldName => oldName !== name));
    }
  };

  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(1.2, {duration: 200}),
      withTiming(1),
    );
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
          <Pressable
            key={indexLocal.toString()}
            onPress={() => {
              handlePress(value.name);
              runAnimation();
            }}>
            <Animated.View style={[{transform: [{scale: scaleButton}]}]}>
              <Image
                source={{uri: value.file}}
                style={[
                  styles.illustration,
                  selected.includes(value.name) && {
                    borderWidth: 3,
                    borderColor: themeColor.themeBlue,
                  },
                  itemStyle && itemStyle,
                ]}
              />
            </Animated.View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default RNImageChoice;
