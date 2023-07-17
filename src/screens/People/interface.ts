import {translation} from '@tandem/utils/methods';

export interface stateObject {
  firstTab: boolean;
}

export const menuArray = [
  {name: translation('PROFILE_SETTINGS')},
  {name: translation('HELP_CENTER')},
  {name: translation('CHANGE_PASSWORD')},
  {name: translation('ABOUT_APP')},
  {name: translation('TERMS_OF_USE')},
  {name: translation('PRIVACY_POLICY')},
];
