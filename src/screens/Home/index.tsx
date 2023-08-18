import {
  View,
  Image,
  Pressable,
  useWindowDimensions,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';
import RNBookmarkComponent from '@tandem/components/RNBookmarkComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {StateObject} from './interface';
import {translation} from '@tandem/utils/methods';
import {MODE} from '@tandem/constants/mode';
import BlueButon from '@tandem/assets/svg/YellowButton';
import BothButton from '@tandem/assets/svg/BothButton';
import RNTooltip from '@tandem/components/RNTooltip';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import {useNavigation} from '@react-navigation/native';
import {RootState, store} from '@tandem/redux/store';
import {setQuestionIndex} from '@tandem/redux/slices/questions.slice';

const Home = () => {
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const mode = useAppSelector(state => state.mode.mode);
  const [tooltipMode, setToolTipMode] = useState({
    tooltipOne: true,
    tooltipTwo: false,
  });
  const tooltipArray = getValueFromKey(TOOLTIP);
  const navigation: any = useNavigation();
  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
  });
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const widthDimention = useWindowDimensions().width;
  const modeBC: {color: string; title: string}[] = [
    {color: themeColor.purple, title: translation('WRITE_A_STORY')},
    {color: themeColor.purple, title: translation('I_CANT_DECIDE')},
    {color: themeColor.gold, title: translation('LEARN_SOMETHING')},
    {color: themeColor.green, title: translation('HAVE_FUN')},
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
      title: translation('REDEEM_VOUCHER'),
      emoji: '🗒️',
    },
    {
      color: themeColor.gold,
      title: translation('CO_PARENT'),
      subHeading: translation('COMING_SOON'),
    },
    {
      color: themeColor.green,
      title: translation('PERSONALIZED_CHILD_DEVELOPMENT'),
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

  const {changeUser, userProfile, name} = state;

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
            ...(changeUser &&
              mode === MODE.A && {
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
        <RNTooltip
          topViewStyle={{alignItems: 'center'}}
          isTablet={isTablet}
          open={tooltipArray?.includes(4) ? false : tooltipMode.tooltipTwo}
          setClose={() => {
            setToolTipMode({
              tooltipOne: false,
              tooltipTwo: false,
            });
            tooltipArray.push(4);
            storeKey(TOOLTIP, tooltipArray);
          }}
          text={translation('BY_CLICKING_CHANGE_CHILD_ACCOUNT')}
          textContainerStyle={styles.tooltipTwo}
          textStyle={styles.tooltipText}
          dimensionObject={positionRefs[1]}>
          <View
            ref={refTwo}
            onLayout={() => {
              refTwo?.current?.measure(
                (
                  x: number,
                  y: number,
                  width: number,
                  height: number,
                  pageX: number,
                  pageY: number,
                ) => {
                  setPositionRefs(prev => ({
                    ...prev,
                    1: {height: width, width: height, x: pageX, y: pageY},
                  }));
                },
              );
            }}
            style={styles.tooltipUserWrapper}>
            <Image
              style={styles.tooltipUserImage}
              source={{
                uri: userProfile,
              }}
            />
            <RNTextComponent style={styles.tooltipUserName} isSemiBold>
              {name}
            </RNTextComponent>
          </View>
        </RNTooltip>

        {changeUser && mode === MODE.A && (
          <ChangeChild userProfile={userProfile} name={name} />
        )}
      </Pressable>
      <RNScreenWrapper
        giveStatusColor={
          (tooltipMode.tooltipOne && !tooltipArray?.includes(3)) ||
          (tooltipMode.tooltipTwo && !tooltipArray?.includes(4))
            ? true
            : false
        }>
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
                backgroundColor:
                  mode === MODE.A
                    ? themeColor.themeBlue
                    : mode === MODE.B
                    ? themeColor.lightGreen
                    : themeColor.gold,
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
              {translation('HELLO')}, Ella!{mode === MODE.A && '(Mum)!'} 👋🏻
            </RNTextComponent>
            <Pressable
              onPress={() => navigation.push(SCREEN_NAME.ACCOUNT)}
              style={[
                styles.blueButton,
                {
                  top:
                    !isTablet && portrait
                      ? verticalScale(50)
                      : verticalScale(17),
                },
              ]}>
              <RNTooltip
                isTablet={isTablet}
                topViewStyle={{
                  width: widthDimention / 2,
                  alignItems: 'flex-end',
                }}
                open={
                  tooltipArray?.includes(3) ? false : tooltipMode.tooltipOne
                }
                setClose={() => {
                  setToolTipMode({
                    tooltipOne: false,
                    tooltipTwo: true,
                  });
                  tooltipArray.push(3);
                  storeKey(TOOLTIP, tooltipArray);
                }}
                text={translation('SWITCH_MODE')}
                // textContainerStyle={{marginRight: isTablet ? scale(100) : 0}}
                dimensionObject={positionRefs[0]}>
                {mode === MODE.B ? (
                  <View
                    ref={refOne}
                    onLayout={() => {
                      refOne?.current?.measure(
                        (
                          x: number,
                          y: number,
                          width: number,
                          height: number,
                          pageX: number,
                          pageY: number,
                        ) => {
                          setPositionRefs(prev => ({
                            ...prev,
                            0: {
                              height: width,
                              width: height,
                              x: pageX,
                              y: pageY,
                            },
                          }));
                        },
                      );
                    }}>
                    <BothButton />
                  </View>
                ) : (
                  <View
                    ref={refOne}
                    onLayout={() => {
                      refOne?.current?.measure(
                        (
                          x: number,
                          y: number,
                          width: number,
                          height: number,
                          pageX: number,
                          pageY: number,
                        ) => {
                          setPositionRefs(prev => ({
                            ...prev,
                            0: {
                              height: width,
                              width: height,
                              x: pageX,
                              y: pageY,
                            },
                          }));
                        },
                      );
                    }}>
                    <BlueButon />
                  </View>
                )}
              </RNTooltip>
            </Pressable>
            <View
              ref={refTwo}
              onLayout={() => {
                refOne?.current?.measure(
                  (
                    x: number,
                    y: number,
                    width: number,
                    height: number,
                    pageX: number,
                    pageY: number,
                  ) => {
                    setPositionRefs(prev => ({
                      ...prev,
                      1: {height: width, width: height, x: pageX, y: pageY},
                    }));
                  },
                );
              }}
              style={styles.curveViewHeaderWrapper}>
              <View
                style={[
                  {
                    width: (+widthDimention - verticalScale(80)) / 2,
                    backgroundColor:
                      mode === MODE.A
                        ? themeColor.themeBlue
                        : mode === MODE.B
                        ? themeColor.lightGreen
                        : themeColor.gold,
                  },
                  styles.curvedViewHeaderLeft,
                ]}
              />
              <View
                style={[
                  {
                    width: (+widthDimention - verticalScale(80)) / 2,
                    backgroundColor:
                      mode === MODE.A
                        ? themeColor.themeBlue
                        : mode === MODE.B
                        ? themeColor.lightGreen
                        : themeColor.gold,
                  },
                  styles.curvedViewHeaderRight,
                ]}
              />
            </View>
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={{
              paddingVertical: verticalScale(0),
            }}
            showsVerticalScrollIndicator={false}>
            {mode !== MODE.A && (
              <RNTextComponent
                isSemiBold
                style={{
                  ...styles.heading,
                  ...(!portrait && styles.headingPortrait),
                  ...(isTablet && {fontSize: verticalScale(18)}),
                }}>
                {translation('WHAT_SHALL_WE_DO_TODAY')}
              </RNTextComponent>
            )}
            <View
              style={{
                ...styles.options,
                ...(!portrait && styles.optionsPortrait),
                ...(isTablet && {
                  paddingHorizontal: portrait ? scale(20) : scale(100),
                }),
              }}>
              {mode === MODE.B || mode === MODE.C
                ? modeBC.map((item, index) => (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        if (index === 0) {
                          store.dispatch(setQuestionIndex(0));
                          navigateTo(SCREEN_NAME.ROADMAP);
                        } else {
                          // toggleModal();
                        }
                      }}>
                      <RNBookmarkComponent
                        customStyle={{
                          marginTop: verticalScale(24),
                          ...(!portrait && styles.cardPortrait),
                        }}
                        borderIconColor={item.color}
                        showIcon={index === 0}
                        showSubheading={index !== 0}
                        heading={item.title}
                        subHeading={translation('COMING_SOON')}
                        emoji="🪄"
                      />
                    </Pressable>
                  ))
                : modeA.map((item, index) => (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
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
                          marginTop: verticalScale(10),
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
                            ? {
                                fontSize: verticalScale(12),
                                marginVertical: verticalScale(8),
                              }
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
      style={[
        {
          transform: [{translateY: translateRef}],
        },
        styles.changeChildWrapper,
      ]}>
      <Image
        style={styles.changeChildImage}
        source={{
          uri: userProfile,
        }}
      />
      <RNTextComponent
        style={{
          fontSize: verticalScale(16),
        }}
        isSemiBold>
        {name}
      </RNTextComponent>
    </Animated.View>
  );
};
