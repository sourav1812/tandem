import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {SCREEN_NAME} from './ComponentName';
import BottomTab from './BottomTab';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import Account from '@tandem/screens/Account';
import SplashScreen from '@tandem/screens/SplashScreen';
import {navigationRef} from './navigate';
import {BackHandler, Platform} from 'react-native';
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
import StoryLanguage from '@tandem/screens/GenerateStory/Questions/StoryLangauge';
import RobotBuildingBook from '@tandem/screens/RobotBuildingBook';
import {setEnergyGenerated} from '@tandem/redux/slices/activityIndicator.slice';
import Disclaimer from '@tandem/screens/Disclaimer';
import {changeChildAndNavigate} from '@tandem/functions/gotoBookshelf';
import notifee, {EventType} from '@notifee/react-native';
import ShareChild from '@tandem/screens/ShareChild';
import RecieveChildDetail from '@tandem/screens/RecieveChildDetail';
import QRScanner from '@tandem/screens/QrScanner';
import {clearAlertData} from '@tandem/redux/slices/alertBox.slice';
import ConnectionRequest from '@tandem/screens/ConnectionRequests';
import ConnectionRequests from '@tandem/screens/ConnectionRequests';
import VerifyEmail from '@tandem/screens/VerifyEmail';
import TopUpAndSubscribe from '@tandem/screens/TopUpAndSubscribe';
import TopUp from '@tandem/screens/TopUp';
import Subscription from '@tandem/screens/Subscription';
import ManageSubscription from '@tandem/screens/ManageSubscription';
import LittlePeople from '@tandem/screens/LittlePeople';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const routeNameRef = React.useRef<any>(null);
  const isTablet = useAppSelector(
    (state: RootState) => state.deviceType.isTablet,
  );
  const dispatch = useAppDispatch();

  useOrientation();
  const alertData = useAppSelector(
    (state: RootState) => state.alertBoxReducer.data,
  );

  React.useEffect(() => {
    const f = async () => {
      await resumeAppState();
      return notifee.onForegroundEvent(({type, detail}) => {
        switch (type) {
          case EventType.PRESS:
            console.log(
              'onForegroundEvent on navigation',
              detail.notification?.data,
            );
            const metaData = detail?.notification?.data?.metaData as string;
            if (metaData) {
              const childId = JSON.parse(metaData)?.childId;
              if (childId) {
                changeChildAndNavigate(childId);
              }
            }
            break;
        }
      });
    };
    f();
  }, []);
  React.useEffect(() => {
    if (alertData.message) {
      const backAction = () => {
        dispatch(clearAlertData());
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [alertData]);

  React.useEffect(() => {
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
            component={VerifyEmail}
            name={SCREEN_NAME.VERIFY_EMAIL}
          />
          <Stack.Screen
            component={RobotBuildingBook}
            name={SCREEN_NAME.ROBOT_BUILDING_BOOK}
          />
          <Stack.Screen component={ShareChild} name={SCREEN_NAME.SHARE_CHILD} />
          <Stack.Screen
            component={RecieveChildDetail}
            name={SCREEN_NAME.RECIEVE_CHILD_DETAIL}
          />
          <Stack.Screen
            component={StoryLanguage}
            name={SCREEN_NAME.STORY_LANGAUGE}
          />
          <Stack.Screen component={Disclaimer} name={SCREEN_NAME.DISCLAIMER} />
          <Stack.Screen
            component={TopUpAndSubscribe}
            name={SCREEN_NAME.TOP_UP_AND_SUBSCRIPTION}
          />
          <Stack.Screen component={TopUp} name={SCREEN_NAME.TOP_UP} />
          <Stack.Screen
            component={Subscription}
            name={SCREEN_NAME.SUBSCRIPTION}
          />
          <Stack.Screen
            component={ManageSubscription}
            name={SCREEN_NAME.MANAGE_SUBSCRIPTION}
          />
          <Stack.Screen
            component={BlowWindMill}
            options={{gestureEnabled: false}}
            name={SCREEN_NAME.BLOW_WINDMILL}
          />
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
            component={LittlePeople}
            name={SCREEN_NAME.LITTLE_PEOPLE}
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
              require('@tandem/screens/GenerateStory/Questions/Where').default
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
              require('@tandem/screens/GenerateStory/Questions/Colors').default
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
          {/* Below mode will be changed to only MODE.A when app in stable
        version.  Only add Screens needed for MODE.A */}
          <Stack.Screen
            getComponent={() =>
              require('@tandem/screens/SelectLanguage').default
            }
            name={SCREEN_NAME.SELECT_LANGUAGE}
          />
          <Stack.Screen
            getComponent={() => require('@tandem/screens/TermsOfUse').default}
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
            getComponent={() => require('@tandem/screens/HelpCenter').default}
            name={SCREEN_NAME.HELP_CENTER}
          />
          <Stack.Screen
            getComponent={() => require('@tandem/screens/Onboarding').default}
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
              require('@tandem/screens/ForgotPassword/CreatePassword').default
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
          <Stack.Screen
            getComponent={() => require('@tandem/screens/SelectPlayer').default}
            name={SCREEN_NAME.SELECT_PLAYER}
          />
          <Stack.Screen
            getComponent={() => require('@tandem/screens/Questions').default}
            name={SCREEN_NAME.QUESTIONS}
          />
          <Stack.Screen
            getComponent={() => require('@tandem/screens/Activities').default}
            name={SCREEN_NAME.ACTIVITIES}
          />
          <Stack.Screen component={QRScanner} name={SCREEN_NAME.QR_SCANNER} />
          <Stack.Screen
            component={ConnectionRequests}
            name={SCREEN_NAME.CONNECTION_REQUESTS}
          />
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
