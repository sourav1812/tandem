/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  LayoutAnimation,
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
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/local';
import {
  AdultData,
  ChildData,
  saveCurrentAdult,
  saveCurrentChild,
} from '@tandem/redux/slices/createChild.slice';
import logout from '@tandem/functions/logout';
import {DIRECTION_ARROWS, PEOPLE} from '@tandem/constants/enums';

const Account = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const childList = useAppSelector(state => state.createChild.childList);
  const adultList = useAppSelector(state => state.createChild.adultList);
  const [openTooltip, setOpentTooltip] = useState({
    tooltipOne: true,
    tooltipTwo: false,
  });
  const avatars = useAppSelector(state => state.cache.avatars);
  const {width} = Dimensions.get('window');
  const dispatch = useAppDispatch();
  const tooltipArray = getValueFromKey(TOOLTIP);

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
    }
    if (
      item.type === PEOPLE.ADULT &&
      playerList.filter(v => v.type === PEOPLE.ADULT).length === 0
    ) {
      let playerArrar = [...playerList];
      playerArrar.push(item);
      updateState({playerList: playerArrar});
    }
  };

  const removePlayer = (index: number) => {
    const playerArry = [...playerList];
    playerArry.splice(index, 1);
    updateState({playerList: playerArry});
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
    <RNScreenWrapper
      style={styles.container}
      giveStatusColor={
        (openTooltip.tooltipOne &&
          !tooltipArray?.includes(1) &&
          childList.length === 0) ||
        (openTooltip.tooltipTwo && !tooltipArray?.includes(2))
          ? true
          : false
      }>
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
        <View style={{alignItems: 'center'}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {childList.map((item, index) => {
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
                        width: portrait ? verticalScale(60) : verticalScale(40),
                        borderRadius: 100,
                      }}
                      data={item}
                      avatar={item.avatar}
                    />
                  </Pressable>
                );
              }
            })}
            <RNTooltip
              open={
                tooltipArray?.includes(1)
                  ? false
                  : childList.length !== 0
                  ? false
                  : openTooltip.tooltipOne
              }
              isTablet={isTablet}
              topViewStyle={{alignItems: 'center'}}
              text={translation('ADD_CHILD')}
              setClose={() => {
                setOpentTooltip({
                  tooltipOne: false,
                  tooltipTwo: true,
                });
                tooltipArray.push(1);
                storeKey(TOOLTIP, tooltipArray);
              }}
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
                    height: portrait ? verticalScale(100) : verticalScale(80),
                    width: portrait ? verticalScale(60) : verticalScale(80),
                    borderRadius: 60,
                    backgroundColor: 'white',
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
                <RNTextComponent isMedium style={[styles.addText]}>
                  {translation('ADD')}
                </RNTextComponent>
              </Pressable>
            </RNTooltip>
          </ScrollView>
        </View>
        <View style={styles.body}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignSelf: 'center',
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {playerList.map((item, index) => {
              if (item.type === PEOPLE.CHILD && item?.childId) {
                return (
                  <Pressable
                    key={index.toString()}
                    onPress={() => {
                      removePlayer(index);
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
                      removePlayer(index);
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
        <View style={{alignItems: 'center'}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {adultList.map((item, index) => {
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
            <RNTooltip
              bottom={DIRECTION_ARROWS.SOUTH}
              isTablet={isTablet}
              topViewStyle={{
                alignItems: 'center',
                width: width,
              }}
              text={translation('ADD_YOURSELF')}
              open={
                tooltipArray?.includes(2) || positionRefs[1].x === 0
                  ? false
                  : openTooltip.tooltipTwo
              }
              setClose={() => {
                setOpentTooltip({
                  tooltipOne: false,
                  tooltipTwo: false,
                });
                tooltipArray.push(2);
                storeKey(TOOLTIP, tooltipArray);
              }}>
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
                    height: portrait ? verticalScale(150) : verticalScale(80),
                    width: portrait ? verticalScale(70) : verticalScale(45),
                    borderRadius: 60,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
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

                    marginTop: portrait ? 0 : verticalScale(20),
                  }}>
                  <Add />
                </View>
                <RNTextComponent
                  isMedium
                  style={[
                    styles.addText,
                    {
                      marginTop: portrait
                        ? verticalScale(40)
                        : verticalScale(10),
                    },
                  ]}>
                  {translation('ADD')}
                </RNTextComponent>
              </Pressable>
            </RNTooltip>
          </ScrollView>
        </View>
        <View
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
          <Pressable
            style={[styles.button, isTablet && {width: scale(90)}]}
            onPress={() => {
              if (playerList.length !== 0) {
                buttonPress();
                navigateTo(SCREEN_NAME.BOTTOM_TAB, {}, true);
              }
            }}
            disabled={childList.length === 0 || playerList.length === 0}>
            {playerList.map((item, index) => {
              const filePath = avatars.filter(
                obj => obj.path === item.avatar,
              )[0]?.file;
              if (item.type === PEOPLE.CHILD) {
                return (
                  <Image
                    key={index.toString()}
                    source={{uri: filePath || item.avatar}}
                    style={styles.profile}
                  />
                );
              } else {
                return (
                  <Image
                    key={index.toString()}
                    source={{uri: filePath || item.avatar}}
                    style={[styles.profile, {height: 40, width: 40}]}
                  />
                );
              }
            })}
          </Pressable>
        </View>
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
