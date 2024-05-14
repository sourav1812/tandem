/* eslint-disable react-native/no-inline-styles */
import {View, Image, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RightArrow from '@tandem/assets/svg/RightArrow';
import {scale, verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import {BooksData} from '@tandem/screens/Bookshelf/interface';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import RNButton from '../RNButton';
import themeColor from '@tandem/theme/themeColor';

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
  const portrait = useAppSelector(state => state.orientation.isPortrait);

  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(0.9, {duration: 200}),
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
          <View style={[styles.emojiTextContainer, isTablet && {width: '37%'}]}>
            {item.emogi && (
              <View
                style={[
                  styles.imageImojiContainer,
                  isTablet && {
                    right: verticalScale(10),
                    padding: 3,
                    marginTop: verticalScale(20),
                  },
                  !portrait && {
                    right: verticalScale(25),
                  },
                ]}>
                <Text style={[styles.emojiText, isTablet && {fontSize: 30}]}>
                  {item.emogi}
                </Text>
              </View>
            )}
            <Image
              source={{uri: item.image || undefined}}
              style={[
                styles.img,
                {
                  width: scale(110),
                  height: scale(110),
                },

                isTablet && {width: scale(90), height: scale(100)},
              ]}
              // resizeMode="contain"
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
            {item.book.isPubliclyAvailable && (
              <RNButton
                isDisabled
                title={translation('PUBLIC')}
                customStyle={{
                  backgroundColor: 'transparent',
                  width: verticalScale(50),
                  height: verticalScale(30),
                  marginBottom: 10,
                }}
                textStyle={{
                  color: themeColor.themeBlue,
                  fontSize: verticalScale(10),
                }}
                onClick={() => {}}
              />
            )}
            <ProgressIndicator progress={item.readingTime} />
          </View>
        </View>
        <RightArrow />
      </Animated.View>
    </Pressable>
  );
};

export default RNStoryCard;
