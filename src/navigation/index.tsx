import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {SCREEN_NAME} from './ComponentName';
import BottomTab from './BottomTab';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import Account from '@tandem/screens/Account';
import SplashScreen from '@tandem/screens/SplashScreen';
import {navigationRef} from './navigate';
import {MODE} from '@tandem/constants/mode';
import {Platform} from 'react-native';
import {RootState, store} from '@tandem/redux/store';
import {useOrientation} from '@tandem/hooks/useOrientation';
import RNAlertBox from '@tandem/components/RNAlertBox';
import resumeAppState from '@tandem/functions/resumeAppState';
import {hitStoryGenApiStandalone} from '@tandem/api/generateStory';
import {clearPendingStoriesGen} from '@tandem/redux/slices/cache.slice';
import {ConversationScreen} from '@tandem/screens/ConversationStaters';
import BuildingTandem from '@tandem/screens/BuildingTandem';
import Archive from '@tandem/screens/Archive';
import analytics from '@react-native-firebase/analytics';
import BlowWindMill from '@tandem/screens/BlowWindMill';
import MatchingPairs from '@tandem/screens/MatchingPairs';
import MixColors from '@tandem/screens/MixColors';
import StoryLanguage from '@tandem/screens/GenerateStory/Questions/StoryLangauge';
import RobotBuildingBook from '@tandem/screens/RobotBuildingBook';
import {
  setEnergyGenerated,
  setProgressRef,
} from '@tandem/redux/slices/activityIndicator.slice';
import Disclaimer from '@tandem/screens/Disclaimer';
// import {accelerometer} from 'react-native-sensors';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const mode = useAppSelector((state: RootState) => state.mode.mode);
  const routeNameRef = React.useRef<any>(null);
  const isTablet = useAppSelector(
    (state: RootState) => state.deviceType.isTablet,
  );

  useOrientation();
  const alertData = useAppSelector(
    (state: RootState) => state.alertBoxReducer.data,
  );

  React.useEffect(() => {
    resumeAppState();
    store.dispatch(setEnergyGenerated(true)); // ! on App open we do want to show notification
    // ! logic to make post req for multiple pending posts
    const pendingStory = store.getState().cache.pendingStoryGeneration;
    if (pendingStory.length > 0) {
      pendingStory.forEach(story => {
        hitStoryGenApiStandalone(story);
      });
      store.dispatch(clearPendingStoriesGen());
    }
  }, []);

  return (
    <>
      <NavigationContainer
        onReady={() => {
          routeNameRef.current =
            navigationRef?.current?.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef?.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
        ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={SCREEN_NAME.SPLASH_SCREEN}
          screenOptions={{
            headerShown: false,
            orientation: isTablet ? 'default' : 'portrait',
            animation:
              Platform.OS === 'android' ? 'slide_from_right' : 'default',
          }}>
          <Stack.Screen component={Archive} name={SCREEN_NAME.ARCHIVE} />
          <Stack.Screen
            component={RobotBuildingBook}
            name={SCREEN_NAME.ROBOT_BUILDING_BOOK}
          />
          <Stack.Screen
            component={StoryLanguage}
            name={SCREEN_NAME.STORY_LANGAUGE}
          />
          <Stack.Screen component={Disclaimer} name={SCREEN_NAME.DISCLAIMER} />
          <Stack.Screen
            component={BlowWindMill}
            options={{gestureEnabled: false}}
            name={SCREEN_NAME.BLOW_WINDMILL}
          />
          <Stack.Screen component={MixColors} name={SCREEN_NAME.MIX_COLORS} />
          <Stack.Screen
            component={MatchingPairs}
            options={{gestureEnabled: false}}
            name={SCREEN_NAME.MATCHING_PAIRS}
          />
          <Stack.Screen
            component={SplashScreen}
            options={{gestureEnabled: false}}
            name={SCREEN_NAME.SPLASH_SCREEN}
          />
          <Stack.Screen
            options={{gestureEnabled: false}}
            component={BottomTab}
            name={SCREEN_NAME.BOTTOM_TAB}
          />
          <Stack.Screen
            options={{gestureEnabled: false}}
            component={Account}
            name={SCREEN_NAME.ACCOUNT}
          />
          <Stack.Screen
            getComponent={() => require('@tandem/screens/Story').default}
            name={SCREEN_NAME.STORY}
          />
          <Stack.Screen
            getComponent={() => require('@tandem/screens/SocialSignIn').default}
            name={SCREEN_NAME.SOCIAL_SIGN_IN}
          />
          <Stack.Screen
            getComponent={() =>
              require('@tandem/screens/ConversationStaters').default
            }
            name={SCREEN_NAME.CONVERSATION_STARTERS}
          />
          <Stack.Screen
            //@ts-expect-error
            component={ConversationScreen}
            name={SCREEN_NAME.CONVERSATION}
          />
          <Stack.Screen
            component={BuildingTandem}
            options={{gestureEnabled: false}}
            name={SCREEN_NAME.BUILDING_TANDEM}
          />
          <Stack.Screen
            options={{gestureEnabled: false}}
            getComponent={() => require('@tandem/screens/StoryTelling').default}
            name={SCREEN_NAME.STORY_TELLING}
          />
          {(mode === MODE.B || mode === MODE.C) && (
            <>
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/GenerateStory/Questions/Who').default
                }
                name={SCREEN_NAME.GENERATE_STORY_WHO}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/GenerateStory/Questions/Inclusion')
                    .default
                }
                name={SCREEN_NAME.GENERATE_STORY_INCLUSION}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/GenerateStory/Questions/Where')
                    .default
                }
                name={SCREEN_NAME.GENERATE_STORY_WHERE}
              />

              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/GenerateStory/Questions/WhatThings')
                    .default
                }
                name={SCREEN_NAME.GENERATE_STORY_WHAT_THINGS}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/GenerateStory/Questions/WhatHappens')
                    .default
                }
                name={SCREEN_NAME.GENERATE_STORY_WHAT_HAPPENS}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/GenerateStory/Questions/Illustrations')
                    .default
                }
                name={SCREEN_NAME.GENERATE_STORY_ILLUSTRATIONS}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/GenerateStory/Questions/Colors')
                    .default
                }
                name={SCREEN_NAME.GENERATE_STORY_COLORS}
              />
              <Stack.Screen
                options={{gestureEnabled: false}}
                getComponent={() =>
                  require('@tandem/screens/Congratulation').default
                }
                name={SCREEN_NAME.CONGRATULATION}
              />
              <Stack.Screen
                getComponent={() => require('@tandem/screens/RoadMap').default}
                name={SCREEN_NAME.ROADMAP}
              />
            </>
          )}

          {/* Below mode will be changed to only MODE.A when app in stable
        version.  Only add Screens needed for MODE.A */}
          {(mode === MODE.A || mode === MODE.B || mode === MODE.C) && (
            <>
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/SelectLanguage').default
                }
                name={SCREEN_NAME.SELECT_LANGUAGE}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/TermsOfUse').default
                }
                name={SCREEN_NAME.TERMS_OF_USE}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/PrivacyPolicies').default
                }
                name={SCREEN_NAME.PRIVACY_POLICIES}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/TermsAndConditions').default
                }
                name={SCREEN_NAME.TERMS_AND_CONDITIONS}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/HelpCenter').default
                }
                name={SCREEN_NAME.HELP_CENTER}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/Onboarding').default
                }
                name={SCREEN_NAME.ONBOARDING}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/ForgotPassword/CheckEmail').default
                }
                name={SCREEN_NAME.CHECK_EMAIL}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/ForgotPassword/OtpScreen').default
                }
                name={SCREEN_NAME.OTP_SCREEN}
              />
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/ForgotPassword/CreatePassword')
                    .default
                }
                name={SCREEN_NAME.CREATE_PASSWORD}
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
                  require('@tandem/screens/ForgotPassword').default
                }
                name={SCREEN_NAME.FORGOT_PASSWORD}
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
                name={SCREEN_NAME.EDIT_CHILD_PROFILE}
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
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/NotificationScreen').default
                }
                name={SCREEN_NAME.NOTIFICATION_SCREEN}
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
                getComponent={() =>
                  require('@tandem/screens/Questions').default
                }
                name={SCREEN_NAME.QUESTIONS}
              />
            </>
          )}
          {mode === MODE.C && (
            <>
              <Stack.Screen
                getComponent={() =>
                  require('@tandem/screens/Activities').default
                }
                name={SCREEN_NAME.ACTIVITIES}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <RNAlertBox
        visible={alertData?.type ? true : false}
        type={alertData?.type}
        message={alertData?.message}
        possibleResolution={alertData?.possibleResolution}
      />
    </>
  );
};

export default AppNavigator;
