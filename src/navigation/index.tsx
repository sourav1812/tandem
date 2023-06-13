import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {COMPONENTSNAME} from './ComponentName';
import BottomTab from './BottomTab';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={BottomTab} name={COMPONENTSNAME.BOTTOM_TAB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
