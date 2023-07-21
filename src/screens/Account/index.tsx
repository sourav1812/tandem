/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {View, Image, ScrollView, Pressable} from 'react-native';
import Logout from '@tandem/assets/svg/Logout';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import RNKidsProfile from '@tandem/components/RNKidsProfile';
import Add from '@tandem/assets/svg/Add';
import RNParentProfile from '@tandem/components/RNParentProfile';
import RNSignoutModal from '@tandem/components/RNSignoutModal';
import {adultProfile, childProfile, stateObject} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';
import Lion from '@tandem/assets/svg/AnimatedLion';
import {translation} from '@tandem/utils/methods';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {changeMode} from '@tandem/redux/slices/mode.slice';
import {MODE} from '@tandem/constants/mode';
import themeColor from '@tandem/theme/themeColor';

const Account = () => {
  const isTablet = checkIfTablet();
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.mode.mode);
  const [state, setState] = useState<stateObject>({
    signoutModal: false,
    childrenList: [{type: 'child'}, {type: 'child'}],
    adultList: [{type: 'adult'}, {type: 'adult'}],
    playerList: [],
  });

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
          isTablet ? {fontSize: 24} : {fontSize: verticalScale(20)},
        ]}>
        {i18n.t('WHO_IS_USING_THE_APP_NEXT')}
      </RNTextComponent>
      <View style={[styles.content, isTablet && {marginHorizontal: 120}]}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {childrenList.map(item => {
              return (
                <Pressable
                  onPress={() => {
                    addPlayer(item);
                  }}>
                  <RNKidsProfile />
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
                {i18n.t('ADD')}
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
              console.log(item);
              if (item.type === 'child') {
                return (
                  <Pressable
                    onPress={() => {
                      removePlayer(index);
                    }}>
                    <RNKidsProfile />
                  </Pressable>
                );
              } else {
                return (
                  <Pressable
                    onPress={() => {
                      removePlayer(index);
                    }}>
                    <RNParentProfile />
                  </Pressable>
                );
              }
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {adultList.map(item => {
              return (
                <Pressable
                  onPress={() => {
                    addPlayer(item);
                  }}>
                  <RNParentProfile />
                </Pressable>
              );
            })}
            <Pressable style={styles.add} onPress={() => {}}>
              <Add />
              <RNTextComponent isMedium style={styles.addText}>
                {i18n.t('ADD')}
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
                setTimeout(() => {
                  navigateTo(SCREEN_NAME.BOTTOM_TAB);
                }, 500);
              }
            }}>
            {playerList.map(item => {
              if (item.type === 'child') {
                return (
                  <Image
                    source={{
                      uri: 'https://thumbs.dreamstime.com/b/cute-giraffe-face-wild-animal-character-animated-cartoon-png-illustration-isolated-transparent-background-hand-drawn-png-264757481.jpg',
                    }}
                    style={styles.profile}
                  />
                );
              } else {
                return <Lion height={32} width={32} />;
              }
            })}
          </Pressable>
        </View>
      </View>
      <RNSignoutModal
        visible={signoutModal}
        renderModal={toggleSignOut}
        nextClick={() => {
          navigateTo(SCREEN_NAME.SELECT_LANGUAGE);
        }}
      />
    </RNScreenWrapper>
  );
};

export default Account;
