import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {SocialResponse} from './interface';
import {store} from '@tandem/redux/store';
import {resetSocialData} from '@tandem/redux/slices/userData.slice';

export const getCurrentUserInfo = async () => {
  try {
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
    } else {
      // some other error
    }
  }
};
export const googleSignOut = async () => {
  try {
    const isSignedInKey = await GoogleSignin.isSignedIn();
    if (isSignedInKey) {
      await GoogleSignin.signOut();
    }
    store.dispatch(resetSocialData());
  } catch (error) {
    console.error('google signout', error);
  }
};

export default async () => {
  console.log('google socail auth default func');
  GoogleSignin.configure({
    webClientId:
      '395516850709-pl3qfs2tq4494hjr557di9n4fgcs8ihm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });
  try {
    await GoogleSignin.hasPlayServices();
    await googleSignOut();
    const userInfo = await GoogleSignin.signIn();
    const socialResponse: SocialResponse = {
      firstName: userInfo.user.givenName,
      lastName: userInfo.user.familyName,
      email: userInfo.user.email,
      image: userInfo.user.photo?.split('=')[0] + '=s1024-c',
      userId: userInfo.user.id,
      idToken: userInfo.idToken,
    };
    console.log(socialResponse, 'socialResponsesocialResponse');
    return socialResponse;
  } catch (error: any) {
    console.log(error, 'PLAY_SERVICES_NOT_AVAILABLE');

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('SIGN_IN_CANCELLED');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('IN_PROGRESS');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('PLAY_SERVICES_NOT_AVAILABLE');
    } else {
      // some other error happened
    }
    return null;
  }
};

//! clearCachedAccessToken(accessTokenString)
// This method only has an effect on Android. You may run into a 401 Unauthorized error when a token is invalid. Call this method to remove the token from local cache and then call getTokens() to get fresh tokens. Calling this method on iOS does nothing and always resolves. This is because on iOS, getTokens() always returns valid tokens, refreshing them first if they have expired or are about to expire (see docs).

//! getTokens()
// Resolves with an object containing { idToken: string, accessToken: string, } or rejects with an error. Note that using accessToken for identity assertion on your backend server is discouraged.
