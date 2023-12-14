/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View, Dimensions, ImageBackground} from 'react-native';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {ONBOARDING} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import RNButton from '@tandem/components/RNButton';
import {scale, verticalScale} from 'react-native-size-matters';
// import themeColor from '@tandem/theme/themeColor';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';

const Onboarding = () => {
  const [remountKey, setRemountKey] = useState(0);

  const [currentIndex] = useState(0);
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
    // {
    //   id: 1,
    //   description: translation('WITH_TANDEM_YOU_WILL_THE_POWER'),
    //   url: portrait
    //     ? require('@tandem/assets/png/onboarding2.png')
    //     : require('@tandem/assets/png/onboardingLandscape2.png'),
    // },
    // {
    //   id: 2,
    //   description: translation('YOUR_CHILD_CAN_CHOOSE_FROM_A_VARIETY'),
    //   url: portrait
    //     ? require('@tandem/assets/png/onboarding3.png')
    //     : require('@tandem/assets/png/onboardingLandscape3.png'),
    // },
  ];
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  useEffect(() => {
    handleRemount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portrait]);

  const renderBanner = useCallback(
    ({item}: {item: any}) => {
      return (
        <ImageBackground
          style={[
            // styles.img,
            {
              height: height,
              width: width,
            },
          ]}
          source={item.url}
          resizeMode="cover"
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [portrait],
  );

  const handleRemount = () => {
    setRemountKey(remountKey + 1);
  };

  // const onViewableItemsChanged = useCallback(
  //   ({viewableItems}: any) => {
  //     if (viewableItems.length > 0) {
  //       setCurrentIndex(viewableItems[0].index);
  //     }
  //   },

  //   [],
  // );

  // const nextPage = () => {
  //   // if (currentIndex < 2) {
  //   //   // setCurrentIndex(currentIndex + 1);
  //   //   flatlistRef?.current?.scrollToIndex({
  //   //     animated: true,
  //   //     index: currentIndex + 1,
  //   //   });
  //   // } else {
  //   navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN);
  //   // }
  // };

  return (
    <RNScreenWrapper>
      <FlatList
        key={remountKey}
        data={onboardingList}
        ref={flatlistRef}
        renderItem={renderBanner}
        keyExtractor={item => item.id.toString()}
        pagingEnabled
        horizontal
        decelerationRate={0.3}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        // onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 2, // adjust threshold as needed
        }}
        extraData={portrait}
      />
      <View style={[styles.footer, isTablet && {paddingHorizontal: scale(80)}]}>
        <RNTextComponent isSemiBold style={styles.heading}>
          {translation('WELCOME_TO_TANDEM')}
        </RNTextComponent>
        <RNTextComponent
          style={[
            styles.content,
            {height: !portrait ? verticalScale(80) : verticalScale(120)},
          ]}>
          {onboardingList[currentIndex].description}
        </RNTextComponent>
        <View
          style={{
            height: !portrait ? verticalScale(50) : 'auto',
            width: '100%',
          }}>
          {/* <View style={styles.indicator}>
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
          </View> */}
          <RNButton
            title={translation('GET_STARTED')}
            onClick={() => {
              navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN);
            }}
            customStyle={[
              styles.button,
              isTablet && {width: scale(160), alignSelf: 'center'},
            ]}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default Onboarding;
