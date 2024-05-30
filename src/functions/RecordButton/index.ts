import {Platform} from 'react-native';
import {Audio} from 'expo-av';
import * as permissions from 'react-native-permissions';
import pushVoiceData from '@tandem/api/pushVoiceData';
import {recordingData} from '@tandem/redux/slices/recordingButton.slice';
import {store} from '@tandem/redux/store';

const permissionsType = Platform.select({
  ios: permissions.PERMISSIONS.IOS.MICROPHONE,
  android: permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
});
async function startRecording() {
  console.log('Recording Started');
  try {
    if (!permissionsType) {
      return;
    }
    const result = await permissions.check(permissionsType);

    //   if (permissionResponse.status !== 'granted') {
    //     console.log('Requesting permission..');
    //     await requestPermission();
    //   }
    if (result !== 'granted') {
      return;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
    // setIsRecordingStarted(true);
    console.log('Starting recording..');
    const {recording} = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
    store.dispatch(recordingData(recording));
    console.log('Recording started');
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

async function stopRecording(bookId?: string) {
  try {
    console.log('Stopping recording...');
    const recording = store.getState().recording.recording;

    if (recording && !recording._isDoneRecording) {
      await recording.stopAndUnloadAsync();
      store.dispatch(recordingData(recording));
      console.log('Recording stopped and unloaded');
    }

    await Audio.setAudioModeAsync({allowsRecordingIOS: false});

    const uri = recording?.getURI();

    console.log('Recording URI:', uri);

    if (bookId && uri) {
      try {
        await pushVoiceData({audio: uri, bookId});
      } catch (apiError) {
        console.error('Error pushing voice data:', apiError);
      }
    }

    // store.dispatch(recordingData(undefined));
  } catch (error) {
    console.error('Error stopping recording:', error);
  }
}

export {startRecording, stopRecording};
