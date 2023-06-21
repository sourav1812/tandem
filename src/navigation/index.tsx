import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {COMPONENTSNAME} from './ComponentName';
import BottomTab from './BottomTab';
import GenerateStory from '../screens/GenerateStory';
import StoryTelling from '../screens/StoryTelling';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={BottomTab} name={COMPONENTSNAME.BOTTOM_TAB} />
        <Stack.Screen component={GenerateStory} name={COMPONENTSNAME.GENERATE_STORY} />
        <Stack.Screen component={StoryTelling} name={COMPONENTSNAME.STORY_TELLING} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
