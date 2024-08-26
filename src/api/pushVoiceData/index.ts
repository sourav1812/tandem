import {API, BASE_URL} from '@tandem/constants/api';
import * as FileSystem from 'expo-file-system';
import refreshToken from '../refreshToken';

const pushVoiceData = async ({
  bookId,
  audio,
}: {
  bookId: string;
  audio: string;
}) => {
  const {accessToken} = await refreshToken();
  const response = await FileSystem.uploadAsync(
    BASE_URL + API.PUSH_VOICE_DATA.replace('{BOOK_ID_HERE}', bookId),
    audio,
    {
      fieldName: 'recording',
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  console.log(response);
};

export default pushVoiceData;
