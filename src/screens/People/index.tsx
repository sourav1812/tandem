/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {PeopleScreenProps} from '@tandem/navigation/types';
import {MENU_ARRAY, StateObject} from './interface';
import BlueButton from '@tandem/assets/svg/BlueButton';
import RNButton from '@tandem/components/RNButton';
import {Image, Pressable, ScrollView, View} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {translation} from '@tandem/utils/methods';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNMenuButton from '@tandem/components/RNMenuButton';
import navigateTo from '@tandem/navigation/navigate';
import RNAddComponent from '@tandem/components/RNAddComponent';
import {verticalScale} from 'react-native-size-matters';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import FastImage from 'react-native-fast-image';
import {ChildData} from '@tandem/redux/slices/createChild.slice';

const People = ({}: PeopleScreenProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [state, setState] = useState<StateObject>({
    firstTab: false,
  });

  const [connectedChild, setConnectedChild] = useState<ChildData[]>([]);

  const {firstTab} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const leftTab = () => {
    updateState({firstTab: false});
  };

  const rightTab = () => {
    updateState({firstTab: true});
  };
  const currentAdult = useAppSelector(
    (state1: RootState) => state1.createChild.currentAdult,
  );
  const children = useAppSelector(
    (state1: RootState) => state1.createChild.childList,
  );

  useEffect(() => {
    setConnectedChild(children.filter(child => child.connected == true));
  }, []);

  const avatars = useAppSelector(stateL => stateL.cache.avatars);

  const currentAdultAvatar = avatars.filter(
    obj => obj.path === currentAdult?.avatar,
  )[0]?.file;

  return (
    <RNScreenWrapper style={styles.container}>
      <Pressable
        onPress={() => {
          navigateTo(SCREEN_NAME.ACCOUNT);
        }}>
        <BlueButton style={styles.button} />
      </Pressable>
      <View style={styles.customTab}>
        <RNButton
          title={translation('BIG_PEOPLE')}
          onlyBorder
          pressableStyle={{flex: 1}}
          onClick={leftTab}
          customStyle={[
            styles.tab,
            !firstTab
              ? {
                  borderWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: themeColor.themeBlue,
                }
              : {borderWidth: 0},
          ]}
          textStyle={{
            fontWeight: '600',
            fontSize: 17,
            color: !firstTab ? themeColor.themeBlue : 'rgba(2, 4, 8, 0.6)',
          }}
        />
        <RNButton
          title={translation('LITTLE_PEOPLE')}
          onlyBorder
          onClick={rightTab}
          pressableStyle={{flex: 1}}
          customStyle={[
            styles.tab,
            firstTab
              ? {
                  borderWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: themeColor.themeBlue,
                }
              : {borderWidth: 0},
          ]}
          textStyle={{
            fontWeight: '600',
            fontSize: 17,
            color: firstTab ? themeColor.themeBlue : 'rgba(2, 4, 8, 0.6)',
          }}
        />
      </View>
      {!firstTab ? (
        <>
          <View style={styles.bigpeople}>
            <Pressable
              onPress={() =>
                navigateTo(SCREEN_NAME.EDIT_CHILD_PROFILE, {editAdult: true})
              }>
              <Image
                source={{uri: currentAdultAvatar || currentAdult.avatar}}
                style={[
                  styles.profile,
                  isTablet && {
                    height: verticalScale(94),
                    width: verticalScale(94),
                  },
                ]}
              />
              <RNTextComponent caps style={styles.name} isSemiBold>
                {currentAdult.role}
              </RNTextComponent>
            </Pressable>
            <Pressable
              onPress={() => {
                navigateTo(SCREEN_NAME.CREATE_CHILD_PROFILE, {
                  fromAddAdult: true,
                });
              }}>
              <RNAddComponent customStyle={styles.addButton} />
            </Pressable>
          </View>
          <View style={styles.firstTab}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {MENU_ARRAY.map((item, index) => (
                <RNMenuButton
                  key={index.toString()}
                  onPress={() =>
                    item.navigate &&
                    navigateTo(
                      item.navigate,
                      item.param && {fromPeople: item.param},
                    )
                  }
                  title={translation(item.name)}
                  customStyle={[
                    styles.menu,
                    isTablet && {marginHorizontal: 36},
                  ]}
                />
              ))}
            </ScrollView>
          </View>
        </>
      ) : (
        <>
          <View style={styles.littlePeople}>
            <ScrollView contentContainerStyle={styles.scrollview}>
              {children.map((child, index) => {
                if (!child?.connected) {
                  const childcacheImage = avatars.filter(
                    obj => obj.path === child?.avatar,
                  )[0]?.file;
                  return (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        navigateTo(SCREEN_NAME.EDIT_CHILD_PROFILE, {
                          childId: child.childId,
                        });
                      }}>
                      <Image
                        source={{
                          uri: childcacheImage || child.avatar,
                        }}
                        style={[
                          styles.profile,
                          isTablet && {
                            height: verticalScale(94),
                            width: verticalScale(94),
                          },
                        ]}
                      />
                      <RNTextComponent caps style={styles.name} isSemiBold>
                        {child.name}
                      </RNTextComponent>
                    </Pressable>
                  );
                }
              })}
              <Pressable
                onPress={() => {
                  navigateTo(SCREEN_NAME.CREATE_CHILD_PROFILE);
                }}>
                <RNAddComponent
                  customStyle={styles.addButton}
                  textStyle={styles.addText}
                />
              </Pressable>
            </ScrollView>
          </View>
          {connectedChild.length ? (
            <>
              <RNTextComponent
                caps
                style={[styles.name, {fontSize: verticalScale(15)}]}
                isSemiBold>
                {translation('RECEIVED_CHILD')}
              </RNTextComponent>
              <View style={[styles.littlePeople, {paddingTop: 0}]}>
                <ScrollView contentContainerStyle={styles.scrollview}>
                  {connectedChild.map((child, index) => {
                    const childcacheImage = avatars.filter(
                      obj => obj.path === child?.avatar,
                    )[0]?.file;
                    return (
                      <Pressable
                        key={index.toString()}
                        onPress={() => {
                          navigateTo(SCREEN_NAME.EDIT_CHILD_PROFILE, {
                            childId: child.childId,
                          });
                        }}>
                        <FastImage
                          source={{
                            uri: childcacheImage || child.avatar,
                            priority: FastImage.priority.high,
                          }}
                          style={[
                            styles.profile,
                            isTablet && {
                              height: verticalScale(94),
                              width: verticalScale(94),
                            },
                          ]}
                        />
                        <RNTextComponent caps style={styles.name} isSemiBold>
                          {child.name}
                        </RNTextComponent>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          ) : null}
        </>
      )}
    </RNScreenWrapper>
  );
};

export default People;
