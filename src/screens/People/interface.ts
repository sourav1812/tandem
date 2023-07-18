import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {translation} from '@tandem/utils/methods';

export interface stateObject {
  firstTab: boolean;
  navigate: string;
}

export const menuArray = [
  {
    name: translation('PROFILE_SETTINGS'),
    navigate: SCREEN_NAME.PROFILE_SETTINGS,
  },
  {name: translation('HELP_CENTER')},
  {name: translation('CHANGE_PASSWORD')},
  {name: translation('ABOUT_APP')},
  {name: translation('TERMS_OF_USE')},
  {name: translation('PRIVACY_POLICY')},
];
