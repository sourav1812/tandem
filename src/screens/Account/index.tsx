/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  LayoutAnimation,
  ViewStyle,
} from 'react-native';
import Logout from '@tandem/assets/svg/Logout';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import RNKidsProfile from '@tandem/components/RNKidsProfile';
import Add from '@tandem/assets/svg/Add';
import RNParentProfile from '@tandem/components/RNParentProfile';
import RNSignoutModal from '@tandem/components/RNSignoutModal';
import {StateObject} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {changeMode} from '@tandem/redux/slices/mode.slice';
import {MODE} from '@tandem/constants/mode';
import themeColor from '@tandem/theme/themeColor';
import {RootState} from '@tandem/redux/store';
import RNTooltip from '@tandem/components/RNTooltip';
import {
  AdultData,
  ChildData,
  saveCurrentAdult,
  saveCurrentChild,
} from '@tandem/redux/slices/createChild.slice';
import logout from '@tandem/functions/logout';
import {DIRECTION_ARROWS, PEOPLE} from '@tandem/constants/enums';
import {changeTooltipStateIfChildListNotEmpty} from '@tandem/redux/slices/tooltip.slice';
import pushChildStats from '@tandem/functions/pushChildStats';
// import {changeTooltipState} from '@tandem/redux/slices/tooltip.slice';

const Account = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const childList = useAppSelector(state => state.createChild.childList);
  const adultList = useAppSelector(state => state.createChild.adultList);
  const [kidsList, setKidList] = useState(() => [...childList].reverse());
  const [peopleList, setPeopleList] = useState(() => [...adultList].reverse());
  // const [openTooltip, setOpentTooltip] = useState({
  //   tooltipOne: true,
  //   tooltipTwo: false,
  //   tooltipThree: false,
  //   tooltipFour: false,
  //   tooltipFive: false,
  //   tooltipSix: false,
  // });
  // const [dummyViews, setDummyViews] = useState({
  //   One: false,
  //   Two: false,
  //   Three: false,
  //   Four: false,
  // });
  // const avatars = useAppSelector(state => state.cache.avatars);
  const {width} = Dimensions.get('window');
  const dispatch = useAppDispatch();
  const tooltipArray = useAppSelector(state => state.tooltipReducer);

  // const mode = useAppSelector(state => state.mode.mode);
  const [state, setState] = useState<StateObject>({
    signoutModal: false,
    playerList: [],
  });
  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
  });
  useEffect(() => {
    if (
      !tooltipArray?.[1] &&
      !tooltipArray?.[7] &&
      (childList.length > 0 || adultList.length > 0 || peopleList.length > 0)
    ) {
      dispatch(changeTooltipStateIfChildListNotEmpty());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    pushChildStats();
  }, []);

  const CircleView = ({
    style,
    blue,
    yellow,
    both,
  }: {
    style?: ViewStyle;
    blue?: boolean;
    yellow?: boolean;
    both?: boolean;
  }) => {
    return (
      <View style={styles.circleViewContainer}>
        {both && <View style={[styles.yellowContainer, {zIndex: 1}]} />}

        <View
          style={[
            style,
            yellow && styles.yellowContainer,
            (blue || both) && styles.blueContainer,
          ]}
        />
      </View>
    );
  };
  const portrait = useAppSelector(
    (state1: RootState) => state1.orientation.isPortrait,
  );
  const {signoutModal, playerList} = state;
  const updateState = (date: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  useEffect(() => {
    setKidList([...childList].reverse());
    setPeopleList([...adultList].reverse());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childList.length, adultList.length]);

  useEffect(() => {
    dispatch(saveCurrentChild(childList[childList.length - 1]));
  }, [childList, dispatch]);

  const toggleSignOut = () => {
    updateState({signoutModal: !signoutModal});
  };

  const addPlayer = (item: ChildData | AdultData) => {
    if (
      item.type === PEOPLE.CHILD &&
      item?.childId &&
      playerList.filter(v => v?.type === PEOPLE.CHILD && item.childId)
        .length === 0
    ) {
      let playerArrar = [...playerList];
      playerArrar.push(item);
      updateState({playerList: playerArrar});
      const updatedData = childList.filter(
        data => data.childId !== item.childId,
      );
      setKidList(updatedData);
    }
    if (
      item.type === PEOPLE.ADULT &&
      playerList.filter(v => v.type === PEOPLE.ADULT).length === 0
    ) {
      let playerArrar = [...playerList];
      playerArrar.push(item);
      updateState({playerList: playerArrar});
      const updatedData = peopleList.filter(
        data => data.profileId !== item.profileId,
      );
      setPeopleList(updatedData);
    }
  };

  const removePlayer = (index: number, type: string) => {
    const playerArry = [...playerList];
    playerArry.splice(index, 1);
    updateState({playerList: playerArry});
    if (type === PEOPLE.CHILD) setKidList(() => [...childList].reverse());
    if (type === PEOPLE.ADULT) setPeopleList(() => [...adultList].reverse());
  };

  const buttonHeading = () => {
    if (
      playerList.filter(item => item.type === PEOPLE.CHILD).length > 0 &&
      playerList.filter(item => item.type === PEOPLE.ADULT).length > 0
    ) {
      return `${translation('START')}: Tandem`;
    } else if (
      playerList.filter(item => item.type === PEOPLE.CHILD).length > 0
    ) {
      return `${translation('START')}: ${translation('CHILD')}`;
    } else if (
      playerList.filter(item => item.type === PEOPLE.ADULT).length > 0
    ) {
      return `${translation('START')}: ${translation('ADULT')}`;
    } else {
      return `${translation('SELECT_MODE')}`;
    }
  };

  const buttonPress = () => {
    const currentAdult = playerList.filter(
      item => item.type === PEOPLE.ADULT,
    )[0];
    const currentChild = playerList.filter(
      item => item.type === PEOPLE.CHILD,
    )[0];
    if (
      playerList.filter(item => item.type === PEOPLE.CHILD).length > 0 &&
      playerList.filter(item => item.type === PEOPLE.ADULT).length > 0
    ) {
      dispatch(changeMode(MODE.B));
      dispatch(saveCurrentAdult(currentAdult));
      dispatch(saveCurrentChild(currentChild));
    } else if (
      playerList.filter(item => item.type === PEOPLE.CHILD).length > 0
    ) {
      dispatch(changeMode(MODE.C));
      dispatch(saveCurrentChild(currentChild));
    } else if (
      playerList.filter(item => item.type === PEOPLE.ADULT).length > 0
    ) {
      dispatch(changeMode(MODE.A));
      dispatch(saveCurrentAdult(currentAdult));
      if (currentChild) {
        dispatch(saveCurrentChild(childList[0]));
      }
    } else {
      return '';
    }
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <View
        style={[
          styles.header,
          {marginTop: portrait ? verticalScale(44) : verticalScale(20)},
        ]}>
        <Image
          source={require('../../assets/png/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={{zIndex: 1, marginLeft: scale(-30)}}>
          <RNButton onlyIcon icon={<Logout />} onClick={toggleSignOut} />
        </View>
      </View>
      <RNTextComponent
        isSemiBold
        style={[
          styles.heading,
          {
            marginTop: portrait ? verticalScale(30) : 0,
          },
          isTablet ? {fontSize: 24} : {fontSize: verticalScale(20)},
        ]}>
        {translation('WHO_IS_USING_THE_APP_NEXT')}
      </RNTextComponent>
      <View style={[styles.content]}>
        <View
          style={[
            styles.topList,
            kidsList.length === 0 && {
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <RNTooltip
              open={childList.length !== 0 ? undefined : 1}
              isTablet={isTablet}
              topViewStyle={{alignItems: 'center'}}
              text={translation('ADD_CHILD')}
              dimensionObject={positionRefs[0]}>
              <Pressable
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
                        0: {height: width, width: height, x: pageX, y: pageY},
                      }));
                    },
                  );
                }}
                style={[
                  styles.add2,
                  {
                    height: portrait ? verticalScale(60) : verticalScale(45),
                    width: portrait ? verticalScale(60) : verticalScale(45),
                    borderRadius: 60,
                    backgroundColor: 'white',
                    marginRight: scale(3),
                  },
                ]}
                onPress={() => {
                  navigateTo(SCREEN_NAME.CREATE_CHILD_PROFILE);
                }}>
                <View
                  style={{
                    height: portrait ? verticalScale(60) : verticalScale(40),
                    width: portrait ? verticalScale(60) : verticalScale(40),
                    borderRadius: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Add />
                </View>
              </Pressable>
            </RNTooltip>
            <RNTextComponent isMedium style={[styles.addText]}>
              {translation('ADD')}
            </RNTextComponent>
          </View>

          <View
            style={{
              alignItems: 'center',
              height: kidsList.length === 0 ? '20%' : '100%',
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={'normal'}>
              {childList.length === 0 && !tooltipArray[3] && (
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <RNTooltip
                    isTablet={isTablet}
                    useWait
                    top={DIRECTION_ARROWS.NORTH_EAST}
                    open={childList.length !== 0 ? undefined : 3}
                    topViewStyle={{
                      alignItems: 'center',
                    }}
                    text={translation('account-screen-tooltip.tip-one')}>
                    <View
                      style={{
                        height: portrait
                          ? verticalScale(60)
                          : verticalScale(40),
                        width: portrait ? verticalScale(60) : verticalScale(40),
                        borderRadius: 60,
                        backgroundColor: '#FEC247CC',
                      }}
                    />
                  </RNTooltip>
                </View>
              )}
              {kidsList.map((item, index) => {
                if (item.childId !== '' && item.childId) {
                  return (
                    <Pressable
                      key={index.toString()}
                      style={{marginRight: 20}}
                      onPress={() => {
                        addPlayer(item);
                      }}>
                      <RNKidsProfile
                        style={{
                          height: portrait
                            ? verticalScale(60)
                            : verticalScale(40),
                          width: portrait
                            ? verticalScale(60)
                            : verticalScale(40),
                          borderRadius: 100,
                        }}
                        data={item}
                        avatar={item.avatar}
                      />
                    </Pressable>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {playerList.length === 0 &&
              // dummyViews.Three &&
              !tooltipArray[5] && (
                <RNTooltip
                  isTablet={isTablet}
                  useWait
                  top={DIRECTION_ARROWS.NORTH}
                  open={5}
                  topViewStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  text={translation('account-screen-tooltip.tip-two')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        marginTop: scale(5),
                        height: portrait
                          ? verticalScale(60)
                          : verticalScale(40),
                        width: portrait ? verticalScale(60) : verticalScale(40),
                        borderRadius: 60,
                        backgroundColor: '#FEC247CC',
                      }}
                    />
                    <View
                      style={{
                        marginLeft: scale(20),
                        height: portrait
                          ? verticalScale(70)
                          : verticalScale(45),
                        width: portrait ? verticalScale(70) : verticalScale(45),
                        borderRadius: 60,
                        backgroundColor: '#4285F6CC',
                      }}
                    />
                  </View>
                </RNTooltip>
              )}

            {playerList.map((item, index) => {
              if (item.type === PEOPLE.CHILD && item?.childId) {
                return (
                  <Pressable
                    key={index.toString()}
                    onPress={() => {
                      removePlayer(index, item.type);
                    }}>
                    <RNKidsProfile
                      style={{
                        height: portrait
                          ? verticalScale(60)
                          : verticalScale(40),
                        width: portrait ? verticalScale(60) : verticalScale(40),
                        marginRight: 12,
                        borderRadius: 100,
                      }}
                      data={item}
                      avatar={item.avatar}
                    />
                  </Pressable>
                );
              } else if (item.type === PEOPLE.ADULT) {
                return (
                  <Pressable
                    key={index.toString()}
                    onPress={() => {
                      removePlayer(index, item.type);
                    }}>
                    <RNParentProfile
                      data={item}
                      avatar={item.avatar}
                      custumStyle={{
                        height: portrait
                          ? verticalScale(85)
                          : verticalScale(65),
                        width: portrait ? verticalScale(85) : verticalScale(65),
                        marginRight: 12,
                      }}
                    />
                  </Pressable>
                );
              }
            })}
          </ScrollView>
        </View>
        <View
          style={[
            styles.topList,
            peopleList.length === 0 && {
              justifyContent: 'center',
            },
          ]}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <RNTooltip
              bottom={DIRECTION_ARROWS.SOUTH}
              isTablet={isTablet}
              topViewStyle={{
                alignItems: 'center',
                width: width - scale(40),
              }}
              text={translation('ADD_YOURSELF')}
              open={2}>
              <Pressable
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
                style={[
                  styles.add,
                  {
                    height: portrait ? verticalScale(70) : verticalScale(45),
                    width: portrait ? verticalScale(70) : verticalScale(45),
                    borderRadius: 60,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: scale(6),
                  },
                ]}
                onPress={() => {
                  navigateTo(SCREEN_NAME.CREATE_CHILD_PROFILE, {
                    fromAddAdult: true,
                  });
                }}>
                <View
                  style={{
                    height: portrait ? verticalScale(50) : verticalScale(30),
                    width: portrait ? verticalScale(40) : verticalScale(25),
                    borderRadius: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Add />
                </View>
              </Pressable>
            </RNTooltip>
            <RNTextComponent
              isMedium
              style={[
                styles.addText,
                {
                  marginTop: portrait ? verticalScale(15) : verticalScale(10),
                },
              ]}>
              {translation('ADD')}
            </RNTextComponent>
          </View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={'normal'}>
              {peopleList.length === 0 && !tooltipArray[4] && (
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <RNTooltip
                    isTablet={isTablet}
                    bottom={DIRECTION_ARROWS.SOUTH}
                    useWait
                    open={4}
                    topViewStyle={{
                      alignItems: 'center',
                      marginLeft: scale(40),
                    }}
                    text={translation('account-screen-tooltip.tip-three')}>
                    <View
                      style={{
                        height: portrait
                          ? verticalScale(70)
                          : verticalScale(45),
                        width: portrait ? verticalScale(70) : verticalScale(45),
                        borderRadius: 60,
                        backgroundColor: '#4285F6CC',
                      }}
                    />
                  </RNTooltip>
                </View>
              )}

              {peopleList.map((item, index) => {
                return (
                  <Pressable
                    key={index.toString()}
                    onPress={() => {
                      addPlayer(item);
                    }}>
                    <RNParentProfile data={item} avatar={item.avatar} />
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <RNTooltip
          isTablet={isTablet}
          bottom={DIRECTION_ARROWS.SOUTH}
          open={6}
          topViewStyle={{alignItems: 'center'}}
          text={translation('account-screen-tooltip.tip-four')}>
          <Pressable
            onPress={() => {
              if (playerList.length !== 0) {
                buttonPress();
                navigateTo(SCREEN_NAME.BOTTOM_TAB, {}, true);
              }
            }}
            disabled={childList.length === 0 || playerList.length === 0}
            style={[
              styles.footer,
              playerList.length === 0 &&
                childList.length === 0 && {
                  backgroundColor: themeColor.lightGray,
                },
              {
                marginTop: portrait ? verticalScale(30) : 'auto',
              },
            ]}>
            <RNTextComponent
              isSemiBold
              style={[
                styles.text,
                playerList.length === 0 &&
                  childList.length === 0 && {
                    color: themeColor.themeBlue,
                  },
                {
                  fontSize: verticalScale(15),
                  marginRight: 10,
                },
              ]}>
              {buttonHeading()}
            </RNTextComponent>
            <View style={[styles.button, isTablet && {width: scale(90)}]}>
              {playerList.map((item, index) => {
                const circleType = [];
                // const filePath = avatars.filter(
                //   obj => obj.path === item.avatar,
                // )[0]?.file;
                if (item.type === PEOPLE.CHILD) {
                  circleType.push('C');
                  // return (
                  //   <CircleView yellow />
                  // <Image
                  //   key={index.toString()}
                  //   source={{uri: filePath || item.avatar}}
                  //   style={styles.profile}
                  // />
                  // );
                }
                if (item.type === PEOPLE.ADULT) {
                  circleType.push('A');

                  // return (
                  //   <CircleView blue />
                  // <Image
                  //   key={index.toString()}
                  //   source={{uri: filePath || item.avatar}}
                  //   style={[styles.profile, {height: 40, width: 40}]}
                  // />
                  // );
                }
                return (
                  <CircleView
                    blue={circleType.includes('A') && !circleType.includes('C')}
                    yellow={
                      !circleType.includes('A') && circleType.includes('C')
                    }
                    both={circleType.includes('A') && circleType.includes('C')}
                    key={index.toString()}
                  />
                );
              })}
            </View>
          </Pressable>
        </RNTooltip>
      </View>
      <RNSignoutModal
        visible={signoutModal}
        renderModal={toggleSignOut}
        nextClick={() => logout({api: true})}
      />
    </RNScreenWrapper>
  );
};

export default Account;
