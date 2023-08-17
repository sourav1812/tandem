import {createSlice} from '@reduxjs/toolkit';

interface Response {
  type: string;
  response: string[] | boolean | string;
}
interface StoryState {
  responseArray: Response[];
}
const initialState: StoryState = {responseArray: []};

export const storyGeneration = createSlice({
  name: 'storyGeneration',
  initialState,
  reducers: {
    // push responses
    pushStoryGenerationResponse: (state, action) => {
      state.responseArray.push(action.payload);
    },
    // pop responses
    popStoryGenerationResponse: state => {
      state.responseArray.pop();
    },
    // empty story gen reducer
    clearStoryGenerationResponse: state => {
      state.responseArray.pop();
    },
    // remove a particular number of responses
    clipStoryGenerationResponse: (state, action) => {
      state.responseArray.length = action.payload;
    },
  },
});

export const {
  pushStoryGenerationResponse,
  popStoryGenerationResponse,
  clearStoryGenerationResponse,
  clipStoryGenerationResponse,
} = storyGeneration.actions;

export default storyGeneration.reducer;
