import {createSlice} from '@reduxjs/toolkit';
import {STORY_PARTS} from '@tandem/constants/enums';

export interface StoryGenerateResponse {
  [STORY_PARTS.WHO]: string[];
  [STORY_PARTS.INCLUSION]: boolean;
  [STORY_PARTS.WHERE]: string[];
  [STORY_PARTS.WHAT_THINGS]: string[];
  [STORY_PARTS.WHAT_HAPPENS]: string[];
  [STORY_PARTS.STYLES]: string[];
  [STORY_PARTS.COLOR]: string[];
}
interface StoryState {
  response: StoryGenerateResponse;
  questionIndex: number;
}
const initialState: StoryState = {
  response: {
    [STORY_PARTS.WHO]: [],
    [STORY_PARTS.INCLUSION]: false,
    [STORY_PARTS.WHERE]: [],
    [STORY_PARTS.WHAT_THINGS]: [],
    [STORY_PARTS.WHAT_HAPPENS]: [],
    [STORY_PARTS.STYLES]: [],
    [STORY_PARTS.COLOR]: [],
  },
  questionIndex: 0,
};

const WHICH_QUESTION_INDEX = {
  [STORY_PARTS.WHO]: 0,
  [STORY_PARTS.INCLUSION]: 1,
  [STORY_PARTS.WHERE]: 2,
  [STORY_PARTS.WHAT_THINGS]: 3,
  [STORY_PARTS.WHAT_HAPPENS]: 4,
  [STORY_PARTS.STYLES]: 5,
  [STORY_PARTS.COLOR]: 6,
};

export const storyGeneration = createSlice({
  name: 'storyGeneration',
  initialState,
  reducers: {
    // push responses
    pushStoryGenerationResponse: (state, action) => {
      const {key, value}: {key: STORY_PARTS; value: string[] & boolean} =
        action.payload;
      state.response[key] = value;
      state.questionIndex = WHICH_QUESTION_INDEX[key];
    },
    // empty story gen reducer
    clearStoryGenerationResponse: _state => {
      _state = initialState;
    },
    changeQuestionIndex: (state, action) => {
      state.questionIndex = action.payload;
    },
  },
});

export const {
  pushStoryGenerationResponse,
  clearStoryGenerationResponse,
  changeQuestionIndex,
} = storyGeneration.actions;

export default storyGeneration.reducer;
