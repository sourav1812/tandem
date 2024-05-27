import {useState} from 'react';
import {View, StyleSheet, Button, Platform} from 'react-native';
import {Audio} from 'expo-av';
import * as permissions from 'react-native-permissions';
import pushVoiceData from '@tandem/api/pushVoiceData';

export default function RecordAudio() {
  const [recording, setRecording] = useState();
  //   const [permissionResponse, requestPermission] = Audio.usePermissions();
  const permissionsType = Platform.select({
    ios: permissions.PERMISSIONS.IOS.MICROPHONE,
    android: permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
  });
  async function startRecording() {
    try {
      if (!permissionsType) {
        return;
      }
      const result = await permissions.request(permissionsType);

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

      console.log('Starting recording..');
      const {recording} = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    await pushVoiceData({audio: uri, bookId: 'MockId'});
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
