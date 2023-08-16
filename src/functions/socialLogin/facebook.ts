import {SocialResponse} from '@tandem/functions/socialLogin/interface';
import {
  LoginManager,
  Settings,
  Profile,
  AccessToken,
} from 'react-native-fbsdk-next';

export default async () => {
  try {
    Settings.initializeSDK();
    const result = await LoginManager.logInWithPermissions(['public_profile']);

    if (result.isCancelled || !result.grantedPermissions) {
      return null;
    }

    const accessToken = await AccessToken.getCurrentAccessToken();
    if (!accessToken) {
      return null;
    }
    const currentProfile = await Profile.getCurrentProfile();
    if (currentProfile) {
      const socialResponse: SocialResponse = {
        firstName: currentProfile.firstName || null,
        lastName: currentProfile.lastName || null,
        email: currentProfile.email || null,
        image: currentProfile.imageURL || null,
        userId: currentProfile.userID || null,
        idToken: accessToken.accessToken,
      };
      return socialResponse;
    }
    return null;
  } catch (error) {
    return null;
  }
};
