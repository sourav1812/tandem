export interface Props {
  reqId: string;
  data: {
    isApproved: boolean;
    permissions?: {
      readStoryBooks: boolean;
      createStoryBooks: boolean;
      createReadingSessions: boolean;
      changeArchiveStatus: boolean;
      changePublicStatus: boolean;
    };
  };
}
