import {View, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';

const RNKidsProfile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://thumbs.dreamstime.com/b/cute-giraffe-face-wild-animal-character-animated-cartoon-png-illustration-isolated-transparent-background-hand-drawn-png-264757481.jpg',
        }}
        style={styles.profile}
      />
      <RNTextComponent style={styles.name} isMedium>
        Alisa
      </RNTextComponent>
    </View>
  );
};

export default RNKidsProfile;
