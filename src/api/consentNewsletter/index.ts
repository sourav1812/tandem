import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async (receivePromotionalMails: boolean) => {
  try {
    await post({
      path: API.CONSENT_NEWSLETTER,
      data: {receivePromotionalMails},
    });
  } catch (error) {
    throw error;
  }
};
