import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {translation} from '@tandem/utils/methods';

export interface StateObject {
  firstTab: boolean;
  navigate?: string;
}

export const MENU_ARRAY = [
  {
    name: translation('PROFILE_SETTINGS'),
    navigate: SCREEN_NAME.PROFILE_SETTINGS,
  },
  {
    name: translation('HELP_CENTER'),
    navigate: SCREEN_NAME.HELP_CENTER,
    param: {fromPeople: true},
  },
  {name: translation('CHANGE_PASSWORD'), navigate: SCREEN_NAME.CHANGE_PASSWORD},
  {name: translation('ABOUT_APP'), navigate: SCREEN_NAME.ABOUT_APP},
  {
    name: translation('TERMS_OF_USE'),
    navigate: SCREEN_NAME.TERMS_OF_USE,
  },
  {
    name: translation('PRIVACY_POLICY'),
    navigate: SCREEN_NAME.PRIVACY_POLICIES,
  },
];
