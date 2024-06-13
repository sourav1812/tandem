import {createSlice} from '@reduxjs/toolkit';
import {Audio} from 'expo-av';

interface RecordingStates {
  permissionGranted: boolean;
  isRecordingStarted: boolean;
  recording: Audio.Recording | undefined;
  toogleButton: boolean;
}

const initialState: RecordingStates = {
  permissionGranted: false,
  isRecordingStarted: false,
  recording: undefined,
  toogleButton: false,
};

const recordingSlice = createSlice({
  name: 'Recording',
  initialState,
  reducers: {
    recordingPermissionAlert: (state, action) => {
      state.permissionGranted = action.payload;
    },
    recordingData: (state, action) => {
      state.recording = action.payload;
    },
    toggleButton: (state, action) => {
      state.toogleButton = action.payload;
    },
    resetRecordingState: () => {
      return initialState;
    },
  },
});

export const {
  recordingPermissionAlert,
  recordingData,
  toggleButton,
  resetRecordingState,
} = recordingSlice.actions;
export default recordingSlice.reducer;
