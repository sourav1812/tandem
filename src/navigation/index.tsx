import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {SCREEN_NAME} from './ComponentName';
import BottomTab from './BottomTab';
import GenerateStory from '@tandem/screens/GenerateStory';
import StoryTelling from '@tandem/screens/StoryTelling';
import Story from '@tandem/screens/Story';
import Activities from '@tandem/screens/Activities';
import SelectPlayer from '@tandem/screens/SelectPlayer';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import Questions from '@tandem/screens/Questions';
import SelectLanguage from '@tandem/screens/SelectLanguage';
import SignUp from '@tandem/screens/SignUp';
import SignIn from '@tandem/screens/SignIn';
import TermsAndConditions from '@tandem/screens/TermsAndConditions';
import HelpCenter from '@tandem/screens/HelpCenter';
import Account from '@tandem/screens/Account';
import SplashScreen from '@tandem/screens/SplashScreen';
import Onboarding from '@tandem/screens/Onboarding';
import SocialSignIn from '@tandem/screens/SocialSignIn';
import {navigationRef} from './navigate';
import {MODE} from '@tandem/constants/mode';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const mode = useAppSelector(state => state.mode.mode);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          component={SplashScreen}
          name={SCREEN_NAME.SPLASH_SCREEN}
        />
        <Stack.Screen
          component={SelectLanguage}
          name={SCREEN_NAME.SELECT_LANGUAGE}
        />
        <Stack.Screen component={Onboarding} name={SCREEN_NAME.ONBOARDING} />
        <Stack.Screen
          component={SocialSignIn}
          name={SCREEN_NAME.SOCIAL_SIGN_IN}
        />
        <Stack.Screen component={SignUp} name={SCREEN_NAME.SIGN_UP} />
        <Stack.Screen component={SignIn} name={SCREEN_NAME.SIGN_IN} />
        <Stack.Screen
          component={TermsAndConditions}
          name={SCREEN_NAME.TERMS_AND_CONDITIONS}
        />
        <Stack.Screen component={HelpCenter} name={SCREEN_NAME.HELP_CENTER} />
        <Stack.Screen component={Account} name={SCREEN_NAME.ACCOUNT} />
        {mode === MODE.B && (
          <Stack.Screen
            component={SelectPlayer}
            name={SCREEN_NAME.SELECT_PLAYER}
          />
        )}
        <Stack.Screen component={BottomTab} name={SCREEN_NAME.BOTTOM_TAB} />
        <Stack.Screen
          component={GenerateStory}
          name={SCREEN_NAME.GENERATE_STORY}
        />
        <Stack.Screen
          component={StoryTelling}
          name={SCREEN_NAME.STORY_TELLING}
        />
        <Stack.Screen component={Story} name={SCREEN_NAME.STORY} />
        <Stack.Screen component={Activities} name={SCREEN_NAME.ACTIVITIES} />
        <Stack.Screen component={Questions} name={SCREEN_NAME.QUESTIONS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
