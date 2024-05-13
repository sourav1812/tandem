import {API, BASE_URL} from '@tandem/constants/api';
import {getStoredTokens, storeTokens} from '@tandem/functions/tokens';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const pushVoiceData = async ({
  bookId,
  audio,
}: {
  bookId: string;
  audio: string;
}) => {
  const {refreshToken} = getStoredTokens();
  const tokenData = await axios.post(BASE_URL + API.REFRESH_TOKEN, {
    refreshToken,
  });
  const {accessToken, refreshToken: newRefreshToken} = tokenData.data;
  storeTokens(accessToken, newRefreshToken);
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
