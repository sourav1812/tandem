import {socialLogin} from '@tandem/api/socialAuth';
import apple from './apple';
import facebook from './facebook';
import google from './google';
import {SocialResponse} from './interface';
import {store} from '@tandem/redux/store';
import {cacheAvatars} from '../cache';
import {saveSocialData} from '@tandem/redux/slices/userData.slice';

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

    await socialLogin({
      firstName,
      lastName,
      token: idToken,
      profilePicture: image,
      email,
      type,
    });
    store.dispatch(
      saveSocialData({
        firstName,
        lastName,
        idToken: idToken,
        image: image,
        email: email,
      }),
    );
    cacheAvatars('socialLoginImage', image);
    console.log(response, 'socialLoginReponse');
  } catch (error) {
    console.log('error in social auth', {error, type});
  }
};
