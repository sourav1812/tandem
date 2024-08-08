export interface ISubscription{
    id: number,
    title: string,
    description: string,
}

export const ABOUT_SUBSCRIPTION: ISubscription[] = [
  {
    id: 1,
    title: 'UNLIMITED_STORIES',
    description: 'TOKENS_PER_MONTH',
  },
  {
    id: 2,
    title: 'ROLLOVER_UNUSED_TOKENS',
    description: 'UNUSED_TOKENS_ROLLOVER',
  },
  {
    id: 3,
    title: 'SATISFACTION_GUARANTEED',
    description: 'FREE_REFUND',
  },
];