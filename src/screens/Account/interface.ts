import {ChildData} from '@tandem/redux/slices/createChild.slice';

export interface childProfile {
  type: string;
  name: string;
}

export interface adultProfile {
  type: string;
  name: string;
}

export interface StateObject {
  signoutModal: boolean;
  adultList: adultProfile[];
  playerList: (ChildData | adultProfile)[];
}
