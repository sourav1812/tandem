import {Platform, NativeModules} from 'react-native';

const setupLangauge = () => {
  let locale = null;
  if (Platform.OS === 'ios') {
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    locale = locale.split('-')[0];
  } else {
    locale = NativeModules.I18nManager.localeIdentifier;
    locale = locale.split('_')[0];
  }
  if (locale === 'en') {
    // ! return only used langauege locale here for everything elase use english
    return locale;
  }
  return 'en';
};
export default setupLangauge;
