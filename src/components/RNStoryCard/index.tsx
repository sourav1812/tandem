/* eslint-disable react-native/no-inline-styles */
import {View, Image, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RightArrow from '@tandem/assets/svg/RightArrow';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import {BooksData} from '@tandem/screens/Bookshelf/interface';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const ProgressIndicator = ({progress}: {progress: number}) => {
  const progressPercentage = `${progress * 10}%`;
  return (
    <View style={styles.progressIndicatorTop}>
      <View
        style={{
          height: '100%',
          width: progressPercentage,
          backgroundColor: '#FEC247',
          borderRadius: 2,
        }}
      />
    </View>
  );
};
const RNStoryCard = ({
  item,
  onPress,
}: {
  item: BooksData;
  onPress: () => void;
}) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(1.2, {duration: 200}),
      withTiming(1),
    );
  };

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
          runAnimation();
        }
      }}>
      <Animated.View
        style={[styles.cardContainer, {transform: [{scale: scaleButton}]}]}>
        <View style={styles.imageViewContainer}>
          <View style={styles.emojiTextContainer}>
            {item.emogi && (
              <View
                style={[
                  styles.imageImojiContainer,
                  isTablet && {right: verticalScale(28)},
                ]}>
                <Text style={styles.emojiText}>{item.emogi}</Text>
              </View>
            )}
            <Image
              source={item.image}
              style={[styles.img]}
              resizeMode="contain"
            />
            {item.isNew && (
              <View
                style={[
                  styles.newTextComponentContainer,
                  isTablet && {width: '50%'},
                ]}>
                <RNTextComponent style={styles.newText} isSemiBold>
                  {translation('NEW')}
                </RNTextComponent>
              </View>
            )}
          </View>
          <View
            style={[styles.headerTitleContainer, isTablet && {maxWidth: 400}]}>
            <RNTextComponent isSemiBold style={styles.heading}>
              {item.headerTitle}
            </RNTextComponent>
            <RNTextComponent style={[styles.time, isTablet && {fontSize: 22}]}>
              {item.time}
            </RNTextComponent>
            <RNTextComponent
              style={[styles.minReading, isTablet && {fontSize: 22}]}>
              {`${item.readingTime} ${translation('MIN_READING')}`}
            </RNTextComponent>
            <ProgressIndicator progress={item.readingTime} />
          </View>
        </View>
        <RightArrow />
      </Animated.View>
    </Pressable>
  );
};

export default RNStoryCard;
