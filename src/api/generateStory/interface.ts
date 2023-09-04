import {StoryGenerateResponse} from '@tandem/redux/slices/storyGeneration.slice';

export interface GenerateStoryData {
  childId: string;
  storyPromptData: StoryGenerateResponse;
}
