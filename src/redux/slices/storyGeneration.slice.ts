import {createSlice} from '@reduxjs/toolkit';
import {STORY_PARTS} from '@tandem/constants/enums';

export interface StoryGenerateResponse {
  [STORY_PARTS.WHO]: string[];
  [STORY_PARTS.INCLUSION]: boolean | null;
  [STORY_PARTS.WHERE]: string[];
  [STORY_PARTS.WHAT_THINGS]: string[];
  [STORY_PARTS.WHAT_HAPPENS]: string[];
  [STORY_PARTS.STYLES]: string[];
  [STORY_PARTS.COLOR]: string[];
  [STORY_PARTS.LANGAUGE]: string;
}

const initialState: StoryGenerateResponse = {
  [STORY_PARTS.WHO]: [],
  [STORY_PARTS.INCLUSION]: null,
  [STORY_PARTS.WHERE]: [],
  [STORY_PARTS.WHAT_THINGS]: [],
  [STORY_PARTS.WHAT_HAPPENS]: [],
  [STORY_PARTS.STYLES]: [],
  [STORY_PARTS.COLOR]: ['red'],
  [STORY_PARTS.LANGAUGE]: 'en',
};

export const storyGeneration = createSlice({
  name: 'storyGeneration',
  initialState,
  reducers: {
    // push responses
    pushStoryGenerationResponse: (state, action) => {
      const {
        key,
        value,
      }: {key: STORY_PARTS; value: string[] & boolean & string} =
        action.payload;
      state[key] = value;
    },
    clearParticularState: (state, action) => {
      const type:
        | STORY_PARTS.WHO
        | STORY_PARTS.WHERE
        | STORY_PARTS.COLOR
        | STORY_PARTS.WHAT_THINGS
        | STORY_PARTS.WHAT_HAPPENS
        | STORY_PARTS.STYLES = action.payload;
      state[type] = [];
    },
    // empty story gen reducer
    clearStoryGenerationResponse: () => {
      return initialState;
    },
  },
});

export const {
  pushStoryGenerationResponse,
  clearStoryGenerationResponse,
  clearParticularState,
} = storyGeneration.actions;

export default storyGeneration.reducer;
