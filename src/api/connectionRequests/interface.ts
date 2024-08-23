export interface ConnectionReqResponse {
  connectionRequests: ConnectionRequestsObj[];
  endReached: boolean;
}
export interface ConnectionRequestsObj {
  _id: string;
  child: {
    avatar: string;
    gender: string;
    name: string;
  }[];
  createdAt: string;
  requestedBy: {
    email: string;
    enableExperimentalFeatures: boolean;
    firstName: string;
    lastName: string;
    lastSeenAt: string;
    profilePicture: string;
  }[];
  requestedTo: string;
  status: AccountConnectionRequestStatus;
}
export enum AccountConnectionRequestStatus {
  ACTION_REQUIRED = 'ACTION_REQUIRED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
