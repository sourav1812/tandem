/* eslint-disable react-native/no-inline-styles */
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
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {StateObject} from './interface';
import {translation} from '@tandem/utils/methods';
import {MODE} from '@tandem/constants/mode';
import BothButton from '@tandem/assets/svg/BothButton';
import RNTooltip from '@tandem/components/RNTooltip';
import {useNavigation} from '@react-navigation/native';
import {RootState, store} from '@tandem/redux/store';
import {
  ChildData,
  saveCurrentChild,
} from '@tandem/redux/slices/createChild.slice';
import {clearStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {DIRECTION_ARROWS} from '@tandem/constants/enums';
import WavingHand from '@tandem/assets/svg/WavingHand';
import {
  addSnapShot1,
  addSnapShot2,
} from '@tandem/redux/slices/animationSnapshots.slice';
import BlueButton from '@tandem/assets/svg/BlueButton';
import {setForceReload} from '@tandem/redux/slices/activityIndicator.slice';

const Home = () => {
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const mode = useAppSelector(state => state.mode.mode);
  const currentChild = useAppSelector(state => state.createChild.currentChild);
  const currentAdult = useAppSelector(state => state.createChild.currentAdult);
  const childList = useAppSelector(state => state.createChild.childList);
  const scaleImg = useRef(new Animated.Value(1)).current;
  const notificationScreenPermissions = useAppSelector(
    (state: RootState) => state.permissions,
  );
  const avatars = useAppSelector(state => state.cache.avatars);
  const user = useAppSelector(state => state.userData.userDataObject);
  const filePath = avatars.filter(obj => obj.path === currentChild?.avatar)[0];
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
    {
      color: themeColor.purple,
      title: `Used Credits: ${user?.plan?.usageDetails?.usedCredits || 0}`,
    },
    {color: themeColor.gold, title: translation('LEARN_SOMETHING')},
    // {color: themeColor.green, title: translation('HAVE_FUN')},
  ];
  const stats = useAppSelector(state => state.createChild.stats);
  const childStat = stats?.[currentChild?.childId];
  const calculateTotalReadingTime = (timeObject: {
    solo: number;
    tandem: {time: number; parentId: string}[];
  }) => {
    if (!timeObject) {
      return '0 hrs';
    }
    const totalTime =
      timeObject.solo +
      timeObject.tandem.reduce((accumulator, obj) => accumulator + obj.time, 0); // in seconds
    return secondsToDhms(totalTime);
  };

  function secondsToDhms(seconds: number | undefined) {
    if (!seconds) {
      return '0 hrs';
    }
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + 'd' : '';
    var hDisplay = h > 0 ? h + (h === 1 ? ' hr, ' : ' hrs, ') : '';
    var mDisplay = m > 0 ? m + 'min, ' : '';
    var sDisplay = s > 0 ? s + 's' : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  const modeA: {
    color: string;
    title: string;
    subHeading?: string;
    emoji?: string;
  }[] = [
    {
      color: themeColor.themeBlue,
      title: calculateTotalReadingTime(childStat?.reading?.totalTime),
      subHeading: translation('READING_TIME'),
      emoji: '📖',
    },
    {
      color: themeColor.purple,
      title: (childStat?.totalBooksCreated || 0).toString(),
      subHeading: translation('NUMBER_OF_BOOKS'),
      emoji: '📚',
    },
    {
      color: themeColor.pink,
      title: secondsToDhms(childStat?.generation?.totalTime),
      subHeading: translation('TIME_CREATING'),
      emoji: '💡',
    },
    {
      color: '#a9a9a9',
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
    showTooltip: true,
    pseudoList: [],
  });

  const {changeUser, pseudoList} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const openDrawer = () => {
    updateState({changeUser: !changeUser});
  };

  const zoomInImg = () => {
    Animated.sequence([
      Animated.spring(scaleImg, {
        toValue: 2,
        useNativeDriver: true,
        bounciness: 25,
      }),
      Animated.timing(scaleImg, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        delay: 2000,
      }),
    ]).start();
  };

  React.useEffect(() => {
    const tempPseudoList: ChildData[] = [];
    childList.forEach(item => {
      if (item?.childId !== currentChild?.childId) {
        tempPseudoList.push(item);
      }
    });
    updateState({pseudoList: tempPseudoList});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChild?.childId]);

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
          },
        ]}
        onPress={() => {
          if (mode === MODE.A) {
            openDrawer();
          } else {
            zoomInImg();
          }
        }}>
        <RNTooltip
          topViewStyle={{alignItems: 'center'}}
          isTablet={isTablet}
          open={8}
          useWait
          text={translation('BY_CLICKING_CHANGE_CHILD_ACCOUNT')}
          textContainerStyle={styles.tooltipTwo}
          textStyle={styles.tooltipText}
          dimensionObject={positionRefs[1]}>
          <View
            ref={refTwo}
            onLayout={() => {
              refTwo?.current?.measure(
                (
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
            <Animated.Image
              style={[
                styles.tooltipUserImage,
                {transform: [{scale: scaleImg}]},
              ]}
              source={{
                uri: filePath?.file || currentChild?.avatar,
              }}
            />
            <RNTextComponent style={styles.tooltipUserName} isSemiBold>
              {currentChild?.name?.split(' ')[0]}
            </RNTextComponent>
          </View>
        </RNTooltip>
        {changeUser &&
          mode === MODE.A &&
          pseudoList.map((item, index) => {
            if (item.childId && item.childId !== '') {
              return (
                <ChangeChild
                  key={index.toString()}
                  userProfile={item}
                  name={item.name}
                  changeUser={changeUser}
                  toggleDrawer={updateState}
                />
              );
            }
          })}
      </Pressable>
      <RNScreenWrapper>
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
            <View
              style={{
                flexDirection: 'row',
                marginTop:
                  !isTablet && portrait ? verticalScale(60) : verticalScale(20),
              }}>
              <RNTextComponent
                isSemiBold
                style={{
                  ...styles.heading,
                  color: themeColor.white,
                }}>
                {translation('HELLO')}
                {', '}
                {mode === MODE.A &&
                  (user.firstName ? `${user.firstName}! ` : currentAdult.role)}
                {(mode === MODE.B || mode === MODE.C) &&
                  `${currentChild.name}! `}
              </RNTextComponent>
              <WavingHand style={{marginTop: -2}} />
            </View>
            <Pressable
              onPress={() => navigation.push(SCREEN_NAME.ACCOUNT)}
              style={[
                styles.blueButton,
                {
                  top: verticalScale(50),
                },
              ]}>
              <RNTooltip
                top={DIRECTION_ARROWS.NORTH}
                isTablet={isTablet}
                topViewStyle={{
                  width: widthDimention / 2,
                  alignItems: 'flex-end',
                }}
                open={7}
                text={translation('SWITCH_MODE')}
                // textContainerStyle={{marginRight: isTablet ? scale(100) : 0}}
                dimensionObject={positionRefs[0]}>
                {mode === MODE.B && (
                  <View
                    ref={refOne}
                    onLayout={() => {
                      refOne?.current?.measure(
                        (
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
                )}
                {mode === MODE.A && (
                  <View
                    ref={refOne}
                    onLayout={() => {
                      refOne?.current?.measure(
                        (
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
                    <BlueButton />
                  </View>
                )}
                {mode === MODE.C && (
                  <View
                    style={[
                      styles.accountbutton,
                      {
                        height: isTablet ? scale(22) : scale(30),
                        width: isTablet ? scale(22) : scale(30),
                        marginRight: isTablet ? scale(10) : 0,
                      },
                    ]}>
                    <View
                      style={[
                        styles.dot,
                        {
                          height: isTablet ? scale(12) : scale(15),
                          width: isTablet ? scale(12) : scale(15),
                        },
                      ]}
                    />
                  </View>
                )}
              </RNTooltip>
            </Pressable>
            <View
              ref={refTwo}
              onLayout={() => {
                refOne?.current?.measure(
                  (
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
                    <RNBookmarkComponent
                      key={index.toString()}
                      customStyle={{
                        marginTop: verticalScale(24),
                        ...(!portrait && styles.cardPortrait),
                      }}
                      borderIconColor={item.color}
                      showIcon={index === 0}
                      large={index === 0}
                      showSubheading={index !== 0}
                      heading={item.title}
                      subHeading={
                        index === 1
                          ? `Total Credits: ${
                              user?.plan?.usageDetails?.totalCredits || 0
                            }`
                          : translation('COMING_SOON')
                      }
                      emoji="🪄"
                      onPress={() => {
                        if (index === 0) {
                          store.dispatch(clearStoryGenerationResponse());
                          store.dispatch(addSnapShot1(null));
                          store.dispatch(addSnapShot2(null));
                          navigateTo(SCREEN_NAME.STORY_LANGAUGE);
                          return;
                        }
                      }}
                    />
                  ))
                : modeA.map((item, index) => (
                    <RNBookmarkComponent
                      key={index.toString()}
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
                      onPress={() => {
                        switch (index) {
                          case 0:
                            break;
                          case 1:
                            !notificationScreenPermissions.isFirstTime ||
                            notificationScreenPermissions.notificationStatus
                              ? navigateTo(SCREEN_NAME.BOOKSHELF)
                              : navigateTo(SCREEN_NAME.NOTIFICATION_SCREEN);

                            break;
                          case 3:
                            // navigateTo(SCREEN_NAME.REDEEM_VOUCHER);
                            break;
                        }
                      }}
                    />
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
  changeUser,
  toggleDrawer,
}: {
  userProfile: ChildData;
  name: string;
  changeUser: boolean;
  toggleDrawer: (date: any) => void;
}) => {
  const dispatch = useAppDispatch();
  const translateRef = useRef(new Animated.Value(-30)).current;
  const avatars = useAppSelector(state => state.cache.avatars);
  const filePath = avatars.filter(obj => obj.path === userProfile?.avatar)[0];
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
      <Pressable
        onPress={() => {
          dispatch(saveCurrentChild(userProfile));
          dispatch(setForceReload(true));
          toggleDrawer({changeUser: !changeUser});
        }}
        style={{alignItems: 'center'}}>
        <Image
          style={styles.changeChildImage}
          source={{uri: filePath?.file || userProfile?.avatar}}
        />
        <RNTextComponent
          style={{
            fontSize: verticalScale(16),
          }}
          isSemiBold>
          {name}
        </RNTextComponent>
      </Pressable>
    </Animated.View>
  );
};
