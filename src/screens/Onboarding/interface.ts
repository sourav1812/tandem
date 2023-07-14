import {translation} from '@tandem/utils/methods';

export interface ONBOARDING {
  description: string;
  url: string;
}

export const onboardingList: ONBOARDING[] = [
  {
    description: translation('HAVE_FUN_MAKE_STORIES'),
    url: require('../../assets/png/onboarding1.png'),
  },
  {
    description: translation('WITH_TANDEM_YOU_WILL_THE_POWER'),
    url: require('../../assets/png/onboarding2.png'),
  },
  {
    description: translation('WITH_TANDEM_YOU_WILL_THE_POWER'),
    url: require('../../assets/png/onboarding3.png'),
  },
];
