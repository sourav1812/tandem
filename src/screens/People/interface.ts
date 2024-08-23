import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export interface StateObject {
  firstTab: boolean;
  navigate?: string;
}

export const MENU_ARRAY = [
  {
    name: 'PROFILE_SETTINGS',
    navigate: SCREEN_NAME.PROFILE_SETTINGS,
  },
  {
    name: 'CONNECTION_REQUESTS',
    navigate: SCREEN_NAME.LITTLE_PEOPLE,
  },
  {
    name: 'HELP_CENTER',
    navigate: SCREEN_NAME.HELP_CENTER,
    param: {fromPeople: true},
  },
  {name: 'CHANGE_PASSWORD', navigate: SCREEN_NAME.CHANGE_PASSWORD},
  {name: 'ABOUT_APP', navigate: SCREEN_NAME.ABOUT_APP},
  {
    name: 'TERMS_OF_USE',
    navigate: SCREEN_NAME.TERMS_OF_USE,
  },
  {
    name: 'PRIVACY_POLICY',
    navigate: SCREEN_NAME.PRIVACY_POLICIES,
  },
];
