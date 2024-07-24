import {API} from '@tandem/constants/api';
import {post} from '@tandem/api';
import {Props} from './interface';
const actionOnReq = async ({reqId, data}: Props) => {
  try {
    const response = await post({
      path: API.ACTION_CONNECTION_REQUEST.replace('{REQ_ID_HERE}', reqId),
      data: data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export default actionOnReq;
