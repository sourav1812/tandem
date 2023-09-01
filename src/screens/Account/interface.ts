import {AdultData, ChildData} from '@tandem/redux/slices/createChild.slice';

export interface ChildProfile {
  type: 'child';
  name: string;
}

export interface AdultProfile {
  type: 'adult';
  name: string;
}

export interface StateObject {
  signoutModal: boolean;
  playerList: (ChildData | AdultProfile | AdultData)[];
}
