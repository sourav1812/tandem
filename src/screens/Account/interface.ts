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
  childrenList: childProfile[];
  adultList: adultProfile[];
  playerList: childProfile[] | adultProfile[];
}
