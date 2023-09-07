import {appleAuth} from '@invertase/react-native-apple-authentication';
import {SocialResponse} from './interface';

export default async () => {
  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // will work only for first time

      const socialResponse: SocialResponse = {
        firstName: appleAuthRequestResponse.fullName?.givenName || null,
        lastName: appleAuthRequestResponse.fullName?.familyName || null,
        email: appleAuthRequestResponse.email,
        image: null,
        userId: appleAuthRequestResponse.user,
        idToken: appleAuthRequestResponse.identityToken,
      };

      return socialResponse;
      // user is authenticated
    }
    return null;
  } catch (error) {
    return null;
  }
};
