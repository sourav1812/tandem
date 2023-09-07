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
    console.log({type, socialObjectResponse});
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
  } catch (error) {
    console.log('error in socail auth', {error, type});
  }
};
