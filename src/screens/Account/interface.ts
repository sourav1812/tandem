import {PEOPLE} from '@tandem/constants/enums';
import {AdultData, ChildData} from '@tandem/redux/slices/createChild.slice';

export interface AdultProfile {
  type: PEOPLE.ADULT;
  name: string;
  avatar: string;
  role: string;
  profileId: string;
}

export interface StateObject {
  signoutModal: boolean;
  playerList: (ChildData | AdultProfile | AdultData)[];
}
