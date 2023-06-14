import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '../../components/RNScreenWrapper';

const Bookshelf = () => {
  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <Text>Bookshelf</Text>
      </View>
    </RNScreenWrapper>
  );
};

export default Bookshelf;
