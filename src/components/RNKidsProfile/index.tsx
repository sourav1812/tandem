import {View, Image, ImageStyle, StyleProp} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';

const RNKidsProfile = ({style}: {style: StyleProp<ImageStyle>}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://thumbs.dreamstime.com/b/cute-giraffe-face-wild-animal-character-animated-cartoon-png-illustration-isolated-transparent-background-hand-drawn-png-264757481.jpg',
        }}
        style={[styles.profile, style]}
      />
      <RNTextComponent style={styles.name} isMedium>
        Alisa
      </RNTextComponent>
    </View>
  );
};

export default RNKidsProfile;
