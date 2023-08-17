export interface GenerateStoryData {
  childId: string;
  storyPromptData: StorySlice[];
}

interface StorySlice {
  type: string;
  response: string[] | boolean | string;
}
