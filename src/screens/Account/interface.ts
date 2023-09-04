import {AdultData, ChildData} from '@tandem/redux/slices/createChild.slice';

export interface AdultProfile {
  type: 'adult';
  name: string;
  avatar: string;
  role: string;
  profileId: string;
}

export interface StateObject {
  signoutModal: boolean;
  playerList: (ChildData | AdultProfile | AdultData)[];
}
