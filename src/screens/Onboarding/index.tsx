import React, {useCallback, useState} from 'react';
import {ImageBackground, FlatList, View} from 'react-native';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {OnboardingProps} from '@tandem/navigation/types';
import {onboardingList} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNButton from '@tandem/components/RNButton';
import {scale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';

const Onboarding = ({navigation}: OnboardingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTablet = checkIfTablet();

  const renderBanner = ({item}) => {
    return (
      <ImageBackground
        source={item.url}
        resizeMode="cover"
        style={styles.img}></ImageBackground>
    );
  };

  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 2, // adjust threshold as needed
        }}
      />
      <View style={[styles.footer, isTablet && {paddingHorizontal: scale(80)}]}>
        <RNTextComponent
          isSemiBold
          style={[styles.heading, isTablet && {fontSize: 30}]}>
          {translation('WELCOME_TO_TANDEM')}
        </RNTextComponent>
        <RNTextComponent style={[styles.content, isTablet && {fontSize: 20}]}>
          {onboardingList[currentIndex].description}
        </RNTextComponent>
        <View style={styles.indicator}>
          {Array.from({length: 3}, (_, i) => (
            <View
              style={[
                styles.inactive,
                i === currentIndex && {
                  width: isTablet ? scale(16) : scale(22),
                  backgroundColor: themeColor.themeBlue,
                },
              ]}
            />
          ))}
        </View>
        <RNButton
          title={translation('GET_STARTED')}
          onClick={() => {
            navigation.navigate(COMPONENTSNAME.SOCIAL_SIGN_IN);
          }}
          customStyle={[
            styles.button,
            isTablet && {width: scale(160), alignSelf: 'center'},
          ]}
        />
      </View>
    </RNScreenWrapper>
  );
};

export default Onboarding;
