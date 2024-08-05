import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async (receivePromotinalMails: boolean) => {
  try {
    await post({
      path: API.CONSENT_NEWSLETTER,
      data: {receivePromotinalMails},
    });
  } catch (error) {
    throw error;
  }
};
