import en from '@tandem/constants/api/lang/en';

export interface ONBOARDING {
  heading: string;
  description: string;
  url: string;
}

export const onboardingList: ONBOARDING[] = [
  {
    heading: en.WELCOME_TO_TANDEM,
    description: en.WITH_TANDEM_YOU_WILL_THE_POWER,
    url: require('../../assets/png/onboarding1.png'),
  },
  {
    heading: en.WELCOME_TO_TANDEM,
    description: en.WITH_TANDEM_YOU_WILL_THE_POWER,
    url: require('../../assets/png/onboarding2.png'),
  },
  {
    heading: en.WELCOME_TO_TANDEM,
    description: en.WITH_TANDEM_YOU_WILL_THE_POWER,
    url: require('../../assets/png/onboarding3.png'),
  },
];
