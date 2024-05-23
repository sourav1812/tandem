import {post} from '@tandem/api';
import {RegisterUser} from './interface';
import {API} from '@tandem/constants/api';
import loginUserWithEmail from '../loginUserWithEmail';
import {onCreateTriggerNotification} from '@tandem/functions/notifee';
import {NOTIFICATION_PROMPTS} from '@tandem/constants/local';

export default async ({email, firstName, lastName, password}: RegisterUser) => {
  try {
    const result = await post({
      path: API.REGISTER_USER,
      data: {email, firstName, lastName, password},
      onSuccess: async () => {
        // ! trigger number 1
        const triggerDetails = NOTIFICATION_PROMPTS[0];
        await onCreateTriggerNotification({
          body: triggerDetails.body,
          id: triggerDetails.id,
          title: 'Tandem',
          date: new Date(Date.now() + 60 * 60 * 24 * 1000), // ! 24 hrs from now
        });
        await loginUserWithEmail({
          email: email,
          password: password,
        });
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
