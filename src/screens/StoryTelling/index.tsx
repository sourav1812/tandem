import {View, Text} from 'react-native';
import React from 'react';
import { styles } from './style';
import RNScreenWrapper from '../../components/RNScreenWrapper';

const StoryTelling = () => {
  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <Text>Story Telling</Text>
      </View>
    </RNScreenWrapper>
  );
};

export default StoryTelling;
