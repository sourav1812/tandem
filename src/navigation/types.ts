import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COMPONENTSNAME } from "./ComponentName";

export type RootStackParamList = {
  BottomTab: RootTabParamList;
  GenerateStory : undefined;
  StoryTelling: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Bookshelf: undefined;
  People: undefined;
};

export type GeneratingStoryScreenProps = NativeStackScreenProps<RootStackParamList , COMPONENTSNAME.GENERATE_STORY >
