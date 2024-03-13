import {postChildStats} from '@tandem/api/childAnalytics';
import {store} from '@tandem/redux/store';

export default async () => {
  const allStats = store.getState().createChild.stats;
  await Promise.all(
    Object.keys(allStats).map(async statsKey => {
      console.log('uploading stats for child:', statsKey);
      return await postChildStats({
        childId: allStats[statsKey].childId,
        stats: {
          generation: allStats[statsKey].generation,
          reading: allStats[statsKey].reading,
        },
      });
    }),
  );
};
