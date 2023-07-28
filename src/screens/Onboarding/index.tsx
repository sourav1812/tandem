import React, {useCallback, useRef, useState} from 'react';
import {ImageBackground, FlatList, View} from 'react-native';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {onboardingList} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNButton from '@tandem/components/RNButton';
import {scale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const flatlistRef = useRef(null);

  const renderBanner = useCallback(({item}: {item: any}) => {
    return (
      <ImageBackground
        source={item.url}
        resizeMode="cover"
        style={styles.img}
      />
    );
  }, []);

  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const nextPage = () => {
    if (currentIndex < 2) {
      // setCurrentIndex(currentIndex + 1);
      flatlistRef?.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
    } else {
      navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN);
    }
  };

  return (
    <RNScreenWrapper>
      <FlatList
        data={onboardingList}
        ref={flatlistRef}
        renderItem={renderBanner}
        pagingEnabled
        horizontal
        decelerationRate={0.3}
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
              key={i.toString()}
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
            nextPage();
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
