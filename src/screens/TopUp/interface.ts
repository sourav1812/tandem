export interface TopUpType {
  id: number;
  title: string;
  description: string;
  price: number;
  currencyLogo: string;
}

export interface AboutTopUpType {
  id: number;
  title: string;
}

export const TOP_UP_TYPES: TopUpType[] = [
  {
    id: 1,
    title: 'Buy 10 TANDEM Tokens',
    description: '10 tokens = 10 stories',
    price: 1.99,
    currencyLogo: '£',
  },
  {
    id: 2,
    title: 'Buy 50 TANDEM Tokens',
    description: '50 tokens = 50 stories',
    price: 7.99,
    currencyLogo: '£',
  },
];

export const ABOUT_TOP_UP: AboutTopUpType[] = [
  {
    id: 1,
    title: 'No expiry date on all tokens',
  },
  {
    id: 2,
    title: '100% satisfaction guaranteed (full refund if you are not happy)',
  },
];
