/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {MultipleChoiceProps} from './interface';
import {store} from '@tandem/redux/store';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import themeColor from '@tandem/theme/themeColor';

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

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollView, customStyle && customStyle]}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.map((value, indexLocal) => {
        return (
          <Pressable
            key={indexLocal.toString()}
            onPress={() => {
              handlePress(value.name);
            }}>
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
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default RNImageChoice;
