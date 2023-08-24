import {ChildData} from '@tandem/redux/slices/createChild.slice';

export interface userDataResponse {
  children: ChildData[];
  name: string;
  email: string;
  userId: string;
}
