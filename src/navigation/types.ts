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
  HelpCenter: undefined;
  Account: undefined;
  SplashScreen: undefined;
  Onboarding: undefined;
  SocialSignIn: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Bookshelf: undefined;
  People: undefined;
};

export type AllStackScreenParamList = RootStackParamList & RootTabParamList;

export type GeneratingStoryScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  SCREEN_NAME.GENERATE_STORY
>;
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
