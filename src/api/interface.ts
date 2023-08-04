import {API_RESPONSE} from '@tandem/constants/enums';

export default interface Api {
  [API_RESPONSE.STATUS]: boolean;
  [API_RESPONSE.MESSAGE]?: string;
}
