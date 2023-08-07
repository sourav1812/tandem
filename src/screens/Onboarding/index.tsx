/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useState} from 'react';
import {FlatList, View, Image, Dimensions} from 'react-native';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {ONBOARDING} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNButton from '@tandem/components/RNButton';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const flatlistRef = useRef<FlatList>(null);

  const onboardingList: ONBOARDING[] = [
    {
      id: 0,
      description: translation('HAVE_FUN_MAKE_STORIES'),
      url: portrait
        ? require('@tandem/assets/png/onboarding1.png')
        : require('@tandem/assets/png/onboardingLandscape1.png'),
    },
    {
      id: 1,
      description: translation('WITH_TANDEM_YOU_WILL_THE_POWER'),
      url: portrait
        ? require('@tandem/assets/png/onboarding2.png')
        : require('@tandem/assets/png/onboardingLandscape2.png'),
    },
    {
      id: 2,
      description: translation('WITH_TANDEM_YOU_WILL_THE_POWER'),
      url: portrait
        ? require('@tandem/assets/png/onboarding3.png')
        : require('@tandem/assets/png/onboardingLandscape3.png'),
    },
  ];
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const renderBanner = useCallback(
    ({item}: {item: any}) => {
      return (
        <View
          style={{
            backgroundColor: themeColor.white,
            height: height,
            width: width,
            alignItems: 'center',
          }}>
          <Image
            style={[
              styles.img,
              {
                height: height / 1.8,
                width: width - scale(30),
                marginTop: isTablet ? scale(20) : scale(50),
              },
            ]}
            source={item.url}
            resizeMode="stretch"
          />
          <RNTextComponent isSemiBold style={styles.heading}>
            {translation('WELCOME_TO_TANDEM')}
          </RNTextComponent>
          <RNTextComponent
            style={[
              styles.content,
              isTablet && {paddingHorizontal: scale(width / 10)},
            ]}>
            {item.description}
          </RNTextComponent>
        </View>
        // <ImageBackground
        //   source={item.url}
        //   resizeMode="cover"
        //   style={styles.img}
        // />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [portrait],
  );

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: any) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
        keyExtractor={item => item.id.toString()}
        pagingEnabled
        horizontal
        decelerationRate={0.3}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 2, // adjust threshold as needed
        }}
        extraData={portrait}
      />
      <View
        style={[
          styles.footer,
          isTablet && {paddingHorizontal: scale(80)},
          {bottom: portrait ? verticalScale(50) : 0},
        ]}>
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
