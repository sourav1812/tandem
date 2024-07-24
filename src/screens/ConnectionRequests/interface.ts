export interface PermissionModalData {
  visible: boolean;
  requestId: string;
  isRequestedAccepted: boolean;
  permissions: {
    readStoryBooks: boolean;
    createStoryBooks: boolean;
    createReadingSessions: boolean;
    changeArchiveStatus: boolean;
    changePublicStatus: boolean;
  };
}
