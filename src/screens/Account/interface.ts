export interface childProfile {
  type: string;
}

export interface adultProfile {
  type: string;
}

export interface StateObject {
  signoutModal: boolean;
  childrenList: childProfile[];
  adultList: adultProfile[];
  playerList: childProfile[] | adultProfile[];
}
