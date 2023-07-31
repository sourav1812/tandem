/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import {View, Image, ScrollView, Pressable} from 'react-native';
import Logout from '@tandem/assets/svg/Logout';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import RNKidsProfile from '@tandem/components/RNKidsProfile';
import Add from '@tandem/assets/svg/Add';
import RNParentProfile from '@tandem/components/RNParentProfile';
import RNSignoutModal from '@tandem/components/RNSignoutModal';
import {adultProfile, childProfile, StateObject} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import Lion from '@tandem/assets/svg/AnimatedLion';
import {translation} from '@tandem/utils/methods';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {changeMode} from '@tandem/redux/slices/mode.slice';
import {MODE} from '@tandem/constants/mode';
import themeColor from '@tandem/theme/themeColor';
import {useSelector} from 'react-redux';
import {RootState} from '@tandem/redux/store';
import RNTooltip from '@tandem/components/RNTooltip';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/LocalConstants';

const Account = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [openTooltip, setOpentTooltip] = useState(true);
  const dispatch = useAppDispatch();
  const tooltipArray = getValueFromKey(TOOLTIP);

  // const mode = useAppSelector(state => state.mode.mode);
  const [state, setState] = useState<StateObject>({
    signoutModal: false,
    childrenList: [
      {name: 'Tim', type: 'child'},
      {name: 'Alisa', type: 'child'},
    ],
    adultList: [
      {name: 'Mom', type: 'adult'},
      {name: 'Dad', type: 'adult'},
    ],
    playerList: [],
  });
  const portrait = useSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const {signoutModal, childrenList, adultList, playerList} = state;
  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const toggleSignOut = () => {
    updateState({signoutModal: !signoutModal});
  };

  const addPlayer = (item: childProfile | adultProfile) => {
    if (
      item.type === 'child' &&
      playerList.filter(item => item.type === 'child').length == 0
    ) {
      let playerArrar = [...playerList];
      playerArrar.push(item);
      updateState({playerList: playerArrar});
    }
    if (
      item.type === 'adult' &&
      playerList.filter(item => item.type === 'adult').length == 0
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
      playerList.filter(item => item.type === 'child').length > 0 &&
      playerList.filter(item => item.type === 'adult').length > 0
    ) {
      return `${translation('START')}: Tandem`;
    } else if (playerList.filter(item => item.type === 'child').length > 0) {
      return `${translation('START')}: ${translation('CHILD')}`;
    } else if (playerList.filter(item => item.type === 'adult').length > 0) {
      return `${translation('START')}: ${translation('ADULT')}`;
    } else {
      return `${translation('SELECT_MODE')}`;
    }
  };

  const buttonPress = () => {
    if (
      playerList.filter(item => item.type === 'child').length > 0 &&
      playerList.filter(item => item.type === 'adult').length > 0
    ) {
      dispatch(changeMode(MODE.B));
    } else if (playerList.filter(item => item.type === 'child').length > 0) {
      dispatch(changeMode(MODE.C));
    } else if (playerList.filter(item => item.type === 'adult').length > 0) {
      dispatch(changeMode(MODE.A));
    } else {
      return '';
    }
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/png/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <RNButton onlyIcon icon={<Logout />} onClick={toggleSignOut} />
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
            {childrenList.map((item, index) => {
              return (
                <Pressable
                  key={index.toString()}
                  onPress={() => {
                    addPlayer(item);
                  }}>
                  {index === 0 ? (
                    <RNTooltip
                      text={'Here you can add your child.'}
                      top={false}
                      rotation={0}
                      open={tooltipArray?.includes(1) ? false : openTooltip}
                      setClose={() => {
                        setOpentTooltip(false);
                        tooltipArray.push(1);
                        storeKey(TOOLTIP, tooltipArray);
                      }}>
                      <RNKidsProfile
                        style={{
                          height: portrait
                            ? verticalScale(60)
                            : verticalScale(40),
                          width: portrait
                            ? verticalScale(60)
                            : verticalScale(40),
                        }}
                        data={item}
                      />
                    </RNTooltip>
                  ) : (
                    <RNKidsProfile
                      style={{
                        height: portrait
                          ? verticalScale(60)
                          : verticalScale(40),
                        width: portrait ? verticalScale(60) : verticalScale(40),
                      }}
                      data={item}
                    />
                  )}
                </Pressable>
              );
            })}
            <Pressable
              style={styles.add2}
              onPress={() => {
                navigateTo(SCREEN_NAME.CREATE_CHILD_PROFILE);
              }}>
              <Add />
              <RNTextComponent
                isMedium
                style={[styles.addText, {marginTop: verticalScale(20)}]}>
                {translation('ADD')}
              </RNTextComponent>
            </Pressable>
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
              if (item.type === 'child') {
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
                      }}
                      data={item}
                    />
                  </Pressable>
                );
              } else {
                return (
                  <Pressable
                    key={index.toString()}
                    onPress={() => {
                      removePlayer(index);
                    }}>
                    <RNParentProfile
                      height={
                        portrait ? verticalScale(105) : verticalScale(52.5)
                      }
                      width={portrait ? verticalScale(90) : verticalScale(45)}
                      data={item}
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
                  <RNParentProfile
                    height={portrait ? verticalScale(105) : verticalScale(52.5)}
                    width={portrait ? verticalScale(90) : verticalScale(45)}
                    data={item}
                  />
                </Pressable>
              );
            })}
            <Pressable
              style={styles.add}
              onPress={() => {
                dispatch(changeMode(MODE.A));
                navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN, {}, true);
              }}>
              <Add />
              <RNTextComponent
                isMedium
                style={
                  (styles.addText,
                  {marginTop: portrait ? verticalScale(42) : verticalScale(21)})
                }>
                {translation('ADD')}
              </RNTextComponent>
            </Pressable>
          </ScrollView>
        </View>
        <View
          style={[
            styles.footer,
            playerList.length === 0 && {backgroundColor: themeColor.lightGray},
          ]}>
          <RNTextComponent
            isSemiBold
            style={[
              styles.text,
              playerList.length === 0 && {
                color: themeColor.themeBlue,
              },
            ]}>
            {' '}
            {buttonHeading()}{' '}
          </RNTextComponent>
          <Pressable
            style={[styles.button, isTablet && {width: scale(90)}]}
            onPress={() => {
              if (playerList.length !== 0) {
                buttonPress();
                navigateTo(SCREEN_NAME.BOTTOM_TAB, {}, true);
              }
            }}>
            {playerList.map((item, index) => {
              if (item.type === 'child') {
                return (
                  <Image
                    key={index.toString()}
                    source={{
                      uri: 'https://thumbs.dreamstime.com/b/cute-giraffe-face-wild-animal-character-animated-cartoon-png-illustration-isolated-transparent-background-hand-drawn-png-264757481.jpg',
                    }}
                    style={styles.profile}
                  />
                );
              } else {
                return <Lion key={index.toString()} height={32} width={32} />;
              }
            })}
          </Pressable>
        </View>
      </View>
      <RNSignoutModal
        visible={signoutModal}
        renderModal={toggleSignOut}
        nextClick={() => {
          dispatch(changeMode(MODE.A));
          navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN, {}, true);
        }}
      />
    </RNScreenWrapper>
  );
};

export default Account;
