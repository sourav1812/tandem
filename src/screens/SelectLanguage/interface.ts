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
  {name: 'Polski', flag: '🇵🇱', code: 'po'},
  {name: 'اردو', flag: '🇮🇳', code: 'ur'},
  {name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', code: 'pu'},
  {name: 'Türkçe', flag: '🇹🇷', code: 'tr'},
];
