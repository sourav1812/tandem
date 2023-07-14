import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {COMPONENTSNAME} from './ComponentName';

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
  COMPONENTSNAME.GENERATE_STORY
>;
export type StoryTellingScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.STORY_TELLING
>;
export type BookShelfScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.BOOKSHELF
>;
export type StoryScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.STORY
>;
export type ActivitiesScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.ACTIVITIES
>;
export type SelectPlayerScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.SELECT_PLAYER
>;
export type PeopleScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.PEOPLE
>;
export type QuestionsScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.QUESTIONS
>;
export type SelectLanguageProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.SELECT_LANGUAGE
>;
export type SignUpProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.SIGN_UP
>;
export type SignInProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.SIGN_IN
>;
export type TermsAndConditionsProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.TERMS_AND_CONDITIONS
>;
export type HelpCenterProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.HELP_CENTER
>;
export type AccountProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.ACCOUNT
>;

export type SplashScreenProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.SPLASH_SCREEN
>;

export type OnboardingProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.ONBOARDING
>;

export type SocialSignInProps = NativeStackScreenProps<
  AllStackScreenParamList,
  COMPONENTSNAME.SOCIAL_SIGN_IN
>;
