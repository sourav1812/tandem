/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Image} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';
import {MultipleChoiceProps} from './interface';
import {store} from '@tandem/redux/store';
import {
  clipStoryGenerationResponse,
  pushStoryGenerationResponse,
} from '@tandem/redux/slices/storyGeneration.slice';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import themeColor from '@tandem/theme/themeColor';

const RNImageChoice = ({
  data = [],
  customStyle,
  itemStyle,
  type,
  maxSelections = data.length,
  index,
  setDisabled,
}: MultipleChoiceProps) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const questionIndex = useAppSelector(state => state.questions.index);
  const valueRef = useRef<string[]>([]);

  React.useEffect(() => {
    valueRef.current = selected;

    if (selected.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  React.useEffect(() => {
    return () => {
      if (valueRef.current.length > 0 && index === questionIndex) {
        store.dispatch(
          pushStoryGenerationResponse({type, response: valueRef.current}),
        );
      } else {
        store.dispatch(clipStoryGenerationResponse(index));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = (name: string) => {
    if (selected.length < maxSelections && !selected.includes(name)) {
      setSelected(prev => [...prev, name]);
    } else {
      setSelected(prev => prev.filter(oldName => oldName !== name));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollView, customStyle && customStyle]}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.map((value, index) => {
        return (
          <Pressable
            key={index.toString()}
            onPress={() => {
              handlePress(value.name);
            }}>
            <Image
              source={value.url}
              style={[
                styles.illustration,
                selected.includes(value.name) && {
                  borderWidth: 3,
                  borderColor: themeColor.themeBlue,
                },
                itemStyle && itemStyle,
              ]}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default RNImageChoice;
