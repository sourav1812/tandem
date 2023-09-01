export interface languageType {
  name: string;
  flag: string;
  code: string;
}

export const languages: languageType[] = [
  {name: 'English', flag: '🇬🇧', code: 'en'},
  {name: 'Deutsch', flag: '🇩🇪', code: 'de'},
  {name: 'Italiano', flag: '🇮🇹', code: 'it'},
  {name: 'Français', flag: '🇫🇷', code: 'fr'},
];
