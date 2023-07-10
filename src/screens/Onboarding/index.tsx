import React from 'react';
import {ImageBackground, FlatList} from 'react-native';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {OnboardingProps} from '@tandem/navigation/types';
import {onboardingList} from './interface';

const Onboarding = ({}: OnboardingProps) => {
  const renderBanner = ({item}) => {
    return (
      <ImageBackground
        source={item.url}
        resizeMode="cover"
        style={styles.img}></ImageBackground>
    );
  };

  return (
    <RNScreenWrapper>
      <FlatList
        data={onboardingList}
        renderItem={renderBanner}
        pagingEnabled
        horizontal
        decelerationRate={50}
        onEndReachedThreshold={2}
        bounces={false}
        showsHorizontalScrollIndicator={false}
      />
    </RNScreenWrapper>
  );
};

export default Onboarding;
