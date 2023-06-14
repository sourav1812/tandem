import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '../../components/RNScreenWrapper';

const People = () => {
  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <Text>People</Text>
      </View>
    </RNScreenWrapper>
  );
};

export default People;
