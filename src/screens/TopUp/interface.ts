import {translation} from '@tandem/utils/methods';

export interface TopUpType {
  identifier: string;
  title: string;
  description: string;
  price: number;
  currencyLogo: string;
}

export interface AboutTopUpType {
  id: number;
  title: string;
}

// export const TOP_UP_TYPES: TopUpType[] = [
//   {
//     id: 1,
//     title: `${translation('BUY')} 10 ${translation('TANDEM_TOKENS')}`,
//     description: `10 ${translation('TOKENS')} = 10 ${translation('STORIES')}`,
//     price: 1.99,
//     currencyLogo: '£',
//   },
//   {
//     id: 2,
//     title: `${translation('BUY')} 50 ${translation('TANDEM_TOKENS')}`,
//     description: `50 ${translation('TOKENS')} = 50 ${translation('STORIES')}`,
//     price: 7.99,
//     currencyLogo: '£',
//   },
// ];

export const ABOUT_TOP_UP: AboutTopUpType[] = [
  {
    id: 1,
    title: 'NO_EXPIRY_DATE',
  },
  {
    id: 2,
    title: 'SATISFACTION_GUARANTEE',
  },
];
