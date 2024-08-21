import i18n from '@tandem/constants/lang/i18n';

export const translation = (text: string) => {
  return i18n.t(text);
};

export const dynamicTranslation = (text: string, placeholders: any = {}) => {
  let translatedText = i18n.t(text);

  Object.keys(placeholders).forEach(placeholder => {
    const regex = new RegExp(`{${placeholder}}`, 'g');
    translatedText = translatedText.replace(
      regex,
      String(placeholders[placeholder]),
    );
  });

  return translatedText;
};
