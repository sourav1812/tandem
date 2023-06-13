import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './types';
import {COMPONENTSNAME} from './ComponentName';
import Home from '../screens/Home';
import Bookshelf from '../screens/Bookshelf';
import People from '../screens/People';
import {StyleSheet, View} from 'react-native';
import BookshelfIcon from '../assets/svg/Bookmark';
import RNTextComponent from '../components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import PeopleIcon from '../assets/svg/People';
import HomeIcon from '../assets/svg/Home';
import BookmarkActive from '../assets/svg/BookmarkActive';
import HomeActive from '../assets/svg/HomeActive';

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
              <View style={styles.iconContainer}>
                {focused ? <BookmarkActive /> : <BookshelfIcon />}

                <RNTextComponent isMedium style={styles.title}>
                  Bookshelf
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
              <View style={styles.iconContainer}>
                {focused ? <HomeActive /> : <HomeIcon />}
                <RNTextComponent isMedium style={styles.title}>
                  Home
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
              <View style={styles.iconContainer}>
                <PeopleIcon />
                <RNTextComponent isMedium style={styles.title}>
                  People
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
    height: verticalScale(52),
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    width: scale(100),
    marginTop: verticalScale(8),
  },
  title: {
    fontSize: 15,
    color: 'rgba(2, 4, 8, 0.6)',
  },
});
