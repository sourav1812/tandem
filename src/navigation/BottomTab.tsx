/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './types';
import {COMPONENTSNAME} from './ComponentName';
import Home from '@tandem/screens/Home';
import Bookshelf from '@tandem/screens/Bookshelf';
import People from '@tandem/screens/People';
import {StyleSheet, View} from 'react-native';
import BookshelfIcon from '@tandem/assets/svg/Bookmark';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import PeopleIcon from '@tandem/assets/svg/People';
import HomeIcon from '@tandem/assets/svg/Home';
import BookmarkActive from '@tandem/assets/svg/BookmarkActive';
import HomeActive from '@tandem/assets/svg/HomeActive';
import PeopleActive from '@tandem/assets/svg/PeopleActive';
import themeColor from '@tandem/theme/themeColor';
import i18n from '@tandem/constants/api/lang/i18n';

const BottomTab = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        component={Bookshelf}
        name={COMPONENTSNAME.BOOKSHELF}
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    ...(focused && {
                      borderTopWidth: 3,
                      borderColor: themeColor.themeBlue,
                    }),
                  },
                ]}>
                {focused ? <BookmarkActive /> : <BookshelfIcon />}

                <RNTextComponent isMedium style={styles.title}>
                  {i18n.t('BOOKSHELF')}
                </RNTextComponent>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        component={Home}
        name={COMPONENTSNAME.HOME}
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    ...(focused && {
                      borderTopWidth: 3,
                      borderColor: themeColor.themeBlue,
                    }),
                  },
                ]}>
                {focused ? <HomeActive /> : <HomeIcon />}
                <RNTextComponent
                  isMedium
                  style={{
                    ...styles.title,
                    ...(focused && {color: themeColor.themeBlue}),
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
        name={COMPONENTSNAME.PEOPLE}
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.iconContainer,
                  {
                    ...(focused && {
                      borderTopWidth: 3,
                      borderColor: themeColor.themeBlue,
                    }),
                  },
                ]}>
                {focused ? <PeopleActive /> : <PeopleIcon />}
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
    height: verticalScale(50),
  },
  iconContainer: {
    alignItems: 'center',
    width: scale(95),
    maxWidth: 95,
    borderTopWidth: 2,
    borderColor: themeColor.white,
    paddingTop: verticalScale(8),
  },
  title: {
    fontSize: 15,
    color: 'rgba(2, 4, 8, 0.6)',
  },
});
