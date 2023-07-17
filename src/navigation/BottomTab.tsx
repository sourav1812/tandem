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
import i18n from '@tandem/constants/lang/i18n';

const BottomTab = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelPosition: 'below-icon',
      }}>
      <Tab.Screen
        component={Bookshelf}
        name={SCREEN_NAME.BOOKSHELF}
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    ...(focused && {
                      borderTopWidth: verticalScale(3),
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
                  {i18n.t('BOOKSHELF')}
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
                      borderTopWidth: verticalScale(3),
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
                  {i18n.t('HOME')}
                </RNTextComponent>
              </View>
            );
          },
        }}
      />
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
                      borderTopWidth: verticalScale(3),
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
                  {i18n.t('PEOPLE')}
                </RNTextComponent>
              </View>
            );
          },
        }}
      />
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
    height: verticalScale(75),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: verticalScale(3),
    borderColor: 'transparent',
    height: '100%',
    width: '80%',
    paddingTop: verticalScale(7),
  },
  title: {
    fontSize: verticalScale(12),
    color: 'rgba(2, 4, 8, 0.6)',
    width: '100%',
    textAlign: 'center',
    marginTop: 5,
  },
});
