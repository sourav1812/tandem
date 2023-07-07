import {createClient} from 'pexels';
import {PEXELS_API_KEY} from '@tandem/constants/api';

interface PexelParamenters {
  query: string;
  color: string;
}
export default async ({query, color}: PexelParamenters) => {
  try {
    const client = createClient(PEXELS_API_KEY);
    const response = await client.photos.search({query, color, per_page: 1});
    return response;
  } catch (error) {
    console.log('error in pexel api', error);
  }
};
