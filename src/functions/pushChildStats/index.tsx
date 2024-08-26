import {getChildStats, postChildStats} from '@tandem/api/childAnalytics';
import refreshToken from '@tandem/api/refreshToken';
import {store} from '@tandem/redux/store';

export default async () => {
  const allStats = store.getState().createChild.stats;

  try {
    await refreshToken();
    await Promise.all(
      Object.keys(allStats).map(async statsKey => {
        console.log('Uploading stats for child:', statsKey);

        await postChildStats({
          childId: allStats[statsKey].childId,
          stats: {
            generation: allStats[statsKey].generation,
            reading: allStats[statsKey].reading,
          },
        });
      }),
    );

    console.log('All stats uploaded successfully.');
    await getChildStats();
  } catch (error) {
    console.error('Error uploading stats:', error);
    // Optionally handle the error, such as dispatching a failure action or retrying
  }
};
