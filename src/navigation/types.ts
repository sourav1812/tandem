import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COMPONENTSNAME } from "./ComponentName";

export type RootStackParamList = {
  BottomTab: RootTabParamList;
  GenerateStory : undefined;
  StoryTelling: undefined;
  Story : undefined;
  Activities: undefined;
  SelectPlayer : undefined;
  Questions : undefined;
};


export type RootTabParamList = {
  Home: undefined;
  Bookshelf: undefined;
  People: undefined;
};

export type AllStackScreenParamList = RootStackParamList & RootTabParamList 

export type GeneratingStoryScreenProps = NativeStackScreenProps<AllStackScreenParamList , COMPONENTSNAME.GENERATE_STORY >
export type StoryTellingScreenProps = NativeStackScreenProps<AllStackScreenParamList  , COMPONENTSNAME.STORY_TELLING>
export type BookShelfScreenProps = NativeStackScreenProps<AllStackScreenParamList  , COMPONENTSNAME.BOOKSHELF>
export type StoryScreenProps = NativeStackScreenProps<AllStackScreenParamList  , COMPONENTSNAME.STORY>
export type ActivitiesScreenProps = NativeStackScreenProps<AllStackScreenParamList  , COMPONENTSNAME.ACTIVITIES>
export type SelectPlayerScreenProps = NativeStackScreenProps<AllStackScreenParamList  , COMPONENTSNAME.SELECT_PLAYER>
export type PeopleScreenProps = NativeStackScreenProps<AllStackScreenParamList  , COMPONENTSNAME.PEOPLE>
export type QuestionsScreenProps = NativeStackScreenProps<AllStackScreenParamList  , COMPONENTSNAME.QUESTIONS>


