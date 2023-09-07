import {socialLogin} from '@tandem/api/socialAuth';
import apple from './apple';
import facebook from './facebook';
import google from './google';
import {SocialResponse} from './interface';

export default async (type: 'apple' | 'google' | 'facebook') => {
  const socialAuthFunctions: {
    [key: string]: () => Promise<SocialResponse | null>;
  } = {
    google,
    facebook,
    apple,
  };
  try {
    const socialObjectResponse: any = await socialAuthFunctions[type]();
    if (!socialObjectResponse) {
      return;
    }
    console.log(
      socialObjectResponse,
      'socialObjectResponsesocialObjectResponse',
    );
    try {
      const socialLoginReponse = await socialLogin({
        name: `${socialObjectResponse.firstName}${' '}${
          socialObjectResponse.lastName
        }`,
        token: socialObjectResponse.idToken,
        profilePicture: socialObjectResponse.image,
        email: socialObjectResponse.email,
        type: type,
      });
      console.log(socialLoginReponse, 'socialLoginReponse');
    } catch (error) {}

    // const forwardToSignup = await socialLogin(socialObjectLocal);
    // if (forwardToSignup) {
    //   navigation.push(routes.SOCIAL_SIGN_UP, {
    //     socialObject: socialObjectLocal,
    //     onlyPhoneNumber: true,
    //   });
    // }
  } catch (error) {
    // logout(true);
    console.log('error in socail auth', {error, type});
  }
};
