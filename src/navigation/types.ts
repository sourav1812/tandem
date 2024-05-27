import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SCREEN_NAME} from './ComponentName';

export type RootStackParamList = {
  BottomTab: RootTabParamList;
  GenerateStory: undefined;
  StoryTelling: undefined;
  Story: undefined;
  Activities: undefined;
  SelectPlayer: undefined;
  Questions: undefined;
  SelectLanguage: undefined;
  SignUp: undefined;
  SignIn: undefined;
  TermsAndConditions: undefined;
  HelpCenter: {fromPeople: boolean} | undefined;
  Account: undefined;
  SplashScreen: undefined;
  Onboarding: undefined;
  SocialSignIn: undefined;
  CreateChildProfile: {fromAddAdult: boolean} | undefined;
  ProfileSettings: undefined;
  ChangePassword: undefined;
  People: undefined;
  AboutApp: undefined;
  EditChildProfile: {editAdult?: boolean; childId?: string};
  RedeemVoucher: undefined;
  RoadMap: undefined;
  ForgotPasswords: undefined;
  CheckEmail: {email: string};
  ForgotPassword: undefined;
  OtpScreen: {email: string};
  CreatePassword: {resetToken: string};
  PrivacyPolicies: undefined;
  TermsOfUse: undefined;
  Congratulation: undefined;
  NotificationScreen: undefined;
  Who: undefined;
  Inclusion: undefined;
  Where: undefined;
  WhatThings: undefined;
  WhatHappens: undefined;
  Illustrations: undefined;
  Colors: undefined;
  ConversationStaters: undefined;
  ConversationScreen: any;
  BuildingTandem: undefined;
  Archive: undefined;
  BlowWindMill: any;
  MatchingPairs: any;
  MixColors: undefined;
  StoryLanguage: undefined;
  RobotBuildingBook: undefined;
  Disclaimer: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Bookshelf: undefined;
  People: undefined;
  NotificationScreen: undefined;
  PublicLib: undefined;
};

export type AllStackScreenParamList = RootStackParamList & RootTabParamList;

export type StoryTellingScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.STORY_TELLING
>;
export type BookShelfScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.BOOKSHELF
>;
export type StoryScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.STORY
>;
export type ActivitiesScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.ACTIVITIES
>;
export type SelectPlayerScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.SELECT_PLAYER
>;
export type PeopleScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.PEOPLE
>;
export type QuestionsScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.QUESTIONS
>;
export type SelectLanguageProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.SELECT_LANGUAGE
>;
export type SignUpProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.SIGN_UP
>;
export type SignInProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.SIGN_IN
>;
export type TermsAndConditionsProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.TERMS_AND_CONDITIONS
>;
export type HelpCenterProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.HELP_CENTER
>;
export type AccountProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.ACCOUNT
>;

export type SplashScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.SPLASH_SCREEN
>;

export type OnboardingProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.ONBOARDING
>;

export type SocialSignInProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.SOCIAL_SIGN_IN
>;

export type CreateChildProfileProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.CREATE_CHILD_PROFILE
>;

export type EditChildProfileProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.EDIT_CHILD_PROFILE
>;

export type CreatePasswordInterface = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.CREATE_PASSWORD
>;

export type CheckEmailInterface = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.CHECK_EMAIL
>;
export type OtpScreenInterface = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.OTP_SCREEN
>;
