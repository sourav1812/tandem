import {get, post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {Stats, updateChildStats} from '@tandem/redux/slices/createChild.slice';
import {store} from '@tandem/redux/store';

export const getChildStats = async () => {
  try {
    console.log('calling childAnalytics GET');
    const response: Stats[] = await get({
      path: API.GET_CHILD_ANALYTICS,
      noLoader: true,
    });
    console.log('child analytics api response', response);
    response.forEach(stats => {
      store.dispatch(updateChildStats({childId: stats.childId, stats}));
    });
  } catch (error) {
    throw error;
  }
};

export const postChildStats = async ({
  stats,
  childId,
}: {
  stats: {
    generation: {
      totalTime: number;
    };
    reading: {
      totalTime: {
        solo: number;
        tandem: {parentId: string; time: number}[];
      };
    };
  };
  childId: string;
}) => {
  try {
    console.log({stats: stats.reading.totalTime});
    await post({
      path: API.POST_CHILD_ANALYTICS + `/${childId}`,
      data: stats,
    });
  } catch (error) {
    throw error;
  }
};
