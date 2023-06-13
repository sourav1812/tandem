import {View, Pressable, Image, TextComponent} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RightArrow from '../../assets/svg/RightArrow';

const RNStoryCard = ({props}: Props) => {
  return (
    <Pressable style={styles.container}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/originals/71/9e/80/719e80760999b4c355a723224120eb07.png',
        }}
        style={styles.img}
      />
      <View style={styles.right}>
        <RNTextComponent isSemiBold style={styles.heading}>
          Story of Wonderland
        </RNTextComponent>
        <RNTextComponent style={styles.date}>09.06.2023</RNTextComponent>
        <RNTextComponent
          style={{
            ...styles.date,
            color: ' rgba(2, 4, 8, 0.6)',
            marginBottom: 4,
            marginTop: 0,
          }}>
          2 min story
        </RNTextComponent>
        <View style={styles.progressContainer}>
          <View style={styles.progress} />
        </View>
      </View>
      <RightArrow />
    </Pressable>
  );
};

export default RNStoryCard;
