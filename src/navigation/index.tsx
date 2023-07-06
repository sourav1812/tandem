import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {COMPONENTSNAME} from './ComponentName';
import BottomTab from './BottomTab';
import GenerateStory from '../screens/GenerateStory';
import StoryTelling from '../screens/StoryTelling';
import Story from '../screens/Story';
import Activities from '../screens/Activities';
import SelectPlayer from '../screens/SelectPlayer';
import {useAppSelector} from '../hooks/navigationHooks';
import Questions from '../screens/Questions';
import SelectLanguage from '../screens/SelectLanguage';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import TermsAndConditions from '../screens/TermsAndConditions';
import HelpCenter from '../screens/HelpCenter';
import Account from '../screens/Account';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const mode = useAppSelector(state => state.mode.mode);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          component={SelectLanguage}
          name={COMPONENTSNAME.SELECT_LANGUAGE}
        />
        <Stack.Screen component={SignUp} name={COMPONENTSNAME.SIGN_UP} />
        <Stack.Screen component={SignIn} name={COMPONENTSNAME.SIGN_IN} />
        <Stack.Screen
          component={TermsAndConditions}
          name={COMPONENTSNAME.TERMS_AND_CONDITIONS}
        />
        <Stack.Screen
          component={HelpCenter}
          name={COMPONENTSNAME.HELP_CENTER}
        />
        <Stack.Screen component={Account} name={COMPONENTSNAME.ACCOUNT} />
        {mode == 'bmode' && (
          <Stack.Screen
            component={SelectPlayer}
            name={COMPONENTSNAME.SELECT_PLAYER}
          />
        )}
        <Stack.Screen component={BottomTab} name={COMPONENTSNAME.BOTTOM_TAB} />
        <Stack.Screen
          component={GenerateStory}
          name={COMPONENTSNAME.GENERATE_STORY}
        />
        <Stack.Screen
          component={StoryTelling}
          name={COMPONENTSNAME.STORY_TELLING}
        />
        <Stack.Screen component={Story} name={COMPONENTSNAME.STORY} />
        <Stack.Screen component={Activities} name={COMPONENTSNAME.ACTIVITIES} />
        <Stack.Screen component={Questions} name={COMPONENTSNAME.QUESTIONS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
