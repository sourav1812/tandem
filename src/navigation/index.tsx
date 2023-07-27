import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {SCREEN_NAME} from './ComponentName';
import BottomTab from './BottomTab';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import Account from '@tandem/screens/Account';
import SplashScreen from '@tandem/screens/SplashScreen';
import {navigationRef} from './navigate';
import {MODE} from '@tandem/constants/mode';
import {Platform} from 'react-native';
import {RootState} from '@tandem/redux/store';
import {useOrientation} from '@tandem/hooks/useOrientation';
import {changeOrientation} from '@tandem/redux/slices/orientation.slice';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const mode = useAppSelector((state: RootState) => state.mode.mode);
  const isTablet = useAppSelector(
    (state: RootState) => state.deviceType.isTablet,
  );
  const dispatch = useAppDispatch();
  const portrait = useOrientation().isPortrait;
  useEffect(() => {
    dispatch(changeOrientation(portrait ? true : false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portrait]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: isTablet ? 'default' : 'portrait',
          animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        }}>
        <Stack.Screen
          component={SplashScreen}
          name={SCREEN_NAME.SPLASH_SCREEN}
        />
        <Stack.Screen component={BottomTab} name={SCREEN_NAME.BOTTOM_TAB} />
        <Stack.Screen component={Account} name={SCREEN_NAME.ACCOUNT} />

        <Stack.Screen
          getComponent={() => require('@tandem/screens/Story').default}
          name={SCREEN_NAME.STORY}
        />
        <Stack.Screen
          getComponent={() => require('@tandem/screens/SocialSignIn').default}
          name={SCREEN_NAME.SOCIAL_SIGN_IN}
        />
        {(mode === MODE.B || mode === MODE.C) && (
          <>
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/GenerateStory').default
              }
              name={SCREEN_NAME.GENERATE_STORY}
            />
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/StoryTelling').default
              }
              name={SCREEN_NAME.STORY_TELLING}
            />
          </>
        )}

        {mode === MODE.A && (
          <>
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/SelectLanguage').default
              }
              name={SCREEN_NAME.SELECT_LANGUAGE}
            />
            <Stack.Screen
              getComponent={() => require('@tandem/screens/Onboarding').default}
              name={SCREEN_NAME.ONBOARDING}
            />

            <Stack.Screen
              getComponent={() => require('@tandem/screens/SignUp').default}
              name={SCREEN_NAME.SIGN_UP}
            />
            <Stack.Screen
              getComponent={() => require('@tandem/screens/SignIn').default}
              name={SCREEN_NAME.SIGN_IN}
            />
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/TermsAndConditions').default
              }
              name={SCREEN_NAME.TERMS_AND_CONDITIONS}
            />
            <Stack.Screen
              getComponent={() => require('@tandem/screens/HelpCenter').default}
              name={SCREEN_NAME.HELP_CENTER}
            />
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/CreateChildProfile').default
              }
              name={SCREEN_NAME.CREATE_CHILD_PROFILE}
            />
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/RedeemVoucher').default
              }
              name={SCREEN_NAME.REDEEM_VOUCHER}
            />
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/EditChildProfile').default
              }
              name={SCREEN_NAME.EditChildProfile}
            />
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/ChangePassword').default
              }
              name={SCREEN_NAME.CHANGE_PASSWORD}
            />
            <Stack.Screen
              getComponent={() => require('@tandem/screens/People').default}
              name={SCREEN_NAME.PEOPLE}
            />
            <Stack.Screen
              getComponent={() => require('@tandem/screens/AboutApp').default}
              name={SCREEN_NAME.ABOUT_APP}
            />

            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/ProfileSettings').default
              }
              name={SCREEN_NAME.PROFILE_SETTINGS}
            />
          </>
        )}
        {mode === MODE.B && (
          <>
            <Stack.Screen
              getComponent={() =>
                require('@tandem/screens/SelectPlayer').default
              }
              name={SCREEN_NAME.SELECT_PLAYER}
            />

            <Stack.Screen
              getComponent={() => require('@tandem/screens/Questions').default}
              name={SCREEN_NAME.QUESTIONS}
            />
          </>
        )}
        {mode === MODE.C && (
          <>
            <Stack.Screen
              getComponent={() => require('@tandem/screens/Activities').default}
              name={SCREEN_NAME.ACTIVITIES}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
