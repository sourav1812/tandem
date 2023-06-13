import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import {useOrientation} from '../../hooks/useOrientation';

const Home = () => {
  const orientation = useOrientation();

  console.log(orientation, 'useOrientationuseOrientation');

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </RNScreenWrapper>
  );
};

export default Home;
