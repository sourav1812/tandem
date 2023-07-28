/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Pressable,
  useWindowDimensions,
  ScrollView,
  Animated,
  Easing,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {useOrientation} from '@tandem/hooks/useOrientation';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';
import RNBookmarkComponent from '@tandem/components/RNBookmarkComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {StateObject} from './interface';
import {translation} from '@tandem/utils/methods';
import {MODE} from '@tandem/constants/mode';
import BlueButon from '@tandem/assets/svg/YellowButton';
import Tooltip from 'react-native-walkthrough-tooltip';
import BothButton from '@tandem/assets/svg/BothButton';

const Home = () => {
  const portrait = useOrientation().isPortrait;
  const mode = useAppSelector(state => state.mode.mode);

  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const {width} = useWindowDimensions();
  const modeBC: {color: string; title: string}[] = [
    {color: themeColor.purple, title: i18n.t('WRITE_A_STORY')},
    {color: themeColor.purple, title: i18n.t('I_CANT_DECIDE')},
    {color: themeColor.gold, title: i18n.t('LEARN_SOMETHING')},
    {color: themeColor.green, title: i18n.t('HAVE_FUN')},
  ];

  const modeA: {
    color: string;
    title: string;
    subHeading?: string;
    emoji?: string;
  }[] = [
    {
      color: themeColor.themeBlue,
      title: '4 h. 32 min',
      subHeading: translation('READING_TIME'),
      emoji: '📖',
    },
    {
      color: themeColor.purple,
      title: '4 Books',
      subHeading: translation('NUMBER_OF_BOOKS'),
      emoji: '📚',
    },
    {
      color: themeColor.pink,
      title: '2h. 10 min',
      subHeading: translation('TIME_CREATING'),
      emoji: '💡',
    },
    {
      color: themeColor.lightGreen,
      title: i18n.t('REDEEM_VOUCHER'),
      emoji: '🗒️',
    },
    {
      color: themeColor.gold,
      title: i18n.t('CO_PARENT'),
      subHeading: translation('COMING_SOON'),
    },
    {
      color: themeColor.green,
      title: i18n.t('PERSONALIZED_CHILD_DEVELOPMENT'),
      subHeading: translation('COMING_SOON'),
    },
  ];

  const [state, setState] = useState<StateObject>({
    changeUser: false,
    userProfile:
      'https://static.vecteezy.com/system/resources/previews/016/461/449/non_2x/cute-giraffe-face-wild-animal-character-in-animated-cartoon-illustration-vector.jpg',
    name: 'Lisa',
    showTooltip: true,
  });

  const {changeUser, userProfile, name, showTooltip} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const openDrawer = () => {
    updateState({changeUser: !changeUser});
  };

  const [heightOfBanner, setHeight] = useState({
    value: 0,
    fromLayout: false,
  });
  return (
    <>
      <Pressable
        style={[
          styles.profilePic,
          {
            top:
              heightOfBanner.value - verticalScale(18) - verticalScale(89) / 2,
            ...(changeUser && {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.22,
              elevation: 4,
            }),
          },
        ]}
        onPress={openDrawer}>
        <View
          style={{
            height: verticalScale(89),
            width: verticalScale(89),
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}>
          <Image
            style={{
              height: verticalScale(59),
              width: verticalScale(59),
              borderRadius: 100,
            }}
            source={{
              uri: userProfile,
            }}
          />
          <RNTextComponent
            style={{
              marginTop: 5,
              position: 'absolute',
              bottom: -verticalScale(10),
              fontSize: verticalScale(18),
            }}
            isSemiBold>
            {name}
          </RNTextComponent>
        </View>
        {changeUser && <ChangeChild userProfile={userProfile} name={name} />}
      </Pressable>
      <RNScreenWrapper
        statusBarBgc={showTooltip ? 'rgba(35, 35, 35, 0.6)' : 'transparent'}>
        <View style={[styles.container]}>
          <View
            onLayout={event => {
              if (!heightOfBanner.fromLayout) {
                setHeight({
                  value: event.nativeEvent.layout.height,
                  fromLayout: true,
                });
              }
            }}
            style={[
              styles.header,
              {
                height: !portrait
                  ? verticalScale(115)
                  : isTablet
                  ? verticalScale(115)
                  : verticalScale(165),
              },
            ]}>
            <RNTextComponent
              isSemiBold
              style={{
                ...styles.heading,
                color: themeColor.white,
                marginTop:
                  !isTablet && portrait ? verticalScale(60) : verticalScale(20),
              }}>
              {i18n.t('HELLO')}, Ella!{mode === MODE.A && 'Mum'} 👋🏻
            </RNTextComponent>
            <Pressable
              onPress={() => navigateTo(SCREEN_NAME.ACCOUNT)}
              style={[
                styles.blueButton,
                {
                  top:
                    !isTablet && portrait
                      ? verticalScale(50)
                      : verticalScale(17),
                },
              ]}>
              <Tooltip
                isVisible={showTooltip}
                content={
                  <RNTextComponent>
                    {translation('SWITCH_MODE')}
                  </RNTextComponent>
                }
                placement="bottom"
                topAdjustment={
                  Platform.OS === 'android'
                    ? -(StatusBar.currentHeight || 0)
                    : 0
                }
                onClose={() => updateState({showTooltip: false})}>
                {mode === MODE.B ? <BothButton /> : <BlueButon />}
              </Tooltip>
            </Pressable>
            <View
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                height: verticalScale(23),
                position: 'absolute',
                bottom: -verticalScale(17),
                justifyContent: 'space-between',
                flexDirection: 'row',
                zIndex: 50,
              }}>
              <View
                style={{
                  backgroundColor: themeColor.gold,
                  width: (+width - verticalScale(80)) / 2,
                  borderBottomRightRadius: 100,
                  borderTopRightRadius: 100,
                }}
              />
              <View
                style={{
                  backgroundColor: themeColor.gold,
                  width: (+width - verticalScale(80)) / 2,
                  borderBottomLeftRadius: 100,
                  borderTopLeftRadius: 100,
                }}
              />
            </View>
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={{paddingTop: verticalScale(5)}}
            showsVerticalScrollIndicator={false}>
            <RNTextComponent
              isSemiBold
              style={{
                ...styles.heading,
                ...(!portrait && styles.headingPortrait),
                ...(isTablet && {fontSize: verticalScale(18)}),
              }}>
              {i18n.t('WHAT_SHALL_WE_DO_TODAY')}
            </RNTextComponent>
            <View
              style={{
                ...styles.options,
                ...(!portrait && styles.optionsPortrait),
                ...(isTablet && {paddingHorizontal: portrait ? 100 : 200}),
              }}>
              {mode === MODE.B || mode === MODE.C
                ? modeBC.map((item, index) => (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        if (index === 0) {
                          navigateTo(SCREEN_NAME.GENERATE_STORY);
                        } else {
                          // toggleModal();
                        }
                      }}>
                      <RNBookmarkComponent
                        customStyle={{
                          marginTop: verticalScale(24),
                          marginHorizontal: scale(5),
                          ...(!portrait && styles.cardPortrait),
                        }}
                        borderIconColor={item.color}
                        showIcon={index === 0}
                        showSubheading={index !== 0}
                        heading={item.title}
                        subHeading={i18n.t('COMING_SOON')}
                        emoji="🪄"
                      />
                    </Pressable>
                  ))
                : modeA.map((item, index) => (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        // if (index === 0) {
                        //   // navigateTo(SCREEN_NAME.GENERATE_STORY);
                        // } else if (index === 3) {
                        //   navigateTo(SCREEN_NAME.REDEEM_VOUCHER);
                        // }
                        switch (index) {
                          case 0:
                            break;
                          case 1:
                            navigateTo(SCREEN_NAME.BOOKSHELF);
                            break;
                          case 3:
                            navigateTo(SCREEN_NAME.REDEEM_VOUCHER);
                            break;
                        }
                      }}>
                      <RNBookmarkComponent
                        customStyle={{
                          marginTop: verticalScale(24),
                          ...(!portrait && styles.cardPortrait),
                        }}
                        borderIconColor={item.color}
                        showIcon={index <= 3}
                        showSubheading={index !== 3}
                        heading={item.title}
                        subHeading={item.subHeading}
                        emoji={item.emoji}
                        headingStyle={
                          index > 3
                            ? {fontSize: verticalScale(12), marginVertical: 8}
                            : null
                        }
                      />
                    </Pressable>
                  ))}
            </View>
          </ScrollView>
        </View>
      </RNScreenWrapper>
    </>
  );
};

export default Home;

const ChangeChild = ({
  userProfile,
  name,
}: {
  userProfile: string;
  name: string;
}) => {
  const translateRef = useRef(new Animated.Value(-30)).current;
  React.useEffect(() => {
    Animated.timing(translateRef, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  });
  return (
    <Animated.View
      style={{
        height: verticalScale(89),
        width: verticalScale(89),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(15),
        transform: [{translateY: translateRef}],
      }}>
      <Image
        style={{
          height: verticalScale(59),
          width: verticalScale(59),
          borderRadius: 100,
        }}
        source={{
          uri: userProfile,
        }}
      />
      <RNTextComponent
        style={{
          fontSize: verticalScale(18),
        }}
        isSemiBold>
        {name}
      </RNTextComponent>
    </Animated.View>
  );
};
