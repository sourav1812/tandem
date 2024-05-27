import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {UserAnalyticsData} from './interface';

export default async (data: UserAnalyticsData) => {
  try {
    await post({
      path: API.ANALYTICS_SELF,
      data,
    });
  } catch (error) {
    throw error;
  }
};
