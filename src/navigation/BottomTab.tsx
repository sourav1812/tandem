/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './types';
import {SCREEN_NAME} from './ComponentName';
import Home from '@tandem/screens/Home';
import Bookshelf from '@tandem/screens/Bookshelf';
import People from '@tandem/screens/People';
import {StyleSheet, View} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import PeopleIcon from '@tandem/assets/svg/People';
import HomeIcon from '@tandem/assets/svg/Home';
import BookmarkActive from '@tandem/assets/svg/BookmarkActive';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {MODE} from '@tandem/constants/mode';
import {translation} from '@tandem/utils/methods';
import {RootState} from '@tandem/redux/store';
import NotificationScreen from '@tandem/screens/NotificationScreen';
import PublicLib from '@tandem/screens/PublicLib';

const BottomTab = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const mode = useAppSelector((state: RootState) => state.mode.mode);
  const notificationScreenPermissions = useAppSelector(
    (state: RootState) => state.permissions,
  );
  const isTablet = useAppSelector(
    (state: RootState) => state.deviceType.isTablet,
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: isTablet ? verticalScale(60) : verticalScale(75),
          },
        ],
        tabBarLabelPosition: 'below-icon',
      }}
      initialRouteName={SCREEN_NAME.HOME}>
      <Tab.Screen
        component={
          !notificationScreenPermissions.isFirstTime ||
          notificationScreenPermissions.notificationStatus
            ? Bookshelf
            : NotificationScreen
        }
        name={
          !notificationScreenPermissions.isFirstTime ||
          notificationScreenPermissions.notificationStatus
            ? SCREEN_NAME.BOOKSHELF
            : SCREEN_NAME.NOTIFICATION_SCREEN
        }
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    ...(focused && {
                      borderTopWidth: verticalScale(2),
                      borderColor: themeColor.themeBlue,
                    }),
                  },
                ]}>
                <BookmarkActive focused={focused} />

                <RNTextComponent
                  isMedium
                  style={[
                    styles.title,
                    {
                      ...(focused && {
                        color: themeColor.themeBlue,
                      }),
                    },
                  ]}>
                  {translation('BOOKSHELF')}
                </RNTextComponent>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        component={Home}
        name={SCREEN_NAME.HOME}
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    ...(focused && {
                      borderTopWidth: verticalScale(2),
                      borderColor: themeColor.themeBlue,
                    }),
                  },
                ]}>
                <HomeIcon focused={focused} />
                <RNTextComponent
                  isMedium
                  style={{
                    ...styles.title,
                    ...(focused && {
                      color: themeColor.themeBlue,
                    }),
                  }}>
                  {translation('HOME')}
                </RNTextComponent>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        component={PublicLib}
        name={SCREEN_NAME.PUBLIC_LIB}
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    ...(focused && {
                      borderTopWidth: verticalScale(2),
                      borderColor: themeColor.themeBlue,
                    }),
                  },
                ]}>
                <BookmarkActive focused={focused} />

                <RNTextComponent
                  isMedium
                  style={[
                    styles.title,
                    {
                      ...(focused && {
                        color: themeColor.themeBlue,
                      }),
                    },
                  ]}>
                  {translation('PUBLIC_LIBRARY')}
                </RNTextComponent>
              </View>
            );
          },
        }}
      />
      {mode === MODE.A && (
        <Tab.Screen
          component={People}
          name={SCREEN_NAME.PEOPLE}
          options={{
            tabBarIcon: ({focused}: any) => {
              return (
                <View
                  style={[
                    styles.iconContainer,
                    {
                      ...(focused && {
                        borderTopWidth: verticalScale(2),
                        borderColor: themeColor.themeBlue,
                      }),
                    },
                  ]}>
                  <PeopleIcon focused={focused} />
                  <RNTextComponent
                    isMedium
                    style={{
                      ...styles.title,
                      ...(focused && {color: themeColor.themeBlue}),
                    }}>
                    {translation('PEOPLE')}
                  </RNTextComponent>
                </View>
              );
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    elevation: 0,
    borderTopColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: verticalScale(2),
    borderColor: 'transparent',
    height: '100%',
    width: '90%',
    paddingTop: verticalScale(7),
  },
  title: {
    fontSize: verticalScale(9),
    color: 'rgba(2, 4, 8, 0.6)',
    width: '100%',
    textAlign: 'center',
    marginTop: 5,
  },
});
