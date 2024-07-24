import {get} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {ConnectionReqResponse} from './interface';

export const getConnectionRequest = async ({
  childId,
  page,
}: {
  childId: string;
  page: number;
}) => {
  try {
    const resp: ConnectionReqResponse = await get({
      path: API.GET_CONNECTION_REQUESTS,
      noLoader: true,
      params: {childId, page},
    });
    return resp;
  } catch (error) {
    throw error;
  }
};
