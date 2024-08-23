import {get, post} from '@tandem/api';
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

export const Invitation = async (inviteCode: string) => {
  try {
    const response = await post({
      path: API.CONNECTION_REQUEST,
      data: {inviteCode: inviteCode},
    });
    return response;
  } catch (error) {}
};
