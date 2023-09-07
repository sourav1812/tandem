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
    const response: SocialResponse | null = await socialAuthFunctions[type]();
    if (!response) {
      console.log('issue social auth ', type);
      return;
    }
    const {firstName, lastName, idToken, image, email}: SocialResponse =
      response;

    const socialLoginReponse = await socialLogin({
      name: `${firstName || ''}${lastName ? ' ' + lastName : ''}`,
      token: idToken,
      profilePicture: image,
      email,
      type,
    });
    console.log(socialLoginReponse, 'socialLoginReponse');
  } catch (error) {
    console.log('error in socail auth', {error, type});
  }
};
