import {translation} from '@tandem/utils/methods';

export interface ONBOARDING {
  id: number;
  description: string;
  url: string;
}

export const onboardingList: ONBOARDING[] = [
  {
    id: 0,
    description: translation('HAVE_FUN_MAKE_STORIES'),
    url: require('../../assets/png/onboarding1.png'),
  },
  {
    id: 1,
    description: translation('WITH_TANDEM_YOU_WILL_THE_POWER'),
    url: require('../../assets/png/onboarding2.png'),
  },
  {
    id: 2,
    description: translation('WITH_TANDEM_YOU_WILL_THE_POWER'),
    url: require('../../assets/png/onboarding3.png'),
  },
];
