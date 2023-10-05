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
}

const initialState: StoryGenerateResponse = {
  [STORY_PARTS.WHO]: [],
  [STORY_PARTS.INCLUSION]: null,
  [STORY_PARTS.WHERE]: [],
  [STORY_PARTS.WHAT_THINGS]: [],
  [STORY_PARTS.WHAT_HAPPENS]: [],
  [STORY_PARTS.STYLES]: [],
  [STORY_PARTS.COLOR]: [],
};

export const storyGeneration = createSlice({
  name: 'storyGeneration',
  initialState,
  reducers: {
    // push responses
    pushStoryGenerationResponse: (state, action) => {
      const {key, value}: {key: STORY_PARTS; value: string[] & boolean} =
        action.payload;
      state[key] = value;
    },
    clearParticularState: (state, action) => {
      console.log(action.payload);
      const type: string = action.payload;
      state[type] = [];
    },
    // empty story gen reducer
    clearStoryGenerationResponse: state => {
      state[STORY_PARTS.WHO] = [];
      state[STORY_PARTS.INCLUSION] = null;
      state[STORY_PARTS.WHERE] = [];
      state[STORY_PARTS.WHAT_THINGS] = [];
      state[STORY_PARTS.WHAT_HAPPENS] = [];
      state[STORY_PARTS.STYLES] = [];
      state[STORY_PARTS.COLOR] = [];
    },
  },
});

export const {
  pushStoryGenerationResponse,
  clearStoryGenerationResponse,
  clearParticularState,
} = storyGeneration.actions;

export default storyGeneration.reducer;
